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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import {
  DollarSign,
  FileText,
  Calendar,
  Upload,
  Download,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

const HR = () => {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  // Mock data
  const salary = {
    basic: 85000,
    allowances: 15000,
    deductions: 8000,
    netPay: 92000,
    lastPaid: "2025-09-25",
    nextPayDate: "2025-10-25",
  };

  const leaveBalance = {
    annual: 15,
    sick: 10,
    casual: 5,
    used: 8,
  };

  const leaveHistory = [
    {
      id: 1,
      type: "Annual Leave",
      from: "2025-08-15",
      to: "2025-08-20",
      days: 5,
      status: "Approved",
    },
    {
      id: 2,
      type: "Sick Leave",
      from: "2025-07-10",
      to: "2025-07-11",
      days: 2,
      status: "Approved",
    },
    {
      id: 3,
      type: "Casual Leave",
      from: "2025-09-05",
      to: "2025-09-05",
      days: 1,
      status: "Pending",
    },
  ];

  const expenses = [
    {
      id: 1,
      description: "Conference Travel",
      amount: 1200,
      date: "2025-09-15",
      status: "Approved",
    },
    {
      id: 2,
      description: "Software License",
      amount: 299,
      date: "2025-09-20",
      status: "Pending",
    },
    {
      id: 3,
      description: "Team Lunch",
      amount: 150,
      date: "2025-09-22",
      status: "Rejected",
    },
  ];

  const documents = [
    {
      id: 1,
      name: "Employment Contract",
      type: "PDF",
      date: "2024-01-15",
      size: "245 KB",
    },
    {
      id: 2,
      name: "NDA Agreement",
      type: "PDF",
      date: "2024-01-15",
      size: "156 KB",
    },
    {
      id: 3,
      name: "Tax Documents 2024",
      type: "PDF",
      date: "2025-01-10",
      size: "892 KB",
    },
    {
      id: 4,
      name: "Performance Review Q3",
      type: "PDF",
      date: "2025-07-30",
      size: "324 KB",
    },
  ];

  const performanceReviews = [
    {
      id: 1,
      period: "Q3 2025",
      date: "2025-07-30",
      rating: 4.5,
      feedback:
        "Excellent performance on ExAfrik project. Strong technical skills and great team collaboration.",
      reviewer: "Sarah Johnson, CTO",
    },
    {
      id: 2,
      period: "Q2 2025",
      date: "2025-04-28",
      rating: 4.2,
      feedback:
        "Good progress on AgriTech project. Continue improving code review speed.",
      reviewer: "Sarah Johnson, CTO",
    },
  ];

  const handleLeaveRequest = () => {
    if (!leaveType || !leaveReason) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Your leave request has been submitted for approval");
    setLeaveType("");
    setLeaveReason("");
  };

  const handleExpenseRequest = () => {
    if (!expenseAmount || !expenseDescription) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Your expense request has been submitted for review");
    setExpenseAmount("");
    setExpenseDescription("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="secondary">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "Rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
              HR Portal
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your payroll, leaves, expenses, and documents
            </p>
          </div>
        </div>

        <Tabs defaultValue="payroll" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="leave">Leave</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Payroll Tab */}
          <TabsContent value="payroll" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Basic Salary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${salary.basic.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Per month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Allowances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    +${salary.allowances.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Benefits & bonuses
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Deductions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    -${salary.deductions.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tax & insurance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Net Pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    ${salary.netPay.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Take home
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payroll Summary
                </CardTitle>
                <CardDescription>
                  Your salary breakdown and payment schedule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg bg-accent/50">
                  <div>
                    <p className="font-medium">Last Payment</p>
                    <p className="text-sm text-muted-foreground">
                      {salary.lastPaid}
                    </p>
                  </div>
                  <Badge variant="outline">Processed</Badge>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-accent/50">
                  <div>
                    <p className="font-medium">Next Payment</p>
                    <p className="text-sm text-muted-foreground">
                      {salary.nextPayDate}
                    </p>
                  </div>
                  <Badge>Upcoming</Badge>
                </div>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Payslip
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leave Tab */}
          <TabsContent value="leave" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Annual Leave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {leaveBalance.annual}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Days remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Sick Leave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leaveBalance.sick}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Days remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Casual Leave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {leaveBalance.casual}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Days remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">
                    Leave Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {leaveBalance.used}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This year
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Leave</CardTitle>
                  <CardDescription>Submit a new leave request</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Leave Type</Label>
                    <Select value={leaveType} onValueChange={setLeaveType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual Leave</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="casual">Casual Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>From Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>To Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <Textarea
                      placeholder="Enter reason for leave"
                      value={leaveReason}
                      onChange={(e) => setLeaveReason(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleLeaveRequest}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Submit Leave Request
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Leave History</CardTitle>
                  <CardDescription>Your recent leave requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaveHistory.map((leave) => (
                    <div
                      key={leave.id}
                      className="flex justify-between items-center p-3 rounded-lg bg-accent/50"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{leave.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {leave.from} to {leave.to} ({leave.days} days)
                        </p>
                      </div>
                      {getStatusBadge(leave.status)}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Expense</CardTitle>
                  <CardDescription>
                    Request reimbursement for work expenses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Expense Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="software">Software/Tools</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="meals">
                          Meals & Entertainment
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe the expense"
                      value={expenseDescription}
                      onChange={(e) => setExpenseDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Receipt/Invoice</Label>
                    <Input type="file" />
                  </div>
                  <Button className="w-full" onClick={handleExpenseRequest}>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Expense Request
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense History</CardTitle>
                  <CardDescription>Your submitted expenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex justify-between items-start p-3 rounded-lg bg-accent/50"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {expense.date}
                        </p>
                        <p className="text-lg font-bold mt-1">
                          ${expense.amount}
                        </p>
                      </div>
                      {getStatusBadge(expense.status)}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Personal Documents
                </CardTitle>
                <CardDescription>
                  Access your employment documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-accent/50 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • {doc.size} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Performance Reviews
                </CardTitle>
                <CardDescription>
                  Your performance feedback and ratings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {performanceReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-lg border bg-card"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{review.period}</h3>
                        <p className="text-sm text-muted-foreground">
                          {review.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-600 text-yellow-600" />
                        <span className="text-2xl font-bold">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {review.feedback}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      - {review.reviewer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default HR;
