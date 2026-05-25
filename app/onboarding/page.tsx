"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { useAuth } from "@/context/AuthContext";

/* -------------------------------------------------------------------------- */
/*                                   STEPS                                    */
/* -------------------------------------------------------------------------- */

const onboardingSteps = [
  {
    id: "goal",

    title:
      "What feels most out of balance lately?",

    description:
      "Choose the area you feel needs the most support right now.",

    options: [
      "Energy",
      "Sleep",
      "Stress",
      "Recovery",
      "Focus",
    ],
  },

  {
    id: "energy_issue",

    title:
      "How has your energy felt recently?",

    description:
      "Select the option that feels most accurate.",

    options: [
      "Consistently drained",
      "Afternoon crashes",
      "Unstable energy",
      "Mostly balanced",
    ],
  },

  {
    id: "sleep_quality",

    title:
      "How restorative has your sleep been?",

    description:
      "Recovery quality matters more than duration alone.",

    options: [
      "Poor",
      "Inconsistent",
      "Moderate",
      "Deep & consistent",
    ],
  },

  {
    id: "stress_level",

    title:
      "What best describes your current stress rhythm?",

    description:
      "Stress awareness helps personalize your recovery experience.",

    options: [
      "Mostly calm",
      "Moderate stress",
      "Frequently overwhelmed",
      "Constant nervous system overload",
    ],
  },

  {
    id: "lifestyle_rhythm",

    title:
      "What kind of lifestyle rhythm best describes you?",

    description:
      "Your routines shape your biological capacity patterns.",

    options: [
      "Busy entrepreneur",
      "Parent",
      "High performer",
      "Shift-based schedule",
      "Highly variable routine",
    ],
  },

  {
    id: "recovery_priority",

    title:
      "What are you hoping to regain most?",

    description:
      "Your dashboard will adapt around this intention.",

    options: [
      "Calm",
      "Energy",
      "Clarity",
      "Consistency",
      "Recovery",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function OnboardingPage() {
  const router = useRouter();

  const supabase = createClient();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  /* ---------------------------------------------------------------------- */
  /*                                  STATE                                 */
  /* ---------------------------------------------------------------------- */

  const [step, setStep] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(
      null,
    );

  const [answers, setAnswers] =
    useState({
      goal: "",

      energy_issue: "",

      sleep_quality: "",

      stress_level: "",

      lifestyle_rhythm: "",

      recovery_priority: "",
    });

  /* ---------------------------------------------------------------------- */
  /*                                CURRENT STEP                            */
  /* ---------------------------------------------------------------------- */

  const currentStep =
    onboardingSteps[step];

  const progress =
    ((step + 1) /
      onboardingSteps.length) *
    100;

  /* ---------------------------------------------------------------------- */
  /*                            AUTH PROTECTION                             */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (
      !authLoading &&
      !user
    ) {
      router.replace(
        "/login",
      );
    }
  }, [
    authLoading,
    user,
    router,
  ]);

  /* ---------------------------------------------------------------------- */
  /*                             HANDLE OPTION                              */
  /* ---------------------------------------------------------------------- */

  async function handleOptionSelect(
    option: string,
  ) {
    const updatedAnswers = {
      ...answers,

      [currentStep.id]:
        option,
    };

    setAnswers(
      updatedAnswers,
    );

    /* -------------------------------------------------------------- */
    /* LAST STEP */
    /* -------------------------------------------------------------- */

    if (
      step ===
      onboardingSteps.length - 1
    ) {
      if (!user) return;

      try {
        setLoading(true);

        const {
          error:
            profileError,
        } =
          await supabase
            .from("profiles")
            .upsert({
              id: user.id,

              email:
                user.email,

              goal:
                updatedAnswers.goal,

              energy_issue:
                updatedAnswers.energy_issue,

              sleep_quality:
                updatedAnswers.sleep_quality,

              stress_level:
                updatedAnswers.stress_level,

              lifestyle_rhythm:
                updatedAnswers.lifestyle_rhythm,

              recovery_priority:
                updatedAnswers.recovery_priority,

              onboarding_completed:
                true,
            });

        if (profileError) {
          console.error(
            profileError,
          );

          setError(
            "Unable to save onboarding progress.",
          );

          return;
        }

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              500,
            ),
        );

        window.location.href =
          "/dashboard";
      } catch (err) {
        console.error(err);

        setError(
          "Something went wrong.",
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    /* -------------------------------------------------------------- */
    /* AUTO ADVANCE */
    /* -------------------------------------------------------------- */

    setTimeout(() => {
      setStep(
        (prev) => prev + 1,
      );
    }, 220);
  }

  /* ---------------------------------------------------------------------- */
  /*                              AUTH LOADING                              */
  /* ---------------------------------------------------------------------- */

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F3EE]">
        <div className="flex items-center gap-3 text-[#6B4A36]">
          <Loader2 className="h-5 w-5 animate-spin" />

          <span className="text-sm">
            Preparing your experience...
          </span>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F3EE] px-5 py-10">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#EADFD4]/40 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#F2E8E0]/40 blur-3xl" />
      </div>

      {/* Container */}

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-[2.8rem] border border-[#E8DED5]/80 bg-white/75 backdrop-blur-2xl shadow-[0_30px_90px_rgba(91,63,43,0.10)] lg:grid-cols-2">

          {/* LEFT */}

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#6F4E37] via-[#5A3F30] to-[#3A271E] p-10 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-[#F5D9C6]" />

                <span className="text-xs uppercase tracking-[0.18em] text-[#F3DED0]">
                  Capacity Personalization
                </span>
              </div>

              <h1 className="max-w-md font-serif text-5xl leading-[1.05] text-white">
                Your recovery experience begins here
              </h1>

              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#E6D6CB]">
                We&apos;re shaping your personalized wellness rhythm
                around recovery,
                nervous system support,
                and sustainable energy.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Guided wellness journey",
                "Personalized dashboard",
                "Recovery-focused routines",
                "Luxury wellness experience",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#F3DED0]" />
                  </div>

                  <span className="text-sm text-[#F3DED0]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:p-12">

            {/* Progress */}

            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.24em] text-[#B08968]">
                  Wellness Intake
                </p>

                <p className="text-xs text-[#8B7665]">
                  Step {step + 1} of{" "}
                  {onboardingSteps.length}
                </p>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#EFE5DC]">
                <motion.div
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-[#7A553D] to-[#5A3F30]"
                />
              </div>
            </div>

            {/* Content */}

            <AnimatePresence
              mode="wait"
            >
              <motion.div
                key={step}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="my-12"
              >
                <h2 className="font-serif text-4xl leading-[1.1] text-[#3E2D24]">
                  {
                    currentStep.title
                  }
                </h2>

                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#7C6A5D]">
                  {
                    currentStep.description
                  }
                </p>

                {/* Options */}

                <div className="mt-10 grid gap-4">
                  {currentStep.options.map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        disabled={
                          loading
                        }
                        onClick={() =>
                          handleOptionSelect(
                            option,
                          )
                        }
                        className="group relative overflow-hidden rounded-[1.8rem] border border-[#E8DED5] bg-white/90 px-6 py-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#B08968] hover:bg-white hover:shadow-[0_18px_40px_rgba(91,63,43,0.08)]"
                      >
                        <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-[#F6EEE7]/40 to-transparent transition-transform duration-1000 group-hover:translate-x-[120%]" />

                        <div className="relative flex items-center justify-between">
                          <span className="text-[15px] font-medium text-[#3E2D24]">
                            {option}
                          </span>

                          <ArrowRight className="h-4 w-4 text-[#B08968] transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Error */}

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Footer */}

            <div className="rounded-2xl border border-[#EFE5DC] bg-[#FAF7F3] px-4 py-3">
              <p className="text-xs leading-relaxed text-[#8B7665]">
                Capacity Lab OS provides educational wellness support
                and guided lifestyle experiences only.
                It is not intended for medical diagnosis or treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}