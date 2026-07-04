import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/types/profile";
import { DetailRow } from "./detail-row";

export function CompanyDetailsCard({ user }: { user: IUser }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company &amp; Tax Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-md border border-border">
          {user.companyName && (
            <div className="border-b border-border/60 bg-muted/20 px-4 py-3 text-base font-semibold text-foreground">
              {user.companyName}
            </div>
          )}
          <DetailRow label="GSTIN" value={user.gstNo} />
          <DetailRow label="Business Address" value={user.address} />
          <DetailRow
            label="City/State"
            value={
              user.city || user.state
                ? `${user.city ?? ""}, ${user.state ?? ""}${user.pinCode ? ` | ${user.pinCode}` : ""}`
                : undefined
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
