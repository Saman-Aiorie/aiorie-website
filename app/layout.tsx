import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIORIE – Manufacturing Systems, Planning & Scheduling",
  description:
    "AIORIE provides manufacturing systems, planning, scheduling, and optimization expertise.",
  icons: {
    icon: "/favicon-16x16-Curve.png",
    shortcut: "/favicon-16x16-Curve.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
