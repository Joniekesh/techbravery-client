import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Shield,
  Zap,
  BarChart3,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Star,
} from "lucide-react";

const ExafrikP2pExchange = () => {
  const metrics = {
    totalUsers: "10,500+",
    monthlyVolume: "$2.5M",
    countries: "15",
    transactions: "45K+",
    uptime: "99.9%",
    avgTransactionTime: "< 2 mins",
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Bank-Grade Security",
      description:
        "Multi-layer security with 2FA, cold storage, and real-time fraud detection",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Lightning Fast",
      description:
        "Instant order matching and quick settlement across all supported currencies",
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Multi-Currency Support",
      description:
        "Trade in 25+ African currencies with competitive rates and low fees",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Community Driven",
      description:
        "Built for Africans by Africans with local payment methods integration",
    },
  ];

  const countries = [
    "Nigeria",
    "Kenya",
    "Ghana",
    "South Africa",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Zambia",
    "Botswana",
    "Ethiopia",
    "Morocco",
    "Egypt",
    "Senegal",
    "Ivory Coast",
    "Cameroon",
  ];

  const roadmap = [
    {
      quarter: "Q1 2024",
      milestone: "Launch in 5 new countries",
      status: "completed",
    },
    {
      quarter: "Q2 2024",
      milestone: "Mobile app release",
      status: "in-progress",
    },
    { quarter: "Q3 2024", milestone: "DeFi integration", status: "planned" },
    {
      quarter: "Q4 2024",
      milestone: "Cross-border remittances",
      status: "planned",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">
                Live Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                ExAfrik{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  P2P Exchange
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Africa's leading peer-to-peer cryptocurrency trading platform.
                Trade Bitcoin, Ethereum, and other cryptocurrencies with fellow
                Africans using local payment methods.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Visit Platform
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/investor">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Invest in ExAfrik
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-24 h-24 text-primary/60 mx-auto mb-4" />
                  <p className="text-muted-foreground">Platform Screenshot</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Platform Performance
            </h2>
            <p className="text-xl text-muted-foreground">
              Real-time metrics from our thriving ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.totalUsers}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.monthlyVolume}
                </div>
                <div className="text-sm text-muted-foreground">
                  Monthly Volume
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.countries}
                </div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.transactions}
                </div>
                <div className="text-sm text-muted-foreground">
                  Transactions
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">{metrics.uptime}</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.avgTransactionTime}
                </div>
                <div className="text-sm text-muted-foreground">Avg. Speed</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-accent/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose ExAfrik P2P?
            </h2>
            <p className="text-xl text-muted-foreground">
              Built specifically for the African market with local insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Coverage Across Africa
            </h2>
            <p className="text-xl text-muted-foreground">
              Currently serving users in {countries.length} African countries
            </p>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {countries.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg bg-secondary/20"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">{country}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary-glow/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Development Roadmap
            </h2>
            <p className="text-xl text-muted-foreground">
              Our journey towards becoming Africa's #1 P2P exchange
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant={
                          item.status === "completed"
                            ? "default"
                            : item.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.quarter}
                      </Badge>
                      {item.status === "completed" && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-2">{item.milestone}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {item.status.replace("-", " ")}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/5 to-primary-glow/5 border-primary/20">
              <CardContent className="pt-8 pb-8 text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  Join Our Growth Story
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  ExAfrik P2P Exchange is currently in Series A funding with a
                  target of $500K. Join 50+ investors already backing Africa's
                  digital financial future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                    asChild
                  >
                    <Link to="/investor">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Invest in ExAfrik
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/demo">Schedule Demo</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExafrikP2pExchange;
