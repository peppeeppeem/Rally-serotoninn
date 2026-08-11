import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "@fontsource-variable/fraunces";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rälly — The Movement",
    template: "%s · Rälly",
  },
  description:
    "Rälly Movement — a Bangkok fashion house since 2017. Boldness, fluidity, movement. Retro-chic ready-to-wear and the icon bags.",
  metadataBase: new URL("https://rallymovement.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
