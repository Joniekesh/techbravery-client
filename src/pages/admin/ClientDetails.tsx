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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Plus,
  Send,
  Video,
  Phone,
  Mail,
  Settings,
  Bell,
  Eye,
  Edit3,
  ExternalLink,
  Github,
  Globe,
  Smartphone,
  Code,
  Database,
  Search,
  Filter,
  CheckCircle,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { makeRequest } from "@/utils/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/hooks";
import { ProjectStatus } from "@/types/project";
import Loader from "@/components/loader/Loader";
import { IQuote, QuoteBudgetRange, QuoteStatus } from "@/types/quote";
import { IUserProfile, UserRole } from "@/types/profile";
import { can } from "@/utils/permissions";
import { AdminActionBar } from "@/components/admin/AdminActionBar";
import { AdminMetaCard } from "@/components/admin/AdminMetaCard";
import { ProjectAdminMenu } from "@/components/admin/ProjectAdminMenu";
import { TextTabs } from "@/components/shared/TextTabs";

const tabs = [
  { value: "quotes", label: "Quotes" },
  { value: "projects", label: "Projects" },
  { value: "messages", label: "Messages" },
  { value: "invoices", label: "Invoices" },
  { value: "documents", label: "Documents" },
  { value: "support", label: "Support" },
];

