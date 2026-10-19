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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  BarChart3,
  Globe,
  Zap,
  Shield,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const P2PExchangeDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ExAfrik P2P Exchange - Platform Details | TechBravery"
        description="Detailed information about ExAfrik P2P Exchange platform performance and metrics"
      />

      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/investor-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          {/* Platform Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  ExAfrik P2P Exchange
                </h1>
                <p className="text-xl text-muted-foreground">
                  Cross-border P2P trading platform
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 w-fit">
                Active
              </Badge>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Investment
                      </p>
                      <p className="text-2xl font-bold">$250k</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Current Value
                      </p>
                      <p className="text-2xl font-bold">$320k</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Growth</p>
                      <p className="text-2xl font-bold text-green-600">+28%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Active Users
                      </p>
                      <p className="text-2xl font-bold">2,500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Overview</CardTitle>
                  <CardDescription>
                    Comprehensive information about ExAfrik P2P Exchange
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">About the Platform</h3>
                    <p className="text-muted-foreground">
                      ExAfrik P2P Exchange is a revolutionary peer-to-peer
                      trading platform designed specifically for African
                      markets. It enables seamless cross-border transactions
                      with support for multiple currencies and payment methods,
                      making international trade accessible to everyone.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <Globe className="w-8 h-8 text-primary mb-2" />
                      <h4 className="font-semibold mb-1">Global Reach</h4>
                      <p className="text-sm text-muted-foreground">
                        Operating in 12 African countries
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Zap className="w-8 h-8 text-yellow-500 mb-2" />
                      <h4 className="font-semibold mb-1">Fast Transactions</h4>
                      <p className="text-sm text-muted-foreground">
                        Average settlement under 5 minutes
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Shield className="w-8 h-8 text-green-500 mb-2" />
                      <h4 className="font-semibold mb-1">Secure Platform</h4>
                      <p className="text-sm text-muted-foreground">
                        Bank-grade security & encryption
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Multi-currency support (USD, EUR, GBP, NGN, KES, GHS)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Escrow protection for all transactions
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Real-time market rates and price discovery
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          24/7 customer support in multiple languages
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Mobile app for iOS and Android
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Current Month
                        </span>
                        <span className="font-bold text-2xl">$45,000</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        +15% from last month
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Total Users
                        </span>
                        <span className="font-bold text-2xl">2,500</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        +250 new users this month
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Daily Average
                        </span>
                        <span className="font-semibold">$125,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Monthly Total
                        </span>
                        <span className="font-semibold">$3.5M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total Transactions
                        </span>
                        <span className="font-semibold">1,245</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Active Countries
                        </span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Avg. Transaction Time
                        </span>
                        <span className="font-semibold">4.5 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Customer Satisfaction
                        </span>
                        <span className="font-semibold">4.7/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Development Roadmap</CardTitle>
                  <CardDescription>
                    Upcoming features and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <h4 className="font-semibold">Q1 2024 - Completed</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>
                          ✓ Launch in 3 new countries (Tanzania, Uganda, Rwanda)
                        </li>
                        <li>✓ Mobile app v2.0 release</li>
                        <li>✓ Integration with local payment processors</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold">Q2 2024 - In Progress</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>⏳ Launch cryptocurrency trading pairs</li>
                        <li>⏳ Advanced analytics dashboard</li>
                        <li>⏳ API for third-party integrations</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <h4 className="font-semibold">Q3 2024 - Planned</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>○ Expand to 5 more African countries</li>
                        <li>○ Launch merchant payment solutions</li>
                        <li>○ Implement AI-powered fraud detection</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-4 py-2">
                      <h4 className="font-semibold">Q4 2024 - Future</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>○ Launch institutional trading platform</li>
                        <li>○ Introduce staking and yield products</li>
                        <li>○ Regulatory approval in additional markets</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Documents</CardTitle>
                  <CardDescription>
                    Download detailed reports and documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/reports/q4-report">
                        <Download className="w-4 h-4 mr-2" />
                        Q4 2023 Performance Report
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/reports/financial-statements">
                        <Download className="w-4 h-4 mr-2" />
                        Financial Statements
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/reports/user-analytics">
                        <Download className="w-4 h-4 mr-2" />
                        User Analytics Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/reports/technical-specs">
                        <Download className="w-4 h-4 mr-2" />
                        Technical Specifications
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

export default P2PExchangeDetail;
