"use client";

import { useState } from "react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-400">
        <div className="flex min-h-screen">
          <aside
            className={`${
              open ? "w-56" : "w-14"
            } transition-all bg-slate-900 p-4`}
          >
            <button
              onClick={() => setOpen(!open)}
              className="mb-6 text-xs text-slate-400"
            >
              {open ? "<<" : ">>"}
            </button>

            <nav className="flex flex-col gap-4 text-sm">
              <Link href="/crm">CRM</Link>
              <Link href="/analytics">Analytics</Link>
            </nav>
          </aside>

          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
