import { useCallback, useMemo } from "react";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

type AppTheme = ReturnType<typeof useTheme>["theme"];

type Params = {
  id?: string;
  name?: string;
  title?: string;
  pricePerSession?: string;
  fromBookCoach?: string;
};

type Slot = {
  id: string;
  day: string;
  time: string;
  duration: string;
};

export default function CoachSlotsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = useThemeColors();
  const navigation = useNavigation();
  const router = useRouter();
  const { name, title, pricePerSession, fromBookCoach } = useLocalSearchParams<Params>();

  const isFromBookCoach = fromBookCoach === "true";

  const handleBack = useCallback(() => {
    if (isFromBookCoach) {
      router.replace("/bookCoach");
    } else {
      router.back();
    }
  }, [isFromBookCoach, router]);

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: { display: "none" } });

      return () => {
        parent?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation]),
  );

  const slots: Slot[] = useMemo(
    () => [
      { id: "s1", day: "Today", time: "6:30 PM", duration: "30 min" },
      { id: "s2", day: "Tomorrow", time: "8:00 AM", duration: "30 min" },
      { id: "s3", day: "Wed", time: "7:15 PM", duration: "45 min" },
      { id: "s4", day: "Thu", time: "9:00 AM", duration: "30 min" },
      { id: "s5", day: "Fri", time: "6:00 PM", duration: "60 min" },
    ],
    [],
  );

  const displayName = name ?? "Coach";
  const displayTitle = title ?? "";
  const displayPrice =
    pricePerSession && !Number.isNaN(Number(pricePerSession))
      ? `$${Number(pricePerSession).toFixed(2)}/session`
      : undefined;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Available Slots",
          headerBackVisible: true,
        }}
      />

      <FlatList
        data={slots}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <ThemedCard variant="outlined" style={styles.headerCard}>
            <ThemedText variant="heading3">{displayName}</ThemedText>
            {!!displayTitle && (
              <ThemedText variant="bodySmall" semantic="muted">
                {displayTitle}
              </ThemedText>
            )}
            {!!displayPrice && (
              <View style={styles.priceRow}>
                <FontAwesome5
                  name="tag"
                  size={14}
                  color={colors.textSecondary}
                />
                <ThemedText variant="bodySmall" semantic="muted">
                  {displayPrice}
                </ThemedText>
              </View>
            )}
          </ThemedCard>
        }
        renderItem={({ item }) => (
          <ThemedCard variant="outlined" style={styles.slotCard}>
            <View style={styles.slotRow}>
              <View style={styles.slotInfo}>
                <ThemedText variant="button">
                  {item.day} • {item.time}
                </ThemedText>
                <ThemedText variant="bodySmall" semantic="muted">
                  {item.duration} • Video call
                </ThemedText>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.bookButton,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.backgroundAlt,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
                onPress={() =>
                  Alert.alert(
                    "Slot selected",
                    `${displayName} — ${item.day} at ${item.time}`,
                  )
                }
              >
                <ThemedText variant="bodySmall">Select</ThemedText>
              </Pressable>
            </View>

            <ThemedButton
              title="Confirm Booking"
              size="small"
              onPress={() =>
                Alert.alert(
                  "Booked",
                  `Booked ${displayName} — ${item.day} at ${item.time}`,
                )
              }
            />
          </ThemedCard>
        )}
      />
    </>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing.lg,
    },
    headerCard: {
      padding: theme.spacing.lg,
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    priceRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
      marginTop: theme.spacing.xs,
    },
    separator: {
      height: theme.spacing.md,
    },
    slotCard: {
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    slotRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    slotInfo: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    bookButton: {
      borderWidth: 1,
      borderRadius: theme.borderRadius.medium,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      minWidth: theme.spacing.lg,
      alignItems: "center",
      justifyContent: "center",
    },
  });