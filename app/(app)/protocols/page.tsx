"use client";

import { useEffect, useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/EmptyState";

import { motion } from "framer-motion";

import {
  Droplets,
  Beef,
  Wind,
  Footprints,
  Moon,
  Pill,
  CheckCircle2,
  ChevronRight,
  Clock,
  Trophy,
  Sparkles,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import {
  getProtocolsWithProgress,
  toggleProtocolProgress,
  Protocol,
} from "@/lib/database/protocols";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/* -------------------------------------------------------------------------- */
/*                                ICON MAPPER                                 */
/* -------------------------------------------------------------------------- */

const iconMap = {
  Droplets,
  Beef,
  Wind,
  Footprints,
  Moon,
  Pill,
};

/* -------------------------------------------------------------------------- */
/*                              PROTOCOL CARD                                 */
/* -------------------------------------------------------------------------- */

function ProtocolCard({
  protocol,
  onToggle,
}: {
  protocol: Protocol;

  onToggle: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const Icon =
    iconMap[protocol.icon as keyof typeof iconMap] || Droplets;

  return (
    <motion.div
      layout
      className={cn(
        "rounded-[2rem] border p-5 transition-all duration-300",

        protocol.done
          ? "border-[#E8DED5] bg-[#FAF7F4]"
          : "border-[#E8DED5] bg-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.06)]",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl",
            protocol.bg,
          )}
        >
          <Icon className={cn("h-5 w-5", protocol.color)} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3
              className={cn(
                "text-sm font-medium",

                protocol.done
                  ? "text-[#A08C7B] line-through"
                  : "text-[#3E2D24]",
              )}
            >
              {protocol.title}
            </h3>

            <Badge
              variant="outline"
              className="border-[#E8DED5] text-[10px] font-normal text-[#8D7768]"
            >
              <Clock className="mr-1 h-2.5 w-2.5" />

              {protocol.time}
            </Badge>
          </div>

          <p
            className={cn(
              "mb-4 text-sm leading-relaxed",

              protocol.done ? "text-[#A08C7B]" : "text-[#7D6B5D]",
            )}
          >
            {expanded
              ? protocol.description
              : `${protocol.description.slice(0, 95)}...`}
          </p>

          {expanded && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              className="mb-4 rounded-2xl border border-[#EEE4DA] bg-[#FCFAF8] p-4"
            >
              <p className="text-xs leading-relaxed text-[#8D7768]">
                {protocol.tip}
              </p>
            </motion.div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggle(protocol.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200",

                  protocol.done
                    ? "bg-[#E8DED5] text-[#7D6B5D] hover:bg-[#DDD0C3]"
                    : "bg-[#6B4A36] text-white hover:bg-[#5A3F2F]",
                )}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />

                {protocol.done ? "Completed" : "Complete Practice"}
              </button>

              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-[#8D7768] transition-colors hover:text-[#6B4A36]"
              >
                {expanded ? "Less" : "Details"}

                <ChevronRight
                  className={cn(
                    "h-3 w-3 transition-transform",

                    expanded && "rotate-90",
                  )}
                />
              </button>
            </div>

            <span className="rounded-full bg-[#F4ECE4] px-3 py-1 text-xs font-medium text-[#7A553D]">
              {protocol.target}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN PAGE                                    */
/* -------------------------------------------------------------------------- */

const categories = ["All", "Morning", "Movement", "Evening"];

export default function ProtocolsPage() {
  const [items, setItems] = useState<Protocol[]>([]);

  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadProtocols() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;

        if (!user) return;

        const data = await getProtocolsWithProgress(user.id);

        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProtocols();
  }, []);

  const toggle = async (id: number) => {
    const protocol = items.find((p) => p.id === id);

    if (!protocol) return;

    const updatedDone = !protocol.done;

    setItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              done: updatedDone,
            }
          : p,
      ),
    );

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;

      if (!user) return;

      await toggleProtocolProgress({
        userId: user.id,
        protocolId: id,
        completed: updatedDone,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((p) => p.category === activeCategory);

  const completedCount = items.filter((p) => p.done).length;

  const completionPct =
    items.length > 0
      ? Math.round((completedCount / items.length) * 100)
      : 0;

  const todaysGuidance = useMemo(
    () => [
      "Gentle consistency matters more than intensity today.",

      "Prioritize calm evening transitions and slower stimulation.",

      "Focus on supportive rhythms instead of perfect execution.",
    ],
    [],
  );

  const hasProtocols = filtered.length > 0;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[#8D7768]">
          Loading guided practices...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-7 px-4 py-8 lg:px-8">
      {!hasProtocols ? (
        <EmptyState
          title="No guided practices yet"
          description="Supportive wellness routines and daily recovery practices will appear here over time."
        />
      ) : (
        <>
          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8DED5] bg-white px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#B89B84]" />

              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8D7768]">
                Guided Practices
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-tight text-[#3E2D24] lg:text-5xl">
              Your wellness rhythms
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#7D6B5D] lg:text-[15px]">
              Small restorative practices designed to support recovery,
              consistency, and a calmer relationship with wellness.
            </p>
          </motion.div>

          {/* CONSISTENCY */}
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.08,
            }}
            className="rounded-[2.5rem] bg-gradient-to-br from-[#6B4A36] via-[#5A3F2F] to-[#432D21] p-6 text-white shadow-[0_24px_70px_rgba(91,63,43,0.2)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                  Today’s Consistency
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="font-serif text-5xl leading-none">
                    {completionPct}%
                  </span>

                  <span className="mb-1 text-sm text-white/60">
                    completed
                  </span>
                </div>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <Trophy className="h-6 w-6 text-[#E6C7A7]" />
              </div>
            </div>

            <Progress
              value={completionPct}
              className="h-2 bg-white/10 [&>div]:bg-[#E6C7A7]"
            />

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Gentle consistency creates more sustainable rhythms than
              intensity alone.
            </p>
          </motion.div>

          {/* FILTERS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.12,
            }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",

                  activeCategory === cat
                    ? "bg-[#6B4A36] text-white"
                    : "bg-[#F4ECE4] text-[#7D6B5D] hover:bg-[#E8DED5]",
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* PROTOCOLS */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              delay: 0.16,
            }}
            className="space-y-4"
          >
            {filtered.map((protocol) => (
              <ProtocolCard
                key={protocol.id}
                protocol={protocol}
                onToggle={toggle}
              />
            ))}
          </motion.div>

          {/* GUIDANCE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.22,
            }}
            className="rounded-[2.5rem] border border-[#E8DED5] bg-gradient-to-br from-white to-[#FBF7F3] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
          >
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.22em] text-[#A58D7B]">
                Today’s Guidance
              </p>

              <h2 className="mt-2 font-serif text-3xl text-[#3E2D24]">
                Gentle reminders for today
              </h2>
            </div>

            <div className="space-y-4">
              {todaysGuidance.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[#8D6B54]" />

                  <p className="text-sm leading-relaxed text-[#6B5B4D]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}