const ClientDetails = () => {
  const { id } = useParams();

  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [messageText, setMessageText] = useState("");

  const [activeTab, setActiveTab] = useState("quotes");

  const auth = useAppSelector((state) => state.auth);

  const permission = can(auth?.user?.role as UserRole);

  const navigate = useNavigate();

  const fetchClient = async () => {
    const res = await makeRequest.get(`/client/${id}`);
    return res.data;
  };

  const { data: client, isLoading } = useQuery<IUserProfile>({
    queryKey: ["client", id],
    queryFn: fetchClient,
    enabled: !!id,
  });

  console.log("SINGLE CLIENT", client);

  const handleQuoteAction = (quote: IQuote, action: "ACCEPT" | "REJECT") => {
    toast.success(
      `Quote No: ${quote.quoteCode} has been successfully ${action.toLowerCase()}ed.`,
    );
  };

  const handleDeleteQuote = (quote: IQuote) => {
    toast.success(`Quote No: ${quote.quoteCode} has been permanently deleted.`);
  };

  useEffect(() => {
    if (!client?.projects?.length || activeProject) return;

    const active =
      client.projects.find((p) => p.status === ProjectStatus.IN_PROGRESS) ??
      client.projects[0];

    setActiveProject(active.id);
  }, [client, activeProject]);

  const filteredQuotes = client?.quotes?.filter((quote) => {
    const matchesSearch =
      quote?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote?.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const projects = [
    {
      id: "web-app",
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      type: "Web Application",
      status: "in-progress",
      progress: 75,
      startDate: "2024-01-15",
      expectedDelivery: "2024-03-15",
      budget: 45000,
      spent: 33750,
      teamLead: "Sarah Johnson",
      teamSize: 5,
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      lastUpdate: "2024-02-01",
      milestones: [
        { name: "UI/UX Design", status: "completed", date: "2024-01-22" },
        {
          name: "Frontend Development",
          status: "in-progress",
          date: "2024-02-15",
        },
        { name: "Backend API", status: "in-progress", date: "2024-02-20" },
        { name: "Payment Integration", status: "pending", date: "2024-02-28" },
        { name: "Testing & QA", status: "pending", date: "2024-03-10" },
        { name: "Deployment", status: "pending", date: "2024-03-15" },
      ],
      liveUrl: "",
      testUrl: "https://test.ecommerce-app.com",
      repoUrl: "",
    },
    {
      id: "mobile-app",
      name: "Fitness Tracker Mobile App",
      description:
        "Cross-platform mobile app for fitness tracking and social features",
      type: "Mobile Application",
      status: "completed",
      progress: 100,
      startDate: "2023-10-01",
      expectedDelivery: "2023-12-15",
      budget: 35000,
      spent: 35000,
      teamLead: "Michael Chen",
      teamSize: 4,
      technologies: ["Flutter", "Firebase", "Google Maps API", "HealthKit"],
      lastUpdate: "2023-12-15",
      milestones: [
        { name: "App Design", status: "completed", date: "2023-10-15" },
        { name: "Core Features", status: "completed", date: "2023-11-10" },
        { name: "Social Features", status: "completed", date: "2023-11-25" },
        { name: "Testing", status: "completed", date: "2023-12-05" },
        { name: "App Store Release", status: "completed", date: "2023-12-15" },
      ],
      liveUrl: "https://apps.apple.com/app/fitness-tracker",
      testUrl: "",
      repoUrl: "",
    },
    {
      id: "ai-platform",
      name: "AI Analytics Dashboard",
      description:
        "Machine learning powered analytics platform for business intelligence",
      type: "AI/ML Platform",
      status: "planning",
      progress: 15,
      startDate: "2024-02-01",
      expectedDelivery: "2024-06-30",
      budget: 75000,
      spent: 11250,
      teamLead: "Dr. Amara Okafor",
      teamSize: 6,
      technologies: ["Python", "TensorFlow", "React", "Docker", "AWS"],
      lastUpdate: "2024-02-01",
      milestones: [
        {
          name: "Requirements Analysis",
          status: "completed",
          date: "2024-02-05",
        },
        {
          name: "System Architecture",
          status: "in-progress",
          date: "2024-02-20",
        },
        { name: "ML Model Development", status: "pending", date: "2024-03-15" },
        {
          name: "Dashboard Development",
          status: "pending",
          date: "2024-04-30",
        },
        {
          name: "Integration & Testing",
          status: "pending",
          date: "2024-06-15",
        },
        {
          name: "Production Deployment",
          status: "pending",
          date: "2024-06-30",
        },
      ],
      liveUrl: "",
      testUrl: "",
      repoUrl: "",
    },
  ];

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
      id: "INV-2024-001",
      project: "E-commerce Platform",
      amount: 15000,
      status: "paid",
      date: "2024-01-31",
      dueDate: "2024-02-15",
    },
    {
      id: "INV-2024-002",
      project: "E-commerce Platform",
      amount: 18750,
      status: "pending",
      date: "2024-02-01",
      dueDate: "2024-02-16",
    },
    {
      id: "INV-2023-015",
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
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "pending":
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

  const activeProjects = client?.projects?.filter(
    (project) => project.status === ProjectStatus.IN_PROGRESS,
  ).length;

  const currentProject = client?.projects?.find((p) => p.id === activeProject);

  const sendMessage = () => {
    if (!messageText.trim()) return;
    toast.success("Your message has been sent to the project team.");
    setMessageText("");
  };

  if (isLoading) {
    return <Loader type="bounce" />;
  }

  // if (!myProjects.length) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <Card className="max-w-md w-full text-center">
  //         <CardHeader>
  //           <CardTitle>No quotes yet</CardTitle>
  //           <CardDescription>
  //             You haven’t created any quote yet.
  //           </CardDescription>
  //         </CardHeader>
  //         <CardContent>
  //           <Button asChild>
  //             <Link to="/quote">Create your first quote</Link>
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(`/admin-dashboard`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between ring-1 ring-border rounded-md p-2">
              <div className="flex gap-2 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={clientInfo.avatar}
                    alt={client?.firstName}
                  />
                  <AvatarFallback>
                    {(client?.firstName + " " + client?.lastName)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                      {client?.firstName + " " + client?.lastName}
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {client?.company?.companyName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Member since {new Date(client?.createdAt).toDateString()}
                  </p>
                </div>
              </div>
              <hr className="lg:hidden" />
              {permission.admin && <AdminMetaCard client={client} />}
            </div>
            <div className="flex gap-3">
              {permission.admin && (
                <AdminActionBar
                  onSuspend={() => toast.success("Suspended")}
                  onImpersonate={() => toast.success("Impersonated")}
                />
              )}
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
                      {client?.projects?.length}
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
                  <Clock className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Completed Projects
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
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Quote Requests Management
                      </CardTitle>
                      <CardDescription>
                        Review and manage incoming quote requests
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button
                        onClick={() => navigate("/admin-dashboard/quote/new")}
                        size="sm"
                        className="bg-gradient-to-r from-primary to-primary-glow"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Quote
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search quotes..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="SUBMITTED">Pending</SelectItem>
                          <SelectItem value="ACCEPTED">Approved</SelectItem>
                          <SelectItem value="DECLINED">Rejected</SelectItem>
                          <SelectItem value="EXPIRED">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client</TableHead>
                          <TableHead>Project Type</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Estimate</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredQuotes?.map((quote) => (
                          <TableRow key={quote.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{quote.fullName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {quote.company}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{quote.projectType.label}</TableCell>
                            <TableCell>{quote?.budgetRange?.label}</TableCell>
                            <TableCell className="font-medium">
                              {quote?.budgetRange?.label}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(quote.status)}>
                                <span>{quote.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(quote.createdAt).toDateString()!}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  asChild
                                  title="View Details"
                                >
                                  <Link
                                    to={`/client-dashboard/quote/${quote.id}`}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Link>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 hover:bg-green-50"
                                  onClick={() =>
                                    handleQuoteAction(quote, "ACCEPT")
                                  }
                                  title="Approve Quote"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                {quote.status === QuoteStatus.SUBMITTED && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:bg-red-50"
                                    onClick={() => handleDeleteQuote(quote)}
                                    title="Delete Quote"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              {client?.projects.length === 0 ? (
                <div className="flex flex-col gap-2 w-full items-center justify-center h-[20vh]">
                  <span>No projects yet</span>
                  <span>Your projects will appear here.</span>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Project List */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Your Projects</h3>
                    {client?.projects?.map((project) => (
                      <Card
                        key={project.id}
                        className={`cursor-pointer transition-all ${activeProject === project.id ? "ring-2 ring-primary" : "hover:shadow-md"}`}
                        onClick={() => setActiveProject(project.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">
                              {project?.quote?.projectName}
                            </h4>
                            <Badge className={getStatusColor(project?.status)}>
                              {project?.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project?.quote?.projectType.label}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress
                              value={project?.progress}
                              className="h-2"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Due:{" "}
                            {new Date(
                              project?.projectDueDate,
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
                          <div className="flex items-center gap-1">
                            <Badge
                              className={getStatusColor(currentProject?.status)}
                            >
                              {currentProject?.status.replace("-", " ")}
                            </Badge>
                            {permission.admin && <ProjectAdminMenu />}
                          </div>
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
                          <div>
                            <h4 className="font-medium mb-3">Team Lead</h4>
                            <div className="flex items-center gap-3">
                              {/* <Avatar>
                              <AvatarFallback>
                                {currentProject.teamLead
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar> */}
                              <div>
                                {/* <p className="font-medium">
                                {currentProject.teamLead}
                              </p> */}
                                <p className="text-sm text-muted-foreground">
                                  Project Manager
                                </p>
                              </div>
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
                      <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <CardTitle>Project Milestones</CardTitle>
                        <CardTitle>Payment Conditional</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* <div className="space-y-4">
                        {currentProject?.milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-3 rounded-lg bg-secondary/20"
                          >
                            {getMilestoneIcon(milestone.status)}
                            <div className="flex-1">
                              <p className="font-medium">{milestone.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Target:{" "}
                                {new Date(milestone.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className={getStatusColor(milestone.status)}>
                              {milestone.status.replace("-", " ")}
                            </Badge>
                          </div>
                        ))}
                      </div> */}
                      </CardContent>
                    </Card>
                    {/* {permission.admin && <ExpandableRaw data={project} />} */}
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Invoices & Payments
                  </CardTitle>
                  <CardDescription>
                    Manage your project invoices and payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">
                            {invoice.id}
                          </TableCell>
                          <TableCell>{invoice.project}</TableCell>
                          <TableCell>
                            ${invoice.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(invoice.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                              {/* {invoice.status === "pending" && (
                                <Button size="sm" asChild>
                                  <Link
                                    to={`/client-dashboard/invoices/${invoice.id}/pay`}
                                  >
                                    Pay Now
                                  </Link>
                                </Button>
                              )} */}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Project Documents
                  </CardTitle>
                  <CardDescription>
                    Access project specifications, designs, and deliverables
                  </CardDescription>
                </CardHeader>
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
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>File</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Uploaded</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documents.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span className="truncate max-w-[240px] sm:max-w-[360px]">
                                  {doc.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {doc.category}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {doc.type || "Document"}
                            </TableCell>
                            <TableCell>{formatSize(doc.size)}</TableCell>
                            <TableCell>
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {doc.url ? (
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={doc.url} download={doc.name}>
                                      <Download className="w-4 h-4" />
                                    </a>
                                  </Button>
                                ) : (
                                  <Button size="sm" variant="outline" disabled>
                                    <Download className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
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

export default ClientDetails;
