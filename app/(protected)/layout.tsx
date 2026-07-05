import type { ReactNode } from "react";
import { DashboardShell } from "@/components/common/dashboard-shell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
