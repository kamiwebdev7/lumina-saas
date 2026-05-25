import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function createProfile(data: {
  id: string;
  email: string;
  full_name: string;
  goal: string;
}) {
  const { data: profile, error } =
    await supabase
      .from("profiles")
      .upsert({
        id: data.id,

        email: data.email,

        full_name: data.full_name,

        goal: data.goal,

        onboarding_completed: true,
      })
      .select()
      .single();

  if (error) {
    console.error(
      "Create profile error:",
      error,
    );

    throw error;
  }

  return profile;
}

export async function getProfile(
  userId: string,
) {
  const { data, error } =
    await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

  if (error) {
    console.error(
      "Get profile error:",
      error,
    );

    throw error;
  }

  return data;
}

export async function updateProfile(
  userId: string,
  updates: {
    full_name?: string;
    goal?: string;
    avatar_url?: string;
  },
) {
  const { data, error } =
    await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

  if (error) {
    console.error(
      "Update profile error:",
      error,
    );

    throw error;
  }

  return data;
}