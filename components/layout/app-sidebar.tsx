"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

import { navigationItems, workspaceStats } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[248px] shrink-0 border-r bg-card/80 px-3 py-4 backdrop-blur md:flex md:flex-col">
      <Link href="/" className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background">
          <Sparkles className="h-4 w-4 text-ai" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-5">Ledo Growth OS</div>
          <div className="text-xs text-muted-foreground">AI 营销演示系统</div>
        </div>
      </Link>

      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-9 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                isActive && "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border bg-background/60 p-3">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-ai" />
          工作空间
        </div>
        <div className="grid grid-cols-3 gap-2">
          {workspaceStats.map((stat) => (
            <div key={stat.label}>
              <div className="text-[11px] text-muted-foreground">{stat.label}</div>
              <div className="text-xs font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
