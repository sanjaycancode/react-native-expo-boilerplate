import React, { createContext, useContext, useMemo, useState } from "react";

import type { AuthenticatedUser } from "@/types";

interface AuthContextValue {
  loggedInUser: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mockAuthenticatedUser: AuthenticatedUser = {
  id: "demo-user",
  email: "demo@englishcharlie.app",
  firstName: "Demo",
  lastName: "User",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<AuthenticatedUser | null>(
    mockAuthenticatedUser,
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      loggedInUser,
      isAuthenticated: loggedInUser !== null,
      isInitializing: false,
      signIn: () => {
        setLoggedInUser(mockAuthenticatedUser);
      },
      signOut: () => {
        setLoggedInUser(null);
      },
    }),
    [loggedInUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
