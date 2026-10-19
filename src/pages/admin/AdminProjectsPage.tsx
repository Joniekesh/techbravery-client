import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProjectWithQuoteAndUser } from "@/types/project";
import { makeRequest } from "@/utils/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { Edit3, Eye, Plus, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AdminProjectsPage = () => {
  const fetchProjects = async () => {
    const res = await makeRequest.get("/project");
    return res.data as ProjectWithQuoteAndUser[];
  };

  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    isError: isErrorProjects,
  } = useQuery<ProjectWithQuoteAndUser[]>({
    queryKey: ["project-all"],
    queryFn: fetchProjects,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "PENDING":
      case "SUBMITTED":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "ACCEPTED":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300";
      case "ON_HOLD":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "PAID":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "EXPIRED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "DECLINED":
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="mt-20 ml-4 mr-4 mb-4 flex-col">
      <h1 className="text-4xl font-bold my-6">
        <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Projects
        </span>
      </h1>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Active Projects
            </CardTitle>
            <CardDescription>
              Monitor ongoing development projects
            </CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects?.map((project, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">{project?.quote?.projectName}</h4>
                  <Badge className={getStatusColor(project?.status)}>
                    {project?.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Client:{" "}
                  {project?.user?.firstName + " " + project?.user?.lastName}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project?.progress}%</span>
                  </div>
                  <Progress value={project?.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{project?.teamSize} team members</span>
                    <span>
                      Due:{" "}
                      {project?.projectDueDate === null
                        ? "Not started"
                        : new Date(
                            project?.projectDueDate,
                          ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link to={`/admin-dashboard/projects/${project.id}`}>
                      <Eye className="w-3 h-3 mr-1" />
                      <span className="opacity-100">View</span>
                    </Link>
                    {/* <Link to={`/case-study/${index + 1}`}>
                                  <Eye className="w-3 h-3 mr-1" />
                                  <span className="opacity-100">View</span>
                                </Link> */}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link to={`/admin-dashboard/projects/${project.id}/edit`}>
                      <Edit3 className="w-3 h-3 mr-1" />
                      <span className="opacity-100">Edit</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProjectsPage;
