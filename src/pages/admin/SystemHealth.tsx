import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Database,
  Server,
  Settings,
  Shield,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SystemHealth = () => {
  const stats = {
    totalQuotes: 15,
    pendingQuotes: 5,
    activeProjects: 8,
    totalRevenue: 450000,
    newInvestments: 3,
    platformUsers: 1250,
    systemUptime: 99.9,
    apiCalls: 1500000,
    securityAlerts: 2,
    monthlyGrowth: 23.5,
  };

  return (
    <div className="mt-20 ml-4 mr-4 mb-4 flex-1 flex-col">
      <h1 className="text-4xl font-bold my-6">
        <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          System Health
        </span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  service: "Web Server",
                  status: "Healthy",
                  uptime: "99.9%",
                  color: "bg-green-500",
                },
                {
                  service: "Database",
                  status: "Healthy",
                  uptime: "99.8%",
                  color: "bg-green-500",
                },
                {
                  service: "API Gateway",
                  status: "Healthy",
                  uptime: "99.7%",
                  color: "bg-green-500",
                },
                {
                  service: "File Storage",
                  status: "Warning",
                  uptime: "98.5%",
                  color: "bg-yellow-500",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${service.color}`} />
                    <div>
                      <p className="font-medium">{service.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {service.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{service.uptime}</p>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      {stats.securityAlerts} active alerts
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Failed Login Attempts</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Blocked IPs</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">SSL Certificate</span>
                  <Badge variant="outline" className="text-green-600">
                    Valid
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Platform Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Platform Name</Label>
                  <Input defaultValue="Techbravery Platform" />
                </div>
                <div>
                  <Label>Support Email</Label>
                  <Input defaultValue="support@techbravery.com" />
                </div>
                <div>
                  <Label>Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Time Zone</Label>
                  <Select defaultValue="wat">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wat">
                        West Africa Time (WAT)
                      </SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Maintenance Mode</Label>
                  <Select defaultValue="off">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off">Off</SelectItem>
                      <SelectItem value="on">On</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Update Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealth;
