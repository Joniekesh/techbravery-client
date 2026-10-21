import { AuthUser, Role } from "@/types/user";

export const getDefaultDashboard = (user: AuthUser): string => {
  if (!user) {
    return "/";
  }

  const role = String(user.role).toUpperCase();

  switch (role) {
    case String(Role.USER).toUpperCase(): {
      const isClient = Boolean(user.isClient);
      const isInvestor = Boolean(user.isInvestor);

      if (isClient && isInvestor) {
        return "/client-dashboard";
      }

      if (isClient) {
        return "/client-dashboard";
      }

      if (isInvestor) {
        return "/investor-dashboard";
      }

      return "/";
    }

    default:
      return "/";
  }
};
