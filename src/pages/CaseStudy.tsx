import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  Users,
  Clock,
  Globe,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const CaseStudy = () => {
  const { id } = useParams();

  const caseStudyData = {
    1: {
      title: "BankPro Digital Transformation",
      client: "Leading African Bank",
      category: "Fintech",
      overview:
        "Complete digital banking overhaul with mobile-first approach, serving 2M+ customers across 8 countries.",
      challenge:
        "The bank's legacy systems were causing significant customer drop-offs and operational inefficiencies. With 40% of customers abandoning transactions midway and limited scalability for expansion into new markets, a complete digital transformation was urgently needed.",
      solution:
        "We architected and developed a comprehensive digital banking ecosystem including a React Native mobile application, robust Node.js backend infrastructure, and integration with 15+ payment gateways. The solution featured real-time fraud detection, biometric authentication, and seamless cross-border transactions.",
      results: [
        {
          metric: "Customer Satisfaction",
          before: "49%",
          after: "94%",
          improvement: "+45%",
        },
        {
          metric: "Transaction Speed",
          before: "10.3s",
          after: "2.3s",
          improvement: "-78%",
        },
        {
          metric: "Mobile Adoption",
          before: "33%",
          after: "89%",
          improvement: "+156%",
        },
        {
          metric: "Operational Cost",
          before: "Baseline",
          after: "65% of baseline",
          improvement: "-35%",
        },
      ],
      techStack: [
        "React Native",
        "Node.js",
        "PostgreSQL",
        "AWS",
        "Kubernetes",
        "Redis",
        "Docker",
      ],
      duration: "8 months",
      teamSize: "12 developers",
      testimonial:
        "Techbravery didn't just build us an app; they transformed our entire digital strategy. Our customers now prefer mobile banking over visiting branches, and our operational efficiency has never been higher.",
      testimonialAuthor: "Chief Technology Officer, BankPro",
    },
    2: {
      title: "AgriConnect Marketplace Revolution",
      client: "Pan-African Agriculture Startup",
      category: "AgriTech",
      overview:
        "Revolutionary farmer-to-market platform connecting 50K+ farmers with buyers across 12 African countries.",
      challenge:
        "Smallholder farmers faced severe challenges with 60% post-harvest losses due to lack of direct market access, price manipulation by middlemen, and no visibility into demand patterns. Traditional supply chains were inefficient and excluded farmers from fair pricing.",
      solution:
        "We created a comprehensive multi-platform ecosystem featuring farmer mobile apps with offline capabilities, buyer web dashboards with real-time inventory tracking, IoT sensors for crop monitoring, and an AI-powered matching system that connects farmers directly with buyers based on demand patterns.",
      results: [
        {
          metric: "Farmer Income",
          before: "Baseline",
          after: "227% of baseline",
          improvement: "+127%",
        },
        {
          metric: "Market Reach",
          before: "1 country",
          after: "12 countries",
          improvement: "+1200%",
        },
        {
          metric: "Post-Harvest Waste",
          before: "60%",
          after: "17%",
          improvement: "-43%",
        },
        {
          metric: "Platform Volume",
          before: "$0",
          after: "$2.8M monthly",
          improvement: "+280%",
        },
      ],
      techStack: [
        "Flutter",
        "Django",
        "PostgreSQL",
        "AWS IoT",
        "Stripe",
        "Twilio",
        "TensorFlow",
      ],
      duration: "6 months",
      teamSize: "8 developers",
      testimonial:
        "AgriConnect transformed how we operate. We went from serving local farmers to connecting agricultural communities across Africa. The platform's impact on food security is immeasurable.",
      testimonialAuthor: "Founder & CEO, AgriConnect",
    },
  };

  const data =
    caseStudyData[Number(id) as keyof typeof caseStudyData] || caseStudyData[1];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <Badge className="mb-4">{data.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {data.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {data.overview}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {data.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {data.teamSize}
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {data.client}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Button size="lg" asChild>
                <Link to="/quote">
                  <Target className="w-5 h-5 mr-2" />
                  Start Similar Project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-red-600" />
                </div>
                The Challenge
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {data.challenge}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                Our Solution
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {data.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-gradient-to-br from-accent/20 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Measurable Results</h2>
            <p className="text-xl text-muted-foreground">
              Data-driven outcomes that transformed the business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.results.map((result, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {result.improvement}
                  </div>
                  <div className="text-sm font-medium mb-1">
                    {result.metric}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    From {result.before} to {result.after}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.techStack.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm px-3 py-1"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary-glow/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl text-primary mb-6">"</div>
          <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-6">
            {data.testimonial}
          </blockquote>
          <cite className="text-muted-foreground font-medium">
            — {data.testimonialAuthor}
          </cite>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can help you achieve similar transformative
            results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/quote">Start Your Project</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/portfolio">
                <ExternalLink className="w-4 h-4 mr-2" />
                View More Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
