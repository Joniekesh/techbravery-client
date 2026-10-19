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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  Database,
  Shield,
  Mail,
  Bell,
  Palette,
  Globe,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { TextTabs } from "@/components/shared/TextTabs";

const tabs = [
  { value: "general", label: "General" },
  { value: "security", label: "Security" },
  { value: "email", label: "Email" },
  { value: "notifications", label: "Notifications" },
  { value: "appearance", label: "Appearance" },
  { value: "backup", label: "Backup" },
];

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState({
    siteName: "Techbravery",
    siteDescription: "Empowering Africa's Digital Evolution",
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    maxFileSize: "10",
    sessionTimeout: "30",
    apiRateLimit: "1000",
    emailService: "sendgrid",
    smtpHost: "smtp.sendgrid.net",
    smtpPort: "587",
    primaryColor: "#008080",
    secondaryColor: "#20B2AA",
    currency: "USD",
    timezone: "UTC",
  });

  const handleSave = () => {
    toast.success("System settings have been saved successfully.");
  };

  const handleTestEmail = () => {
    toast.success("Check your inbox for the test email.");
  };

  return (
    <div className="min-h-screen flex-1">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                System{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Settings
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Configure platform settings and preferences
              </p>
            </div>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-primary to-primary-glow"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </section>

      {/* Settings Content */}
      <section className="py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TextTabs tabs={tabs} />

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic platform configuration and site information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) =>
                        setSettings({ ...settings, siteName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) =>
                        setSettings({ ...settings, currency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="NGN">NGN (₦)</SelectItem>
                        <SelectItem value="KES">KES (KSh)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        siteDescription: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) =>
                        setSettings({ ...settings, timezone: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="Africa/Lagos">
                          Africa/Lagos
                        </SelectItem>
                        <SelectItem value="Africa/Nairobi">
                          Africa/Nairobi
                        </SelectItem>
                        <SelectItem value="America/New_York">
                          America/New_York
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={settings.maxFileSize}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          maxFileSize: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          sessionTimeout: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, maintenanceMode: checked })
                    }
                  />
                  <Label htmlFor="maintenanceMode">
                    Enable Maintenance Mode
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure security policies and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="apiRateLimit">
                        API Rate Limit (per hour)
                      </Label>
                      <Input
                        id="apiRateLimit"
                        type="number"
                        value={settings.apiRateLimit}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            apiRateLimit: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Two-Factor Authentication</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Password Policy</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label>Require uppercase letters</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label>Require numbers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label>Require special characters</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label>Force password change (90 days)</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div>
                      <h4 className="font-medium text-red-900">
                        Security Alerts
                      </h4>
                      <p className="text-sm text-red-700">
                        2 failed login attempts in the last hour
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto">
                      View Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription>
                  Configure SMTP settings and email templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emailService">Email Service</Label>
                    <Select
                      value={settings.emailService}
                      onValueChange={(value) =>
                        setSettings({ ...settings, emailService: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sendgrid">SendGrid</SelectItem>
                        <SelectItem value="mailgun">Mailgun</SelectItem>
                        <SelectItem value="smtp">Custom SMTP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) =>
                        setSettings({ ...settings, smtpHost: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={settings.smtpPort}
                      onChange={(e) =>
                        setSettings({ ...settings, smtpPort: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">SMTP Username</Label>
                    <Input id="smtpUser" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPass">SMTP Password</Label>
                    <Input id="smtpPass" type="password" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                  <div>
                    <h4 className="font-medium">Test Email Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Send a test email to verify settings
                    </p>
                  </div>
                  <Button onClick={handleTestEmail}>Send Test Email</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure system notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Quote Requests</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when clients submit quotes
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Project Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Milestone completions and status changes
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Invoice payments and overdue notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">System Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Security Incidents</p>
                        <p className="text-sm text-muted-foreground">
                          Failed logins and suspicious activity
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Server Performance</p>
                        <p className="text-sm text-muted-foreground">
                          High CPU usage and downtime alerts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            primaryColor: e.target.value,
                          })
                        }
                        className="w-20"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            primaryColor: e.target.value,
                          })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            secondaryColor: e.target.value,
                          })
                        }
                        className="w-20"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            secondaryColor: e.target.value,
                          })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Theme Preferences</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-secondary/20">
                      <div className="w-full h-20 bg-gradient-to-br from-primary to-primary-glow rounded mb-2"></div>
                      <p className="text-sm font-medium">Default Theme</p>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-secondary/20">
                      <div className="w-full h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded mb-2"></div>
                      <p className="text-sm font-medium">Ocean Theme</p>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-secondary/20">
                      <div className="w-full h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded mb-2"></div>
                      <p className="text-sm font-medium">Forest Theme</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Backup & Recovery
                </CardTitle>
                <CardDescription>
                  Configure automated backups and data recovery options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Last Backup</p>
                      <p className="text-sm text-green-700">
                        Today at 3:00 AM - All data backed up successfully
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Backup Now
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automatic Backups</p>
                      <p className="text-sm text-muted-foreground">
                        Daily backups at 3:00 AM
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, autoBackup: checked })
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Retention Period</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default AdminSettings;
