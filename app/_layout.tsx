import "react-native-reanimated";

import { useEffect } from "react";

import { useFonts } from "expo-font";
import {
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

import { ReactQueryProvider } from "@/lib/react-query/ReactQueryProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Default to the public entry route until real session restoration is wired in.
  initialRouteName: "login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lexend: require("../assets/fonts/Lexend-Regular.ttf"),
    LexendMedium: require("../assets/fonts/Lexend-Medium.ttf"),
    LexendSemiBold: require("../assets/fonts/Lexend-SemiBold.ttf"),
    LexendBold: require("../assets/fonts/Lexend-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <AuthGuard />
        </AuthProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

function AuthGuard() {
  const { isAuthenticated, isInitializing } = useAuth();

  const { theme } = useTheme();

  const rootNavigationState = useRootNavigationState();

  const router = useRouter();

  const segments = useSegments();

  useEffect(() => {
    if (!rootNavigationState?.key || isInitializing) return;

    const inAuthenticatedGroup = segments[0] === "(auth)";

    if (isAuthenticated && !inAuthenticatedGroup) {
      router.replace("/(auth)/(tabs)");
      return;
    }

    if (!isAuthenticated && inAuthenticatedGroup) {
      router.replace("/login");
    }
  }, [
    isAuthenticated,
    isInitializing,
    rootNavigationState?.key,
    router,
    segments,
  ]);

  if (!rootNavigationState?.key || isInitializing) return null;

  return (
    <>
      <StatusBar
        style={theme.mode === "dark" ? "light" : "dark"}
        backgroundColor={theme.colors.background}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
