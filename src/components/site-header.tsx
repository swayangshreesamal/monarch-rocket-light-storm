import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function SiteHeader() {
  const { isPending } = useCurrentUserState();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <Mark />
          <span className="text-[15px] font-medium tracking-tight">ClientBoost</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-accent sm:inline">
            live
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="/#how" className="hover:text-fg">
            How it works
          </a>
          <a href="/#product" className="hover:text-fg">
            Product
          </a>
          <a href="/#pricing" className="hover:text-fg">
            Pricing
          </a>
          <Link to="/about" className="hover:text-fg">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-elevated" />
          ) : (
            <>
              <SignedOut>
                <Link to="/login" className="hidden text-sm text-muted hover:text-fg sm:inline">
                  Log in
                </Link>
                <Link to="/login" className="hud-btn hud-btn-light inline-flex h-9 items-center rounded-md px-3.5 text-sm font-medium">
                  Start free
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/app" className="hud-btn hud-btn-light inline-flex h-9 items-center rounded-md px-3.5 text-sm font-medium">
                  Open dashboard
                </Link>
              </SignedIn>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function Mark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="#171a1e" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="#23282e" />
      <path
        d="M10 20.5c0-4.2 2.6-7 6.2-7 2.4 0 4.1 1.1 5 2.6"
        fill="none"
        stroke="#7dcea0"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="21.4" cy="13.2" r="1.4" fill="#7dcea0" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-subtle">
          <Mark className="size-5" />
          <span>© {new Date().getFullYear()} ClientBoost</span>
        </div>
        <div className="flex gap-6 text-sm text-muted">
          <Link to="/about" className="hover:text-fg">
            About
          </Link>
          <Link to="/login" className="hover:text-fg">
            Log in
          </Link>
        </div>
      </div>
    </footer>
  );
}
