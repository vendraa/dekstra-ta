import Sidebar from "@/components/layouts/Sidebar/Sidebar";
import TopBar from "@/components/layouts/TopBar/TopBar";
import { UserRole } from "@/components/layouts/Sidebar/sidebar.types";
import QueryProvider from "@/app/providers/query-provider";
import { notFound } from "next/navigation";

export default async function RoleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  const validRoles: UserRole[] = [
    "rt",
    "rw",
    "admin",
    "kades",
  ];

  if (
    !validRoles.includes(
      role as UserRole
    )
  ) {
    notFound();
  }

  return (
    <div className="flex h-screen bg-secondary-background">
      <Sidebar
        role={role as UserRole}
        user={{
          name: role.toUpperCase(),
          email: `${role}@dekstra.desa.id`,
          avatar: undefined,
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar role={role as UserRole} />

        <main className="flex-1 overflow-auto bg-surface p-6">
          <QueryProvider>
            {children}
          </QueryProvider>
        </main>
      </div>
    </div>
  );
}