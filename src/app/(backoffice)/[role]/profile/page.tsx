import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import ProfilePageContainer from "@/features/profile/containers/ProfilePageContainer";

const VALID_ROLES = ["rt", "rw", "admin", "kades"] as const;
type ValidRole = (typeof VALID_ROLES)[number];

interface PageProps {
  params: Promise<{
    role: string;
  }>;
}

// Label hanya untuk UI (bukan source of truth)
function getRoleLabel(role: ValidRole): string {
  const labels: Record<ValidRole, string> = {
    rt: "RT",
    rw: "RW",
    admin: "Admin",
    kades: "Kepala Desa",
  };
  return labels[role];
}

function getDashboardHref(role: ValidRole): string {
  const hrefs: Record<ValidRole, string> = {
    rt: "/rt/dashboard",
    rw: "/rw/dashboard",
    admin: "/admin/dashboard",
    kades: "/kades/dashboard",
  };
  return hrefs[role];
}

export default async function BackofficeProfilePage({ params }: PageProps) {
  const { role } = await params;

  if (!VALID_ROLES.includes(role as ValidRole)) {
    notFound();
  }

  const validRole = role as ValidRole;
  const roleLabel = getRoleLabel(validRole);
  const dashboardHref = getDashboardHref(validRole);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Profil {roleLabel}
      </h1>

      <Breadcrumb
        homeHref={dashboardHref}
        items={[{ label: "Profil Saya" }]}
      />

      <ProfilePageContainer />
    </div>
  );
}

// Static params tetap sama
export function generateStaticParams() {
  return VALID_ROLES.map((role) => ({
    role: role,
  }));
}