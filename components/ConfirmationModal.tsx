import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

import { useTheme, useThemeColors } from "@/context/ThemeContext";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "primary" | "success" | "danger" | "default";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  visible,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmColor = "primary",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const { theme } = useTheme();
  const colors = useThemeColors();
  const styles = createStyles(theme, colors);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onCancel} />
        <ThemedCard variant="elevated" style={styles.modalCard}>
          <View style={styles.content}>
            <ThemedText variant="heading6">{title}</ThemedText>
            <ThemedText variant="body" semantic="muted">
              {message}
            </ThemedText>
          </View>
          <View style={styles.actions}>
            <ThemedButton
              title={cancelLabel}
              variant="outlined"
              color="default"
              size="small"
              disabled={loading}
              style={styles.actionButton}
              onPress={onCancel}
            />
            <ThemedButton
              title={confirmLabel}
              variant="filled"
              color={confirmColor}
              loading={loading}
              size="small"
              style={styles.actionButton}
              onPress={onConfirm}
            />
          </View>
        </ThemedCard>
      </View>
    </Modal>
  );
}

const createStyles = (
  theme: ReturnType<typeof useTheme>["theme"],
  colors: ReturnType<typeof useThemeColors>,
) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      padding: theme.spacing.md,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
    },
    modalCard: {
      backgroundColor: colors.surface,
      gap: theme.spacing.lg,
      padding: theme.spacing.lg,
    },
    content: {
      gap: theme.spacing.sm,
    },
    actions: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    actionButton: {
      flex: 1,
    },
  });
