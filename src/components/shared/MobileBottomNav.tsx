import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
// import { MoreMenu } from "./MoreMenu";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  User,
  TrendingUp,
  MoreHorizontal,
  Bell,
  Shield,
  Settings,
  HelpCircle,
  Zap,
  CreditCard,
  ExternalLink,
  User2,
  Users,
  File,
  CircleUser,
  Users2,
  LayoutDashboardIcon,
  Wallet2,
  Home,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { Role } from "@/types/user";

// Main tab items (visible in bottom nav)
interface TabItem {
  id: string;
  title: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

// More menu items (accessible via "More" button)
interface MoreItem {
  id: string;
  title: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
  section?: string;
}

const indexMainTabs: TabItem[] = [
  { id: "home", title: "Home", icon: LayoutDashboard, path: "/" },
  { id: "p2p", title: "P2P Market", icon: Users, path: "/p2p" },
  { id: "exchangers", title: "Exchangers", icon: TrendingUp, path: "/forex" },
  {
    id: "dashboard",
    title: "Profile",
    icon: CircleUser,
    path: "__PROFILE__",
  },
];

// User dashboard tabs
const userMainTabs: TabItem[] = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    path: "/dashboard",
  },
  { id: "wallet", title: "Wallet", icon: Wallet, path: "/dashboard/wallet" },
  { id: "p2p", title: "P2P", icon: Users, path: "/p2p" },
  // { id: "exchangers", title: "Exchangers", icon: TrendingUp, path: "/forex" },
];

const userMoreItems: MoreItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    path: "/dashboard",
    section: "Dashboard",
  },
  {
    id: "wallet",
    title: "Wallet",
    icon: Wallet2,
    path: "/dashboard/wallet",
    section: "Dashboard",
  },
  {
    id: "transactions",
    title: "Transactions",
    icon: ArrowLeftRight,
    path: "/dashboard/transactions",
    section: "Dashboard",
  },
  {
    id: "alerts",
    title: "Notifications",
    icon: Bell,
    path: "/dashboard/alerts",
    // badge: 2,
    section: "Trading",
  },
  {
    id: "kyc",
    title: "KYC",
    icon: Shield,
    path: "/dashboard/kyc",
    section: "Account",
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
    section: "Account",
  },
  {
    id: "p2p",
    title: "P2P Merchant",
    icon: Users,
    path: "/dashboard/p2p",
    section: "Account",
  },
  {
    id: "forex",
    title: "Exchangers",
    icon: Zap,
    path: "/forex",
    section: "Trading",
  },
  {
    id: "p2p",
    title: "P2P Market",
    icon: Users,
    path: "/p2p",
    section: "Trading",
  },
  {
    id: "support",
    title: "Support",
    icon: HelpCircle,
    path: "/dashboard/support",
    section: "Support",
  },
];

// Admin dashboard tabs
const adminMainTabs: TabItem[] = [
  { id: "home", title: "Home", icon: LayoutDashboard, path: "/admin" },
  // { id: "users", title: "Users", icon: User, path: "/admin/users" },
  { id: "wallets", title: "Wallets", icon: Wallet, path: "/admin/wallets" },
  { id: "trades", title: "Trades", icon: TrendingUp, path: "/admin/trades" },
];

const adminMoreItems: MoreItem[] = [
  {
    id: "users",
    title: "Users",
    icon: Users,
    path: "/admin/users",
    // badge: 12,
    section: "Management",
  },
  {
    id: "disputes",
    title: "Disputes",
    icon: Bell,
    path: "/admin/disputes",
    // badge: 12,
    section: "Management",
  },
  {
    id: "tokens",
    title: "Tokens",
    icon: CreditCard,
    path: "/admin/tokens",
    section: "Management",
  },
  {
    id: "transactions",
    title: "Transactions",
    icon: ArrowLeftRight,
    path: "/admin/transactions",
    section: "Management",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    path: "/admin/notifications",
    section: "Management",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: TrendingUp,
    path: "/admin/analytics",
    section: "Management",
  },
  {
    id: "kyc",
    title: "KYC",
    icon: Shield,
    path: "/admin/compliance",
    // badge: 8,
    section: "Management",
  },
  {
    id: "support",
    title: "Support",
    icon: HelpCircle,
    path: "/admin/support",
    // badge: 24,
    section: "Support",
  },
  {
    id: "logs",
    title: "Logs",
    icon: ExternalLink,
    path: "/admin/logs",
    section: "System",
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
    section: "System",
  },
  {
    id: "report",
    title: "Report",
    icon: File,
    path: "/admin/reports",
    section: "System",
  },
];

