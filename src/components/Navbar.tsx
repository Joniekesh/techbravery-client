import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Bell,
  User,
  ArrowRight,
  Repeat2,
  Building2,
  BarChart3,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/actions/authActions";

import { ThemeToggle } from "@/ThemeToggle";
import { useTheme } from "./ThemeProvider";

import { makeRequest } from "@/utils/makeRequest";

import { useQuery } from "@tanstack/react-query";

import { mobileNavigation, navigation } from "@/mockData";

import { Role } from "@/types/user";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { toast } from "sonner";
import { Logo } from "./Logo";

type Workspace = "CLIENT" | "INVESTOR";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);
  const user = auth.user;

  const currentWorkspace = useMemo<Workspace | null>(() => {
    const pathname = location.pathname;

    if (pathname.startsWith("/client-dashboard")) {
      return "CLIENT";
    }

    if (pathname.startsWith("/investor-dashboard")) {
      return "INVESTOR";
    }

    /*
     * If the user is outside a dashboard, infer the workspace
     * from the user's available profiles.
     */
    if (user?.role === Role.USER) {
      if (user.isInvestor && !user.isClient) {
        return "INVESTOR";
      }

      if (user.isClient && !user.isInvestor) {
        return "CLIENT";
      }
    }

    return null;
  }, [location.pathname, user]);

  const isUser = user?.role === Role.USER;

  const canAccessClient = Boolean(isUser && user?.isClient);

  const canAccessInvestor = Boolean(isUser && user?.isInvestor);

  const canSwitchWorkspace = isUser && canAccessClient && canAccessInvestor;

  const handleSwitchWorkspace = (workspace: Workspace) => {
    if (workspace === "CLIENT") {
      if (!canAccessClient) {
        toast.error("Client workspace is not available for this account.");

        return;
      }

      navigate("/client-dashboard");
    }

    if (workspace === "INVESTOR") {
      if (!canAccessInvestor) {
        toast.error("Investor workspace is not available for this account.");

        return;
      }

      navigate("/investor-dashboard");
    }

    setIsMobileMenuOpen(false);
  };

  const getNotificationsRoute = (role?: string) => {
    switch (role) {
      case Role.ADMIN:
        return "/admin-dashboard/notifications";

      case Role.USER:
        return currentWorkspace === "CLIENT"
          ? "/client-dashboard/notifications"
          : "/investor-dashboard/notifications";

      case Role.STAFF:
        return "/staff-dashboard/notifications";

      default:
        return "/notifications";
    }
  };

  const getDashboardRoute = (role?: string) => {
    switch (role) {
      case Role.ADMIN:
        return "/admin-dashboard";

      case Role.USER:
        return currentWorkspace === "CLIENT"
          ? "/client-dashboard"
          : "/investor-dashboard";

      case Role.STAFF:
        return "/staff-dashboard";

      default:
        return "/dashboard";
    }
  };

  const getNotificationsCount = async () => {
    const res = await makeRequest.get("/notification/unread/count");

    return res.data;
  };

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getNotificationsCount,
    enabled: !!user,
    refetchInterval: 30000,
  });

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());

    sessionStorage.removeItem("redirectAfterLogin");

    setIsMobileMenuOpen(false);

    toast.success("Logged out", {
      description: "You have been successfully logged out.",
    });

    navigate("/login", {
      replace: true,
    });
  };

  const getInitials = () => {
    if (!user) {
      return "U";
    }

    const first = user.firstName?.charAt(0)?.toUpperCase() || "";

    const last = user.lastName?.charAt(0)?.toUpperCase() || "";

    if (first || last) {
      return `${first}${last}`;
    }

    return user.email?.charAt(0)?.toUpperCase() || "U";
  };

  const workspaceLabel =
    currentWorkspace === "CLIENT"
      ? "Client Workspace"
      : currentWorkspace === "INVESTOR"
        ? "Investor Workspace"
        : "Workspace";

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* LOGO */}
          <div className="-ml-7">
            <Logo size="lg" className="transition-transform duration-300" />
          </div>

          <div className="hidden lg:flex">
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              chainStatus="icon"
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
          </div>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setOpenDropdown(item.key)
                }
                onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
              >
                {item.hasDropdown ? (
                  <>
                    <button
                      type="button"
                      className={`flex items-center gap-1rounded-lg px-3 py-2text-sm font-mediumtransition-colors
                        ${
                          isActive(item.href)
                            ? "bg-accent text-primary"
                            : "text-foreground hover:bg-accent hover:text-primary"
                        }
                      `}
                    >
                      {item.name}

                      <ChevronDown
                        className={`h-4 w-4transition-transform duration-200
                          ${openDropdown === item.key ? "rotate-180" : ""}
                        `}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === item.key && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: 8,
                          }}
                          transition={{
                            duration: 0.15,
                          }}
                          className=" absolute left-0 top-full z-50 pt-2
                          "
                        >
                          <div
                            className="
                              w-56 overflow-hidden
                              rounded-xl border border-border
                              bg-card p-1.5
                              shadow-xl shadow-black/5
                            "
                          >
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                onClick={() => setOpenDropdown(null)}
                                className="
                                    block rounded-lg
                                    px-3 py-2.5
                                    text-sm text-foreground
                                    transition-colors
                                    hover:bg-accent
                                    hover:text-primary
                                  "
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`
                      block rounded-lg
                      px-3 py-2
                      text-sm font-medium
                      transition-colors
                      ${
                        isActive(item.href)
                          ? "bg-accent text-primary"
                          : "text-foreground hover:bg-accent hover:text-primary"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {/* ===================================================
                MOBILE CONNECT WALLET
            ==================================================== */}

            <div className="lg:hidden">
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "avatar",
                }}
                chainStatus="icon"
                showBalance={{
                  smallScreen: false,
                  largeScreen: false,
                }}
              />
            </div>

            {/* ===================================================
                GET QUOTE
            ==================================================== */}

            <Button
              asChild
              className="hidden rounded-lg bg-gradient-to-r from-primary to-primary-glow shadow-sm shadow-primary/20 lg:inline-flex"
            >
              <Link to="/quote" className="flex items-center gap-2">
                Get Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            {/* ===================================================
                NOTIFICATIONS
            ==================================================== */}

            {user && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="relative h-9 w-9 rounded-lg hover:bg-accent"
                onClick={() => navigate(getNotificationsRoute(user.role))}
              >
                <Bell className="h-[18px] w-[18px]" />

                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white ring-2 ring-background">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Button>
            )}

            <ThemeToggle />

            {user ? (
              <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="
            rounded-full
            outline-none
            ring-offset-background
            transition
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
          "
                      aria-label="Open account menu"
                    >
                      <Avatar className=" h-9 w-9 cursor-pointer border border-border">
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.firstName || "User"}
                        />

                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-60"
                    align="end"
                    sideOffset={8}
                  >
                    {/* User information */}
                    <div className="px-3 py-3">
                      <p className="text-sm font-semibold">
                        {user.firstName} {user.lastName}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Workspace */}
                    {canSwitchWorkspace && (
                      <>
                        <DropdownMenuLabel>Workspace</DropdownMenuLabel>

                        <DropdownMenuItem
                          onClick={() => handleSwitchWorkspace("CLIENT")}
                          className={
                            currentWorkspace === "CLIENT" ? "bg-accent" : ""
                          }
                        >
                          <Building2 className="mr-2 h-4 w-4" />

                          <span>Client Workspace</span>

                          {currentWorkspace === "CLIENT" && (
                            <span className="ml-auto text-xs text-primary">
                              Active
                            </span>
                          )}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleSwitchWorkspace("INVESTOR")}
                          className={
                            currentWorkspace === "INVESTOR" ? "bg-accent" : ""
                          }
                        >
                          <BarChart3 className="mr-2 h-4 w-4" />

                          <span>Investor Workspace</span>

                          {currentWorkspace === "INVESTOR" && (
                            <span className="ml-auto text-xs text-primary">
                              Active
                            </span>
                          )}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                      </>
                    )}

                    {/* Dashboard */}
                    <DropdownMenuItem
                      onClick={() => navigate(getDashboardRoute(user.role))}
                      className="cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />

                      <span>Dashboard</span>
                    </DropdownMenuItem>

                    {/* Notifications */}
                    <DropdownMenuItem
                      onClick={() => navigate(getNotificationsRoute(user.role))}
                      className="cursor-pointer"
                    >
                      <Bell className="mr-2 h-4 w-4" />

                      <span>Notifications</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Logout */}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />

                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              /* =================================================
     DESKTOP AUTH
  ================================================== */

              <div className="hidden items-center gap-2 lg:flex">
                <Button variant="ghost" asChild className="rounded-lg">
                  <Link to="/login">Login</Link>
                </Button>

                <Button
                  asChild
                  className="rounded-lg bg-gradient-to-r from-primary to-primary-glow"
                >
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            )}

            {/* ===================================================
                MOBILE MENU BUTTON
            ==================================================== */}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen((previous) => !previous)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="
                h-9 w-9
                rounded-lg
                lg:hidden
              "
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE / TABLET MENU
      ========================================================== */}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden
            "
          >
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div
                className="mx-auto max-w-7xl px-4 py-5 sm:px-6
                "
              >
                {/* =================================================
                    MOBILE USER AREA
                ================================================== */}

                {user && (
                  <div
                    className="mb-4 flex items-center justify-between rounded-xl border border-border bg-card p-3
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={user.image || undefined} />

                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p
                          className="truncate text-sm font-semibold
                          "
                        >
                          {user.firstName} {user.lastName}
                        </p>

                        <p
                          className="max-w-[200px] truncate text-xs text-muted-foreground
                          "
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        navigate(getDashboardRoute(user.role));

                        closeMobileMenu();
                      }}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* =================================================
                    MOBILE WORKSPACE SWITCHER
                ================================================== */}

                {user && canSwitchWorkspace && (
                  <div className="mb-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-12 w-full justify-between rounded-xl border-border bg-card px-4
                            "
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary
                                "
                            >
                              {currentWorkspace === "CLIENT" ? (
                                <Building2 className="h-4 w-4" />
                              ) : (
                                <BarChart3 className="h-4 w-4" />
                              )}
                            </span>

                            <span className="flex flex-col items-start">
                              <span
                                className="
                                    text-[11px]
                                    text-muted-foreground
                                  "
                              >
                                Current workspace
                              </span>

                              <span className="text-sm font-medium">
                                {workspaceLabel}
                              </span>
                            </span>
                          </span>

                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="start"
                        className="w-[calc(100vw-2rem)] max-w-md"
                      >
                        <DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        {canAccessClient && (
                          <DropdownMenuItem
                            onClick={() => handleSwitchWorkspace("CLIENT")}
                            className="
                                cursor-pointer
                                py-3
                              "
                          >
                            <Building2 className="mr-3 h-4 w-4" />

                            <span>Client Workspace</span>

                            {currentWorkspace === "CLIENT" && (
                              <span
                                className="
                                    ml-auto
                                    text-xs
                                    text-primary
                                  "
                              >
                                Active
                              </span>
                            )}
                          </DropdownMenuItem>
                        )}

                        {canAccessInvestor && (
                          <DropdownMenuItem
                            onClick={() => handleSwitchWorkspace("INVESTOR")}
                            className="
                                cursor-pointer
                                py-3
                              "
                          >
                            <BarChart3 className="mr-3 h-4 w-4" />

                            <span>Investor Workspace</span>

                            {currentWorkspace === "INVESTOR" && (
                              <span
                                className="
                                    ml-auto
                                    text-xs
                                    text-primary
                                  "
                              >
                                Active
                              </span>
                            )}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {/* =================================================
                    MOBILE NAVIGATION
                ================================================== */}

                <div className="space-y-1">
                  {mobileNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-colors
                          ${
                            isActive(item.href)
                              ? "bg-accent text-primary"
                              : "text-foreground hover:bg-accent hover:text-primary"
                          }
                        `}
                    >
                      <span>{item.name}</span>

                      <ArrowRight
                        className="
                            h-4 w-4
                            opacity-50
                          "
                      />
                    </Link>
                  ))}
                </div>

                {/* =================================================
                    MOBILE QUICK ACTIONS
                ================================================== */}

                <div
                  className="
                    mt-5
                    border-t border-border
                    pt-5
                  "
                >
                  <div className="grid grid-cols-2 gap-3">
                    {user ? (
                      <>
                        <Button
                          variant="outline"
                          className="
                            h-11
                            rounded-xl
                          "
                          asChild
                        >
                          <Link
                            to={getDashboardRoute(user.role)}
                            onClick={closeMobileMenu}
                          >
                            Dashboard
                          </Link>
                        </Button>

                        <Button
                          variant="outline"
                          className="
                            h-11
                            rounded-xl
                          "
                          asChild
                        >
                          <Link
                            to={getNotificationsRoute(user.role)}
                            onClick={closeMobileMenu}
                          >
                            Notifications
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="h-11 rounded-xl
                          "
                          asChild
                        >
                          <Link to="/login" onClick={closeMobileMenu}>
                            Login
                          </Link>
                        </Button>

                        <Button
                          className="h-11 rounded-xl bg-gradient-to-r from-primary to-primary-glow
                          "
                          asChild
                        >
                          <Link to="/register" onClick={closeMobileMenu}>
                            Get Started
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>

                  {/* =================================================
                      GET QUOTE
                  ================================================== */}

                  <Button
                    className="mt-3 h-12 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow
                    "
                    asChild
                  >
                    <Link
                      to="/quote"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2
                      "
                    >
                      Get a Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* =================================================
                    MOBILE LOGOUT
                ================================================== */}

                {user && (
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className=" mt-5 w-full justify-start rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive
                    "
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
