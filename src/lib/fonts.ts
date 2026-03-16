import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";

export const fontSerif = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const fontSans = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
