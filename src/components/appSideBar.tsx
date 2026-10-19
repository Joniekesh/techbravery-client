import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Bell,
  BarChart3,
  Shield,
  MessageSquare,
  Settings,
  User,
  LogOut,
  ChevronDown,
  LineChart,
  Banknote,
  Quote,
  Briefcase,
  Building2,
  Receipt,
  PlusCircle,
  IdCard,
} from "lucide-react";

import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/actions/authActions";

import { Role } from "@/types/user";
import { Logo } from "./Logo";

interface AppSideBarProps {
  unreadNotifications?: number;
  unresolvedDisputes?: number;
  pendingKycCount?: number;
  openTicketCount?: number;
  collapsed?: boolean;
}

type SidebarNavItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
};

type DashboardDomain = "ADMIN" | "STAFF" | "CLIENT" | "INVESTOR";

export const AppSideBar = ({
  unreadNotifications = 0,
  unresolvedDisputes = 0,
  pendingKycCount = 0,
  openTicketCount = 0,
  collapsed = false,
}: AppSideBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const currentDomain = useMemo<DashboardDomain>(() => {
    const pathname = location.pathname;

    if (pathname.startsWith("/investor-dashboard")) {
      return "INVESTOR";
    }

    if (pathname.startsWith("/client-dashboard")) {
      return "CLIENT";
    }

    if (user?.role === Role.USER) {
      if (user.isClient) {
        return "CLIENT";
      }

      if (user.isInvestor) {
        return "INVESTOR";
      }
    }

    return "CLIENT";
  }, [location.pathname, user]);

  const isUser = user?.role === Role.USER;

  const canAccessClient = Boolean(isUser && user?.isClient);

  const canAccessInvestor = Boolean(isUser && user?.isInvestor);

  const canSwitchDomain = isUser && canAccessClient && canAccessInvestor;

  const isActive = (path: string) => {
    if (location.pathname === path) {
      return true;
    }

    return location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    dispatch(logout());

    sessionStorage.removeItem("redirectAfterLogin");

    toast.success("Logged out", {
      description: "You have been successfully logged out.",
    });

    navigate("/login", {
      replace: true,
    });
  };

  // const adminNavItems: SidebarNavItem[] = [
  //   {
  //     title: "Dashboard",
  //     path: "/admin-dashboard",
  //     icon: LayoutDashboard,
  //   },
  //   {
  //     title: "Wallet",
  //     path: "/admin-dashboard/wallet",
  //     icon: Wallet2,
  //   },
  //   {
  //     title: "Applications",
  //     path: "/admin-dashboard/applications",
  //     icon: FaProductHunt,
  //   },
  //   {
  //     title: "Analytics",
  //     path: "/admin-dashboard/analytics",
  //     icon: LineChart,
  //   },
  //   {
  //     title: "Quotes",
  //     path: "/admin-dashboard/quotes",
  //     icon: Quote,
  //   },
  //   {
  //     title: "Projects",
  //     path: "/admin-dashboard/projects",
  //     icon: Workflow,
  //   },
  //   {
  //     title: "Clients",
  //     path: "/admin-dashboard/clients",
  //     icon: Users,
  //   },
  //   {
  //     title: "Staff",
  //     path: "/admin-dashboard/staff",
  //     icon: Users,
  //   },
  //   {
  //     title: "Developers",
  //     path: "/admin-dashboard/developers",
  //     icon: Code,
  //   },
  //   {
  //     title: "Investors",
  //     path: "/admin-dashboard/investors",
  //     icon: Users,
  //   },
  //   {
  //     title: "Investments",
  //     path: "/admin-dashboard/investments",
  //     icon: Banknote,
  //   },
  //   {
  //     title: "Notifications",
  //     path: "/admin-dashboard/notifications",
  //     icon: Bell,
  //     badge: unreadNotifications,
  //   },
  //   {
  //     title: "Disputes",
  //     path: "/admin-dashboard/disputes",
  //     icon: ShieldAlert,
  //     badge: unresolvedDisputes,
  //   },
  //   {
  //     title: "KYC",
  //     path: "/admin-dashboard/kyc",
  //     icon: Shield,
  //     badge: pendingKycCount,
  //   },
  //   {
  //     title: "Investor Onboarding",
  //     path: "/admin-dashboard/onboardings",
  //     icon: Shield,
  //     // badge: pendingKycCount,
  //   },
  //   {
  //     title: "Reports",
  //     path: "/admin-dashboard/reports",
  //     icon: FileText,
  //   },
  //   {
  //     title: "Exports",
  //     path: "/admin-dashboard/export",
  //     icon: FolderUp,
  //   },
  //   {
  //     title: "System Health",
  //     path: "/admin-dashboard/system-health",
  //     icon: Cpu,
  //   },
  //   {
  //     title: "System Logs",
  //     path: "/admin-dashboard/logs",
  //     icon: Logs,
  //   },
  //   {
  //     title: "Settings",
  //     path: "/admin-dashboard/settings",
  //     icon: Settings,
  //   },
  // ];

  // const staffNavItems: SidebarNavItem[] = [
  //   {
  //     title: "Dashboard",
  //     path: "/staff-dashboard",
  //     icon: LayoutDashboard,
  //   },
  //   {
  //     title: "Projects",
  //     path: "/staff-dashboard/projects",
  //     icon: Briefcase,
  //   },
  //   {
  //     title: "Tasks",
  //     path: "/staff-dashboard/tasks",
  //     icon: ClipboardList,
  //   },
  //   {
  //     title: "Workspace",
  //     path: "/staff-dashboard/workspace",
  //     icon: Workflow,
  //   },
  //   {
  //     title: "Team",
  //     path: "/staff-dashboard/team",
  //     icon: Users,
  //   },
  //   {
  //     title: "Reports",
  //     path: "/staff-dashboard/reports",
  //     icon: BarChart3,
  //   },
  //   {
  //     title: "Time & Attendance",
  //     path: "/staff-dashboard/time",
  //     icon: Clock,
  //   },
  //   {
  //     title: "Attendance",
  //     path: "/staff-dashboard/attendance",
  //     icon: CalendarDays,
  //   },
  //   {
  //     title: "Files",
  //     path: "/staff-dashboard/files",
  //     icon: FolderOpen,
  //   },
  //   {
  //     title: "HR",
  //     path: "/staff-dashboard/hr",
  //     icon: Users,
  //   },
  //   {
  //     title: "Learning",
  //     path: "/staff-dashboard/learning",
  //     icon: GraduationCap,
  //   },
  //   {
  //     title: "Notifications",
  //     path: "/staff-dashboard/notifications",
  //     icon: Bell,
  //     badge: unreadNotifications,
  //   },
  //   {
  //     title: "Settings",
  //     path: "/staff-dashboard/settings",
  //     icon: Settings,
  //   },
  // ];

  const clientNavItems: SidebarNavItem[] = [
    {
      title: "Dashboard",
      path: "/client-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Projects",
      path: "/client-dashboard/projects",
      icon: Briefcase,
    },
    {
      title: "New Project",
      path: "/client-dashboard/new-project",
      icon: PlusCircle,
    },
    {
      title: "Quotes",
      path: "/client-dashboard/quotes",
      icon: Quote,
    },
    {
      title: "Invoices",
      path: "/client-dashboard/invoices",
      icon: Receipt,
    },
    {
      title: "Notifications",
      path: "/client-dashboard/notifications",
      icon: Bell,
      badge: unreadNotifications,
    },
    {
      title: "Messages",
      path: "/client-dashboard/messages",
      icon: MessageSquare,
      badge: openTicketCount,
    },
    {
      title: "Settings",
      path: "/client-dashboard/settings",
      icon: Settings,
    },
  ];

  /**
   * ============================================================
   * INVESTOR NAVIGATION
   * ============================================================
   */
  const investorNavItems: SidebarNavItem[] = [
    {
      title: "Dashboard",
      path: "/investor-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Wallet",
      path: "/investor-dashboard/wallet",
      icon: Wallet,
    },
    {
      title: "Invoices",
      path: "/investor-dashboard/invoices",
      icon: Receipt,
    },
    {
      title: "Investments",
      path: "/investor-dashboard/investments",
      icon: Banknote,
    },
    {
      title: "Portfolio",
      path: "/investor-dashboard/portfolio",
      icon: LineChart,
    },
    {
      title: "Opportunities",
      path: "/investor-dashboard/opportunities",
      icon: Briefcase,
    },
    {
      title: "KYC",
      path: "/investor-dashboard/kyc",
      icon: IdCard,
    },
    {
      title: "Transactions",
      path: "/investor-dashboard/transactions",
      icon: ArrowLeftRight,
    },

    {
      title: "Notifications",
      path: "/investor-dashboard/notifications",
      icon: Bell,
      badge: unreadNotifications,
    },
    {
      title: "Messages",
      path: "/investor-dashboard/messages",
      icon: MessageSquare,
      badge: openTicketCount,
    },
    {
      title: "Settings",
      path: "/investor-dashboard/settings",
      icon: Settings,
    },
  ];

  const navItems = useMemo(() => {
    switch (currentDomain) {
      case "INVESTOR":
        return investorNavItems;

      case "CLIENT":
      default:
        return clientNavItems;
    }
  }, [
    currentDomain,
    unreadNotifications,
    unresolvedDisputes,
    pendingKycCount,
    openTicketCount,
  ]);

  const domainConfig = {
    ADMIN: {
      title: "Techbravery",
      subtitle: "Admin Portal",
      icon: Shield,
      dashboard: "/admin-dashboard",
    },

    STAFF: {
      title: "Techbravery",
      subtitle: "Staff Workspace",
      icon: Briefcase,
      dashboard: "/staff-dashboard",
    },

    CLIENT: {
      title: "Techbravery",
      subtitle: "Client Workspace",
      icon: Building2,
      dashboard: "/client-dashboard",
    },

    INVESTOR: {
      title: "Techbravery",
      subtitle: "Investor Workspace",
      icon: BarChart3,
      dashboard: "/investor-dashboard",
    },
  }[currentDomain];

  const handleSwitchDomain = (domain: "CLIENT" | "INVESTOR") => {
    if (domain === "CLIENT") {
      if (!canAccessClient) {
        toast.error("Client workspace is not available for this account.");
        return;
      }

      navigate("/client-dashboard");
      return;
    }

    if (domain === "INVESTOR") {
      if (!canAccessInvestor) {
        toast.error("Investor workspace is not available for this account.");
        return;
      }

      navigate("/investor-dashboard");
    }
  };

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const accountName = fullName || "User";

  const initials =
    `${user?.firstName?.charAt(0) ?? ""}${
      user?.lastName?.charAt(0) ?? ""
    }`.toUpperCase() || "U";

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="h-full">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Techbravery"
              size="lg"
              className="h-16 px-2"
            >
              <Link
                to={domainConfig.dashboard}
                aria-label={`Techbravery ${domainConfig.subtitle}`}
                className="flex items-center gap-2"
              >
                {/* Full wordmark: visible when expanded */}
                <div className="flex min-w-0 flex-1 items-center group-data-[collapsible=icon]:hidden">
                  <Logo size="md" homeLink={false} className="max-w-full" />
                </div>

                {/* Icon-only logo: visible when collapsed */}
                <div className="hidden w-full items-center justify-center group-data-[collapsible=icon]:flex">
                  <Logo size="sm" iconOnly homeLink={false} />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <SidebarContent className="overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>
            {currentDomain === "ADMIN"
              ? "Administration"
              : currentDomain === "STAFF"
                ? "Staff Workspace"
                : currentDomain === "CLIENT"
                  ? "Client Workspace"
                  : "Investor Workspace"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = isActive(item.path);

                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="relative"
                    >
                      <Link to={item.path}>
                        <Icon className="h-4 w-4 shrink-0" />

                        <span className="truncate">{item.title}</span>

                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/15 px-1.5 text-[10px] font-medium text-primary">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          {/* System status */}
          {user?.role === Role.ADMIN && (
            <SidebarMenuItem>
              <div className="rounded-lg bg-sidebar-accent/50 p-3 group-data-[collapsible=icon]:hidden">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                  <span className="text-xs text-sidebar-foreground/70">
                    System Status
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-500">Operational</span>

                  <span className="text-sidebar-foreground/50">99.9%</span>
                </div>
              </div>
            </SidebarMenuItem>
          )}

          {/* Account */}
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" tooltip={accountName}>
                  <Avatar className="h-8 w-8 shrink-0 border-2 border-primary/30">
                    <AvatarImage src={user?.image} />

                    <AvatarFallback className="bg-primary/20 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex min-w-0 flex-1 flex-col text-left">
                    <span className="truncate text-sm font-medium">
                      {accountName}
                    </span>

                    <span className="truncate text-xs text-sidebar-foreground/60">
                      {user?.email || "user@Techbravery.app"}
                    </span>
                  </div>

                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-sidebar-foreground/50" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="right" align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    if (currentDomain === "ADMIN") {
                      navigate("/admin-dashboard/settings");
                    } else if (currentDomain === "STAFF") {
                      navigate("/staff-dashboard/settings");
                    } else if (currentDomain === "INVESTOR") {
                      navigate("/investor-dashboard/settings");
                    } else {
                      navigate("/client-dashboard/settings");
                    }
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    if (currentDomain === "ADMIN") {
                      navigate("/admin-dashboard/settings");
                    } else if (currentDomain === "STAFF") {
                      navigate("/staff-dashboard/settings");
                    } else if (currentDomain === "INVESTOR") {
                      navigate("/investor-dashboard/settings");
                    } else {
                      navigate("/client-dashboard/settings");
                    }
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                {/* Workspace switching from account menu */}
                {canSwitchDomain && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Workspace</DropdownMenuLabel>

                    <DropdownMenuItem
                      onClick={() => handleSwitchDomain("CLIENT")}
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      Client Workspace
                      {currentDomain === "CLIENT" && (
                        <span className="ml-auto text-xs text-primary">
                          Active
                        </span>
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleSwitchDomain("INVESTOR")}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Investor Workspace
                      {currentDomain === "INVESTOR" && (
                        <span className="ml-auto text-xs text-primary">
                          Active
                        </span>
                      )}
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
