"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authCookies } from "@/lib/cookies";
import { Button } from "@/components/ui/button";

export function SidebarLogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    authCookies.clear();
    router.push("/login");
  };

  return (
    <div className="border-t border-border p-3">
      <Button
        type="button"
        variant="ghost"
        onClick={handleLogout}
        className="w-full cursor-pointer justify-start gap-3 px-3 text-muted-foreground"
      >
        <LogOut className="size-4" />
        Logout
      </Button>
    </div>
  );
}
