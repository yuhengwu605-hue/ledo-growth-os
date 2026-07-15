export function AppFooter() {
  return (
    <footer className="border-t px-4 py-4 text-xs text-muted-foreground md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>AI 营销操作系统演示版</span>
        <div className="flex items-center gap-3">
          <span>版本 1.0</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
          <span>演示项目</span>
        </div>
      </div>
    </footer>
  );
}
