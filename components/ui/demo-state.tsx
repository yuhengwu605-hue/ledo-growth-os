import type { ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

export function DemoLoadingState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-[640px] animate-fade-in flex-col items-center justify-center rounded-xl border bg-background/50 text-center">
      <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border bg-card shadow-soft">
        <LoaderCircle className="h-6 w-6 animate-spin text-ai" />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-ai" />
      </div>
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-2 max-w-sm text-xs leading-5 text-muted-foreground">{description}</div>
    </div>
  );
}

export function DemoEmptyState({
  icon,
  title,
  description
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[640px] animate-fade-in flex-col items-center justify-center rounded-xl border bg-background/50 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border bg-card text-ai shadow-soft">
        {icon}
      </div>
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-2 max-w-sm text-xs leading-5 text-muted-foreground">{description}</div>
    </div>
  );
}
