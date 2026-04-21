import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

import { BorderRadius, Spacing } from "@/constants/Themes";

type AppTheme = ReturnType<typeof useTheme>["theme"];

type Params = {
  id?: string;
  name?: string;
  title?: string;
  nextAvailable?: string;
  pricePerSession?: string;
  fromBookCoach?: string;
};

export default function CoachProfileScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const colors = useThemeColors();
  const navigation = useNavigation();
  const router = useRouter();
  const { id, name, title, nextAvailable, pricePerSession, fromBookCoach } =
    useLocalSearchParams<Params>();

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

  const displayName = name ?? "Coach";

  return (
    <>
      <Stack.Screen
        options={{
          title: "Coach Profile",
          headerBackVisible: true,
        }}
      />

      <View style={styles.container}>
        <ThemedCard variant="outlined" style={styles.headerCard}>
          <View style={styles.headerRow}>
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: colors.overlay,
                  borderColor: colors.border,
                },
              ]}
            >
              <ThemedText variant="button">
                {(displayName[0] ?? "?").toUpperCase()}
              </ThemedText>
            </View>

            <View style={styles.headerText}>
              <ThemedText variant="heading3">{displayName}</ThemedText>
              {!!title && (
                <ThemedText variant="bodySmall" semantic="muted">
                  {title}
                </ThemedText>
              )}
            </View>
          </View>

          <View style={styles.metaRow}>
            {!!nextAvailable && (
              <View style={styles.metaItem}>
                <FontAwesome5
                  name="calendar-alt"
                  size={14}
                  color={colors.textSecondary}
                />
                <ThemedText variant="bodySmall" semantic="muted">
                  {nextAvailable}
                </ThemedText>
              </View>
            )}
            {!!pricePerSession && (
              <View style={styles.metaItem}>
                <FontAwesome5
                  name="tag"
                  size={14}
                  color={colors.textSecondary}
                />
                <ThemedText variant="bodySmall" semantic="muted">
                  ${Number(pricePerSession).toFixed(2)}/session
                </ThemedText>
              </View>
            )}
          </View>
        </ThemedCard>

        <ThemedCard variant="outlined" style={styles.sectionCard}>
          <ThemedText variant="button">About</ThemedText>
          <ThemedText variant="bodySmall" semantic="muted">
            This is a placeholder profile screen for coach id {id ?? "—"}. Add
            real bio, ratings, languages, and experience when backend data is
            ready.
          </ThemedText>
        </ThemedCard>

        <View style={styles.actionsRow}>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              {
                borderColor: colors.border,
                backgroundColor: colors.backgroundAlt,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
            onPress={handleBack}
          >
            <ThemedText variant="bodySmall">Back</ThemedText>
          </Pressable>
          <View style={styles.primaryButton}>
            <ThemedButton
              title="View Slots"
              size="small"
              onPress={() =>
                router.push({
                  pathname: "/bookCoach/viewSlots",
                  params: {
                    id: id ?? "",
                    name: name ?? "",
                    title: title ?? "",
                    nextAvailable: nextAvailable ?? "",
                    pricePerSession: pricePerSession ?? "",
                    fromBookCoach: "true",
                  },
                })
              }
            />
          </View>
        </View>
      </View>
    </>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    headerCard: {
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: theme.borderRadius.large,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    headerText: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing.md,
      alignItems: "center",
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    sectionCard: {
      padding: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    actionsRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      marginTop: theme.spacing.xs,
    },
    secondaryButton: {
      flex: 1,
      borderWidth: 1,
      borderRadius: theme.borderRadius.small,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      alignItems: "center",
      justifyContent: "center",
    },
    primaryButton: {
      flex: 1,
      minHeight: 40,
      justifyContent: "center",
    },
  });