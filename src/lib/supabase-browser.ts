import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const createClient = () =>
  createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieOptions: {
      // @ts-ignore
      maxAge: 60 * 60 * 8,
      domain: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN_NAME}`,
      path: "/",
      sameSite: "lax",
      secure: `${process.env.NEXT_PUBLIC_ROOT_SECURE}`,
    },
  });
