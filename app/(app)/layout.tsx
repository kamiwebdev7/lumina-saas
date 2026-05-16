// app/dashboard/layout.tsx
// Server Component — validates session, then wraps children in AuthProvider.
// AuthProvider is required for useAuth() to work in all child Client Components.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthProvider } from "@/context/AuthContext";
import AppSidebar from "@/components/layout/AppSidebar";
import MobileTopbar from "@/components/layout/MobileTopbar";
import MobileNav from "@/components/layout/MobileNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    // AuthProvider gives all Client Components access to user via useAuth()
    // This is what powers the real name/initials/avatar everywhere
    <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-background">

        {/* Desktop sidebar — hidden on mobile */}
        <AppSidebar />

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Single topbar — your existing MobileTopbar, now auth-connected */}
          <MobileTopbar />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
            {children}
          </main>

        </div>

        {/* Mobile bottom nav */}
        <div className="lg:hidden">
          <MobileNav />
        </div>

      </div>
    </AuthProvider>
  );
}