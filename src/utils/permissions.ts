import { UserRole } from "@/types/profile/index";

export const can = (role?: UserRole) => ({
  admin: role === UserRole.ADMIN,
  staff: role === UserRole.STAFF,
  client: role === UserRole.CLIENT,
  develover: role === UserRole.DEVELOPER,
  investor: role === UserRole.INVESTOR,
});
