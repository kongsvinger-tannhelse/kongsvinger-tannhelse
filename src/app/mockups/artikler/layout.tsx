import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Bryter } from "@/components/mockups/artikler/deler";
import { METADATA } from "@/components/mockups/artikler/tekst";

/* Three drafts of a patient article, all with the toothache text, to compare. Not for search engines. */
export const metadata: Metadata = { ...METADATA, robots: { index: false, follow: false } };

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Bryter />
    </>
  );
}
