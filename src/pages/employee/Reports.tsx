import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  CheckCircle,
  Clock,
  Bug,
  Award,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Mock data for charts
  const taskCompletionData = [
    { name: "Mon", assigned: 12, completed: 10 },
    { name: "Tue", assigned: 15, completed: 14 },
    { name: "Wed", assigned: 10, completed: 9 },
    { name: "Thu", assigned: 18, completed: 16 },
    { name: "Fri", assigned: 14, completed: 13 },
    { name: "Sat", assigned: 5, completed: 5 },
    { name: "Sun", assigned: 3, completed: 3 },
  ];

  const hoursLoggedByProject = [
    { project: "ExAfrik P2P", hours: 45 },
    { project: "AgriTech", hours: 32 },
    { project: "Client Portal", hours: 28 },
    { project: "Internal Tools", hours: 15 },
  ];

  const bugResolutionData = [
    { name: "Resolved", value: 43, color: "hsl(var(--primary))" },
    { name: "In Progress", value: 12, color: "hsl(var(--chart-2))" },
    { name: "Open", value: 8, color: "hsl(var(--chart-3))" },
  ];

  const productivityTrend = [
    { week: "Week 1", productivity: 72 },
    { week: "Week 2", productivity: 78 },
    { week: "Week 3", productivity: 75 },
    { week: "Week 4", productivity: 85 },
  ];

  const codeQualityMetrics = {
    codeReviews: 28,
    linesOfCode: 3450,
    pullRequests: 15,
    commits: 87,
    testCoverage: 82,
    codeQuality: "A",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/staff-dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Performance Reports
              </h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive insights into your productivity and performance
              </p>
            </div>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">147</p>
              <p className="text-sm text-muted-foreground mt-1">
                Tasks Completed
              </p>
              <Progress value={78} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">
                78% completion rate
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Clock className="h-8 w-8 text-blue-600" />
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">156h</p>
              <p className="text-sm text-muted-foreground mt-1">Hours Logged</p>
              <Progress value={85} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">
                +12h from last week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Bug className="h-8 w-8 text-orange-600" />
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">43</p>
              <p className="text-sm text-muted-foreground mt-1">
                Bugs Resolved
              </p>
              <Progress value={92} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">
                92% resolution rate
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Award className="h-8 w-8 text-yellow-600" />
                <Badge variant="default">A</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">28</p>
              <p className="text-sm text-muted-foreground mt-1">Code Reviews</p>
              <Progress value={70} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">
                Quality Grade: A
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Tabs defaultValue="productivity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="quality">Code Quality</TabsTrigger>
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
          </TabsList>

          {/* Productivity Tab */}
          <TabsContent value="productivity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tasks Completed vs Assigned */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Tasks Completed vs Assigned
                  </CardTitle>
                  <CardDescription>
                    Weekly task completion comparison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={taskCompletionData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="assigned"
                        fill="hsl(var(--chart-2))"
                        name="Assigned"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="completed"
                        fill="hsl(var(--primary))"
                        name="Completed"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Productivity Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Productivity Trend
                  </CardTitle>
                  <CardDescription>
                    Monthly productivity percentage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={productivityTrend}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="week"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="productivity"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hours Logged by Project */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Hours Logged by Project
                  </CardTitle>
                  <CardDescription>
                    Time distribution across projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hoursLoggedByProject} layout="vertical">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        type="number"
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        dataKey="project"
                        type="category"
                        stroke="hsl(var(--muted-foreground))"
                        width={120}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="hours"
                        fill="hsl(var(--primary))"
                        radius={[0, 8, 8, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bug Resolution Ratio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Bug Resolution Ratio
                  </CardTitle>
                  <CardDescription>
                    Current bug status distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={bugResolutionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bugResolutionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Code Quality Tab */}
          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Code Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">
                    {codeQualityMetrics.codeReviews}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Reviews completed
                  </p>
                  <Progress value={70} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lines of Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">
                    {codeQualityMetrics.linesOfCode.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Written this month
                  </p>
                  <Progress value={65} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pull Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">
                    {codeQualityMetrics.pullRequests}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Merged successfully
                  </p>
                  <Progress value={88} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Git Commits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">
                    {codeQualityMetrics.commits}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total commits
                  </p>
                  <Progress value={75} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">
                    {codeQualityMetrics.testCoverage}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Code coverage
                  </p>
                  <Progress
                    value={codeQualityMetrics.testCoverage}
                    className="mt-4"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Code Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {codeQualityMetrics.codeQuality}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Excellent</p>
                      <p className="text-xs text-muted-foreground">
                        Keep up the great work!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI-Generated Performance Summary
                </CardTitle>
                <CardDescription>
                  Personalized insights based on your activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Strengths */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Key Strengths
                  </h3>
                  <div className="space-y-2">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="font-medium text-green-700 dark:text-green-400">
                        🎯 High Task Completion Rate
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        You've maintained an impressive 78% task completion
                        rate, consistently meeting deadlines and delivering
                        quality work.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <p className="font-medium text-blue-700 dark:text-blue-400">
                        🐛 Exceptional Bug Resolution
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your 92% bug resolution rate is outstanding. You're
                        proactive in identifying and fixing issues quickly.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <p className="font-medium text-purple-700 dark:text-purple-400">
                        💻 Consistent Code Quality
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your code maintains an 'A' quality grade with 82% test
                        coverage. Great attention to best practices!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Growth Opportunities
                  </h3>
                  <div className="space-y-2">
                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <p className="font-medium text-orange-700 dark:text-orange-400">
                        📊 Code Review Participation
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Consider increasing code review participation to share
                        knowledge and learn from team members' approaches.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <p className="font-medium text-yellow-700 dark:text-yellow-400">
                        ⏰ Time Management
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your productivity peaks mid-week. Try distributing tasks
                        more evenly to maintain consistent output.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Personalized Recommendations
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                      <Badge variant="default" className="mt-1">
                        1
                      </Badge>
                      <div>
                        <p className="font-medium">
                          Focus on ExAfrik P2P Project
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This project has the highest priority and is 85%
                          complete. Push for completion this week.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                      <Badge variant="default" className="mt-1">
                        2
                      </Badge>
                      <div>
                        <p className="font-medium">Pair Programming Session</p>
                        <p className="text-sm text-muted-foreground">
                          Schedule a session with junior developers to share
                          your bug-fixing expertise.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                      <Badge variant="default" className="mt-1">
                        3
                      </Badge>
                      <div>
                        <p className="font-medium">Documentation Sprint</p>
                        <p className="text-sm text-muted-foreground">
                          Allocate time to document your recent work on the
                          authentication module.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall Rating */}
                <div className="text-center p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20">
                  <Award className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-2">
                    Outstanding Performance!
                  </h3>
                  <p className="text-muted-foreground">
                    You're in the top 15% of performers this month. Keep up the
                    excellent work!
                  </p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Badge variant="default" className="text-sm">
                      Top Performer
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      Fast Learner
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      Team Player
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Reports;
