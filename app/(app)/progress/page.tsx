"use client";

import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import { EmptyState } from "@/components/ui/EmptyState";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import {
  Sparkles,
  TrendingUp,
  Moon,
  Activity,
  Calendar,
  Loader2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { useAuth } from "@/context/AuthContext";

import {
  getRecoveryTrend,
  getEnergyTrend,
  getRadarStats,
  getTimelineEvents,
  getAnalyticsCards,
} from "@/lib/database/journey";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type RecoveryTrend = {
  week: string;
  rhythm: number;
};

type EnergyTrend = {
  week: string;
  energy: number;
};

type RadarStats = {
  subject: string;
  current: number;
};

type TimelineEvent = {
  date: string;
  title: string;
  desc: string;
};

type AnalyticsCard = {
  label: string;
  value: string;
  sub: string;
};

type HabitData = {
  day: string;

  hydration: number;

  nourishment: number;

  breathwork: number;

  movement: number;

  sleep: number;
};

/* -------------------------------------------------------------------------- */
/*                                TOOLTIP                                     */
/* -------------------------------------------------------------------------- */

const CustomTooltip = ({
  active,
  payload,
  label,
}: any) => {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div className="rounded-xl border border-[#E8DED5] bg-white px-3 py-2.5 shadow-card">
        <p className="mb-1 text-xs font-medium text-[#6B5B4D]">
          {label}
        </p>

        {payload.map(
          (p: any) => (
            <p
              key={p.name}
              style={{
                color:
                  p.color ??
                  "#9A7D61",
              }}
              className="text-xs"
            >
              {p.name}:{" "}
              {p.value}
            </p>
          ),
        )}
      </div>
    );
  }

  return null;
};

/* -------------------------------------------------------------------------- */
/*                                  ANIMATION                                 */
/* -------------------------------------------------------------------------- */

