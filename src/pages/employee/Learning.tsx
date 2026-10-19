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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  GraduationCap,
  Trophy,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  PlayCircle,
  CheckCircle,
  Star,
  Zap,
  ArrowLeft,
  Plus,
} from "lucide-react";

const Learning = () => {
  const navigate = useNavigate();
  const [newGoal, setNewGoal] = useState("");
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // Mock data
  const learningStats = {
    coursesCompleted: 12,
    hoursLearned: 84,
    certificationsEarned: 3,
    skillLevel: "Advanced",
    learningStreak: 15,
  };

  const activeCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      platform: "Frontend Masters",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      estimatedTime: "8h remaining",
      instructor: "Kent C. Dodds",
    },
    {
      id: 2,
      title: "System Design Fundamentals",
      platform: "Udemy",
      progress: 40,
      totalLessons: 32,
      completedLessons: 13,
      estimatedTime: "12h remaining",
      instructor: "Alex Xu",
    },
    {
      id: 3,
      title: "Docker & Kubernetes",
      platform: "Pluralsight",
      progress: 85,
      totalLessons: 20,
      completedLessons: 17,
      estimatedTime: "3h remaining",
      instructor: "Nigel Poulton",
    },
  ];

  const certifications = [
    {
      id: 1,
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      issueDate: "2025-06-15",
      expiryDate: "2027-06-15",
      credentialId: "AWS-CDA-2025-001234",
      status: "Active",
    },
    {
      id: 2,
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      issueDate: "2025-03-20",
      expiryDate: "2027-03-20",
      credentialId: "GCP-PRO-2025-005678",
      status: "Active",
    },
    {
      id: 3,
      name: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      issueDate: "2024-11-10",
      expiryDate: "2026-11-10",
      credentialId: "CSM-2024-009876",
      status: "Active",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Completed 10 courses in 3 months",
      icon: Zap,
      color: "text-yellow-600",
    },
    {
      id: 2,
      title: "Code Master",
      description: "Mastered 5 programming languages",
      icon: Trophy,
      color: "text-blue-600",
    },
    {
      id: 3,
      title: "Team Mentor",
      description: "Trained 5+ team members",
      icon: Award,
      color: "text-green-600",
    },
    {
      id: 4,
      title: "Streak Champion",
      description: "30 days learning streak",
      icon: Star,
      color: "text-orange-600",
    },
    {
      id: 5,
      title: "Knowledge Seeker",
      description: "Completed 100+ hours of learning",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      id: 6,
      title: "Certification Pro",
      description: "Earned 3 professional certifications",
      icon: GraduationCap,
      color: "text-red-600",
    },
  ];

  const skillGoals = [
    {
      id: 1,
      skill: "TypeScript",
      currentLevel: "Intermediate",
      targetLevel: "Advanced",
      progress: 70,
      deadline: "2025-12-31",
      resources: 3,
    },
    {
      id: 2,
      skill: "GraphQL",
      currentLevel: "Beginner",
      targetLevel: "Intermediate",
      progress: 45,
      deadline: "2025-11-30",
      resources: 2,
    },
    {
      id: 3,
      skill: "Cloud Architecture",
      currentLevel: "Intermediate",
      targetLevel: "Expert",
      progress: 55,
      deadline: "2026-03-31",
      resources: 4,
    },
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: "Advanced TypeScript Techniques",
      platform: "Udemy",
      rating: 4.8,
      students: "12,450",
      duration: "18 hours",
      level: "Advanced",
    },
    {
      id: 2,
      title: "Microservices Architecture",
      platform: "Coursera",
      rating: 4.7,
      students: "8,320",
      duration: "24 hours",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "AI for Developers",
      platform: "Frontend Masters",
      rating: 4.9,
      students: "15,670",
      duration: "12 hours",
      level: "Intermediate",
    },
  ];

  const handleAddGoal = () => {
    if (!newGoal) {
      toast.error("Please enter a goal");
      return;
    }
    toast.success("Your learning goal has been added successfully");
    setNewGoal("");
    setIsAddGoalOpen(false);
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
              Learning & Growth
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your professional development journey
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {learningStats.coursesCompleted}
              </div>
              <p className="text-sm text-muted-foreground">Courses Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {learningStats.hoursLearned}h
              </div>
              <p className="text-sm text-muted-foreground">Hours Learned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {learningStats.certificationsEarned}
              </div>
              <p className="text-sm text-muted-foreground">Certifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {learningStats.skillLevel}
              </div>
              <p className="text-sm text-muted-foreground">Skill Level</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {learningStats.learningStreak}
              </div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="courses">Active Courses</TabsTrigger>
            <TabsTrigger value="goals">Skill Goals</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>

          {/* Active Courses Tab */}
          <TabsContent value="courses" className="space-y-4">
            {activeCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>
                        {course.platform} • {course.instructor}
                      </CardDescription>
                    </div>
                    <Button>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-medium">
                        {course.completedLessons}/{course.totalLessons} lessons
                        • {course.estimatedTime}
                      </span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Skill Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-end mb-4">
              <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Learning Goal</DialogTitle>
                    <DialogDescription>
                      Set a new skill development goal
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Skill Name</Label>
                      <Input
                        placeholder="e.g., Machine Learning"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Target Level</Label>
                      <Input placeholder="e.g., Intermediate" />
                    </div>
                    <div className="space-y-2">
                      <Label>Target Date</Label>
                      <Input type="date" />
                    </div>
                    <Button className="w-full" onClick={handleAddGoal}>
                      <Target className="h-4 w-4 mr-2" />
                      Add Goal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {skillGoals.map((goal) => (
              <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        {goal.skill}
                      </CardTitle>
                      <CardDescription>
                        {goal.currentLevel} → {goal.targetLevel}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{goal.resources} resources</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-medium">
                        {goal.progress}% complete
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Target: {goal.deadline}
                    </span>
                    <Button size="sm" variant="outline">
                      View Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer}
                          </p>
                        </div>
                        <Badge className="bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {cert.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Issue Date</p>
                          <p className="font-medium">{cert.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expiry Date</p>
                          <p className="font-medium">{cert.expiryDate}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Credential ID</p>
                          <p className="font-mono text-xs">
                            {cert.credentialId}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={`p-4 rounded-full bg-accent ${achievement.color}`}
                      >
                        <achievement.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="font-bold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Unlocked
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recommended Tab */}
          <TabsContent value="recommended" className="space-y-4">
            {recommendedCourses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{course.title}</h3>
                        <Badge>{course.level}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {course.platform}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-600 text-yellow-600" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {course.students} students
                        </span>
                        <span className="text-muted-foreground">
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Learning;
