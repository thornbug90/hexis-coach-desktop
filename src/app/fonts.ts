import { Montserrat, Poppins, Lexend_Deca } from "next/font/google";

export const lexend_deca = Lexend_Deca({
  subsets: ["latin"],
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
  display: "swap",
});
