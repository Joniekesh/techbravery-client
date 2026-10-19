import { IClientProfile, InvestorProfile, IStaffProfile } from "../profile";

export const Role = {
  USER: "USER",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export type Workspace = "CLIENT" | "INVESTOR";

export type AuthType = "EMAIL" | "GOOGLE";

export type UserStatus =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "BANNED"
  | "DELETED"
  | "LOCKED";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  image?: string | null;
  bio?: string | null;
  iSEmailVerified: boolean;
  role: Role;
  authType: AuthType;
  status?: UserStatus;
  isClient: boolean;
  isInvestor: boolean;
  isStaff: boolean;
  clientProfile?: IClientProfile | null;
  investorProfile?: InvestorProfile | null;
  staffProfile?: IStaffProfile | null;
  message?: string;
}
