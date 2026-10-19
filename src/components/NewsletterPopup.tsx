import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Mail, Gift } from "lucide-react";
import { toast } from "sonner";

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasShown = localStorage.getItem("newsletter-popup-shown");
    const hasSubscribed = localStorage.getItem("newsletter-subscribed");

    if (!hasShown && !hasSubscribed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem("newsletter-popup-shown", "true");
      }, 10000); // Show after 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate subscription
    localStorage.setItem("newsletter-subscribed", "true");
    toast.success(
      "Welcome to our newsletter! Check your email for a special welcome offer.",
    );
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Don't show again for this session
    localStorage.setItem("newsletter-popup-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gradient-to-br from-card to-accent/10 border-0 shadow-2xl">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute top-2 right-2"
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
            <Gift className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Get Exclusive Tech Insights
          </CardTitle>
          <p className="text-muted-foreground">
            Join 5,000+ innovators receiving our weekly newsletter with:
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Latest African tech trends & insights
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Exclusive case studies & tutorials
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Early access to new platforms
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Free development resources
            </li>
          </ul>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-glow"
            >
              Subscribe & Get Free Resources
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            No spam, unsubscribe anytime. Read our{" "}
            <button className="text-primary hover:underline">
              Privacy Policy
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterPopup;
