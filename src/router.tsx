import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6 text-center">
      <div>
        <p className="font-display text-6xl text-fg">404</p>
        <p className="mt-3 text-sm text-muted">That page isn’t here.</p>
        <a href="/" className="mt-6 inline-block text-sm text-accent hover:underline">
          Go home
        </a>
      </div>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
