"use client";
import { queryClient } from "hexis/lib/graphql-client";
import { Hydrate, DehydratedState, QueryClientProvider } from "@tanstack/react-query";

export default function Provider({ children, dehydratedState }: { children: React.ReactNode; dehydratedState?: DehydratedState }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <div className="w-full">{children}</div>
      </Hydrate>
    </QueryClientProvider>
  );
}
