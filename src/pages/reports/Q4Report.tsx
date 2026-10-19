import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  TrendingUp,
  Target,
  Award,
  Users,
  DollarSign,
  Globe,
  Rocket,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const Q4Report = () => {
  const quarterlyData = [
    { quarter: "Q1", revenue: 85000, projects: 12, clients: 8 },
    { quarter: "Q2", revenue: 120000, projects: 16, clients: 12 },
    { quarter: "Q3", revenue: 145000, projects: 18, clients: 14 },
    { quarter: "Q4", revenue: 180000, projects: 22, clients: 18 },
  ];

  const monthlyMetrics = [
    {
      month: "Oct",
      revenue: 52000,
      expenses: 35000,
      profit: 17000,
      projects: 7,
    },
    {
      month: "Nov",
      revenue: 61000,
      expenses: 38000,
      profit: 23000,
      projects: 8,
    },
    {
      month: "Dec",
      revenue: 67000,
      expenses: 42000,
      profit: 25000,
      projects: 7,
    },
  ];

  const keyAchievements = [
    {
      title: "Revenue Milestone",
      description: "Exceeded $180K quarterly target by 15%",
      icon: DollarSign,
      progress: 115,
      target: "180K",
      actual: "207K",
    },
    {
      title: "Client Acquisition",
      description: "Onboarded 18 new enterprise clients",
      icon: Users,
      progress: 120,
      target: "15 clients",
      actual: "18 clients",
    },
    {
      title: "Market Expansion",
      description: "Successfully expanded to 3 new African markets",
      icon: Globe,
      progress: 100,
      target: "3 markets",
      actual: "3 markets",
    },
    {
      title: "Platform Launch",
      description: "Launched 2 proprietary platforms ahead of schedule",
      icon: Rocket,
      progress: 133,
      target: "3 platforms",
      actual: "4 platforms",
    },
  ];

  const projectBreakdown = [
    { type: "Web Applications", count: 8, revenue: 85000 },
    { type: "Mobile Apps", count: 6, revenue: 62000 },
    { type: "Fintech Solutions", count: 4, revenue: 48000 },
    { type: "AI/ML Projects", count: 3, revenue: 38000 },
    { type: "Blockchain", count: 1, revenue: 25000 },
  ];

  const clientSatisfaction = [
    { metric: "Overall Satisfaction", score: 4.8, target: 4.5 },
    { metric: "Project Delivery", score: 4.7, target: 4.3 },
    { metric: "Communication", score: 4.9, target: 4.4 },
    { metric: "Technical Quality", score: 4.8, target: 4.6 },
    { metric: "Value for Money", score: 4.6, target: 4.2 },
  ];

  const downloadReport = () => {
    const reportData = {
      reportPeriod: "Q4 2024",
      generatedAt: new Date().toISOString(),
      summary: {
        totalRevenue: 207000,
        totalProjects: 22,
        newClients: 18,
        marketExpansion: 3,
        avgClientSatisfaction: 4.8,
      },
      quarterlyData,
      monthlyMetrics,
      keyAchievements,
      projectBreakdown,
      clientSatisfaction,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `q4-2024-report-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Q4 2024{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Performance Report
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive quarterly performance and strategic achievements
              </p>
            </div>
            <Button onClick={downloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-8 bg-gradient-to-br from-primary/5 to-primary-glow/5">
            <CardHeader>
              <CardTitle className="text-2xl">Executive Summary</CardTitle>
              <CardDescription>
                Q4 2024 marked our strongest quarter with record-breaking
                performance across all key metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">$207K</div>
                  <div className="text-sm text-muted-foreground">
                    Total Revenue
                  </div>
                  <div className="text-xs text-green-600">
                    +15% above target
                  </div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">22</div>
                  <div className="text-sm text-muted-foreground">
                    Projects Delivered
                  </div>
                  <div className="text-xs text-green-600">+22% vs Q3</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">18</div>
                  <div className="text-sm text-muted-foreground">
                    New Clients
                  </div>
                  <div className="text-xs text-green-600">+29% vs Q3</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">4.8</div>
                  <div className="text-sm text-muted-foreground">
                    Client Satisfaction
                  </div>
                  <div className="text-xs text-green-600">+7% vs target</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Achievements */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Key Achievements</CardTitle>
                <CardDescription>
                  Major milestones and strategic wins in Q4
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keyAchievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {achievement.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            <div className="flex items-center gap-4">
                              <Progress
                                value={achievement.progress}
                                className="flex-1 h-2"
                              />
                              <Badge
                                variant={
                                  achievement.progress >= 100
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {achievement.actual}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance Trend</CardTitle>
                <CardDescription>
                  Revenue and project growth throughout 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={quarterlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "revenue"
                          ? `$${value.toLocaleString()}`
                          : value,
                        name === "revenue"
                          ? "Revenue"
                          : name === "projects"
                            ? "Projects"
                            : "Clients",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#0088FE"
                      fill="#0088FE"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Q4 Monthly Performance</CardTitle>
              <CardDescription>
                Detailed breakdown of October, November, and December
                performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                  />
                  <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                  <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                  <Bar dataKey="profit" fill="#00C49F" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Project Breakdown & Client Satisfaction */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Project Portfolio Breakdown</CardTitle>
                <CardDescription>
                  Revenue distribution by project type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectBreakdown.map((project, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{project.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {project.count} projects
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          ${(project.revenue / 1000).toFixed(0)}K
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {((project.revenue / 258000) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Satisfaction Metrics</CardTitle>
                <CardDescription>
                  Performance vs targets across key satisfaction areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientSatisfaction.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {metric.metric}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">
                            {metric.score}/5
                          </span>
                          <Badge
                            variant={
                              metric.score >= metric.target
                                ? "default"
                                : "secondary"
                            }
                          >
                            {metric.score >= metric.target ? "✓" : "→"}{" "}
                            {metric.target}
                          </Badge>
                        </div>
                      </div>
                      <Progress
                        value={(metric.score / 5) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Initiatives */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Strategic Initiatives & Future Outlook</CardTitle>
              <CardDescription>
                Key strategic developments and Q1 2025 roadmap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <Target className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">Market Expansion</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Successfully entered 3 new African markets with strong
                    initial traction.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Ghana: 5 new clients</li>
                    <li>• Uganda: 3 new clients</li>
                    <li>• Tanzania: 2 new clients</li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <Rocket className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2">Platform Development</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Launched proprietary platforms exceeding deployment targets.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• AgriConnect: 2K+ farmers</li>
                    <li>• FinTech Suite: 500+ businesses</li>
                    <li>• EduConnect: 1.5K+ students</li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <Award className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold mb-2">Innovation & Awards</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Recognition and technological breakthroughs in Q4.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>• Best AgriTech Solution Award</li>
                    <li>• AI-powered analytics engine</li>
                    <li>• Blockchain integration suite</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Q1 2025 Outlook */}
          <Card>
            <CardHeader>
              <CardTitle>Q1 2025 Outlook & Targets</CardTitle>
              <CardDescription>
                Strategic priorities and growth targets for the next quarter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Revenue Targets</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Total Revenue Goal</span>
                      <span className="font-bold">$250K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>New Client Target</span>
                      <span className="font-bold">20 clients</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Project Pipeline</span>
                      <span className="font-bold">25 projects</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Strategic Initiatives</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Launch enterprise AI consulting division</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Expand to 2 additional African markets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Complete Series A funding round</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Scale proprietary platforms to 10K+ users</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Q4Report;
