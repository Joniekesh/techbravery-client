import { useLocation, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDollarSign,
  UserRound,
} from "lucide-react";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/types/user";

type Workspace = {
  id: string;
  label: string;
  description: string;
  path: string;
  icon: React.ElementType;
};

export const WorkspaceSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

  const workspaces: Workspace[] = [];

  if (user.role === Role.ADMIN) {
    workspaces.push({
      id: "admin",
      label: "Admin Workspace",
      description: "Manage the organization",
      path: "/admin-dashboard",
      icon: BriefcaseBusiness,
    });
  }

  if (user.isStaff || user.role === Role.STAFF) {
    workspaces.push({
      id: "staff",
      label: "Employee Workspace",
      description: user?.role ? `${user.role} workspace` : "Employee workspace",
      path: "/staff-dashboard",
      icon: BriefcaseBusiness,
    });
  }

  if (user.isClient) {
    workspaces.push({
      id: "client",
      label: "Client Workspace",
      description: "Projects, quotes and services",
      path: "/client-dashboard",
      icon: UserRound,
    });
  }

  if (user.isInvestor) {
    workspaces.push({
      id: "investor",
      label: "Investor Workspace",
      description: "Investments and portfolio",
      path: "/investor-dashboard",
      icon: CircleDollarSign,
    });
  }

  if (workspaces.length === 0) {
    return null;
  }

  const currentWorkspace =
    workspaces.find((workspace) =>
      location.pathname.startsWith(workspace.path),
    ) ?? workspaces[0];

  /*
   * ----------------------------------------------------------
   * If only one workspace exists, show it as information
   * rather than a switcher.
   * ----------------------------------------------------------
   */

  if (workspaces.length === 1) {
    const workspace = workspaces[0];

    const Icon = workspace.icon;

    return (
      <>
        <DropdownMenuItem
          className="focus:bg-accent cursor-pointer"
          onSelect={(event) => event.preventDefault()}
          onClick={() => navigate(workspace.path)}
        >
          <Icon className="mr-2 h-4 w-4 text-primary" />

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-medium">{workspace.label}</span>

            <span className="truncate text-[11px] text-muted-foreground">
              {workspace.description}
            </span>
          </div>

          <Check className="ml-2 h-4 w-4 text-primary" />
        </DropdownMenuItem>
      </>
    );
  }

  /*
   * ----------------------------------------------------------
   * Multiple workspaces
   * ----------------------------------------------------------
   */

  return (
    <>
      <div className="px-3 py-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Switch workspace
        </p>
      </div>

      {workspaces.map((workspace) => {
        const Icon = workspace.icon;

        const isCurrent = workspace.id === currentWorkspace.id;

        return (
          <DropdownMenuItem
            key={workspace.id}
            onSelect={(event) => {
              event.preventDefault();

              if (!isCurrent) {
                navigate(workspace.path);
              }
            }}
            className="cursor-pointer gap-2.5 py-2.5"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                isCurrent
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm font-medium ${
                  isCurrent ? "text-primary" : ""
                }`}
              >
                {workspace.label}
              </p>

              <p className="truncate text-[11px] text-muted-foreground">
                {workspace.description}
              </p>
            </div>

            {isCurrent ? (
              <Check className="h-4 w-4 shrink-0 text-primary" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}
          </DropdownMenuItem>
        );
      })}

      <DropdownMenuSeparator />
    </>
  );
};
