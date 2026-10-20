import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Platforms from "./pages/Platforms";
import Portfolio from "./pages/Portfolio";
import Quote from "./pages/Quote";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import InvestorDashboard from "./pages/InvestorDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceDetail from "./pages/ServiceDetail";
import Partnership from "./pages/Partnership";
import Demo from "./pages/Demo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";
import ExafrikP2pExchange from "./pages/platforms/ExafrikP2pExchange";
import AgriTechSaas from "./pages/platforms/AgriTechSaas";
import EduConnectPlatform from "./pages/platforms/EduConnectPlatform";
import Q4Report from "./pages/reports/Q4Report";
import FinancialStatements from "./pages/reports/FinancialStatements";
import UserAnalytics from "./pages/reports/UserAnalytics";
import PitchDeck from "./pages/reports/PitchDeck";
import ProductRoadmap from "./pages/reports/ProductRoadmap";
import MarketAnalysis from "./pages/reports/MarketAnalysis";
import TechnicalSpecs from "./pages/reports/TechnicalSpecs";
import ComplianceReport from "./pages/reports/ComplianceReport";
import QuoteDetails from "./pages/admin/QuoteDetails";
import NewQuote from "./pages/admin/NewQuote";
import AdminSettings from "./pages/admin/AdminSettings";
import CaseStudy from "./pages/CaseStudy";
import HealthTechConnect from "./pages/platforms/HealthTechConnect";
import ClientSettings from "./pages/client/ClientSettings";
import NewProject from "./pages/client/NewProject";
import InvoicePayment from "./components/shared/InvoicePayment";
import P2PExchangeDetail from "./pages/platforms/P2PExchangeDetail";
import SaasSuiteDetail from "./pages/platforms/SaasSuiteDetail";
import DigitalWalletDetail from "./pages/platforms/DigitalWalletDetail";
import FintechDetail from "./pages/services/FintechDetail";
import Newsletter from "./pages/admin/Newsletter";
import ExportData from "./pages/admin/ExportData";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeProjects from "./pages/employee/Projects";
import EmployeeTasks from "./pages/employee/Tasks";
import EmployeeWorkspace from "./pages/employee/Workspace";
import EmployeeTeam from "./pages/employee/Team";
import EmployeeReports from "./pages/employee/Reports";
import EmployeeTimeAttendance from "./pages/employee/TimeAttendance";
import EmployeeHR from "./pages/employee/HR";
import EmployeeLearning from "./pages/employee/Learning";
import EmployeeNotification from "./pages/employee/Notifications";
import EmployeeSettings from "./pages/employee/Settings";
import EmployeeFileManager from "./pages/employee/FileManager";
import EmployeeAttendanceCalendar from "./pages/employee/AttendanceCalendar";
import VerifyAccount from "./pages/auth/VerifyAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import {
  AdminLayout,
  AuthLayout,
  Layout,
  UserLayout,
} from "./components/layouts";
import { Role } from "./types/user";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useNotificationSSE } from "./utils/useNotificationSSE";
import AdminNotification from "./pages/admin/AdminNotification";
import InvestorNotification from "./pages/investor/InvestorNotification";
import ClientNotification from "./pages/client/ClientNotification";
import { useAppDispatch } from "./redux/hooks";
import { fetchServices } from "./redux/actions/serviceAction";
import SingleQuote from "./pages/client/SingleQuote";
import EditQuote from "./pages/client/EditQuote";
import ClientDetails from "./pages/admin/ClientDetails";
import ProjectDetails from "./pages/admin/ProjectDetails";
import AddProjectTeamMembers from "./pages/admin/AddProjectTeamMembers";
import EditProject from "./pages/admin/EditProject";
import Analytics from "./pages/admin/Analytics";
import AdminQuotesPage from "./pages/admin/AdminQuotesPage";
import AdminProjectsPage from "./pages/admin/AdminProjectsPage";
import AdminClientsPage from "./components/admin/AdminClientsPage";
import AdminDevelopersPage from "./components/admin/AdminDevelopersPage";
import AdminInvestorsPage from "./components/admin/AdminInvestorsPage";
import AdminInvestmentsPage from "./pages/admin/AdminInvestmentsPage";
import SystemHealth from "./pages/admin/SystemHealth";
import Staff from "./pages/admin/Staff";
import { fetchCountries } from "./redux/actions/countryActions";
import ClientProjects from "./pages/client/ClientProjects";
import ClientQuotes from "./pages/client/ClientQuotes";
import ClientInvoices from "./pages/client/ClientInvoices";
import ClientMessages from "./pages/client/ClientMessages";
import InvestorInvestments from "./pages/investor/InvestorInvestments";
import InvestorPortfolio from "./pages/investor/InvestorPortfolio";
import InvestorOpportunities from "./pages/investor/InvestorOpportunities";
import InvestorTransactions from "./pages/investor/InvestorTransactions";
import InvestorMessages from "./pages/investor/InvestorMessages";
import InvestorSettings from "./pages/investor/InvestorSettings";
import PlatformDetail from "./pages/platforms/PlatformDetail";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminWallet from "./pages/admin/AdminWallet";
import ApplicationCreate from "./pages/admin/ApplicationCreate";
import AdminApplications from "./pages/admin/AdminApplications";
import NetworkStatus from "./components/shared/NetworkStatus";
import AdminApplication from "./pages/admin/AdminApplication";
import AdminApplicationEdit from "./pages/admin/AdminApplicationEdit";
import InvestorOnboardingPage from "./pages/investor/InvestorOnboardingPage";
import InvestorKyc from "./pages/investor/InvestorKyc";
import AdminKycPage from "./pages/admin/AdminKycPage";
import AdminKycDetailsPage from "./pages/admin/AminKycDetailsPage";
import SystemLogs from "./pages/admin/SystemLogs";
import AdminReports from "./pages/admin/AdminReports";
import { fetchCurrencies } from "./redux/actions/currencyActions";
import AdminOnboardingPage from "./pages/admin/AdminOnboardingPage";
import AdminOnboardingDetailsPage from "./pages/admin/AdminOnboardingDetailsPage";
import InvestorInvoicesPage from "./pages/investor/InvestorInvoicesPage";
import InvestorInvoicePage from "./pages/investor/InvestorInvoicePage";
import ClientInvoice from "./pages/client/ClientInvoice";
import { Toaster } from "sonner";

