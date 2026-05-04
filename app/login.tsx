import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { Controller, useForm } from "react-hook-form";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedKeyboardAvoidingView } from "@/components/ThemedKeyboardAvoidingView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

import { formTextInputHelper } from "@/utils";

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { signIn } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setLoginError(null);
      await signIn(values);
    } catch (error) {
      setLoginError(getErrorMessage(error));
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Login", headerShown: false }} />
      <ThemedKeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <ThemedText variant="heading2">Login</ThemedText>
            <ThemedText variant="body" semantic="muted">
              Sign in to continue
            </ThemedText>
          </View>

          <ThemedCard style={styles.formContainer}>
            <Controller
              control={control}
              name="username"
              rules={{
                required: "Enter your username.",
              }}
              render={({ field, fieldState }) => (
                <ThemedTextInput
                  label="username"
                  placeholder="Enter your valid username"
                  // keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                  {...formTextInputHelper({ field, fieldState })}
                  helperText={
                    fieldState.error?.message ??
                    "Use the username tied to your account."
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Enter your password.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
              }}
              render={({ field, fieldState }) => (
                <ThemedTextInput
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  editable={!isSubmitting}
                  {...formTextInputHelper({ field, fieldState })}
                  helperText={
                    fieldState.error?.message ??
                    "Enter the password for your account."
                  }
                />
              )}
            />

            {loginError ? (
              <ThemedText variant="bodySmall" semantic="error">
                {loginError}
              </ThemedText>
            ) : null}

            <ThemedButton
              title="Sign In"
              variant="accent"
              loading={isSubmitting}
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
            />
          </ThemedCard>

          <View>
            <ThemedText variant="bodySmall" semantic="primary">
              Forgot password?
            </ThemedText>
          </View>
        </View>
      </ThemedKeyboardAvoidingView>
    </>
  );
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    const { message } = error as { message?: unknown };
    if (typeof message === "string") {
      return message;
    }
  }

  return "Unable to sign in.";
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: theme.spacing.lg,
      gap: theme.spacing.lg,
    },
    headerContainer: { gap: theme.spacing.sm },
    formContainer: { gap: theme.spacing.lg, padding: theme.spacing.lg },
  });
