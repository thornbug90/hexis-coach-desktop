import "./globals.css";
import StateProvider from "../providers/stateProvider";
import SupabaseProvider from "hexis/providers/supabase-provider";
import ReactQueryProvider from "hexis/providers/react-query";
import { createClient } from "hexis/lib/supabase-browser";
import SupabaseAuthProvider from "hexis/providers/supabase-auth-provider";
import { DehydratedState } from "@tanstack/react-query";

import React from "react";
import { Poppins } from "next/font/google";

const inter = Poppins({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hexis | Your body, fuelled smarter",
  description: "Personalized nutrition powered by AI",
};

interface IProps {
  dehydratedState?: DehydratedState;
}
// @ts-ignore
export default async function RootLayout({
  children,
  pageProps,
}: // @ts-ignore
{
  // @ts-ignore
  children: React.ReactNode;
  // @ts-ignore
  pageProps: IProps;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" data-theme="mytheme">
      <body className={`${inter.className} text-white  overflow-y-hidden`}>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            <StateProvider>
              <ReactQueryProvider dehydratedState={pageProps?.dehydratedState}>{children}</ReactQueryProvider>
            </StateProvider>
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
