"use client";

import { cn } from "@/lib/utils";
import { SidebarOverlay } from "./sidebar-overlay";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNav } from "./sidebar-nav";
import { SidebarLogoutButton } from "./sidebar-logout-button";

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  return (
    <>
      {open && <SidebarOverlay onClose={onClose} />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-border bg-background transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarHeader onClose={onClose} />
        <SidebarNav onNavigate={onClose} />
        <SidebarLogoutButton />
      </aside>
    </>
  );
}
