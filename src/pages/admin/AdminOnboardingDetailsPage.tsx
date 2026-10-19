import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileCheck2,
  FileImage,
  FileText,
  History,
  Info,
  Loader2,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { makeRequest } from "@/utils/makeRequest";
import { useAdminOnboarding } from "@/services/onboarding";
import { queryClient } from "@/services/queryClient";

const ADMIN_ONBOARDING_ENDPOINTS = {
  approve: (id: string) => `/investor-onboarding/admin/${id}/approve`,
  reject: (id: string) => `/investor-onboarding/admin/${id}/reject`,
  requestInformation: (id: string) =>
    `/investor-onboarding/admin/${id}/request-more-info`,
};

type AnyRecord = Record<string, any>;

type ReviewAction = "approve" | "reject" | "request-information";

type OnboardingDocument = {
  id?: string;
  onboardingId?: string;
  assetId?: string;
  documentType?: string;
  type?: string;
  status?: string;
  uploadedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  asset?: {
    id?: string;
    url?: string;
    fileName?: string;
    mimeType?: string;
    size?: number;
    fileId?: string;
  } | null;
  url?: string;
  name?: string;
  fileName?: string;
  mimeType?: string;
  size?: number;
};

type OnboardingRecord = {
  id: string;
  userId?: string;
  reference?: string;
  investmentAmount?: string | number | null;
  status?: string;
  currentStep?: string;
  completedSteps?: string[];
  createdAt?: string;
  updatedAt?: string;
  submittedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  rejectionReason?: string | null;
  reviewNote?: string | null;
  reviewedBy?: {
    firstName: string;
    email: string;
    id: string;
    lastName: string;
  } | null;
  reviewedById?: string | null;
  moreInfoRequested?: boolean;
  moreInfoMessage?: string | null;
  moreInfoRequestedAt?: string | null;
  moreInfoResolvedAt?: string | null;
  onboardingData?: AnyRecord;
  documents?: OnboardingDocument[];
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  investmentInterest?: AnyRecord | null;
  reviewedAt?: string | null;
  deletedAt?: string | null;
};

// -----------------------------------------------------------------------------
// Formatting helpers
// -----------------------------------------------------------------------------

function titleCase(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatStatus(value?: string | null) {
  return titleCase(value || "UNKNOWN");
}

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatDateOnly(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "long",
  }).format(date);
}

function formatMoney(value: unknown, currency = "NGN") {
  if (value === null || value === undefined || value === "") return "—";

  const number = Number(value);
  if (!Number.isFinite(number)) return String(value);

  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(number);
  } catch {
    return number.toLocaleString();
  }
}

function formatNumber(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";

  const number = Number(value);
  return Number.isFinite(number)
    ? new Intl.NumberFormat("en-NG", {
        maximumFractionDigits: 2,
      }).format(number)
    : String(value);
}

function formatBytes(value?: number) {
  if (value === undefined || value === null || !Number.isFinite(value)) {
    return "—";
  }

  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;

  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
}

