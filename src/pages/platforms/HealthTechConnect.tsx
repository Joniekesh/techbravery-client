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
  Heart,
  Users,
  DollarSign,
  MapPin,
  Phone,
  Calendar,
  Shield,
  Award,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Star,
  Clock,
  Target,
  Stethoscope,
  Pill,
  Activity,
} from "lucide-react";

const HealthTechConnect = () => {
  const metrics = {
    totalPatients: "150K+",
    monthlyRevenue: "$320K",
    providers: "2,500+",
    consultations: "25K/month",
    satisfaction: "97%",
    countries: "8",
  };

  const features = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Telemedicine Consultations",
      description:
        "HD video calls with certified healthcare providers across Africa",
    },
    {
      icon: <Pill className="w-6 h-6 text-primary" />,
      title: "Digital Prescriptions",
      description:
        "Secure, digital prescription management with pharmacy integration",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "HIPAA Compliance",
      description:
        "End-to-end encryption ensuring patient privacy and data security",
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Smart Scheduling",
      description: "AI-powered appointment scheduling with automated reminders",
    },
  ];

  const services = [
    {
      category: "Primary Care",
      specialists: [
        "General Practitioners",
        "Family Medicine",
        "Internal Medicine",
        "Pediatrics",
      ],
      consultations: "8,500+/month",
      avgWaitTime: "15 minutes",
    },
    {
      category: "Specialty Care",
      specialists: ["Cardiology", "Dermatology", "Mental Health", "Obstetrics"],
      consultations: "5,200+/month",
      avgWaitTime: "45 minutes",
    },
    {
      category: "Emergency Care",
      specialists: [
        "Emergency Medicine",
        "Urgent Care",
        "Triage Nurses",
        "24/7 Support",
      ],
      consultations: "3,800+/month",
      avgWaitTime: "5 minutes",
    },
    {
      category: "Chronic Care",
      specialists: [
        "Diabetes Management",
        "Hypertension",
        "Asthma Care",
        "Follow-ups",
      ],
      consultations: "7,500+/month",
      avgWaitTime: "20 minutes",
    },
  ];

  const success_metrics = [
    { metric: "92%", description: "Reduction in travel time to healthcare" },
    { metric: "67%", description: "Lower cost than traditional visits" },
    { metric: "97%", description: "Patient satisfaction rate" },
    { metric: "85%", description: "Provider adoption rate" },
  ];

  const coverage_areas = [
    "Nigeria",
    "Kenya",
    "Ghana",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Cameroon",
    "Senegal",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-green-50/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">
                Healthcare Innovation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                HealthTech{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Connect
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Bridging the healthcare gap in Africa through telemedicine.
                Connect patients in remote areas with qualified healthcare
                providers through secure, HIPAA-compliant platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow"
                  asChild
                >
                  <Link to="/demo">
                    <Activity className="w-5 h-5 mr-2" />
                    Book Consultation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/investor">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Invest in HealthTech
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Stethoscope className="w-24 h-24 text-green-600 mx-auto mb-4" />
                  <p className="text-green-800">Telemedicine Platform</p>
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
              Healthcare Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              Delivering quality healthcare to underserved communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.totalPatients}
                </div>
                <div className="text-sm text-muted-foreground">
                  Patients Served
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
                <Stethoscope className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.providers}
                </div>
                <div className="text-sm text-muted-foreground">
                  Healthcare Providers
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.consultations}
                </div>
                <div className="text-sm text-muted-foreground">
                  Monthly Consultations
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1 text-green-600">
                  {metrics.satisfaction}
                </div>
                <div className="text-sm text-muted-foreground">
                  Patient Satisfaction
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.countries}
                </div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-green-50/20 to-background">
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
              Advanced healthcare technology for better patient outcomes
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

      {/* Healthcare Services */}
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
              Healthcare Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive medical care across all specialties
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">
                        {service.category}
                      </CardTitle>
                      <Badge variant="outline">
                        {service.specialists.length} specialties
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        {service.consultations}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.avgWaitTime} avg wait
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {service.specialists.map((specialist, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded bg-secondary/20"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-xs font-medium">
                            {specialist}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gradient-to-br from-blue-50/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Healthcare Transformation
            </h2>
            <p className="text-xl text-muted-foreground">
              Measurable improvements in healthcare accessibility
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {success_metrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {item.metric}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
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
              Serving patients in {coverage_areas.length} African countries
            </p>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {coverage_areas.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200"
                  >
                    <Heart className="w-4 h-4 text-green-500" />
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
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  Invest in African Healthcare
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  HealthTech Connect is raising Series A funding ($2.5M) to
                  expand telemedicine services to 10 more African countries and
                  serve 1M+ patients.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                    asChild
                  >
                    <Link to="/investor">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Invest in Healthcare
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

export default HealthTechConnect;
