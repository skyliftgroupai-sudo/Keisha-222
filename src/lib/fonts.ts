import { Cormorant_Garamond, Jost } from "next/font/google";

/** Didone-adjacent display serif for headings — the luxury voice. */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Quiet geometric grotesque for body & UI. */
export const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});
