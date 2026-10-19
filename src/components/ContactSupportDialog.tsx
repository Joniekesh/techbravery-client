import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Video, Phone, Mail, Headphones } from "lucide-react";
import { toast } from "sonner";

interface ContactSupportDialogProps {
  trigger?: React.ReactNode;
}

export const ContactSupportDialog = ({
  trigger,
}: ContactSupportDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    phone: "",
    preferredTime: "",
  });

  const handleScheduleVideo = () => {
    toast.success("You'll receive a calendar invite shortly");
    setOpen(false);
  };

  const handleRequestCall = () => {
    if (!formData.phone) {
      toast.error("Please enter your phone number");
      return;
    }
    toast.success("Our team will call you within 2 hours");
    setOpen(false);
  };

  const handleSendEmail = () => {
    if (!formData.subject || !formData.message) {
      toast.error("Please fill in subject and message");
      return;
    }
    toast.success("We'll respond within 24 hours");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Headphones className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
          <DialogDescription>
            Choose your preferred method to reach our support team
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="video">
              <Video className="w-4 h-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="call">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="priority">
              <Headphones className="w-4 h-4 mr-2" />
              Priority
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Schedule Video Call</h3>
                    <p className="text-sm text-muted-foreground">
                      Face-to-face consultation with our team
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="flex-col h-auto py-4">
                      <span className="font-semibold">Today</span>
                      <span className="text-xs text-muted-foreground">
                        3:00 PM
                      </span>
                    </Button>
                    <Button variant="outline" className="flex-col h-auto py-4">
                      <span className="font-semibold">Tomorrow</span>
                      <span className="text-xs text-muted-foreground">
                        10:00 AM
                      </span>
                    </Button>
                    <Button variant="outline" className="flex-col h-auto py-4">
                      <span className="font-semibold">Wed</span>
                      <span className="text-xs text-muted-foreground">
                        2:00 PM
                      </span>
                    </Button>
                  </div>
                  <Button onClick={handleScheduleVideo} className="w-full">
                    <Video className="w-4 h-4 mr-2" />
                    Confirm Video Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="call" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-green-500/10">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Request Phone Call</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll call you back within 2 hours
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button onClick={handleRequestCall} className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Request Call Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Send Email</h3>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                  <Button onClick={handleSendEmail} className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="priority" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-orange-500/10">
                    <Headphones className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">Priority Support</h3>
                      <Badge variant="secondary">Premium</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Instant access to senior support staff
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-secondary/20 rounded-lg space-y-2">
                    <p className="text-sm font-medium">
                      Priority Support Benefits:
                    </p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Immediate response (under 1 hour)</li>
                      <li>• Direct line to senior engineers</li>
                      <li>• Screen sharing support available</li>
                      <li>• 24/7 availability</li>
                    </ul>
                  </div>
                  <Button className="w-full">
                    <Headphones className="w-4 h-4 mr-2" />
                    Activate Priority Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
