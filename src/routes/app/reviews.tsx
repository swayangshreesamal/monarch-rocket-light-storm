import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { listReviews, type Review } from "@/lib/server/data";
import { StatusBadge } from "./index";

export const Route = createFileRoute("/app/reviews")({ component: ReviewsInbox });

function ReviewsInbox() {
  const [rows, setRows] = useState<Review[] | null>(null);
  const [status, setStatus] = useState<"all" | "pending" | "responded">("all");
  const [rating, setRating] = useState<"all" | "5" | "4" | "3" | "2" | "1">("all");

  useEffect(() => {
    listReviews().then(setRows).catch(() => setRows([]));
  }, []);

  const filtered = useMemo(() => {
    if (!rows) return [];
    return rows.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (rating !== "all" && String(r.rating) !== rating) return false;
      return true;
    });
  }, [rows, status, rating]);

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Inbox</h1>
      <p className="mt-1 text-sm text-muted">Every review across your clients.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "pending", "responded"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`h-9 rounded-md px-3 text-sm capitalize ${
              status === s ? "bg-elevated text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {s}
          </button>
        ))}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value as typeof rating)}
          className="h-9 rounded-md border border-border bg-surface px-2 text-sm"
        >
          <option value="all">All ratings</option>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={String(n)}>
              {n} stars
            </option>
          ))}
        </select>
      </div>
      {rows === null ? (
        <p className="mt-8 text-sm text-muted">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Nothing in this filter.</p>
      ) : (
        <ul className="mt-6 divide-y divide-border rounded-lg border border-border">
          {filtered.map((r) => (
            <li key={r.id}>
              <Link
                to="/app/clients/$clientId"
                params={{ clientId: String(r.client_id) }}
                className="block px-4 py-4 hover:bg-elevated/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">
                    {r.client_name} · {r.rating}★
                  </p>
                  <StatusBadge status={r.status} />
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{r.review_text}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
