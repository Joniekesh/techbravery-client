import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Menu, X, LogOut, Bell, User, ArrowRight } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

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

import { makeRequest } from "@/utils/makeRequest";

import { useQuery } from "@tanstack/react-query";

import { mobileNavigation } from "@/mockData";

import { Role } from "@/types/user";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { toast } from "sonner";

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);
  const user = auth.user;

  const getNotificationsRoute = (role?: string) => {
    switch (role) {
      case Role.ADMIN:
        return "/admin-dashboard/notifications";

      default:
        return "/notifications";
    }
  };

  const getDashboardRoute = (role?: string) => {
    switch (role) {
      case Role.ADMIN:
        return "/admin-dashboard";

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

  return (
    <nav className="relative w-full min-w-0 bg-transparent">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* =====================================================
              DESKTOP CONNECT WALLET
          ====================================================== */}

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

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {/* ===================================================
                MOBILE CONNECT WALLET
            ==================================================== */}

            {/* <div className="lg:hidden">
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
            </div> */}

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
                      className=" rounded-full outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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

export default AdminNavbar;
