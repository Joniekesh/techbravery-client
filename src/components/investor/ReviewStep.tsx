import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  FileText,
  Loader2,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type {
  Agreement,
  AgreementsValue,
  ClassificationForm,
  InvestmentOnboardingData,
  InvestorDocument,
} from "@/types/investor";
import { submitInvestment } from "@/services/investment.ts";
import { ConsultationScheduler } from "../CalendlyWidget";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useSubmitInvestorOnboarding } from "@/services/onboarding";
import { useAppSelector } from "@/redux/hooks";
import { Currency } from "@/types/currency";
import {
  displayValue,
  formatDate,
  formatInvestmentAmount,
  formatSize,
  getText,
  humanize,
} from "@/utils";

type UnknownRecord = Record<string, unknown>;

interface ReviewStepProps {
  onboardingId: string;
  value?: InvestmentOnboardingData;
  investorDocuments?: InvestorOnboardingDocument[];
  agreementsList?: Agreement[];
  currency?: Currency;
  onSubmit?: () => void | Promise<void>;
}

type InvestorOnboardingDocument = {
  id?: string;
  assetId: string;
  name?: string;
  documentType: string;
  type?: string;
  status: string;
  size?: number;
  mimeType?: string;
  url?: string;
  asset?: {
    id?: string;
    fileName?: string;
    size?: number;
    mimeType?: string;
    url?: string;
    status?: string;
  };
};

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const DEFAULT_AGREEMENTS: Agreement[] = [
  {
    id: "investment-terms",
    title: "Investment terms and conditions",
    description:
      "I have read and agree to the terms and conditions governing my investment.",
    version: "1.0",
    required: true,
  },
  {
    id: "risk-disclosure",
    title: "Investment risk disclosure",
    description:
      "I acknowledge that investments involve risk and that returns are not guaranteed.",
    version: "1.0",
    required: true,
  },
  {
    id: "privacy-policy",
    title: "Privacy and data processing",
    description:
      "I consent to the processing of my information for investment administration, verification, and regulatory purposes.",
    version: "1.0",
    required: true,
  },
];

type AnyRecord = Record<string, any>;

const unwrap = (value: unknown, key: string): UnknownRecord => {
  const layers: UnknownRecord[] = [];
  let current: unknown = value;

  while (isRecord(current) && isRecord(current[key])) {
    layers.push(current);
    current = current[key];
  }

  const result: UnknownRecord = isRecord(current) ? { ...current } : {};

  for (const layer of layers.reverse()) {
    for (const [field, fieldValue] of Object.entries(layer)) {
      if (field === key) continue;

      if (
        fieldValue === undefined ||
        fieldValue === null ||
        (typeof fieldValue === "string" && fieldValue.trim() === "")
      ) {
        continue;
      }

      result[field] = fieldValue;
    }
  }

  return result;
};

const isAccepted = (value: unknown): boolean => value === true;

