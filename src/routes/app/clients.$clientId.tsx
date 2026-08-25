import { useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  addReview,
  deleteClient,
  generateReplies,
  getClient,
  markResponded,
  updateClient,
  type Review,
} from "@/lib/server/data";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ClientForm } from "./clients";
import { StatusBadge } from "./index";

export const Route = createFileRoute("/app/clients/$clientId")({ component: ClientDetail });

function ClientDetail() {
  const { clientId } = Route.useParams();
  const id = Number(clientId);
  const navigate = useNavigate();
  const [pack, setPack] = useState<Awaited<ReturnType<typeof getClient>> | null>(null);
  const [edit, setEdit] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  function load() {
    getClient({ data: { id } }).then(setPack);
  }
  useEffect(() => {
    load();
  }, [id]);

  if (!pack) return <p className="text-sm text-muted">Loading…</p>;
  if (!pack.client) return <p className="text-sm text-muted">Client not found.</p>;
  const client = pack.client;

  return (
    <div>
      <Link to="/app/clients" className="text-sm text-muted hover:text-fg">
        ← Clients
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-tight">{client.name}</h1>
          <p className="mt-1 text-sm text-muted">
            {client.industry}
            {client.location ? ` · ${client.location}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setEdit(true)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (!confirm("Delete this client and their reviews?")) return;
              void deleteClient({ data: { id } }).then(() => navigate({ to: "/app/clients" }));
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-medium">Reviews</h2>
        <Button variant="accent" size="sm" onClick={() => setAddOpen(true)}>
          Add review
        </Button>
      </div>

      {pack.reviews.length === 0 ? (
        <p className="mt-6 text-sm text-muted">Paste a Google review to generate replies.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {pack.reviews.map((r) => (
            <ReviewCard key={r.id} review={r} onChanged={load} />
          ))}
        </div>
      )}

      {edit ? (
        <ClientForm
          initial={client}
          onClose={() => setEdit(false)}
          onSave={async (payload) => {
            await updateClient({ data: { id, ...payload } });
            setEdit(false);
            load();
          }}
        />
      ) : null}

      {addOpen ? (
        <AddReviewForm
          onClose={() => setAddOpen(false)}
          onSave={async (payload) => {
            await addReview({ data: { client_id: id, ...payload } });
            setAddOpen(false);
            load();
          }}
        />
      ) : null}
    </div>
  );
}

function AddReviewForm({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (p: { reviewer_name: string; rating: number; review_text: string }) => Promise<void>;
}) {
  const [reviewer_name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review_text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 sm:place-items-center sm:p-6">
      <form
        className="w-full max-w-md rounded-t-xl border border-border bg-surface p-6 sm:rounded-xl"
        onSubmit={(e) => {
          e.preventDefault();
          setBusy(true);
          void onSave({ reviewer_name, rating, review_text }).finally(() => setBusy(false));
        }}
      >
        <h2 className="text-lg font-medium">Add review</h2>
        <div className="mt-4 space-y-3">
          <div>
            <Label>Reviewer name</Label>
            <Input value={reviewer_name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Rating</Label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Review text</Label>
            <Textarea required value={review_text} onChange={(e) => setText(e.target.value)} />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" disabled={busy}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

function ReviewCard({ review, onChanged }: { review: Review; onChanged: () => void }) {
  const [options, setOptions] = useState<{ friendly: string; professional: string; third: string } | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState(review.ai_response);

  return (
    <article className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">
          {review.reviewer_name || "Customer"} · {review.rating}★
        </p>
        <StatusBadge status={review.status} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{review.review_text}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="accent"
          disabled={busy}
          onClick={() => {
            setBusy(true);
            generateReplies({ data: { review_id: review.id } })
              .then((res) => {
                setOptions(res.options);
                setDraft(res.options.friendly);
              })
              .catch((e: unknown) => toast.error(e instanceof Error ? e.message : "AI failed"))
              .finally(() => setBusy(false));
          }}
        >
          {busy ? "Writing…" : "Generate AI replies"}
        </Button>
      </div>
      {options ? (
        <div className="mt-4 space-y-3">
          {(
            [
              ["Friendly", options.friendly],
              ["Professional", options.professional],
              [review.rating <= 3 ? "Recovery" : "Warm", options.third],
            ] as const
          ).map(([label, text]) => (
            <button
              key={label}
              type="button"
              onClick={() => setDraft(text)}
              className={`w-full rounded-md border p-3 text-left text-sm ${
                draft === text ? "border-accent/50 bg-elevated" : "border-border"
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider text-subtle">{label}</span>
              <p className="mt-1 text-fg">{text}</p>
            </button>
          ))}
          <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                void navigator.clipboard.writeText(draft);
                toast.success("Copied");
              }}
            >
              Copy
            </Button>
            <Button
              size="sm"
              onClick={() => {
                void markResponded({ data: { id: review.id, ai_response: draft } }).then(() => {
                  toast.success("Marked as responded");
                  onChanged();
                });
              }}
            >
              Mark as responded
            </Button>
          </div>
        </div>
      ) : review.ai_response ? (
        <p className="mt-3 text-sm text-fg">{review.ai_response}</p>
      ) : null}
    </article>
  );
}
