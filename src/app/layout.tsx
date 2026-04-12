import ClientLayout from "@/components/ClientLayout";
import type { Metadata } from "next";
import {
  Cinzel,
  Playfair_Display,
  Dancing_Script,
  Outfit,
  Inter,
  Poppins,
  Noto_Serif_Bengali,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cinzelFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const playfairFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dancingScriptFont = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
});

const outfitFont = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-serif-bengali",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Aikatan",
  description:
    "Aikatan is the official cultural festival of Ramkrishna Mahato Government Engineering College.",
  keywords: ["aikatan", "rkmgec", "cultural fest", "fest", "arts", "cultural"],
  metadataBase: new URL("https://aikatan-rkmgec.com/"),
  openGraph: {
    title: "ঐকtan ",
    type: "website",
    siteName: "ঐকtan ",
    description: "Vibrant Cultural Festival Experience",
  },
  alternates: {
    canonical: "https://aikatan-rkmgec.com/",
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
        className={`${cinzelFont.variable} ${playfairFont.variable} ${dancingScriptFont.variable} ${outfitFont.variable} ${inter.variable} ${poppins.variable} ${notoSerifBengali.variable} antialiased w-full text-foreground bg-background font-inter`}
      >
        <Analytics />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
