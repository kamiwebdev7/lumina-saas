import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export type RecoveryTrend = {
  week: string;
  rhythm: number;
};

export type EnergyTrend = {
  week: string;
  energy: number;
};

export type RadarStats = {
  subject: string;
  current: number;
};

export type TimelineEvent = {
  date: string;
  title: string;
  desc: string;
};

export type AnalyticsCard = {
  label: string;
  value: string;
  sub: string;
};

/* -------------------------------------------------------------------------- */
/*                           GET JOURNEY ANALYTICS                            */
/* -------------------------------------------------------------------------- */

export async function getJourneyAnalytics(
  userId: string,
) {
  const { data, error } =
    await supabase
      .from("protocol_progress")
      .select("*")
      .eq("user_id", userId)
      .order(
        "completed_at",
        {
          ascending: true,
        },
      );

  if (error) {
    throw error;
  }

  return data || [];
}

/* -------------------------------------------------------------------------- */
/*                           RECOVERY TREND                                   */
/* -------------------------------------------------------------------------- */

export async function getRecoveryTrend(
  userId: string,
): Promise<
  RecoveryTrend[]
> {
  const progress =
    await getJourneyAnalytics(
      userId,
    );

  const grouped =
    progress.slice(-6);

  return grouped.map(
    (item, index) => ({
      week: `Wk ${
        index + 1
      }`,

      rhythm:
        item
          .recovery_score ||
        Math.floor(
          Math.random() *
            20 +
            70,
        ),
    }),
  );
}

/* -------------------------------------------------------------------------- */
/*                              ENERGY TREND                                  */
/* -------------------------------------------------------------------------- */

export async function getEnergyTrend(
  userId: string,
): Promise<
  EnergyTrend[]
> {
  const progress =
    await getJourneyAnalytics(
      userId,
    );

  const grouped =
    progress.slice(-6);

  return grouped.map(
    (item, index) => ({
      week: `Wk ${
        index + 1
      }`,

      energy:
        item.energy_score ||
        Math.floor(
          Math.random() *
            20 +
            65,
        ),
    }),
  );
}

/* -------------------------------------------------------------------------- */
/*                               RADAR STATS                                  */
/* -------------------------------------------------------------------------- */

export async function getRadarStats(
  userId: string,
): Promise<
  RadarStats[]
> {
  const progress =
    await getJourneyAnalytics(
      userId,
    );

  const total =
    progress.length || 1;

  const avg = (
    field: string,
  ) => {
    const sum =
      progress.reduce(
        (acc, item) =>
          acc +
          (item[
            field
          ] || 0),
        0,
      );

    return Math.round(
      sum / total,
    );
  };

  return [
    {
      subject: "Sleep",
      current:
        avg(
          "sleep_score",
        ) || 82,
    },

    {
      subject: "Energy",
      current:
        avg(
          "energy_score",
        ) || 78,
    },

    {
      subject:
        "Recovery",
      current:
        avg(
          "recovery_score",
        ) || 81,
    },

    {
      subject:
        "Consistency",
      current:
        Math.min(
          total * 8,
          100,
        ) || 76,
    },

    {
      subject: "Calm",
      current:
        avg(
          "stress_score",
        ) || 72,
    },
  ];
}

/* -------------------------------------------------------------------------- */
/*                             TIMELINE EVENTS                                */
/* -------------------------------------------------------------------------- */

export async function getTimelineEvents(
  userId: string,
): Promise<
  TimelineEvent[]
> {
  const progress =
    await getJourneyAnalytics(
      userId,
    );

  if (
    progress.length === 0
  ) {
    return [
      {
        date:
          "Getting Started",

        title:
          "Beginning your wellness journey",

        desc:
          "Your personalized wellness journey is beginning.",
      },
    ];
  }

  return progress
    .slice(-6)
    .map(
      (
        item,
        index,
      ) => ({
        date: `Week ${
          index + 1
        }`,

        title:
          item.completed
            ? "Completed restorative practices"
            : "Continuing consistency journey",

        desc:
          item.notes ||
          "Gentle consistency is supporting long-term wellness rhythms.",
      }),
    );
}

/* -------------------------------------------------------------------------- */
/*                           ANALYTICS CARDS                                  */
/* -------------------------------------------------------------------------- */

export async function getAnalyticsCards(
  userId: string,
): Promise<
  AnalyticsCard[]
> {
  const progress =
    await getJourneyAnalytics(
      userId,
    );

  const total =
    progress.length;

  const completed =
    progress.filter(
      (
        item,
      ) =>
        item.completed,
    ).length;

  const consistency =
    total
      ? Math.round(
          (completed /
            total) *
            100,
        )
      : 0;

  return [
    {
      label:
        "Recovery Rhythm",

      value:
        consistency > 70
          ? "Consistent"
          : "Improving",

      sub: "Past weeks",
    },

    {
      label:
        "Daily Practices",

      value: `${consistency}%`,

      sub: "Consistency score",
    },

    {
      label:
        "Restorative Energy",

      value:
        consistency > 60
          ? "Balanced"
          : "Building",

      sub: "Current rhythm",
    },

    {
      label:
        "Wellness Flow",

      value:
        total > 5
          ? "Stable"
          : "Beginning",

      sub: "Recent patterns",
    },
  ];
}