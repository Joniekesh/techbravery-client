import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { makeRequest } from "@/utils/makeRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IUserProfile } from "@/types/profile";
import { TeamRole, TeamMemberStatus, TEAM_ROLES } from "@/types/project";
import { getErrorMessage } from "@/utils/getErrorMessage";

export interface ProjectTeamFormItem {
  userId: string;
  role: TeamRole;
  allocation?: number;
  status: TeamMemberStatus;
}

const AddProjectTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<ProjectTeamFormItem[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [] } = useQuery<IUserProfile[]>({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await makeRequest.get("/user");
      return res.data;
    },
  });

  const selectedUserIds = teamMembers.map((m) => m.userId).filter(Boolean);

  // Mutation
  const mutation = useMutation({
    mutationFn: async (payload: any) =>
      await makeRequest.post("/project-team", payload),
    onSuccess: () => {
      toast.success("Project team updated successfully");
      queryClient.invalidateQueries({ queryKey: ["single-project", id] });
      navigate(`/admin-dashboard/project/${id}`);
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });

  const addTeamMember = () => {
    const hasIncomplete = teamMembers.some((m) => !m.userId);
    if (hasIncomplete) {
      toast.warning("Please select a user before adding another member");
      return;
    }
    setTeamMembers((prev) => [
      ...prev,
      {
        userId: "",
        role: TeamRole.INTERN,
        allocation: undefined,
        status: TeamMemberStatus.ACTIVE,
      },
    ]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTeamMember = (
    index: number,
    field: keyof ProjectTeamFormItem,
    value: any,
  ) => {
    setTeamMembers((prev) => {
      if (field === "userId") {
        const alreadySelected = prev.some(
          (m, i) => m.userId === value && i !== index,
        );
        if (alreadySelected) {
          toast.warning("This user has already been added to the team");
          return prev;
        }
      }
      const clone = [...prev];
      clone[index] = { ...clone[index], [field]: value };
      return clone;
    });
  };

  const buildPayload = () => {
    if (!id) throw new Error("Project ID missing");
    return teamMembers.map((member) => ({
      projectId: id,
      userId: member.userId,
      role: member.role,
      status: TeamMemberStatus.ACTIVE,
      allocation: member.allocation,
    }));
  };

  const handleSaveTeam = () => {
    if (!teamMembers.length) {
      toast.warning("Please add at least one team member");
      return;
    }
    if (teamMembers.some((m) => !m.userId)) {
      toast.warning("All team members must have a user selected");
      return;
    }
    const uniqueIds = new Set(teamMembers.map((m) => m.userId));
    if (uniqueIds.size !== teamMembers.length) {
      toast.warning("Duplicate team members detected");
      return;
    }

    mutation.mutate(buildPayload());
  };

  return (
    <div className="min-h-screen flex-1">
      <section className="pt-24 pb-8 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/admin-dashboard/project/$${id}`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Add Project Team{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Members
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Add teams to the project
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Project Team Members</CardTitle>
                      <CardDescription>
                        Assign users to this project
                      </CardDescription>
                    </div>
                    <Button size="sm" onClick={addTeamMember}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end border rounded-lg p-4"
                    >
                      {/* User */}
                      <div className="col-span-4 space-y-2">
                        <Label>User</Label>
                        <Select
                          value={member.userId}
                          onValueChange={(value) =>
                            updateTeamMember(index, "userId", value)
                          }
                        >
                          <SelectTrigger className="min-w-0">
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map((user) => {
                              const isSelected =
                                selectedUserIds.includes(user.id) &&
                                user.id !== member.userId;
                              return (
                                <SelectItem
                                  key={user.id}
                                  value={user.id}
                                  disabled={isSelected}
                                >
                                  {user.firstName} {user.lastName} ({user.email}
                                  ){isSelected && " — already added"}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Role */}
                      <div className="col-span-full sm:col-span-2 lg:col-span-4 space-y-2">
                        <Label>Role</Label>
                        <Select
                          value={member.role}
                          onValueChange={(value) =>
                            updateTeamMember(index, "role", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TEAM_ROLES.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Allocation */}
                      <div className="col-span-full sm:col-span-1 lg:col-span-3 space-y-2">
                        <Label>Allocation (%)</Label>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={member.allocation ?? ""}
                          onChange={(e) =>
                            updateTeamMember(
                              index,
                              "allocation",
                              e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            )
                          }
                        />
                      </div>

                      {/* Remove */}
                      <div className="col-span-full sm:col-span-2 lg:col-span-2 flex sm:justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => removeTeamMember(index)}
                          disabled={teamMembers.length === 1}
                        >
                          <Minus className="w-4 h-4 sm:mr-0 mr-2" />
                          <span className="sm:hidden">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}

                  {!teamMembers.length && (
                    <p className="text-sm text-muted-foreground">
                      No team members added yet.
                    </p>
                  )}

                  <Button
                    type="submit"
                    onClick={handleSaveTeam}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Saving..." : "Assign Members"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProjectTeamMembers;
