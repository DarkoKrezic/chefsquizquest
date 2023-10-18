import "./globals.css";
import type { Metadata } from "next";
import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chefs Quiz Quest",
  description: "Made by Darko",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={luckiestGuy.className}>{children}</body>
    </html>
  );
}
