import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Role, Workspace } from "@/types/user";
import { useAppSelector } from "@/redux/hooks";

interface ProtectedRouteProps {
  allowedRoles?: Role[];
  requiredProfile?: Workspace;
}

export const ProtectedRoute = ({
  allowedRoles,
  requiredProfile,
}: ProtectedRouteProps) => {
  const location = useLocation();

  const auth = useAppSelector((state) => state.auth);
  const user = auth?.user;
  const isLoading = auth?.isLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    sessionStorage.setItem(
      "redirectAfterLogin",
      location.pathname + location.search,
    );

    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length) {
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  if (requiredProfile === "CLIENT") {
    if (user.role !== Role.USER || !user.isClient) {
      return <Navigate to="/" replace />;
    }
  }

  if (requiredProfile === "INVESTOR") {
    if (user.role !== Role.USER || !user.isInvestor) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};
