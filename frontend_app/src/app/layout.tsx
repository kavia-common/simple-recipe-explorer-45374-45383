import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Ocean Recipes",
  description:
    "Browse, search, and view simple recipes with a clean Ocean Professional theme.",
  applicationName: "Ocean Recipes",
  authors: [{ name: "Ocean Recipes" }],
  keywords: ["recipes", "cooking", "search", "Next.js", "ocean", "modern"],
  openGraph: {
    title: "Ocean Recipes",
    description:
      "Browse, search, and view simple recipes with a clean Ocean Professional theme.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="container">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
