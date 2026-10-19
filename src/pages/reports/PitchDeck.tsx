import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ArrowLeft,
  Rocket,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Lightbulb,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

const PitchDeck = () => {
  const downloadPDF = () => {
    const content = `
EXAFRIK SAAS SUITE - PITCH DECK

Company Overview:
ExAfrik SaaS Suite is revolutionizing business management for African SMEs by providing affordable, locally-adapted software solutions.

Market Opportunity:
- Total Addressable Market: $12B across Sub-Saharan Africa
- 450M SMEs in Africa requiring digital transformation
- Only 15% currently using business management software
- Growing at 35% annually

Product:
Comprehensive SaaS platform including:
- Accounting & Financial Management
- Inventory & Supply Chain
- Customer Relationship Management (CRM)
- Human Resource Management
- Business Analytics & Reporting

Traction:
- 1,800 active customers
- $52,000 monthly recurring revenue
- 28% month-over-month growth
- 94% customer retention rate
- Average customer saves 15 hours/week

Business Model:
- Subscription-based: $49-$199/month
- Freemium entry tier
- Enterprise custom pricing
- Average LTV: $2,800
- CAC: $180 (15.5x LTV/CAC ratio)

Competition:
We differentiate through:
- Africa-specific features (mobile money, local tax)
- Offline-first architecture for low connectivity areas
- Multi-currency support (15 African currencies)
- Local language support (12 languages)
- 24/7 WhatsApp support

Go-to-Market Strategy:
- Digital marketing via social media
- Partnership with banks and telecom providers
- Community-driven growth through SME associations
- Referral program (20% of new customers)

Team:
- CEO: Dr. Amara Okafor (Ex-McKinsey, MIT MBA)
- CTO: Kwame Mensah (Former Google engineer)
- Head of Product: Fatima Hassan (15+ years product)
- 25 team members across 5 African countries

Financial Projections (3-year):
Year 1: $624K revenue, -$200K EBITDA
Year 2: $2.1M revenue, $100K EBITDA
Year 3: $5.8M revenue, $1.2M EBITDA

Funding Ask:
- Seeking: $2M Seed Round
- Use of funds: 40% Product, 30% Sales/Marketing, 20% Operations, 10% Reserves
- Pre-money valuation: $8M
- Milestones: Break-even by Q4 2024, 10,000 customers by end of 2025

Contact:
invest@exafrik.com | www.exafrik.com
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ExAfrik-SaaS-Suite-Pitch-Deck.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/investor-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4">Investor Document</Badge>
              <h1 className="text-4xl font-bold mb-4">
                ExAfrik SaaS Suite{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Pitch Deck
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive investment overview and business strategy
              </p>
            </div>
            <Button onClick={downloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <Rocket className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-2xl font-bold mb-2">$2M</h3>
                <p className="text-muted-foreground">Funding Round</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">28%</h3>
                <p className="text-muted-foreground">MoM Growth</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Users className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">1,800</h3>
                <p className="text-muted-foreground">Active Customers</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  ExAfrik SaaS Suite is revolutionizing business management for
                  African SMEs by providing affordable, locally-adapted software
                  solutions that address the unique challenges of operating in
                  African markets.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Mission</h4>
                    <p className="text-muted-foreground">
                      Empower African SMEs with world-class business management
                      tools adapted for local markets
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Vision</h4>
                    <p className="text-muted-foreground">
                      Become the #1 business software platform for SMEs across
                      Africa by 2027
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Market Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="text-2xl font-bold">$12B</p>
                      <p className="text-sm text-muted-foreground">
                        Total Addressable Market
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="text-2xl font-bold">450M</p>
                      <p className="text-sm text-muted-foreground">
                        SMEs in Africa
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="text-2xl font-bold">35%</p>
                      <p className="text-sm text-muted-foreground">
                        Annual Growth Rate
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Only 15% of African SMEs currently use business management
                    software, representing a massive opportunity for digital
                    transformation and market penetration.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Product Suite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Core Modules</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>✓ Accounting & Financial Management</li>
                      <li>✓ Inventory & Supply Chain</li>
                      <li>✓ Customer Relationship Management</li>
                      <li>✓ Human Resource Management</li>
                      <li>✓ Business Analytics & Reporting</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Differentiators</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>✓ Mobile money integration</li>
                      <li>✓ Offline-first architecture</li>
                      <li>✓ Multi-currency (15 currencies)</li>
                      <li>✓ Local language support (12 languages)</li>
                      <li>✓ 24/7 WhatsApp support</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Traction & Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <p className="text-3xl font-bold text-primary">1,800</p>
                    <p className="text-sm text-muted-foreground">
                      Active Customers
                    </p>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">$52K</p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Revenue
                    </p>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">94%</p>
                    <p className="text-sm text-muted-foreground">
                      Retention Rate
                    </p>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">15.5x</p>
                    <p className="text-sm text-muted-foreground">
                      LTV/CAC Ratio
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Projections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Metric</th>
                        <th className="text-right p-3">Year 1</th>
                        <th className="text-right p-3">Year 2</th>
                        <th className="text-right p-3">Year 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">Revenue</td>
                        <td className="text-right p-3">$624K</td>
                        <td className="text-right p-3">$2.1M</td>
                        <td className="text-right p-3">$5.8M</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">EBITDA</td>
                        <td className="text-right p-3 text-red-600">-$200K</td>
                        <td className="text-right p-3 text-green-600">$100K</td>
                        <td className="text-right p-3 text-green-600">$1.2M</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Customers</td>
                        <td className="text-right p-3">3,000</td>
                        <td className="text-right p-3">7,500</td>
                        <td className="text-right p-3">15,000</td>
                      </tr>
                      <tr>
                        <td className="p-3">Team Size</td>
                        <td className="text-right p-3">35</td>
                        <td className="text-right p-3">60</td>
                        <td className="text-right p-3">95</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Investment Ask
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
                  <h3 className="text-2xl font-bold mb-2">
                    Seeking $2M Seed Round
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Pre-money valuation: $8M
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Use of Funds</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 40% Product Development</li>
                        <li>• 30% Sales & Marketing</li>
                        <li>• 20% Operations</li>
                        <li>• 10% Reserves</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Milestones</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Break-even by Q4 2024</li>
                        <li>• 10,000 customers by end of 2025</li>
                        <li>• Expansion to 10 African countries</li>
                        <li>• Series A readiness by 2026</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PitchDeck;
