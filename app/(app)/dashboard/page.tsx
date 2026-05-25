"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Moon,
  Zap,
  Droplets,
  Activity,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Heart,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import { AuthLoadingScreen } from "@/components/ui/AuthLoadingScreen";

import { Progress } from "@/components/ui/progress";

import { Badge } from "@/components/ui/badge";

import { createClient } from "@/lib/supabase/client";

/* -------------------------------------------------------------------------- */
/*                               SUPABASE                                     */
/* -------------------------------------------------------------------------- */

const supabase = createClient();

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Profile = {
  id: string;

  full_name: string;

  goal: string;

  energy_issue: string;

  sleep_quality: string;

  stress_level: string;

  lifestyle_rhythm: string;

  recovery_priority: string;
};

type WellnessCard = {
  icon: any;

  label: string;

  value: string;

  detail: string;

  color: string;

  bg: string;

  border: string;
};

type Protocol = {
  title: string;

  description: string;

  progress: number;

  duration: string;
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function DashboardPage() {
  const { user, loading } =
    useAuth();

  const [profile, setProfile] =
    useState<Profile | null>(
      null,
    );

  const [
    dashboardLoading,
    setDashboardLoading,
  ] = useState(true);

  /* ---------------------------------------------------------------------- */
  /*                             LOAD PROFILE                               */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return;

      try {
        const {
          data,
          error,
        } =
          await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (error) {
          console.error(
            "Profile load error:",
            error,
          );

          return;
        }

        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setDashboardLoading(
          false,
        );
      }
    }

    loadProfile();
  }, [user?.id]);

  /* ---------------------------------------------------------------------- */
  /*                             USER NAME                                  */
  /* ---------------------------------------------------------------------- */

  const firstName =
    useMemo(() => {
      if (
        profile?.full_name
      ) {
        return profile.full_name.split(
          " ",
        )[0];
      }

      if (
        user?.fullName
      ) {
        return user.fullName.split(
          " ",
        )[0];
      }

      return "Guest";
    }, [
      profile?.full_name,
      user?.fullName,
    ]);

  /* ---------------------------------------------------------------------- */
  /*                         HERO DESCRIPTION                               */
  /* ---------------------------------------------------------------------- */

  const heroDescription =
    useMemo(() => {
      if (!profile) {
        return "Your personalized wellness journey is beginning.";
      }

      if (
        profile.stress_level ===
          "Frequently overwhelmed" ||
        profile.stress_level ===
          "Constant nervous system overload"
      ) {
        return "Your current focus is nervous system regulation, restorative consistency, and reducing overstimulation.";
      }

      if (
        profile.goal ===
        "Energy"
      ) {
        return "Your wellness rhythm is currently focused on improving sustainable energy and reducing instability.";
      }

      if (
        profile.goal ===
        "Sleep"
      ) {
        return "Your recovery journey is centered around improving sleep rhythm and overnight restoration.";
      }

      if (
        profile.goal ===
        "Stress"
      ) {
        return "Gentle nervous system regulation and restorative consistency are currently your highest priorities.";
      }

      return "Your wellness rhythm is gradually becoming more restorative and sustainable.";
    }, [profile]);

  /* ---------------------------------------------------------------------- */
  /*                           CURRENT FOCUS                                */
  /* ---------------------------------------------------------------------- */

  const currentFocus =
    useMemo(() => {
      if (!profile)
        return [];

      const focus: string[] =
        [];

      if (
        profile.goal ===
        "Stress"
      ) {
        focus.push(
          "Nervous system regulation",
        );
      }

      if (
        profile.goal ===
        "Sleep"
      ) {
        focus.push(
          "Sleep consistency",
        );
      }

      if (
        profile.goal ===
        "Energy"
      ) {
        focus.push(
          "Energy stabilization",
        );
      }

      if (
        profile.recovery_priority
      ) {
        focus.push(
          profile.recovery_priority,
        );
      }

      focus.push(
        "Restorative movement",
      );

      return focus;
    }, [profile]);

  /* ---------------------------------------------------------------------- */
  /*                           WELLNESS CARDS                               */
  /* ---------------------------------------------------------------------- */

  const wellnessCards =
    useMemo<
      WellnessCard[]
    >(() => {
      return [
        {
          icon: Moon,

          label:
            "Sleep Rhythm",

          value:
            profile?.sleep_quality ||
            "Moderate",

          detail:
            "Overnight recovery quality",

          color:
            "text-[#7C6FA0]",

          bg: "bg-[#F3EFF9]",

          border:
            "border-[#E9E1F4]",
        },

        {
          icon: Zap,

          label:
            "Energy Stability",

          value:
            profile?.energy_issue?.includes(
              "drained",
            )
              ? "Low"
              : "Improving",

          detail:
            "Daily energy regulation",

          color:
            "text-[#9A7B5F]",

          bg: "bg-[#F8F2EB]",

          border:
            "border-[#E9DED2]",
        },

        {
          icon:
            Activity,

          label:
            "Stress Load",

          value:
            profile?.stress_level ||
            "Moderate",

          detail:
            "Nervous system rhythm",

          color:
            "text-[#7C9B83]",

          bg: "bg-[#EEF5EF]",

          border:
            "border-[#DFECE1]",
        },

        {
          icon:
            Droplets,

          label:
            "Recovery Focus",

          value:
            profile?.recovery_priority ||
            "Consistency",

          detail:
            "Primary restoration goal",

          color:
            "text-[#5D98B8]",

          bg: "bg-[#EEF6FB]",

          border:
            "border-[#DDECF6]",
        },
      ];
    }, [profile]);

  /* ---------------------------------------------------------------------- */
  /*                           ACTIVE PROTOCOLS                             */
  /* ---------------------------------------------------------------------- */

  const activeProtocols =
    useMemo<
      Protocol[]
    >(() => {
      if (!profile)
        return [];

      if (
        profile.goal ===
        "Stress"
      ) {
        return [
          {
            title:
              "Nervous System Reset",

            description:
              "Gentle restorative practices focused on reducing overstimulation and improving recovery rhythm.",

            progress: 68,

            duration:
              "14 day rhythm",
          },

          {
            title:
              "Evening Recovery Ritual",

            description:
              "Structured evening wind-down practices supporting nervous system restoration.",

            progress: 74,

            duration:
              "Ongoing",
          },
        ];
      }

      if (
        profile.goal ===
        "Sleep"
      ) {
        return [
          {
            title:
              "Sleep Consistency Reset",

            description:
              "Supporting deeper restoration through more stable sleep and wake timing.",

            progress: 61,

            duration:
              "21 day cycle",
          },

          {
            title:
              "Circadian Rhythm Support",

            description:
              "Morning light exposure and evening nervous system regulation support.",

            progress: 79,

            duration:
              "Ongoing",
          },
        ];
      }

      if (
        profile.goal ===
        "Energy"
      ) {
        return [
          {
            title:
              "Energy Stabilization",

            description:
              "Hydration rhythm, recovery pacing, and restorative movement support.",

            progress: 81,

            duration:
              "14 day cycle",
          },

          {
            title:
              "Morning Activation",

            description:
              "Reducing crashes and improving sustainable daily capacity.",

            progress: 66,

            duration:
              "Ongoing",
          },
        ];
      }

      return [
        {
          title:
            "Foundational Recovery",

          description:
            "Guided wellness consistency and recovery support.",

          progress: 70,

          duration:
            "Ongoing",
        },
      ];
    }, [profile]);

  /* ---------------------------------------------------------------------- */
  /*                           SESSION INFO                                 */
  /* ---------------------------------------------------------------------- */

  const upcomingSession =
    useMemo(() => {
      if (
        profile?.goal ===
        "Stress"
      ) {
        return {
          title:
            "Nervous System Recovery Review",

          day: "Thursday",

          time: "7:00 PM",
        };
      }

      if (
        profile?.goal ===
        "Sleep"
      ) {
        return {
          title:
            "Sleep Rhythm Optimization",

          day: "Wednesday",

          time: "8:00 PM",
        };
      }

      return {
        title:
          "Guided Recovery Review",

        day: "Thursday",

        time: "6:30 PM",
      };
    }, [profile]);

  /* ---------------------------------------------------------------------- */
  /*                           ANIMATION                                    */
  /* ---------------------------------------------------------------------- */

  const fadeUp = (
    delay = 0,
  ) => ({
    initial: {
      opacity: 0,
      y: 24,
    },

    animate: {
      opacity: 1,
      y: 0,
    },

    transition: {
      duration: 0.65,
      delay,
    },
  });

  /* ---------------------------------------------------------------------- */
  /*                               LOADING                                  */
  /* ---------------------------------------------------------------------- */

  if (
    loading ||
    dashboardLoading
  ) {
    return (
      <AuthLoadingScreen />
    );
  }

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 pb-10 pt-4 lg:px-8">

      {/* HERO */}

      <motion.section
        {...fadeUp(0)}
        className="relative overflow-hidden rounded-[2.8rem] border border-white/30 bg-gradient-to-br from-[#7A553D] via-[#654635] to-[#432D21] p-7 text-white shadow-[0_30px_80px_rgba(91,63,43,0.22)] lg:p-10"
      >
        <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-white/5 blur-3xl" />

        <div className="absolute -bottom-24 -right-24 h-[320px] w-[320px] rounded-full bg-[#D6B79C]/10 blur-3xl" />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

          {/* LEFT */}

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-[#E6C7A7]" />

              <span className="text-[10px] uppercase tracking-[0.24em] text-white/70">
                Personalized Recovery Experience
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.02] tracking-tight lg:text-6xl">
              Your recovery rhythm is evolving,
              <br />

              <span className="text-[#E6C7A7]">
                {firstName}.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/72 lg:text-[15px]">
              {
                heroDescription
              }
            </p>
          </div>

          {/* RIGHT */}

          <div className="w-full max-w-[320px] rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                Current Focus
              </p>

              <Heart className="h-4 w-4 text-[#E6C7A7]" />
            </div>

            <div className="mt-5 space-y-4">
              {currentFocus.map(
                (
                  item,
                ) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#E6C7A7]" />

                    <p className="text-sm text-white/80">
                      {item}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* WELLNESS CARDS */}

      <motion.section
        {...fadeUp(0.08)}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {wellnessCards.map(
          (card) => (
            <div
              key={card.label}
              className={`rounded-[2rem] border ${card.border} bg-white/90 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl`}
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${card.bg}`}
              >
                <card.icon
                  className={`h-5 w-5 ${card.color}`}
                />
              </div>

              <p className="text-sm text-[#8D7768]">
                {card.label}
              </p>

              <h3 className="mt-1 font-serif text-2xl text-[#3E2D24]">
                {card.value}
              </h3>

              <p className="mt-2 text-sm text-[#9A8475]">
                {card.detail}
              </p>
            </div>
          ),
        )}
      </motion.section>

      {/* PROTOCOLS */}

      <motion.section
        {...fadeUp(0.12)}
        className="grid grid-cols-1 gap-5 xl:grid-cols-3"
      >

        {/* LEFT */}

        <div className="xl:col-span-2 rounded-[2.5rem] border border-[#E8DED5] bg-white/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A58D7B]">
                Personalized Protocols
              </p>

              <h2 className="mt-2 font-serif text-3xl text-[#3E2D24]">
                Your guided wellness rhythms
              </h2>
            </div>

            <Badge className="border-0 bg-[#F4ECE4] text-[#7A553D]">
              Personalized
            </Badge>
          </div>

          <div className="space-y-4">
            {activeProtocols.map(
              (
                protocol,
              ) => (
                <div
                  key={
                    protocol.title
                  }
                  className="rounded-[2rem] border border-[#EEE4DA] bg-[#FCFAF8] p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                      <h3 className="font-medium text-[#3E2D24]">
                        {
                          protocol.title
                        }
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[#8D7768]">
                        {
                          protocol.description
                        }
                      </p>

                      <p className="mt-3 text-xs uppercase tracking-wide text-[#B59C89]">
                        {
                          protocol.duration
                        }
                      </p>
                    </div>

                    <div className="w-full max-w-[180px]">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-[#8D7768]">
                          Consistency
                        </span>

                        <span className="text-xs font-medium text-[#6B4A36]">
                          {
                            protocol.progress
                          }
                          %
                        </span>
                      </div>

                      <Progress
                        value={
                          protocol.progress
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* RIGHT */}

        <div className="rounded-[2.5rem] border border-[#E8DED5] bg-gradient-to-br from-[#F8F3EE] to-[#F3EBE4] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <Calendar className="h-5 w-5 text-[#7A553D]" />
            </div>

            <Badge className="border-0 bg-white text-[#7A553D]">
              Upcoming
            </Badge>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.22em] text-[#A58D7B]">
              Next Session
            </p>

            <h3 className="mt-2 font-serif text-3xl leading-tight text-[#3E2D24]">
              {
                upcomingSession.title
              }
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-[#7D6B5D]">
              Your next guided recovery and wellness support experience.
            </p>

            <div className="mt-6 rounded-2xl border border-white/70 bg-white/70 p-4 backdrop-blur-xl">
              <p className="text-sm font-medium text-[#5B4B3E]">
                {
                  upcomingSession.day
                }
              </p>

              <p className="mt-1 text-[#A58D7B]">
                {
                  upcomingSession.time
                }
              </p>
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6B4A36] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#5A3F2F]">
              View Session Details

              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}