import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ledo Growth OS",
  description: "AI growth operating system demo for Ledo marketing teams"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
