import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  CheckCircle2,
  Quote,
} from "lucide-react";
import { toast } from "sonner";
import { makeRequest } from "@/utils/makeRequest";
import { uploadFiles, UploadResult } from "@/image/upload";
import Loader from "@/components/loader/Loader";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/getErrorMessage";

import {
  IProjectType,
  IQuote,
  QuoteComplexity,
  QuoteStatus,
  QuoteTimeline,
} from "@/types/quote";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProjectFeatures } from "@/redux/actions/quoteActions";
import { estimateQuote } from "@/utils/quoteEstimator";

const EditQuote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const auth = useAppSelector((state) => state.auth);
  const user = auth.user;

  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const quote = useAppSelector((state) => state.quote);
  const projectFeature = quote?.projectFeature;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectName: "",
    company: "",
    phone: "",
    complexity: QuoteComplexity.LOW,
    timeline: QuoteTimeline.TWO_TO_THREE_MONTHS,
    budgetRangeId: "",
    platformId: "",
    features: [] as string[],
    techStacks: [] as string[],
    projectType: "",
    description: "",
    targetUsers: "",
    additionalNotes: "",
  });

  const selectedPlatform = projectFeature?.platforms.find(
    (p) => p.id === formData.platformId,
  );

  const [selectedProjectType, setSelectedProjectType] =
    useState<IProjectType | null>(null);

  const estimate = estimateQuote({
    projectType: selectedProjectType?.value,
    platform: selectedPlatform?.name,
    features: formData.features,
    complexity: formData.complexity,
    timeline: formData.timeline,
  });

  const fetchQuote = async () => {
    const res = await makeRequest.get(`/quote/${id}`);
    return res.data;
  };

  /** Fetch existing quote */
  const { data: quoteData, isLoading: quoteLoading } = useQuery<IQuote>({
    queryFn: fetchQuote,
    queryKey: ["quote", id],
    enabled: !!id,
  });

  useEffect(() => {
    if (quoteData?.projectType) {
      setSelectedProjectType(quoteData.projectType);
    }
  }, [quoteData]);

  const currentProjetFeatures = projectFeature?.features?.find(
    (f) => f.projectType === selectedProjectType?.value,
  );

  const handleProjectTypeChange = (type: IProjectType) => {
    setSelectedProjectType(type);

    setFormData((prev) => ({
      ...prev,
      features: [], // reset invalid features
    }));
  };

  useEffect(() => {
    if (!quoteData) return;

    setFormData({
      fullName: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
      email: user?.email ?? "",
      projectName: quoteData.projectName,
      company: quoteData.company || "",
      phone: quoteData.phone || "",
      complexity: quoteData.complexity as QuoteComplexity,
      timeline: quoteData.timeline as QuoteTimeline,
      budgetRangeId: quoteData.budgetRange.id,
      features: quoteData.features.map((f: any) => f.id) || [],
      techStacks: quoteData.techStacks.map((t: any) => t.id) || [],
      description: quoteData.description,
      targetUsers: quoteData.targetUsers.join(", "),
      additionalNotes: quoteData.additionalNotes || "",
      projectType: quoteData.projectType?.id,
      platformId: quoteData.platformId?.id || "",
    });
    setFiles(quoteData.photos || []);
  }, [quoteData]);

  useEffect(() => {
    dispatch(fetchProjectFeatures());
  }, [dispatch]);

  useEffect(() => {
    if (
      quoteData?.status !== QuoteStatus.DRAFT &&
      quoteData?.status !== QuoteStatus.SUBMITTED
    ) {
      navigate(`/client-dashboard/quote/${id}`);
    }
  }, [quoteData]);

  /** Submit updated quote */
  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await makeRequest.put(`/quote/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Quote updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["quote", id] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate(`/client-dashboard/quote/${id}`);
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  /** Handle file upload */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate("/login");

    if (formData.description.length < 20) {
      return toast.error(
        "Project description must have 20 or more characters!",
      );
    }

    try {
      setUploading(true);
      setSubmitting(true);

      const filesToUpload = files.filter((f): f is File => f instanceof File);
      let uploadedImages: UploadResult[] = [];

      if (filesToUpload.length > 0) {
        uploadedImages = await uploadFiles({
          files: filesToUpload,
          fileNamePrefix: "quote",
          onProgress: (progress) => setUploadProgress(Math.round(progress)),
        });
      }

      const photos = [
        ...files.filter((f) => typeof f === "string"),
        ...uploadedImages.map((img) => img.url),
      ];

      mutation.mutate({
        ...formData,
        projectTypeId: selectedProjectType?.id,
        targetUsers: formData.targetUsers
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        photos,
      });
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  /** Feature toggle */
  const handleFeatureToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }));
  };

  /** Tech stack toggle */
  const handleTechStackToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      techStacks: prev.techStacks.includes(id)
        ? prev.techStacks.filter((t) => t !== id)
        : [...prev.techStacks, id],
    }));
  };

  /** File upload helpers */
  const openFileExplorer = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const removeFile = (idx: number) => {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles(newArr);
  };

  /** Drag & Drop */
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.includes("image"),
      );
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  if (quoteLoading || !quoteData || !projectFeature)
    return <Loader type="bounce" />;

  /** --- Render UI: replicate Quote component's multi-step form --- */
  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Edit{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-glow">
              Quote
            </span>
          </h1>
        </div>
      </section>

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
              {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-16 h-1 ${currentStep > step ? "bg-primary" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <form onSubmit={handleSubmit}>
            {/* --- Step 1: Project Details --- */}
            {currentStep === 1 && projectFeature && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Project Details
                  </CardTitle>
                  <CardDescription>Tell us about your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name * (Not editable) </Label>
                      <Input readOnly value={formData.fullName} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email * (Not editable) </Label>
                      <Input readOnly value={formData.email} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Project Type *</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {projectFeature.types.map((type) => (
                        <div
                          key={type.value}
                          className={cn(
                            "p-4 rounded-lg border cursor-pointer transition-all",
                            selectedProjectType?.value === type.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50",
                          )}
                          onClick={() => handleProjectTypeChange(type)}
                        >
                          <h3 className="font-semibold">{type.label}</h3>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complexity, Timeline, Budget Range */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Complexity (*)</Label>
                      <Select
                        value={formData.complexity}
                        onValueChange={(v) =>
                          setFormData((prev) => ({
                            ...prev,
                            complexity: v as QuoteComplexity,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select complexity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW">Simple</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">Complex</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Timeline (*)</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(v) =>
                          setFormData((prev) => ({
                            ...prev,
                            timeline: v as QuoteTimeline,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Expected timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={QuoteTimeline.ASAP}>
                            ASAP
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
                    <div>
                      <Label>Budget Range (*)</Label>
                      <Select
                        value={formData.budgetRangeId}
                        onValueChange={(v) =>
                          setFormData((prev) => ({ ...prev, budgetRangeId: v }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectFeature.budgetRanges.map((br) => (
                            <SelectItem value={br.id} key={br.id}>
                              {br.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={
                        !selectedProjectType ||
                        !formData.complexity ||
                        !formData.timeline ||
                        !formData.budgetRangeId
                      }
                    >
                      Next Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* --- Step 2: Features & Tech --- */}
            {currentStep === 2 && projectFeature && (
              <div className="flex flex-col gap-4">
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
                      <Calculator className="w-5 h-5" /> Features & Tech
                    </CardTitle>
                    <CardDescription>
                      Select features and tech stacks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Advanced Features (*)</Label>
                      <div className="grid md:grid-cols-3 gap-2">
                        {currentProjetFeatures?.features?.map((f) => (
                          <div key={f.id} className="flex items-center gap-2">
                            <Checkbox
                              checked={formData.features.includes(f.id)}
                              onCheckedChange={() => handleFeatureToggle(f.id)}
                            />
                            <Label>{f.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Tech Stacks (Optional)</Label>
                      <div className="grid md:grid-cols-4 gap-2">
                        {projectFeature.stacks.map((t) => (
                          <div key={t.id} className="flex items-center gap-2">
                            <Checkbox
                              checked={formData.techStacks.includes(t.id)}
                              onCheckedChange={() =>
                                handleTechStackToggle(t.id)
                              }
                            />
                            <Label>{t.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" onClick={() => setCurrentStep(1)}>
                        Previous
                      </Button>
                      <Button type="button" onClick={() => setCurrentStep(3)}>
                        Next
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* --- Step 3: Requirements & Files --- */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" /> Project Requirements
                  </CardTitle>
                  <CardDescription>
                    Provide detailed information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Project Name (*)</Label>
                    <Input
                      value={formData.projectName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          projectName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Project Description (*)</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={5}
                      required
                    />
                  </div>
                  <div>
                    <Label>Target Users</Label>
                    <Input
                      value={formData.targetUsers}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          targetUsers: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Additional Notes</Label>
                    <Textarea
                      value={formData.additionalNotes}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          additionalNotes: e.target.value,
                        }))
                      }
                      rows={4}
                    />
                  </div>

                  {/* File Upload */}
                  <input
                    type="file"
                    ref={inputRef}
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files)
                        setFiles((prev) => [
                          ...prev,
                          ...Array.from(e.target.files),
                        ]);
                    }}
                  />
                  <div
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={cn(
                      "border border-dashed p-4 rounded-lg text-center cursor-pointer",
                      dragActive ? "border-primary" : "border-border",
                    )}
                    onClick={openFileExplorer}
                  >
                    <p>
                      {dragActive
                        ? "Drop files here..."
                        : "Click or drag files to upload"}
                    </p>
                  </div>
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {files.map((file, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={
                              typeof file === "string"
                                ? file
                                : URL.createObjectURL(file)
                            }
                            alt="preview"
                            className="w-20 h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white"
                            onClick={() => removeFile(idx)}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary */}
                  <Card className="bg-amber-500">
                    <CardHeader>
                      <CardTitle className="text-lg">Quote Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Project Type:</span>
                        <Badge variant="secondary">
                          {selectedProjectType?.value}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Selected Features:</span>
                        <span>{formData.features.length} features</span>
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
                      {uploading && (
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

export default EditQuote;
