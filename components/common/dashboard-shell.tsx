"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { FlexRow } from "@/components/common/flex-row";
import { FlexCol } from "@/components/common/flex-col";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "./app-sidebar";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <FlexRow className="min-h-screen w-full bg-background">
      <AppSidebar open={open} onClose={() => setOpen(false)} />
      <FlexCol className="flex-1">
        <header className="flex h-14 shrink-0 items-center border-b border-border px-4">
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden"
          >
            <Menu className="size-5" />
          </Button>
        </header>
        <main className="flex-1 px-6 py-6">{children}</main>
      </FlexCol>
    </FlexRow>
  );
}
