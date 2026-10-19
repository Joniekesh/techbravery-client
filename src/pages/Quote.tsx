import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Clock,
  DollarSign,
  FileText,
  Upload,
  CheckCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { makeRequest, publicRequest } from "@/utils/makeRequest";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IPlatform,
  IProjectFeature,
  IProjectType,
  QuoteBudgetRange,
  QuoteComplexity,
  QuoteTimeline,
} from "@/types/quote";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader/Loader";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { uploadFiles, UploadResult } from "@/image/upload";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProjectFeatures } from "@/redux/actions/quoteActions";
import { Progress } from "@/components/ui/progress";
import { estimateQuote } from "@/utils/quoteEstimator";

const Quote = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [imagesURL, setImagesURL] = useState<any>([]);
  const [temporaryImagesURL, setTemporaryImagesURL] = useState<any>([]);
  const inputRef = useRef<any>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const auth = useAppSelector((state) => state.auth);
  const user = auth?.user;

  const queryClient = useQueryClient();

  const quote = useAppSelector((state) => state.quote);
  const projectFeature = quote?.projectFeature;

  const [formData, setFormData] = useState({
    fullName: "",
    projectName: "",
    email: "",
    company: "",
    phone: "",
    complexity: QuoteComplexity.LOW,
    timeline: QuoteTimeline.TWO_TO_THREE_MONTHS,
    budgetRangeId: "",
    platformId: "",
    features: [] as string[],
    techStacks: [] as string[],
    platforms: [] as string[],
    description: "",
    targetUsers: "",
    additionalNotes: "",
  });

  const [selectedProjectType, setSelectedProjectType] =
    useState<IProjectType | null>(null);

  const selectedPlatform = projectFeature?.platforms.find(
    (p) => p.id === formData.platformId,
  );

  const estimate = estimateQuote({
    projectType: selectedProjectType?.value,
    platform: selectedPlatform?.name,
    features: formData.features,
    complexity: formData.complexity,
    timeline: formData.timeline,
  });

  const currentFeature = projectFeature?.features?.find(
    (f) => f.projectType === selectedProjectType?.value,
  );
  console.log("CURRENT FEATURE", currentFeature);
  console.log("PROJECT FEATURE", projectFeature);

  // const formatBudget=(min: number, max: number) =>{
  //   return `$${min / 1000}k - $${max / 1000}k`;
  // }

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        email: user.email ?? "",
      }));
    }
  }, [user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].type.includes("image")
    ) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  console.log(formData);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login", {
  //       state: { from: location },
  //       replace: true,
  //     });
  //   }
  // }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
      return;
    }

    if (formData.description.length < 20) {
      return toast.warning(
        "Project description must be 20 or more characters!",
      );
    }

    if (
      formData.budgetRangeId === QuoteBudgetRange.FIVE_TO_15K &&
      estimate.price > 15000
    ) {
      return toast.warning(
        "Your selected features exceed your budget range. You may want to adjust scope.",
      );
    }

    try {
      setUploading(true);
      setSubmitting(true);

      const filesToUpload = files.filter(
        (file): file is File => file instanceof File,
      );

      let uploadedImages: UploadResult[] = [];

      if (filesToUpload.length > 0) {
        uploadedImages = await uploadFiles({
          files: filesToUpload,
          fileNamePrefix: "quote",
          onProgress: (progress) => {
            setUploadProgress(Math.round(progress));
          },
        });
      }

      const photos = uploadedImages.map((img) => img.url);

      const res = await makeRequest.post("/quote", {
        ...formData,
        estimatedCost: estimate.price,
        projectTypeId: selectedProjectType.id,
        targetUsers: formData.targetUsers
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
        photos,
      });

      if (res) {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast.success(
          "Thank you! We'll review your requirements and send a detailed proposal within 24–48 hours.",
        );

        setFiles([]);
        setUploadProgress(0);
        setCurrentStep(1);

        navigate(`/client-dashboard/quote/${res.data.id}`);
      }

      // setFormData(null);
      // setSelectedProjectType(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const handleTechStackToggle = (techId: string) => {
    setFormData((prev) => ({
      ...prev,
      techStacks: prev.techStacks.includes(techId)
        ? prev.techStacks.filter((t) => t !== techId)
        : [...prev.techStacks, techId],
    }));
  };

  useEffect(() => {
    dispatch(fetchProjectFeatures());
  }, [dispatch]);

  // console.log(data);

  const getMyNotifications = async () => {
    const res = await makeRequest.get("/notification/me");
    return res.data;
  };

  const getUnreadCount = async () => {
    const res = await makeRequest.get("/notification/unread/count");
    return res.data;
  };

  const { data: notifs } = useQuery({
    queryKey: ["my-notifications"],
    queryFn: getMyNotifications,
  });

  const { data: unreadNotifs } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCount,
  });

  console.log("MY NOTIFS", notifs);
  console.log("UNREAD NOTIFS", unreadNotifs);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Request a{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Quote
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get a detailed proposal for your project. Our smart form helps us
            understand your requirements and provide an accurate estimate within
            24-48 hours.
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-teal-700 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 ${currentStep > step ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-2 text-sm text-muted-foreground">
            <span>Project Details</span>
            <span>Features & Tech</span>
            <span>Requirements</span>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Project Details */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Project Details
                  </CardTitle>
                  <CardDescription>
                    Tell us about your project and basic requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full Name * (Not editable)
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        readOnly
                        value={formData.fullName}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address * (Not editable)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        readOnly
                        value={formData.email}
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Project Platforms */}
                  <div className="space-y-2">
                    <Label>Application Platform *</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          platformId: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectFeature?.platforms.map((platform) => (
                          <SelectItem key={platform.id} value={platform.id}>
                            {platform.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-4">
                    <Label>Project Type *</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {quote.isLoadingQuote ? (
                        <Loader type="bounce" />
                      ) : (
                        projectFeature?.types.map((type) => (
                          <div
                            key={type.value}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedProjectType?.value === type?.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedProjectType(type)}
                          >
                            <h3 className="font-semibold">{type.label}</h3>
                            <p className="text-sm text-muted-foreground">
                              {type.description}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Complexity & Timeline */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Complexity *</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            complexity: value as QuoteComplexity,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select complexity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={QuoteComplexity.LOW}>
                            Simple (Basic features)
                          </SelectItem>
                          <SelectItem value={QuoteComplexity.MEDIUM}>
                            Medium (Standard features)
                          </SelectItem>
                          <SelectItem value={QuoteComplexity.HIGH}>
                            Complex (Advanced features)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timeline *</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            timeline: value as QuoteTimeline,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Expected timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={QuoteTimeline.ASAP}>
                            ASAP (Rush)
                          </SelectItem>
                          <SelectItem value={QuoteTimeline.TWO_TO_THREE_MONTHS}>
                            2-3 months
                          </SelectItem>
                          <SelectItem value={QuoteTimeline.THREE_TO_SIX_MONTHS}>
                            3-6 months
                          </SelectItem>
                          <SelectItem value={QuoteTimeline.SIX_PLUS_MONTHS}>
                            6+ months
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Range *</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            budgetRangeId: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectFeature?.budgetRanges.map((range) => (
                            <SelectItem key={range.id} value={range.id}>
                              {range.label}
                              {/* {formatBudget(range.minAmount, range.maxAmount)} */}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => {
                        if (!user) {
                          navigate("/login", {
                            state: { from: location },
                            replace: true,
                          });
                          return;
                        }

                        if (
                          !formData.email ||
                          !formData.fullName ||
                          !formData.complexity ||
                          !formData.timeline ||
                          !formData.budgetRangeId ||
                          !formData.platformId ||
                          !selectedProjectType
                        ) {
                          return toast.warning(
                            "All marked fields are required to continue to the next step.",
                          );
                        }
                        setCurrentStep(2);
                      }}
                      disabled={!selectedProjectType}
                    >
                      Next Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Features & Technology */}
            {currentStep === 2 && (
              <div className="flex flex-col ">
                <Card className="bg-secondary/20 border-dashed">
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">
                      Core Foundation *
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Included by default
                    </Badge>
                  </CardHeader>

                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {projectFeature?.coreFeatures?.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                          <span>{feature.name}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                      These foundational components are included in every
                      project to ensure security, scalability, and production
                      readiness.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Features & Technology
                    </CardTitle>
                    <CardDescription>
                      Select the features and technologies you need
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div className="space-y-4">
                      <Label>Advanced Features (Optional)</Label>
                      <div className="grid md:grid-cols-3 gap-3">
                        {currentFeature?.features.map((feature) => (
                          <div key={feature.id} className="flex space-x-2">
                            <Checkbox
                              id={feature.id}
                              checked={formData.features.includes(feature.id)}
                              onCheckedChange={() =>
                                handleFeatureToggle(feature.id)
                              }
                            />
                            <Label htmlFor={feature.name} className="text-sm">
                              {feature.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-4">
                      <Label>Preferred Tech Stack (Optional)</Label>
                      <div className="grid md:grid-cols-4 gap-3">
                        {projectFeature?.stacks.map((tech) => (
                          <div
                            key={tech.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={tech.name}
                              checked={formData.techStacks.includes(tech.id)}
                              onCheckedChange={() =>
                                handleTechStackToggle(tech.id)
                              }
                            />
                            <Label htmlFor={tech.name} className="text-sm">
                              {tech.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Estimate Preview */}
                    {selectedProjectType && (
                      <Card className="bg-secondary/20">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Preliminary Estimate
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <DollarSign className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Estimated Cost
                                </p>
                                <p className="text-xl font-bold">
                                  ${estimate.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-primary" />
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Estimated Timeline
                                </p>
                                <p className="text-xl font-bold">
                                  {estimate.timelineWeeks} weeks
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3">
                            *This is a preliminary estimate. Final pricing will
                            be provided in your detailed proposal.
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        type="button"
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          // if (formData.features.length < 1) {
                          //   return toast.warning(
                          //     "Please select at least one project feature.",
                          //   );
                          // }
                          setCurrentStep(3);
                        }}
                      >
                        Next Step
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Requirements */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Project Requirements
                  </CardTitle>
                  <CardDescription>
                    Provide detailed information about your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      value={formData.projectName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          projectName: e.target.value,
                        }))
                      }
                      required
                      id="projectName"
                      placeholder="Provide exact project name e.g E-commerce Platform, Fitness Tracker Mobile App, AI Analytics Dashboard"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Project Description * (Min. 20 characters)
                    </Label>
                    <Textarea
                      id="description"
                      minLength={20}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe your project in detail. What problem does it solve? What are the main objectives?"
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetUsers">Target Users (Optional)</Label>
                    <Input
                      id="targetUsers"
                      value={formData.targetUsers}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          targetUsers: e.target.value,
                        }))
                      }
                      placeholder="Who will use this application? (e.g., Small businesses, Students, General public)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">
                      Additional Notes (Optional)
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          additionalNotes: e.target.value,
                        }))
                      }
                      placeholder="Any additional requirements, constraints, or information you'd like to share..."
                      rows={4}
                    />
                  </div>

                  <input
                    placeholder="fileInput"
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    multiple={true}
                    onChange={handleChange}
                    accept="image/*"
                  />

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>Supporting Documents (Optional)</Label>
                    <div
                      onDragEnter={handleDragEnter}
                      onSubmit={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      className={cn(
                        "flex flex-col rounded-lg p-6 text-center transition-colors",
                        dragActive
                          ? "border-2 border-dashed border-teal-600 bg-teal-50/30"
                          : "border-2 border-dashed border-muted",
                      )}
                    >
                      {files.length < 1 ? (
                        <>
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop wireframes, mockups, or documents
                          </p>
                          <span>OR</span>
                          <Button
                            onClick={() => openFileExplorer()}
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-fit mx-auto"
                            id="file"
                          >
                            Choose Files
                          </Button>
                        </>
                      ) : (
                        <div className="p-4">
                          <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="h-[130px] relative overflow-hidden rounded-lg"
                              >
                                {typeof file === "string" ? (
                                  <img
                                    src={file}
                                    alt="remote"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt="local"
                                    className="w-full h-full object-cover"
                                  />
                                )}

                                <div className="absolute h-full w-full top-0 left-0 z-30 bg-black/10 p-2 flex justify-end">
                                  <X
                                    onClick={() => removeFile(index)}
                                    color="white"
                                    className="w-[25px] h-[25px] flex items-center justify-center rounded-full bg-red-500 p-1 shadow-md cursor-pointer"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-col gap-3 md:flex-row md:items-center mt-5 md:justify-between">
                            <div className="flex items-center justify-between gap-4">
                              <Button
                                onClick={() => {
                                  setFiles([]);
                                  setTemporaryImagesURL([]);
                                  setImagesURL(
                                    imagesURL.filter(
                                      (item: string) =>
                                        !temporaryImagesURL.includes(item),
                                    ),
                                  );
                                }}
                                type="button"
                                className="text-md rounded-md h-fit p-2 px-8"
                                variant="outline"
                                color="warning"
                              >
                                <p>Clear all</p>
                              </Button>
                              <Button
                                onClick={() => openFileExplorer()}
                                type="button"
                                className="text-primary text-md border-primary rounded-md h-fit p-2 px-8"
                                variant="outline"
                              >
                                <p>Select more</p>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <Card className="bg-amber-500">
                    <CardHeader>
                      <CardTitle className="text-lg">Quote Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Project Type:</span>
                        <Badge variant="secondary">
                          {selectedProjectType?.label}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Selected Features:</span>
                        <span>
                          {formData.features.length} Advanced features
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Cost:</span>
                        <span className="font-bold">
                          ${estimate.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Timeline:</span>
                        <span className="font-bold">
                          {estimate.timelineWeeks} weeks
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      type="button"
                    >
                      Previous
                    </Button>
                    <div className="flex flex-col w-full gap-2 md:flex-row md:items-center md:gap-4">
                      {/* Submit button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-fit"
                        disabled={
                          !formData.description || uploading || submitting
                        }
                      >
                        {submitting
                          ? "Submitting quote..."
                          : uploading
                            ? `Uploading files… ${uploadProgress}%`
                            : "Submit Quote Request"}
                      </Button>

                      {/* Progress bar */}
                      {uploading && files.length > 0 && (
                        <div className="w-full md:w-1/2 flex flex-col gap-1 mt-2 md:mt-0">
                          <p className="text-sm text-muted-foreground">
                            Uploading files…
                          </p>
                          <div className="relative w-full h-3 bg-gray-200 rounded-md overflow-hidden">
                            <div
                              className="h-3 bg-orange-500 transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <span className="text-xs text-right text-gray-600">
                            {uploadProgress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Quote;
