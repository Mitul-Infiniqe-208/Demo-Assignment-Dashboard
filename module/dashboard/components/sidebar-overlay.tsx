interface SidebarOverlayProps {
  onClose: () => void;
}

export function SidebarOverlay({ onClose }: SidebarOverlayProps) {
  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
  );
}
