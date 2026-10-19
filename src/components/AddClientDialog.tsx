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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, Lock, Plus } from "lucide-react";
import { toast } from "sonner";
import { makeRequest } from "@/utils/makeRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { IUserProfile } from "@/types/profile";
import { Role } from "@/types/user";
import { IDepartment } from "@/types/department";

type CreateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  subDepartmentId?: string;
  company?: string;
  role: Role;
};

export const USER_ROLES: { label: string; value: Role }[] = [
  {
    value: Role.USER,
    label: "Client / User",
  },
  {
    value: Role.STAFF,
    label: "Staff",
  },
];

export const AddClientDialog = ({ type }: { type: string }) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    subDepartmentId: "",
    company: "",
    role: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const queryClient = useQueryClient();

  const fetchDepartments = async () => {
    const res = await makeRequest.get("/employee-department");
    console.log(res);
    return res.data;
  };

  const {
    data: departments,
    isLoading,
    isError,
  } = useQuery<IDepartment[]>({
    queryKey: ["departments-all"],
    queryFn: fetchDepartments,
  });

  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >(null);

  const [selectedSubDepartmentId, setSelectedSubDepartmentId] = useState<
    string | null
  >(null);

  const selectedDepartment = departments?.find(
    (dept) => dept.id === selectedDepartmentId,
  );

  const createMutation = useMutation({
    mutationFn: async (newUser: CreateUserPayload) => {
      const res = await makeRequest.post("/user/create", newUser);
      return res.data;
    },
    onSuccess: (res: IUserProfile) => {
      toast.success(`${res.role} successfully created.`);
      queryClient.invalidateQueries({ queryKey: ["staff-all"] });
      queryClient.invalidateQueries({ queryKey: ["client-all"] });
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
      console.log(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.role === Role.STAFF && !selectedSubDepartmentId) {
      toast.warning("Please select a department and sub-department");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      toast.warning("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    if (!formData.role) {
      toast.warning("Please select an account type");
      return;
    }

    const payload: CreateUserPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || undefined,
      password: formData.password,
      subDepartmentId:
        formData.role === Role.STAFF
          ? formData.subDepartmentId || undefined
          : undefined,
      company: formData.company || undefined,
      role: formData.role as Role,
    };

    await createMutation.mutate(payload);

    setFormData({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      company: "",
      subDepartmentId: "",
      role: "",
      showPassword: false,
      showConfirmPassword: false,
    });

    setSelectedDepartmentId(null);
    setSelectedSubDepartmentId(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-primary-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add <span className="capitalize">{type}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Add New <span className="capitalize">{type}</span>{" "}
          </DialogTitle>
          <DialogDescription>
            Enter the user's information to add them to your database
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">First Name *</Label>
              <Input
                id="firstName"
                placeholder="John Doe"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="John Doe"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={formData.showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      showPassword: !formData.showPassword,
                    }))
                  }
                >
                  {formData.showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={formData.showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      showConfirmPassword: !formData.showConfirmPassword,
                    }))
                  }
                >
                  {formData.showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Company Inc."
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Role *</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    role: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user role" />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES?.map((role) => (
                    <SelectItem key={role.label} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData?.role === Role.STAFF && (
              <>
                <div className="space-y-2">
                  <Label>Main Department *</Label>
                  <Select
                    value={selectedDepartmentId ?? ""}
                    onValueChange={(value) => {
                      setSelectedDepartmentId(value);
                      setSelectedSubDepartmentId(null); // reset subdepartment
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments?.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sub Department *</Label>
                  <Select
                    value={selectedSubDepartmentId ?? ""}
                    onValueChange={(value) => {
                      setSelectedSubDepartmentId(value);
                      setFormData((prev) => ({
                        ...prev,
                        subDepartmentId: value,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub-department" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedDepartment?.subDepartments?.map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              disabled={createMutation.isPending}
              type="submit"
              className="flex-1 disabled:cursor-not-allowed"
            >
              {createMutation.isPending ? "Creating" : "Add Client"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
