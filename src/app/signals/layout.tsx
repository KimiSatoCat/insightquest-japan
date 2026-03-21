import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Stay Signals member dashboard — filter, compare, and evaluate Japan accommodation options.",
  robots: { index: false, follow: false },
};

export default function SignalsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}