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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Users,
  Calendar,
  FileText,
  Eye,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const Newsletter = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("all");

  const handleSendNewsletter = () => {
    if (!subject || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(
      `Newsletter sent to ${audience === "all" ? "all subscribers" : audience}`,
    );

    setSubject("");
    setContent("");
  };

  const pastNewsletters = [
    {
      id: 1,
      subject: "Monthly Product Updates - January 2024",
      date: "2024-01-15",
      recipients: 1250,
      openRate: "42%",
      status: "Sent",
    },
    {
      id: 2,
      subject: "New Feature Announcement",
      date: "2024-01-10",
      recipients: 980,
      openRate: "38%",
      status: "Sent",
    },
    {
      id: 3,
      subject: "Holiday Greetings & Year in Review",
      date: "2023-12-25",
      recipients: 1180,
      openRate: "55%",
      status: "Sent",
    },
  ];

  const templates = [
    {
      id: 1,
      name: "Product Update",
      description: "Announce new features and improvements",
    },
    {
      id: 2,
      name: "Company News",
      description: "Share company milestones and updates",
    },
    {
      id: 3,
      name: "Promotional",
      description: "Special offers and promotions",
    },
    {
      id: 4,
      name: "Event Invitation",
      description: "Invite subscribers to events",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/admin-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin Dashboard
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">
            Newsletter{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Create and send newsletters to your subscribers
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="compose" className="space-y-6">
            <TabsList>
              <TabsTrigger value="compose">
                <FileText className="w-4 h-4 mr-2" />
                Compose
              </TabsTrigger>
              <TabsTrigger value="history">
                <Calendar className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="templates">
                <Eye className="w-4 h-4 mr-2" />
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compose">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Newsletter</CardTitle>
                      <CardDescription>
                        Compose your newsletter message
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject Line</Label>
                        <Input
                          id="subject"
                          placeholder="Enter newsletter subject..."
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="audience">Target Audience</Label>
                        <Select value={audience} onValueChange={setAudience}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Subscribers</SelectItem>
                            <SelectItem value="clients">
                              Clients Only
                            </SelectItem>
                            <SelectItem value="investors">
                              Investors Only
                            </SelectItem>
                            <SelectItem value="prospects">Prospects</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Message Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Write your newsletter content here..."
                          rows={12}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleSendNewsletter}
                          className="flex-1"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Newsletter
                        </Button>
                        <Button variant="outline">Save Draft</Button>
                        <Button variant="outline">Preview</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Audience Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Total Subscribers
                        </span>
                        <span className="font-bold text-xl">1,250</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Active Clients
                        </span>
                        <span className="font-bold">320</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Investors</span>
                        <span className="font-bold">45</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Prospects</span>
                        <span className="font-bold">885</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Keep subject lines under 50 characters</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Personalize content for better engagement</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Include clear call-to-action</span>
                      </div>
                      <div className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Test on mobile devices</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter History</CardTitle>
                  <CardDescription>
                    View past newsletter campaigns and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pastNewsletters.map((newsletter) => (
                      <Card key={newsletter.id} className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">
                              {newsletter.subject}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Sent on{" "}
                              {new Date(newsletter.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Recipients
                              </p>
                              <p className="font-semibold">
                                {newsletter.recipients}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Open Rate
                              </p>
                              <p className="font-semibold text-green-600">
                                {newsletter.openRate}
                              </p>
                            </div>
                            <div>
                              <Badge variant="outline">
                                {newsletter.status}
                              </Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Templates</CardTitle>
                  <CardDescription>
                    Choose from pre-designed templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <Card
                        key={template.id}
                        className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{template.name}</h4>
                          <Badge variant="secondary">Template</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {template.description}
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          Use Template
                        </Button>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
