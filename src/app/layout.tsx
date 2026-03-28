import ClientLayout from "@/components/ClientLayout";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Kode_Mono, Bruno_Ace, Orbitron, Space_Grotesk, Sora, Inter, Poppins } from "next/font/google";
import "./globals.css";

const digitalFont = localFont({
  src: "./fonts/DigitalNumbers.woff",
  variable: "--font-digital",
});

const kodeMonoFont = Kode_Mono({
  subsets: ["latin"],
  variable: "--font-kode-mono",
});

const brunoAceFont = Bruno_Ace({
  subsets: ["latin"],
  variable: "--font-bruno-ace",
  weight: "400",
})

const orbitronFont = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
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

export const metadata: Metadata = {
  title: "Techlavya",
  description: "Techlavya is the official premium tech festival of Ramkrishna Mahato Government Engineering College.",
  keywords: [
    "techlavya",
    "rkmgec",
    "tech fest",
    "luxury tech",
    "awwwards",
  ],
  metadataBase: new URL("https://techlavya-rkmgec.com/"),
  openGraph: {
    title: "Techlavya",
    type: "website",
    siteName: "Techlavya",
    description: "Premium Tech Festival Experience",
  },
  alternates: {
    canonical: "https://techlavya-rkmgec.com/"
  },
  icons: ["/techlavya-logo.png"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${digitalFont.variable} ${kodeMonoFont.variable} ${brunoAceFont.variable} ${orbitronFont.variable} ${spaceGrotesk.variable} ${sora.variable} ${inter.variable} ${poppins.variable} antialiased w-full text-foreground bg-background font-inter`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
