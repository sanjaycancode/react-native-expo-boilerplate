import { Pressable, StyleSheet, View } from "react-native";

import { Stack, useRouter } from "expo-router";

import { Controller, useForm } from "react-hook-form";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedKeyboardAvoidingView } from "@/components/ThemedKeyboardAvoidingView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";

import { useTheme } from "@/context/ThemeContext";

import { formTextInputHelper } from "@/utils";

import { useAuth } from "@/context/AuthContext";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { signIn } = useAuth();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    signIn();
    router.replace("/(auth)/(tabs)");
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
              name="email"
              rules={{
                required: "Enter your email address.",
                validate: (value) =>
                  value.includes("@") || "Enter a valid email address.",
              }}
              render={({ field, fieldState }) => (
                <ThemedTextInput
                  label="Email"
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  {...formTextInputHelper({ field, fieldState })}
                  helperText={
                    fieldState.error?.message ??
                    "Use the email tied to your account."
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
                  {...formTextInputHelper({ field, fieldState })}
                  helperText={
                    fieldState.error?.message ??
                    "Authentication wiring will be added next."
                  }
                />
              )}
            />

            <ThemedButton title="Sign In" onPress={handleSubmit(onSubmit)} />
          </ThemedCard>

          <Pressable>
            <ThemedText variant="bodySmall" semantic="primary">
              Forgot password?
            </ThemedText>
          </Pressable>
        </View>
      </ThemedKeyboardAvoidingView>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: theme.spacing.lg,
      gap: theme.spacing.lg,
    },
    headerContainer: { gap: theme.spacing.md },
    formContainer: { gap: theme.spacing.lg, padding: theme.spacing.lg },
  });
