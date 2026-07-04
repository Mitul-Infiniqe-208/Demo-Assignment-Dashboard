"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, User, type LucideIcon } from "lucide-react";
import { SidebarNavItem } from "./sidebar-nav-item";


interface SidebarNavProps {
  onNavigate: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}


export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Employees", href: "/employees", icon: Users },
  ];

  return (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {navItems.map((item) => (
        <SidebarNavItem
          key={item.href}
          label={item.label}
          href={item.href}
          icon={item.icon}
          isActive={pathname === item.href}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
