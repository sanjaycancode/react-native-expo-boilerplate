import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import type { NotificationKind } from "@/types/notification";

type NotificationColorToken = "primary" | "success" | "warning";

export const notificationConfig: Record<
  NotificationKind,
  {
    icon: ComponentProps<typeof Ionicons>["name"];
    colorToken: NotificationColorToken;
  }
> = {
  new_class_available: {
    icon: "book-outline",
    colorToken: "primary",
  },
  class_enrollment: {
    icon: "play-outline",
    colorToken: "primary",
  },
  class_reminder: {
    icon: "alarm-outline",
    colorToken: "success",
  },
  booking_reminder: {
    icon: "alarm-outline",
    colorToken: "warning",
  },
};
