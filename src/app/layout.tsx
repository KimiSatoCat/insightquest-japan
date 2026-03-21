import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Stay Signals",
    template: "%s | Stay Signals",
  },
  description:
    "Accommodation trend intelligence for English-speaking travelers visiting Japan.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
