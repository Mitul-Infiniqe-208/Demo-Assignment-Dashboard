import type { ReactNode } from "react";
import { DashboardShell } from "@/module/dashboard/components/dashboard-shell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
