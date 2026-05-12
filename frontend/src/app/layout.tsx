import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Konarpara Durga Puja | Traditional Village Celebration",
  description:
    "Join the sacred Durga Puja celebration at Konarpara village. Experience traditional rituals, cultural programs, and community festivities honoring Goddess Durga.",
  keywords: [
    "Durga Puja",
    "Konarpara",
    "Bengali festival",
    "village puja",
    "Durga celebration",
  ],
  openGraph: {
    title: "Konarpara Durga Puja",
    description: "Traditional Durga Puja celebration at Konarpara village",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#C41E3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#FDF8F3]">
      <body
        className={`${poppins.variable} ${playfair.variable} flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1F1408",
              color: "#FDF8F3",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "#D4A03A",
                secondary: "#1F1408",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
