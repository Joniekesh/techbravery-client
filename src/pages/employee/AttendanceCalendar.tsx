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
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
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
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  PlayCircle,
  StopCircle,
  ArrowLeft,
  TrendingUp,
  Coffee,
} from "lucide-react";

const AttendanceCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  // Mock attendance data
  const attendanceData = {
    "2025-10-01": { status: "present", hours: 8.5 },
    "2025-10-02": { status: "present", hours: 9.0 },
    "2025-10-03": { status: "present", hours: 7.5 },
    "2025-10-04": { status: "leave", type: "Sick Leave" },
    "2025-10-05": { status: "present", hours: 8.0 },
    "2025-10-06": { status: "present", hours: 8.5 },
    "2025-10-07": { status: "late", hours: 7.0 },
  };

  const stats = {
    totalDays: 20,
    presentDays: 18,
    leaveDays: 2,
    lateDays: 1,
    averageHours: 8.2,
    totalHours: 147.5,
  };

  const leaveBalance = {
    annual: { total: 20, used: 5, remaining: 15 },
    sick: { total: 10, used: 2, remaining: 8 },
    casual: { total: 5, used: 1, remaining: 4 },
  };

  const recentLeaveRequests = [
    {
      id: 1,
      type: "Annual Leave",
      dates: "Oct 15-17, 2025",
      status: "Pending",
      days: 3,
    },
    {
      id: 2,
      type: "Sick Leave",
      dates: "Oct 4, 2025",
      status: "Approved",
      days: 1,
    },
    {
      id: 3,
      type: "Casual Leave",
      dates: "Sep 28, 2025",
      status: "Approved",
      days: 1,
    },
  ];

  const handleClockToggle = () => {
    setIsClockedIn(!isClockedIn);
    toast.success(
      isClockedIn
        ? "Your work session has been logged successfully."
        : "Started tracking your work time.",
    );
  };

  const handleLeaveRequest = () => {
    if (!leaveType || !leaveReason) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Your leave request has been sent to HR for approval.");
    setLeaveDialogOpen(false);
    setLeaveType("");
    setLeaveReason("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "leave":
        return <Coffee className="h-4 w-4 text-blue-600" />;
      case "late":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return "default";
      case "Pending":
        return "secondary";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const modifiers = {
    present: Object.keys(attendanceData)
      .filter(
        (key) =>
          attendanceData[key as keyof typeof attendanceData].status ===
          "present",
      )
      .map((dateStr) => new Date(dateStr)),
    leave: Object.keys(attendanceData)
      .filter(
        (key) =>
          attendanceData[key as keyof typeof attendanceData].status === "leave",
      )
      .map((dateStr) => new Date(dateStr)),
    late: Object.keys(attendanceData)
      .filter(
        (key) =>
          attendanceData[key as keyof typeof attendanceData].status === "late",
      )
      .map((dateStr) => new Date(dateStr)),
  };

  const modifiersStyles = {
    present: { backgroundColor: "hsl(var(--primary))", color: "white" },
    leave: { backgroundColor: "hsl(var(--chart-2))", color: "white" },
    late: { backgroundColor: "hsl(var(--chart-3))", color: "white" },
  };

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

          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Time & Attendance
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your work hours, manage leave requests, and view attendance
            history
          </p>
        </div>

        {/* Clock In/Out Card */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary-glow/10">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold font-mono">08:23:45</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isClockedIn ? "Active Work Time" : "Not Clocked In"}
                  </p>
                </div>
                <Button
                  size="lg"
                  variant={isClockedIn ? "destructive" : "default"}
                  onClick={handleClockToggle}
                  className="h-16"
                >
                  {isClockedIn ? (
                    <>
                      <StopCircle className="h-6 w-6 mr-2" />
                      Clock Out
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-6 w-6 mr-2" />
                      Clock In
                    </>
                  )}
                </Button>
              </div>

              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold">8.5h</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div className="border-l pl-6">
                  <p className="text-2xl font-bold">42.5h</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
                <div className="border-l pl-6">
                  <p className="text-2xl font-bold">{stats.totalHours}h</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mb-2" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.presentDays}</p>
                  <p className="text-sm text-muted-foreground">Present Days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <Coffee className="h-6 w-6 text-blue-600 mb-2" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.leaveDays}</p>
                  <p className="text-sm text-muted-foreground">Leave Days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <AlertCircle className="h-6 w-6 text-orange-600 mb-2" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.lateDays}</p>
                  <p className="text-sm text-muted-foreground">Late Days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <TrendingUp className="h-6 w-6 text-primary mb-2" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.averageHours}h</p>
                  <p className="text-sm text-muted-foreground">Avg Hours</p>
                </CardContent>
              </Card>
            </div>

            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Attendance Calendar
                </CardTitle>
                <CardDescription>
                  Your monthly attendance overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  className="rounded-md border pointer-events-auto"
                />

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: "hsl(var(--primary))" }}
                    />
                    <span className="text-sm">Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: "hsl(var(--chart-2))" }}
                    />
                    <span className="text-sm">Leave</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: "hsl(var(--chart-3))" }}
                    />
                    <span className="text-sm">Late</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leave Balance */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Balance</CardTitle>
                <CardDescription>Your available leave days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Annual Leave</span>
                    <span className="font-medium">
                      {leaveBalance.annual.remaining}/
                      {leaveBalance.annual.total}
                    </span>
                  </div>
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${(leaveBalance.annual.remaining / leaveBalance.annual.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sick Leave</span>
                    <span className="font-medium">
                      {leaveBalance.sick.remaining}/{leaveBalance.sick.total}
                    </span>
                  </div>
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{
                        width: `${(leaveBalance.sick.remaining / leaveBalance.sick.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Casual Leave</span>
                    <span className="font-medium">
                      {leaveBalance.casual.remaining}/
                      {leaveBalance.casual.total}
                    </span>
                  </div>
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600"
                      style={{
                        width: `${(leaveBalance.casual.remaining / leaveBalance.casual.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <Dialog
                  open={leaveDialogOpen}
                  onOpenChange={setLeaveDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full mt-2">Request Leave</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Leave</DialogTitle>
                      <DialogDescription>
                        Submit a leave request for approval
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">
                          Leave Type
                        </label>
                        <Select value={leaveType} onValueChange={setLeaveType}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="annual">Annual Leave</SelectItem>
                            <SelectItem value="sick">Sick Leave</SelectItem>
                            <SelectItem value="casual">Casual Leave</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Reason</label>
                        <Textarea
                          placeholder="Explain the reason for your leave..."
                          value={leaveReason}
                          onChange={(e) => setLeaveReason(e.target.value)}
                          rows={4}
                          className="mt-2"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleLeaveRequest} className="flex-1">
                          Submit Request
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setLeaveDialogOpen(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Recent Leave Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Leave Requests</CardTitle>
                <CardDescription>Recent leave request status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentLeaveRequests.map((request) => (
                  <div key={request.id} className="p-3 rounded-lg bg-accent/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{request.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.dates}
                        </p>
                      </div>
                      <Badge
                        variant={getStatusBadge(request.status)}
                        className="text-xs"
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {request.days} day(s)
                    </p>
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

export default AttendanceCalendar;
