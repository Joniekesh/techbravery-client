import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  Rocket,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProductRoadmap = () => {
  const downloadPDF = () => {
    const content = `
EXAFRIK SAAS SUITE - PRODUCT ROADMAP 2024-2025

Q1 2024 (Completed):
✓ Advanced inventory forecasting with AI
✓ Multi-warehouse management
✓ WhatsApp Business integration
✓ Custom report builder
✓ Mobile app v2.0 release

Q2 2024 (In Progress):
• E-commerce storefront integration
• Automated payroll processing
• Enhanced mobile money support (M-Pesa, Airtel Money)
• Real-time collaboration features
• API marketplace launch

Q3 2024 (Planned):
• AI-powered business insights
• Voice assistant integration
• Offline synchronization improvements
• Advanced workflow automation
• Multi-company management

Q4 2024 (Planned):
• Machine learning demand forecasting
• Blockchain-based supply chain tracking
• Advanced fraud detection
• International expansion tools
• Developer SDK release

Q1 2025 (Future):
• IoT device integration
• Predictive analytics suite
• Advanced AI chatbot for customer support
• Regional compliance automation
• Enterprise resource planning (ERP) modules

Technology Stack:
- Frontend: React, Next.js, React Native
- Backend: Node.js, Python, Go
- Database: PostgreSQL, Redis, MongoDB
- Cloud: AWS, Digital Ocean
- AI/ML: TensorFlow, PyTorch
- Mobile: React Native, Flutter

Development Priorities:
1. Customer-requested features (40%)
2. Market expansion features (30%)
3. Technical debt & optimization (20%)
4. Innovation & R&D (10%)

Contact: product@exafrik.com
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ExAfrik-Product-Roadmap.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const roadmapItems = [
    {
      quarter: "Q1 2024",
      status: "completed",
      items: [
        "Advanced inventory forecasting with AI",
        "Multi-warehouse management",
        "WhatsApp Business integration",
        "Custom report builder",
        "Mobile app v2.0 release",
      ],
    },
    {
      quarter: "Q2 2024",
      status: "in-progress",
      items: [
        "E-commerce storefront integration",
        "Automated payroll processing",
        "Enhanced mobile money support",
        "Real-time collaboration features",
        "API marketplace launch",
      ],
    },
    {
      quarter: "Q3 2024",
      status: "planned",
      items: [
        "AI-powered business insights",
        "Voice assistant integration",
        "Offline synchronization improvements",
        "Advanced workflow automation",
        "Multi-company management",
      ],
    },
    {
      quarter: "Q4 2024",
      status: "planned",
      items: [
        "Machine learning demand forecasting",
        "Blockchain-based supply chain tracking",
        "Advanced fraud detection",
        "International expansion tools",
        "Developer SDK release",
      ],
    },
    {
      quarter: "Q1 2025",
      status: "future",
      items: [
        "IoT device integration",
        "Predictive analytics suite",
        "Advanced AI chatbot",
        "Regional compliance automation",
        "Enterprise resource planning modules",
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "planned":
        return <Target className="w-5 h-5 text-yellow-500" />;
      case "future":
        return <Rocket className="w-5 h-5 text-purple-500" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-yellow-100 text-yellow-800";
      case "future":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
              <Badge className="mb-4">Product Strategy</Badge>
              <h1 className="text-4xl font-bold mb-4">
                Product{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Roadmap
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Strategic product development plan for 2024-2025
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
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">10</p>
                <p className="text-sm text-muted-foreground">Planned</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Rocket className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Future</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {roadmapItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <span>{item.quarter}</span>
                    </CardTitle>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace("-", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {item.items.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Development Priorities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Customer-requested features</span>
                    <span className="font-semibold">40%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Market expansion features</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Technical debt & optimization</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="bg-yellow-500 h-3 rounded-full"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Innovation & R&D</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className="bg-purple-500 h-3 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
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

export default ProductRoadmap;
