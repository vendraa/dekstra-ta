import ProfilePageContainer from "@/features/profile/containers/ProfilePageContainer"
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Profile Saya
      </h1>
      <Breadcrumb
        homeHref="/dashboard"
        items={[{ label: "Profile Saya" }]}
      />
      <ProfilePageContainer />
    </div>
  );
}