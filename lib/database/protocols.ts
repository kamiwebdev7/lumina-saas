import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export type Protocol = {
  id: number;
  title: string;
  description: string;
  target: string;
  time: string;
  category: string;
  tip: string;
  icon: string;
  color: string;
  bg: string;
  done: boolean;
};

type ProtocolProgressRow = {
  protocol_id: number;
  completed: boolean;
};

/* -------------------------------------------------------------------------- */
/*                              FETCH PROTOCOLS                               */
/* -------------------------------------------------------------------------- */

export async function getProtocols(): Promise<Protocol[]> {
  const { data, error } = await supabase
    .from("protocols")
    .select("*")
    .order("id");

  if (error) {
    console.error("Failed to fetch protocols:", error.message);

    throw error;
  }

  return (data || []).map((protocol) => ({
    ...protocol,
    done: false,
  }));
}

/* -------------------------------------------------------------------------- */
/*                        FETCH USER PROGRESS STATE                           */
/* -------------------------------------------------------------------------- */

export async function getProtocolsWithProgress(
  userId: string,
): Promise<Protocol[]> {
  const protocols = await getProtocols();

  const { data: progress, error } = await supabase
    .from("protocol_progress")
    .select("protocol_id, completed")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch protocol progress:", error.message);

    throw error;
  }

  const progressMap = new Map<number, boolean>(
    (progress as ProtocolProgressRow[])?.map((item) => [
      item.protocol_id,
      item.completed,
    ]),
  );

  return protocols.map((protocol) => ({
    ...protocol,
    done: progressMap.get(protocol.id) ?? false,
  }));
}

/* -------------------------------------------------------------------------- */
/*                           TOGGLE PROTOCOL STATE                            */
/* -------------------------------------------------------------------------- */

export async function toggleProtocolProgress({
  userId,
  protocolId,
  completed,
}: {
  userId: string;
  protocolId: number;
  completed: boolean;
}) {
  // ─────────────────────────────────────
  // Check Existing Record
  // ─────────────────────────────────────

  const { data: existing, error: existingError } = await supabase
    .from("protocol_progress")
    .select("id")
    .eq("user_id", userId)
    .eq("protocol_id", protocolId)
    .maybeSingle();

  if (existingError) {
    console.error("Failed checking protocol progress:", existingError.message);

    throw existingError;
  }

  // ─────────────────────────────────────
  // Update Existing
  // ─────────────────────────────────────

  if (existing) {
    const { error: updateError } = await supabase
      .from("protocol_progress")
      .update({
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      })
      .eq("id", existing.id);

    if (updateError) {
      console.error("Failed updating protocol progress:", updateError.message);

      throw updateError;
    }

    return;
  }

  // ─────────────────────────────────────
  // Insert New
  // ─────────────────────────────────────

  const { error: insertError } = await supabase
    .from("protocol_progress")
    .insert({
      user_id: userId,

      protocol_id: protocolId,

      completed,

      completed_at: new Date().toISOString(),

      energy_score: Math.floor(Math.random() * 20 + 70),

      sleep_score: Math.floor(Math.random() * 20 + 70),

      recovery_score: Math.floor(Math.random() * 20 + 70),

      stress_score: Math.floor(Math.random() * 20 + 60),

      notes: "Recovery consistency improving gradually.",
    });

  if (insertError) {
    console.error("Failed inserting protocol progress:", insertError.message);

    throw insertError;
  }
}

/* -------------------------------------------------------------------------- */
/*                           OPTIONAL RESET HELPER                            */
/* -------------------------------------------------------------------------- */

export async function resetProtocolProgress(userId: string) {
  const { error } = await supabase
    .from("protocol_progress")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Failed resetting progress:", error.message);

    throw error;
  }
}
