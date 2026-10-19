import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Search,
  Filter,
  GitBranch,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Trash2,
  Eye,
  Download,
  Plus,
  EllipsisVertical,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { makeRequest } from "@/utils/makeRequest";
import { useQuery } from "@tanstack/react-query";
import {
  ProjectStatus,
  ProjectWithQuoteAndUser,
  TEAM_ROLE_LABEL_MAP,
  TeamRole,
} from "@/types/project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader";

const projectStatuses: { key: ProjectStatus; value: string }[] = [
  { key: ProjectStatus.PENDING, value: "Pending" },
  { key: ProjectStatus.IN_PROGRESS, value: "In Progress" },
  { key: ProjectStatus.ON_HOLD, value: "On Hold" },
  { key: ProjectStatus.COMPLETED, value: "Completed" },
  { key: ProjectStatus.CANCELLED, value: "Cancelled" },
];

const ProjectDetails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProject = async () => {
    const res = await makeRequest.get(`/project/${id}`);
    return res.data;
  };

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery<ProjectWithQuoteAndUser>({
    queryKey: ["single-project", id],
    queryFn: fetchProject,
    enabled: !!id,
  });

  console.log("SINGLE PROJECT", project);

  const filteredTeams = project?.teams?.filter((team) => {
    const matchesSearch =
      team.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.user.lastName.toLowerCase().includes(searchQuery.toLowerCase());
    // team.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || team.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTeamRoleLabel = (role: TeamRole | null | undefined): string => {
    if (!role) return "—";

    return TEAM_ROLE_LABEL_MAP[role] ?? role;
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "destructive";
      case "MEDIUM":
        return "default";
      case "LOW":
        return "secondary";
      default:
        return "default";
    }
  };

  const handleQuoteAction = (
    project: ProjectWithQuoteAndUser,
    action: "ACCEPT" | "REJECT",
  ) => {
    toast.success(
      `Quote No: ${project.id} has been successfully ${action.toLowerCase()}ed.`,
    );
  };

  const handleDeleteQuote = (project: ProjectWithQuoteAndUser) => {
    toast.success(`Quote No: ${project.id} has been permanently deleted.`);
  };

  if (isLoading) return <Loader type="bounce" />;
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8 flex justify-between gap-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {project?.quote?.projectName}
          </h1>
          <Select>
            <SelectTrigger className="w-auto p-0 border-0 bg-transparent shadow-none hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus:outline-none data-[state=open]:bg-transparent">
              <EllipsisVertical className="w-6 h-6 text-muted-foreground hover:text-foreground" />
            </SelectTrigger>

            <SelectContent align="end">
              {projectStatuses.map((status, index: number) => (
                <SelectItem key={index} value={status.key}>
                  {status.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6 grid grid-cols-1">
          <Card key={project?.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {project?.quote?.projectName}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {project?.user?.firstName +
                          " " +
                          project?.user?.lastName}{" "}
                        • {project?.user?.company?.companyName}
                      </CardDescription>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {project?.quote?.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(project?.status)}>
                    {project?.status}
                  </Badge>
                  <Badge variant={getPriorityColor(project?.quote?.complexity)}>
                    {project?.quote?.complexity}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Overall Progress</span>
                  {/* <span className="text-muted-foreground">
                    {project.tasksCompleted}/{project.totalTasks} tasks
                  </span> */}
                </div>
                <Progress value={project?.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {project?.progress}% complete
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="text-sm font-medium">
                      {new Date(project?.projectDueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Team</p>
                    <p className="text-sm font-medium">
                      {project?.teams.length} members
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Commits</p>
                    {/* <p className="text-sm font-medium">{project.commits}</p> */}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Tasks Done</p>
                    <p className="text-sm font-medium">
                      {/* {project.tasksCompleted} */}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <p className="text-sm font-medium mb-2">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project?.quote?.techStacks.map((tech) => (
                    <Badge key={tech.id} variant="outline">
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <p className="text-sm font-medium mb-3">Milestones</p>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.milestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-accent/50"
                    >
                      {milestone.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${milestone.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {milestone.name}
                      </span>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Team Members */}
              <div>
                <p className="text-sm font-medium mb-2">Team Members</p>
                <div className="flex flex-wrap gap-2">
                  {/* {project.teams.map((member) => (
                    <Badge key={member} variant="secondary">
                      {member}
                    </Badge>
                  ))} */}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button asChild>
                  <Link to={`/employee-dashboard/tasks?project=${project?.id}`}>
                    View Tasks
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    to={`/employee-dashboard/workspace?project=${project?.id}`}
                  >
                    Open Workspace
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/employee-dashboard/files">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Link>
                </Button>
                <Button variant="outline">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Repository
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Team Members Management */}
          <Tabs defaultValue="quotes">
            <TabsContent value="quotes">
              <Card>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Team Members Management
                      </CardTitle>
                      <CardDescription>
                        Manage team members allocation
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
                        onClick={() =>
                          navigate(
                            `/admin-dashboard/projects/${project.id}/add-team`,
                          )
                        }
                        size="sm"
                        className="bg-gradient-to-r from-primary to-primary-glow"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
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
                          placeholder="Search team member..."
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
                          <SelectItem value="INVITED">Invited</SelectItem>
                          <SelectItem value="ACTIVE">Activce</SelectItem>
                          <SelectItem value="SUSPENDED">Suspended</SelectItem>
                          <SelectItem value="REMOVED">Removed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Team</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Date Joined</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTeams?.map((team) => (
                          <TableRow key={team.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {team.user.firstName +
                                    " " +
                                    team.user.lastName}
                                </p>
                              </div>
                            </TableCell>

                            <TableCell>
                              <Badge className={getStatusColor(team.status)}>
                                <span>{team.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>{getTeamRoleLabel(team.role)}</TableCell>

                            <TableCell>
                              {new Date(team.joinedAt).toDateString()!}
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
                                    to={`/admin-dashboard/projects/${project.id}`}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Link>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 hover:bg-green-50"
                                  onClick={() =>
                                    handleQuoteAction(project, "ACCEPT")
                                  }
                                  title="Approve Quote"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() => handleDeleteQuote(project)}
                                  title="Delete Quote"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
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
          </Tabs>
        </div>

        {!project && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">
                No projects found matching your search.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ProjectDetails;
