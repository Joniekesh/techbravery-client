import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddClientDialog } from "@/components/AddClientDialog";
import { ContactSupportDialog } from "@/components/ContactSupportDialog";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  UserCheck,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit3,
  Trash2,
  Send,
  AlertTriangle,
  Activity,
  Globe,
  Shield,
  Database,
  Server,
  Banknote,
} from "lucide-react";
import { IQuote, QuoteBudgetRange, QuoteStatus } from "@/types/quote";
import Loader from "@/components/loader/Loader";
import { ProjectStatus } from "@/types/project";
import {
  useFetchClients,
  useFetchMileStoneTemplates,
  useFetchProjects,
  useFetchQuotes,
} from "@/services";
import { TextTabs } from "@/components/shared/TextTabs";
import { DataTable } from "@/components/table/DataTable";
import TableFilters from "@/components/table/TableFilters";
import { quoteColumns } from "@/components/table/quotes/columns";
import { investmentColumns } from "@/components/table/investment";

const tabs = [
  { value: "quotes", label: "Quotes" },
  { value: "projects", label: "Projects" },
  { value: "clients", label: "Clients" },
  { value: "investments", label: "Investments" },
  { value: "analytics", label: "Analytics" },
  { value: "system", label: "System" },
];

const Admin = () => {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddClient, setShowAddClient] = useState(false);

  const [activeTab, setActiveTab] = useState("quotes");

  const navigate = useNavigate();

  const {
    data: templates = [],
    isLoading: isLoadingTemplates,
    isError: isErrorTemplates,
  } = useFetchMileStoneTemplates();

  console.log("TEMPLATES", templates);

  const { data: quotes = [], isLoading, isError } = useFetchQuotes();

  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
  } = useFetchProjects();

  const {
    data: clients = [],
    isLoading: isLoadingClients,
    isError: isErrorClients,
  } = useFetchClients();

  const pendingQuotes = quotes?.filter(
    (item) => item.status === QuoteStatus.SUBMITTED,
  ).length;

  const activeProjects = projects?.filter(
    (project) => project.status === ProjectStatus.IN_PROGRESS,
  ).length;

  const totalRevenue = projects?.reduce((acc, project) => {
    return acc + (project.amountSpent || 0);
  }, 0);

  const investments = [
    {
      id: "001",
      investor: "Africa Ventures",
      platform: "ExAfrik P2P Exchange",
      amount: "$250,000",
      status: "active",
      date: "2024-01-10",
    },
    {
      id: "002",
      investor: "TechFund Capital",
      platform: "ExAfrik SaaS Suite",
      amount: "$500,000",
      status: "pending",
      date: "2024-01-12",
    },
  ];

  const stats = {
    totalQuotes: 15,
    pendingQuotes: 5,
    activeProjects: 8,
    totalRevenue: 450000,
    newInvestments: 3,
    platformUsers: 1250,
    systemUptime: 99.9,
    apiCalls: 1500000,
    securityAlerts: 2,
    monthlyGrowth: 23.5,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "PENDING":
      case "SUBMITTED":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "ACCEPTED":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300";
      case "ON_HOLD":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "PAID":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "EXPIRED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "DECLINED":
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getBudgetRange = (budGetRange: string) => {
    switch (budGetRange) {
      case QuoteBudgetRange.FIVE_TO_15K:
        return <span>$5k-15k</span>;
      case QuoteBudgetRange.FITEEN_TO_30K:
        return <span>$15k-30k</span>;
      case QuoteBudgetRange.THIRTY_TO_50K:
        return <span>$30k-50k</span>;
      case QuoteBudgetRange.FIFTYK_PLUS:
        return <span>$50k+</span>;
      default:
        return <span>$5-15k</span>;
    }
  };

  const handleQuoteAction = (quote: IQuote, action: "ACCEPT" | "REJECT") => {
    toast.success(
      `Quote No: ${quote.quoteCode} has been successfully ${action.toLowerCase()}ed.`,
    );
  };

  const handleDeleteQuote = (quote: IQuote) => {
    toast.success(`Quote No: ${quote.quoteCode} has been permanently deleted.`);
  };

  const filteredQuotes = quotes?.filter((quote) => {
    const matchesSearch =
      quote.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <Loader type="bounce" />;
  // if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            Admin{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage quotes, projects, investments, and platform operations.
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Total Quotes
                    </p>
                    <p className="text-xl lg:text-2xl font-bold">
                      {quotes?.length}
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12% this month
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-primary opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Pending Quotes
                    </p>
                    <p className="text-xl lg:text-2xl font-bold">
                      {pendingQuotes}
                    </p>
                    <p className="text-xs text-yellow-600 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      Needs attention
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Active Projects
                    </p>
                    <p className="text-xl lg:text-2xl font-bold">
                      {activeProjects}
                    </p>
                    <p className="text-xs text-blue-600 flex items-center mt-1">
                      <Activity className="w-3 h-3 mr-1" />
                      On schedule
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Revenue
                    </p>
                    <p className="text-xl lg:text-2xl font-bold">
                      ${(totalRevenue / 1000).toFixed(2)}k
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />+
                      {stats.monthlyGrowth}% growth
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      System Status
                    </p>
                    <p className="text-xl lg:text-2xl font-bold">
                      {stats.systemUptime}%
                    </p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <Shield className="w-3 h-3 mr-1" />
                      All systems operational
                    </p>
                  </div>
                  <Server className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Button className="h-auto p-4 justify-start gap-3" asChild>
              <Link to="/admin-dashboard/quotes/new">
                <Plus className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">New Quote</p>
                  <p className="text-xs opacity-70">Create manual quote</p>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start gap-3"
              asChild
            >
              <Link to="/admin-dashboard/newsletter">
                <Send className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Send Newsletter</p>
                  <p className="text-xs opacity-70">Broadcast to clients</p>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start gap-3"
              asChild
            >
              <Link to="/admin-dashboard/export">
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Export Data</p>
                  <p className="text-xs opacity-70">Download reports</p>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start gap-3"
              asChild
            >
              <Link to="/admin-dashboard/settings">
                <Settings className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">System Config</p>
                  <p className="text-xs opacity-70">Platform settings</p>
                </div>
              </Link>
            </Button>
          </div>

          {/* Alerts */}
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-900">
                    System Notifications
                  </p>
                  <p className="text-sm text-orange-700">
                    {stats.securityAlerts} security alerts require attention •
                    Server maintenance scheduled for Sunday 3AM
                  </p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TextTabs tabs={tabs} />

            {/* Quote Requests */}
            <TabsContent value="quotes">
              <Card>
                <CardContent>
                  <DataTable
                    columns={quoteColumns}
                    data={quotes}
                    isLoading={isLoading}
                    mobileColumns={[
                      "client",
                      "projectType",
                      "budgetRange",
                      "status",
                      "createdAt",
                      "actions",
                    ]}
                    renderToolbar={(table) => (
                      <TableFilters
                        table={table}
                        title="Recent Quotes"
                        subTitle="Review and manage incoming quote requests"
                        icon={<FileText className="h-5 w-5" />}
                        searchQuery={table.getState().globalFilter ?? ""}
                        onSearchChange={(value) => table.setGlobalFilter(value)}
                        statusFilter={statusFilter}
                        onStatusChange={(value) => {
                          setStatusFilter(value);

                          if (value === "all") {
                            table
                              .getColumn("status")
                              ?.setFilterValue(undefined);
                          } else {
                            table.getColumn("status")?.setFilterValue(value);
                          }
                        }}
                        statusOptions={[
                          { label: "All Status", value: "all" },
                          { label: "Pending", value: "SUBMITTED" },
                          { label: "Approved", value: "ACCEPTED" },
                          { label: "Rejected", value: "DECLINED" },
                          { label: "Expired", value: "EXPIRED" },
                        ]}
                        showFilterButton={false}
                        showExportButton
                        buttonText="Add Quote"
                        url="/admin-dashboard/quotes/new"
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Active Projects */}
            <TabsContent value="projects">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Active Projects
                        </CardTitle>
                        <CardDescription>
                          Monitor ongoing development projects
                        </CardDescription>
                      </div>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {projects?.map((project, index) => (
                        <Card
                          key={index}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-medium">
                                {project?.quote?.projectName}
                              </h4>
                              <Badge
                                className={getStatusColor(project?.status)}
                              >
                                {project?.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              Client:{" "}
                              {project?.user?.firstName +
                                " " +
                                project?.user?.lastName}
                            </p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{project?.progress}%</span>
                              </div>
                              <Progress
                                value={project?.progress}
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{project?.teamSize} team members</span>
                                <span>
                                  Due:{" "}
                                  {project?.projectDueDate === null
                                    ? "Not started"
                                    : new Date(
                                        project?.projectDueDate,
                                      ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                asChild
                              >
                                <Link
                                  to={`/admin-dashboard/projects/${project.id}`}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  <span className="opacity-100">View</span>
                                </Link>
                                {/* <Link to={`/case-study/${index + 1}`}>
                                  <Eye className="w-3 h-3 mr-1" />
                                  <span className="opacity-100">View</span>
                                </Link> */}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                asChild
                              >
                                <Link
                                  to={`/admin-dashboard/projects/${project.id}/edit`}
                                >
                                  <Edit3 className="w-3 h-3 mr-1" />
                                  <span className="opacity-100">Edit</span>
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients">
              <Card>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Client Management
                      </CardTitle>
                      <CardDescription>
                        Manage client accounts and relationships
                      </CardDescription>
                    </div>
                    <AddClientDialog type="" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients?.map((client, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="font-medium text-primary">
                                {(client?.firstName + " " + client?.lastName)
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">
                                {client?.firstName + " " + client?.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {client?.company?.companyName}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Projects</p>
                              <p className="font-medium">
                                {client?.projects?.length}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Value</p>
                              <p className="font-medium">
                                {client?.projects?.reduce(
                                  (acc, project) =>
                                    acc + (project?.amountSpent ?? 0),
                                  0,
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Status</p>
                              <Badge variant="outline">{client.status}</Badge>
                            </div>
                            <div className="col-span-2 sm:col-span-1 flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                title="View Details"
                              >
                                <Link
                                  to={`/admin-dashboard/clients/${client.id}`}
                                >
                                  <Eye className="w-3 h-3" />
                                </Link>
                                {/* <Link to={`/case-study/${index + 1}`}>
                                  <Eye className="w-3 h-3" />
                                </Link> */}
                              </Button>
                              <ContactSupportDialog
                                trigger={
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    title="Contact Client"
                                  >
                                    <MessageSquare className="w-3 h-3" />
                                  </Button>
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Investments */}
            <TabsContent value="investments">
              <Card>
                <CardContent>
                  <DataTable
                    columns={investmentColumns}
                    data={investments}
                    isLoading={isLoading}
                    mobileColumns={[
                      "investor",
                      "platform",
                      "amount",
                      "status",
                      "createdAt",
                      "actions",
                    ]}
                    renderToolbar={(table) => (
                      <TableFilters
                        table={table}
                        title="Investments"
                        subTitle="Review and manage your investments"
                        icon={<Banknote className="h-5 w-5" />}
                        searchQuery={table.getState().globalFilter ?? ""}
                        onSearchChange={(value) => table.setGlobalFilter(value)}
                        statusFilter={statusFilter}
                        onStatusChange={(value) => {
                          setStatusFilter(value);

                          if (value === "all") {
                            table
                              .getColumn("status")
                              ?.setFilterValue(undefined);
                          } else {
                            table.getColumn("status")?.setFilterValue(value);
                          }
                        }}
                        // statusOptions={[
                        //   { label: "All Status", value: "all" },
                        //   { label: "Pending", value: "SUBMITTED" },
                        //   { label: "Approved", value: "ACCEPTED" },
                        //   { label: "Rejected", value: "DECLINED" },
                        //   { label: "Expired", value: "EXPIRED" },
                        // ]}
                        showFilterButton={false}
                        showExportButton
                        // buttonText="Add Quote"
                        url="/admin-dashboard/quotes/new"
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Website Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-secondary/20 rounded-lg">
                          <p className="text-2xl font-bold">12,450</p>
                          <p className="text-sm text-muted-foreground">
                            Page Views
                          </p>
                        </div>
                        <div className="text-center p-4 bg-secondary/20 rounded-lg">
                          <p className="text-2xl font-bold">3,280</p>
                          <p className="text-sm text-muted-foreground">
                            Unique Visitors
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Bounce Rate</span>
                          <span>32%</span>
                        </div>
                        <Progress value={32} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Avg. Session Duration</span>
                          <span>4:32</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      API Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-secondary/20 rounded-lg">
                          <p className="text-2xl font-bold">
                            {(stats.apiCalls / 1000000).toFixed(1)}M
                          </p>
                          <p className="text-sm text-muted-foreground">
                            API Calls
                          </p>
                        </div>
                        <div className="text-center p-4 bg-secondary/20 rounded-lg">
                          <p className="text-2xl font-bold">145ms</p>
                          <p className="text-sm text-muted-foreground">
                            Avg Response
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uptime</span>
                          <span>{stats.systemUptime}%</span>
                        </div>
                        <Progress value={stats.systemUptime} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Revenue Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          ${(stats.totalRevenue / 1000).toFixed(0)}K
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This Month
                        </p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          +{stats.monthlyGrowth}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Growth Rate
                        </p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">18</p>
                        <p className="text-sm text-muted-foreground">
                          Active Clients
                        </p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">
                          $35K
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Avg Deal Size
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="w-5 h-5" />
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          service: "Web Server",
                          status: "Healthy",
                          uptime: "99.9%",
                          color: "bg-green-500",
                        },
                        {
                          service: "Database",
                          status: "Healthy",
                          uptime: "99.8%",
                          color: "bg-green-500",
                        },
                        {
                          service: "API Gateway",
                          status: "Healthy",
                          uptime: "99.7%",
                          color: "bg-green-500",
                        },
                        {
                          service: "File Storage",
                          status: "Warning",
                          uptime: "98.5%",
                          color: "bg-yellow-500",
                        },
                      ].map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${service.color}`}
                            />
                            <div>
                              <p className="font-medium">{service.service}</p>
                              <p className="text-sm text-muted-foreground">
                                {service.status}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{service.uptime}</p>
                            <p className="text-xs text-muted-foreground">
                              Uptime
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="font-medium">Security Alerts</p>
                            <p className="text-sm text-muted-foreground">
                              {stats.securityAlerts} active alerts
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Failed Login Attempts</span>
                          <span className="font-medium">23</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Blocked IPs</span>
                          <span className="font-medium">5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">SSL Certificate</span>
                          <Badge variant="outline" className="text-green-600">
                            Valid
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Platform Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Platform Name</Label>
                          <Input defaultValue="Techbravery Platform" />
                        </div>
                        <div>
                          <Label>Support Email</Label>
                          <Input defaultValue="support@techbravery.com" />
                        </div>
                        <div>
                          <Label>Default Currency</Label>
                          <Select defaultValue="usd">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD ($)</SelectItem>
                              <SelectItem value="eur">EUR (€)</SelectItem>
                              <SelectItem value="gbp">GBP (£)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Time Zone</Label>
                          <Select defaultValue="wat">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wat">
                                West Africa Time (WAT)
                              </SelectItem>
                              <SelectItem value="utc">UTC</SelectItem>
                              <SelectItem value="est">
                                Eastern Time (EST)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Maintenance Mode</Label>
                          <Select defaultValue="off">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="off">Off</SelectItem>
                              <SelectItem value="on">On</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">
                          <Settings className="w-4 h-4 mr-2" />
                          Update Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Admin;
