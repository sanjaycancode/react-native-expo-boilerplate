import React from "react";

import { Stack, Tabs } from "expo-router";

import { TabBarButton } from "@/components/TabBarButton";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

import { useThemeColors } from "@/context/ThemeContext";

export default function TabLayout() {
  const colors = useThemeColors();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        initialRouteName="dashboard"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarShowLabel: false,
          // Disable the static render of the header on sweb
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        {/* The `index` route is required to set up the initial screen of the tab navigator. */}
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            headerShown: false,
            title: "Dashboard",
            tabBarButton: (props) => (
              <TabBarButton {...props} iconName="th-large" label="Dashboard" />
            ),
          }}
        />
        <Tabs.Screen
          name="practice"
          options={{
            headerShown: false,
            title: "Practice",
            tabBarButton: (props) => (
              <TabBarButton
                {...props}
                iconName="pencil-square-o"
                label="Practice"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            headerShown: false,
            title: "Learn",
            tabBarButton: (props) => (
              <TabBarButton {...props} iconName="book" label="Learn" />
            ),
          }}
        />
        <Tabs.Screen
          name="coaching"
          options={{
            headerShown: false,
            title: "Coaching",
            tabBarButton: (props) => (
              <TabBarButton
                {...props}
                iconName="graduation-cap"
                label="Coaching"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarButton: (props) => (
              <TabBarButton {...props} iconName="user" label="Profile" />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
