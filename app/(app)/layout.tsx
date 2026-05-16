// app/(app)/layout.tsx
// This layout wraps ALL protected routes:
// /dashboard, /progress, /protocols, /schedule, /settings
//
// AuthProvider here means every page in the (app) group
// can safely call useAuth() without crashing the build.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthProvider } from "@/context/AuthContext";
import AppSidebar from "@/components/layout/AppSidebar";
import MobileTopbar from "@/components/layout/MobileTopbar";
import MobileNav from "@/components/layout/MobileNav";

export default async function AppLayout({
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
    <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-background">

        {/* Desktop sidebar */}
        <AppSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Topbar — reads user from AuthContext */}
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