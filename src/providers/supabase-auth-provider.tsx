"use client";

import React, { createContext, useCallback, useContext, useEffect } from "react";
import { Session, User } from "@supabase/gotrue-js";
import { useSupabase } from "hexis/providers/supabase-provider";
import { useRouter } from "next/navigation";
import { graphqlClient } from "hexis/lib/graphql-client";

interface ContextI {
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ user: null; error: string } | { user: User; error: null }>;
  user: undefined;
}

const Context = createContext<ContextI>({
  user: undefined,
  signOut: async () => {},
  signInWithEmail: async () => ({ user: null, error: "" }),
});

function SupabaseAuthProvider({ children, serverSession }: { children: React.ReactNode; serverSession?: Session | null }) {
  const { supabase } = useSupabase();
  const router = useRouter();

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Sign-In with Email
  const signInWithEmail = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data.user, error: null };
  };

  const getUserSession = useCallback(async () => {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      await supabase.auth.refreshSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    void getUserSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh();
      }

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        graphqlClient.setHeader("authorization", `Bearer ${session?.access_token}`);
        router.refresh();
      }

      if (event === "SIGNED_OUT") {
        graphqlClient.setHeader("authorization", "");
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token, getUserSession]);

  const exposed = {
    signOut,
    signInWithEmail,
    user: undefined,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
  let context = useContext(Context);

  if (!context) throw new Error("useAuth must be used inside SupabaseAuthProvider");

  return context;
};

export default SupabaseAuthProvider;
