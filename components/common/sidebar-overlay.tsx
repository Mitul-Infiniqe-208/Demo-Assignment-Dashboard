import { cn } from "@/lib/utils";

interface SidebarOverlayProps {
  onClose: () => void;
  className?: string;
}

export function SidebarOverlay({ onClose, className }: SidebarOverlayProps) {
  return (
    <div
      className={cn("fixed inset-0 z-40 bg-black/50", className)}
      onClick={onClose}
    />
  );
}
