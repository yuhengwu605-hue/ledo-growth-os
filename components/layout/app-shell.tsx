import * as React from "react";

import { AppFooter } from "@/components/layout/app-footer";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AppNavbar />
            <main className="flex-1 animate-fade-in p-4 md:p-6">{children}</main>
            <AppFooter />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
