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
  Boxes,
  Briefcase,
  Target,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const SaasSuiteDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ExAfrik SaaS Suite - Platform Details | TechBravery"
        description="Detailed information about ExAfrik SaaS Suite platform performance and metrics"
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
                <h1 className="text-4xl font-bold mb-2">ExAfrik SaaS Suite</h1>
                <p className="text-xl text-muted-foreground">
                  Business management tools for African SMEs
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 w-fit">Scaling</Badge>
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
                      <p className="text-2xl font-bold">$300k</p>
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
                      <p className="text-2xl font-bold">$385k</p>
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
                      <p className="text-2xl font-bold text-green-600">
                        +28.3%
                      </p>
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
                      <p className="text-2xl font-bold">1,800</p>
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
                    Comprehensive information about ExAfrik SaaS Suite
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">About the Platform</h3>
                    <p className="text-muted-foreground">
                      ExAfrik SaaS Suite is an all-in-one business management
                      platform specifically designed for small and medium
                      enterprises across Africa. It combines accounting,
                      inventory management, CRM, and HR tools into a single,
                      affordable solution that helps businesses grow
                      efficiently.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <Boxes className="w-8 h-8 text-primary mb-2" />
                      <h4 className="font-semibold mb-1">All-in-One Suite</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete business tools in one platform
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Briefcase className="w-8 h-8 text-blue-500 mb-2" />
                      <h4 className="font-semibold mb-1">SME Focused</h4>
                      <p className="text-sm text-muted-foreground">
                        Built for African small businesses
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Target className="w-8 h-8 text-green-500 mb-2" />
                      <h4 className="font-semibold mb-1">Growth Ready</h4>
                      <p className="text-sm text-muted-foreground">
                        Scales with your business
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Key Modules</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Financial Management & Accounting
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Inventory & Stock Management
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Customer Relationship Management (CRM)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Human Resources & Payroll
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Sales & Invoicing
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
                        <span className="font-bold text-2xl">$52,000</span>
                      </div>
                      <Progress value={88} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        +18% from last month
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
                        <span className="font-bold text-2xl">1,800</span>
                      </div>
                      <Progress value={70} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        +180 new businesses this month
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Active Subscriptions
                        </span>
                        <span className="font-semibold">1,650</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          MRR (Monthly Recurring)
                        </span>
                        <span className="font-semibold">$48,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Churn Rate
                        </span>
                        <span className="font-semibold">2.3%</span>
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
                          Avg. Session Time
                        </span>
                        <span className="font-semibold">42 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Features Used/User
                        </span>
                        <span className="font-semibold">3.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Customer Satisfaction
                        </span>
                        <span className="font-semibold">4.6/5</span>
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
                        <li>✓ Mobile app launch (iOS & Android)</li>
                        <li>✓ Advanced reporting dashboard</li>
                        <li>✓ Multi-currency support</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold">Q2 2024 - In Progress</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>⏳ AI-powered business insights</li>
                        <li>⏳ Integration marketplace</li>
                        <li>⏳ Automated tax compliance</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <h4 className="font-semibold">Q3 2024 - Planned</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>○ Break-even milestone achievement</li>
                        <li>○ Launch enterprise tier</li>
                        <li>○ Advanced inventory forecasting</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-4 py-2">
                      <h4 className="font-semibold">Q4 2024 - Future</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>○ White-label solution for partners</li>
                        <li>○ Embedded finance products</li>
                        <li>○ Expansion to 10 new markets</li>
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
                      <Link to="/reports/pitch-deck">
                        <Download className="w-4 h-4 mr-2" />
                        Investor Pitch Deck
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/reports/market-analysis">
                        <Download className="w-4 h-4 mr-2" />
                        Market Analysis Report
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/reports/product-roadmap">
                        <Download className="w-4 h-4 mr-2" />
                        Product Roadmap
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

export default SaasSuiteDetail;
