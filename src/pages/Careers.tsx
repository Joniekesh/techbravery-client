import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Zap,
  Coffee,
  Laptop,
  Send,
  FileText,
  Search,
} from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / Lagos, Nigeria",
      type: "Full-time",
      experience: "5+ years",
      salary: "$60K - $90K",
      description:
        "Lead development of scalable web applications using React, Node.js, and cloud technologies.",
      requirements: [
        "5+ years of full-stack development experience",
        "Expertise in React, Node.js, TypeScript",
        "Experience with cloud platforms (AWS/Azure)",
        "Strong understanding of microservices architecture",
        "Experience mentoring junior developers",
      ],
      responsibilities: [
        "Architect and develop scalable web applications",
        "Mentor and guide junior developers",
        "Collaborate with product and design teams",
        "Implement best practices for code quality",
        "Contribute to technical decision making",
      ],
    },
    {
      id: 2,
      title: "Mobile App Developer (React Native)",
      department: "Engineering",
      location: "Remote / Nairobi, Kenya",
      type: "Full-time",
      experience: "3+ years",
      salary: "$45K - $70K",
      description:
        "Build high-performance mobile applications for iOS and Android using React Native.",
      requirements: [
        "3+ years of React Native development",
        "Experience with native iOS/Android development",
        "Knowledge of mobile app store deployment",
        "Understanding of mobile security best practices",
        "Experience with state management (Redux/Context)",
      ],
      responsibilities: [
        "Develop cross-platform mobile applications",
        "Optimize app performance and user experience",
        "Implement push notifications and offline functionality",
        "Collaborate with backend developers for API integration",
        "Maintain code quality and testing standards",
      ],
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote / Cape Town, South Africa",
      type: "Full-time",
      experience: "4+ years",
      salary: "$40K - $65K",
      description:
        "Create intuitive and beautiful user experiences for web and mobile applications.",
      requirements: [
        "4+ years of UI/UX design experience",
        "Proficiency in Figma, Sketch, or Adobe XD",
        "Experience with design systems and component libraries",
        "Knowledge of user research and testing methodologies",
        "Portfolio showcasing mobile-first designs",
      ],
      responsibilities: [
        "Design user interfaces for web and mobile apps",
        "Conduct user research and usability testing",
        "Create and maintain design systems",
        "Collaborate with developers to ensure design feasibility",
        "Present design concepts to stakeholders",
      ],
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote / Accra, Ghana",
      type: "Full-time",
      experience: "4+ years",
      salary: "$55K - $80K",
      description:
        "Manage and optimize our cloud infrastructure, CI/CD pipelines, and deployment processes.",
      requirements: [
        "4+ years of DevOps/Infrastructure experience",
        "Expertise in AWS/Azure cloud platforms",
        "Experience with Docker, Kubernetes, Terraform",
        "Strong knowledge of CI/CD tools (Jenkins, GitLab CI)",
        "Scripting skills in Python, Bash, or PowerShell",
      ],
      responsibilities: [
        "Manage cloud infrastructure and deployment pipelines",
        "Implement monitoring and alerting systems",
        "Optimize application performance and scaling",
        "Ensure security compliance and best practices",
        "Automate infrastructure provisioning and management",
      ],
    },
    {
      id: 5,
      title: "Blockchain Developer",
      department: "Engineering",
      location: "Remote / Cairo, Egypt",
      type: "Full-time",
      experience: "3+ years",
      salary: "$50K - $85K",
      description:
        "Develop and maintain blockchain applications, smart contracts, and DeFi protocols.",
      requirements: [
        "3+ years of blockchain development experience",
        "Proficiency in Solidity, Web3.js, Ethers.js",
        "Experience with Ethereum, Polygon, or other networks",
        "Knowledge of DeFi protocols and tokenomics",
        "Understanding of blockchain security best practices",
      ],
      responsibilities: [
        "Develop smart contracts and DApps",
        "Integrate blockchain functionality into web apps",
        "Conduct security audits and testing",
        "Research and implement new blockchain technologies",
        "Optimize gas usage and transaction costs",
      ],
    },
    {
      id: 6,
      title: "Product Manager",
      department: "Product",
      location: "Remote / Lagos, Nigeria",
      type: "Full-time",
      experience: "5+ years",
      salary: "$55K - $85K",
      description:
        "Drive product strategy and roadmap for our fintech and SaaS platforms.",
      requirements: [
        "5+ years of product management experience",
        "Experience in fintech or SaaS products",
        "Strong analytical and data-driven mindset",
        "Excellent communication and leadership skills",
        "Understanding of African market dynamics",
      ],
      responsibilities: [
        "Define product vision and strategy",
        "Manage product roadmap and feature prioritization",
        "Collaborate with engineering and design teams",
        "Conduct market research and competitive analysis",
        "Work with stakeholders to gather requirements",
      ],
    },
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Remote-First",
      description: "Work from anywhere with flexible hours and time zones",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Learning & Growth",
      description: "Annual learning budget and conference attendance",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Work-Life Balance",
      description: "Unlimited PTO and mental health support",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Equity & Bonuses",
      description: "Stock options and performance-based bonuses",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Diverse Team",
      description: "Collaborative culture with team from 15+ countries",
    },
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
              Join Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Team
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Build the future of African technology with us. We're looking for
              passionate individuals who want to make a real impact on millions
              of lives across the continent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow"
              >
                View Open Positions
              </Button>
              <Button size="lg" variant="outline">
                Learn About Our Culture
              </Button>
            </div>
          </motion.div>

          {/* Company Stats */}
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
                  Team Members
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">4.8★</div>
                <div className="text-sm text-muted-foreground">
                  Glassdoor Rating
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">
                  Retention Rate
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in creating an environment where our team can thrive,
              innovate, and make a meaningful impact.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our mission to transform African technology. We're hiring
              across multiple roles and locations.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search positions..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {openPositions.map((position) => (
              <motion.div key={position.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {position.title}
                        </CardTitle>
                        <CardDescription className="mb-3">
                          {position.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {position.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {position.salary}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className="bg-gradient-to-r from-primary to-primary-glow">
                          {position.department}
                        </Badge>
                        <Badge variant="outline">{position.experience}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Requirements</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {position.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Responsibilities</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {position.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-border">
                      <Button className="flex-1 bg-gradient-to-r from-primary to-primary-glow">
                        Apply Now
                      </Button>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        Job Description
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-muted-foreground">
              We're always looking for exceptional talent. Send us your
              information and we'll keep you in mind for future opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>General Application</CardTitle>
                <CardDescription>
                  Tell us about yourself and we'll reach out when we have a role
                  that matches your skills.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Preferred Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">
                        Frontend Developer
                      </SelectItem>
                      <SelectItem value="backend">Backend Developer</SelectItem>
                      <SelectItem value="fullstack">
                        Full-Stack Developer
                      </SelectItem>
                      <SelectItem value="mobile">Mobile Developer</SelectItem>
                      <SelectItem value="designer">UI/UX Designer</SelectItem>
                      <SelectItem value="devops">DevOps Engineer</SelectItem>
                      <SelectItem value="product">Product Manager</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-3">2-3 years</SelectItem>
                      <SelectItem value="4-5">4-5 years</SelectItem>
                      <SelectItem value="6-8">6-8 years</SelectItem>
                      <SelectItem value="9+">9+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Why do you want to join Techbravery?
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your passion for technology and how you'd contribute to our mission..."
                    className="min-h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume/CV</Label>
                  <Input id="resume" type="file" accept=".pdf,.doc,.docx" />
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-primary-glow">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
