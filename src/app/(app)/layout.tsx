import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";
import "../globals.css";
import Navbar from "@/my-components/common/Navbar";
import Footer from "@/my-components/common/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whisper Wall",
  description: "Send Anonymous Message",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="min-h-screen flex flex-col items-stretch">
            <Navbar />
            <div className="flex-grow flex flex-col">{children}</div>
            <Footer />
            <Toaster />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
