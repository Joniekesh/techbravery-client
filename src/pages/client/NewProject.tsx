import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Upload, Plus, X } from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";

const NewProject = () => {
  const navigate = useNavigate();
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [customTech, setCustomTech] = useState("");

  const availableTech = [
    "React",
    "Node.js",
    "Python",
    "Flutter",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Firebase",
  ];

  const addTechnology = (tech: string) => {
    if (!technologies.includes(tech)) {
      setTechnologies([...technologies, tech]);
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const addCustomTech = () => {
    if (customTech && !technologies.includes(customTech)) {
      setTechnologies([...technologies, customTech]);
      setCustomTech("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Our team will review your request and contact you within 24 hours.",
    );
    setTimeout(() => navigate("/client-dashboard"), 2000);
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <SEOHead
        title="Start New Project - Client Dashboard | TechBravery"
        description="Submit a new project request and get started with your digital transformation"
      />

      <section className="pt-24 pb-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/client-dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Start a{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                New Project
              </span>
            </h1>
            <p className="text-muted-foreground">
              Tell us about your project and we'll get back to you within 24
              hours
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Project Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                  <CardDescription>
                    Provide basic information about your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      id="projectName"
                      placeholder="e.g., E-commerce Platform"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-app">Web Application</SelectItem>
                        <SelectItem value="mobile-app">
                          Mobile Application
                        </SelectItem>
                        <SelectItem value="saas">SaaS Platform</SelectItem>
                        <SelectItem value="blockchain">
                          Blockchain Solution
                        </SelectItem>
                        <SelectItem value="ai-ml">AI/ML Platform</SelectItem>
                        <SelectItem value="custom">
                          Custom Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project goals, target audience, and key features..."
                      rows={6}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Technical Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Technical Requirements</CardTitle>
                  <CardDescription>
                    Select technologies and platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Preferred Technologies</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableTech.map((tech) => (
                        <Button
                          key={tech}
                          type="button"
                          size="sm"
                          variant={
                            technologies.includes(tech) ? "default" : "outline"
                          }
                          onClick={() =>
                            technologies.includes(tech)
                              ? removeTechnology(tech)
                              : addTechnology(tech)
                          }
                        >
                          {tech}
                          {technologies.includes(tech) && (
                            <X className="w-3 h-3 ml-2" />
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customTech">Add Custom Technology</Label>
                    <div className="flex gap-2">
                      <Input
                        id="customTech"
                        placeholder="e.g., GraphQL"
                        value={customTech}
                        onChange={(e) => setCustomTech(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addCustomTech())
                        }
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addCustomTech}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {technologies.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Technologies</Label>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                          <div
                            key={tech}
                            className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTechnology(tech)}
                              className="hover:bg-primary/20 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="integrations">Required Integrations</Label>
                    <Textarea
                      id="integrations"
                      placeholder="List any third-party services you need to integrate (e.g., payment gateways, APIs, authentication...)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>
                    Timeline, budget, and additional information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10k-25k">
                            $10,000 - $25,000
                          </SelectItem>
                          <SelectItem value="25k-50k">
                            $25,000 - $50,000
                          </SelectItem>
                          <SelectItem value="50k-100k">
                            $50,000 - $100,000
                          </SelectItem>
                          <SelectItem value="100k+">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Desired Timeline *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3m">1-3 months</SelectItem>
                          <SelectItem value="3-6m">3-6 months</SelectItem>
                          <SelectItem value="6-12m">6-12 months</SelectItem>
                          <SelectItem value="12m+">12+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="files">Supporting Documents</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDFs, images, or any relevant files (Max 10MB)
                      </p>
                      <Input
                        id="files"
                        type="file"
                        multiple
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional">Additional Notes</Label>
                    <Textarea
                      id="additional"
                      placeholder="Any other information you'd like to share about your project..."
                      rows={4}
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="terms" required />
                    <Label
                      htmlFor="terms"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I agree to the terms and conditions and understand that
                      this is a project inquiry. TechBravery will review my
                      request and provide a detailed proposal.
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button type="submit" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Project Request
                </Button>
                <Button type="button" variant="outline" size="lg" asChild>
                  <Link to="/client-dashboard">Cancel</Link>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewProject;
