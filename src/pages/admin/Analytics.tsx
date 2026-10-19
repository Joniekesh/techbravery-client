import AppAreaChart from "@/components/admin/AppAreaChart";
import AppPieChart from "@/components/admin/AppPieChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Globe, TrendingUp } from "lucide-react";

const Analytics = () => {
  const stats = {
    totalQuotes: 15,
    pendingQuotes: 5,
    activeProjects: 8,
    totalRevenue: 450000,
    newInvestments: 3,
    platformUsers: 1250,
    systemUptime: 99.9,
    apiCalls: 1500000,
    securityAlerts: 2,
    monthlyGrowth: 23.5,
  };

  return (
    <div className="flex flex-col flex-1 mt-20 ml-4 mr-4 mb-4">
      <h1 className="text-4xl font-bold my-6">
        <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Analytics
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Revenue Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  ${(stats.totalRevenue / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  +{stats.monthlyGrowth}%
                </p>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">18</p>
                <p className="text-sm text-muted-foreground">Active Clients</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">$35K</p>
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppAreaChart />
        </div>
        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppPieChart />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Website Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <p className="text-2xl font-bold">12,450</p>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <p className="text-2xl font-bold">3,280</p>
                  <p className="text-sm text-muted-foreground">
                    Unique Visitors
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bounce Rate</span>
                  <span>32%</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Avg. Session Duration</span>
                  <span>4:32</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              API Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <p className="text-2xl font-bold">
                    {(stats.apiCalls / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-muted-foreground">API Calls</p>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <p className="text-2xl font-bold">145ms</p>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uptime</span>
                  <span>{stats.systemUptime}%</span>
                </div>
                <Progress value={stats.systemUptime} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
