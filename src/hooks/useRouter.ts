import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useCurrentRouter = () => {
  const [currentRouter, setCurrentRouter] = useState("");
  const router = usePathname();
  useEffect(() => {
    if (router) {
      setCurrentRouter(router);
    }
  }, [router]);

  return { currentRouter };
};

export default useCurrentRouter;
