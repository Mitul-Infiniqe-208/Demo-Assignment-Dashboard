"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMe } from "../hook/useMe";
import { AccountManagerCard } from "./account-manager-card";
import { AccountPermissionsCard } from "./account-permissions-card";
import { CompanyDetailsCard } from "./company-details-card";
import { ContactInfoCard } from "./contact-info-card";
import { ProfilePageHeader } from "./profile-page-header";

function ProfileSummarySkeleton() {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-muted/40 p-6">
      <div className="flex flex-col gap-2">
        <div className="h-7 w-72 animate-pulse rounded bg-muted" />
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="h-48 animate-pulse rounded-xl bg-card shadow-sm ring-1 ring-foreground/10" />
          <div className="h-32 animate-pulse rounded-xl bg-card shadow-sm ring-1 ring-foreground/10" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="h-48 animate-pulse rounded-xl bg-card shadow-sm ring-1 ring-foreground/10" />
          <div className="h-32 animate-pulse rounded-xl bg-card shadow-sm ring-1 ring-foreground/10" />
        </div>
      </div>
    </div>
  );
}

export function ProfileSummary() {
  const { user, isLoading, isError } = useMe();

  if (isLoading) return <ProfileSummarySkeleton />;

  if (isError || !user) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="text-sm text-muted-foreground">
          Unable to load profile.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-muted/40 p-6">
      <ProfilePageHeader user={user} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <CompanyDetailsCard user={user} />
          <ContactInfoCard user={user} />
        </div>
        <div className="flex flex-col gap-6">
          <AccountManagerCard salePerson={user.salePerson} />
          <AccountPermissionsCard user={user} />
        </div>
      </div>
    </div>
  );
}