function isEmpty(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

function getDisplayName(user?: OnboardingRecord["user"]) {
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  return name || "Unnamed applicant";
}

function statusClass(status?: string) {
  switch (status?.toUpperCase()) {
    case "APPROVED":
    case "VERIFIED":
    case "COMPLETED":
    case "ACCEPTED":
      return "border-green-200 bg-green-50 text-green-700";

    case "REJECTED":
    case "FAILED":
    case "EXPIRED":
      return "border-red-200 bg-red-50 text-red-700";

    case "SUBMITTED":
    case "PENDING":
    case "UNDER_REVIEW":
    case "UPLOADED":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "REQUESTED":
    case "REQUIRES_INFORMATION":
      return "border-blue-200 bg-blue-50 text-blue-700";

    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
}

function safeExternalUrl(value?: string | null) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function documentName(document: OnboardingDocument) {
  return (
    document.asset?.fileName ||
    document.fileName ||
    document.name ||
    titleCase(document.documentType || document.type)
  );
}

function documentType(document: OnboardingDocument) {
  return document.documentType || document.type || "OTHER";
}

function documentUrl(document: OnboardingDocument) {
  return safeExternalUrl(document.asset?.url || document.url);
}

function documentMimeType(document: OnboardingDocument) {
  return document.asset?.mimeType || document.mimeType || "";
}

function documentSize(document: OnboardingDocument) {
  return document.asset?.size ?? document.size;
}

// -----------------------------------------------------------------------------
// Reusable UI components
// -----------------------------------------------------------------------------

function StatusBadge({ status }: { status?: string | null }) {
  return (
    <Badge variant="outline" className={statusClass(status || undefined)}>
      {formatStatus(status)}
    </Badge>
  );
}

function SectionCard({
  title,
  description,
  icon: Icon,
  children,
  action,
}: {
  title: string;
  description?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="flex min-w-0 items-start gap-3">
          {Icon && (
            <div className="rounded-lg border bg-muted/40 p-2">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}

          <div className="min-w-0">
            <CardTitle className="text-base">{title}</CardTitle>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {action}
      </CardHeader>

      <CardContent className="min-w-0 space-y-4">{children}</CardContent>
    </Card>
  );
}

function InfoGrid({
  children,
  columns = 2,
}: {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-6 gap-y-4 ${
        columns === 1
          ? ""
          : columns === 3
            ? "sm:grid-cols-2 xl:grid-cols-3"
            : "sm:grid-cols-2"
      }`}
    >
      {children}
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className={`break-words text-sm ${mono ? "font-mono text-xs" : ""}`}>
        {value === null || value === undefined || value === "" ? "—" : value}
      </div>
    </div>
  );
}

function KeyValueList({
  data,
  exclude = [],
  showEmpty = false,
  columns = 2,
}: {
  data?: AnyRecord | null;
  exclude?: string[];
  showEmpty?: boolean;
  columns?: 1 | 2 | 3;
}) {
  if (!data || typeof data !== "object") {
    return (
      <p className="text-sm text-muted-foreground">No information available.</p>
    );
  }

  const entries = Object.entries(data).filter(([key, value]) => {
    if (exclude.includes(key)) return false;
    if (!showEmpty && isEmpty(value)) return false;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return false;
    }
    return true;
  });

  if (!entries.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No applicable information provided.
      </p>
    );
  }

  return (
    <InfoGrid columns={columns}>
      {entries.map(([key, value]) => {
        let display: React.ReactNode;

        if (typeof value === "boolean") {
          display = (
            <Badge
              variant="outline"
              className={
                value
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-gray-200 bg-gray-50 text-gray-700"
              }
            >
              {value ? "Yes" : "No"}
            </Badge>
          );
        } else if (Array.isArray(value)) {
          display = value.length ? value.map(String).join(", ") : "—";
        } else {
          display = String(value);
        }

        return <InfoRow key={key} label={titleCase(key)} value={display} />;
      })}
    </InfoGrid>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function DeclarationRow({
  label,
  value,
}: {
  label: string;
  value: boolean | undefined;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border p-3">
      <div className="flex items-start gap-2">
        {value ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
        ) : (
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        )}
        <span className="text-sm">{label}</span>
      </div>
      <Badge
        variant="outline"
        className={
          value
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-amber-200 bg-amber-50 text-amber-700"
        }
      >
        {value ? "Confirmed" : "Not confirmed"}
      </Badge>
    </div>
  );
}

function DocumentPreview({
  document,
  onPreview,
}: {
  document: OnboardingDocument;
  onPreview: (document: OnboardingDocument) => void;
}) {
  const url = documentUrl(document);
  const mimeType = documentMimeType(document);
  const image = mimeType.startsWith("image/");

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border">
      <button
        type="button"
        onClick={() => onPreview(document)}
        className="block w-full text-left"
        disabled={!url}
      >
        <div className="flex h-40 items-center justify-center overflow-hidden bg-muted/30">
          {url && image ? (
            <img
              src={url}
              alt={documentName(document)}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              {mimeType === "application/pdf" ? (
                <FileText className="h-10 w-10" />
              ) : (
                <FileImage className="h-10 w-10" />
              )}
              <span className="text-xs">
                {url ? "Open document" : "No preview available"}
              </span>
            </div>
          )}
        </div>
      </button>

      <div className="space-y-3 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="break-words text-sm font-medium">
              {titleCase(documentType(document))}
            </p>
            {/* <p className="mt-1 break-all text-xs text-muted-foreground">
              {documentName(document)}
            </p> */}
          </div>

          <StatusBadge status={document.status} />
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{formatBytes(documentSize(document))}</span>
          {mimeType && <span>{mimeType}</span>}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={!url}
            onClick={() => onPreview(document)}
          >
            <ExternalLink className="mr-2 h-3.5 w-3.5" />
            Preview
          </Button>

          {url && (
            <Button size="sm" variant="ghost" asChild>
              <a href={url} target="_blank" rel="noreferrer">
                <Download className="mr-2 h-3.5 w-3.5" />
                Open file
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepProgress({
  completedSteps = [],
  currentStep,
}: {
  completedSteps?: string[];
  currentStep?: string;
}) {
  const knownSteps = [
    "welcome",
    "classification",
    "tax",
    "documents",
    "agreements",
  ];

  const steps = [...knownSteps];

  for (const step of completedSteps) {
    if (!steps.includes(step)) steps.push(step);
  }

  if (currentStep && !steps.includes(currentStep)) {
    steps.push(currentStep);
  }

  return (
    <div className="space-y-3">
      {steps.map((step) => {
        const completed = completedSteps.includes(step);
        const current = currentStep === step;

        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                completed
                  ? "border-green-600 bg-green-600 text-white"
                  : current
                    ? "border-primary text-primary"
                    : "border-muted-foreground/30 text-muted-foreground"
              }`}
            >
              {completed ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-xs">{steps.indexOf(step) + 1}</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{titleCase(step)}</p>
              <p className="text-xs text-muted-foreground">
                {completed
                  ? "Completed"
                  : current
                    ? "Current step"
                    : "Not marked complete"}
              </p>
            </div>

            {current && <Badge variant="outline">Current</Badge>}
          </div>
        );
      })}
    </div>
  );
}

