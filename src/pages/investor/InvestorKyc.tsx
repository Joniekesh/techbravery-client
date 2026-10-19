import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  IdCard,
  Info,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import PersonalInformationStep, {
  PersonalInformationData,
} from "@/components/investor/PersonalInformationStep";

import IdentityVerificationStep, {
  IdentityCountry,
  IdentityFile,
  IdentityVerificationData,
} from "@/components/investor/IdentityVerificationStep";

import { makeRequest } from "@/utils/makeRequest";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { saveKycDraft, useMyKyc } from "@/services/kyc";
import { useAppSelector } from "@/redux/hooks";
import { KycDocumentAssetType, KycRecord, KycStatus } from "@/types/kyc";
import { queryClient } from "@/services/queryClient";
import { useDebouncedAutosave } from "@/hooks/useDebouncedKycAutosave";
import {
  formatDate,
  formatDateTime,
  formatDocumentType,
  formatKycStatus,
  toDateInputValue,
} from "@/utils";
import Loader from "@/components/loader/Loader";
import { ErrorState } from "@/components/ErrorState";

type KycTab = "personal" | "identity";

export interface InvestorKycProps {
  personalInitialData?: Partial<PersonalInformationData> | null;
  identityInitialData?: Partial<IdentityVerificationData> | null;

  identityInitialFiles?: {
    frontDocument?: IdentityFile | null;
    backDocument?: IdentityFile | null;
    selfie?: IdentityFile | null;
  };

  countries?: IdentityCountry[];
  identityVerificationStatus?: KycStatus;
  identityRejectionReason?: string;

  onPersonalChange?: (data: PersonalInformationData) => void;
  onIdentityChange?: (data: IdentityVerificationData) => void;
  onPersonalValidityChange?: (isValid: boolean) => void;
  onIdentityValidityChange?: (isValid: boolean) => void;

  onIdentityFileChange?: (
    field: "frontDocument" | "backDocument" | "selfie",
    file: File,
  ) => void;

  onIdentityFileRemove?: (
    field: "frontDocument" | "backDocument" | "selfie",
  ) => void;

  onKycValidityChange?: (isValid: boolean) => void;
}

