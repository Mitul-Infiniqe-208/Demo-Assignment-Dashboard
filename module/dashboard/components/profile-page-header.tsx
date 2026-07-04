import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/profile";

export function ProfilePageHeader({ user }: { user: IUser }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold text-foreground">
          Dealer Profile: {user.firstName} {user.lastName}
        </h1>
        <Badge variant="secondary">{user.role?.name ?? "Dealer"}</Badge>
      </div>
      {user.referenceCode && (
        <span className="text-sm text-muted-foreground">
          Reference Code: {user.referenceCode}
        </span>
      )}
    </div>
  );
}
