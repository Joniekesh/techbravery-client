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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Implement JWT authentication",
      description: "Add JWT-based authentication with refresh tokens",
      project: "ExAfrik P2P Exchange",
      status: "in-progress",
      priority: "High",
      assignee: "You",
      dueDate: "2025-10-22",
      estimatedTime: "2h",
      tags: ["Backend", "Security"],
      subtasks: [
        { id: 1, title: "Setup JWT library", completed: true },
        { id: 2, title: "Create auth middleware", completed: true },
        { id: 3, title: "Implement refresh token logic", completed: false },
      ],
    },
    {
      id: 2,
      title: "Fix responsive layout issues",
      description: "Mobile navigation not working properly on iOS devices",
      project: "AgriTech Supply Chain",
      status: "todo",
      priority: "Medium",
      assignee: "You",
      dueDate: "2025-10-23",
      estimatedTime: "1.5h",
      tags: ["Frontend", "Bug"],
      subtasks: [],
    },
    {
      id: 3,
      title: "Review Sarah's pull request",
      description: "Code review for payment integration module",
      project: "ExAfrik P2P Exchange",
      status: "todo",
      priority: "High",
      assignee: "You",
      dueDate: "2025-10-21",
      estimatedTime: "30min",
      tags: ["Review", "Payment"],
      subtasks: [],
    },
    {
      id: 4,
      title: "Update API documentation",
      description: "Document new endpoints and update examples",
      project: "Client Portal",
      status: "todo",
      priority: "Low",
      assignee: "You",
      dueDate: "2025-10-25",
      estimatedTime: "1h",
      tags: ["Documentation"],
      subtasks: [],
    },
    {
      id: 5,
      title: "Database migration script",
      description: "Create migration for new user roles table",
      project: "ExAfrik P2P Exchange",
      status: "completed",
      priority: "Medium",
      assignee: "You",
      dueDate: "2025-10-18",
      estimatedTime: "1h",
      tags: ["Backend", "Database"],
      subtasks: [],
    },
    {
      id: 6,
      title: "Optimize image loading",
      description: "Implement lazy loading and WebP format",
      project: "AgriTech Supply Chain",
      status: "completed",
      priority: "Medium",
      assignee: "You",
      dueDate: "2025-10-19",
      estimatedTime: "2h",
      tags: ["Frontend", "Performance"],
      subtasks: [],
    },
  ]);

  const handleStartTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: "in-progress" } : task,
      ),
    );
    toast.success("Timer has been started for this task.");
  };

  const handleCompleteTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task,
      ),
    );
    toast.success("Great work! Task has been marked as complete.");
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
      case "completed":
        return "default";
      case "in-progress":
        return "secondary";
      case "todo":
        return "outline";
      default:
        return "outline";
    }
  };

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  const TaskCard = ({ task }: { task: (typeof tasks)[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </div>
          <Badge variant={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {task.subtasks.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">
              Subtasks ({task.subtasks.filter((st) => st.completed).length}/
              {task.subtasks.length})
            </p>
            <div className="space-y-1">
              {task.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle
                    className={`h-4 w-4 ${subtask.completed ? "text-green-600" : "text-muted-foreground"}`}
                  />
                  <span
                    className={
                      subtask.completed
                        ? "line-through text-muted-foreground"
                        : ""
                    }
                  >
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {task.estimatedTime}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {task.assignee}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{task.project}</p>

        <div className="flex gap-2 pt-2 border-t">
          {task.status === "todo" && (
            <Button size="sm" onClick={() => handleStartTask(task.id)}>
              <PlayCircle className="h-4 w-4 mr-2" />
              Start Task
            </Button>
          )}
          {task.status === "in-progress" && (
            <Button size="sm" onClick={() => handleCompleteTask(task.id)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete
            </Button>
          )}
          {task.status === "completed" && (
            <Badge variant="default" className="h-9 px-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </Badge>
          )}
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              My Tasks
            </h1>
            <p className="text-muted-foreground mt-2">
              {todoTasks.length} to do • {inProgressTasks.length} in progress •{" "}
              {completedTasks.length} completed
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
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

        {/* Kanban Board */}
        <Tabs defaultValue="kanban" className="space-y-6">
          <TabsList>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do Column */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    To Do ({todoTasks.length})
                  </h3>
                </div>
                <div className="space-y-4">
                  {todoTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-blue-600" />
                    In Progress ({inProgressTasks.length})
                  </h3>
                </div>
                <div className="space-y-4">
                  {inProgressTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Completed Column */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Completed ({completedTasks.length})
                  </h3>
                </div>
                <div className="space-y-4">
                  {completedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Tasks;
