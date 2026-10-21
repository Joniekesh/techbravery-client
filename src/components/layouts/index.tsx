import { ThemeToggle } from "@/ThemeToggle";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Analytics from "../Analytics";
import GDPRBanner from "../GDPRBanner";
import LiveChat from "../LiveChat";
import NewsletterPopup from "../NewsletterPopup";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import ScrollToTop from "../ScrollToTop";
import SmoothScroll from "../SmoothScroll";
import { MobileBottomNav } from "../shared/MobileBottomNav";
import { AppSideBar } from "../appSideBar";
import AdminNavbar from "../AdminNavbar";
import ClientNavbar from "../ClientNavbar";
import { Logo } from "../Logo";

export const Layout = () => {
  const location = useLocation();

  const isAdmin =
    location.pathname.startsWith("/admin-dashboard") ||
    location.pathname.startsWith("/investor-dashboard") ||
    location.pathname.startsWith("/client-dashboard") ||
    location.pathname.startsWith("/staff-dashboard");

  return (
    <div className="flex flex-col justify-between w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 min-h-[100vh]">
        <Outlet />
      </main>
      {/* <Footer /> */}
      {!isAdmin && <Footer />}
    </div>
  );
};

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background">
        <AppSideBar />

        <SidebarInset className="min-w-0 flex-1">
          <Analytics />
          <GDPRBanner />
          <LiveChat />
          <NewsletterPopup />

          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4">
            <SidebarTrigger className="shrink-0" />

            <div className="min-w-0 flex-1">
              <AdminNavbar />
            </div>
          </header>

          <main className="min-w-0 flex-1 overflow-x-hidden">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export const UserLayout = () => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background">
        <AppSideBar />

        <SidebarInset className="min-w-0 flex-1">
          <Analytics />
          <GDPRBanner />
          <LiveChat />
          <NewsletterPopup />

          <header className="sticky top-0 z-40 flex h-16 w-full min-w-0 shrink-0 items-center gap-3 border-b border-border bg-background px-3 sm:px-4">
            <SidebarTrigger className="shrink-0" />

            <div className="min-w-0 flex-1">
              <ClientNavbar />
            </div>
          </header>

          <main className="min-w-0 flex-1 overflow-x-hidden">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export const AuthLayout = () => {
  return (
    <div className="max-h-screen w-full bg-background text-foreground overflow-auto">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="-ml-7">
            <Logo size="lg" className="transition-transform duration-300" />
          </div>

          <ThemeToggle />
        </div>
      </header>

      {/* Authentication content */}
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>
    </div>
  );
};
