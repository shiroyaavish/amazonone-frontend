"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  slug: string | null;
  setSlug: (slug: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ slug, setSlug }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