const InvestorKyc = ({
  personalInitialData,
  identityInitialData,
  identityVerificationStatus = KycStatus.NOT_STARTED,
  identityRejectionReason,
  onKycValidityChange,
}: InvestorKycProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const userId = user?.id ?? "";
  const reduxCountries = useAppSelector((state) => state.country.countries);

  const [activeTab, setActiveTab] = useState<KycTab>("personal");

  const [personalValid, setPersonalValid] = useState(false);
  const [identityValid, setIdentityValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryOptions = useMemo(
    () =>
      reduxCountries
        .filter((country) => country.isActive && country.isSupported)
        .map((country) => ({
          id: country.id,
          name: country.name,
          iso2: country.iso2,
          iso3: country.iso3,
          flag: country.flag,
          dialCode: country.dialCode,
          isActive: country.isActive,
          isSupported: country.isSupported,
        })),
    [reduxCountries],
  );

  const [personalData, setPersonalData] =
    useState<PersonalInformationData | null>(null);

  const [identityData, setIdentityData] =
    useState<IdentityVerificationData | null>(null);

  const { data: kyc, isLoading, isError, refetch } = useMyKyc(userId);

  console.log("MY KYC", kyc);

  const kycRecord = kyc as KycRecord | null | undefined;

  const resolvedIdentityInitialFiles = useMemo(() => {
    const documents = kycRecord?.documents ?? [];

    const front = documents.find(
      (document) => document.type === KycDocumentAssetType.FRONT_DOCUMENT,
    );

    const back = documents.find(
      (document) => document.type === KycDocumentAssetType.BACK_DOCUMENT,
    );

    const selfie = documents.find(
      (document) => document.type === KycDocumentAssetType.SELFIE,
    );

    return {
      frontDocument: front
        ? {
            assetId: front.assetId,
            fileId: front.asset.fileId,
            name: front.asset.fileName,
            size: front.asset.size,
            type: front.asset.mimeType,
            url: front.asset.url,
          }
        : null,

      backDocument: back
        ? {
            assetId: back.assetId,
            fileId: back.asset.fileId,
            name: back.asset.fileName,
            size: back.asset.size,
            type: back.asset.mimeType,
            url: back.asset.url,
          }
        : null,

      selfie: selfie
        ? {
            assetId: selfie.assetId,
            fileId: selfie.asset.fileId,
            name: selfie.asset.fileName,
            size: selfie.asset.size,
            type: selfie.asset.mimeType,
            url: selfie.asset.url,
          }
        : null,
    };
  }, [kycRecord?.documents]);

  const residenceCountry = countryOptions.find(
    (country) => country.id === personalData?.countryOfResidenceId,
  );

  const normalizedPhone = personalData?.phone.trim();

  const [localSubmissionStatus, setLocalSubmissionStatus] =
    useState<KycStatus | null>(null);

  const effectiveStatus: KycStatus =
    localSubmissionStatus ??
    kycRecord?.status ??
    identityVerificationStatus ??
    KycStatus.NOT_STARTED;

  const kycDraftData = useMemo(() => {
    return {
      dateOfBirth: personalData?.dateOfBirth || undefined,
      residentialAddress: personalData?.residentialAddress || undefined,
      city: personalData?.city || undefined,
      state: personalData?.state || undefined,
      // phone: personalData?.phone || undefined,
      countryOfOriginId: personalData?.countryOfOriginId || undefined,
      countryOfResidenceId: personalData?.countryOfResidenceId || undefined,
      documentType: identityData?.documentType || undefined,
      documentNumber: identityData?.documentNumber || undefined,
      issuingCountryId: identityData?.issuingCountryId || undefined,
      expiryDate: identityData?.expiryDate || undefined,
      isPoliticallyExposed: identityData?.isPoliticallyExposed ?? undefined,
      frontDocumentAssetId: identityData?.frontDocumentAssetId || undefined,
      backDocumentAssetId: identityData?.backDocumentAssetId ?? undefined,
      selfieAssetId: identityData?.selfieAssetId ?? undefined,
    };
  }, [personalData, identityData]);

  const saveDraft = useCallback(
    async (data: typeof kycDraftData) => {
      if (!userId || !data) {
        return;
      }

      await saveKycDraft(data);

      queryClient.invalidateQueries({ queryKey: ["my-kyc", userId] });
    },
    [queryClient, userId],
  );

  const { isSaving, saveError, lastSavedAt } = useDebouncedAutosave({
    enabled:
      Boolean(userId) &&
      effectiveStatus !== KycStatus.PENDING &&
      effectiveStatus !== KycStatus.APPROVED,
    data: kycDraftData,
    save: saveDraft,
  });

  const isReadOnly =
    effectiveStatus === KycStatus.PENDING ||
    effectiveStatus === KycStatus.APPROVED;

  const canEdit =
    effectiveStatus === KycStatus.NOT_STARTED ||
    effectiveStatus === KycStatus.REJECTED ||
    effectiveStatus === KycStatus.MORE_INFORMATION;

  const canSubmit =
    effectiveStatus === KycStatus.NOT_STARTED ||
    effectiveStatus === KycStatus.REJECTED ||
    effectiveStatus === KycStatus.MORE_INFORMATION;

  const isKycValid = personalValid && identityValid;

  useEffect(() => {
    if (
      effectiveStatus === KycStatus.PENDING ||
      effectiveStatus === KycStatus.APPROVED
    ) {
      onKycValidityChange?.(true);
      return;
    }

    onKycValidityChange?.(isKycValid);
  }, [effectiveStatus, isKycValid, onKycValidityChange]);

  const handleTabChange = (tab: KycTab) => {
    if (!canEdit) {
      return;
    }

    if (tab === "identity" && !personalValid) {
      toast.warning("Please complete your personal information first.");
      setActiveTab("personal");
      return;
    }

    setActiveTab(tab);
  };

  const handleContinue = () => {
    if (!personalValid) {
      toast.error("Please complete your personal information first.");
      return;
    }

    setActiveTab("identity");
  };

  const resolvedPersonalInitialData =
    useMemo<Partial<PersonalInformationData> | null>(() => {
      if (!kycRecord) {
        return personalInitialData ?? null;
      }

      return {
        dateOfBirth: toDateInputValue(kycRecord.dateOfBirth),
        countryOfOriginId: kycRecord.countryOfOrigin?.id ?? "",
        countryOfResidenceId: kycRecord.countryOfResidence?.id ?? "",
        residentialAddress: kycRecord.residentialAddress ?? "",
        city: kycRecord.city ?? "",
        state: kycRecord.state ?? "",
        phone: kycRecord.phone ?? "",
      };
    }, [kycRecord, personalInitialData]);

  const resolvedIdentityInitialData =
    useMemo<Partial<IdentityVerificationData> | null>(() => {
      if (!kycRecord) {
        return identityInitialData ?? null;
      }

      return {
        documentType: kycRecord.documentType ?? "",
        // NEVER populate this from the API.
        documentNumber: "",
        // Safe to return/display as a masked value.
        documentNumberLast4: kycRecord.documentNumberLast4 ?? null,
        issuingCountryId: kycRecord.issuingCountry?.id ?? "",
        expiryDate: toDateInputValue(kycRecord.expiryDate),
        isPoliticallyExposed: kycRecord.isPoliticallyExposed ?? null,
        frontDocumentAssetId: kycRecord.frontDocumentAssetId ?? "",
        backDocumentAssetId: kycRecord.backDocumentAssetId ?? null,
        selfieAssetId: kycRecord.selfieAssetId ?? null,
      };
    }, [kycRecord, identityInitialData]);

  useEffect(() => {
    if (!resolvedPersonalInitialData) {
      return;
    }

    setPersonalData((current) => {
      if (current) {
        return current;
      }

      return {
        dateOfBirth: resolvedPersonalInitialData.dateOfBirth ?? "",
        countryOfOriginId: resolvedPersonalInitialData.countryOfOriginId ?? "",
        countryOfResidenceId:
          resolvedPersonalInitialData.countryOfResidenceId ?? "",
        residentialAddress:
          resolvedPersonalInitialData.residentialAddress ?? "",
        city: resolvedPersonalInitialData.city ?? "",
        state: resolvedPersonalInitialData.state ?? "",
        phone: resolvedPersonalInitialData.phone ?? "",
      };
    });
  }, [resolvedPersonalInitialData]);

  useEffect(() => {
    if (!resolvedIdentityInitialData) {
      return;
    }

    setIdentityData((current) => {
      if (current) {
        return current;
      }

      return {
        documentType: resolvedIdentityInitialData.documentType ?? "",
        documentNumber: resolvedIdentityInitialData.documentNumber ?? "",
        issuingCountryId: resolvedIdentityInitialData.issuingCountryId ?? "",

        expiryDate: resolvedIdentityInitialData.expiryDate ?? "",

        isPoliticallyExposed:
          resolvedIdentityInitialData.isPoliticallyExposed ?? null,

        frontDocumentAssetId:
          resolvedIdentityInitialData.frontDocumentAssetId ?? "",

        backDocumentAssetId:
          resolvedIdentityInitialData.backDocumentAssetId ?? null,

        selfieAssetId: resolvedIdentityInitialData.selfieAssetId ?? null,
        documentNumberLast4:
          resolvedIdentityInitialData.documentNumberLast4 ?? null,
      };
    });
  }, [resolvedIdentityInitialData]);

  if (effectiveStatus === KycStatus.PENDING) {
    return <KycStatusView status="PENDING" kyc={kycRecord} />;
  }

  if (effectiveStatus === KycStatus.APPROVED) {
    return <KycStatusView status="APPROVED" kyc={kycRecord} />;
  }

  async function handleSubmit() {
    if (!canSubmit) {
      return;
    }

    if (!personalValid || !identityValid) {
      toast.error("Please complete all required KYC sections.");
      return;
    }

    if (!personalData || !identityData) {
      toast.error("KYC information is incomplete.");
      return;
    }

    if (personalData.phone?.trim() && !residenceCountry?.dialCode) {
      toast.error(
        "Unable to determine the phone country code. Please select your country of residence again.",
      );
      return;
    }

    const payload = {
      dateOfBirth: personalData.dateOfBirth,
      residentialAddress: personalData.residentialAddress,
      city: personalData.city,
      state: personalData.state,
      phone: normalizedPhone,
      documentType: identityData.documentType,

      ...(identityData.documentNumber.trim()
        ? {
            documentNumber: identityData.documentNumber.trim(),
          }
        : {}),

      issuingCountryId: identityData.issuingCountryId,
      countryOfOriginId: personalData.countryOfOriginId,
      countryOfResidenceId: personalData.countryOfResidenceId,
      expiryDate: identityData.expiryDate,
      isPoliticallyExposed: identityData.isPoliticallyExposed,
      frontDocumentAssetId: identityData.frontDocumentAssetId,
      backDocumentAssetId: identityData.backDocumentAssetId,
      selfieAssetId: identityData.selfieAssetId,
    };

    setIsSubmitting(true);

    try {
      const response = await makeRequest.post("/kyc/me/submit", payload);

      console.log("KYC submitted successfully:", response);

      /*
       * Immediately lock the UI.
       *
       * The backend has accepted the submission and the
       * user's KYC is now awaiting review.
       */
      setLocalSubmissionStatus("PENDING");

      toast.success("KYC submitted successfully and is now under review.");
    } catch (error) {
      console.error("KYC submission failed:", error);

      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <Loader type="bounce" />;
  }

  if (isError) {
    return (
      <ErrorState
        onRetry={() => {
          refetch();
        }}
      />
    );
  }

  return (
    <div className="mx-auto mt-20 w-full max-w-5xl space-y-8 p-2">
      <div>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Know Your Customer
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Complete your personal information and identity verification to
              establish your investor profile and satisfy applicable
              verification and compliance requirements.
            </p>
          </div>

          <KycStatusBadge status={effectiveStatus} />
        </div>
      </div>

      {(effectiveStatus === KycStatus.REJECTED ||
        effectiveStatus === KycStatus.MORE_INFORMATION) && (
        <KycActionNotice
          status={effectiveStatus}
          rejectionReason={identityRejectionReason}
        />
      )}

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div
            className="grid grid-cols-2 border-b"
            role="tablist"
            aria-label="KYC sections"
          >
            <KycTabButton
              id="personal"
              active={activeTab === "personal"}
              completed={personalValid}
              icon={<UserRound className="h-4 w-4" />}
              title="Personal Information"
              description="Basic personal and residential details"
              onClick={() => handleTabChange("personal")}
            />

            <KycTabButton
              id="identity"
              active={activeTab === "identity"}
              completed={identityValid}
              icon={<IdCard className="h-4 w-4" />}
              title="Identity Verification"
              description="Government-issued identity document"
              onClick={() => handleTabChange("identity")}
            />
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div
              role="tabpanel"
              aria-labelledby="personal-tab"
              id="personal-panel"
              hidden={activeTab !== "personal"}
            >
              <PersonalInformationStep
                initialData={resolvedPersonalInitialData}
                onChange={setPersonalData}
                onValidityChange={setPersonalValid}
              />
            </div>

            <div
              role="tabpanel"
              aria-labelledby="identity-tab"
              id="identity-panel"
              hidden={activeTab !== "identity"}
            >
              <IdentityVerificationStep
                initialData={resolvedIdentityInitialData}
                initialFiles={resolvedIdentityInitialFiles}
                verificationStatus={effectiveStatus}
                rejectionReason={
                  kycRecord?.rejectionReason ?? identityRejectionReason
                }
                // onChange={setIdentityData}
                onChange={(data) => {
                  console.log("IDENTITY DATA CHANGED:", data);
                  setIdentityData(data);
                }}
                onValidityChange={setIdentityValid}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={
            isSubmitting ||
            !canSubmit ||
            (activeTab === "personal"
              ? !personalValid
              : !personalValid || !identityValid)
          }
          onClick={activeTab === "personal" ? handleContinue : handleSubmit}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting
            ? "Submitting KYC..."
            : activeTab === "personal"
              ? effectiveStatus === KycStatus.NOT_STARTED
                ? "Continue"
                : "Continue to Update"
              : effectiveStatus === KycStatus.NOT_STARTED
                ? "Submit KYC"
                : "Resubmit KYC"}
        </button>
      </div>

      <KycSummary
        personalValid={personalValid}
        identityValid={identityValid}
        activeTab={activeTab}
        onSelectTab={handleTabChange}
      />
    </div>
  );
};

export default InvestorKyc;

interface KycStatusViewProps {
  status: KycStatus;
  kyc?: KycRecord | null;
}

const KycStatusView = ({ status, kyc }: KycStatusViewProps) => {
  const isApproved = status === KycStatus.APPROVED;

  return (
    <div className="mx-auto mt-20 w-full max-w-5xl space-y-8 p-2">
      <div>
        <div
          className={[
            "mb-4 flex h-11 w-11 items-center justify-center rounded-xl",
            isApproved
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-amber-500/10 text-amber-600",
          ].join(" ")}
        >
          {isApproved ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <Clock3 className="h-6 w-6" />
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {isApproved ? "KYC Verified" : "KYC Under Review"}
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {isApproved
                ? "Your identity verification has been reviewed and approved. Your investor verification is complete."
                : "Your KYC information has been submitted successfully and is currently being reviewed by our compliance team."}
            </p>
          </div>

          <KycStatusBadge status={status} />
        </div>
      </div>

      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {isApproved ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                <Clock3 className="h-5 w-5" />
              </div>
            )}

            <div>
              <p className="font-medium">
                {isApproved
                  ? "Your KYC has been approved"
                  : "Your KYC submission is awaiting review"}
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {isApproved
                  ? "No further action is required at this time."
                  : "You cannot modify or resubmit your KYC while this submission is under review. You will be able to take further action if additional information is requested."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {kyc && <KycSubmittedInformation kyc={kyc} />}
    </div>
  );
};

const KycSubmittedInformation = ({ kyc }: { kyc: KycRecord }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Submitted information</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              This is the information currently attached to your KYC submission.
            </p>
          </div>

          <FileCheck2 className="hidden h-5 w-5 text-muted-foreground sm:block" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <KycInformationSection title="Personal Information">
          <InfoRow label="Date of birth" value={formatDate(kyc.dateOfBirth)} />

          <InfoRow label="Phone" value={kyc.phone} />

          <InfoRow
            label="Country of origin"
            value={kyc.countryOfOrigin?.name}
          />

          <InfoRow
            label="Country of residence"
            value={kyc.countryOfResidence?.name}
          />

          <InfoRow label="Residential address" value={kyc.residentialAddress} />

          <InfoRow label="City" value={kyc.city} />

          <InfoRow label="State" value={kyc.state} />
        </KycInformationSection>

        <Separator />

        <KycInformationSection title="Identity Verification">
          <InfoRow
            label="Document type"
            value={formatDocumentType(kyc.documentType)}
          />

          <InfoRow
            label="Document number"
            value={
              kyc.documentNumberLast4
                ? `•••• ${kyc.documentNumberLast4}`
                : "Not available"
            }
          />

          <InfoRow label="Issuing country" value={kyc.issuingCountry?.name} />

          <InfoRow label="Document expiry" value={formatDate(kyc.expiryDate)} />

          <InfoRow
            label="Politically exposed person"
            value={kyc.isPoliticallyExposed ? "Yes" : "No"}
          />

          <InfoRow
            label="Front document"
            value={kyc.frontDocumentAssetId ? "Submitted" : "Not submitted"}
          />

          <InfoRow
            label="Back document"
            value={kyc.backDocumentAssetId ? "Submitted" : "Not submitted"}
          />

          <InfoRow
            label="Selfie"
            value={kyc.selfieAssetId ? "Submitted" : "Not submitted"}
          />
        </KycInformationSection>

        <Separator />

        <KycInformationSection title="Submission">
          <InfoRow label="Status" value={formatKycStatus(kyc.status)} />

          <InfoRow
            label="Submitted"
            value={
              kyc.submittedAt
                ? formatDateTime(kyc.submittedAt)
                : "Not available"
            }
          />

          <InfoRow
            label="Reviewed"
            value={
              kyc.reviewedAt
                ? formatDateTime(kyc.reviewedAt)
                : "Not yet reviewed"
            }
          />
        </KycInformationSection>
      </CardContent>
    </Card>
  );
};

const KycActionNotice = ({
  status,
  rejectionReason,
}: {
  status: KycStatus;
  rejectionReason?: string;
}) => {
  const rejected = status === KycStatus.REJECTED;

  return (
    <Card
      className={rejected ? "border-destructive/20" : "border-amber-500/20"}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          {rejected ? (
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          ) : (
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          )}

          <div>
            <p className="font-medium">
              {rejected
                ? "KYC submission requires attention"
                : "Additional information is required"}
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {rejected
                ? "Your previous KYC submission was not approved. Review the information below, make the required corrections, and resubmit."
                : "Our compliance team has requested additional information. Update the required sections below and resubmit your KYC."}
            </p>

            {rejectionReason && (
              <div className="mt-4 rounded-lg border bg-background p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Review message
                </p>

                <p className="mt-1 text-sm leading-6">{rejectionReason}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const KycStatusBadge = ({ status }: { status: KycStatus }) => {
  switch (status) {
    case KycStatus.APPROVED:
      return (
        <Badge className="w-fit bg-emerald-600 px-3 py-1.5 hover:bg-emerald-600">
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
          KYC approved
        </Badge>
      );

    case KycStatus.PENDING:
      return (
        <Badge
          variant="secondary"
          className="w-fit border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-amber-700"
        >
          <Clock3 className="mr-1.5 h-3.5 w-3.5" />
          Under review
        </Badge>
      );

    case KycStatus.REJECTED:
      return (
        <Badge variant="destructive" className="w-fit px-3 py-1.5">
          <XCircle className="mr-1.5 h-3.5 w-3.5" />
          KYC rejected
        </Badge>
      );

    case KycStatus.MORE_INFORMATION:
      return (
        <Badge
          variant="secondary"
          className="w-fit border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-amber-700"
        >
          <Info className="mr-1.5 h-3.5 w-3.5" />
          Action required
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary" className="w-fit px-3 py-1.5">
          <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
          KYC in progress
        </Badge>
      );
  }
};

interface KycTabButtonProps {
  id: KycTab;
  active: boolean;
  completed: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const KycTabButton = ({
  id,
  active,
  completed,
  icon,
  title,
  description,
  onClick,
}: KycTabButtonProps) => {
  return (
    <button
      id={`${id}-tab`}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`${id}-panel`}
      onClick={onClick}
      className={[
        "relative flex min-h-[92px] items-center gap-3 px-4 py-4 text-left transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40",
        active
          ? "bg-primary/[0.04] text-foreground"
          : "bg-background text-muted-foreground hover:bg-muted/30 hover:text-foreground",
      ].join(" ")}
    >
      {active && (
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
      )}

      <div
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
          active
            ? "bg-primary text-primary-foreground"
            : completed
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        {completed ? <CheckCircle2 className="h-5 w-5" /> : icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={[
              "text-sm font-semibold",
              active ? "text-primary" : "text-foreground",
            ].join(" ")}
          >
            {title}
          </p>

          {completed && (
            <Badge
              variant="secondary"
              className="hidden text-[10px] sm:inline-flex"
            >
              Complete
            </Badge>
          )}
        </div>

        <p className="mt-1 hidden text-xs leading-5 text-muted-foreground sm:block">
          {description}
        </p>
      </div>
    </button>
  );
};

interface KycSummaryProps {
  personalValid: boolean;
  identityValid: boolean;
  activeTab: KycTab;
  onSelectTab: (tab: KycTab) => void;
}

const KycSummary = ({
  personalValid,
  identityValid,
  activeTab,
  onSelectTab,
}: KycSummaryProps) => {
  const completedCount = Number(personalValid) + Number(identityValid);

  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">KYC progress</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {completedCount} of 2 required sections completed.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <SectionStatus
              label="Personal"
              completed={personalValid}
              active={activeTab === "personal"}
              onClick={() => onSelectTab("personal")}
            />

            <Separator orientation="vertical" className="h-6" />

            <SectionStatus
              label="Identity"
              completed={identityValid}
              active={activeTab === "identity"}
              onClick={() => onSelectTab("identity")}
            />
          </div>
        </div>

        {!personalValid || !identityValid ? (
          <div className="mt-5 rounded-lg border border-primary/10 bg-primary/[0.03] p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

              <p className="text-xs leading-5 text-muted-foreground">
                Both Personal Information and Identity Verification must be
                completed before the KYC section can be submitted.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

              <div>
                <p className="text-sm font-medium">
                  KYC information is complete
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Your personal information and identity verification sections
                  have both passed their required client-side validation.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface SectionStatusProps {
  label: string;
  completed: boolean;
  active: boolean;
  onClick: () => void;
}

const SectionStatus = ({
  label,
  completed,
  active,
  onClick,
}: SectionStatusProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        active ? "bg-muted font-medium" : "hover:bg-muted/60",
      ].join(" ")}
    >
      {completed ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      ) : (
        <span className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
      )}

      <span>{label}</span>
    </button>
  );
};

const KycInformationSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>

      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">{children}</div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <p className="mt-1 text-sm">{value || "Not provided"}</p>
    </div>
  );
};
