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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  MessageSquare,
  Send,
  FileText,
  Upload,
  Users,
  AtSign,
  Bell,
} from "lucide-react";

const Team = () => {
  const [message, setMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState("exafrik");

  const projects = [
    { id: "exafrik", name: "ExAfrik P2P Exchange", members: 4 },
    { id: "agritech", name: "AgriTech Supply Chain", members: 3 },
    { id: "portal", name: "Client Portal", members: 2 },
  ];

  const projectChats = {
    exafrik: [
      {
        id: 1,
        sender: "Sarah Chen",
        avatar: "SC",
        message:
          "Just pushed the payment gateway integration. Please review when you get a chance.",
        time: "10:30 AM",
        mentions: ["@John"],
      },
      {
        id: 2,
        sender: "You",
        avatar: "JD",
        message: "Will do! Looking at it now.",
        time: "10:32 AM",
        mentions: [],
      },
      {
        id: 3,
        sender: "Mike Johnson",
        avatar: "MJ",
        message:
          "Great work team! The authentication module is working perfectly.",
        time: "11:15 AM",
        mentions: [],
      },
    ],
    agritech: [
      {
        id: 1,
        sender: "David Lee",
        avatar: "DL",
        message:
          "Updated the database schema. Migration script is ready for review.",
        time: "9:00 AM",
        mentions: [],
      },
    ],
    portal: [
      {
        id: 1,
        sender: "Lisa Brown",
        avatar: "LB",
        message:
          "Backend API endpoints are complete. Ready for frontend integration.",
        time: "2:30 PM",
        mentions: ["@John"],
      },
    ],
  };

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      avatar: "SC",
      status: "online",
    },
    {
      name: "Mike Johnson",
      role: "Backend Developer",
      avatar: "MJ",
      status: "online",
    },
    {
      name: "Alex Kumar",
      role: "UI/UX Designer",
      avatar: "AK",
      status: "away",
    },
    {
      name: "David Lee",
      role: "Full Stack Developer",
      avatar: "DL",
      status: "offline",
    },
    {
      name: "Emma Wilson",
      role: "QA Engineer",
      avatar: "EW",
      status: "online",
    },
    {
      name: "Lisa Brown",
      role: "DevOps Engineer",
      avatar: "LB",
      status: "online",
    },
  ];

  const sharedFiles = [
    {
      name: "API_Documentation.pdf",
      uploadedBy: "Sarah Chen",
      size: "2.4 MB",
      date: "2 hours ago",
    },
    {
      name: "Design_Mockups.fig",
      uploadedBy: "Alex Kumar",
      size: "15.8 MB",
      date: "1 day ago",
    },
    {
      name: "Test_Report_Q4.xlsx",
      uploadedBy: "Emma Wilson",
      size: "1.2 MB",
      date: "2 days ago",
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    toast.success("Your message has been sent to the team.");
    setMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
            Team Collaboration
          </h1>
          <p className="text-muted-foreground">
            Chat with teammates, share files, and stay connected
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Project Channels</CardTitle>
                <CardDescription>
                  Select a project to view team chat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {projects.map((project) => (
                    <Button
                      key={project.id}
                      variant={
                        selectedProject === project.id ? "default" : "outline"
                      }
                      className="justify-start h-auto py-3"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <div className="text-left">
                        <p className="font-medium">{project.name}</p>
                        <p className="text-xs opacity-70">
                          {project.members} members
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Messages */}
            <Card className="flex flex-col h-[500px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {projects.find((p) => p.id === selectedProject)?.name}
                    </CardTitle>
                    <CardDescription>Team discussion</CardDescription>
                  </div>
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                  {projectChats[
                    selectedProject as keyof typeof projectChats
                  ]?.map((chat) => (
                    <div key={chat.id} className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>{chat.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{chat.sender}</span>
                          <span className="text-xs text-muted-foreground">
                            {chat.time}
                          </span>
                        </div>
                        <div className="bg-accent/50 rounded-lg p-3">
                          <p className="text-sm">{chat.message}</p>
                          {chat.mentions.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {chat.mentions.map((mention, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {mention}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your message... Use @ to mention teammates"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSendMessage} className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <AtSign className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shared Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Shared Files
                </CardTitle>
                <CardDescription>
                  Documents and resources shared by the team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sharedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.uploadedBy} • {file.size} • {file.date}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Team Members Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Team Members
                </CardTitle>
                <CardDescription>6 members online</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Team;
