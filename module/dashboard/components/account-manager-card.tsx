import { MessageSquare, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ISalePerson } from "@/types/profile";

export function AccountManagerCard({ salePerson }: { salePerson?: ISalePerson | null }) {
  if (!salePerson) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Account Manager</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3 text-center">
        <Avatar className="size-16">
          <AvatarFallback>
            <User className="h-7 w-7 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground">
            {salePerson.firstName} {salePerson.lastName}
          </span>
          <span className="text-xs text-muted-foreground">Sales Representative</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {salePerson.contactNo && (
          <Button asChild className="flex-1">
            <a href={`tel:${salePerson.contactNo}`}>
              <Phone className="h-3.5 w-3.5" />
              Call: {salePerson.contactNo}
            </a>
          </Button>
        )}
        <Button variant="secondary" size="icon">
          <MessageSquare className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
