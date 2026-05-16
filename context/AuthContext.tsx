"use client";

// context/AuthContext.tsx
// Central auth state for the entire app.
// Wrap your root layout (or dashboard layout) with <AuthProvider>.
// Any component can call useAuth() to get user data — no prop drilling.

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthUser {
  id: string;
  email: string;
  fullName: string;       // user_metadata.full_name
  initials: string;       // derived from fullName
  avatarUrl: string | null; // user_metadata.avatar_url (OAuth)
}

interface AuthContextValue {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function deriveInitials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function buildAuthUser(user: User): AuthUser {
  const fullName: string =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "User";

  return {
    id: user.id,
    email: user.email ?? "",
    fullName,
    initials: deriveInitials(fullName),
    avatarUrl: user.user_metadata?.avatar_url ?? null,
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    window.location.href = "/";
  }, [supabase]);

  useEffect(() => {
    // 1. Load initial session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ? buildAuthUser(session.user) : null);
      setLoading(false);
    });

    // 2. Subscribe to auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ? buildAuthUser(session.user) : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}