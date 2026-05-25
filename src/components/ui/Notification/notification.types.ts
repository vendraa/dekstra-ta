import { Notification } from "@/features/notifications/types/notification.types";

export interface NotificationButtonProps {
  unreadCount: number;
  onClick: () => void;
}

export interface NotificationDropdownProps {
  notifications: Notification[];
  onClose: () => void;
}