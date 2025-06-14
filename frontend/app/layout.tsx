import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PrivyAuthProvider } from "@/components/providers/privy-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Garlic Token - Web3 Cryptocurrency",
  description: "The first decentralized token with a flavor that never fades",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="garlic-theme"
        >
          <PrivyAuthProvider>
            {children}
            <Toaster />
          </PrivyAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