const ReviewStep = ({
  onboardingId,
  value,
  investorDocuments,
  agreementsList = DEFAULT_AGREEMENTS,
  currency,
  onSubmit,
}: ReviewStepProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? "";

  const submitOnboarding = useSubmitInvestorOnboarding(
    onboardingId,
    // Pass the authenticated user's ID here.
    userId,
  );

  console.log("DATA", value);

  const data = (value ?? {}) as AnyRecord;

  const classificationData = unwrap(data.classification, "classification");

  const taxData = unwrap(data.tax, "tax");

  const agreementData = unwrap(data.agreements, "agreements");

  const classification =
    classificationData as unknown as Partial<ClassificationForm>;

  const investmentAmount = classification.investmentAmount;

  const investmentAmountDisplay = formatInvestmentAmount(
    investmentAmount,
    currency,
  );

  const numericInvestmentAmount = Number(
    getText(investmentAmount).replace(/,/g, ""),
  );

  const hasValidInvestmentAmount =
    getText(investmentAmount) !== "" &&
    Number.isFinite(numericInvestmentAmount) &&
    numericInvestmentAmount > 0;

  const agreements = agreementData as Partial<AgreementsValue>;

  const declarations = agreements.declarations ?? {};

  const acceptedIds = Array.isArray(agreements.acceptedAgreementIds)
    ? agreements.acceptedAgreementIds
    : [];

  const requiredAgreements = agreementsList.filter(
    (agreement) => agreement.required !== false,
  );

  const missingAgreements = requiredAgreements.filter(
    (agreement) => !acceptedIds.includes(agreement.id),
  );

  const missingDeclarations = [
    !isAccepted(declarations.informationAccurate) &&
      "Information accuracy declaration",
    !isAccepted(declarations.understandRisks) && "Investment risk declaration",
    !isAccepted(declarations.authorizeVerification) &&
      "Verification authorization",
  ].filter((item): item is string => Boolean(item));

  const documents = useMemo<InvestorDocument[]>(() => {
    const serverDocuments = Array.isArray(investorDocuments)
      ? investorDocuments
      : [];

    if (serverDocuments.length > 0) {
      return serverDocuments.map((item, index) => {
        const asset = item.asset ?? {};

        return {
          id: item.id || `server-document-${index}`,
          assetId: item.assetId || asset.id || "",
          name: item.name || asset.fileName || `Document ${index + 1}`,
          type: item.documentType || item.type || "OTHER",
          size: Number(item.size ?? asset.size) || 0,
          mimeType: item.mimeType || asset.mimeType || "",
          url: asset.url || item.url || "",
          status: item.status || asset.status || "UPLOADED",
        } as InvestorDocument;
      });
    }

    const savedDocuments = unwrap(data.documents, "documents");

    const rawDocuments = Array.isArray(savedDocuments)
      ? savedDocuments
      : Array.isArray(data.documents)
        ? data.documents
        : [];

    return rawDocuments.map((item: AnyRecord, index: number) => ({
      id: getText(item.id) || `saved-document-${index}`,
      assetId: getText(item.assetId),
      name: getText(item.name) || `Document ${index + 1}`,
      type: getText(item.type || item.documentType) || "OTHER",
      size: Number(item.size) || 0,
      mimeType: getText(item.mimeType),
      url: getText(item.url),
      status: getText(item.status) || "UPLOADED",
    })) as InvestorDocument[];
  }, [data.documents, investorDocuments]);

  const additionalResidencies = Array.isArray(taxData.additionalResidencies)
    ? taxData.additionalResidencies
    : [];

  const investorType = getText(classification.investmentType);
  const individualType = getText(classification.individualInvestmentType);

  const isIndividual = investorType === "INDIVIDUAL";
  const isCorporate = investorType === "CORPORATE";
  const isInstitution = investorType === "INSTITUTION";

  const classificationComplete = Boolean(investorType);

  const classificationSummary = useMemo(() => {
    if (isIndividual) {
      switch (individualType) {
        case "MYSELF":
          return "Individual — investing for myself";
        case "SOMEONE_ELSE":
          return "Individual — investing for someone else";
        case "JOINT_INVESTMENT":
          return "Individual — joint investment";
        default:
          return "Individual";
      }
    }

    if (isCorporate) {
      return getText(classification.corporateLegalName)
        ? `Corporate — ${classification.corporateLegalName}`
        : "Corporate investor";
    }

    if (isInstitution) {
      return getText(classification.institutionalLegalName)
        ? `Institutional — ${classification.institutionalLegalName}`
        : "Institutional investor";
    }

    return humanize(investorType);
  }, [
    classification,
    individualType,
    isCorporate,
    isIndividual,
    isInstitution,
    investorType,
  ]);

  const requiredDocumentsUploaded = documents.length > 0;

  const agreementsComplete =
    missingAgreements.length === 0 && missingDeclarations.length === 0;

  const isReady =
    classificationComplete &&
    hasValidInvestmentAmount &&
    requiredDocumentsUploaded &&
    agreementsComplete;

  const readinessChecks = [
    {
      label: "Investor classification",
      complete: classificationComplete,
    },
    {
      label: "Investment amount",
      complete: hasValidInvestmentAmount,
    },
    {
      label: "Tax residency (optional)",
      complete: true,
    },
    {
      label: "Supporting documents",
      complete: requiredDocumentsUploaded,
    },
    {
      label: "Agreements and declarations",
      complete: agreementsComplete,
    },
    {
      label: "Onboarding ID",
      complete: Boolean(onboardingId),
    },
  ];

  const handleSubmit = async () => {
    setError("");

    if (!onboardingId) {
      setError("Your onboarding application could not be identified.");
      return;
    }

    if (!isReady) {
      setError(
        "Please complete all required sections before submitting your application.",
      );
      return;
    }

    if (submitting || submitOnboarding.isPending) {
      return;
    }

    try {
      setSubmitting(true);

      // Calls POST /investor-onboarding/:onboardingId/submit
      await submitOnboarding.mutateAsync();

      toast.success("Your investment application has been submitted.");

      // Navigate or refresh only after the API confirms success.
      await onSubmit?.();
    } catch (err: unknown) {
      const message = getErrorMessage(err);

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-8">
      <header>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Review your investment application
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Review the information below carefully. Confirm that your
          classification, tax residency, supporting documents, and declarations
          are accurate before submitting.
        </p>
      </header>

      <Card className="border-primary/20 bg-primary/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h3 className="text-sm font-semibold">Final review</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Your information will be used to administer your investment
              application and complete any required verification. After
              submission, some details may be locked while your application is
              under review.
            </p>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden border-primary/20">
        <div className="border-b bg-muted/30 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">Investment summary</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Review the amount you selected for this investment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <div className="rounded-xl border bg-background p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Investment amount
            </p>

            <p className="mt-3 break-words text-3xl font-bold tracking-tight sm:text-4xl">
              {investmentAmountDisplay}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              Amount entered during investor classification
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-5">
            {hasValidInvestmentAmount ? (
              <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
            ) : (
              <AlertCircle className="h-6 w-6 shrink-0 text-destructive" />
            )}

            <div>
              <p className="font-semibold">
                {hasValidInvestmentAmount
                  ? "Investment amount provided"
                  : "Investment amount required"}
              </p>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {hasValidInvestmentAmount
                  ? "The amount is available for review."
                  : "Return to investor classification and enter a valid investment amount greater than zero."}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Section
        title="Investor classification"
        description="Your investor type and the details relevant to that classification."
        complete={classificationComplete}
        icon={<UserRound className="h-5 w-5" />}
      >
        <SummaryGrid>
          <SummaryField label="Investor type" value={humanize(investorType)} />
          <SummaryField
            label="Investment purpose"
            value={humanize(individualType)}
          />
          <SummaryField
            label="Politically exposed person (PEP)"
            value={
              typeof classification.isPoliticallyExposed === "boolean"
                ? classification.isPoliticallyExposed
                  ? "Yes"
                  : "No"
                : "Not answered"
            }
          />
        </SummaryGrid>

        {isIndividual && individualType === "SOMEONE_ELSE" && (
          <div className="mt-5 space-y-3">
            <Subheading>Beneficiary details</Subheading>
            <SummaryGrid>
              <SummaryField
                label="First name"
                value={classification.beneficiaryFirstName}
              />
              <SummaryField
                label="Middle name"
                value={classification.beneficiaryMiddleName}
              />
              <SummaryField
                label="Last name"
                value={classification.beneficiaryLastName}
              />
              <SummaryField
                label="Email address"
                value={classification.beneficiaryEmail}
              />
              <SummaryField
                label="Phone number"
                value={classification.beneficiaryPhoneNumber}
              />
              <SummaryField
                label="Date of birth"
                value={formatDate(classification.beneficiaryDateOfBirth)}
              />
              <SummaryField
                label="Relationship"
                value={classification.beneficiaryRelationship}
              />
              <SummaryField
                label="Residential address"
                value={classification.beneficiaryAddress}
                fullWidth
              />
            </SummaryGrid>
          </div>
        )}

        {isIndividual && individualType === "JOINT_INVESTMENT" && (
          <div className="mt-5 space-y-3">
            <Subheading>Joint investor details</Subheading>
            <SummaryGrid>
              <SummaryField
                label="First name"
                value={classification.jointInvestorFirstName}
              />
              <SummaryField
                label="Middle name"
                value={classification.jointInvestorMiddleName}
              />
              <SummaryField
                label="Last name"
                value={classification.jointInvestorLastName}
              />
              <SummaryField
                label="Email address"
                value={classification.jointInvestorEmail}
              />
              <SummaryField
                label="Phone number"
                value={classification.jointInvestorPhoneNumber}
              />
              <SummaryField
                label="Date of birth"
                value={formatDate(classification.jointInvestorDateOfBirth)}
              />
              <SummaryField
                label="Relationship"
                value={classification.jointInvestorRelationship}
              />
              <SummaryField
                label="Residential address"
                value={classification.jointInvestorAddress}
                fullWidth
              />
            </SummaryGrid>
          </div>
        )}

        {isCorporate && (
          <div className="mt-5 space-y-3">
            <Subheading>Corporate details</Subheading>
            <SummaryGrid>
              <SummaryField
                label="Legal business name"
                value={classification.corporateLegalName}
              />
              <SummaryField
                label="Entity type"
                value={classification.corporateEntityType}
              />
              <SummaryField
                label="Registration number"
                value={classification.corporateRegistrationNumber}
              />
              <SummaryField
                label="Tax identification number"
                value={classification.corporateTaxIdentificationNumber}
              />
              <SummaryField
                label="Country of registration"
                value={classification.corporateCountryOfRegistration}
              />
              <SummaryField
                label="Date of incorporation"
                value={formatDate(classification.corporateDateOfIncorporation)}
              />
              <SummaryField
                label="Business activity"
                value={classification.corporateBusinessActivity}
                fullWidth
              />
              <SummaryField
                label="Registered address"
                value={classification.corporateRegisteredAddress}
                fullWidth
              />
              <SummaryField
                label="Website"
                value={classification.corporateWebsite}
                fullWidth
              />
            </SummaryGrid>
          </div>
        )}

        {isInstitution && (
          <div className="mt-5 space-y-3">
            <Subheading>Institutional details</Subheading>
            <SummaryGrid>
              <SummaryField
                label="Institution name"
                value={classification.institutionalLegalName}
              />
              <SummaryField
                label="Institution type"
                value={classification.institutionalType}
              />
              <SummaryField
                label="Registration number"
                value={classification.institutionalRegistrationNumber}
              />
              <SummaryField
                label="License number"
                value={classification.institutionalLicenseNumber}
              />
              <SummaryField
                label="Tax identification number"
                value={classification.institutionalTaxIdentificationNumber}
              />
              <SummaryField
                label="Country of registration"
                value={classification.institutionalCountryOfRegistration}
              />
              <SummaryField
                label="Date of establishment"
                value={formatDate(
                  classification.institutionalDateOfEstablishment,
                )}
              />
              <SummaryField
                label="Regulatory body"
                value={classification.institutionalRegulatoryBody}
              />
              <SummaryField
                label="Business activity"
                value={classification.institutionalBusinessActivity}
                fullWidth
              />
              <SummaryField
                label="Registered address"
                value={classification.institutionalRegisteredAddress}
                fullWidth
              />
              <SummaryField
                label="Website"
                value={classification.institutionalWebsite}
                fullWidth
              />
            </SummaryGrid>
          </div>
        )}
      </Section>

      <Section
        title="Tax residency"
        description="Your primary tax residency and any additional tax residencies declared."
        complete={Boolean(getText(taxData.countryId))}
        icon={<FileCheck2 className="h-5 w-5" />}
      >
        <SummaryGrid>
          <SummaryField
            label="Primary tax residency"
            value={taxData.countryId}
          />
          <SummaryField
            label="Tax identification number"
            value={taxData.taxIdentificationNumber}
          />
          <SummaryField
            label="Additional tax residencies declared"
            value={taxData.hasAdditionalTaxResidencies ? "Yes" : "No"}
          />
        </SummaryGrid>

        {taxData.hasAdditionalTaxResidencies && (
          <div className="mt-5 space-y-3">
            <Subheading>
              Additional residencies ({additionalResidencies.length})
            </Subheading>

            {additionalResidencies.length > 0 ? (
              <div className="space-y-3">
                {additionalResidencies.map(
                  (residency: AnyRecord, index: number) => (
                    <div
                      key={`${getText(residency.countryId)}-${index}`}
                      className="rounded-lg border p-4"
                    >
                      <p className="mb-3 text-sm font-medium">
                        Additional residency {index + 1}
                      </p>
                      <SummaryGrid>
                        <SummaryField
                          label="Country"
                          value={residency.countryId}
                        />
                        <SummaryField
                          label="Tax identification number"
                          value={residency.taxIdentificationNumber}
                        />
                      </SummaryGrid>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Additional tax residency was selected, but no residency details
                were saved.
              </p>
            )}
          </div>
        )}
      </Section>

      <Section
        title="Supporting documents"
        description="Uploaded documents associated with your investment application."
        complete={requiredDocumentsUploaded}
        icon={<FileText className="h-5 w-5" />}
      >
        {documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No documents have been uploaded.
          </p>
        ) : (
          <div className="space-y-3">
            {documents.map((document, index) => (
              <DocumentSummary
                key={document.id || document.assetId || index}
                document={document}
              />
            ))}
          </div>
        )}
      </Section>

      <Section
        title="Agreements and declarations"
        description="Your acceptance of the applicable agreements and required declarations."
        complete={agreementsComplete}
        icon={<ShieldCheck className="h-5 w-5" />}
      >
        <div className="space-y-3">
          {agreementsList.map((agreement) => {
            const accepted = acceptedIds.includes(agreement.id);

            return (
              <div
                key={agreement.id}
                className="flex items-start gap-3 rounded-lg border p-4"
              >
                {accepted ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                ) : (
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{agreement.title}</p>
                    {agreement.required !== false && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                    {agreement.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Version {agreement.version} ·{" "}
                    {accepted ? "Accepted" : "Not accepted"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 space-y-3">
          <Subheading>Declarations</Subheading>
          <DeclarationSummary
            label="Information accuracy"
            description="I confirm that the information provided is accurate, complete, and not misleading."
            accepted={isAccepted(declarations.informationAccurate)}
          />
          <DeclarationSummary
            label="Understanding of investment risks"
            description="I understand that investments involve risk and returns are not guaranteed."
            accepted={isAccepted(declarations.understandRisks)}
          />
          <DeclarationSummary
            label="Authorization to verify"
            description="I authorize the platform to verify the information and documents provided."
            accepted={isAccepted(declarations.authorizeVerification)}
          />
        </div>

        {!agreementsComplete && (
          <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-destructive">
              Outstanding confirmations
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {missingAgreements.map((agreement) => (
                <li key={agreement.id}>Accept {agreement.title}.</li>
              ))}
              {missingDeclarations.map((declaration) => (
                <li key={declaration}>{declaration} is required.</li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Card className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {isReady ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          )}
          <div>
            <p className="text-sm font-semibold">
              {isReady ? "Ready for submission" : "Complete your application"}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {isReady
                ? "Your required review sections are complete. Submit your application when you are satisfied that the details are correct."
                : "One or more required sections are incomplete. Return to the relevant onboarding step to complete the missing information."}
            </p>
          </div>
        </div>
      </Card>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="sticky bottom-3 z-20">
        <Card className="p-4">
          <h3 className="font-semibold">Submission requirements</h3>

          <div className="mt-3 space-y-3">
            {readinessChecks.map((check) => (
              <div
                key={check.label}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-sm">{check.label}</span>

                <span
                  className={
                    check.complete
                      ? "text-sm font-medium text-green-600"
                      : "text-sm font-medium text-destructive"
                  }
                >
                  {check.complete ? "Complete" : "Incomplete"}
                </span>
              </div>
            ))}
          </div>

          {!isReady && (
            <p className="mt-4 text-sm text-destructive">
              Complete all required items before submitting.
            </p>
          )}
        </Card>

        <Card className="rounded-2xl border bg-background/95 p-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/85 sm:p-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-start gap-3 px-1">
              {isReady ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
              )}

              <div className="min-w-0">
                <p className="text-sm font-semibold">
                  {isReady
                    ? "Your application is ready"
                    : "Your application needs attention"}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {isReady
                    ? "Confirm your information before submitting for review."
                    : "Complete the outstanding requirements before submitting."}
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                submitting ||
                submitOnboarding.isPending ||
                !isReady ||
                !onboardingId
              }
              className="h-11 w-full rounded-xl px-6 font-semibold sm:w-auto sm:min-w-52"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit application
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Section = ({
  title,
  description,
  complete,
  icon,
  children,
}: {
  title: string;
  description: string;
  complete: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Card className="overflow-hidden">
    <div className="flex items-start gap-3 border-b p-4 sm:p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>

      <span
        className={[
          "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
          complete
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        {complete ? "Complete" : "Incomplete"}
      </span>
    </div>

    <div className="space-y-4 p-4 sm:p-5">{children}</div>
  </Card>
);

const SummaryGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {children}
  </div>
);

const SummaryField = ({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: unknown;
  fullWidth?: boolean;
}) => (
  <div className={fullWidth ? "sm:col-span-2 lg:col-span-3" : ""}>
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {label}
    </p>
    <p className="mt-1 break-words text-sm leading-6">{displayValue(value)}</p>
  </div>
);

const Subheading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-sm font-semibold">{children}</h4>
);

const DeclarationSummary = ({
  label,
  description,
  accepted,
}: {
  label: string;
  description: string;
  accepted: boolean;
}) => (
  <div className="flex items-start gap-3 rounded-lg border p-3">
    {accepted ? (
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
    ) : (
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
    )}
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 text-sm leading-5 text-muted-foreground">
        {description}
      </p>
      <p className="mt-2 text-xs font-medium">
        {accepted ? "Confirmed" : "Not confirmed"}
      </p>
    </div>
  </div>
);

const DocumentSummary = ({ document }: { document: InvestorDocument }) => {
  const item = document as InvestorDocument & AnyRecord;
  const name = getText(item.name) || "Uploaded document";
  const type = humanize(item.type || item.documentType);
  const status = humanize(item.status || "UPLOADED");
  const size = formatSize(item.size);
  const url = getText(item.url);

  const isApproved = ["APPROVED", "VERIFIED"].includes(
    getText(item.status).toUpperCase(),
  );

  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border bg-card p-3.5 transition-colors hover:bg-muted/20 sm:gap-4 sm:p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted/40">
        <FileText className="h-5 w-5 text-primary" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="break-words text-sm font-semibold leading-5">{name}</p>

        <p className="mt-1.5 text-xs text-muted-foreground">{type}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {size && (
            <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
              {size}
            </span>
          )}

          {item.mimeType && (
            <span className="max-w-full break-all rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
              {item.mimeType}
            </span>
          )}

          <span
            className={[
              "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium",
              isApproved
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground",
            ].join(" ")}
          >
            {isApproved && <CheckCircle2 className="h-3 w-3" />}
            {status}
          </span>
        </div>
      </div>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${name}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="hidden sm:inline">View file</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
};

export default ReviewStep;