const fadeIn = (
  delay = 0,
) => ({
  initial: {
    opacity: 0,
    y: 20,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  transition: {
    duration: 0.6,
    delay,
  },
});

/* -------------------------------------------------------------------------- */
/*                                 PAGE                                       */
/* -------------------------------------------------------------------------- */

export default function ProgressPage() {
  const { user } =
    useAuth();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    recoveryData,
    setRecoveryData,
  ] = useState<
    RecoveryTrend[]
  >([]);

  const [
    energyData,
    setEnergyData,
  ] = useState<
    EnergyTrend[]
  >([]);

  const [
    radarData,
    setRadarData,
  ] = useState<
    RadarStats[]
  >([]);

  const [
    milestones,
    setMilestones,
  ] = useState<
    TimelineEvent[]
  >([]);

  const [
    analyticsCards,
    setAnalyticsCards,
  ] = useState<
    AnalyticsCard[]
  >([]);

  /* ---------------------------------------------------------------------- */
  /*                          DYNAMIC HABIT DATA                            */
  /* ---------------------------------------------------------------------- */

  const [
    habitData,
    setHabitData,
  ] = useState<
    HabitData[]
  >([
    {
      day: "Mon",
      hydration: 90,
      nourishment: 82,
      breathwork: 80,
      movement: 72,
      sleep: 88,
    },

    {
      day: "Tue",
      hydration: 95,
      nourishment: 85,
      breathwork: 70,
      movement: 68,
      sleep: 84,
    },

    {
      day: "Wed",
      hydration: 88,
      nourishment: 92,
      breathwork: 82,
      movement: 74,
      sleep: 89,
    },

    {
      day: "Thu",
      hydration: 96,
      nourishment: 90,
      breathwork: 88,
      movement: 78,
      sleep: 91,
    },

    {
      day: "Fri",
      hydration: 92,
      nourishment: 86,
      breathwork: 80,
      movement: 83,
      sleep: 90,
    },

    {
      day: "Sat",
      hydration: 72,
      nourishment: 76,
      breathwork: 60,
      movement: 91,
      sleep: 84,
    },

    {
      day: "Sun",
      hydration: 98,
      nourishment: 88,
      breathwork: 92,
      movement: 80,
      sleep: 94,
    },
  ]);

  /* ---------------------------------------------------------------------- */
  /*                             LOAD DATA                                  */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    async function loadData() {
      if (!user?.id) return;

      try {
        const [
          recovery,
          energy,
          radar,
          timeline,
          cards,
        ] =
          await Promise.all(
            [
              getRecoveryTrend(
                user.id,
              ),

              getEnergyTrend(
                user.id,
              ),

              getRadarStats(
                user.id,
              ),

              getTimelineEvents(
                user.id,
              ),

              getAnalyticsCards(
                user.id,
              ),
            ],
          );

        setRecoveryData(
          recovery,
        );

        setEnergyData(
          energy,
        );

        setRadarData(
          radar,
        );

        setMilestones(
          timeline,
        );

        setAnalyticsCards(
          cards,
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(
          false,
        );
      }
    }

    loadData();
  }, [user?.id]);

  /* ---------------------------------------------------------------------- */
  /*                              EMPTY STATE                               */
  /* ---------------------------------------------------------------------- */

  const hasJourneyData =
    recoveryData.length >
    0;

  /* ---------------------------------------------------------------------- */
  /*                                LOADING                                 */
  /* ---------------------------------------------------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-[#7A553D]">
          <Loader2 className="h-5 w-5 animate-spin" />

          <span className="text-sm">
            Preparing wellness insights...
          </span>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="mx-auto max-w-6xl space-y-7 px-4 py-8 lg:px-8">
      {!hasJourneyData ? (
        <EmptyState
          title="No wellness reflections yet"
          description="Your guided wellness reflections and supportive journey insights will appear here over time."
        />
      ) : (
        <>
          {/* HEADER */}

          <motion.div
            {...fadeIn(0)}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8DED5] bg-white px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#B89B84]" />

              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8D7768]">
                Wellness Journey
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-tight text-[#3E2D24] lg:text-5xl">
              Your wellness journey
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#7D6B5D] lg:text-[15px]">
              A personalized overview of your recent wellness rhythms,
              restorative consistency,
              and supportive recovery patterns.
            </p>
          </motion.div>

          {/* ANALYTICS */}

          <motion.div
            {...fadeIn(0.08)}
            className="grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            {analyticsCards.map(
              (
                card,
              ) => (
                <div
                  key={
                    card.label
                  }
                  className="rounded-2xl border border-[#E8DED5] bg-white p-4 shadow-soft"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <Badge className="border-0 bg-[#F4ECE4] text-[10px] text-[#8D7768]">
                      Wellness
                    </Badge>
                  </div>

                  <p className="mb-1 font-serif text-2xl text-[#3E2D24]">
                    {
                      card.value
                    }
                  </p>

                  <p className="text-xs text-[#6B5B4D]">
                    {
                      card.label
                    }
                  </p>

                  <p className="mt-1 text-[11px] text-[#A08C7B]">
                    {
                      card.sub
                    }
                  </p>
                </div>
              ),
            )}
          </motion.div>

          {/* CHARTS */}

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {/* RECOVERY */}

            <motion.div
              {...fadeIn(
                0.12,
              )}
              className="rounded-[2rem] border border-[#E8DED5] bg-white p-5 shadow-soft"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[#3E2D24]">
                    Recovery Rhythm
                  </h3>

                  <p className="mt-0.5 text-xs text-[#8D7768]">
                    Real recovery trend data
                  </p>
                </div>

                <Badge className="border-0 bg-[#F4ECE4] text-[#7A553D]">
                  Dynamic
                </Badge>
              </div>

              <ResponsiveContainer
                width="100%"
                height={190}
              >
                <LineChart
                  data={
                    recoveryData
                  }
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#EEE4DA"
                    vertical={
                      false
                    }
                  />

                  <XAxis
                    dataKey="week"
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <YAxis
                    domain={[
                      40,
                      100,
                    ]}
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <Tooltip
                    content={
                      <CustomTooltip />
                    }
                  />

                  <Line
                    type="monotone"
                    dataKey="rhythm"
                    stroke="#9A7D61"
                    strokeWidth={
                      2.5
                    }
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* ENERGY */}

            <motion.div
              {...fadeIn(
                0.16,
              )}
              className="rounded-[2rem] border border-[#E8DED5] bg-white p-5 shadow-soft"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[#3E2D24]">
                    Energy Patterns
                  </h3>

                  <p className="mt-0.5 text-xs text-[#8D7768]">
                    Personalized energy flow
                  </p>
                </div>

                <Badge className="border-0 bg-[#F4ECE4] text-[#7A553D]">
                  Personalized
                </Badge>
              </div>

              <ResponsiveContainer
                width="100%"
                height={190}
              >
                <AreaChart
                  data={
                    energyData
                  }
                >
                  <defs>
                    <linearGradient
                      id="energyGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#C49590"
                        stopOpacity={
                          0.25
                        }
                      />

                      <stop
                        offset="100%"
                        stopColor="#C49590"
                        stopOpacity={
                          0
                        }
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#EEE4DA"
                    vertical={
                      false
                    }
                  />

                  <XAxis
                    dataKey="week"
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <YAxis
                    domain={[
                      40,
                      100,
                    ]}
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <Tooltip
                    content={
                      <CustomTooltip />
                    }
                  />

                  <Area
                    type="monotone"
                    dataKey="energy"
                    stroke="#C49590"
                    fill="url(#energyGrad)"
                    strokeWidth={
                      2.5
                    }
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* HABITS + RADAR */}

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">

            {/* HABITS */}

            <motion.div
              {...fadeIn(
                0.2,
              )}
              className="lg:col-span-3 rounded-[2rem] border border-[#E8DED5] bg-white p-5 shadow-soft"
            >
              <div className="mb-5">
                <h3 className="text-sm font-medium text-[#3E2D24]">
                  Daily Practice Consistency
                </h3>

                <p className="mt-0.5 text-xs text-[#8D7768]">
                  Wellness rhythm tracking
                </p>
              </div>

              <ResponsiveContainer
                width="100%"
                height={220}
              >
                <BarChart
                  data={
                    habitData
                  }
                  barGap={
                    2
                  }
                  barSize={
                    8
                  }
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#EEE4DA"
                    vertical={
                      false
                    }
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <YAxis
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                  />

                  <Tooltip
                    content={
                      <CustomTooltip />
                    }
                  />

                  <Bar
                    dataKey="hydration"
                    fill="#5A9BBF"
                    radius={[
                      4,
                      4,
                      0,
                      0,
                    ]}
                  />

                  <Bar
                    dataKey="nourishment"
                    fill="#9A7D61"
                    radius={[
                      4,
                      4,
                      0,
                      0,
                    ]}
                  />

                  <Bar
                    dataKey="breathwork"
                    fill="#8AA083"
                    radius={[
                      4,
                      4,
                      0,
                      0,
                    ]}
                  />

                  <Bar
                    dataKey="sleep"
                    fill="#7C6FA0"
                    radius={[
                      4,
                      4,
                      0,
                      0,
                    ]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* RADAR */}

            <motion.div
              {...fadeIn(
                0.24,
              )}
              className="lg:col-span-2 rounded-[2rem] border border-[#E8DED5] bg-white p-5 shadow-soft"
            >
              <div className="mb-4">
                <h3 className="text-sm font-medium text-[#3E2D24]">
                  Wellness Overview
                </h3>

                <p className="mt-0.5 text-xs text-[#8D7768]">
                  Personalized recovery metrics
                </p>
              </div>

              <ResponsiveContainer
                width="100%"
                height={210}
              >
                <RadarChart
                  data={
                    radarData
                  }
                >
                  <PolarGrid stroke="#EEE4DA" />

                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fontSize: 10,
                      fill: "#B89B84",
                    }}
                  />

                  <PolarRadiusAxis
                    tick={
                      false
                    }
                    axisLine={
                      false
                    }
                    domain={[
                      0,
                      100,
                    ]}
                  />

                  <Radar
                    dataKey="current"
                    stroke="#9A7D61"
                    fill="#9A7D61"
                    fillOpacity={
                      0.25
                    }
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* TIMELINE */}

          <motion.div
            {...fadeIn(
              0.28,
            )}
            className="rounded-[2rem] border border-[#E8DED5] bg-white p-5 shadow-soft"
          >
            <div className="mb-6 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#9A7D61]" />

              <h3 className="text-sm font-medium text-[#3E2D24]">
                Wellness Reflection Timeline
              </h3>
            </div>

            <div className="relative">
              <div className="absolute bottom-0 left-[88px] top-0 w-px bg-[#E8DED5]" />

              <div className="space-y-5">
                {milestones.map(
                  (
                    m,
                    i,
                  ) => (
                    <motion.div
                      key={
                        i
                      }
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          0.28 +
                          i *
                            0.06,
                      }}
                      className="flex items-start gap-5"
                    >
                      <span className="w-16 flex-shrink-0 pt-0.5 text-right text-xs font-medium text-[#A08C7B]">
                        {
                          m.date
                        }
                      </span>

                      <div className="z-10 mt-0.5 h-3 w-3 flex-shrink-0 rounded-full border-2 border-[#D8C6B5] bg-[#F4ECE4]" />

                      <div>
                        <p className="text-sm font-medium text-[#3E2D24]">
                          {
                            m.title
                          }
                        </p>

                        <p className="mt-0.5 text-xs leading-relaxed text-[#8D7768]">
                          {
                            m.desc
                          }
                        </p>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}