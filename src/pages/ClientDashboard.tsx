import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  FolderOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  FileText,
  Download,
  Upload,
  DollarSign,
  Star,
  Plus,
  Send,
  Video,
  Phone,
  Mail,
  Settings,
  Eye,
  ExternalLink,
  Github,
  Globe,
  Smartphone,
  Code,
  Database,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import {
  MilestonePhaeFeatureStatus,
  MilestonePhaseStatus,
  ProjectStatus,
  TeamRole,
} from "@/types/project";
import Loader from "@/components/loader/Loader";
import { IQuote, QuoteBudgetRange, QuoteStatus } from "@/types/quote";
import { cn } from "@/lib/utils";
import { TextTabs } from "@/components/shared/TextTabs";
import { useMileStoneTemplates, useMyProjects, useProfile } from "@/services";
import { DataTable } from "@/components/table/DataTable";
import TableFilters from "@/components/table/TableFilters";
import { invoiceColumns } from "@/components/table/invoice";
import { clientQuoteColumns } from "@/components/table/quotes/columns";
import { documentColumns } from "@/components/table/document";

import Tesseract from "tesseract.js";

const tabs = [
  { value: "quotes", label: "Quotes" },
  { value: "projects", label: "Projects" },
  { value: "messages", label: "Messages" },
  { value: "invoices", label: "Invoices" },
  { value: "documents", label: "Documents" },
  { value: "support", label: "Support" },
];

