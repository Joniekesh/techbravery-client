import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Users,
  Globe,
  Smartphone,
  Clock,
  TrendingUp,
  Eye,
  MousePointer,
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
  PieChart,
  Cell,
} from "recharts";

const UserAnalytics = () => {
  const userGrowthData = [
    { month: "Jan", users: 1200, activeUsers: 890, newUsers: 150 },
    { month: "Feb", users: 1450, activeUsers: 1050, newUsers: 250 },
    { month: "Mar", users: 1680, activeUsers: 1200, newUsers: 230 },
    { month: "Apr", users: 1950, activeUsers: 1380, newUsers: 270 },
    { month: "May", users: 2300, activeUsers: 1650, newUsers: 350 },
    { month: "Jun", users: 2750, activeUsers: 1980, newUsers: 450 },
  ];

  const deviceData = [
    { name: "Mobile", value: 65, color: "#0088FE" },
    { name: "Desktop", value: 30, color: "#00C49F" },
    { name: "Tablet", value: 5, color: "#FFBB28" },
  ];

  const geographicData = [
    { country: "Nigeria", users: 850, percentage: 31 },
    { country: "Kenya", users: 620, percentage: 23 },
    { country: "South Africa", users: 540, percentage: 20 },
    { country: "Ghana", users: 380, percentage: 14 },
    { country: "Uganda", users: 210, percentage: 8 },
    { country: "Others", users: 150, percentage: 4 },
  ];

  const engagementData = [
    { metric: "Session Duration", value: "4:32", trend: "+12%" },
    { metric: "Pages per Session", value: "3.8", trend: "+8%" },
    { metric: "Bounce Rate", value: "32%", trend: "-15%" },
    { metric: "Return Visitor Rate", value: "68%", trend: "+22%" },
  ];

  const topPages = [
    { page: "/dashboard", views: 12500, time: "6:45" },
    { page: "/platforms", views: 8900, time: "4:20" },
    { page: "/portfolio", views: 7600, time: "3:50" },
    { page: "/services", views: 6800, time: "5:15" },
    { page: "/about", views: 4200, time: "2:30" },
  ];

  const downloadReport = () => {
    const reportData = {
      reportDate: new Date().toISOString(),
      summary: {
        totalUsers: 2750,
        activeUsers: 1980,
        newUsers: 450,
        userGrowth: "+63.4%",
      },
      userGrowthData,
      deviceData,
      geographicData,
      engagementData,
      topPages,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `user-analytics-${new Date().toISOString().split("T")[0]}.json`;
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
                User{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Analytics
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive user behavior and engagement insights
              </p>
            </div>
            <Button onClick={downloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">2,750</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +63.4% growth
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Users
                    </p>
                    <p className="text-2xl font-bold">1,980</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      72% engagement rate
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Users</p>
                    <p className="text-2xl font-bold">450</p>
                    <p className="text-sm text-blue-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      This month
                    </p>
                  </div>
                  <MousePointer className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg. Session
                    </p>
                    <p className="text-2xl font-bold">4:32</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12% improvement
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Growth Chart */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>
                  Monthly user acquisition and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [value.toLocaleString(), ""]}
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="1"
                      stroke="#0088FE"
                      fill="#0088FE"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="activeUsers"
                      stackId="1"
                      stroke="#00C49F"
                      fill="#00C49F"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>User device preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <PieChart
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </PieChart>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {deviceData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Geographic Distribution */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>
                User distribution across African countries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={geographicData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="country" type="category" width={80} />
                      <Tooltip
                        formatter={(value) => [value.toLocaleString(), "Users"]}
                      />
                      <Bar dataKey="users" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {geographicData.map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {country.users.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {country.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>
                  User behavior and interaction patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagementData.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <span className="font-medium">{metric.metric}</span>
                      <div className="text-right">
                        <div className="font-bold">{metric.value}</div>
                        <Badge
                          variant={
                            metric.trend.startsWith("+")
                              ? "default"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {metric.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>
                  Most visited pages and average time spent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Avg. Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPages.map((page, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {page.page}
                        </TableCell>
                        <TableCell>{page.views.toLocaleString()}</TableCell>
                        <TableCell>{page.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* User Behavior Flow */}
          <Card>
            <CardHeader>
              <CardTitle>User Journey Insights</CardTitle>
              <CardDescription>
                Common user paths and conversion points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Entry Points</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Most users discover us through
                  </p>
                  <div className="space-y-1 text-sm">
                    <div>Organic Search (45%)</div>
                    <div>Direct Traffic (30%)</div>
                    <div>Social Media (25%)</div>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Engagement</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Users typically explore
                  </p>
                  <div className="space-y-1 text-sm">
                    <div>3.8 pages per session</div>
                    <div>4:32 average duration</div>
                    <div>68% return rate</div>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Conversions</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Key conversion metrics
                  </p>
                  <div className="space-y-1 text-sm">
                    <div>8.5% quote requests</div>
                    <div>12% newsletter signups</div>
                    <div>5.2% contact form</div>
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

export default UserAnalytics;
