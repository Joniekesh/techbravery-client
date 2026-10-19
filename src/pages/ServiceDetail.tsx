import { useParams } from "react-router-dom";
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
import {
  ArrowRight,
  CheckCircle,
  Code,
  Smartphone,
  Rocket,
  Blocks,
  CreditCard,
  Brain,
  Server,
  Palette,
  Cloud,
  Puzzle,
  Shield,
  Database,
  Users,
  Clock,
  Star,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  IService,
  ServiceFeature,
  ServiceProcess,
  ServiceTechStack,
} from "@/types/service";
import Loader from "@/components/loader/Loader";
import { formatNumber } from "@/utils/formatNumber";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchService } from "@/redux/actions/serviceAction";
import * as Icons from "lucide-react";
import { useService } from "@/services";
import SEOHead from "@/components/SEOHead";

const ServiceDetail = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();

  const serviceState = useAppSelector((state) => state.service);
  // const data = serviceState.service;
  // const isLoading = serviceState.isLoading;

  // console.log("Current service from Redux:", data);

  const { data, isLoading, isError } = useService(slug);

  console.log("SERVICE FROM REACT QUERY", data);

  const renderLucideIcon = (
    icon: string,
    props?: React.ComponentProps<"svg">,
  ) => {
    const IconComponent = (Icons as any)[icon];

    if (!IconComponent) return null;

    return <IconComponent {...props} />;
  };

  // const currentService = serviceData[service || ""];

  useEffect(() => {
    dispatch(fetchService(slug));
  }, [slug, dispatch]);

  if (isLoading) return <Loader type="bounce" />;
  // if (isError) return <div>Failed to load services</div>;

  if (!data) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
            <Link to="/services">
              <Button>Back to Services</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // const IconComponent = currentService?.icon;

  return (
    <>
      <SEOHead
        title={`${data.title} | Techbravery`}
        description={data.description}
        url={`/services/${data.slug}`}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-accent/20 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-glow p-4 shadow-lg">
                  {renderLucideIcon(data.icon, {
                    className: "w-full h-full text-white",
                  })}
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {data.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {data.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow"
                  asChild
                >
                  <Link to="/quote">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Discuss Your Project</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-16 bg-gradient-to-br from-accent/20 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold mb-1">
                    {data.timeline} weeks
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Delivery Timeline
                  </div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold mb-1">
                    Starting from ${formatNumber(data.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Investment
                  </div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold mb-1">Dedicated Team</div>
                  <div className="text-sm text-muted-foreground">
                    Expert Developers
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Features */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                    <CardDescription>
                      What's included in our {data.title.toLowerCase()} service
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.features.map(
                        (feature: ServiceFeature, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>{feature.name}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Technologies */}
                <Card>
                  <CardHeader>
                    <CardTitle>Technologies We Use</CardTitle>
                    <CardDescription>
                      Modern tech stack for optimal performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {data.techStacks.map(
                        (tech: ServiceTechStack, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {tech.name}
                          </Badge>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Process */}
                <Card>
                  <CardHeader>
                    <CardTitle>Our Process</CardTitle>
                    <CardDescription>
                      How we deliver exceptional results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.process.map(
                        (step: ServiceProcess, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <span className="text-lg">{step.name}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Pricing Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Investment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold text-primary">
                      Starting from ${formatNumber(data.price)}
                    </div>
                    <div className="text-muted-foreground">
                      Timeline: {data.timeline} weeks
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-primary-glow"
                      asChild
                    >
                      <Link to="/quote">
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Have questions about this service? Our experts are here to
                      help.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Trust Indicators */}
                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm">98% Client Satisfaction</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">50+ Projects Delivered</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">Enterprise-grade Security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-purple-500" />
                      <span className="text-sm">Scalable Architecture</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDetail;
