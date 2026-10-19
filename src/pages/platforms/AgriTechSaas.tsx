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
  Sprout,
  Cloud,
  BarChart3,
  Truck,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Star,
  MapPin,
  Calendar,
} from "lucide-react";

const AgriTechSaas = () => {
  const metrics = {
    totalFarms: "5,200+",
    monthlyRevenue: "$850K",
    countries: "8",
    cropYield: "+35%",
    waterSaved: "2.3M L",
    carbonOffset: "1,500 T",
  };

  const features = [
    {
      icon: <Sprout className="w-6 h-6 text-primary" />,
      title: "Smart Crop Planning",
      description:
        "AI-powered crop recommendations based on soil, weather, and market data",
    },
    {
      icon: <Cloud className="w-6 h-6 text-primary" />,
      title: "Weather Intelligence",
      description:
        "Hyperlocal weather forecasting with farming-specific insights and alerts",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Yield Analytics",
      description:
        "Track and optimize crop yields with detailed performance analytics",
    },
    {
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: "Supply Chain",
      description:
        "Connect directly with buyers and optimize your distribution network",
    },
  ];

  const success_stories = [
    {
      farmer: "John Mbeki",
      location: "Kenya",
      crop: "Maize",
      improvement: "+45% yield increase",
      story:
        "Using AgriTech's soil analysis and weather predictions, John increased his maize yield by 45% while reducing water usage by 30%.",
    },
    {
      farmer: "Amina Hassan",
      location: "Nigeria",
      crop: "Tomatoes",
      improvement: "+60% revenue boost",
      story:
        "Connected directly with urban buyers through our platform, eliminating middlemen and increasing profit margins significantly.",
    },
    {
      farmer: "Peter Mandela",
      location: "South Africa",
      crop: "Grapes",
      improvement: "+25% efficiency",
      story:
        "Smart irrigation scheduling based on weather data helped reduce water costs while maintaining grape quality for wine production.",
    },
  ];

  const countries = [
    "Kenya",
    "Nigeria",
    "Ghana",
    "South Africa",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Ethiopia",
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
                Growing Fast
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AgriTech{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  SaaS Platform
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Empowering African farmers with smart agriculture solutions.
                From soil analysis to market connections, our platform is
                transforming how farming is done across the continent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Try Platform
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/investor">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Invest in AgriTech
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Sprout className="w-24 h-24 text-green-600 mx-auto mb-4" />
                  <p className="text-green-800">Platform Demo</p>
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
              Impact & Performance
            </h2>
            <p className="text-xl text-muted-foreground">
              Transforming agriculture across Africa with measurable results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.totalFarms}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Farms
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.monthlyRevenue}
                </div>
                <div className="text-sm text-muted-foreground">
                  Monthly Revenue
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.countries}
                </div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1 text-green-600">
                  {metrics.cropYield}
                </div>
                <div className="text-sm text-muted-foreground">
                  Yield Increase
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Cloud className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1 text-blue-600">
                  {metrics.waterSaved}
                </div>
                <div className="text-sm text-muted-foreground">Water Saved</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Sprout className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1 text-green-600">
                  {metrics.carbonOffset}
                </div>
                <div className="text-sm text-muted-foreground">CO₂ Offset</div>
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
              Platform Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive tools for modern African farming
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

      {/* Success Stories */}
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
              Farmer Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from farmers using our platform
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {success_stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-white font-bold">
                        {story.farmer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {story.farmer}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {story.location} • {story.crop}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="w-fit bg-green-100 text-green-800">
                      {story.improvement}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">
                      "{story.story}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Coverage */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Growing Across Africa
            </h2>
            <p className="text-xl text-muted-foreground">
              Currently serving farmers in {countries.length} African countries
            </p>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {countries.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200"
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
                  Feed Africa's Future
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  AgriTech SaaS is revolutionizing African agriculture. Join our
                  Seed round funding with a target of $250K to scale across 15
                  new countries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                    asChild
                  >
                    <Link to="/investor">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Invest in AgriTech
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/demo">
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Demo
                    </Link>
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

export default AgriTechSaas;
