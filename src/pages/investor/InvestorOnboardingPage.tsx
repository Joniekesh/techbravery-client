import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { ONBOARDING_STEPS } from "@/components/investor/constants";

import WelcomeStep from "@/components/investor/WelcomeStep";

import InvestorClassificationStep from "@/components/investor/InvestorClassificationStep";

import TaxResidencyStep from "@/components/investor/TaxResidencyStep";
import DocumentsStep from "@/components/investor/DocumentsStep";
import AgreementsStep from "@/components/investor/AgreementsStep";
import ReviewStep from "@/components/investor/ReviewStep";

import {
  AgreementsValue,
  ClassificationForm,
  InvestmentOnboardingData,
  InvestorDocument,
  TaxResidency,
  TaxResidencyValue,
} from "@/types/investor";

import Loader from "@/components/loader/Loader";
import { ErrorState } from "@/components/ErrorState";
import { useAppSelector } from "@/redux/hooks";

import {
  saveInvestorOnboardingStep,
  useInvestorOnboarding,
  useSaveInvestorOnboardingStep,
  useSubmitInvestorOnboarding,
} from "@/services/onboarding";
import { Currency } from "@/types/currency";

const InvestorOnboardingPage = () => {
  const { onboardingId } = useParams<{
    onboardingId: string;
  }>();

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? "";

  const navigate = useNavigate();

  const {
    data: onboarding,
    isPending: loading,
    error: loadError,
    refetch,
  } = useInvestorOnboarding(onboardingId ?? "", userId);

  console.log("Onboarding", onboarding);

  const saveMutation = useSaveInvestorOnboardingStep(
    onboardingId ?? "",
    userId,
  );

  const submitMutation = useSubmitInvestorOnboarding(
    onboardingId ?? "",
    userId,
  );

  const [onboardingData, setOnboardingData] =
    useState<InvestmentOnboardingData>({});

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const classificationValidatorRef = useRef<(() => boolean) | null>(null);
  const taxResidencyValidatorRef = useRef<(() => boolean) | null>(null);
  const agreementsValidatorRef = useRef<(() => boolean) | null>(null);
  const documentsValidatorRef = useRef<(() => boolean) | null>(null);

  const registerClassificationValidator = useCallback(
    (validator: () => boolean) => {
      classificationValidatorRef.current = validator;
    },
    [],
  );

  const registerTaxResidencyValidator = useCallback(
    (validator: () => boolean) => {
      taxResidencyValidatorRef.current = validator;
    },
    [],
  );

  const registerAgreementsValidator = useCallback(
    (validator: () => boolean) => {
      agreementsValidatorRef.current = validator;
    },
    [],
  );

  const registerDocumentsValidator = useCallback((validator: () => boolean) => {
    documentsValidatorRef.current = validator;
  }, []);

  const step = ONBOARDING_STEPS[currentStep];

  const progress = useMemo(
    () => Math.round(((currentStep + 1) / ONBOARDING_STEPS.length) * 100),
    [currentStep],
  );

  useEffect(() => {
    if (!onboarding || initialized) return;

    const data = onboarding.onboardingData ?? {};

    const savedDocuments = (onboarding.documents ?? []).map((item) => ({
      id: `document-${item.assetId}`,
      assetId: item.assetId,
      type: item.documentType,
      name: item.asset.fileName,
      size: item.asset.size,
      mimeType: item.asset.mimeType,
      status: item.status,
      url: item.asset.url,
    }));

    setOnboardingData({
      ...data,
      documents:
        savedDocuments.length > 0
          ? savedDocuments
          : Array.isArray(data.documents)
            ? data.documents
            : [],
    });

    setCompletedSteps(onboarding.completedSteps ?? []);

    const savedStepIndex = ONBOARDING_STEPS.findIndex(
      (item) => item.id === onboarding.currentStep,
    );

    if (savedStepIndex >= 0) {
      setCurrentStep(savedStepIndex);
    }

    setInitialized(true);
  }, [onboarding, initialized]);

  const updateData = <K extends keyof InvestmentOnboardingData>(
    key: K,
    value: InvestmentOnboardingData[K],
  ) => {
    setOnboardingData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const saveCurrentStep = async (): Promise<boolean> => {
    if (!onboardingId || !step) return false;

    let stepData: Record<string, unknown>;

    switch (step.id) {
      case "welcome":
        stepData = {};
        break;

      case "classification":
        stepData = {
          classification: onboardingData.classification ?? {},
        };
        break;

      case "tax":
        stepData = {
          tax: onboardingData.tax ?? {},
        };
        break;

      case "documents":
        stepData = {
          documents: onboardingData.documents ?? [],
        };
        break;

      case "agreements":
        stepData = {
          agreements: onboardingData.agreements ?? {},
        };
        break;

      default:
        return true;
    }

    const result = await saveMutation.mutateAsync({
      step: step.id,
      data: stepData,
      completed: true,
    });

    if (result.onboardingData) {
      setOnboardingData((previous) => ({
        ...previous,
        ...result.onboardingData,
      }));
    }

    setCompletedSteps(result.completedSteps ?? []);

    return true;
  };

  const next = async () => {
    if (saving) return;

    // Validate the classification form before saving or proceeding.
    if (step?.id === "classification") {
      const validate = classificationValidatorRef.current;

      if (!validate || !validate()) {
        return;
      }
    }

    if (step?.id === "tax") {
      const validate = taxResidencyValidatorRef.current;

      if (validate && !validate()) {
        return;
      }
    }

    if (step?.id === "agreements") {
      const validate = agreementsValidatorRef.current;

      if (!validate || !validate()) {
        return;
      }
    }

    if (step?.id === "documents") {
      const validate = documentsValidatorRef.current;

      if (!validate || !validate()) {
        return;
      }
    }

    try {
      setSaving(true);
      setError("");

      const saved = await saveCurrentStep();

      if (!saved) return;

      if (currentStep < ONBOARDING_STEPS.length - 1) {
        setCurrentStep((previous) => previous + 1);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save your progress.",
      );
    } finally {
      setSaving(false);
    }
  };

  const previous = () => {
    if (currentStep > 0) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  const goToStep = (index: number) => {
    if (saving || index === currentStep) return;

    if (
      index > currentStep &&
      !completedSteps.includes(ONBOARDING_STEPS[index].id)
    ) {
      return;
    }

    setCurrentStep(index);
  };

  const handleClassificationChange = (value: ClassificationForm) => {
    updateData("classification", value);
  };

  const handleTaxChange = (
    field: keyof TaxResidencyValue,
    value: string | boolean | TaxResidency[],
  ) => {
    setOnboardingData((previous) => ({
      ...previous,
      tax: {
        ...previous.tax,
        [field]: value,
      },
    }));
  };

  const handleDocumentsChange = (value: InvestorDocument[]) => {
    updateData("documents", value);

    if (!onboardingId) return;

    void saveInvestorOnboardingStep(
      onboardingId,
      "documents",
      { documents: value },
      false,
    ).catch((err) => {
      setError(
        err instanceof Error ? err.message : "Unable to save your documents.",
      );
    });
  };

  const agreementSaveQueue = useRef<Promise<unknown>>(Promise.resolve());

  const handleAgreementsChange = (value: AgreementsValue) => {
    updateData("agreements", value);

    if (!onboardingId) return;

    agreementSaveQueue.current = agreementSaveQueue.current
      .catch(() => undefined)
      .then(() =>
        saveInvestorOnboardingStep(
          onboardingId,
          "agreements",
          value as unknown as Record<string, unknown>,
          false,
        ),
      )
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to save your agreements.",
        );
      });
  };

  const handleSubmissionComplete = async () => {
    navigate("/investor-dashboard");
  };

  const renderStep = () => {
    switch (step.id) {
      case "welcome":
        return <WelcomeStep onContinue={next} />;

      case "classification":
        return (
          <InvestorClassificationStep
            value={onboardingData.classification}
            onChange={handleClassificationChange}
            minInvestmentAmount={
              onboarding.investmentInterest.application.minInvestmentAmount
            }
            maxInvestmentAmount={
              onboarding.investmentInterest.application.maxInvestmentAmount
            }
            currency={
              onboarding.investmentInterest.application.currency as Currency
            }
            registerValidator={registerClassificationValidator}
          />
        );

      case "tax":
        return (
          <TaxResidencyStep
            value={onboardingData.tax}
            countries={[]}
            onChange={handleTaxChange}
            registerValidator={registerTaxResidencyValidator}
          />
        );

      case "documents":
        return (
          <DocumentsStep
            value={onboardingData.documents ?? []}
            onChange={handleDocumentsChange}
            classification={onboardingData.classification}
            registerValidator={registerDocumentsValidator}
          />
        );

      case "agreements":
        return (
          <AgreementsStep
            value={onboardingData.agreements}
            onChange={handleAgreementsChange}
            registerValidator={registerAgreementsValidator}
          />
        );

      case "review":
        return (
          <ReviewStep
            onboardingId={onboardingId}
            value={onboardingData}
            investorDocuments={onboarding?.documents ?? []}
            onSubmit={handleSubmissionComplete}
            currency={
              onboarding.investmentInterest.application.currency as Currency
            }
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <Loader type="bounce" />;
  }

  if (loadError || (!onboarding && !loading)) {
    return (
      <ErrorState
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  const onboardingStatus = onboarding?.status.toUpperCase();

  const requiresMoreInformation =
    onboardingStatus === "MORE_INFORMATION_REQUIRED" ||
    Boolean(onboarding?.moreInfoRequested);

  const isReadOnlyStatus =
    !requiresMoreInformation &&
    [
      "SUBMITTED",
      "APPROVED",
      "REJECTED",
      "PAYMENT_PROCESSING",
      "ACTIVE",
      "CLOSED",
    ].includes(onboardingStatus ?? "");

  if (isReadOnlyStatus && onboarding) {
    const statusContent: Record<
      string,
      { title: string; description: string }
    > = {
      SUBMITTED: {
        title: "Application submitted successfully",
        description:
          "Your investment application has been received and is awaiting review. You do not need to submit it again.",
      },
      APPROVED: {
        title: "Application approved",
        description:
          "Your application has been approved. Check your investor dashboard for the next steps.",
      },
      REJECTED: {
        title: "Application declined",
        description:
          onboarding.rejectionReason ||
          "Your application has been declined. Check your investor dashboard for further details.",
      },
      PAYMENT_PROCESSING: {
        title: "Payment processing",
        description:
          "Your application has progressed to payment processing. Check your investor dashboard for updates.",
      },
      ACTIVE: {
        title: "Investment active",
        description:
          "Your investment is active. Visit your dashboard to view its details.",
      },
      CLOSED: {
        title: "Investment closed",
        description:
          "This investment has been closed. Visit your dashboard to review its records.",
      },
    };

    const content = statusContent[onboardingStatus ?? "SUBMITTED"];

    return (
      <div className="min-h-screen bg-background pt-20">
        <header className="border-b bg-background/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
            <Link to="/investor-dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Investor Center</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-12">
          <Card className="p-6 sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              {onboardingStatus === "REJECTED" ? (
                <AlertCircle className="h-7 w-7 text-destructive" />
              ) : (
                <ShieldCheck className="h-7 w-7 text-primary" />
              )}
            </div>
            <div className="mt-5 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                {content.title}
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                {content.description}
              </p>
            </div>
            <div className="mt-8 space-y-4 rounded-lg border bg-muted/20 p-4">
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Application reference
                </span>

                <span className="break-all text-right font-mono text-sm font-medium">
                  {onboarding.reference || onboarding.id}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Status</span>

                <span className="text-sm font-semibold">
                  {onboardingStatus === "SUBMITTED"
                    ? "Under review"
                    : onboardingStatus
                        ?.replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (character) =>
                          character.toUpperCase(),
                        )}
                </span>
              </div>

              {onboarding.submittedAt && (
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    Submitted on
                  </span>

                  <span className="text-right text-sm">
                    {new Date(onboarding.submittedAt).toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              {onboardingStatus === "APPROVED" && onboarding.invoice?.id && (
                <Button
                  onClick={() =>
                    navigate(
                      `/investor-dashboard/invoices/${onboarding.invoice.id}/pay`,
                    )
                  }
                >
                  Pay Invoice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => navigate("/investor-dashboard")}
              >
                Return to investor dashboard
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (!step) return null;

  return (
    <div className="min-h-screen bg-background pt-20">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/investor-dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Investor Center</span>
          </Link>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Save className="h-4 w-4" />

            <span>
              {saving ? "Saving progress..." : "Progress saved automatically"}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">
                Investor onboarding
              </p>

              <h1 className="mt-1 text-2xl font-bold">{step.title}</h1>
            </div>

            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </span>
          </div>

          <Progress value={progress} className="h-2" />

          <p className="mt-2 text-sm text-muted-foreground">
            {step.description}
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

              <p className="text-sm text-destructive">{error}</p>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="sticky top-24 hidden self-start lg:block">
            <Card className="p-4">
              <div className="space-y-1">
                {ONBOARDING_STEPS.map((item, index) => {
                  const completed = completedSteps.includes(item.id);

                  const active = index === currentStep;

                  const accessible = completed || index <= currentStep;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={!accessible || saving}
                      onClick={() => void goToStep(index)}
                      className={[
                        "flex w-full items-start gap-3 rounded-lg p-3 text-left transition",
                        active
                          ? "bg-primary/10 text-primary"
                          : accessible
                            ? "hover:bg-muted"
                            : "cursor-not-allowed opacity-50",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs",
                          completed
                            ? "border-primary bg-primary text-primary-foreground"
                            : active
                              ? "border-primary"
                              : "border-muted-foreground/30",
                        ].join(" ")}
                      >
                        {completed ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          index + 1
                        )}
                      </span>

                      <div>
                        <p className="text-sm font-medium">{item.title}</p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />

                  <div>
                    <p className="text-sm font-medium">
                      Your information is protected
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Information provided during onboarding is handled securely
                      and used for investor verification and account
                      administration.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          <main>
            <Card className="overflow-hidden">
              <div className="p-5 sm:p-8">{renderStep()}</div>

              {currentStep !== 0 &&
                currentStep < ONBOARDING_STEPS.length - 1 && (
                  <div className="flex flex-col-reverse gap-3 border-t bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      variant="ghost"
                      onClick={previous}
                      disabled={saving}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <Button onClick={() => void next()} disabled={saving}>
                      {saving ? "Saving..." : "Continue"}

                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

              {currentStep === 0 && (
                <div className="border-t bg-muted/20 p-4">
                  <div className="flex justify-end">
                    <Button onClick={() => void next()} disabled={saving}>
                      {saving ? "Saving..." : "Continue"}

                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InvestorOnboardingPage;
