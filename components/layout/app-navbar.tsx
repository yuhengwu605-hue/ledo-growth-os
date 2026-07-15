"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/config/navigation";

export function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentItem = navigationItems.find((item) => item.href === pathname);

  return (
    <header className="relative flex h-14 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          className="md:hidden"
          size="icon"
          variant="ghost"
          aria-label={isOpen ? "关闭导航" : "打开导航"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{currentItem?.title ?? "营销仪表盘"}</div>
          <div className="hidden text-xs text-muted-foreground sm:block">
            AI 营销工作台
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="hidden min-w-[220px] justify-start text-muted-foreground md:flex"
        >
          <Search className="h-4 w-4" />
          搜索工作台
        </Button>
        <ThemeToggle />
        <Button asChild variant="ai">
          <Link href="/marketing-generator">生成方案</Link>
        </Button>
      </div>

      {isOpen ? (
        <div className="absolute inset-x-3 top-16 z-50 rounded-xl border bg-card p-2 shadow-panel md:hidden">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
              data-active={pathname === item.href}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
