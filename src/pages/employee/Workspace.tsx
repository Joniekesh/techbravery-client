import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  GitCommit,
  GitBranch,
  Bug,
  Clock,
  PlayCircle,
  StopCircle,
  CheckCircle,
  Code,
  FileCode,
  Terminal,
} from "lucide-react";

const Workspace = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [workLog, setWorkLog] = useState("");
  const [timeElapsed, setTimeElapsed] = useState("00:00:00");

  const todayTasks = [
    {
      id: 1,
      title: "Implement JWT authentication",
      completed: false,
      time: "2h",
    },
    { id: 2, title: "Fix responsive issues", completed: false, time: "1.5h" },
    { id: 3, title: "Review pull request", completed: true, time: "30min" },
  ];

  const recentCommits = [
    {
      id: 1,
      message: "feat: Add JWT refresh token logic",
      branch: "feature/auth",
      time: "10 min ago",
      files: 3,
    },
    {
      id: 2,
      message: "fix: Resolve mobile navigation bug",
      branch: "bugfix/mobile-nav",
      time: "1 hour ago",
      files: 2,
    },
    {
      id: 3,
      message: "docs: Update API documentation",
      branch: "main",
      time: "2 hours ago",
      files: 1,
    },
  ];

  const activeBranches = [
    { name: "feature/auth-module", commits: 8, lastUpdate: "10 min ago" },
    { name: "bugfix/payment-gateway", commits: 3, lastUpdate: "2 hours ago" },
    { name: "refactor/database-queries", commits: 5, lastUpdate: "1 day ago" },
  ];

  const bugs = [
    {
      id: 1,
      title: "Payment gateway timeout",
      priority: "High",
      status: "In Progress",
      project: "ExAfrik P2P",
    },
    {
      id: 2,
      title: "Session expires too quickly",
      priority: "Medium",
      status: "To Do",
      project: "Client Portal",
    },
    {
      id: 3,
      title: "Image upload fails on Safari",
      priority: "Low",
      status: "To Do",
      project: "AgriTech",
    },
  ];

  const handleToggleTimer = () => {
    setIsTracking(!isTracking);
    toast.success(
      isTracking
        ? "Work session logged successfully."
        : "Started tracking your work time.",
    );
  };

  const handleSaveWorkLog = () => {
    if (!workLog.trim()) {
      toast.error("Please enter your work log.");
      return;
    }
    toast.success("Your daily standup notes have been saved.");
    setWorkLog("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            Developer Workspace
          </h1>
          <p className="text-muted-foreground">
            Track your work, manage commits, and monitor bugs
          </p>
        </div>

        {/* Time Tracker */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary-glow/10">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold font-mono">{timeElapsed}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Active Work Time
                  </p>
                </div>
                <Button
                  size="lg"
                  variant={isTracking ? "destructive" : "default"}
                  onClick={handleToggleTimer}
                >
                  {isTracking ? (
                    <>
                      <StopCircle className="h-5 w-5 mr-2" />
                      Stop Timer
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-5 w-5 mr-2" />
                      Start Timer
                    </>
                  )}
                </Button>
              </div>
              <div className="flex gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">8.5h</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div className="border-l pl-4">
                  <p className="text-2xl font-bold">42.5h</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Today's Tasks
              </CardTitle>
              <CardDescription>Your daily task list</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className={`h-5 w-5 ${task.completed ? "text-green-600" : "text-muted-foreground"}`}
                    />
                    <div>
                      <p
                        className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Est. {task.time}
                      </p>
                    </div>
                  </div>
                  {!task.completed && <Button size="sm">Start</Button>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Bugs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-destructive" />
                Active Bugs
              </CardTitle>
              <CardDescription>Bugs assigned to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {bugs.map((bug) => (
                <div key={bug.id} className="p-3 rounded-lg bg-accent/50">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium">{bug.title}</p>
                    <Badge
                      variant={
                        bug.priority === "High" ? "destructive" : "outline"
                      }
                      className="text-xs"
                    >
                      {bug.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {bug.project}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {bug.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Bugs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Work Log */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-primary" />
              Daily Work Log / Standup Notes
            </CardTitle>
            <CardDescription>
              Document your daily progress and blockers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What did you work on today? Any blockers or achievements?"
              value={workLog}
              onChange={(e) => setWorkLog(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <Button onClick={handleSaveWorkLog}>Save Work Log</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Commits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCommit className="h-5 w-5 text-primary" />
                Recent Commits
              </CardTitle>
              <CardDescription>Your latest Git commits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentCommits.map((commit) => (
                <div
                  key={commit.id}
                  className="p-3 rounded-lg bg-accent/50 border-l-2 border-primary"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">{commit.message}</p>
                    <Code className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-3 w-3" />
                      {commit.branch}
                    </span>
                    <span>{commit.files} files</span>
                    <span>{commit.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Terminal className="h-4 w-4 mr-2" />
                View Repository
              </Button>
            </CardContent>
          </Card>

          {/* Active Branches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                Active Branches
              </CardTitle>
              <CardDescription>Your working branches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeBranches.map((branch, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-accent/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium font-mono text-sm">
                      {branch.name}
                    </p>
                    <Badge variant="outline">{branch.commits} commits</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {branch.lastUpdate}
                  </p>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Branches
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Workspace;
