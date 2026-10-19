import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  Search,
  Filter,
  FolderOpen,
  Image,
  FileCode,
  Archive,
  ArrowLeft,
  Clock,
  User,
} from "lucide-react";

const FileManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const projects = [
    { id: "all", name: "All Projects" },
    { id: "exafrik", name: "ExAfrik P2P Exchange" },
    { id: "agritech", name: "AgriTech Supply Chain" },
    { id: "portal", name: "Client Portal" },
  ];

  const files = [
    {
      id: 1,
      name: "Authentication_Module_v2.3.zip",
      type: "archive",
      size: "12.4 MB",
      project: "ExAfrik P2P Exchange",
      uploadedBy: "You",
      uploadedAt: "2 hours ago",
      version: "v2.3",
      status: "Latest",
      downloads: 8,
    },
    {
      id: 2,
      name: "API_Documentation.pdf",
      type: "document",
      size: "2.4 MB",
      project: "ExAfrik P2P Exchange",
      uploadedBy: "Sarah Chen",
      uploadedAt: "1 day ago",
      version: "v1.5",
      status: "Approved",
      downloads: 15,
    },
    {
      id: 3,
      name: "UI_Mockups_Final.fig",
      type: "design",
      size: "15.8 MB",
      project: "AgriTech Supply Chain",
      uploadedBy: "Alex Kumar",
      uploadedAt: "2 days ago",
      version: "v3.0",
      status: "Latest",
      downloads: 12,
    },
    {
      id: 4,
      name: "Database_Schema.sql",
      type: "code",
      size: "458 KB",
      project: "Client Portal",
      uploadedBy: "You",
      uploadedAt: "3 days ago",
      version: "v1.2",
      status: "Latest",
      downloads: 6,
    },
    {
      id: 5,
      name: "Test_Results_Q4.xlsx",
      type: "document",
      size: "1.2 MB",
      project: "AgriTech Supply Chain",
      uploadedBy: "Emma Wilson",
      uploadedAt: "5 days ago",
      version: "v1.0",
      status: "Final",
      downloads: 10,
    },
    {
      id: 6,
      name: "Logo_Assets.png",
      type: "image",
      size: "3.2 MB",
      project: "ExAfrik P2P Exchange",
      uploadedBy: "Alex Kumar",
      uploadedAt: "1 week ago",
      version: "v2.0",
      status: "Approved",
      downloads: 20,
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-8 w-8 text-blue-600" />;
      case "image":
        return <Image className="h-8 w-8 text-green-600" />;
      case "code":
        return <FileCode className="h-8 w-8 text-purple-600" />;
      case "archive":
        return <Archive className="h-8 w-8 text-orange-600" />;
      default:
        return <FileText className="h-8 w-8 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Latest":
        return "default";
      case "Approved":
        return "secondary";
      case "Final":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleUpload = () => {
    toast.success(
      "Your file has been uploaded successfully and is now available to the team.",
    );
    setUploadDialogOpen(false);
  };

  const handleDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`);
  };

  const handleDelete = (fileName: string) => {
    toast.success(`${fileName} has been removed from the project.`);
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject =
      selectedProject === "all" ||
      file.project === projects.find((p) => p.id === selectedProject)?.name;
    return matchesSearch && matchesProject;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/staff-dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                File Manager
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage and track project deliverables and documents
              </p>
            </div>

            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload File
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New File</DialogTitle>
                  <DialogDescription>
                    Upload a file to your project. Supported formats: PDF, ZIP,
                    PNG, JPG, SQL, FIG
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Select Project
                    </label>
                    <Select defaultValue="exafrik">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose a project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects
                          .filter((p) => p.id !== "all")
                          .map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">File Name</label>
                    <Input
                      placeholder="e.g., API_Documentation_v2.pdf"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Version</label>
                    <Input placeholder="e.g., v1.0" className="mt-2" />
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Maximum file size: 50MB
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleUpload} className="flex-1">
                      Upload File
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setUploadDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={selectedProject}
                onValueChange={setSelectedProject}
              >
                <SelectTrigger className="w-full md:w-[250px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <FileText className="h-6 w-6 text-primary" />
                <Badge variant="secondary">{files.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Total Files</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <FolderOpen className="h-6 w-6 text-blue-600" />
                <Badge variant="secondary">{projects.length - 1}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Download className="h-6 w-6 text-green-600" />
                <Badge variant="secondary">71</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Total Downloads</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Archive className="h-6 w-6 text-orange-600" />
                <Badge variant="secondary">35.8 MB</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Storage Used</p>
            </CardContent>
          </Card>
        </div>

        {/* Files List */}
        <div className="space-y-4">
          {filteredFiles.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No files found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "Upload your first file to get started"}
                </p>
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* File Icon */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">
                            {file.name}
                          </h3>
                          <Badge
                            variant={getStatusColor(file.status)}
                            className="text-xs flex-shrink-0"
                          >
                            {file.status}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FolderOpen className="h-3 w-3" />
                            {file.project}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {file.uploadedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {file.uploadedAt}
                          </span>
                        </div>

                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Size: {file.size}</span>
                          <span>Version: {file.version}</span>
                          <span>Downloads: {file.downloads}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(file.name)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {file.uploadedBy === "You" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(file.name)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default FileManager;
