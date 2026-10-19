import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Smartphone,
  Rocket,
  ShieldCheck,
  Wallet,
  Brain,
  Cloud,
  Palette,
  Settings,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const services = [
  {
    icon: Code,
    title: "Web App Development",
    description:
      "Custom web applications built with modern frameworks for optimal performance and scalability.",
    techStack: ["React", "Next.js", "NestJS", "TypeScript", "PostgreSQL"],
    features: [
      "Responsive Design",
      "API Integration",
      "Performance Optimization",
      "SEO Ready",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
    techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
    features: [
      "Cross-Platform",
      "Native Performance",
      "Push Notifications",
      "App Store Ready",
    ],
  },
  {
    icon: Rocket,
    title: "MVP Launch Services",
    description:
      "Rapid prototyping and MVP development to validate your ideas and get to market faster.",
    techStack: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    features: [
      "Quick Deployment",
      "Scalable Architecture",
      "User Testing",
      "Market Validation",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Solutions",
    description:
      "Secure blockchain applications, smart contracts, and decentralized platforms for Web3.",
    techStack: ["Solidity", "Web3.js", "Ethereum", "Polygon", "IPFS"],
    features: [
      "Smart Contracts",
      "DeFi Integration",
      "NFT Platforms",
      "Token Development",
    ],
  },
  {
    icon: Wallet,
    title: "Fintech & Wallet Systems",
    description:
      "Secure financial applications with payment processing, digital wallets, and banking solutions.",
    techStack: ["Node.js", "PostgreSQL", "Stripe", "PayPal", "Blockchain"],
    features: [
      "Payment Gateway",
      "Multi-Currency",
      "Security Compliance",
      "Transaction History",
    ],
  },
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Intelligent applications powered by machine learning and artificial intelligence technologies.",
    techStack: ["Python", "TensorFlow", "OpenAI", "FastAPI", "Docker"],
    features: [
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Analytics",
      "Chatbots",
    ],
  },
  {
    icon: Cloud,
    title: "DevOps & Infrastructure",
    description:
      "Scalable cloud infrastructure, CI/CD pipelines, and deployment automation for reliable operations.",
    techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    features: ["Auto Scaling", "Load Balancing", "Monitoring", "Security"],
  },
  {
    icon: Palette,
    title: "UI/UX & Prototyping",
    description:
      "User-centered design and interactive prototypes that deliver exceptional user experiences.",
    techStack: ["Figma", "Adobe XD", "Framer", "Principle", "InVision"],
    features: [
      "User Research",
      "Wireframing",
      "Interactive Prototypes",
      "Design Systems",
    ],
  },
  {
    icon: Settings,
    title: "SaaS Development",
    description:
      "Complete Software-as-a-Service platforms with subscription management and multi-tenancy.",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    features: [
      "Multi-Tenancy",
      "Subscription Billing",
      "Admin Dashboard",
      "Analytics",
    ],
  },
  {
    icon: Database,
    title: "API Integrations",
    description:
      "Seamless third-party integrations and custom API development for enhanced functionality.",
    techStack: ["REST", "GraphQL", "WebSocket", "Microservices", "API Gateway"],
    features: [
      "RESTful APIs",
      "Real-time Data",
      "Third-party Integration",
      "Documentation",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Solutions",
    description:
      "Comprehensive security audits, threat assessment, and advanced protection systems tailored for African businesses and emerging markets.",
    techStack: [
      "ISO 27001",
      "NIST Framework",
      "Penetration Testing",
      "SIEM",
      "Zero Trust",
    ],
    features: [
      "Security Audits",
      "Threat Intelligence",
      "Compliance Management",
      "Incident Response",
    ],
  },
];

const Services = () => {
  return (
    <>
      <SEOHead
        title="Software Development Services | TechBravery"
        description="Explore TechBravery's custom software development, web and mobile applications, SaaS engineering, and AI integration services."
        url="/services"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive software development services to transform your
              ideas into powerful digital solutions. From concept to deployment,
              we build scalable applications that drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Link to="/quote">Get Custom Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">
                        Key Features
                      </h4>
                      <ul className="text-sm space-y-1">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button size="sm" className="flex-1" asChild>
                        <Link to="/quote">Request Service</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/contact">Learn More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-glow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Let's discuss your requirements and create a custom solution that
              exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                // variant="secondary"
                className="bg-gradient-to-r from-primary to-primary-glow"
              >
                <Link to="/quote">Get Free Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                // className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
