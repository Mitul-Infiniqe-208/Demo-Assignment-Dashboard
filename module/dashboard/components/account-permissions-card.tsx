import { CheckCircle2, Lock, LockOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/types/profile";

export function AccountPermissionsCard({ user }: { user: IUser }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Permissions</CardTitle>
        <CardAction>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 py-2">
          <span className="text-sm text-muted-foreground">Rate Update Permission</span>
          <Badge variant="outline">
            {user.canAuthorizedDealerUpdateRate ? (
              <>
                <LockOpen className="h-3.5 w-3.5" />
                Enabled
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5" />
                Locked
              </>
            )}
          </Badge>
        </div>
        <div className="flex items-center justify-between gap-3 py-2">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge variant="secondary">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {user.isAuthorizedDealer ? "Verified Dealer" : "Unverified"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
