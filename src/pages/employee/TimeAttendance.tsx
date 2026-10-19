import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  LogIn,
  LogOut,
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

const TimeAttendance = () => {
  const navigate = useNavigate();
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClockToggle = () => {
    setIsClockedIn(!isClockedIn);
    toast.success("Attendance recorded.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/20 to-background">
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/staff-dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Time Tracking
              </h1>
              <p className="text-muted-foreground mt-2">
                Quick clock in/out and weekly overview
              </p>
            </div>

            <Button
              onClick={() => navigate("/employee/attendance")}
              size="lg"
              className="gap-2"
            >
              <CalendarDays className="h-5 w-5" />
              View Full Calendar
            </Button>
          </div>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary-glow/10">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold font-mono">08:32:15</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Current Work Time
                </p>
              </div>
              <Button
                size="lg"
                variant={isClockedIn ? "destructive" : "default"}
                onClick={handleClockToggle}
              >
                {isClockedIn ? (
                  <>
                    <LogOut className="h-5 w-5 mr-2" />
                    Clock Out
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Clock In
                  </>
                )}
              </Button>
              <div className="flex gap-4">
                <div>
                  <p className="text-2xl font-bold">42.5h</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
                <div className="border-l pl-4">
                  <p className="text-2xl font-bold">176h</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Attendance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                22 days present • 2 days leave • 98% attendance rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Request Leave</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TimeAttendance;
