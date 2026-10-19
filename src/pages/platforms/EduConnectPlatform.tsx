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
  BookOpen,
  Brain,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Star,
  MapPin,
  Calendar,
  Target,
  Smartphone,
} from "lucide-react";

const EduConnectPlatform = () => {
  const metrics = {
    totalStudents: "25,000+",
    monthlyRevenue: "$450K",
    countries: "12",
    courses: "1,500+",
    completion: "85%",
    languages: "8",
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "AI-Powered Learning",
      description:
        "Personalized learning paths adapted to each student's pace and style",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: "Offline-First Design",
      description:
        "Download content for offline learning, perfect for low-connectivity areas",
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Local Languages",
      description:
        "Content available in 8 African languages with voice narration",
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Certified Programs",
      description:
        "Industry-recognized certificates accepted by employers across Africa",
    },
  ];

  const learning_paths = [
    {
      category: "Technology",
      courses: [
        "Web Development",
        "Mobile App Development",
        "Data Science",
        "Cybersecurity",
      ],
      students: "8,500+",
      completion: "92%",
    },
    {
      category: "Business",
      courses: [
        "Entrepreneurship",
        "Digital Marketing",
        "Financial Management",
        "Project Management",
      ],
      students: "6,200+",
      completion: "88%",
    },
    {
      category: "Languages",
      courses: [
        "English Proficiency",
        "French for Business",
        "Arabic Basics",
        "Portuguese",
      ],
      students: "4,800+",
      completion: "78%",
    },
    {
      category: "Skills",
      courses: [
        "Communication",
        "Leadership",
        "Creative Writing",
        "Public Speaking",
      ],
      students: "5,500+",
      completion: "85%",
    },
  ];

  const success_metrics = [
    { metric: "78%", description: "Job placement rate within 6 months" },
    { metric: "45%", description: "Average salary increase post-completion" },
    { metric: "92%", description: "Student satisfaction rate" },
    { metric: "150+", description: "Partner companies for job placement" },
  ];

  const countries = [
    "Nigeria",
    "Kenya",
    "Ghana",
    "South Africa",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Ethiopia",
    "Senegal",
    "Morocco",
    "Egypt",
    "Cameroon",
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
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                Education Revolution
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                EduConnect{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Learning Hub
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Africa's premier AI-powered educational platform. Providing
                world-class education in local languages with offline
                capabilities, designed specifically for African learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/investor">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Invest in EduConnect
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-blue-800">Learning Platform Demo</p>
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
              Learning Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              Empowering African talent with accessible, quality education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.totalStudents}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Students
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
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">{metrics.courses}</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1 text-green-600">
                  {metrics.completion}
                </div>
                <div className="text-sm text-muted-foreground">
                  Completion Rate
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">
                  {metrics.languages}
                </div>
                <div className="text-sm text-muted-foreground">Languages</div>
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
              Built for African learners, by African educators
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

      {/* Learning Paths */}
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
              Popular Learning Paths
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive programs designed for career advancement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {learning_paths.map((path, index) => (
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
                      <CardTitle className="text-xl">{path.category}</CardTitle>
                      <Badge variant="outline">
                        {path.courses.length} courses
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {path.students} students
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {path.completion} completion
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {path.courses.map((course, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded bg-secondary/20"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-xs font-medium">{course}</span>
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
      <section className="py-16 bg-gradient-to-br from-blue-50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Student Success
            </h2>
            <p className="text-xl text-muted-foreground">
              Measuring real outcomes that matter
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

      {/* Country Coverage */}
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
              Learning Across Africa
            </h2>
            <p className="text-xl text-muted-foreground">
              Students from {countries.length} African countries trust
              EduConnect
            </p>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {countries.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200"
                  >
                    <CheckCircle className="w-4 h-4 text-blue-500" />
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
                  Educate Africa's Future
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  EduConnect is in Pre-Seed funding with a target of $150K to
                  expand our AI tutoring system and reach 100K students across
                  Africa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                    asChild
                  >
                    <Link to="/investor">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Invest in Education
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/demo">
                      <Calendar className="w-5 h-5 mr-2" />
                      See Platform Demo
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

export default EduConnectPlatform;
