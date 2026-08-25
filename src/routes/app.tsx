import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { CreditCard, LayoutDashboard, MessageSquare, Settings, Store } from "lucide-react";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Mark } from "@/components/site-header";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({ component: AppLayout });

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/clients", label: "Clients", icon: Store, exact: false },
  { to: "/app/reviews", label: "Reviews", icon: MessageSquare, exact: false },
  { to: "/app/billing", label: "Billing", icon: CreditCard, exact: false },
  { to: "/app/settings", label: "Settings", icon: Settings, exact: false },
] as const;

function AppLayout() {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (isPending) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg">
        <div className="h-8 w-40 animate-pulse rounded-md bg-elevated" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <div className="min-h-dvh bg-bg lg:grid lg:grid-cols-[220px_1fr]">
      <aside className="border-b border-border lg:border-b-0 lg:border-r">
        <div className="flex h-14 items-center gap-2 px-4 lg:h-16">
          <Link to="/" className="flex items-center gap-2">
            <Mark className="size-6" />
            <span className="text-sm font-medium">ClientBoost</span>
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-6">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm whitespace-nowrap",
                  active ? "hud-chip text-fg" : "text-muted hover:text-fg",
                )}
              >
                <item.icon className="size-4" strokeWidth={1.7} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex h-14 items-center justify-end border-b border-border px-4 lg:h-16 lg:px-8">
          <UserButton />
        </header>
        <div className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
