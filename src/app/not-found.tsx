import type { ReactNode } from "react";

export default function NotFound(): ReactNode {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-foreground text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found.</p>
    </main>
  );
}
