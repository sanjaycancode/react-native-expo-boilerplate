import { StyleSheet, View } from "react-native";

import { Stack, useRouter } from "expo-router";

import { Controller, useForm } from "react-hook-form";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";

import { useTheme } from "@/context/ThemeContext";

import { formTextInputHelper } from "@/utils";

import { useCreateTodoMutation } from "@/hooks/api";

type CreateTodoFormValues = {
  completed: boolean;
  userId: string;
  title: string;
};

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "message" in error) {
    const { message } = error as { message?: unknown };
    if (typeof message === "string") {
      return message;
    }
  }

  return "Something went wrong.";
}

export default function CreateTodoScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  const { control, handleSubmit } = useForm<CreateTodoFormValues>({
    defaultValues: {
      completed: false,
      userId: "",
      title: "",
    },
  });

  const createTodoMutation = useCreateTodoMutation();
  const isSubmitDisabled = createTodoMutation.isPending;

  const onSubmit = ({ completed, userId, title }: CreateTodoFormValues) => {
    const parsedUserId = Number(userId.trim());

    createTodoMutation.mutate(
      {
        userId: parsedUserId,
        title: title.trim(),
        completed,
      },
      {
        onSuccess: () => {
          router.replace("../todos");
        },
      },
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Create Todo" }} />

      <View style={styles.container}>
        <ThemedText variant="body" semantic="muted">
          Add a demo todo using JSONPlaceholder.
        </ThemedText>

        <Controller
          control={control}
          name="userId"
          rules={{
            required: "Please provide a User ID.",
          }}
          render={({ field, fieldState }) => (
            <ThemedTextInput
              label="User ID"
              placeholder="Enter a positive user ID"
              keyboardType="number-pad"
              editable={!createTodoMutation.isPending}
              {...formTextInputHelper({ field, fieldState })}
            />
          )}
        />

        <Controller
          control={control}
          name="title"
          rules={{
            required: "Please provide valid Title.",
          }}
          render={({ field, fieldState }) => (
            <ThemedTextInput
              label="Title"
              placeholder="Enter todo title"
              editable={!createTodoMutation.isPending}
              {...formTextInputHelper({ field, fieldState })}
            />
          )}
        />

        <View style={styles.toggleSection}>
          <Controller
            control={control}
            name="completed"
            render={({ field }) => (
              <>
                <View style={styles.toggleRow}>
                  <ThemedButton
                    title="Pending"
                    size="small"
                    variant={field.value ? "secondary" : "primary"}
                    onPress={() => field.onChange(false)}
                    disabled={createTodoMutation.isPending}
                    style={styles.toggleButton}
                  />
                  <ThemedButton
                    title="Completed"
                    size="small"
                    variant={field.value ? "primary" : "secondary"}
                    onPress={() => field.onChange(true)}
                    disabled={createTodoMutation.isPending}
                    style={styles.toggleButton}
                  />
                </View>
                <ThemedText
                  variant="bodySmall"
                  semantic={field.value ? "success" : "muted"}
                >
                  {field.value
                    ? "This todo will be created as completed."
                    : "This todo will be created as pending."}
                </ThemedText>
              </>
            )}
          />
        </View>

        {createTodoMutation.isError ? (
          <ThemedText variant="bodySmall" semantic="error">
            Failed to create todo: {getErrorMessage(createTodoMutation.error)}
          </ThemedText>
        ) : null}

        <ThemedButton
          title={createTodoMutation.isPending ? "Creating..." : "Create Todo"}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitDisabled}
        />
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.lg,
    },
    toggleSection: {
      gap: theme.spacing.sm,
    },
    toggleRow: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    toggleButton: {
      flex: 1,
    },
  });
