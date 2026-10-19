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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import { CheckCircle, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";

interface FormData {
  investmentAmount: string;
  message: string;
}

interface Props {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  selectedInvestment: string;
  investmentOpportunities: any[];
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const InvestmentForm = ({
  setShowForm,
  selectedInvestment,
  investmentOpportunities,
  formData,
  setFormData,
}: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <Card className="w-full max-w-md relative animate-in zoom-in duration-200">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10"
          onClick={() => setShowForm(false)}
        >
          <X className="w-4 h-4" />
        </Button>
        <CardHeader>
          <CardTitle>Investment Application</CardTitle>
          <CardDescription>
            {selectedInvestment
              ? `Submit your interest in ${investmentOpportunities.find((o) => o.id === selectedInvestment)?.name}`
              : "Submit your investment interest for review"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!formData.investmentAmount) {
                toast({
                  title: "Missing Information",
                  description: "Please fill in all required fields",
                  variant: "destructive",
                });
                return;
              }
              toast({
                title: "Application Submitted!",
                description:
                  "Our team will contact you within 24 hours to discuss next steps.",
              });
              setShowForm(false);
              setFormData({
                investmentAmount: "",
                message: "",
              });
              setTimeout(() => {
                navigate("/investor-dashboard");
              }, 1500);
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={user?.firstName + " " + user.lastName}
                  readOnly
                  // onChange={(e) =>
                  //   setFormData({ ...formData, name: e.target.value })
                  // }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={user.email ?? ""}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, email: e.target.value })
                  // }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investment">Investment Amount *</Label>
                <Select
                  value={formData.investmentAmount}
                  onValueChange={(value) =>
                    setFormData({ ...formData, investmentAmount: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select investment range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5000-25000">$5,000 - $25,000</SelectItem>
                    <SelectItem value="25000-100000">
                      $25,000 - $100,000
                    </SelectItem>
                    <SelectItem value="100000+">$100,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Investment Goals & Questions</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your investment thesis, areas of interest, timeline, or any questions..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      investmentAmount: "",
                      message: "",
                    });
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-primary-glow"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentForm;
