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
import {
  Handshake,
  Users,
  Target,
  Rocket,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react";

const Partnership = () => {
  const partnershipTypes = [
    {
      title: "Technology Partners",
      description: "Integrate and collaborate on cutting-edge tech solutions",
      benefits: [
        "Joint product development",
        "Technical expertise sharing",
        "Market expansion",
      ],
    },
    {
      title: "Channel Partners",
      description: "Expand our reach through your established networks",
      benefits: ["Revenue sharing", "Sales support", "Marketing collaboration"],
    },
    {
      title: "Strategic Alliances",
      description: "Long-term partnerships for mutual growth",
      benefits: ["Co-innovation", "Resource sharing", "Market leadership"],
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
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-glow p-4 shadow-lg">
                <Handshake className="w-full h-full text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Partnership{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join forces with Techbravery to drive innovation across Africa.
              Together, we can build solutions that transform industries and
              create lasting impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partnership Models</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the partnership model that aligns with your goals and
              capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{type.title}</span>
                    </CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
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

      {/* Partnership Form */}
      <section className="py-16 bg-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Request Partnership</h2>
            <p className="text-muted-foreground">
              Tell us about your organization and how we can collaborate
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Partnership Application</CardTitle>
              <CardDescription>
                Fill out this form and our partnership team will get back to you
                within 48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name*</Label>
                    <Input
                      id="company"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Name*</Label>
                    <Input
                      id="contact-name"
                      placeholder="Your full name"
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
                    <Label htmlFor="email">Email*</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partnership-type">Partnership Interest</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                    >
                      Technology Partner
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                    >
                      Channel Partner
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                    >
                      Strategic Alliance
                    </Badge>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white"
                    >
                      Investment Partner
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Partnership Proposal*</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your partnership proposal, what you bring to the table, and how we can work together..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-glow"
                >
                  Submit Partnership Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions about partnerships? Our team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4">
                  partnerships@techbravery.com
                </p>
                <Button variant="outline">Send Email</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">+234 800 123 4567</p>
                <Button variant="outline">Schedule Call</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;
