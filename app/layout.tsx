import type { Metadata } from "next";
import { Inter, Outfit, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { DynamicFavicon } from "@/components/DynamicFavicon";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Your Name - Full Stack Developer",
  description:
    "Portfolio website showcasing a passionate Full Stack Web Developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Web Developer",
    "Portfolio",
    "TypeScript",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Your Name" }],
  icons: {
    icon: "/favicon.jpg",
  },
  openGraph: {
    title: "Your Name - Full Stack Developer",
    description: "Portfolio website showcasing projects and skills",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${poppins.variable} ${roboto.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <DynamicFavicon />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
