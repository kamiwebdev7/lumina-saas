// app/(app)/dashboard/layout.tsx
// Server Component — validates session server-side, then wraps children
// in AuthProvider so every Client Component can call useAuth() safely.
//
// WITHOUT AuthProvider here, useAuth() returns null context and the
// build fails with "Failed to collect page data for /dashboard".

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthProvider } from "@/context/AuthContext";

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

  // AuthProvider is a Client Component boundary.
  // It gives useAuth() access to real user data in all children.
  return <AuthProvider>{children}</AuthProvider>;
}