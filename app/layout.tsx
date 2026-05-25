import "./globals.css";

import type { Metadata } from "next";

import {
  DM_Sans,
  Cormorant_Garamond,
} from "next/font/google";

import { AuthProvider } from "@/context/AuthContext";

/* -------------------------------------------------------------------------- */
/*                                   FONTS                                    */
/* -------------------------------------------------------------------------- */

const dmSans = DM_Sans({
  subsets: ["latin"],

  variable: "--font-sans",

  display: "swap",
});

const cormorant =
  Cormorant_Garamond({
    subsets: ["latin"],

    variable:
      "--font-serif",

    weight: [
      "300",
      "400",
      "500",
      "600",
      "700",
    ],

    display: "swap",
  });

/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata =
  {
    title: {
      default:
        "Capacity Lab OS",

      template:
        "%s | Capacity Lab OS",
    },

    description:
      "A guided biological capacity platform focused on energy, recovery, stress regulation, sleep quality, and sustainable wellness education.",

    keywords: [
      "biological wellness",

      "capacity reset",

      "stress recovery",

      "metabolic wellness",

      "sleep optimization",

      "wellness platform",

      "guided reset",

      "longevity education",
    ],

    themeColor: "#6F4E37",

    metadataBase: new URL(
      "https://capacitylabos.com",
    ),

    applicationName:
      "Capacity Lab OS",

    authors: [
      {
        name: "Capacity Lab",
      },
    ],

    creator: "Capacity Lab",

    publisher:
      "Capacity Lab",

    formatDetection: {
      email: false,

      address: false,

      telephone: false,
    },

    openGraph: {
      title:
        "Capacity Lab OS",

      description:
        "Guided wellness education and biological capacity support designed around recovery, energy, and sustainable lifestyle optimization.",

      url: "https://capacitylabos.com",

      siteName:
        "Capacity Lab OS",

      locale: "en_US",

      type: "website",

      images: [
        {
          url: "/og-image.png",

          width: 1200,

          height: 630,

          alt: "Capacity Lab OS",
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        "Capacity Lab OS",

      description:
        "Guided biological wellness and capacity support platform.",

      images: ["/og-image.png"],
    },

    robots: {
      index: true,

      follow: true,
    },

    icons: {
      icon: "/icon.png",

      shortcut:
        "/icon.png",

      apple: "/icon.png",
    },
  };

/* -------------------------------------------------------------------------- */
/*                                ROOT LAYOUT                                 */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased fade-in">
        {/* -------------------------------------------------------------- */}
        {/* Premium Background Effects */}
        {/* -------------------------------------------------------------- */}

        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {/* Top Glow */}
          <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#EADFD4]/30 blur-3xl" />

          {/* Bottom Glow */}
          <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#F0E7DF]/40 blur-3xl" />

          {/* Center Ambient Glow */}
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7F1EB]/30 blur-3xl" />
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Global Auth Provider */}
        {/* -------------------------------------------------------------- */}

        <AuthProvider>
          <main className="relative min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}