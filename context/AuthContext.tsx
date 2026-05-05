import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ACCESS_TOKEN_KEY, login, logout, onUnauthorized } from "@/api";

import { getAsyncStorageItem, setAsyncStorageItem } from "@/utils/asyncStorage";

import type {
  AuthenticatedUser,
  AuthResponse,
  LoginPayload,
  LogoutResponse,
} from "@/types";

interface AuthContextValue {
  session: AuthResponse | null;
  loggedInUser: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  refreshSession: () => Promise<void>;
  signIn: (payload: LoginPayload) => Promise<AuthResponse>;
  signOut: () => Promise<LogoutResponse>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_SESSION_STORAGE_KEY = "auth_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthResponse | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const refreshSession = useCallback(async () => {
    const savedSession = await getAsyncStorageItem<AuthResponse>(
      AUTH_SESSION_STORAGE_KEY,
    );

    if (savedSession?.user) {
      setSession(savedSession);
      return;
    }

    setSession(null);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshSession();
      } catch {
        // Silently fail on init
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [refreshSession]);

  useEffect(() => {
    const unsubscribe = onUnauthorized(() => {
      void setAsyncStorageItem(AUTH_SESSION_STORAGE_KEY, null);
      void setAsyncStorageItem(ACCESS_TOKEN_KEY, null);
      setSession(null);
    });

    return unsubscribe;
  }, []);

  const signIn = useCallback(async (payload: LoginPayload) => {
    const response = await login(payload);

    const nextSession: AuthResponse = {
      user: response.user,
      token: response.token,
    };

    await setAsyncStorageItem(AUTH_SESSION_STORAGE_KEY, nextSession);
    await setAsyncStorageItem(ACCESS_TOKEN_KEY, response.token ?? null);

    setSession(nextSession);
    return response;
  }, []);

  const signOut = useCallback(async () => {
    try {
      return await logout();
    } finally {
      await setAsyncStorageItem(AUTH_SESSION_STORAGE_KEY, null);
      await setAsyncStorageItem(ACCESS_TOKEN_KEY, null);
      setSession(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loggedInUser: session?.user ?? null,
      isAuthenticated: session !== null,
      isInitializing,
      refreshSession,
      signIn,
      signOut,
    }),
    [isInitializing, refreshSession, session, signIn, signOut],
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
