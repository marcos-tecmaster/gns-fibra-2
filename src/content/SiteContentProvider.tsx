import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { siteContent } from "@/lib/site-content";
import { apiContentProvider } from "@/services/site-content-service";
import type { SiteContent } from "./types";

const SiteContentContext = createContext<SiteContent>(siteContent);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(siteContent);

  useEffect(() => {
    let active = true;

    apiContentProvider.getContent().then((nextContent) => {
      if (active) setContent(nextContent);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