import AOS from "aos";
import "aos/dist/aos.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      // { path: "/login", element: <Login /> },
      // { path: "/register", element: <Register /> },
      // { path: "/forgot-password", element: <ForgotPassword /> },
      // { path: "/reset-password/:resetToken", element: <ResetPassword /> },
      // { path: "/verify", element: <VerifyAccount /> },
      { path: "/partnership", element: <Partnership /> },
      { path: "/demo", element: <Demo /> },
      { path: "/privacy", element: <PrivacyPolicy /> },
      { path: "/terms", element: <Terms /> },
      { path: "/cookies", element: <Cookies /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:slug", element: <ServiceDetail /> },
      { path: "/platforms", element: <Platforms /> },
      { path: "/platforms/:id", element: <PlatformDetail /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/quote", element: <Quote /> },
      { path: "/blog", element: <Blog /> },
      { path: "/careers", element: <Careers /> },
      { path: "/contact", element: <Contact /> },
      // {
      //   path: "/platforms/exafrik-p2p-exchange",
      //   element: <ExafrikP2pExchange />,
      // },
      // { path: "/platforms/agrilink-supply-chain", element: <AgriTechSaas /> },
      // { path: "/platforms/agritech-saas", element: <AgriTechSaas /> },
      // {
      //   path: "/platforms/educonnect-learning-hub",
      //   element: <EduConnectPlatform />,
      // },
      // {
      //   path: "/platforms/educonnect-platform",
      //   element: <EduConnectPlatform />,
      // },
      // {
      //   path: "/platforms/exafrik-exchange",
      //   element: <ExafrikP2pExchange />,
      // },
      // { path: "/platforms/agritech", element: <AgriTechSaas /> },
      // { path: "/platforms/educonnect", element: <EduConnectPlatform /> },
      // { path: "/platforms/p2p-exchange", element: <ExafrikP2pExchange /> },
      // { path: "/platforms/saas-suite", element: <AgriTechSaas /> },
      // { path: "/platforms/fintech-wallet", element: <EduConnectPlatform /> },
      // {
      //   path: "/platforms/healthtech-connect",
      //   element: <HealthTechConnect />,
      // },
      // { path: "/platforms/p2p-exchange/test", element: <P2PExchangeDetail /> },
      // { path: "/platforms/saas-suite/test", element: <SaasSuiteDetail /> },
      // {
      //   path: "/platforms/fintech-wallet/test",
      //   element: <DigitalWalletDetail />,
      // },
      { path: "/reports/q4-report", element: <Q4Report /> },
      {
        path: "/reports/financial-statements",
        element: <FinancialStatements />,
      },
      { path: "/reports/user-analytics", element: <UserAnalytics /> },
      { path: "/reports/pitch-deck", element: <PitchDeck /> },
      { path: "/reports/product-roadmap", element: <ProductRoadmap /> },
      { path: "/reports/market-analysis", element: <MarketAnalysis /> },
      { path: "/reports/technical-specs", element: <TechnicalSpecs /> },
      { path: "/reports/compliance-report", element: <ComplianceReport /> },
      { path: "/reports/pitch-deck", element: <ExafrikP2pExchange /> },
      { path: "/reports/market-analysis", element: <EduConnectPlatform /> },
      { path: "/reports/product-roadmap", element: <ExafrikP2pExchange /> },
      { path: "/reports/technical-specs", element: <AgriTechSaas /> },
      { path: "/reports/compliance-report", element: <AgriTechSaas /> },
      {
        path: "/services/fintech-and-wallet-systems",
        element: <FintechDetail />,
      },
      { path: "/case-study/:id", element: <CaseStudy /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },

      {
        path: "/reset-password/:resetToken",
        element: <ResetPassword />,
      },

      {
        path: "/verify",
        element: <VerifyAccount />,
      },
    ],
  },

  {
    path: "/admin-dashboard",
    element: <ProtectedRoute allowedRoles={[Role.ADMIN]} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Admin /> },
          { path: "quotes", element: <AdminQuotesPage /> },
          { path: "staff", element: <Staff /> },
          { path: "wallet", element: <AdminWallet /> },
          { path: "projects", element: <AdminProjectsPage /> },
          { path: "clients", element: <AdminClientsPage /> },
          { path: "developers", element: <AdminDevelopersPage /> },
          { path: "investors", element: <AdminInvestorsPage /> },
          { path: "investors", element: <AdminInvestorsPage /> },
          { path: "kyc", element: <AdminKycPage /> },
          { path: "kyc/:id", element: <AdminKycDetailsPage /> },
          { path: "onboardings", element: <AdminOnboardingPage /> },
          { path: "onboardings/:id", element: <AdminOnboardingDetailsPage /> },
          {
            path: "applications",
            element: <AdminApplications />,
          },
          {
            path: "applications/:id",
            element: <AdminApplication />,
          },
          {
            path: "applications/:id/edit",
            element: <AdminApplicationEdit />,
          },
          {
            path: "applications/new",
            element: <ApplicationCreate />,
          },
          // {
          //   path: "applications/:id",
          //   element: <ApplicationDetails />,
          // },
          // {
          //   path: "applications/:id/edit",
          //   element: <ApplicationEdit />,
          // },
          { path: "investments", element: <AdminInvestmentsPage /> },
          { path: "system-health", element: <SystemHealth /> },
          { path: "quotes/:id", element: <QuoteDetails /> },
          { path: "clients/:id", element: <ClientDetails /> },
          { path: "quotes/new", element: <NewQuote /> },
          { path: "disputes", element: <AdminDisputes /> },
          { path: "settings", element: <AdminSettings /> },
          { path: "analytics", element: <Analytics /> },
          { path: "newsletter", element: <Newsletter /> },
          { path: "export", element: <ExportData /> },
          { path: "investors/:id", element: <InvestorDashboard /> },
          { path: "projects/:id", element: <ProjectDetails /> },
          { path: "projects/:id/edit", element: <EditProject /> },
          {
            path: "projects/:id/add-team",
            element: <AddProjectTeamMembers />,
          },
          { path: "notifications", element: <AdminNotification /> },
          { path: "logs", element: <SystemLogs /> },
          { path: "reports", element: <AdminReports /> },
        ],
      },
    ],
  },

  {
    path: "/investor-dashboard",
    element: <ProtectedRoute requiredProfile="INVESTOR" />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <InvestorDashboard /> },
          { path: "notifications", element: <InvestorNotification /> },
          {
            path: "onboarding/:onboardingId",
            element: <InvestorOnboardingPage />,
          },
          { path: "kyc", element: <InvestorKyc /> },
          { path: "investments", element: <InvestorInvestments /> },
          { path: "portfolio", element: <InvestorPortfolio /> },
          { path: "opportunities", element: <InvestorOpportunities /> },
          { path: "transactions", element: <InvestorTransactions /> },
          { path: "messages", element: <InvestorMessages /> },
          { path: "settings", element: <InvestorSettings /> },
          { path: "invoices", element: <InvestorInvoicesPage /> },
          { path: "invoices/:id/pay", element: <InvestorInvoicePage /> },
        ],
      },
    ],
  },

  {
    path: "/staff-dashboard",
    // element: <ProtectedRoute allowedRoles={[Role.STAFF]} />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <EmployeeDashboard /> },
          { path: "projects", element: <EmployeeProjects /> },
          { path: "tasks", element: <EmployeeTasks /> },
          { path: "workspace", element: <EmployeeWorkspace /> },
          { path: "team", element: <EmployeeTeam /> },
          { path: "reports", element: <EmployeeReports /> },
          { path: "time", element: <EmployeeTimeAttendance /> },
          { path: "attendance", element: <EmployeeAttendanceCalendar /> },
          { path: "files", element: <EmployeeFileManager /> },
          { path: "hr", element: <EmployeeHR /> },
          { path: "learning", element: <EmployeeLearning /> },
          { path: "notifications", element: <EmployeeNotification /> },
          { path: "settings", element: <EmployeeSettings /> },
        ],
      },
    ],
  },

  {
    path: "/client-dashboard",
    element: <ProtectedRoute requiredProfile="CLIENT" />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <ClientDashboard /> },
          { path: "settings", element: <ClientSettings /> },
          { path: "projects", element: <ClientProjects /> },
          { path: "new-project", element: <NewProject /> },
          { path: "quotes", element: <ClientQuotes /> },
          { path: "invoices", element: <ClientInvoices /> },
          { path: "messages", element: <ClientMessages /> },
          { path: "quote/:id", element: <SingleQuote /> },
          { path: "invoices/:id/pay", element: <ClientInvoice /> },
          { path: "quote/:id/edit", element: <EditQuote /> },
          { path: "notifications", element: <ClientNotification /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

function App() {
  useNotificationSSE();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchCountries());
    dispatch(fetchCurrencies());
  }, [dispatch]);

  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  return (
    <div>
      <NetworkStatus />
      <Toaster position="bottom-right" richColors />

      <div className="w-full flex items-center justify-center">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
