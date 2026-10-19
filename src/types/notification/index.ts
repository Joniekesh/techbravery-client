export enum NotificationType {
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
  PHONE_VERIFICATION = "PHONE_VERIFICATION",
  LOGIN_2FA = "LOGIN_2FA",
  PASSWORD_RESET = "PASSWORD_RESET",
  CHANGE_EMAIL = "CHANGE_EMAIL",
  CHANGE_PHONE = "CHANGE_PHONE",
  ACCOUNT_DELETION = "ACCOUNT_DELETION",
  TERMS_ACCEPTANCE = "TERMS_ACCEPTANCE",
  DEPOSIT_CONFIRMATION = "DEPOSIT_CONFIRMATION",
  HIGH_VALUE_TRANSACTION = "HIGH_VALUE_TRANSACTION",
  ADMIN_ROLE_ASSIGNMENT = "ADMIN_ROLE_ASSIGNMENT",
  ADMIN_PERMISSION_CHANGE = "ADMIN_PERMISSION_CHANGE",
  ADMIN_ACCOUNT_SUSPENSION = "ADMIN_ACCOUNT_SUSPENSION",
  ADMIN_SYSTEM_CONFIG_CHANGE = "ADMIN_SYSTEM_CONFIG_CHANGE",
  ADMIN_ACTION = "ADMIN_ACTION",
  USER_LOGIN_ALERT = "USER_LOGIN_ALERT",
  USER_PASSWORD_CHANGED = "USER_PASSWORD_CHANGED",
  USER_ACCOUNT_LOCKED = "USER_ACCOUNT_LOCKED",
  USER_ACCOUNT_CREATED = "USER_ACCOUNT_CREATED",
  SYSTEM_ANNOUNCEMENT = "SYSTEM_ANNOUNCEMENT",
  ADMIN_MESSAGE = "ADMIN_MESSAGE",
}

export enum NotificationScope {
  ALL = "ALL",
  CLIENT = "CLIENT",
  DEVELOPER = "DEVELOPER",
  INVESTOR = "INVESTOR",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

export type NotificationRecipient = {
  id: string;
  notificationId: string;
  userId: string;
  isRead: boolean;
  isDelivered: boolean;
  [key: string]: any;
};

export type NotificationMeta = {
  userId: string;
};

export type INotification = {
  id: string;
  title: string;
  description: string;
  notifType: NotificationType;
  scope: NotificationScope;
  senderId: string;
  createdAt: string;
  updatedAt: string;
  meta?: NotificationMeta;
  recipients: NotificationRecipient[];
};