export default function AdminOnboardingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [action, setAction] = useState<ReviewAction | null>(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDocument, setPreviewDocument] =
    useState<OnboardingDocument | null>(null);

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useAdminOnboarding(id || "");

  const onboarding: OnboardingRecord | undefined = useMemo(() => {
    const payload = response?.data ?? response;
    const candidate =
      payload?.onboarding ?? payload?.item ?? payload?.result ?? payload;

    if (!candidate || typeof candidate !== "object" || !candidate.id) {
      return undefined;
    }

    return candidate as OnboardingRecord;
  }, [response]);

  const data = onboarding?.onboardingData ?? {};
  const classification = data.classification ?? {};
  const tax = data.tax ?? {};
  const agreements = data.agreements ?? {};
  const declarations = agreements.declarations ?? {};
  const investmentInterest = onboarding?.investmentInterest ?? null;

  const application = investmentInterest?.application ?? null;
  const investorProfile = investmentInterest?.investorProfile ?? null;

  const investmentAmount = onboarding?.investmentAmount;
  const investmentCurrency =
    application?.currency?.code || application?.currency?.symbol || "NGN";

  const applicantName = getDisplayName(onboarding?.user);

  console.log("ONBOARDING", onboarding);

  const isFinalStatus = ["APPROVED", "REJECTED"].includes(
    onboarding?.status?.toUpperCase() || "",
  );

  const canReview = !!onboarding && !isFinalStatus && !onboarding.deletedAt;

  // Prefer the canonical document relation because it includes onboarding
  // document status/timestamps. Enrich it with onboardingData metadata.
  const documents: OnboardingDocument[] = useMemo(() => {
    const canonical = onboarding?.documents ?? [];
    const embedded = Array.isArray(data.documents) ? data.documents : [];

    if (!canonical.length) return embedded;

    return canonical.map((document) => {
      const assetId = document.assetId || document.asset?.id || document.id;

      const match = embedded.find(
        (item: AnyRecord) =>
          item.assetId && assetId && item.assetId === assetId,
      );

      return {
        ...match,
        ...document,
        asset: {
          ...(match ?? {}),
          ...(document.asset ?? {}),
          url: document.asset?.url || match?.url || document.url,
          fileName:
            document.asset?.fileName || match?.name || document.fileName,
          mimeType:
            document.asset?.mimeType || match?.mimeType || document.mimeType,
          size: document.asset?.size ?? match?.size ?? document.size,
        },
      };
    });
  }, [onboarding?.documents, data.documents]);

  const handleReviewAction = async () => {
    if (!onboarding?.id || !action) return;

    setActionError("");

    if (
      (action === "reject" || action === "request-information") &&
      !reviewMessage.trim()
    ) {
      setActionError(
        action === "reject"
          ? "A rejection reason is required."
          : "Please specify the additional information required.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (action === "approve") {
        await makeRequest.put(
          ADMIN_ONBOARDING_ENDPOINTS.approve(onboarding.id),
          {
            reviewNote: reviewMessage.trim() || undefined,
          },
        );
        toast.success("Onboarding approved successfully.");
      }

      if (action === "reject") {
        await makeRequest.put(
          ADMIN_ONBOARDING_ENDPOINTS.reject(onboarding.id),
          {
            rejectionReason: reviewMessage.trim(),
            reviewNote: reviewMessage.trim(),
          },
        );
        toast.success("Onboarding rejected.");
      }

      if (action === "request-information") {
        await makeRequest.put(
          ADMIN_ONBOARDING_ENDPOINTS.requestInformation(onboarding.id),
          {
            message: reviewMessage.trim(),
          },
        );
        toast.success("Additional information requested.");
      }

      setAction(null);
      setReviewMessage("");

      await Promise.all([
        refetch(),
        queryClient.invalidateQueries({
          queryKey: ["admin-onboarding"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["admin-onboarding", onboarding.id],
        }),
      ]);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to complete the review action.";

      setActionError(
        Array.isArray(message) ? message.join(", ") : String(message),
      );
      toast.error(
        Array.isArray(message) ? message.join(", ") : String(message),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const actionCopy: Record<
    ReviewAction,
    { title: string; description: string; button: string }
  > = {
    approve: {
      title: "Approve onboarding",
      description:
        "Confirm that the onboarding information and supporting documents have been reviewed and satisfy your approval requirements.",
      button: "Confirm approval",
    },
    reject: {
      title: "Reject onboarding",
      description:
        "Provide a clear rejection reason. The reason will be submitted to the backend as part of the review decision.",
      button: "Confirm rejection",
    },
    "request-information": {
      title: "Request additional information",
      description:
        "Specify the missing, unclear, or insufficient information the applicant must provide.",
      button: "Send request",
    },
  };

  if (!id) {
    return (
      <div className="p-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <EmptyState>No onboarding ID was provided in the route.</EmptyState>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 w-full" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (isError || !onboarding) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to onboarding
        </Button>

        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <h2 className="text-lg font-semibold">
              Unable to load onboarding details
            </h2>
            <p className="text-sm text-muted-foreground">
              The record may have been removed, the ID may be invalid, or the
              request may have failed.
            </p>
            <Button onClick={() => refetch()}>Try again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 p-4 pb-28 md:p-6 md:pb-8">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="flex min-w-0 items-start gap-3">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="break-words text-2xl font-bold tracking-tight">
                Investor onboarding
              </h1>
              <StatusBadge status={onboarding.status} />
            </div>

            <p className="mt-1 break-all text-sm text-muted-foreground">
              Reference: {onboarding.reference || onboarding.id}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Submitted {formatDate(onboarding.submittedAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => refetch()}>
            <History className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Applicant summary */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted">
                <UserRound className="h-7 w-7 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-xl font-semibold">
                  {applicantName}
                </h2>
                <p className="mt-1 flex items-center gap-2 break-all text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  {onboarding.user?.email || "No email available"}
                </p>
                <p className="mt-1 break-all text-xs text-muted-foreground">
                  User ID: {onboarding.user?.id || "—"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:min-w-[300px]">
              <div>
                <p className="text-xs text-muted-foreground">Investor type</p>
                <p className="mt-1 text-sm font-medium">
                  {titleCase(classification.investmentType)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Current step</p>
                <p className="mt-1 text-sm font-medium">
                  {titleCase(onboarding.currentStep)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="mt-1 text-sm font-medium">
                  {formatDate(onboarding.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last updated</p>
                <p className="mt-1 text-sm font-medium">
                  {formatDate(onboarding.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requested investment amount */}
      <SectionCard
        title="Requested investment amount"
        description="The amount the investor has requested to invest, checked against the application's investment limits."
        icon={Building2}
      >
        <div className="rounded-xl border bg-muted/20 p-5">
          <p className="text-sm text-muted-foreground">
            Investor's requested amount
          </p>

          <p className="mt-2 break-words text-3xl font-bold tracking-tight">
            {formatMoney(investmentAmount, investmentCurrency)}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-background p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Minimum investment
              </p>
              <p className="mt-1 text-lg font-semibold">
                {formatMoney(
                  application?.minInvestmentAmount,
                  investmentCurrency,
                )}
              </p>
            </div>

            <div className="rounded-lg border bg-background p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Maximum investment
              </p>
              <p className="mt-1 text-lg font-semibold">
                {formatMoney(
                  application?.maxInvestmentAmount,
                  investmentCurrency,
                )}
              </p>
            </div>
          </div>

          {investmentAmount !== null &&
            investmentAmount !== undefined &&
            investmentAmount !== "" &&
            application?.minInvestmentAmount != null &&
            application?.maxInvestmentAmount != null && (
              <div className="mt-4">
                {Number(investmentAmount) >=
                  Number(application.minInvestmentAmount) &&
                Number(investmentAmount) <=
                  Number(application.maxInvestmentAmount) ? (
                  <Badge className="border-green-200 bg-green-50 text-green-700">
                    Within investment limits
                  </Badge>
                ) : (
                  <Badge variant="destructive">Outside investment limits</Badge>
                )}
              </div>
            )}
        </div>
      </SectionCard>

      <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main content */}
        <div className="min-w-0 space-y-6">
          {/* Onboarding overview */}
          <SectionCard
            title="Onboarding overview"
            description="Record identifiers, submission details and decision metadata."
            icon={Info}
          >
            <InfoGrid columns={3}>
              <InfoRow
                label="Onboarding reference"
                value={onboarding.reference}
                mono
              />
              <InfoRow label="Onboarding ID" value={onboarding.id} mono />
              <InfoRow
                label="Status"
                value={<StatusBadge status={onboarding.status} />}
              />
              <InfoRow
                label="Submitted at"
                value={formatDate(onboarding.submittedAt)}
              />
              <InfoRow
                label="Created at"
                value={formatDate(onboarding.createdAt)}
              />
              <InfoRow
                label="Updated at"
                value={formatDate(onboarding.updatedAt)}
              />
              <InfoRow
                label="Approved at"
                value={formatDate(onboarding?.approvedAt)}
              />
              <InfoRow
                label="Rejected at"
                value={formatDate(onboarding?.rejectedAt)}
              />
              <InfoRow
                label="Deleted at"
                value={formatDate(onboarding?.deletedAt)}
              />
              {/* <InfoRow
                label="Reviewed at"
                value={formatDate(onboarding?.reviewedAt)}
              /> */}
              <InfoRow
                label="Reviewed by"
                value={
                  onboarding?.reviewedBy?.firstName +
                  " " +
                  onboarding?.reviewedBy?.lastName
                }
              />
              <InfoRow
                label="Reviewer ID"
                value={onboarding?.reviewedById}
                mono
              />
              <InfoRow
                label="Reviewer user ID"
                value={onboarding?.reviewedById}
                mono
              />
              <InfoRow label="User ID" value={onboarding?.userId} mono />
            </InfoGrid>

            {(onboarding?.rejectionReason || onboarding?.reviewNote) && (
              <>
                <Separator />
                {onboarding?.rejectionReason && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-destructive">
                      Rejection reason
                    </p>
                    <p className="whitespace-pre-wrap break-words text-sm">
                      {onboarding?.rejectionReason}
                    </p>
                  </div>
                )}
                {onboarding?.reviewNote && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Review note</p>
                    <p className="whitespace-pre-wrap break-words text-sm text-muted-foreground">
                      {onboarding?.reviewNote}
                    </p>
                  </div>
                )}
              </>
            )}
          </SectionCard>

          {/* Progress */}
          <SectionCard
            title="Onboarding progress"
            description="Completed steps and the applicant's current step."
            icon={CheckCircle2}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Completed steps</p>
                  <Badge variant="outline">
                    {onboarding?.completedSteps?.length ?? 0}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(onboarding?.completedSteps ?? []).length ? (
                    onboarding?.completedSteps!.map((step) => (
                      <Badge
                        key={step}
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-700"
                      >
                        <Check className="mr-1 h-3 w-3" />
                        {titleCase(step)}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No completed steps recorded.
                    </p>
                  )}
                </div>

                <InfoRow
                  label="Current step"
                  value={titleCase(onboarding.currentStep)}
                />
              </div>

              <StepProgress
                completedSteps={onboarding.completedSteps ?? []}
                currentStep={onboarding.currentStep}
              />
            </div>
          </SectionCard>

          {/* Classification */}
          <SectionCard
            title="Investor classification"
            description="Classification, political exposure and relevant investor information."
            icon={Building2}
          >
            <InfoGrid columns={3}>
              <InfoRow
                label="Investment type"
                value={titleCase(classification.investmentType)}
              />
              <InfoRow
                label="Individual investment type"
                value={titleCase(classification.individualInvestmentType)}
              />
              <InfoRow
                label="Politically exposed person"
                value={
                  <StatusBadge
                    status={
                      classification.isPoliticallyExposed
                        ? "YES"
                        : classification.isPoliticallyExposed === false
                          ? "NO"
                          : "NOT_PROVIDED"
                    }
                  />
                }
              />
            </InfoGrid>

            {classification.investmentType === "INDIVIDUAL" && (
              <>
                <Separator />
                <h3 className="text-sm font-semibold">Individual investor</h3>
                <KeyValueList
                  data={classification}
                  exclude={[
                    "investmentType",
                    "individualInvestmentType",
                    "isPoliticallyExposed",
                    ...Object.keys(classification).filter((key) =>
                      /^(jointInvestor|corporate|institutional)/.test(key),
                    ),
                  ]}
                />
              </>
            )}

            {classification.individualInvestmentType === "SOMEONE_ELSE" && (
              <>
                <Separator />
                <h3 className="text-sm font-semibold">Beneficiary details</h3>
                <InfoGrid columns={3}>
                  <InfoRow
                    label="First name"
                    value={classification.beneficiaryFirstName}
                  />
                  <InfoRow
                    label="Middle name"
                    value={classification.beneficiaryMiddleName}
                  />
                  <InfoRow
                    label="Last name"
                    value={classification.beneficiaryLastName}
                  />
                  <InfoRow
                    label="Email"
                    value={classification.beneficiaryEmail}
                  />
                  <InfoRow
                    label="Phone number"
                    value={classification.beneficiaryPhoneNumber}
                  />
                  <InfoRow
                    label="Date of birth"
                    value={formatDateOnly(
                      classification.beneficiaryDateOfBirth,
                    )}
                  />
                  <InfoRow
                    label="Address"
                    value={classification.beneficiaryAddress}
                  />
                  <InfoRow
                    label="Relationship"
                    value={titleCase(classification.beneficiaryRelationship)}
                  />
                </InfoGrid>
              </>
            )}

            {classification.investmentType === "JOINT" && (
              <>
                <Separator />
                <h3 className="text-sm font-semibold">
                  Joint investor details
                </h3>
                <InfoGrid columns={3}>
                  <InfoRow
                    label="First name"
                    value={classification.jointInvestorFirstName}
                  />
                  <InfoRow
                    label="Middle name"
                    value={classification.jointInvestorMiddleName}
                  />
                  <InfoRow
                    label="Last name"
                    value={classification.jointInvestorLastName}
                  />
                  <InfoRow
                    label="Email"
                    value={classification.jointInvestorEmail}
                  />
                  <InfoRow
                    label="Phone number"
                    value={classification.jointInvestorPhoneNumber}
                  />
                  <InfoRow
                    label="Date of birth"
                    value={formatDateOnly(
                      classification.jointInvestorDateOfBirth,
                    )}
                  />
                  <InfoRow
                    label="Address"
                    value={classification.jointInvestorAddress}
                  />
                  <InfoRow
                    label="Relationship"
                    value={titleCase(classification.jointInvestorRelationship)}
                  />
                </InfoGrid>
              </>
            )}

            {classification.investmentType === "CORPORATE" && (
              <>
                <Separator />
                <h3 className="text-sm font-semibold">
                  Corporate investor details
                </h3>
                <InfoGrid columns={2}>
                  <InfoRow
                    label="Legal name"
                    value={classification.corporateLegalName}
                  />
                  <InfoRow
                    label="Entity type"
                    value={titleCase(classification.corporateEntityType)}
                  />
                  <InfoRow
                    label="Registration number"
                    value={classification.corporateRegistrationNumber}
                  />
                  <InfoRow
                    label="Tax identification number"
                    value={classification.corporateTaxIdentificationNumber}
                  />
                  <InfoRow
                    label="Country of registration"
                    value={classification.corporateCountryOfRegistration}
                  />
                  <InfoRow
                    label="Date of incorporation"
                    value={formatDateOnly(
                      classification.corporateDateOfIncorporation,
                    )}
                  />
                  <InfoRow
                    label="Business activity"
                    value={classification.corporateBusinessActivity}
                  />
                  <InfoRow
                    label="Registered address"
                    value={classification.corporateRegisteredAddress}
                  />
                  <InfoRow
                    label="Website"
                    value={
                      classification.corporateWebsite ? (
                        <a
                          className="break-all text-primary underline"
                          href={safeExternalUrl(
                            classification.corporateWebsite,
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {classification.corporateWebsite}
                        </a>
                      ) : (
                        "—"
                      )
                    }
                  />
                </InfoGrid>
              </>
            )}

            {classification.investmentType === "INSTITUTIONAL" && (
              <>
                <Separator />
                <h3 className="text-sm font-semibold">
                  Institutional investor details
                </h3>
                <InfoGrid columns={2}>
                  <InfoRow
                    label="Legal name"
                    value={classification.institutionalLegalName}
                  />
                  <InfoRow
                    label="Institution type"
                    value={titleCase(classification.institutionalType)}
                  />
                  <InfoRow
                    label="Registration number"
                    value={classification.institutionalRegistrationNumber}
                  />
                  <InfoRow
                    label="Tax identification number"
                    value={classification.institutionalTaxIdentificationNumber}
                  />
                  <InfoRow
                    label="Country of registration"
                    value={classification.institutionalCountryOfRegistration}
                  />
                  <InfoRow
                    label="Date of establishment"
                    value={formatDateOnly(
                      classification.institutionalDateOfEstablishment,
                    )}
                  />
                  <InfoRow
                    label="Business activity"
                    value={classification.institutionalBusinessActivity}
                  />
                  <InfoRow
                    label="Registered address"
                    value={classification.institutionalRegisteredAddress}
                  />
                  <InfoRow
                    label="License number"
                    value={classification.institutionalLicenseNumber}
                  />
                  <InfoRow
                    label="Regulatory body"
                    value={classification.institutionalRegulatoryBody}
                  />
                  <InfoRow
                    label="Website"
                    value={
                      classification.institutionalWebsite ? (
                        <a
                          className="break-all text-primary underline"
                          href={safeExternalUrl(
                            classification.institutionalWebsite,
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {classification.institutionalWebsite}
                        </a>
                      ) : (
                        "—"
                      )
                    }
                  />
                </InfoGrid>
              </>
            )}
          </SectionCard>

          {/* Tax residency */}
          <SectionCard
            title="Tax information"
            description="Primary tax residency and additional tax residencies."
            icon={MapPin}
          >
            <InfoGrid columns={2}>
              <InfoRow label="Primary country ID" value={tax.countryId} mono />
              <InfoRow
                label="Primary tax identification number"
                value={tax.taxIdentificationNumber}
                mono
              />
              <InfoRow
                label="Has additional tax residencies"
                value={
                  tax.hasAdditionalTaxResidencies === true
                    ? "Yes"
                    : tax.hasAdditionalTaxResidencies === false
                      ? "No"
                      : "Not provided"
                }
              />
              <InfoRow
                label="Additional residency count"
                value={tax.additionalResidencies?.length ?? 0}
              />
            </InfoGrid>

            <Separator />
            <h3 className="text-sm font-semibold">
              Additional tax residencies
            </h3>

            {Array.isArray(tax.additionalResidencies) &&
            tax.additionalResidencies.length > 0 ? (
              <div className="space-y-3">
                {tax.additionalResidencies.map(
                  (residency: AnyRecord, index: number) => (
                    <div
                      key={`${residency.countryId || "residency"}-${index}`}
                      className="rounded-lg border p-4"
                    >
                      <p className="mb-3 text-sm font-medium">
                        Residency {index + 1}
                      </p>
                      <InfoGrid>
                        <InfoRow
                          label="Country ID"
                          value={residency.countryId}
                          mono
                        />
                        <InfoRow
                          label="Tax identification number"
                          value={residency.taxIdentificationNumber}
                          mono
                        />
                      </InfoGrid>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <EmptyState>No additional tax residencies provided.</EmptyState>
            )}
          </SectionCard>

          {/* Documents */}
          <SectionCard
            title="Supporting documents"
            description="Review each uploaded document and its recorded status."
            icon={FileCheck2}
            action={<Badge variant="outline">{documents.length} files</Badge>}
          >
            {documents.length ? (
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {documents.map((document, index) => (
                  <DocumentPreview
                    key={
                      document.id ||
                      document.assetId ||
                      document.asset?.id ||
                      `${documentType(document)}-${index}`
                    }
                    document={document}
                    onPreview={setPreviewDocument}
                  />
                ))}
              </div>
            ) : (
              <EmptyState>
                No documents are attached to this onboarding.
              </EmptyState>
            )}
          </SectionCard>

          {/* Agreement acceptance */}
          <SectionCard
            title="Agreements and declarations"
            description="Accepted agreement identifiers and the applicant's declarations."
            icon={ShieldCheck}
          >
            <div className="space-y-3">
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  Accepted agreements
                </h3>

                {Array.isArray(agreements.acceptedAgreementIds) &&
                agreements.acceptedAgreementIds.length ? (
                  <div className="flex flex-wrap gap-2">
                    {agreements.acceptedAgreementIds.map(
                      (agreementId: string) => (
                        <Badge
                          key={agreementId}
                          variant="outline"
                          className="border-green-200 bg-green-50 text-green-700"
                        >
                          <Check className="mr-1 h-3 w-3" />
                          {titleCase(agreementId)}
                        </Badge>
                      ),
                    )}
                  </div>
                ) : (
                  <EmptyState>No accepted agreements recorded.</EmptyState>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 text-sm font-semibold">Declarations</h3>
                <div className="space-y-2">
                  <DeclarationRow
                    label="Understands investment risks"
                    value={declarations.understandRisks}
                  />
                  <DeclarationRow
                    label="Confirms the information provided is accurate"
                    value={declarations.informationAccurate}
                  />
                  <DeclarationRow
                    label="Authorizes verification"
                    value={declarations.authorizeVerification}
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Investment interest */}
          <SectionCard
            title="Associated investment interest"
            description="The investor interest linked to this onboarding record."
            icon={Building2}
          >
            {investmentInterest ? (
              <div className="space-y-5">
                <InfoGrid columns={3}>
                  <InfoRow
                    label="Interest reference"
                    value={investmentInterest.reference}
                    mono
                  />
                  <InfoRow
                    label="Interest status"
                    value={<StatusBadge status={investmentInterest.status} />}
                  />
                  <InfoRow
                    label="Interest ID"
                    value={investmentInterest.id}
                    mono
                  />
                  <InfoRow
                    label="Interest created"
                    value={formatDate(investmentInterest.createdAt)}
                  />
                  <InfoRow
                    label="Interest submitted"
                    value={formatDate(investmentInterest.submittedAt)}
                  />
                  <InfoRow
                    label="Interest reviewed"
                    value={formatDate(investmentInterest.reviewedAt)}
                  />
                  <InfoRow
                    label="Interest reviewed by"
                    value={investmentInterest.reviewedById}
                    mono
                  />
                  <InfoRow
                    label="Interest review note"
                    value={investmentInterest.reviewNote}
                  />
                  <InfoRow
                    label="Interest more-info requested"
                    value={investmentInterest.moreInfoRequested ? "Yes" : "No"}
                  />
                  <InfoRow
                    label="Interest more-info message"
                    value={investmentInterest.moreInfoMessage}
                  />
                  <InfoRow
                    label="Interest more-info requested at"
                    value={formatDate(investmentInterest.moreInfoRequestedAt)}
                  />
                  <InfoRow
                    label="Interest more-info resolved at"
                    value={formatDate(investmentInterest.moreInfoResolvedAt)}
                  />
                  <InfoRow
                    label="Interest approved at"
                    value={formatDate(investmentInterest.approvedAt)}
                  />
                  <InfoRow
                    label="Interest rejected at"
                    value={formatDate(investmentInterest.rejectedAt)}
                  />
                  <InfoRow
                    label="Interest rejection reason"
                    value={investmentInterest.rejectionReason}
                  />
                  <InfoRow
                    label="Investor profile ID"
                    value={investmentInterest.investorProfileId}
                    mono
                  />
                  <InfoRow
                    label="Application ID"
                    value={investmentInterest.applicationId}
                    mono
                  />
                </InfoGrid>

                {application && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="break-words text-base font-semibold">
                            {application.title || "Investment application"}
                          </h3>
                          <StatusBadge status={application.status} />
                          <Badge variant="outline">
                            {titleCase(application.investmentStage)}
                          </Badge>
                        </div>
                        {application.slug && (
                          <p className="mt-1 break-all text-xs text-muted-foreground">
                            Slug: {application.slug}
                          </p>
                        )}
                      </div>

                      {application.shortDescription && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Short description
                          </p>
                          <p className="whitespace-pre-wrap break-words text-sm">
                            {application.shortDescription}
                          </p>
                        </div>
                      )}

                      {application.longDescription && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Full description
                          </p>
                          <p className="whitespace-pre-wrap break-words text-sm text-muted-foreground">
                            {application.longDescription}
                          </p>
                        </div>
                      )}

                      <InfoGrid columns={3}>
                        <InfoRow
                          label="Valuation"
                          value={formatMoney(application.valuation)}
                        />
                        <InfoRow
                          label="Investment cap"
                          value={formatMoney(application.investmentCap)}
                        />
                        <InfoRow
                          label="Minimum investment"
                          value={formatMoney(application.minInvestmentAmount)}
                        />
                        <InfoRow
                          label="Maximum investment"
                          value={formatMoney(application.maxInvestmentAmount)}
                        />
                        <InfoRow
                          label="Projected return"
                          value={formatMoney(application.projectedReturn)}
                        />
                        <InfoRow
                          label="Monthly revenue"
                          value={formatMoney(application.monthlyRevenue)}
                        />
                        <InfoRow
                          label="Monthly volume"
                          value={formatMoney(application.monthlyVolume)}
                        />
                        <InfoRow
                          label="Amount realized"
                          value={formatMoney(application.amountRealized)}
                        />
                        <InfoRow
                          label="Active users"
                          value={formatNumber(application.activeUsers)}
                        />
                        <InfoRow
                          label="Active investors"
                          value={formatNumber(application.activeInvestors)}
                        />
                        <InfoRow
                          label="Number of transactions"
                          value={formatNumber(application.numberOfTransactions)}
                        />
                        <InfoRow
                          label="Average speed"
                          value={formatNumber(application.averageSpeed)}
                        />
                        <InfoRow
                          label="Server uptime"
                          value={formatNumber(application.serverUptime)}
                        />
                        <InfoRow
                          label="Investment enabled"
                          value={application.isInvestmentEnabled ? "Yes" : "No"}
                        />
                        <InfoRow
                          label="Live"
                          value={application.isLive ? "Yes" : "No"}
                        />
                        <InfoRow
                          label="Application currency ID"
                          value={application.currencyId}
                          mono
                        />
                        <InfoRow
                          label="Application owner user ID"
                          value={application.userId}
                          mono
                        />
                        <InfoRow
                          label="Thumbnail asset ID"
                          value={application.thumbNailAssetId}
                          mono
                        />
                        <InfoRow
                          label="Application created"
                          value={formatDate(application.createdAt)}
                        />
                        <InfoRow
                          label="Application updated"
                          value={formatDate(application.updatedAt)}
                        />
                        <InfoRow
                          label="Application deleted"
                          value={formatDate(application.deletedAt)}
                        />
                      </InfoGrid>
                    </div>
                  </>
                )}

                {investorProfile && (
                  <>
                    <Separator />
                    <h3 className="text-sm font-semibold">
                      Related investor profile
                    </h3>
                    <InfoGrid columns={3}>
                      <InfoRow
                        label="Profile ID"
                        value={investorProfile.id}
                        mono
                      />
                      <InfoRow
                        label="Profile status"
                        value={<StatusBadge status={investorProfile.status} />}
                      />
                      <InfoRow
                        label="Profile user ID"
                        value={investorProfile.userId}
                        mono
                      />
                      <InfoRow
                        label="Profile created"
                        value={formatDate(investorProfile.createdAt)}
                      />
                      <InfoRow
                        label="Profile updated"
                        value={formatDate(investorProfile.updatedAt)}
                      />
                      <InfoRow
                        label="Profile approved at"
                        value={formatDate(investorProfile.approvedAt)}
                      />
                      <InfoRow
                        label="Profile approved by"
                        value={investorProfile.approvedById}
                        mono
                      />
                      <InfoRow
                        label="Onboarding completed at"
                        value={formatDate(
                          investorProfile.onboardingCompletedAt,
                        )}
                      />
                      <InfoRow
                        label="Profile rejection reason"
                        value={investorProfile.rejectionReason}
                      />
                      <InfoRow
                        label="Profile deleted at"
                        value={formatDate(investorProfile.deletedAt)}
                      />
                    </InfoGrid>
                  </>
                )}
              </div>
            ) : (
              <EmptyState>
                No investment interest is linked to this onboarding record.
              </EmptyState>
            )}
          </SectionCard>

          {/* Additional information requests */}
          <SectionCard
            title="Additional information requests"
            description="Track information requests associated with this onboarding."
            icon={Mail}
          >
            <InfoGrid columns={2}>
              <InfoRow
                label="Information requested"
                value={onboarding.moreInfoRequested ? "Yes" : "No"}
              />
              <InfoRow
                label="Request created"
                value={formatDate(onboarding.moreInfoRequestedAt)}
              />
              <InfoRow
                label="Request resolved"
                value={formatDate(onboarding.moreInfoResolvedAt)}
              />
            </InfoGrid>

            {onboarding.moreInfoMessage ? (
              <div className="rounded-lg border p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Request message
                </p>
                <p className="whitespace-pre-wrap break-words text-sm">
                  {onboarding.moreInfoMessage}
                </p>
              </div>
            ) : (
              <EmptyState>
                No additional-information message recorded.
              </EmptyState>
            )}
          </SectionCard>

          {/* Review timeline */}
          <SectionCard
            title="Review timeline"
            description="Events available from the current onboarding record."
            icon={CalendarDays}
          >
            <div className="space-y-0">
              {[
                {
                  label: "Onboarding created",
                  date: onboarding.createdAt,
                  detail: "Onboarding record created.",
                },
                {
                  label: "Onboarding submitted",
                  date: onboarding.submittedAt,
                  detail: "Applicant submitted onboarding.",
                },
                {
                  label: "Last updated",
                  date: onboarding.updatedAt,
                  detail: "Onboarding record last updated.",
                },
                {
                  label: "Additional information requested",
                  date: onboarding.moreInfoRequestedAt,
                  detail:
                    onboarding.moreInfoMessage ||
                    "An information request was recorded.",
                },
                {
                  label: "Additional information resolved",
                  date: onboarding.moreInfoResolvedAt,
                  detail: "The information request was marked resolved.",
                },
                {
                  label: "Reviewed",
                  date: onboarding.reviewedAt,
                  detail: onboarding.reviewNote || "Review timestamp recorded.",
                },
                {
                  label: "Approved",
                  date: onboarding.approvedAt,
                  detail: "Approval timestamp recorded.",
                },
                {
                  label: "Rejected",
                  date: onboarding.rejectedAt,
                  detail:
                    onboarding.rejectionReason ||
                    "Rejection timestamp recorded.",
                },
              ]
                .filter((event) => !!event.date)
                .sort(
                  (a, b) =>
                    new Date(a.date!).getTime() - new Date(b.date!).getTime(),
                )
                .map((event, index, array) => (
                  <div
                    key={`${event.label}-${event.date}`}
                    className="relative flex gap-3 pb-5 last:pb-0"
                  >
                    <div className="flex flex-col items-center">
                      <div className="z-10 mt-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                      {index < array.length - 1 && (
                        <div className="absolute bottom-0 left-[5px] top-4 w-px bg-border" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium">{event.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(event.date)}
                        </p>
                      </div>
                      <p className="mt-1 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                        {event.detail}
                      </p>
                    </div>
                  </div>
                ))}

              <p className="mt-4 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
                This timeline is derived from timestamps on the current record.
                It is not a complete audit history. A full historical timeline
                requires a backend review-events or audit-log collection.
              </p>
            </div>
          </SectionCard>
        </div>

        {/* Review sidebar */}
        <aside className="min-w-0 space-y-6 xl:sticky xl:top-6">
          <SectionCard
            title="Review decision"
            description="Review the application and record a decision."
            icon={ShieldCheck}
          >
            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Current status</p>
                <div className="mt-2">
                  <StatusBadge status={onboarding.status} />
                </div>
              </div>

              {!canReview ? (
                <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                  This record is not available for review actions in its current
                  state.
                </div>
              ) : (
                <>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setReviewMessage("");
                      setActionError("");
                      setAction("approve");
                    }}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve onboarding
                  </Button>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setReviewMessage("");
                      setActionError("");
                      setAction("request-information");
                    }}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Request information
                  </Button>

                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={() => {
                      setReviewMessage("");
                      setActionError("");
                      setAction("reject");
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject onboarding
                  </Button>
                </>
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="Compliance summary"
            description="Key checks to consider before making a decision."
            icon={ShieldCheck}
          >
            <div className="space-y-3">
              <ComplianceSummaryRow
                label="Classification supplied"
                passed={!isEmpty(classification.investmentType)}
              />
              <ComplianceSummaryRow
                label="Tax identification supplied"
                passed={!isEmpty(tax.taxIdentificationNumber)}
              />
              <ComplianceSummaryRow
                label="Documents uploaded"
                passed={documents.length > 0}
              />
              <ComplianceSummaryRow
                label="Agreements accepted"
                passed={(agreements.acceptedAgreementIds?.length ?? 0) > 0}
              />
              <ComplianceSummaryRow
                label="Risk declaration confirmed"
                passed={declarations.understandRisks === true}
              />
              <ComplianceSummaryRow
                label="Information accuracy confirmed"
                passed={declarations.informationAccurate === true}
              />
              <ComplianceSummaryRow
                label="Verification authorized"
                passed={declarations.authorizeVerification === true}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              These are completeness indicators only. They do not establish
              document authenticity, legal compliance, or approval eligibility.
            </p>
          </SectionCard>

          <SectionCard
            title="Record metadata"
            description="Identifiers useful for support and investigation."
            icon={Info}
          >
            <div className="space-y-3">
              <InfoRow label="Onboarding ID" value={onboarding.id} mono />
              <InfoRow label="User ID" value={onboarding.userId} mono />
              <InfoRow
                label="Investment interest ID"
                value={investmentInterest?.id}
                mono
              />
              <InfoRow
                label="Investor profile ID"
                value={investorProfile?.id}
                mono
              />
              <InfoRow label="Application ID" value={application?.id} mono />
            </div>
          </SectionCard>
        </aside>
      </div>

      {/* Mobile sticky review actions */}
      {canReview && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur xl:hidden">
          <div className="mx-auto flex max-w-3xl gap-2">
            <Button
              className="min-w-0 flex-1"
              size="sm"
              onClick={() => {
                setReviewMessage("");
                setActionError("");
                setAction("approve");
              }}
            >
              <Check className="mr-1 h-4 w-4" />
              Approve
            </Button>
            <Button
              className="min-w-0 flex-1"
              size="sm"
              variant="outline"
              onClick={() => {
                setReviewMessage("");
                setActionError("");
                setAction("request-information");
              }}
            >
              Request info
            </Button>
            <Button
              className="min-w-0 flex-1"
              size="sm"
              variant="destructive"
              onClick={() => {
                setReviewMessage("");
                setActionError("");
                setAction("reject");
              }}
            >
              Reject
            </Button>
          </div>
        </div>
      )}

      {/* Review action dialog */}
      <Dialog
        open={!!action}
        onOpenChange={(open) => {
          if (!open && !isSubmitting) {
            setAction(null);
            setReviewMessage("");
            setActionError("");
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {action && (
            <>
              <DialogHeader>
                <DialogTitle>{actionCopy[action].title}</DialogTitle>
                <DialogDescription>
                  {actionCopy[action].description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <div className="rounded-lg bg-muted/40 p-3">
                  <p className="text-sm font-medium">{applicantName}</p>
                  <p className="mt-1 break-all text-xs text-muted-foreground">
                    {onboarding.reference || onboarding.id}
                  </p>
                </div>

                {action === "approve" ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Review note (optional)
                    </label>
                    <Textarea
                      value={reviewMessage}
                      onChange={(event) => setReviewMessage(event.target.value)}
                      placeholder="Add an internal review note..."
                      rows={4}
                      disabled={isSubmitting}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {action === "reject"
                        ? "Rejection reason"
                        : "Information required"}
                      <span className="ml-1 text-destructive">*</span>
                    </label>
                    <Textarea
                      value={reviewMessage}
                      onChange={(event) => {
                        setReviewMessage(event.target.value);
                        setActionError("");
                      }}
                      placeholder={
                        action === "reject"
                          ? "Explain why this onboarding is being rejected..."
                          : "Describe the additional documents or information needed..."
                      }
                      rows={5}
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                {actionError && (
                  <p className="text-sm text-destructive">{actionError}</p>
                )}
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => {
                    setAction(null);
                    setReviewMessage("");
                    setActionError("");
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant={action === "reject" ? "destructive" : "default"}
                  disabled={
                    isSubmitting ||
                    (action !== "approve" && !reviewMessage.trim())
                  }
                  onClick={handleReviewAction}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {actionCopy[action].button}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Document preview dialog */}
      <Dialog
        open={!!previewDocument}
        onOpenChange={(open) => {
          if (!open) setPreviewDocument(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              {previewDocument
                ? titleCase(documentType(previewDocument))
                : "Document preview"}
            </DialogTitle>
            <DialogDescription className="break-all">
              {previewDocument ? documentName(previewDocument) : ""}
            </DialogDescription>
          </DialogHeader>

          {previewDocument && (
            <div className="space-y-4">
              {documentUrl(previewDocument) &&
              documentMimeType(previewDocument).startsWith("image/") ? (
                <img
                  src={documentUrl(previewDocument)}
                  alt={documentName(previewDocument)}
                  className="mx-auto max-h-[65vh] max-w-full rounded-lg object-contain"
                />
              ) : documentUrl(previewDocument) &&
                documentMimeType(previewDocument) === "application/pdf" ? (
                <iframe
                  src={documentUrl(previewDocument)}
                  title={documentName(previewDocument)}
                  className="h-[65vh] w-full rounded-lg border"
                />
              ) : (
                <EmptyState>
                  This file type cannot be previewed here. Use the open-file
                  link to view it in a separate tab.
                </EmptyState>
              )}

              <InfoGrid>
                <InfoRow
                  label="Document type"
                  value={titleCase(documentType(previewDocument))}
                />
                <InfoRow
                  label="Document status"
                  value={<StatusBadge status={previewDocument.status} />}
                />
                <InfoRow
                  label="Uploaded at"
                  value={formatDate(
                    previewDocument.uploadedAt || previewDocument.createdAt,
                  )}
                />
                <InfoRow
                  label="Last updated"
                  value={formatDate(previewDocument.updatedAt)}
                />
                <InfoRow
                  label="File size"
                  value={formatBytes(documentSize(previewDocument))}
                />
                <InfoRow
                  label="MIME type"
                  value={documentMimeType(previewDocument)}
                />
                <InfoRow
                  label="Asset ID"
                  value={previewDocument.assetId || previewDocument.asset?.id}
                  mono
                />
              </InfoGrid>

              {documentUrl(previewDocument) && (
                <div className="flex justify-end">
                  <Button asChild>
                    <a
                      href={documentUrl(previewDocument)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open original file
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ComplianceSummaryRow({
  label,
  passed,
}: {
  label: string;
  passed: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-sm">{label}</span>
      <Badge
        variant="outline"
        className={
          passed
            ? "shrink-0 border-green-200 bg-green-50 text-green-700"
            : "shrink-0 border-amber-200 bg-amber-50 text-amber-700"
        }
      >
        {passed ? "Present" : "Check"}
      </Badge>
    </div>
  );
}