const ClientDashboard = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("quotes");

  const auth = useAppSelector((state) => state.auth);
  const userInfo = auth?.user;
  const userId = userInfo?.id;

  const navigate = useNavigate();

  const { data: profile, isLoading } = useProfile(userId);

  const {
    data: templates = [],
    isLoading: isLoadingTemplates,
    isError: isErrorTemplates,
  } = useMileStoneTemplates();

  console.log("TEMPLATES", templates);
  console.log("PROFILE", profile);

  const { data: myProjects, isLoading: isLoadingMyProjects } =
    useMyProjects(userId);

  useEffect(() => {
    if (myProjects?.length > 0 && !activeProject) {
      setActiveProject(myProjects[0]?.id);
    }
  }, [myProjects, activeProject]);

  const handleQuoteAction = (quote: IQuote, action: "ACCEPT" | "REJECT") => {
    toast.success(
      `Quote No: ${quote.quoteCode} has been successfully ${action.toLowerCase()}ed.`,
    );
  };

  const handleDeleteQuote = (quote: IQuote) => {
    toast.success(`Quote No: ${quote.quoteCode} has been permanently deleted.`);
  };

  // Mock client data
  const clientInfo = {
    name: "John Smith",
    company: "TechCorp Solutions",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    memberSince: "2023-06-15",
    totalProjects: 5,
    activeProjects: 2,
    totalSpent: 125000,
    satisfaction: 4.8,
  };

  const messages = [
    {
      id: 1,
      from: "Sarah Johnson",
      role: "Project Lead",
      message:
        "Hi John! The e-commerce platform frontend is progressing well. We've completed the product catalog and shopping cart functionality. Next week we'll start on the checkout process.",
      timestamp: "2024-02-01 10:30 AM",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&q=80",
    },
    {
      id: 2,
      from: "John Smith",
      role: "Client",
      message:
        "Great progress! I noticed the product filtering could use some refinement. Can we schedule a call to discuss this?",
      timestamp: "2024-02-01 2:15 PM",
      avatar: clientInfo.avatar,
    },
    {
      id: 3,
      from: "Michael Chen",
      role: "Technical Lead",
      message:
        "The payment gateway integration is ready for testing. I'll send you the staging credentials shortly.",
      timestamp: "2024-02-02 9:00 AM",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
  ];

  const invoices = [
    {
      id: 1,
      invoiceId: "INV-2024-001",
      project: "E-commerce Platform",
      amount: 15000,
      status: "paid",
      date: "2024-01-31",
      dueDate: "2024-02-15",
    },
    {
      id: 2,
      invoiceId: "INV-2024-002",
      project: "E-commerce Platform",
      amount: 18750,
      status: "pending",
      date: "2024-02-01",
      dueDate: "2024-02-16",
    },
    {
      id: 3,
      invoiceId: "INV-2023-015",
      project: "Fitness Tracker Mobile App",
      amount: 35000,
      status: "paid",
      date: "2023-12-15",
      dueDate: "2023-12-30",
    },
  ];

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

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case MilestonePhaeFeatureStatus.COMPLETED:
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case MilestonePhaeFeatureStatus.IN_PROGRESS:
        return <Clock className="w-4 h-4 text-blue-500" />;
      case MilestonePhaeFeatureStatus.PENDING:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTechIcon = (tech: string) => {
    switch (tech.toLowerCase()) {
      case "react":
      case "flutter":
      case "node.js":
        return <Code className="w-4 h-4" />;
      case "postgresql":
      case "firebase":
        return <Database className="w-4 h-4" />;
      case "mobile":
      case "ios":
      case "android":
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  // Documents state and handlers
  const [documents, setDocuments] = useState<
    Array<{
      id: string;
      name: string;
      type: string;
      size: number;
      uploadedAt: string;
      url?: string;
      category: "Specification" | "Design" | "Deliverable";
    }>
  >([
    {
      id: "doc-1",
      name: "E-commerce Platform - Functional Spec.pdf",
      type: "application/pdf",
      size: 245760,
      uploadedAt: "2024-01-20",
      category: "Specification",
    },
    {
      id: "doc-2",
      name: "E-commerce Platform - UI Design.fig",
      type: "application/octet-stream",
      size: 5242880,
      uploadedAt: "2024-01-25",
      category: "Design",
    },
    {
      id: "doc-3",
      name: "Sprint 1 Deliverables.zip",
      type: "application/zip",
      size: 10485760,
      uploadedAt: "2024-02-01",
      category: "Deliverable",
    },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newDocs = Array.from(files).map((file) => ({
      id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      type: file.type || "document",
      size: file.size,
      uploadedAt: new Date().toISOString(),
      url: URL.createObjectURL(file),
      category: "Deliverable" as const,
    }));
    setDocuments((prev) => [...newDocs, ...prev]);
    e.target.value = "";
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

  const currentProject = myProjects?.find((p) => p.id === activeProject);
  const projectTeamLead = currentProject?.teams?.find(
    (team) => team.role === TeamRole.TECH_LEAD,
  );

  console.log("CURRENT PROJECT", currentProject);
  const projectManager = currentProject?.teams?.find(
    (team) => team.role === TeamRole.PROJECT_MANAGER,
  );

  const activeProjects = myProjects?.filter(
    (project) => project.status === ProjectStatus.IN_PROGRESS,
  )?.length;

  const sendMessage = () => {
    if (!messageText.trim()) return;
    toast.success("Your message has been sent to the project team.");
    setMessageText("");
  };

  if (isLoading || isLoadingMyProjects) {
    return <Loader type="bounce" />;
  }

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* <span>Hello</span> */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={clientInfo.avatar} alt={clientInfo.name} />
                <AvatarFallback>
                  {clientInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    {profile?.firstName}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  {profile?.company?.companyName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Member since{" "}
                  {new Date(profile?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/client-dashboard/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-gradient-to-r from-primary to-primary-glow"
              >
                <Link to="/client-dashboard/new-project">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Overview Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Projects
                    </p>
                    <p className="text-2xl font-bold">
                      {profile?.projects?.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Projects
                    </p>
                    <p className="text-2xl font-bold">{activeProjects}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Investment
                    </p>
                    <p className="text-2xl font-bold">
                      ${(clientInfo.totalSpent / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Satisfaction
                    </p>
                    <p className="text-2xl font-bold">
                      {clientInfo.satisfaction}/5
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TextTabs tabs={tabs} />

            {/* Quote Requests */}
            <TabsContent value="quotes">
              <Card>
                <CardHeader></CardHeader>
                <CardContent>
                  <DataTable
                    columns={clientQuoteColumns}
                    data={profile?.quotes}
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
                        title="Your Quotes"
                        subTitle="Review and manage your quotes"
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
                        showExportButton={false}
                        buttonText="Add Quote"
                        url="/admin-dashboard/quotes/new"
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              {myProjects.length === 0 ? (
                <div className="flex flex-col gap-2 w-full items-center justify-center h-[20vh]">
                  <span>No projects yet</span>
                  <span>Your projects will appear here.</span>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Project List */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Your Projects</h3>
                    {myProjects?.map((project) => (
                      <Card
                        key={project.id}
                        className={`cursor-pointer transition-all ${activeProject === project.id ? "ring-2 ring-primary" : "hover:shadow-md"}`}
                        onClick={() => setActiveProject(project.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">
                              {project.quote.projectName}
                            </h4>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project.quote.projectType.label}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress
                              value={project.progress}
                              className="h-2"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Due:{" "}
                            {new Date(
                              project.projectDueDate,
                            ).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Project Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">
                              {currentProject?.quote.projectName}
                            </CardTitle>
                            <CardDescription>
                              {currentProject?.quote.description}
                            </CardDescription>
                          </div>
                          <Badge
                            className={getStatusColor(currentProject?.status)}
                          >
                            {currentProject?.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Project Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Progress
                            </p>
                            <p className="text-lg font-semibold">
                              {currentProject?.progress}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Budget
                            </p>
                            <p className="text-lg font-semibold">
                              $
                              {getBudgetRange(
                                currentProject?.quote.budgetRange,
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Spent
                            </p>
                            <p className="text-lg font-semibold">
                              ${(currentProject?.amountSpent / 1000).toFixed(0)}
                              k
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Team Size
                            </p>
                            <p className="text-lg font-semibold">
                              {currentProject?.teamSize || 0}
                            </p>
                          </div>
                        </div>

                        {/* Project Team & Tech */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                              <h4 className="text-sm text-muted-foreground">
                                Team Lead
                              </h4>
                              <span>
                                {projectTeamLead?.user.firstName +
                                  " " +
                                  projectTeamLead?.user.lastName}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <h4 className="text-sm text-muted-foreground">
                                Project Manager
                              </h4>
                              <span className="">
                                {projectManager?.user.firstName +
                                  " " +
                                  projectManager?.user.lastName}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentProject?.quote.techStacks.map(
                                (tech, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="flex items-center gap-1"
                                  >
                                    {getTechIcon(tech.name)}
                                    {tech.name}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Project Links */}
                        <div className="flex gap-3 flex-wrap">
                          {currentProject?.hostedUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={currentProject?.hostedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Globe className="w-4 h-4 mr-2" />
                                Live Site
                              </a>
                            </Button>
                          )}
                          {currentProject?.testUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={currentProject?.testUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </a>
                            </Button>
                          )}
                          {currentProject?.repoUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={currentProject?.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="w-4 h-4 mr-2" />
                                Repository
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Milestones */}
                    <Card>
                      <CardContent className="space-y-6">
                        <div className="text-sm text-muted-foreground bg-secondary/30 mt-3 p-3 rounded-md">
                          The project is structured into three commercial
                          phases. Work will commence upon confirmation of the
                          Initial (40%) milestone payment.
                        </div>

                        {/* ================= PHASE 1 ================= */}
                        {currentProject?.milestones[0]?.phases.map((phase) => (
                          <div
                            key={phase.id}
                            className={cn(
                              "relative border rounded-xl p-5 bg-card",
                              phase.status === MilestonePhaseStatus.FIRST &&
                                "border-blue-200 dark:border-blue-900",
                              phase.status === MilestonePhaseStatus.SECOND &&
                                "border-yellow-200 dark:border-yellow-900",
                              phase.status === MilestonePhaseStatus.THIRD &&
                                "border-green-200 dark:border-green-900",
                            )}
                          >
                            <div
                              className={cn(
                                "absolute left-0 top-0 h-full w-1 rounded-l-xl ",

                                phase.status === MilestonePhaseStatus.FIRST &&
                                  "bg-blue-500 dark:bg-blue-400",
                                phase.status === MilestonePhaseStatus.SECOND &&
                                  "bg-yellow-500 dark:bg-yellow-400",
                                phase.status === MilestonePhaseStatus.THIRD &&
                                  "bg-green-500 dark:bg-green-400",
                              )}
                            />

                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <p className="font-semibold text-foreground">
                                  {phase.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {phase.description} ({phase.percent}%)
                                </p>
                              </div>
                              {phase.status === MilestonePhaseStatus.FIRST && (
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                  Initial Payment Required
                                </Badge>
                              )}
                            </div>

                            <div className="space-y-2">
                              {phase.features.map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center bg-secondary/40 dark:bg-secondary/20 p-3 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    {getMilestoneIcon(feature.status)}
                                    <div className="flex flex-col text-[12px] text-gray-500 dark:text-foreground ">
                                      <span className="text-sm text-foreground">
                                        {feature.title}
                                      </span>
                                      <span>
                                        Target:{" "}
                                        {feature.startDate
                                          ? new Date(
                                              feature.startDate,
                                            ).toLocaleDateString()
                                          : "Not started"}
                                      </span>
                                    </div>
                                  </div>

                                  <Badge variant="outline" className="text-xs">
                                    Pending
                                  </Badge>
                                </div>
                              ))}
                            </div>

                            {currentProject?.quote?.status ===
                              QuoteStatus.ACCEPTED &&
                              phase.status === MilestonePhaseStatus.FIRST && (
                                <Button
                                  className="w-full mt-5 bg-gradient-to-r from-primary to-primary-glow"
                                  onClick={() =>
                                    navigate(
                                      `/client-dashboard/invoices/${phase.invoice.id}/pay`,
                                    )
                                  }
                                  // onClick={() => navigate(`/payment/${id}?phase=1`)}
                                >
                                  {phase.description} ({phase.percent}%)
                                </Button>
                              )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Project Communication
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className="flex gap-3 p-4 rounded-lg bg-secondary/10"
                          >
                            <Avatar>
                              <AvatarImage
                                src={message.avatar}
                                alt={message.from}
                              />
                              <AvatarFallback>
                                {message.from
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{message.from}</p>
                                <Badge variant="outline" className="text-xs">
                                  {message.role}
                                </Badge>
                              </div>
                              <p className="text-sm mb-2">{message.message}</p>
                              <p className="text-xs text-muted-foreground">
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Type your message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <div className="flex flex-col gap-2">
                            <Button onClick={sendMessage} size="sm">
                              <Send className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full" variant="outline">
                        <Video className="w-4 h-4 mr-2" />
                        Schedule Video Call
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Request Phone Call
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                      <Button className="w-full">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Priority Support
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices">
              <Card>
                <CardContent>
                  <DataTable
                    columns={invoiceColumns}
                    data={invoices}
                    isLoading={isLoading}
                    mobileColumns={[
                      "invoiceId",
                      "project",
                      "amount",
                      "status",
                      "date",
                      "dueDate",
                      "actions",
                    ]}
                    renderToolbar={(table) => (
                      <TableFilters
                        table={table}
                        title=" Invoices & Payments"
                        subTitle=" Manage your project invoices and payment history"
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
                        // statusOptions={[
                        //   { label: "All Status", value: "all" },
                        //   { label: "Pending", value: "SUBMITTED" },
                        //   { label: "Approved", value: "ACCEPTED" },
                        //   { label: "Rejected", value: "DECLINED" },
                        //   { label: "Expired", value: "EXPIRED" },
                        // ]}
                        showFilterButton={false}
                        showExportButton={false}
                        // buttonText="Add Quote"
                        // url="/admin-dashboard/quotes/new"
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                      Total: {documents.length} documents
                    </p>
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFilesSelected}
                      />
                      <Button onClick={handleUploadClick}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </div>
                  <DataTable
                    columns={documentColumns}
                    data={documents}
                    isLoading={isLoading}
                    mobileColumns={[
                      "name",
                      "type",
                      "size",
                      "uploadedAt",
                      "url",
                      "category",
                      "actions",
                    ]}
                    renderToolbar={(table) => (
                      <TableFilters
                        table={table}
                        title="Project Documents"
                        subTitle="Access project specifications, designs, and deliverables"
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
                        // statusOptions={[
                        //   { label: "All Status", value: "all" },
                        //   { label: "Pending", value: "SUBMITTED" },
                        //   { label: "Approved", value: "ACCEPTED" },
                        //   { label: "Rejected", value: "DECLINED" },
                        //   { label: "Expired", value: "EXPIRED" },
                        // ]}
                        showFilterButton={false}
                        showExportButton={false}
                        // buttonText="Add Quote"
                        // url="/admin-dashboard/quotes/new"
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Contact Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="support-subject">Subject</Label>
                      <Input
                        id="support-subject"
                        placeholder="Brief description of your issue"
                      />
                    </div>
                    <div>
                      <Label htmlFor="support-priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="support-message">Message</Label>
                      <Textarea
                        id="support-message"
                        placeholder="Describe your issue in detail..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Support Request
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Help & Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Project Documentation
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Knowledge Base
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Video Tutorials
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        FAQ
                      </Button>
                    </div>
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Direct Contact</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Email:</strong> support@techbravery.com
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Phone:</strong> +234 800 123 4567
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Hours:</strong> Mon-Fri 9AM-6PM WAT
                      </p>
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

export default ClientDashboard;
