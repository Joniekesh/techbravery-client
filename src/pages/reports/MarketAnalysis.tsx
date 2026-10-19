import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ArrowLeft,
  Globe,
  TrendingUp,
  Users,
  Target,
  Shield,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

const MarketAnalysis = () => {
  const downloadPDF = () => {
    const content = `
EXAFRIK SAAS SUITE - MARKET ANALYSIS

Executive Summary:
The African SME software market represents a $12B opportunity with exceptional growth potential driven by digital transformation, mobile-first adoption, and increasing entrepreneurship across the continent.

Market Size & Growth:
- Total Addressable Market (TAM): $12B
- Serviceable Addressable Market (SAM): $4.2B
- Serviceable Obtainable Market (SOM): $350M
- CAGR: 35% (2024-2029)
- Current penetration: 15% (strong upside potential)

Target Customer Segments:
1. Small Businesses (5-20 employees): 60% of market
   - Retail, hospitality, services
   - Average revenue: $50K-$250K
   - Tech adoption: Growing rapidly

2. Medium Enterprises (21-100 employees): 30% of market
   - Manufacturing, distribution, professional services
   - Average revenue: $250K-$2M
   - Tech adoption: Moderate to high

3. Micro-enterprises (1-4 employees): 10% of market
   - Freelancers, consultants, home businesses
   - Average revenue: Under $50K
   - Tech adoption: Entry-level

Geographic Focus:
Primary Markets (Year 1-2):
- Nigeria: 35% of TAM
- Kenya: 20% of TAM
- South Africa: 25% of TAM
- Ghana: 10% of TAM
- Egypt: 10% of TAM

Secondary Markets (Year 3-5):
- Ethiopia, Tanzania, Uganda, Rwanda, Côte d'Ivoire

Market Drivers:
1. Digital Transformation: 78% of SMEs plan to digitize operations
2. Mobile Penetration: 85% smartphone adoption among business owners
3. Payment Innovation: Mobile money usage growing 45% annually
4. Youth Entrepreneurship: 65% of new businesses led by under-35s
5. Government Support: 23 African countries have digital transformation initiatives

Competitive Landscape:
Direct Competitors:
- Zoho Books (Global): 12% market share, expensive for local market
- QuickBooks (Intuit): 8% market share, limited local features
- Local players: Fragmented, 15% combined share
- Our position: 2.5% market share, fastest growing

Competitive Advantages:
✓ Africa-specific features (mobile money, local tax, multi-currency)
✓ Offline-first architecture for connectivity challenges
✓ Local language support (12 languages vs 2-3 for competitors)
✓ Price point optimized for African purchasing power
✓ WhatsApp-first customer support
✓ Deep integration with local payment providers

Market Barriers:
1. Low digital literacy in some segments
2. Inconsistent internet connectivity
3. Price sensitivity
4. Trust in digital solutions
5. Payment infrastructure limitations

Our Solutions:
- Comprehensive onboarding and training
- Robust offline functionality
- Freemium model for entry
- Strong security and compliance
- Partnership with trusted local brands

Customer Acquisition Cost (CAC): $180
Customer Lifetime Value (LTV): $2,800
LTV/CAC Ratio: 15.5x
Payback Period: 3.2 months

Market Trends:
• AI/ML adoption in business tools growing 120% annually
• Voice interfaces gaining traction (65% prefer voice over typing)
• Integration marketplace becoming essential
• API-first architecture now table stakes
• Sustainability features increasingly important

5-Year Market Projection:
2024: $12B → 15,000 customers
2025: $16.2B → 35,000 customers
2026: $21.8B → 75,000 customers
2027: $29.4B → 150,000 customers
2028: $39.7B → 280,000 customers

Contact: research@exafrik.com
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ExAfrik-Market-Analysis.pdf";
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
              <Badge className="mb-4">Market Research</Badge>
              <h1 className="text-4xl font-bold mb-4">
                Market{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Analysis
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive market research and competitive analysis
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
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <Globe className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-2xl font-bold mb-2">$12B</h3>
                <p className="text-muted-foreground">Total Market Size</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">35%</h3>
                <p className="text-muted-foreground">Annual Growth Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Users className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold mb-2">450M</h3>
                <p className="text-muted-foreground">Target SMEs in Africa</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Market Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  The African SME software market represents an exceptional
                  opportunity with strong fundamentals and significant white
                  space for innovation and market capture.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <h4 className="font-semibold mb-2">TAM</h4>
                    <p className="text-2xl font-bold text-primary">$12B</p>
                    <p className="text-sm text-muted-foreground">
                      Total Addressable
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <h4 className="font-semibold mb-2">SAM</h4>
                    <p className="text-2xl font-bold text-blue-600">$4.2B</p>
                    <p className="text-sm text-muted-foreground">
                      Serviceable Addressable
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <h4 className="font-semibold mb-2">SOM</h4>
                    <p className="text-2xl font-bold text-green-600">$350M</p>
                    <p className="text-sm text-muted-foreground">
                      Serviceable Obtainable
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Target Customer Segments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">
                        Small Businesses (5-20 employees)
                      </h4>
                      <Badge>60% of market</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Retail, hospitality, services sectors
                    </p>
                    <div className="grid md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Avg Revenue:
                        </span>
                        <span className="font-semibold ml-2">$50K-$250K</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Tech Adoption:
                        </span>
                        <span className="font-semibold ml-2">
                          Growing rapidly
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Pain Point:
                        </span>
                        <span className="font-semibold ml-2">
                          Manual processes
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">
                        Medium Enterprises (21-100 employees)
                      </h4>
                      <Badge>30% of market</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Manufacturing, distribution, professional services
                    </p>
                    <div className="grid md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Avg Revenue:
                        </span>
                        <span className="font-semibold ml-2">$250K-$2M</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Tech Adoption:
                        </span>
                        <span className="font-semibold ml-2">
                          Moderate to high
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Pain Point:
                        </span>
                        <span className="font-semibold ml-2">
                          Fragmented systems
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">
                        Micro-enterprises (1-4 employees)
                      </h4>
                      <Badge>10% of market</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Freelancers, consultants, home businesses
                    </p>
                    <div className="grid md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Avg Revenue:
                        </span>
                        <span className="font-semibold ml-2">Under $50K</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Tech Adoption:
                        </span>
                        <span className="font-semibold ml-2">Entry-level</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Pain Point:
                        </span>
                        <span className="font-semibold ml-2">
                          Affordability
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Geographic Market Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-3">
                  Primary Markets (Year 1-2)
                </h4>
                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Nigeria</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>South Africa</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Kenya</span>
                      <span className="font-semibold">20%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Ghana</span>
                      <span className="font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Egypt</span>
                      <span className="font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold mb-2">
                  Secondary Markets (Year 3-5)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Ethiopia, Tanzania, Uganda, Rwanda, Côte d'Ivoire
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Competitive Landscape
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">ExAfrik (Us)</h4>
                      <Badge className="bg-primary text-primary-foreground">
                        2.5% share
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Fastest growing, Africa-focused
                    </p>
                    <div className="text-sm">
                      <strong>Advantages:</strong> Local features,
                      offline-first, affordable pricing, local language support
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Zoho Books</h4>
                      <Badge variant="outline">12% share</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Global player, enterprise focus
                    </p>
                    <div className="text-sm">
                      <strong>Weaknesses:</strong> Expensive for local market,
                      limited Africa-specific features
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">QuickBooks (Intuit)</h4>
                      <Badge variant="outline">8% share</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Established brand, accounting focus
                    </p>
                    <div className="text-sm">
                      <strong>Weaknesses:</strong> Limited local customization,
                      connectivity requirements
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Local Players</h4>
                      <Badge variant="outline">15% combined</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Fragmented market, single-country focus
                    </p>
                    <div className="text-sm">
                      <strong>Weaknesses:</strong> Limited resources, narrow
                      feature sets, poor UX
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Unit Economics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <p className="text-3xl font-bold text-primary">$180</p>
                    <p className="text-sm text-muted-foreground">
                      Customer Acquisition Cost
                    </p>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">$2,800</p>
                    <p className="text-sm text-muted-foreground">
                      Customer Lifetime Value
                    </p>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">15.5x</p>
                    <p className="text-sm text-muted-foreground">
                      LTV/CAC Ratio
                    </p>
                  </div>
                  <div className="text-center p-4 bg-secondary/20 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">3.2</p>
                    <p className="text-sm text-muted-foreground">
                      Payback (months)
                    </p>
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

export default MarketAnalysis;
