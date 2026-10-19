import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const projects = [
    {
      id: 1,
      name: "ExAfrik P2P Exchange",
      client: "ExAfrik Group",
      description:
        "Building a peer-to-peer cryptocurrency exchange platform with advanced security features",
      progress: 85,
      status: "On Track",
      priority: "High",
      role: "Lead Developer",
      startDate: "2025-09-01",
      deadline: "2025-11-15",
      team: ["Sarah Chen", "Mike Johnson", "Alex Kumar"],
      tasksCompleted: 24,
      totalTasks: 28,
      commits: 147,
      branches: 8,
      technologies: ["React", "Node.js", "MongoDB", "Web3"],
      milestones: [
        { name: "Authentication System", completed: true },
        { name: "Trading Engine", completed: true },
        { name: "Wallet Integration", completed: false },
        { name: "Testing & Deployment", completed: false },
      ],
    },
    {
      id: 2,
      name: "AgriTech Supply Chain",
      client: "AgroConnect Ltd",
      description:
        "Developing a blockchain-based supply chain tracking system for agricultural products",
      progress: 62,
      status: "In Progress",
      priority: "Medium",
      role: "Full Stack Developer",
      startDate: "2025-10-01",
      deadline: "2025-11-30",
      team: ["David Lee", "Emma Wilson"],
      tasksCompleted: 18,
      totalTasks: 29,
      commits: 89,
      branches: 5,
      technologies: ["Vue.js", "Express", "PostgreSQL", "Blockchain"],
      milestones: [
        { name: "Database Design", completed: true },
        { name: "API Development", completed: true },
        { name: "Frontend Interface", completed: false },
        { name: "Blockchain Integration", completed: false },
      ],
    },
    {
      id: 3,
      name: "Client Management Portal",
      client: "Internal",
      description:
        "Internal tool for managing client projects, invoices, and communications",
      progress: 45,
      status: "Starting",
      priority: "Low",
      role: "Backend Developer",
      startDate: "2025-10-15",
      deadline: "2025-12-10",
      team: ["Lisa Brown"],
      tasksCompleted: 9,
      totalTasks: 20,
      commits: 34,
      branches: 3,
      technologies: ["Next.js", "NestJS", "MySQL", "Redis"],
      milestones: [
        { name: "Requirements Analysis", completed: true },
        { name: "Backend Setup", completed: false },
        { name: "Frontend Development", completed: false },
        { name: "Integration Testing", completed: false },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "default";
      case "In Progress":
        return "secondary";
      case "At Risk":
        return "destructive";
      case "Starting":
        return "outline";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
      default:
        return "default";
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            My Projects
          </h1>
          <p className="text-muted-foreground">
            Manage and track all your assigned projects
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-2">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div>
                        <CardTitle className="text-2xl mb-2">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {project.client} • {project.role}
                        </CardDescription>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <Badge variant={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-muted-foreground">
                      {project.tasksCompleted}/{project.totalTasks} tasks
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {project.progress}% complete
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="text-sm font-medium">
                        {new Date(project.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Team</p>
                      <p className="text-sm font-medium">
                        {project.team.length} members
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Commits</p>
                      <p className="text-sm font-medium">{project.commits}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Tasks Done
                      </p>
                      <p className="text-sm font-medium">
                        {project.tasksCompleted}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <p className="text-sm font-medium mb-2">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <p className="text-sm font-medium mb-3">Milestones</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <p className="text-sm font-medium mb-2">Team Members</p>
                  <div className="flex flex-wrap gap-2">
                    {project.team.map((member) => (
                      <Badge key={member} variant="secondary">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Button asChild>
                    <Link
                      to={`/employee-dashboard/tasks?project=${project.id}`}
                    >
                      View Tasks
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link
                      to={`/employee-dashboard/workspace?project=${project.id}`}
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
          ))}
        </div>

        {filteredProjects.length === 0 && (
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

export default Projects;
