"use client";

import Card from "@/components/ui/Card/Card";
import { useProfile } from "../hooks/useProfile";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfileSection from "../components/ProfileSection/ProfileSection";
import { getPersonalFields } from "../utils/profile.fields";

export default function ProfilePageContainer() {
  const { profile, loading, error } = useProfile();

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error || !profile) {
    return (
      <div className="p-8 text-red-500">
        {error || "Data tidak ditemukan"}
      </div>
    );
  }

  const personalFields = getPersonalFields(profile);

  const accountFields = [
    { label: "Email", value: profile.email },
    { label: "Nomor Telepon", value: profile.phone },
  ];

  return (
    <>
      <Card className="overflow-hidden p-8">

        <div className="py-5 -mt-7">
          <ProfileHeader
            name={profile.name}
            email={profile.email}
            role={profile.role}
          />
        </div>

        <div className="-mx-8 border-b border-border" />

        <div className="py-5">
          <ProfileSection
            title="Informasi Pribadi"
            fields={personalFields}
          />
        </div>

        <div className="-mx-8 border-b border-border" />

        <div className="pt-5">
          <ProfileSection
            title="Informasi Akun"
            fields={accountFields}
          />
        </div>

      </Card>
    </>
  );
}