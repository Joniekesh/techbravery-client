import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileText,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const ExportData = () => {
  const [exportType, setExportType] = useState("");
  const [format, setFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("last-30");
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const dataCategories = [
    { id: "quotes", label: "Quote Requests", icon: FileText },
    { id: "clients", label: "Client Data", icon: Users },
    { id: "projects", label: "Project Information", icon: TrendingUp },
    { id: "revenue", label: "Revenue Reports", icon: DollarSign },
    { id: "investments", label: "Investment Data", icon: DollarSign },
    { id: "analytics", label: "Analytics Data", icon: TrendingUp },
  ];

  const recentExports = [
    {
      id: 1,
      name: "Quotes_January_2024.csv",
      date: "2024-01-20",
      size: "2.4 MB",
      type: "Quotes",
    },
    {
      id: 2,
      name: "Client_Database_Q4_2023.xlsx",
      date: "2024-01-15",
      size: "5.1 MB",
      type: "Clients",
    },
    {
      id: 3,
      name: "Revenue_Report_2023.pdf",
      date: "2024-01-10",
      size: "1.8 MB",
      type: "Revenue",
    },
  ];

  const handleExport = () => {
    if (!exportType || selectedData.length === 0) {
      toast.error("Please select export type and data categories");
      return;
    }

    toast.success(`Your ${format.toUpperCase()} export is being prepared...`);

    setTimeout(() => {
      toast.success("Your file is ready for download");
    }, 2000);
  };

  const toggleDataCategory = (categoryId: string) => {
    setSelectedData((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

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
            Data{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Export
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Export and download your data in multiple formats
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configure Export</CardTitle>
                  <CardDescription>
                    Select the data you want to export
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Export Type</Label>
                    <Select value={exportType} onValueChange={setExportType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select export type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">
                          Full Database Export
                        </SelectItem>
                        <SelectItem value="selective">
                          Selective Data Export
                        </SelectItem>
                        <SelectItem value="report">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>File Format</Label>
                      <Select value={format} onValueChange={setFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="pdf">PDF Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last-7">Last 7 Days</SelectItem>
                          <SelectItem value="last-30">Last 30 Days</SelectItem>
                          <SelectItem value="last-90">Last 90 Days</SelectItem>
                          <SelectItem value="this-year">This Year</SelectItem>
                          <SelectItem value="all-time">All Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Data Categories</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {dataCategories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer"
                          onClick={() => toggleDataCategory(category.id)}
                        >
                          <Checkbox
                            id={category.id}
                            checked={selectedData.includes(category.id)}
                            onCheckedChange={() =>
                              toggleDataCategory(category.id)
                            }
                          />
                          <div className="flex items-center gap-2 flex-1">
                            <category.icon className="w-5 h-5 text-primary" />
                            <Label
                              htmlFor={category.id}
                              className="cursor-pointer"
                            >
                              {category.label}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleExport} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Exports</CardTitle>
                  <CardDescription>Previously exported files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentExports.map((export_item) => (
                      <div
                        key={export_item.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <p className="font-medium">{export_item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(export_item.date).toLocaleDateString()}{" "}
                              • {export_item.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{export_item.type}</Badge>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Export Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Exports
                    </p>
                    <p className="text-2xl font-bold">47</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Data Size
                    </p>
                    <p className="text-2xl font-bold">124.5 MB</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Export Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>CSV format is best for spreadsheet analysis</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>JSON format is ideal for system integration</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>PDF reports are great for presentations</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Schedule exports for regular backups</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Contact support for custom export requirements
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExportData;
