import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban,
  CheckSquare,
  Clock,
  Bug,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Award,
  PlayCircle,
  Bell,
  Settings,
  GitCommit,
  Target,
  Briefcase,
} from "lucide-react";
import { makeRequest } from "@/utils/makeRequest";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/hooks";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchProfile = async () => {
    try {
      const res = await makeRequest.get("/user/me");
      return res.data;
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  // Mock data
  const stats = {
    activeProjects: 3,
    tasksInProgress: 8,
    upcomingDeadlines: 2,
    bugsAssigned: 5,
    hoursLogged: 156,
    completionRate: 78,
  };

  const recentActivities = [
    {
      id: 1,
      type: "commit",
      message: "Pushed 3 commits to feature/auth-module",
      time: "10 min ago",
      project: "ExAfrik Platform",
    },
    {
      id: 2,
      type: "task",
      message: "Completed: Implement login validation",
      time: "1 hour ago",
      project: "Client Portal",
    },
    {
      id: 3,
      type: "bug",
      message: "Resolved: Payment gateway timeout issue",
      time: "2 hours ago",
      project: "ExAfrik Platform",
    },
    {
      id: 4,
      type: "comment",
      message: "Sarah commented on your pull request",
      time: "3 hours ago",
      project: "AgriTech SaaS",
    },
  ];

  const activeProjects = [
    {
      id: 1,
      name: "ExAfrik P2P Exchange",
      client: "ExAfrik Group",
      progress: 85,
      tasksCompleted: 24,
      totalTasks: 28,
      deadline: "2025-11-15",
      status: "On Track",
      role: "Lead Developer",
    },
    {
      id: 2,
      name: "AgriTech Supply Chain",
      client: "AgroConnect Ltd",
      progress: 62,
      tasksCompleted: 18,
      totalTasks: 29,
      deadline: "2025-11-30",
      status: "In Progress",
      role: "Full Stack Developer",
    },
    {
      id: 3,
      name: "Client Management Portal",
      client: "Internal",
      progress: 45,
      tasksCompleted: 9,
      totalTasks: 20,
      deadline: "2025-12-10",
      status: "Starting",
      role: "Backend Developer",
    },
  ];

  const todayTasks = [
    {
      id: 1,
      title: "Implement JWT authentication",
      priority: "High",
      status: "In Progress",
      project: "ExAfrik P2P",
      time: "2h",
    },
    {
      id: 2,
      title: "Fix responsive layout issues",
      priority: "Medium",
      status: "To Do",
      project: "AgriTech",
      time: "1.5h",
    },
    {
      id: 3,
      title: "Review Sarah's pull request",
      priority: "High",
      status: "To Do",
      project: "ExAfrik P2P",
      time: "30min",
    },
    {
      id: 4,
      title: "Update API documentation",
      priority: "Low",
      status: "To Do",
      project: "Client Portal",
      time: "1h",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "commit":
        return <GitCommit className="h-4 w-4 text-primary" />;
      case "task":
        return <CheckSquare className="h-4 w-4 text-green-600" />;
      case "bug":
        return <Bug className="h-4 w-4 text-orange-600" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4" />;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "default";
      case "In Progress":
        return "secondary";
      case "Starting":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Welcome back, {user?.name || "Employee"}!
            </h1>
            <p className="text-muted-foreground mt-2">
              {user?.position || "Software Developer"} • Here's your workspace
              overview
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/staff-dashboard/settings")}
            >
              <Settings className="h-5 w-5" />
            </Button>
            {/* <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button> */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <FolderKanban className="h-8 w-8 text-primary" />
                <Badge variant="secondary">{stats.activeProjects}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Active Projects</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CheckSquare className="h-8 w-8 text-green-600" />
                <Badge variant="secondary">{stats.tasksInProgress}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tasks in Progress</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Calendar className="h-8 w-8 text-orange-600" />
                <Badge variant="destructive">{stats.upcomingDeadlines}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Upcoming Deadlines
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Bug className="h-8 w-8 text-red-600" />
                <Badge variant="outline">{stats.bugsAssigned}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Bugs Assigned</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Clock className="h-8 w-8 text-blue-600" />
                <Badge variant="secondary">{stats.hoursLogged}h</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Hours Logged</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <Badge variant="default">{stats.completionRate}%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={() => navigate("/staff-dashboard/tasks")}
            className="h-20 flex flex-col gap-2"
          >
            <PlayCircle className="h-6 w-6" />
            Start Task
          </Button>
          <Button
            onClick={() => navigate("/staff-dashboard/reports")}
            variant="outline"
            className="h-20 flex flex-col gap-2"
          >
            <FileText className="h-6 w-6" />
            Submit Report
          </Button>
          <Button
            onClick={() => navigate("/staff-dashboard/team")}
            variant="outline"
            className="h-20 flex flex-col gap-2"
          >
            <Users className="h-6 w-6" />
            Message Team
          </Button>
          <Button
            onClick={() => navigate("/staff-dashboard/projects")}
            variant="outline"
            className="h-20 flex flex-col gap-2"
          >
            <Briefcase className="h-6 w-6" />
            View Projects
          </Button>
        </div>

        {/* Additional Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={() => navigate("/staff-dashboard/attendance")}
            variant="outline"
            className="h-20 flex flex-col gap-2"
          >
            <Calendar className="h-6 w-6" />
            Attendance
          </Button>
          <Button
            onClick={() => navigate("/staff-dashboard/files")}
            variant="outline"
            className="h-20 flex flex-col gap-2"
          >
            <FileText className="h-6 w-6" />
            File Manager
          </Button>
          <Button
            onClick={() => navigate("/staff-dashboard/learning")}
            variant="outline"
            className="h-20 flex flex-col gap-2"
          >
            <Award className="h-6 w-6" />
            Learning
          </Button>
          <Button
            onClick={() => navigate("/staff-dashboard/hr")}
            variant="outline"
            className="h-20 flex flex-col gap-2"
          >
            <Users className="h-6 w-6" />
            HR Portal
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="tasks">Today's Tasks</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Performance Overview
                  </CardTitle>
                  <CardDescription>
                    Your productivity metrics this month
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tasks Completed</span>
                      <span className="font-medium">24/28</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Code Reviews</span>
                      <span className="font-medium">12/15</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Bug Resolution</span>
                      <span className="font-medium">18/20</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>On-Time Delivery</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>Your milestones and badges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                    <Award className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="font-medium">Speed Demon</p>
                      <p className="text-sm text-muted-foreground">
                        Completed 20 tasks in a week
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                    <Award className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">Bug Crusher</p>
                      <p className="text-sm text-muted-foreground">
                        Resolved 50 bugs this month
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                    <Award className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium">Team Player</p>
                      <p className="text-sm text-muted-foreground">
                        Helped 10+ teammates
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent
            value="projects"
            className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-2"
          >
            {activeProjects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>
                        {project.client} • {project.role}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <Button size="sm" asChild>
                        <Link to="/staff-dashboard/projects">View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-medium">
                        {project.tasksCompleted}/{project.totalTasks} tasks
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Deadline: {project.deadline}
                    </div>
                    <span className="text-primary font-medium">
                      {project.progress}% Complete
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-4">
            {todayTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{task.title}</h3>
                        <Badge
                          variant={getPriorityColor(task.priority)}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {task.project} • Est. {task.time}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{task.status}</Badge>
                      <Button size="sm">Start</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            {recentActivities.map((activity) => (
              <Card
                key={activity.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.project} • {activity.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
