import { Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/types/profile";

export function ContactInfoCard({ user }: { user: IUser }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
          <div className="flex items-center justify-between gap-3 bg-card p-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Email Address</span>
              <span className="text-sm font-medium text-foreground">{user.email}</span>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 bg-card p-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Primary Contact</span>
              <span className="text-sm font-medium text-foreground">{user.contactNo}</span>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <Phone className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
