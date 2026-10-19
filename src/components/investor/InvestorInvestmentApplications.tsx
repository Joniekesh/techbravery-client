import {
  ArrowRight,
  Clock3,
  CircleDollarSign,
  FileCheck2,
  Eye,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { InvestmentInterest } from "@/types/investment";

type WorkflowState =
  | "PENDING_ONBOARDING"
  | "PENDING_REVIEW"
  | "MORE_INFORMATION_REQUIRED"
  | "REJECTED"
  | "APPROVED_AWAITING_PAYMENT"
  | "PAYMENT_PROCESSING"
  | "ACTIVE"
  | "CLOSED";

interface OnboardingRecord {
  id: string;
  investmentInterestId: string;
  reference?: string;
  status: string;
  currentStep: string;
  completedSteps: string[];
  submittedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  rejectionReason?: string | null;
  moreInfoRequested?: boolean;
  moreInfoMessage?: string | null;
}

interface InvestmentRecord {
  id: string;
  reference?: string;
  status?: string;
  onboardingStatus?: string;
  currentStep?: string;
  completedSteps?: string[];
  approvedAt?: string | null;
  activatedAt?: string | null;
  closedAt?: string | null;
  amount?: string | number | null;
  totalInvested?: string | number | null;
  currency?: {
    iso?: string;
    symbol?: string;
  } | null;
  paymentStatus?: string | null;
  workflowState?: WorkflowState;
  rejectionReason?: string | null;
  moreInfoMessage?: string | null;
  investmentInterestId?: string;
}

interface Props {
  interests: InvestmentInterest[];
  onboardings: OnboardingRecord[];
  onStartOnboarding: (investmentInterestId: string) => Promise<string>;
}

interface DashboardRecord {
  interest: InvestmentInterest;
  onboarding: OnboardingRecord | null;
  investment: InvestmentRecord | null;
}

const getInvestmentWorkflowState = (
  investment: InvestmentRecord,
): WorkflowState => {
  const status = investment.status?.toUpperCase();
  const onboarding = investment.onboardingStatus?.toUpperCase();
  const payment = investment.paymentStatus?.toUpperCase();

  // Terminal and active investment states take priority.
  if (investment.closedAt || status === "CLOSED" || onboarding === "CLOSED") {
    return "CLOSED";
  }

  if (
    investment.activatedAt ||
    status === "ACTIVE" ||
    onboarding === "ACTIVE"
  ) {
    return "ACTIVE";
  }

  if (
    status === "PAYMENT_PROCESSING" ||
    onboarding === "PAYMENT_PROCESSING" ||
    payment === "PROCESSING"
  ) {
    return "PAYMENT_PROCESSING";
  }

  if (status === "REJECTED" || onboarding === "REJECTED") {
    return "REJECTED";
  }

  if (
    onboarding === "MORE_INFORMATION_REQUIRED" ||
    status === "MORE_INFORMATION_REQUIRED" ||
    status === "MORE_INFORMATION"
  ) {
    return "MORE_INFORMATION_REQUIRED";
  }

  if (
    status === "APPROVED" ||
    status === "APPROVED_AWAITING_PAYMENT" ||
    onboarding === "APPROVED"
  ) {
    return "APPROVED_AWAITING_PAYMENT";
  }

  if (
    status === "PENDING_REVIEW" ||
    status === "SUBMITTED" ||
    onboarding === "SUBMITTED"
  ) {
    return "PENDING_REVIEW";
  }

  // A payment status of PENDING alone does not necessarily mean
  // payment processing has started.
  return "PENDING_ONBOARDING";
};

const getInterestWorkflowState = (
  onboarding: OnboardingRecord | null,
  investment: InvestmentRecord | null,
): WorkflowState => {
  // Explicit requests for more information must remain visible.
  if (
    onboarding?.moreInfoRequested ||
    onboarding?.status.toUpperCase() === "MORE_INFORMATION_REQUIRED"
  ) {
    return "MORE_INFORMATION_REQUIRED";
  }

  if (onboarding) {
    switch (onboarding.status.toUpperCase()) {
      case "DRAFT":
      case "IN_PROGRESS":
        return "PENDING_ONBOARDING";

      case "SUBMITTED":
        return "PENDING_REVIEW";

      case "MORE_INFORMATION_REQUIRED":
        return "MORE_INFORMATION_REQUIRED";

      case "REJECTED":
        return "REJECTED";

      case "APPROVED":
        return investment
          ? getInvestmentWorkflowState(investment)
          : "APPROVED_AWAITING_PAYMENT";

      case "PAYMENT_PROCESSING":
        return "PAYMENT_PROCESSING";

      case "ACTIVE":
        return "ACTIVE";

      case "CLOSED":
        return "CLOSED";
    }
  }

  // No onboarding record: use an investment only if one exists.
  if (investment) {
    return getInvestmentWorkflowState(investment);
  }

  return "PENDING_ONBOARDING";
};

const workflowMeta: Record<
  WorkflowState,
  {
    label: string;
    description: string;
    action: string;
    icon: LucideIcon;
    progress: number;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  PENDING_ONBOARDING: {
    label: "Onboarding in progress",
    description: "Complete and submit your investment application.",
    action: "Continue onboarding",
    icon: FileCheck2,
    progress: 35,
    variant: "secondary",
  },

  PENDING_REVIEW: {
    label: "Under review",
    description:
      "Your application has been submitted and is awaiting a review decision.",
    action: "View application",
    icon: Clock3,
    progress: 65,
    variant: "secondary",
  },

  MORE_INFORMATION_REQUIRED: {
    label: "Additional information required",
    description:
      "Review the request and provide the additional information needed.",
    action: "Resolve request",
    icon: AlertCircle,
    progress: 50,
    variant: "destructive",
  },

  REJECTED: {
    label: "Application declined",
    description:
      "Your application was declined. Review the decision for further details.",
    action: "View decision",
    icon: AlertCircle,
    progress: 100,
    variant: "destructive",
  },

  APPROVED_AWAITING_PAYMENT: {
    label: "Approved — payment required",
    description:
      "Your application is approved. Follow the payment instructions to proceed.",
    action: "View next steps",
    icon: CircleDollarSign,
    progress: 85,
    variant: "default",
  },

  PAYMENT_PROCESSING: {
    label: "Payment processing",
    description:
      "Your payment is being processed. Check back for confirmation.",
    action: "View payment",
    icon: RefreshCw,
    progress: 90,
    variant: "secondary",
  },

  ACTIVE: {
    label: "Investment active",
    description: "Your investment is active. View its details and performance.",
    action: "Track investment",
    icon: Eye,
    progress: 100,
    variant: "default",
  },

  CLOSED: {
    label: "Investment closed",
    description: "This investment is closed. Review its final records.",
    action: "View final report",
    icon: ShieldCheck,
    progress: 100,
    variant: "outline",
  },
};

const formatAmount = (
  value: string | number | null | undefined,
  currency = "USD",
) => {
  if (value == null || value === "") {
    return "Not specified";
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "Not specified";
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
};

const formatDate = (value?: string | null) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const InvestorInvestmentApplications = ({
  interests,
  onboardings,
  onStartOnboarding,
}: Props) => {
  const navigate = useNavigate();

  const [startingInterestId, setStartingInterestId] = useState<string | null>(
    null,
  );

  console.log("INTERESTS", interests);
  console.log("ONBOARDINGS", onboardings);

  const records: DashboardRecord[] = interests.map((interest) => {
    const onboarding =
      onboardings?.find((item) => item.investmentInterestId === interest.id) ??
      null;

    /*
     * This preserves compatibility with your existing InvestmentInterest
     * type. If one interest can have multiple investments, render those
     * investments separately instead of selecting the first one.
     */
    const existingInvestments = (
      interest as unknown as {
        investments?: InvestmentRecord[];
      }
    ).investments;

    const investment = existingInvestments?.[0] ?? null;

    return {
      interest,
      onboarding,
      investment,
    };
  });

  const openRecord = async (record: DashboardRecord) => {
    const { interest, onboarding, investment } = record;

    const state = getInterestWorkflowState(onboarding, investment);

    try {
      switch (state) {
        case "PENDING_ONBOARDING": {
          if (onboarding) {
            navigate(`/investor-dashboard/onboarding/${onboarding.id}`);
            return;
          }

          setStartingInterestId(interest.id);

          const onboardingId = await onStartOnboarding(interest.id);

          if (!onboardingId) {
            throw new Error(
              "The onboarding service did not return an onboarding ID.",
            );
          }

          navigate(`/investor-dashboard/onboarding/${onboardingId}`);
          return;
        }

        case "PENDING_REVIEW":
        case "MORE_INFORMATION_REQUIRED":
        case "REJECTED": {
          if (!onboarding) {
            toast.error("The onboarding record could not be found.");
            return;
          }

          navigate(`/investor-dashboard/onboarding/${onboarding.id}`);
          return;
        }

        case "APPROVED_AWAITING_PAYMENT": {
          /*
           * Until an actual investment exists, the onboarding/interest
           * must be used to identify the approved commitment.
           *
           * Replace this destination with your registered payment route
           * when the payment API is keyed by onboarding or interest ID.
           */
          if (investment) {
            navigate(`/investor-dashboard/investment/${investment.id}/payment`);
          } else if (onboarding) {
            navigate(`/investor-dashboard/onboarding/${onboarding.id}`);
          } else {
            toast.error("The approved onboarding record could not be found.");
          }
          return;
        }

        case "PAYMENT_PROCESSING": {
          if (!investment) {
            if (onboarding) {
              navigate(`/investor-dashboard/onboarding/${onboarding.id}`);
            } else {
              toast.error("The payment record could not be found.");
            }
            return;
          }

          navigate(`/investor-dashboard/investment/${investment.id}/payment`);
          return;
        }

        case "ACTIVE":
        case "CLOSED": {
          if (investment) {
            navigate(
              `/investor-dashboard/investment/${investment.id}/performance`,
            );
          } else if (onboarding) {
            // Fallback when the backend reports the lifecycle status
            // on the onboarding record but has not returned an investment.
            navigate(`/investor-dashboard/onboarding/${onboarding.id}`);
          } else {
            toast.error("The investment record could not be found.");
          }

          return;
        }
      }
    } catch (error) {
      console.error("Unable to open investment workflow:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to open this investment application. Please try again.",
      );
    } finally {
      setStartingInterestId(null);
    }
  };

  if (!records.length) {
    return (
      <section className="px-4 py-12 sm:px-6">
        <Card className="mx-auto max-w-3xl p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <CircleDollarSign className="h-7 w-7 text-primary" />
          </div>

          <h2 className="text-xl font-semibold">
            Your investment journey starts here
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Explore available investment opportunities and start an application.
            Your interests, applications, and investments will appear here.
          </p>

          <Button
            className="mt-6"
            onClick={() => navigate("/investor/express-interest")}
          >
            Explore opportunities
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <section className="border-y bg-muted/20 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Your portfolio</p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Investment applications
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Continue onboarding, resolve review requests, complete approved
              commitments, and track funded investments.
            </p>
          </div>

          <Badge variant="outline">
            {records.length}{" "}
            {records.length === 1
              ? "investment interest"
              : "investment interests"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {records.map((record) => {
            const { interest, onboarding, investment } = record;
            const application = interest.application;

            const state = getInterestWorkflowState(onboarding, investment);

            const meta = workflowMeta[state];
            const StatusIcon = meta.icon;

            const imageUrl =
              application?.thumbNail?.url || application?.images?.[0];

            const currency = investment?.currency?.iso ?? "USD";

            const reference =
              investment?.reference ??
              onboarding?.reference ??
              onboarding?.id ??
              interest.id;

            const rejectionReason =
              investment?.rejectionReason ?? onboarding?.rejectionReason;

            const moreInfoMessage =
              investment?.moreInfoMessage ?? onboarding?.moreInfoMessage;

            const requestedAmount = investment?.amount;

            const confirmedAmount = investment?.totalInvested;

            const isStarting = startingInterestId === interest.id;

            return (
              <Card
                key={interest.id}
                className="group overflow-hidden border-border/70 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex min-w-0 flex-col sm:flex-row">
                  <div className="relative h-44 shrink-0 overflow-hidden bg-muted sm:h-auto sm:min-h-[250px] sm:w-40">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={application.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Eye className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}

                    <Badge className="absolute left-3 top-3">
                      {application.investmentStage ?? "Investment"}
                    </Badge>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold leading-snug">
                          {application.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {application.shortDescription}
                        </p>
                      </div>

                      <StatusIcon className="h-5 w-5 shrink-0 text-primary" />
                    </div>

                    <div className="mt-4 rounded-lg border bg-muted/20 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            {investment
                              ? "Investment reference"
                              : onboarding
                                ? "Onboarding reference"
                                : "Interest reference"}
                          </p>

                          <p className="mt-1 break-all font-mono text-xs">
                            {reference}
                          </p>
                        </div>

                        <Badge variant={meta.variant} className="shrink-0">
                          {meta.label}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {investment
                            ? "Investment amount"
                            : "Investment amount"}
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold">
                          {investment
                            ? formatAmount(requestedAmount, currency)
                            : "Not committed yet"}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Confirmed invested
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold">
                          {investment
                            ? formatAmount(confirmedAmount, currency)
                            : "Not funded"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between gap-3 text-xs">
                        <span className="text-muted-foreground">
                          Application progress
                        </span>

                        <span className="font-medium">{meta.progress}%</span>
                      </div>

                      <Progress value={meta.progress} className="h-1.5" />

                      <p className="text-xs text-muted-foreground">
                        {meta.description}
                      </p>

                      {onboarding && (
                        <p className="text-xs text-muted-foreground">
                          Current step: {onboarding.currentStep}
                          {" · "}
                          {onboarding.completedSteps.length} steps completed
                        </p>
                      )}
                    </div>

                    {onboarding && (
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {onboarding.status.toUpperCase() === "IN_PROGRESS" ||
                        onboarding.status.toUpperCase() === "DRAFT" ? (
                          <p>Current step: {onboarding.currentStep}</p>
                        ) : null}

                        <p>
                          {
                            onboarding.completedSteps.filter(
                              (step) => step.toLowerCase() !== "welcome",
                            ).length
                          }{" "}
                          onboarding steps completed
                        </p>

                        {onboarding.submittedAt && (
                          <p>Submitted: {formatDate(onboarding.submittedAt)}</p>
                        )}
                      </div>
                    )}

                    {state === "REJECTED" && rejectionReason && (
                      <p className="mt-3 text-sm text-destructive">
                        {rejectionReason}
                      </p>
                    )}

                    {state === "MORE_INFORMATION_REQUIRED" &&
                      moreInfoMessage && (
                        <p className="mt-3 text-sm text-muted-foreground">
                          {moreInfoMessage}
                        </p>
                      )}

                    <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-xs text-muted-foreground">
                        {application.investmentStage ?? "Private investment"}
                      </span>

                      <Button
                        className="w-full sm:w-auto"
                        disabled={isStarting}
                        onClick={() => void openRecord(record)}
                      >
                        {isStarting ? "Starting onboarding..." : meta.action}

                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InvestorInvestmentApplications;
