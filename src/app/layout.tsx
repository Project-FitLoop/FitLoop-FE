/* eslint-disable camelcase */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "antd/dist/reset.css";
import "./globals.css";
import TabBar from "@/ui/components/tapbar/tapbar";
import ClientWrapper from "./clientWrapper";
import '@ant-design/v5-patch-for-react-19';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'FitLoop',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <main className="flex-1 w-full overflow-auto">
            <ClientWrapper>{children}</ClientWrapper></main>
          <TabBar />
        </Providers>
      </body>
    </html>
  );
}