import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Bell,
  ChevronDown,
  Menu,
  LogOut,
  Settings,
  UserRound,
  X,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/actions/authActions";

import { ThemeToggle } from "@/ThemeToggle";
import { WorkspaceSwitcher } from "@/components/WorkspaceSwitcher";

import { makeRequest } from "@/utils/makeRequest";
import { useQuery } from "@tanstack/react-query";

import { Role } from "@/types/user";

type DashboardNavbarProps = {
  title?: string;
  description?: string;
  navigation?: {
    label: string;
    href: string;
  }[];
  onMenuClick?: () => void;
  hasSidebar?: boolean;
};

const DashboardNavbar = ({
  title = "Dashboard",
  description,
  navigation = [],
  onMenuClick,
  hasSidebar = false,
}: DashboardNavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const getNotificationsCount = async () => {
    const response = await makeRequest.get("/notification/unread/count");

    return response.data;
  };

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getNotificationsCount,
    enabled: !!user,
    refetchInterval: 30000,
  });

  const staffRole = useMemo(() => {
    if (!user) return null;

    if (user.staffProfile?.jobTitle) {
      return user?.staffProfile?.jobTitle;
    }

    if (user.role === Role.STAFF) {
      return "Staff";
    }

    return null;
  }, [user]);

  const currentWorkspace = useMemo(() => {
    if (!user) return null;

    const path = location.pathname;

    if (path.startsWith("/admin-dashboard")) {
      return {
        label: "Admin Workspace",
        shortLabel: "Admin",
      };
    }

    if (path.startsWith("/staff-dashboard")) {
      return {
        label: "Employee Workspace",
        shortLabel: "Employee",
      };
    }

    if (path.startsWith("/client-dashboard")) {
      return {
        label: "Client Workspace",
        shortLabel: "Client",
      };
    }

    if (path.startsWith("/investor-dashboard")) {
      return {
        label: "Investor Workspace",
        shortLabel: "Investor",
      };
    }

    if (user.isClient) {
      return {
        label: "Client Workspace",
        shortLabel: "Client",
      };
    }

    if (user.isInvestor) {
      return {
        label: "Investor Workspace",
        shortLabel: "Investor",
      };
    }

    return null;
  }, [location.pathname, user]);

  const initials = useMemo(() => {
    if (!user) return "U";

    const first = user.firstName?.charAt(0)?.toUpperCase() ?? "";

    const last = user.lastName?.charAt(0)?.toUpperCase() ?? "";

    if (first || last) {
      return `${first}${last}`;
    }

    return user.email?.charAt(0)?.toUpperCase() ?? "U";
  }, [user]);

  const isActive = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(`${href}/`)
    );
  };

  const notificationsRoute = useMemo(() => {
    const path = location.pathname;

    if (path.startsWith("/admin-dashboard")) {
      return "/admin-dashboard/notifications";
    }

    if (path.startsWith("/staff-dashboard")) {
      return "/staff-dashboard/notifications";
    }

    if (path.startsWith("/client-dashboard")) {
      return "/client-dashboard/notifications";
    }

    if (path.startsWith("/investor-dashboard")) {
      return "/investor-dashboard/notifications";
    }

    if (user?.isClient) {
      return "/client-dashboard/notifications";
    }

    if (user?.isInvestor) {
      return "/investor-dashboard/notifications";
    }

    return "/notifications";
  }, [location.pathname, user]);

  const handleLogout = () => {
    setMobileOpen(false);
    dispatch(logout());
  };

  const handleMobileNavigate = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          {hasSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 lg:hidden"
              onClick={onMenuClick}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Link to="/" className="hidden shrink-0 items-center gap-2 md:flex">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <img
                  src="/logo.webp"
                  alt="Techbravery"
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="hidden font-bold tracking-tight xl:block">
                Techbravery
              </span>
            </Link>

            <div className="hidden h-6 w-px bg-border md:block" />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-sm font-semibold sm:text-base">
                  {title}
                </h1>

                {currentWorkspace && (
                  <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary sm:inline-flex">
                    {currentWorkspace.shortLabel}
                  </span>
                )}
              </div>

              {description && (
                <p className="hidden truncate text-xs text-muted-foreground md:block">
                  {description}
                </p>
              )}
            </div>
          </div>

          {navigation.length > 0 && (
            <nav className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* ==================================================
              RIGHT ACTIONS
          ================================================== */}

          <div className="flex shrink-0 items-center gap-1">
            {/* Notifications */}

            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-lg"
                aria-label="Notifications"
                onClick={() => navigate(notificationsRoute)}
              >
                <Bell className="h-[18px] w-[18px]" />

                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white ring-2 ring-background">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Button>
            )}

            {/* Theme */}

            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* ==================================================
                ACCOUNT
            ================================================== */}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-10 gap-2 rounded-full px-1.5 sm:px-2"
                  >
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.firstName || "User"}
                      />

                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>

                    <div className="hidden max-w-[140px] text-left md:block">
                      <p className="truncate text-xs font-semibold">
                        {user.firstName} {user.lastName}
                      </p>

                      {staffRole && (
                        <p className="truncate text-[10px] text-muted-foreground">
                          {staffRole}
                        </p>
                      )}
                    </div>

                    <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-72"
                >
                  {/* ==================================================
                      ACCOUNT HEADER
                  ================================================== */}

                  <div className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.firstName || "User"}
                        />

                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {user.firstName} {user.lastName}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>

                        {staffRole && (
                          <p className="mt-0.5 text-[10px] font-medium text-primary">
                            {staffRole}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* ==================================================
                      WORKSPACE
                  ================================================== */}

                  <WorkspaceSwitcher />

                  {/* ==================================================
                      PROFILE
                  ================================================== */}

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    <UserRound className="mr-2 h-4 w-4" />

                    <span>My Profile</span>
                  </DropdownMenuItem>

                  {/* ==================================================
                      SETTINGS
                  ================================================== */}

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />

                    <span>Settings</span>
                  </DropdownMenuItem>

                  {/* ==================================================
                      NOTIFICATIONS
                  ================================================== */}

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate(notificationsRoute)}
                  >
                    <Bell className="mr-2 h-4 w-4" />

                    <span>Notifications</span>

                    {unreadCount > 0 && (
                      <span className="ml-auto rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* ==================================================
                      LOGOUT
                  ================================================== */}

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />

                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* ==================================================
                MOBILE MENU
            ================================================== */}

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 lg:hidden"
              onClick={() => setMobileOpen((previous) => !previous)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* ==================================================
            MOBILE NAVIGATION
        ================================================== */}

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="overflow-hidden border-t border-border/60 lg:hidden"
            >
              <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-4">
                {/* User */}

                {user && (
                  <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.firstName || "User"}
                      />

                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.firstName} {user.lastName}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>

                      {staffRole && (
                        <p className="mt-0.5 text-xs font-medium text-primary">
                          {staffRole}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Workspace shortcut */}

                {currentWorkspace && (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentWorkspace.shortLabel === "Client") {
                        handleMobileNavigate("/client-dashboard");
                      } else if (currentWorkspace.shortLabel === "Investor") {
                        handleMobileNavigate("/investor-dashboard");
                      } else if (currentWorkspace.shortLabel === "Admin") {
                        handleMobileNavigate("/admin-dashboard");
                      } else {
                        handleMobileNavigate("/staff-dashboard");
                      }
                    }}
                    className="mb-3 flex w-full items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-3 text-left"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Current workspace
                      </p>

                      <p className="text-sm font-semibold text-primary">
                        {currentWorkspace.label}
                      </p>
                    </div>

                    <ChevronDown className="h-4 w-4 text-primary" />
                  </button>
                )}

                {/* Navigation */}

                {navigation.length > 0 && (
                  <nav className="space-y-1">
                    {navigation.map((item) => (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => handleMobileNavigate(item.href)}
                        className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium ${
                          isActive(item.href)
                            ? "bg-accent text-primary"
                            : "hover:bg-accent"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                )}

                <div className="mt-4 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => handleMobileNavigate("/profile")}
                    className="flex w-full items-center rounded-xl px-4 py-3 text-sm hover:bg-accent"
                  >
                    <UserRound className="mr-3 h-4 w-4" />
                    My Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMobileNavigate("/settings")}
                    className="flex w-full items-center rounded-xl px-4 py-3 text-sm hover:bg-accent"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMobileNavigate(notificationsRoute)}
                    className="flex w-full items-center rounded-xl px-4 py-3 text-sm hover:bg-accent"
                  >
                    <Bell className="mr-3 h-4 w-4" />
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-auto rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-between rounded-xl border border-border px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      Appearance
                    </span>

                    <ThemeToggle />
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center rounded-xl px-4 py-3 text-sm text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Log out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default DashboardNavbar;
