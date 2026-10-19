import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { makeRequest } from "@/utils/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "recharts";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    status: "",
    paymentStatus: "",
    hostedUrl: "",
    testUrl: "",
    repoUrl: "",
    projectDueDate: "",
    amountSpent: "",
    milestones: "",
    progress: "",
    teams: [],
  });

  const fetchProject = async () => {
    const res = await makeRequest.get(`/project/${id}`);
    return res.data;
  };

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["single-project", id],
    queryFn: fetchProject,
    enabled: !!id,
  });
  console.log(project);

  useEffect(() => {
    if (!id) return;
  }, []);

  return (
    <div>
      <div className="min-h-screen">
        <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Update your{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    Quote
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Generate a detailed project quote for your client
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 space-y-6 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                    <CardDescription>
                      Basic details about your this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Client Name *</Label>
                      <Input id="clientName" placeholder="John Smith" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Team Members</CardTitle>
                    <CardDescription>
                      Update project team members
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4"></CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Milestones</CardTitle>
                    <CardDescription>Manage project milestones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4"></CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditProject;
