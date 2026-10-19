import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Wallet,
  Shield,
  CreditCard,
  TrendingUp,
  Lock,
  Smartphone,
  Globe,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const FintechDetail = () => {
  const features = [
    {
      icon: Wallet,
      title: "Digital Wallet Solutions",
      description:
        "Secure digital wallets with multi-currency support and real-time transactions.",
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description:
        "Seamless payment gateway integration with multiple payment methods.",
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description:
        "Bank-level encryption and compliance with international financial standards.",
    },
    {
      icon: TrendingUp,
      title: "Financial Analytics",
      description:
        "Real-time reporting and analytics for transaction monitoring and insights.",
    },
    {
      icon: Lock,
      title: "KYC/AML Integration",
      description:
        "Automated identity verification and anti-money laundering checks.",
    },
    {
      icon: Smartphone,
      title: "Mobile Banking",
      description:
        "Full-featured mobile banking applications for iOS and Android.",
    },
  ];

  const technologies = [
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "Stripe API",
    "Plaid",
    "Dwolla",
    "Blockchain",
    "AWS KMS",
  ];

  const useCases = [
    {
      title: "Digital Banking Platform",
      description:
        "Complete online banking solution with account management, transfers, and bill payments.",
      benefits: [
        "Real-time transactions",
        "Multi-currency support",
        "Advanced security features",
      ],
    },
    {
      title: "P2P Payment System",
      description:
        "Peer-to-peer payment platform enabling instant money transfers between users.",
      benefits: [
        "Instant transfers",
        "Low transaction fees",
        "Mobile-first design",
      ],
    },
    {
      title: "Merchant Payment Gateway",
      description:
        "Comprehensive payment processing solution for e-commerce businesses.",
      benefits: [
        "Multiple payment methods",
        "Fraud detection",
        "Settlement automation",
      ],
    },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$15,000",
      description: "Basic fintech solution",
      features: [
        "Digital wallet implementation",
        "Basic payment processing",
        "Standard security features",
        "Mobile app (1 platform)",
        "3 months support",
      ],
    },
    {
      name: "Professional",
      price: "$35,000",
      description: "Advanced fintech platform",
      features: [
        "Multi-currency wallet system",
        "Advanced payment gateway",
        "KYC/AML integration",
        "iOS & Android apps",
        "Real-time analytics",
        "6 months support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Full-scale fintech ecosystem",
      features: [
        "Complete banking platform",
        "Blockchain integration",
        "Custom compliance solutions",
        "Multi-platform apps",
        "Advanced fraud detection",
        "Dedicated support team",
        "12 months support",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/10 w-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-col">
          <div className="flex items-center gap-3 mb-6 flex-col">
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col items-center">
              <Badge variant="secondary" className="mb-2">
                Financial Technology
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">
                Fintech &{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Wallet Systems
                </span>
              </h1>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            Build secure, scalable financial technology solutions that
            revolutionize digital payments, banking, and financial services
            across Africa and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Link to="/quote">Get Custom Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Fintech{" "}
              <span className="text-primary">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build a world-class financial technology
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardHeader>
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-br from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real-World <span className="text-primary">Applications</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our fintech solutions solve real business challenges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="hover:shadow-elegant transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <Badge variant="outline">Use Case {index + 1}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {useCase.title}
                  </CardTitle>
                  <CardDescription className="text-base mb-4">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground uppercase">
                      Key Benefits
                    </p>
                    {useCase.benefits.map((benefit, bIndex) => (
                      <div key={bIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technology <span className="text-primary">Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Built with cutting-edge technologies for maximum performance and
              security
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-2 text-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-br from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Investment <span className="text-primary">Options</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the package that fits your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-elegant transition-all duration-300 ${
                  tier.popular ? "border-primary shadow-lg scale-105" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-base">
                    {tier.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="text-muted-foreground ml-2">
                        starting
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                  >
                    <Link to="/quote">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BarChart3 className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Financial Services?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's build a secure, scalable fintech solution tailored to your
            needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/quote">Request Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/portfolio">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FintechDetail;
