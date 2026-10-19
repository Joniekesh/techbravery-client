import { ProjectWithQuoteAndUser } from "../project";
import { IQuote } from "../quote";
import { IDepartment, ISubDepartment } from "../department";
import { InvestmentInterest } from "../investment";
import { ICountry } from "../country";
import { KycRecord } from "../kyc";

export enum UserRole {
  CLIENT = "CLIENT",
  DEVELOPER = "DEVELOPER",
  INVESTOR = "INVESTOR",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  BANNED = "BANNED",
  DELETED = "DELETED",
  LOCKED = "LOCKED",
}

export enum AuthType {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
}

export interface IUserSetting {
  id: string;
  language: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  theme: string;
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  twoFAEnabled: boolean;
  loginAlerts: boolean;
  passwordExpiry: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface IUserCompany {
  id: string;
  companyName: string;
  bio: string;
  industry: string;
  companyEmail: string;
  size: number;
  website: string;
  address: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface IUserOtp {
  id: string;
  identifier: string;
  purpose: string;
  channel: "EMAIL" | "SMS" | "WHATSAPP";
  expiresAt: string;
  consumedAt: string | null;
  attempts: number;
  createdAt: string;
}

export interface INotification {
  id: string;
  title: string;
  description: string;
  notifType: string;
  scope: string;
  meta: Record<string, any> | null;
  createdAt: string;
}

export interface INotificationRecipient {
  id: string;
  isRead: boolean;
  isDelivered: boolean;
  readAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  notification: INotification;
}

export interface IBlogCategory {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
}

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  views: number;
  isFeatured: boolean;
  tags: string[];
  status: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
  category: IBlogCategory;
  createdAt: string;
  updatedAt: string | null;
}

export interface IProject {
  id: string;
  status: string;
  hostedUrl: string | null;
  testUrl: string | null;
  repoUrl: string | null;
  progress: number;
  projectDueDate: string | null;
  amountSpent: number;
  teamSize: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface IApplication {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  isLive: boolean;
  activeUsers: number;
  monthlyVolume: number;
  countriesCovered: number;
  createdAt: string;
}

export interface IInvestment {
  id: string;
  totalInvested: number;
  averageROI: number;
  investmentStage: string;
  status: string;
  isOpen: boolean;
  valuation: number;
  projectedReturn: number;
  createdAt: string;
}

export interface IInvestor {
  id: string;
  totalInvested: number;
  currentValue: number;
  totalROI: number;
  totalReturns: number;
  activeInvestments: number;
  createdAt: string;
}

export interface IStaff {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  phone: string | null;
  image: string | null;
  bio: string | null;
  role: UserRole | string;
  status: UserStatus | string;
  authType: AuthType | string;
  hasCompany: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface IBillingAddress {
  id: string;
  fullName: string | null;
  street: string | null;
  email: string;
  country: string;
  city: string;
  zip: string;
  isDefault: boolean;
  userId: string | null;
  payment: null;
  user: null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export interface IUserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  phone: string | null;
  image: string | null;
  bio: string | null;
  role: UserRole | string;
  status: UserStatus | string;
  authType: AuthType | string;
  hasCompany: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string | null;
  // relations
  staffProfile: IStaffProfile;
  setting: IUserSetting | null;
  company: IUserCompany | null;
  country: ICountry | null;
  nationality: ICountry | null;
  otps: IUserOtp[];
  sentNotifications: INotification[];
  notificationRecipients: INotificationRecipient[];
  blogs: IBlog[];
  blogCategories: IBlogCategory[];
  quotes: IQuote[];
  services: any[]; // optional: expand later
  assignedQuotes: IQuote[];
  assignedProjects: IProject[];
  projects: ProjectWithQuoteAndUser[];
  applications: IApplication[];
  investments: IInvestment[];
  investors: IInvestor[];
  billingAddresses: IBillingAddress[];
  investmentInterests: InvestmentInterest[];
  investorOnboardings: any[];
  kycSubmitted: KycRecord;
  subDepartment: {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    employeeDepartment: IDepartment;
  };
  systemSetting: Record<string, any> | null;
}

export interface IClientProfile {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface InvestorProfile {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IStaffProfile {
  id: string;
  userId: string;
  employeeId: string;
  jobTitle: string;
  departmentId: string | null;
  subDepartmentId: string | null;
  department?: IDepartment | null;
  subDepartment?: ISubDepartment | null;

  employmentType:
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACT"
    | "INTERN"
    | "TEMPORARY";

  hireDate: string | null;
  terminationDate: string | null;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
