import { useEffect, useMemo, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  Bell,
  Lock,
  User,
  Building2,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import { industries } from "@/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { makeRequest } from "@/utils/makeRequest";
import { ICompany } from "@/types/company";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUser } from "@/redux/actions/authActions";
import ImageContainer from "@/image/ImageContainer";
import { TextTabs } from "@/components/shared/TextTabs";
import CountrySelect, {
  CountryOption,
} from "@/components/shared/CountrySelect";

const tabs = [
  { value: "profile", label: "Profile", icon: User },
  { value: "company", label: "Pompany", icon: Building2 },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "security", label: "Security", icon: Lock },
];

const ClientSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const [countryOfResidence, setCountryOfResidence] =
    useState<CountryOption | null>(null);

  const residenceDialCode = countryOfResidence?.dialCode ?? "";

  const auth = useAppSelector((state) => state.auth);
  const user = auth?.user;

  const dispatch = useAppDispatch();

  const fetchMyCompany = async () => {
    const res = await makeRequest.get("/company/me");
    return res.data;
  };

  const fetchProfile = async () => {
    const res = await makeRequest.get("/user/me");
    return res.data;
  };

  const queryClient = useQueryClient();

  const { data: company, isLoading } = useQuery<ICompany>({
    queryKey: ["my-company"],
    queryFn: fetchMyCompany,
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  console.log("PROFILE", profile);

  const [industry, setIndustry] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const [userState, setUserState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryOfResidenceId: "",
    userBio: "",
  });

  const [state, setState] = useState({
    companyName: "",
    bio: "",
    companyEmail: "",
    size: "",
    website: "",
    address: "",
  });

  const [passwordState, setPasswordState] = useState({
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
    loading: false,
  });

  useEffect(() => {
    if (company) {
      setIndustry(company.industry ?? "");
      setState({
        companyName: company.companyName ?? "",
        bio: company.bio ?? "",
        companyEmail: company.companyEmail ?? "",
        size: String(company.size ?? ""),
        website: company.website ?? "",
        address: company.address ?? "",
      });
    }
  }, [company]);

  const toCountryOption = (
    country:
      | {
          id: string;
          name: string;
          iso2: string;
          iso3: string;
          flag: string;
          isActive: boolean;
          isSupported: boolean;
          dialCode?: string | null;
        }
      | null
      | undefined,
  ): CountryOption | null => {
    if (!country) {
      return null;
    }

    return {
      id: country.id,
      name: country.name,
      iso2: country.iso2,
      iso3: country.iso3,
      flag: country.flag,
      isActive: country.isActive,
      isSupported: country.isSupported,
      dialCode: country.dialCode ?? "",
    };
  };

  useEffect(() => {
    if (user) {
      const persistedResidenceId = userState?.countryOfResidenceId ?? "";
      const userResidence = toCountryOption(profile?.country);

      let resolvedResidence: CountryOption | null = null;

      if (persistedResidenceId && userResidence?.id === persistedResidenceId) {
        resolvedResidence = userResidence;
      } else if (userResidence) {
        resolvedResidence = userResidence;
      }

      if (resolvedResidence) {
        setCountryOfResidence(resolvedResidence);
      }

      setUserState((prev) => ({
        ...prev,
        firstName: user.firstName ?? prev.firstName,
        lastName: user.lastName ?? prev.lastName,
        email: user.email ?? prev.email,
        phone: user.phone ?? prev.phone,
        userBio: user.bio ?? prev.userBio,
        countryOfResidenceId: profile?.country?.id ?? prev.countryOfResidenceId,
      }));
    }
  }, [user, profile]);

  const { companyName, bio, companyEmail, size, website, address } = state;
  const { firstName, userBio, email, lastName, phone } = userState;
  const { newPassword, oldPassword, confirmPassword } = passwordState;

  const handleSaveCompany = () => {
    if (!companyName || !companyEmail || !bio || !industry || !size) {
      toast.warning("All fields are required");
      return;
    }

    updateCompany();
  };

  const { mutate: updateCompany, isPending } = useMutation({
    mutationFn: async () => {
      if (
        companyEmail === "" ||
        companyEmail === "" ||
        bio === "" ||
        !size ||
        website === "" ||
        address === ""
      ) {
        toast.warning("All fields are required");
      }

      return makeRequest.post("/company", {
        ...state,
        industry,
        size: Number(state.size),
      });
    },
    onSuccess: () => {
      toast.success("Your company information has been updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-company"] });
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error) || "Update failed");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUserState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...userState,
      bio: userState.userBio,
    };

    await dispatch(updateUser(data));
  };

  const handleSaveNotifications = async () => {
    toast.success("Your notification preferences have been updated.");
  };

  const handleSavePassword = async () => {
    if (!newPassword || !oldPassword || !confirmPassword) {
      return toast.warning("New, old and confirm new passwords are required!");
    }

    if (newPassword !== confirmPassword) {
      return toast.warning("New and Confirm New Passwords do not match!");
    }

    const data = {
      oldPassword,
      newPassword,
    };

    setPasswordState((prev) => ({ ...prev, loading: true }));

    try {
      const res = await makeRequest.put("/auth/password/update", data);
      console.log(res.data);
      toast.success(res.data);
      setPasswordState((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);
      setPasswordState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <SEOHead
        title="Account Settings - Client Dashboard | TechBravery"
        description="Manage your account settings, preferences, and security options"
      />

      <section className="pt-24 pb-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/client-dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Account{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Settings
              </span>
            </h1>
            <p className="text-muted-foreground">
              Manage your account preferences and security
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TextTabs tabs={tabs} />

            {/* Profile Tab */}

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and profile photo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    {/* <ImageContainer
                        src={
                          previewUrl ||
                          user?.image ||
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                        }
                        className="w-16 h-16 rounded-full object-cover"
                      /> */}
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <label htmlFor="image" className="cursor-pointer">
                      <Button variant="outline" size="sm" type="button" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Change Photo
                        </span>
                      </Button>
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id="image"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          setFile(selectedFile);
                        }
                      }}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={handleUserChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={handleUserChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleUserChange}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <CountrySelect
                      label="Country of residence"
                      placeholder="Select country of residence"
                      value={countryOfResidence}
                      onChange={setCountryOfResidence}
                      required
                    />

                    <div className="space-y-2">
                      <Label htmlFor="registeredPhone">
                        Registered phone number
                      </Label>
                      <div className="flex min-h-11 overflow-hidden rounded-md border bg-background">
                        {/* Residence dial code */}
                        <div className="flex min-w-[90px] items-center gap-1.5 border-r bg-muted/60 px-3 text-sm font-medium">
                          {countryOfResidence?.flag && (
                            <span className="text-base leading-none">
                              {countryOfResidence.flag}
                            </span>
                          )}
                          <span> {residenceDialCode || "--"} </span>
                        </div>
                        {/* Editable phone */}
                        <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                          <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <Input
                            id="registeredPhone"
                            value={phone}
                            onChange={handleUserChange}
                            placeholder="Enter phone number"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel-national"
                            className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userBio">Bio</Label>
                    <Textarea
                      id="userBio"
                      placeholder="Tell us about yourself..."
                      value={userBio}
                      onChange={handleUserChange}
                      rows={4}
                    />
                  </div>

                  <Button type="button" onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    {auth.isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Company Tab */}
            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Manage your company details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Company Email</Label>
                    <Input
                      id="companyEmail"
                      value={companyEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>

                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Input id="size" value={size} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <Input
                      id="website"
                      value={website}
                      onChange={handleChange}
                      type="url"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleSaveCompany} disabled={isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to be notified
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notif">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch
                      id="email-notif"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notif">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get text message alerts
                      </p>
                    </div>
                    <Switch
                      id="sms-notif"
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="project-updates">Project Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications about project progress
                      </p>
                    </div>
                    <Switch
                      id="project-updates"
                      checked={projectUpdates}
                      onCheckedChange={setProjectUpdates}
                    />
                  </div>

                  <Button onClick={handleSaveNotifications}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and security options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Current Password</Label>
                    <Input
                      id="oldPassword"
                      type="password"
                      value={oldPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <Button
                    onClick={handleSavePassword}
                    type="button"
                    disabled={auth.isLoading}
                    className="disabled:cursor-not-allowed"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    {passwordState.loading ? "Loading..." : "Change Password"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ClientSettings;
