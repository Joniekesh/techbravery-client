import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Users,
  Globe,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TextTabs } from "@/components/shared/TextTabs";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("All");

  const projects = [
    {
      id: 1,
      title: "BankPro Digital Transformation",
      client: "Leading African Bank",
      category: "Fintech",
      industry: "Banking",
      duration: "8 months",
      team: "12 developers",
      image: "/api/placeholder/600/400",
      description:
        "Complete digital banking overhaul with mobile-first approach, serving 2M+ customers across 8 countries.",
      challenge:
        "Legacy banking systems were causing 40% customer drop-off rates and limiting expansion opportunities.",
      solution:
        "Built a modern React Native mobile app, Node.js backend, and integrated 15+ payment gateways with real-time fraud detection.",
      results: [
        { metric: "Customer Satisfaction", value: "94%", change: "+45%" },
        { metric: "Transaction Speed", value: "2.3s", change: "-78%" },
        { metric: "Mobile Adoption", value: "89%", change: "+156%" },
        { metric: "Cost Reduction", value: "35%", change: "-35%" },
      ],
      techStack: [
        "React Native",
        "Node.js",
        "PostgreSQL",
        "AWS",
        "Kubernetes",
        "Redis",
      ],
      testimonial:
        "Techbravery transformed our entire digital presence. Our mobile app now leads the market in user experience.",
      testimonialAuthor: "Chief Technology Officer",
    },
    {
      id: 2,
      title: "AgriConnect Marketplace",
      client: "Pan-African Agri Startup",
      category: "AgriTech",
      industry: "Agriculture",
      duration: "6 months",
      team: "8 developers",
      image: "/api/placeholder/600/400",
      description:
        "Farmer-to-market platform connecting 50K+ farmers with buyers across 12 African countries.",
      challenge:
        "Smallholder farmers had no direct access to markets, leading to 60% post-harvest losses.",
      solution:
        "Created a multi-platform ecosystem with mobile apps for farmers, web dashboard for buyers, and IoT integration.",
      results: [
        { metric: "Farmer Income", value: "+127%", change: "+127%" },
        { metric: "Market Access", value: "12 countries", change: "+1200%" },
        { metric: "Waste Reduction", value: "43%", change: "-43%" },
        { metric: "Transaction Volume", value: "$2.8M", change: "+280%" },
      ],
      techStack: [
        "Flutter",
        "Django",
        "PostgreSQL",
        "AWS IoT",
        "Stripe",
        "Twilio",
      ],
      testimonial:
        "The platform revolutionized how we connect with farmers. Our reach expanded 10x in just 6 months.",
      testimonialAuthor: "Founder & CEO",
    },
    {
      id: 3,
      title: "EduStream Learning Platform",
      client: "African Education Ministry",
      category: "EdTech",
      industry: "Education",
      duration: "10 months",
      team: "15 developers",
      image: "/api/placeholder/600/400",
      description:
        "National e-learning platform serving 500K+ students with AI-powered personalized learning paths.",
      challenge:
        "Remote learning infrastructure was non-existent, affecting 2M+ students during pandemic.",
      solution:
        "Built scalable learning management system with offline capabilities, AI tutoring, and multi-language support.",
      results: [
        { metric: "Student Engagement", value: "91%", change: "+91%" },
        { metric: "Learning Outcomes", value: "+67%", change: "+67%" },
        { metric: "Teacher Adoption", value: "84%", change: "+84%" },
        { metric: "Platform Uptime", value: "99.9%", change: "+99.9%" },
      ],
      techStack: [
        "Vue.js",
        "Python",
        "MongoDB",
        "TensorFlow",
        "Docker",
        "CloudFlare",
      ],
      testimonial:
        "This platform kept our education system running during crisis and improved learning outcomes significantly.",
      testimonialAuthor: "Minister of Education",
    },
    {
      id: 4,
      title: "HealthLink Telemedicine",
      client: "Regional Healthcare Network",
      category: "HealthTech",
      industry: "Healthcare",
      duration: "9 months",
      team: "10 developers",
      image: "/api/placeholder/600/400",
      description:
        "Telemedicine platform connecting patients in rural areas with specialists, serving 100K+ consultations.",
      challenge:
        "85% of rural population had no access to specialist healthcare within 200km radius.",
      solution:
        "Developed HIPAA-compliant telemedicine platform with video calls, prescription management, and medical records.",
      results: [
        { metric: "Patient Access", value: "+340%", change: "+340%" },
        { metric: "Consultation Cost", value: "-67%", change: "-67%" },
        { metric: "Response Time", value: "15 min", change: "-85%" },
        { metric: "Patient Satisfaction", value: "96%", change: "+96%" },
      ],
      techStack: ["React", "Express.js", "MongoDB", "WebRTC", "FHIR", "Stripe"],
      testimonial:
        "Rural patients now have access to world-class healthcare. This platform saved countless lives.",
      testimonialAuthor: "Medical Director",
    },
    {
      id: 5,
      title: "RetailPro Inventory System",
      client: "Major Retail Chain",
      category: "RetailTech",
      industry: "Retail",
      duration: "5 months",
      team: "6 developers",
      image: "/api/placeholder/600/400",
      description:
        "AI-powered inventory management system for 200+ stores with predictive analytics and automated ordering.",
      challenge:
        "Manual inventory management led to 30% stockouts and $2M+ in lost sales annually.",
      solution:
        "Built intelligent inventory system with machine learning predictions, real-time tracking, and automated reordering.",
      results: [
        { metric: "Stockout Reduction", value: "87%", change: "-87%" },
        { metric: "Inventory Turnover", value: "+45%", change: "+45%" },
        { metric: "Cost Savings", value: "$1.8M", change: "+1.8M" },
        { metric: "Efficiency Gain", value: "156%", change: "+156%" },
      ],
      techStack: [
        "Angular",
        "Spring Boot",
        "MySQL",
        "Apache Kafka",
        "TensorFlow",
        "Azure",
      ],
      testimonial:
        "Our inventory is now completely automated. We've eliminated stockouts and increased profits by 45%.",
      testimonialAuthor: "Operations Director",
    },
    {
      id: 6,
      title: "CryptoTrade Exchange",
      client: "Cryptocurrency Startup",
      category: "Blockchain",
      industry: "Fintech",
      duration: "7 months",
      team: "9 developers",
      image: "/api/placeholder/600/400",
      description:
        "High-frequency cryptocurrency exchange with advanced trading features and institutional-grade security.",
      challenge:
        "Building a scalable, secure exchange capable of handling 100K+ transactions per second.",
      solution:
        "Architected microservices-based exchange with real-time matching engine, cold storage, and advanced analytics.",
      results: [
        { metric: "Trading Volume", value: "$50M", change: "+50M" },
        { metric: "Transaction Speed", value: "1.2ms", change: "-98%" },
        { metric: "Security Incidents", value: "0", change: "0" },
        { metric: "User Growth", value: "25K", change: "+25K" },
      ],
      techStack: [
        "Go",
        "Rust",
        "PostgreSQL",
        "Redis",
        "Kubernetes",
        "Blockchain",
      ],
      testimonial:
        "The exchange handles massive volume flawlessly. Security and performance exceed all expectations.",
      testimonialAuthor: "Chief Executive Officer",
    },
  ];

  const categories = [
    { value: "All", label: "All" },
    { value: "Fintech", label: "Fintech" },
    { value: "AgriTech", label: "AgriTech" },
    { value: "EdTech", label: "EdTech" },
    { value: "HealthTech", label: "HealthTech" },
    { value: "RetailTech", label: "RetailTech" },
    { value: "Blockchain", label: "Blockchain" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Showcasing transformative digital solutions that have driven real
              business impact across Africa. From fintech innovations to
              agricultural platforms, explore our success stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow"
                asChild
              >
                <Link to="/quote">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Start Your Project
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  // Create a dummy PDF blob and trigger download
                  const pdfContent = `
TechBravery Portfolio

Company Overview:
TechBravery is a leading software development company specializing in custom solutions for African businesses.

Our Projects:
• BankPro Digital Transformation - Complete banking overhaul with 94% satisfaction
• AgriConnect Marketplace - Connected 50K+ farmers across 12 countries
• EduStream Learning Platform - Served 500K+ students with AI-powered learning
• HealthLink Telemedicine - 100K+ consultations with 96% patient satisfaction
• RetailPro Inventory System - 87% stockout reduction and $1.8M savings
• CryptoTrade Exchange - $50M trading volume with zero security incidents

Technologies: React, Node.js, Flutter, Python, AWS, Blockchain

Contact: info@techbravery.com | +234 800 123 4567
                  `;
                  const blob = new Blob([pdfContent], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "TechBravery-Portfolio.txt";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                Download Portfolio PDF
              </Button>
            </div>
          </motion.div>

          {/* Portfolio Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Delivered
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">2M+</div>
                <div className="text-sm text-muted-foreground">
                  Users Impacted
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">25</div>
                <div className="text-sm text-muted-foreground">
                  Countries Served
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">
                  Client Satisfaction
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
            //  defaultValue="All"
            //  className="w-full"
          >
            <TextTabs tabs={categories} />

            {/* <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 mb-12 h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="text-xs md:text-sm p-2 h-auto whitespace-nowrap"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList> */}

            {categories.map((category) => (
              <TabsContent key={category.value} value={category.value}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-12"
                >
                  {projects
                    .filter(
                      (project) =>
                        category.value === "All" ||
                        project.category === category.value,
                    )
                    .map((project, index) => (
                      <motion.div key={project.id} variants={itemVariants}>
                        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                          <div
                            className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                          >
                            {/* Image */}
                            <div
                              className={`relative h-64 lg:h-auto bg-gradient-to-br from-primary/20 to-primary-glow/20 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ExternalLink className="w-8 h-8 text-primary" />
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Project Screenshot
                                  </p>
                                </div>
                              </div>
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-gradient-to-r from-primary to-primary-glow">
                                  {project.category}
                                </Badge>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-6">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">
                                  {project.title}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                  {project.description}
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {project.duration}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {project.team}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Globe className="w-4 h-4" />
                                    {project.industry}
                                  </div>
                                </div>
                              </div>

                              {/* Results */}
                              <div className="grid grid-cols-2 gap-4">
                                {project.results
                                  .slice(0, 4)
                                  .map((result, idx) => (
                                    <div
                                      key={idx}
                                      className="text-center p-3 bg-accent/50 rounded-lg"
                                    >
                                      <div className="text-lg font-bold text-primary">
                                        {result.value}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {result.metric}
                                      </div>
                                    </div>
                                  ))}
                              </div>

                              {/* Tech Stack */}
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {project.techStack.map((tech, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Testimonial */}
                              <div className="bg-accent/30 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm italic mb-2">
                                      "{project.testimonial}"
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      — {project.testimonialAuthor}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* CTA */}
                              <Button
                                className="w-full"
                                variant="outline"
                                asChild
                              >
                                <Link to={`/case-study/${project.id}`}>
                                  View Full Case Study
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-primary-glow/5 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Build Your Success Story?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join 50+ successful clients who have transformed their
                  businesses with our solutions. Let's discuss how we can help
                  you achieve similar results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Download Portfolio PDF
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

export default Portfolio;