// Vendor dashboard tabs
const vendorMainTabs: TabItem[] = [
  {
    id: "home",
    title: "Home",
    icon: LayoutDashboard,
    path: "/vendor",
  },
  {
    id: "listings",
    title: "Listings",
    icon: CreditCard,
    path: "/vendor/listings",
  },
  { id: "wallet", title: "Wallet", icon: Wallet, path: "/vendor/wallet" },
  {
    id: "profile",
    title: "Profile",
    icon: User,
    path: "/vendor/settings",
  },
];

const vendorMoreItems: MoreItem[] = [
  {
    id: "create",
    title: "New Listing",
    icon: ExternalLink,
    path: "/vendor/listing/new",
    section: "Listings",
  },
  {
    id: "messages",
    title: "Messages",
    icon: Bell,
    path: "/vendor/messages",
    badge: 3,
    section: "Communication",
  },
  {
    id: "reviews",
    title: "Reviews",
    icon: ExternalLink,
    path: "/vendor/reviews",
    section: "Communication",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: TrendingUp,
    path: "/vendor/analytics",
    section: "Business",
  },
  {
    id: "documents",
    title: "Documents",
    icon: ExternalLink,
    path: "/vendor/documents",
    section: "Business",
  },
  {
    id: "banks",
    title: "Bank Accounts",
    icon: CreditCard,
    path: "/vendor/banks",
    section: "Business",
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    path: "/vendor/settings",
    section: "Account",
  },
];

type UserType = "user" | "admin" | "vendor" | "index";

interface MobileBottomNavProps {
  userType: UserType;
}

export function MobileBottomNav({ userType }: MobileBottomNavProps) {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const getTabs = () => {
    switch (userType) {
      case "admin":
        return adminMainTabs;
      case "vendor":
        return vendorMainTabs;
      case "index":
        return indexMainTabs;
      default:
        return userMainTabs;
    }
  };

  const getMoreItems = () => {
    switch (userType) {
      case "admin":
        return adminMoreItems;
      case "vendor":
        return vendorMoreItems;
      case "index":
        return [];
      default:
        return userMoreItems;
    }
  };

  const mainTabs = getTabs();
  const moreItems = getMoreItems();

  const isActive = (path: string) => {
    const current = location.pathname;

    if (path === "/") {
      return current === "/";
    }

    if (path === "/dashboard" || path === "/admin" || path === "/vendor") {
      return current === path;
    }

    return current === path || current.startsWith(`${path}/`);
  };

  const handleTabClick = (path: string) => {
    if (path === "__PROFILE__") {
      switch (user?.role) {
        case Role.ADMIN:
          navigate("/admin-dashboard");
          break;

        case Role.STAFF:
          navigate("/staff-dashboard");
          break;

        default:
          navigate("/client-dashboard");
      }

      return;
    }

    navigate(path);
  };

  const handleMoreItemClick = (path: string) => {
    setIsMoreOpen(false);
    setTimeout(() => navigate(path), 150);
  };

  return (
    <>
      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-2 left-2 right-2 z-50 rounded-2xl border border-border/60 bg-background/90 backdrop-blur-xl shadow-2xl safe-area-pb -mx-8">
        <div className="flex items-center justify-between h-[72px] px-1">
          {mainTabs.map((tab) => {
            const active = isActive(tab.path);
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className={cn(
                  "group flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all duration-300 active:scale-95",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <div
                  className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                    active && "bg-primary/10",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all duration-200 font-bold",
                      active && "scale-110",
                    )}
                  />
                  {tab.badge && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-medium text-primary-foreground">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium mt-0.5 transition-all duration-200",
                    active && "scale-105",
                  )}
                >
                  {tab.title}
                </span>
              </button>
            );
          })}

          {/* More Button */}
          {userType !== "index" && (
            <button
              onClick={() => setIsMoreOpen(true)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full min-w-0 transition-all duration-200",
                isMoreOpen
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                  isMoreOpen && "bg-primary/10",
                )}
              >
                <MoreHorizontal
                  className={cn(
                    "w-5 h-5 transition-all duration-200",
                    isMoreOpen && "scale-110",
                  )}
                />
              </div>
              <span className="font-medium mt-0.5">More</span>
            </button>
          )}
        </div>
      </nav>

      {/* More Menu Sheet */}
      {/* {userType !== "index" && (
        <MoreMenu
          isOpen={isMoreOpen}
          onClose={() => setIsMoreOpen(false)}
          items={moreItems}
          onItemClick={handleMoreItemClick}
          userType={userType}
        />
      )} */}
    </>
  );
}
