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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  BarChart3,
  Wallet,
  Smartphone,
  Lock,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const DigitalWalletDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ExAfrik Digital Wallet - Platform Details | TechBravery"
        description="Detailed information about ExAfrik Digital Wallet platform performance and metrics"
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
                  ExAfrik Digital Wallet
                </h1>
                <p className="text-xl text-muted-foreground">
                  Multi-currency digital wallet solution
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 w-fit">
                Development
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
                      <p className="text-2xl font-bold">$200k</p>
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
                      <p className="text-2xl font-bold">$215k</p>
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
                      <p className="text-2xl font-bold text-green-600">+7.5%</p>
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
                        Beta Users
                      </p>
                      <p className="text-2xl font-bold">500</p>
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
                    Comprehensive information about ExAfrik Digital Wallet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">About the Platform</h3>
                    <p className="text-muted-foreground">
                      ExAfrik Digital Wallet is a next-generation mobile wallet
                      that enables users to store, send, and receive multiple
                      currencies seamlessly. With a focus on financial
                      inclusion, the platform provides banking services to the
                      unbanked population across Africa through a simple mobile
                      app.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <Wallet className="w-8 h-8 text-primary mb-2" />
                      <h4 className="font-semibold mb-1">Multi-Currency</h4>
                      <p className="text-sm text-muted-foreground">
                        Support for 15+ currencies
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Smartphone className="w-8 h-8 text-blue-500 mb-2" />
                      <h4 className="font-semibold mb-1">Mobile First</h4>
                      <p className="text-sm text-muted-foreground">
                        Designed for smartphones
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Lock className="w-8 h-8 text-green-500 mb-2" />
                      <h4 className="font-semibold mb-1">Secure Wallet</h4>
                      <p className="text-sm text-muted-foreground">
                        Biometric authentication
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Instant money transfers between wallets
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Bill payments and airtime top-ups
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Savings goals and automated savings
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Cashless merchant payments via QR code
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">
                          Real-time exchange rates and conversions
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
                        <span className="font-bold text-2xl">$12,000</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Beta phase - Pre-revenue
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
                          Beta Users
                        </span>
                        <span className="font-bold text-2xl">500</span>
                      </div>
                      <Progress value={25} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Target: 2,000 beta users
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Daily Transactions
                        </span>
                        <span className="font-semibold">850</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Avg. Transaction Value
                        </span>
                        <span className="font-semibold">$45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total Volume (Beta)
                        </span>
                        <span className="font-semibold">$325K</span>
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
                          Beta Markets
                        </span>
                        <span className="font-semibold">Kenya, Nigeria</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Avg. Wallet Balance
                        </span>
                        <span className="font-semibold">$128</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          User Satisfaction
                        </span>
                        <span className="font-semibold">4.5/5</span>
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
                        <li>✓ Beta launch in Kenya</li>
                        <li>✓ Core wallet functionality</li>
                        <li>✓ Regulatory compliance documentation</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold">Q2 2024 - In Progress</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>⏳ Beta launch in Nigeria</li>
                        <li>⏳ KYC/AML implementation</li>
                        <li>⏳ Merchant payment integration</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <h4 className="font-semibold">Q3 2024 - Planned</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>○ Public launch (Kenya & Nigeria)</li>
                        <li>○ Savings & investment features</li>
                        <li>○ Agent network establishment</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-4 py-2">
                      <h4 className="font-semibold">Q4 2024 - Future</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>○ Expand to 3 more countries</li>
                        <li>○ Launch debit card program</li>
                        <li>○ Micro-lending integration</li>
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
                      <Link to="/reports/technical-specs">
                        <Download className="w-4 h-4 mr-2" />
                        Technical Specifications
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/reports/compliance-report">
                        <Download className="w-4 h-4 mr-2" />
                        Compliance & Regulatory Report
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

export default DigitalWalletDetail;
