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
import { Link } from "react-router-dom";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Download,
  MessageSquare,
  Target,
  ArrowUpRight,
  Eye,
  Star,
} from "lucide-react";
import { useProfile } from "@/services";
import { useAppSelector } from "@/redux/hooks";
import InvestorInvestmentApplications from "@/components/investor/InvestorInvestmentApplications";

const InvestorDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? "";

  const { data: profile } = useProfile(userId);

  console.log("PROFILE", profile);

  // Mock data - replace with real data from your backend
  const portfolioSummary = {
    totalInvested: 750000,
    currentValue: 920000,
    totalReturns: 170000,
    returnPercentage: 22.67,
    activePlatforms: 3,
  };

  const platforms = [
    {
      id: "p2p-exchange",
      name: "ExAfrik P2P Exchange",
      description: "Cross-border P2P trading platform",
      investment: 250000,
      currentValue: 320000,
      growth: 28,
      status: "active",
      users: 2500,
      monthlyRevenue: 45000,
      fundingStage: "Series A",
      nextMilestone: "Launch in 3 new countries",
      documents: ["Q4 Report", "Financial Statements", "User Analytics"],
    },
    {
      id: "saas-suite",
      name: "ExAfrik SaaS Suite",
      description: "Business management tools for African SMEs",
      investment: 300000,
      currentValue: 385000,
      growth: 28.33,
      status: "scaling",
      users: 1800,
      monthlyRevenue: 52000,
      fundingStage: "Seed",
      nextMilestone: "Break-even by Q2 2024",
      documents: ["Pitch Deck", "Market Analysis", "Product Roadmap"],
    },
    {
      id: "fintech-wallet",
      name: "ExAfrik Digital Wallet",
      description: "Multi-currency digital wallet solution",
      investment: 200000,
      currentValue: 215000,
      growth: 7.5,
      status: "development",
      users: 500,
      monthlyRevenue: 12000,
      fundingStage: "Pre-seed",
      nextMilestone: "Beta launch in Kenya",
      documents: ["Technical Specs", "Compliance Report"],
    },
  ];

  const recentUpdates = [
    {
      platform: "ExAfrik P2P Exchange",
      update: "Reached 2,500 active users milestone",
      date: "2024-01-15",
      type: "milestone",
    },
    {
      platform: "ExAfrik SaaS Suite",
      update: "Monthly revenue increased by 15%",
      date: "2024-01-14",
      type: "financial",
    },
    {
      platform: "ExAfrik Digital Wallet",
      update: "Completed regulatory compliance in Nigeria",
      date: "2024-01-12",
      type: "legal",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scaling":
        return "bg-blue-100 text-blue-800";
      case "development":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <Target className="w-4 h-4 text-green-600" />;
      case "financial":
        return <DollarSign className="w-4 h-4 text-blue-600" />;
      case "legal":
        return <MessageSquare className="w-4 h-4 text-purple-600" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Investor{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Track your investments in Techbravery's proprietary platforms
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/reports/q4-report">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="opacity-100">Download Report</span>
                </Link>
              </Button>
              <Button asChild>
                <Link to="/contact">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span className="opacity-100">Contact Team</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Summary */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-8">
            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Total Invested
                    </p>
                    <p className="text-lg lg:text-2xl font-bold truncate">
                      ${(portfolioSummary.totalInvested / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-green-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Current Value
                    </p>
                    <p className="text-lg lg:text-2xl font-bold truncate">
                      ${(portfolioSummary.currentValue / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-3">
                  <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 text-green-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Total Returns
                    </p>
                    <p className="text-lg lg:text-2xl font-bold text-green-600 truncate">
                      +${(portfolioSummary.totalReturns / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      ROI
                    </p>
                    <p className="text-lg lg:text-2xl font-bold text-green-600 truncate">
                      +{portfolioSummary.returnPercentage}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      Active Platforms
                    </p>
                    <p className="text-lg lg:text-2xl font-bold truncate">
                      {portfolioSummary.activePlatforms}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="platforms" className="space-y-6">
            <TabsList className="flex item-center justify-between gap-4 overflow-x-auto overflow-y-hidden">
              <TabsTrigger value="platforms" className="text-xs sm:text-sm">
                Platform Performance
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                Analytics & Reports
              </TabsTrigger>
              <TabsTrigger value="opportunities" className="text-xs sm:text-sm">
                New Opportunities
              </TabsTrigger>
            </TabsList>

            {/* Platform Performance */}
            <TabsContent value="platforms">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                  {platforms.map((platform) => (
                    <Card
                      key={platform.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">
                              {platform.name}
                            </CardTitle>
                            <CardDescription>
                              {platform.description}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(platform.status)}>
                            {platform.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Investment
                            </p>
                            <p className="text-base lg:text-lg font-bold">
                              ${(platform.investment / 1000).toFixed(0)}k
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Current Value
                            </p>
                            <p className="text-base lg:text-lg font-bold">
                              ${(platform.currentValue / 1000).toFixed(0)}k
                            </p>
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Growth
                            </p>
                            <p className="text-base lg:text-lg font-bold text-green-600">
                              +{platform.growth}%
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Active Users
                            </p>
                            <p className="font-semibold">
                              {platform.users.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Monthly Revenue
                            </p>
                            <p className="font-semibold">
                              ${platform.monthlyRevenue.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Funding Stage
                            </p>
                            <p className="font-semibold">
                              {platform.fundingStage}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Next Milestone
                          </p>
                          <p className="font-medium">
                            {platform.nextMilestone}
                          </p>
                          <Progress
                            value={Math.random() * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="flex justify-between items-center pt-4">
                          <div className="flex gap-2 flex-wrap">
                            {platform.documents.map((doc, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                asChild
                              >
                                <Link
                                  to={`/reports/${doc
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  <span className="opacity-100">{doc}</span>
                                </Link>
                              </Button>
                            ))}
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/platforms/${platform.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              <span className="opacity-100">View Details</span>
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Updates */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Recent Updates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentUpdates.map((update, index) => (
                          <div
                            key={index}
                            className="flex gap-3 p-3 rounded-lg bg-secondary/20"
                          >
                            {getUpdateIcon(update.type)}
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {update.platform}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {update.update}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {update.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Portfolio Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {platforms.map((platform, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">
                                {platform.name}
                              </span>
                              <span className="text-green-600">
                                +{platform.growth}%
                              </span>
                            </div>
                            <Progress value={platform.growth} className="h-2" />
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                              +{portfolioSummary.returnPercentage}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Average ROI
                            </p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">
                              $
                              {(portfolioSummary.currentValue / 1000).toFixed(
                                0,
                              )}
                              K
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Total Value
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Revenue Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {[
                          { month: "Jan", revenue: 45000, growth: 12 },
                          { month: "Feb", revenue: 52000, growth: 15 },
                          { month: "Mar", revenue: 58000, growth: 11 },
                          { month: "Apr", revenue: 67000, growth: 16 },
                          { month: "May", revenue: 75000, growth: 12 },
                          { month: "Jun", revenue: 85000, growth: 13 },
                        ].map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm font-medium w-12">
                              {data.month}
                            </span>
                            <div className="flex-1 mx-4">
                              <Progress
                                value={(data.revenue / 85000) * 100}
                                className="h-3"
                              />
                            </div>
                            <span className="text-sm font-medium w-16 text-right">
                              ${(data.revenue / 1000).toFixed(0)}K
                            </span>
                            <span className="text-xs text-green-600 w-12 text-right">
                              +{data.growth}%
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-primary">
                            $382K
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Revenue (6 months)
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Investment Opportunities */}
            <TabsContent value="opportunities">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    New Investment Opportunities
                  </CardTitle>
                  <CardDescription>
                    Explore upcoming platforms and funding rounds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      New Opportunities Coming Soon
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Stay tuned for exciting new platforms entering our
                      portfolio
                    </p>
                    <Button asChild>
                      <Link to="/investor/express-interest">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Express Interest
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default InvestorDashboard;
