import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Demo = () => {
  const demoTypes = [
    {
      title: "Platform Overview",
      duration: "30 minutes",
      description:
        "High-level overview of our proprietary platforms and capabilities",
    },
    {
      title: "Technical Deep Dive",
      duration: "60 minutes",
      description: "Detailed technical presentation for engineering teams",
    },
    {
      title: "Business Case Presentation",
      duration: "45 minutes",
      description:
        "ROI analysis and business impact discussion for decision makers",
    },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
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
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-glow p-4 shadow-lg">
                <Video className="w-full h-full text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Schedule a{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Demo
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              See our platforms in action. Get a personalized demonstration of
              how our solutions can transform your business operations and drive
              growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Demo Type</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the demo format that best fits your needs and interests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {demoTypes.map((demo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{demo.title}</span>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {demo.duration}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{demo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Select This Demo
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Book Your Demo</h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll confirm your demo session within
              24 hours
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Demo Registration</CardTitle>
              <CardDescription>
                Tell us about yourself and your demo preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name*</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name*</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company*</Label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title*</Label>
                    <Input id="title" placeholder="Your job title" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferred-date">Preferred Date</Label>
                    <Input id="preferred-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferred-time">Preferred Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem
                            key={time}
                            value={time.toLowerCase().replace(/[^a-z0-9]/g, "")}
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demo-focus">Demo Focus Areas</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                    >
                      ExAfrik P2P Exchange
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                    >
                      AgriTech Solutions
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                    >
                      EduConnect Platform
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                    >
                      Investment Opportunities
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specific-questions">
                    Specific Questions or Goals
                  </Label>
                  <Textarea
                    id="specific-questions"
                    placeholder="What specific aspects would you like us to focus on during the demo?"
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Demo will be conducted via Zoom or Google Meet
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      You'll receive a calendar invite with meeting details
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Demo materials will be shared after the session
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-glow"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Demo
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Demo;
