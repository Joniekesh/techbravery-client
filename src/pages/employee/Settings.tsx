import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Shield,
  Bell,
  Palette,
  Globe,
  Lock,
  ArrowLeft,
  Save,
  Upload,
} from "lucide-react";
import { makeRequest } from "@/utils/makeRequest";
import { useQuery } from "@tanstack/react-query";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await makeRequest.get("/user/me");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  // Profile settings
  const [name, setName] = useState(user?.name || "John Developer");
  const [email, setEmail] = useState(user?.email || "employee@techbravery.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [location, setLocation] = useState("San Francisco, CA");
  const [position, setPosition] = useState(
    user?.position || "Senior Full Stack Developer",
  );
  const [bio, setBio] = useState(
    "Passionate full-stack developer with 5+ years of experience building scalable web applications.",
  );
  const [skills, setSkills] = useState(
    "React, TypeScript, Node.js, PostgreSQL, AWS",
  );
  const [timezone, setTimezone] = useState("America/Los_Angeles");

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [projectNotifications, setProjectNotifications] = useState(true);
  const [hrNotifications, setHrNotifications] = useState(true);

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState("team");
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const handleSaveProfile = () => {
    toast.success("Your profile settings have been saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Your notification preferences have been updated");
  };

  const handleSavePrivacy = () => {
    toast.success("Your privacy settings have been saved");
  };

  const handleChangePassword = () => {
    toast.success("Check your email for password reset instructions");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/staff-dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your account preferences and settings
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG or GIF, max 2MB
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="h-4 w-4 inline mr-2" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">
                      <Globe className="h-4 w-4 inline mr-2" />
                      Timezone
                    </Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">
                          Pacific Time (PT)
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          Mountain Time (MT)
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          Central Time (CT)
                        </SelectItem>
                        <SelectItem value="America/New_York">
                          Eastern Time (ET)
                        </SelectItem>
                        <SelectItem value="Europe/London">
                          London (GMT)
                        </SelectItem>
                        <SelectItem value="Europe/Paris">
                          Paris (CET)
                        </SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">
                    <Briefcase className="h-4 w-4 inline mr-2" />
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Separate with commas"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add your key technical skills
                  </p>
                </div>

                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose which notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="email-notif" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="task-notif" className="font-medium">
                      Task Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when tasks are assigned or updated
                    </p>
                  </div>
                  <Switch
                    id="task-notif"
                    checked={taskNotifications}
                    onCheckedChange={setTaskNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="message-notif" className="font-medium">
                      Messages & Comments
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified of new messages and comments
                    </p>
                  </div>
                  <Switch
                    id="message-notif"
                    checked={messageNotifications}
                    onCheckedChange={setMessageNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="project-notif" className="font-medium">
                      Project Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about project milestones and changes
                    </p>
                  </div>
                  <Switch
                    id="project-notif"
                    checked={projectNotifications}
                    onCheckedChange={setProjectNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="hr-notif" className="font-medium">
                      HR Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about leave requests, expenses, etc.
                    </p>
                  </div>
                  <Switch
                    id="hr-notif"
                    checked={hrNotifications}
                    onCheckedChange={setHrNotifications}
                  />
                </div>

                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize how the dashboard looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Currently using Light theme
                  </p>
                  <div className="p-4 rounded-lg border bg-card flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-white border-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Light Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Clean and professional appearance
                      </p>
                    </div>
                    <Badge className="ml-auto">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control who can see your information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={profileVisibility}
                    onValueChange={setProfileVisibility}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        Public - Everyone can see
                      </SelectItem>
                      <SelectItem value="team">
                        Team Only - Only team members
                      </SelectItem>
                      <SelectItem value="private">Private - Only me</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="show-email" className="font-medium">
                      Show Email Address
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Make your email visible to team members
                    </p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={showEmail}
                    onCheckedChange={setShowEmail}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="show-phone" className="font-medium">
                      Show Phone Number
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Make your phone visible to team members
                    </p>
                  </div>
                  <Switch
                    id="show-phone"
                    checked={showPhone}
                    onCheckedChange={setShowPhone}
                  />
                </div>

                <Button onClick={handleSavePrivacy}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Password</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Last changed 45 days ago
                    </p>
                    <Button variant="outline" onClick={handleChangePassword}>
                      Change Password
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Badge variant="outline">Not Enabled</Badge>
                    <Button variant="outline" className="ml-4">
                      Enable 2FA
                    </Button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Active Sessions</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage devices where you're currently logged in
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Chrome on MacBook Pro
                          </p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
