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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FileText,
  Plus,
  Minus,
  Calculator,
  Send,
  Save,
  ArrowLeft,
} from "lucide-react";

const NewQuote = () => {
  const navigate = useNavigate();

  const [quote, setQuote] = useState({
    // Client Information
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    company: "",

    // Project Details
    projectName: "",
    projectType: "",
    description: "",
    timeline: "",
    budget: "",
    priority: "medium",

    // Services
    services: {
      webDevelopment: false,
      mobileDevelopment: false,
      uiuxDesign: false,
      devops: false,
      consulting: false,
      maintenance: false,
    },

    // Features
    features: [
      { name: "User Authentication", included: false, cost: 2500 },
      { name: "Admin Dashboard", included: false, cost: 3500 },
      { name: "Payment Integration", included: false, cost: 4000 },
      { name: "Third-party APIs", included: false, cost: 2000 },
      { name: "Real-time Features", included: false, cost: 5000 },
      { name: "Mobile Responsive", included: false, cost: 1500 },
      { name: "SEO Optimization", included: false, cost: 1000 },
      { name: "Analytics Integration", included: false, cost: 800 },
    ],

    // Custom line items
    customItems: [{ description: "", quantity: 1, rate: 0, amount: 0 }],

    // Terms
    terms: "",
    validUntil: "",
    notes: "",
  });

  const projectTypes = [
    "Web Application",
    "Mobile Application",
    "E-commerce Platform",
    "Corporate Website",
    "API Development",
    "UI/UX Design",
    "Consulting",
    "Custom Solution",
  ];

  const timelineOptions = [
    "1-2 weeks",
    "3-4 weeks",
    "1-2 months",
    "3-4 months",
    "6+ months",
  ];

  const budgetRanges = [
    "$5k-10k",
    "$10k-25k",
    "$25k-50k",
    "$50k-100k",
    "$100k+",
  ];

  const calculateTotal = () => {
    const featuresTotal = quote.features
      .filter((f) => f.included)
      .reduce((sum, f) => sum + f.cost, 0);

    const customTotal = quote.customItems.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    return featuresTotal + customTotal;
  };

  const addCustomItem = () => {
    setQuote({
      ...quote,
      customItems: [
        ...quote.customItems,
        { description: "", quantity: 1, rate: 0, amount: 0 },
      ],
    });
  };

  const removeCustomItem = (index: number) => {
    const newItems = quote.customItems.filter((_, i) => i !== index);
    setQuote({ ...quote, customItems: newItems });
  };

  const updateCustomItem = (index: number, field: string, value: any) => {
    const newItems = [...quote.customItems];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }

    setQuote({ ...quote, customItems: newItems });
  };

  const toggleFeature = (index: number) => {
    const newFeatures = [...quote.features];
    newFeatures[index].included = !newFeatures[index].included;
    setQuote({ ...quote, features: newFeatures });
  };

  const handleSaveDraft = () => {
    toast.success("Quote has been saved as draft.");
  };

  const handleSendQuote = () => {
    if (!quote.clientName || !quote.clientEmail || !quote.projectName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.success(`Quote sent to ${quote.clientEmail} successfully.`);

    navigate("/admin-dashboard");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin-dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Create New{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Quote
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Generate a detailed project quote for your client
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSendQuote}>
                <Send className="w-4 h-4 mr-2" />
                Send Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                  <CardDescription>
                    Basic details about your client
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name *</Label>
                      <Input
                        id="clientName"
                        value={quote.clientName}
                        onChange={(e) =>
                          setQuote({ ...quote, clientName: e.target.value })
                        }
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={quote.company}
                        onChange={(e) =>
                          setQuote({ ...quote, company: e.target.value })
                        }
                        placeholder="TechCorp Inc."
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientEmail">Email *</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={quote.clientEmail}
                        onChange={(e) =>
                          setQuote({ ...quote, clientEmail: e.target.value })
                        }
                        placeholder="john@techcorp.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientPhone">Phone</Label>
                      <Input
                        id="clientPhone"
                        value={quote.clientPhone}
                        onChange={(e) =>
                          setQuote({ ...quote, clientPhone: e.target.value })
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>
                    Describe the project requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      id="projectName"
                      value={quote.projectName}
                      onChange={(e) =>
                        setQuote({ ...quote, projectName: e.target.value })
                      }
                      placeholder="E-commerce Platform Development"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select
                        value={quote.projectType}
                        onValueChange={(value) =>
                          setQuote({ ...quote, projectType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Select
                        value={quote.timeline}
                        onValueChange={(value) =>
                          setQuote({ ...quote, timeline: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select
                        value={quote.budget}
                        onValueChange={(value) =>
                          setQuote({ ...quote, budget: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((budget) => (
                            <SelectItem key={budget} value={budget}>
                              {budget}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      value={quote.description}
                      onChange={(e) =>
                        setQuote({ ...quote, description: e.target.value })
                      }
                      placeholder="Detailed description of the project requirements..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority Level</Label>
                    <RadioGroup
                      value={quote.priority}
                      onValueChange={(value) =>
                        setQuote({ ...quote, priority: value })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Services Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Services Required</CardTitle>
                  <CardDescription>
                    Select the services needed for this project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries({
                      webDevelopment: "Web Development",
                      mobileDevelopment: "Mobile Development",
                      uiuxDesign: "UI/UX Design",
                      devops: "DevOps & Infrastructure",
                      consulting: "Technical Consulting",
                      maintenance: "Maintenance & Support",
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={
                            quote.services[key as keyof typeof quote.services]
                          }
                          onCheckedChange={(checked) =>
                            setQuote({
                              ...quote,
                              services: { ...quote.services, [key]: checked },
                            })
                          }
                        />
                        <Label htmlFor={key}>{label}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features & Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Features & Pricing</CardTitle>
                  <CardDescription>
                    Select features to include in the quote
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quote.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={feature.included}
                            onCheckedChange={() => toggleFeature(index)}
                          />
                          <span
                            className={`font-medium ${feature.included ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {feature.name}
                          </span>
                        </div>
                        <span
                          className={`font-bold ${feature.included ? "text-primary" : "text-muted-foreground"}`}
                        >
                          ${feature.cost.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Custom Line Items */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Custom Line Items</CardTitle>
                      <CardDescription>
                        Add custom services or products
                      </CardDescription>
                    </div>
                    <Button size="sm" onClick={addCustomItem}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quote.customItems.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-2 items-center"
                      >
                        <div className="col-span-5">
                          <Input
                            placeholder="Service description"
                            value={item.description}
                            onChange={(e) =>
                              updateCustomItem(
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) =>
                              updateCustomItem(
                                index,
                                "quantity",
                                parseInt(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            placeholder="Rate"
                            value={item.rate}
                            onChange={(e) =>
                              updateCustomItem(
                                index,
                                "rate",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">
                            ${item.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="col-span-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeCustomItem(index)}
                            disabled={quote.customItems.length === 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Terms & Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle>Terms & Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="terms">Terms & Conditions</Label>
                    <Textarea
                      id="terms"
                      value={quote.terms}
                      onChange={(e) =>
                        setQuote({ ...quote, terms: e.target.value })
                      }
                      placeholder="Payment terms, project scope, deliverables..."
                      rows={3}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="validUntil">Quote Valid Until</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        value={quote.validUntil}
                        onChange={(e) =>
                          setQuote({ ...quote, validUntil: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Internal Notes</Label>
                    <Textarea
                      id="notes"
                      value={quote.notes}
                      onChange={(e) =>
                        setQuote({ ...quote, notes: e.target.value })
                      }
                      placeholder="Internal notes (not visible to client)"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quote Summary Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Quote Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Selected Features:</span>
                      <span className="font-medium">
                        $
                        {quote.features
                          .filter((f) => f.included)
                          .reduce((sum, f) => sum + f.cost, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Custom Items:</span>
                      <span className="font-medium">
                        $
                        {quote.customItems
                          .reduce((sum, item) => sum + item.amount, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">
                        ${calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <h4 className="font-medium">Included Features:</h4>
                    <ul className="text-sm space-y-1">
                      {quote.features
                        .filter((f) => f.included)
                        .map((feature, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{feature.name}</span>
                            <span>${feature.cost.toLocaleString()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewQuote;
