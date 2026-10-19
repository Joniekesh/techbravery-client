import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  CircleHelp,
  FileCheck2,
  FileImage,
  Info,
  LockKeyhole,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import CountrySelect, { type CountryOption } from "../shared/CountrySelect";
import { uploadFiles } from "@/image/upload";
import ImageContainer from "@/image/ImageContainer";
import { ImageAssetPurpose } from "@/types/image-asset";
import { IdentityDocumentType, KycStatus } from "@/types/kyc";
import { formatFileSize, getToday, isValidDateString } from "@/utils";
import { useAppSelector } from "@/redux/hooks";

export interface IdentityFile {
  file?: File;
  assetId: string;
  fileId: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  url?: string;
}

export interface IdentityVerificationData {
  documentType: IdentityDocumentType | "";
  documentNumber: string;
  documentNumberLast4?: string | null;
  issuingCountryId: string;
  expiryDate: string;
  isPoliticallyExposed: boolean | null;

  frontDocumentAssetId: string;
  backDocumentAssetId?: string | null;
  selfieAssetId?: string | null;
}

export interface IdentityCountry {
  id: string;
  name: string;
  iso2?: string;
  iso3?: string;
  flag?: string;
  isActive?: boolean;
  isSupported?: boolean;
}

export interface IdentityVerificationStepProps {
  initialData?: Partial<IdentityVerificationData> | null;

  initialFiles?: {
    frontDocument?: IdentityFile | null;
    backDocument?: IdentityFile | null;
    selfie?: IdentityFile | null;
  };

  countries?: IdentityCountry[];
  verificationStatus?: KycStatus;
  rejectionReason?: string;

  onChange?: (data: IdentityVerificationData) => void;

  onFileChange?: (
    field: "frontDocument" | "backDocument" | "selfie",
    file: File,
  ) => void;

  onRemoveFile?: (field: "frontDocument" | "backDocument" | "selfie") => void;

  onValidityChange?: (isValid: boolean) => void;
}

const DOCUMENT_TYPES: Array<{
  value: IdentityDocumentType;
  label: string;
  description: string;
}> = [
  {
    value: "PASSPORT",
    label: "Passport",
    description: "International passport",
  },
  {
    value: "NATIONAL_ID",
    label: "National ID",
    description: "Government-issued national identity card",
  },
  {
    value: "DRIVERS_LICENSE",
    label: "Driver's licence",
    description: "Government-issued driver's licence",
  },
  {
    value: "VOTER_CARD",
    label: "Voter's Card",
    description: "Government-issued voter identity document",
  },
  {
    value: "OTHER",
    label: "Other government ID",
    description: "Another accepted government-issued document",
  },
];

const ACCEPTED_DOCUMENT_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const ACCEPTED_SELFIE_TYPES = ["image/jpeg", "image/png"];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const IdentityVerificationStep = ({
  initialData,
  initialFiles,
  verificationStatus = "NOT_STARTED",
  rejectionReason,
  onChange,
  onFileChange,
  onRemoveFile,
  onValidityChange,
}: IdentityVerificationStepProps) => {
  const reduxCountries = useAppSelector((state) => state.country.countries);

  const [documentType, setDocumentType] = useState<IdentityDocumentType | "">(
    initialData?.documentType ?? "",
  );

  const [documentNumber, setDocumentNumber] = useState(
    initialData?.documentNumber ?? "",
  );

  const [issuingCountryId, setIssuingCountryId] = useState(
    initialData?.issuingCountryId ?? "",
  );

  const [expiryDate, setExpiryDate] = useState(initialData?.expiryDate ?? "");

  const [isPoliticallyExposed, setIsPoliticallyExposed] = useState<
    boolean | null
  >(initialData?.isPoliticallyExposed ?? null);

  const [frontDocument, setFrontDocument] = useState<IdentityFile | null>(
    initialFiles?.frontDocument ?? null,
  );

  const [backDocument, setBackDocument] = useState<IdentityFile | null>(
    initialFiles?.backDocument ?? null,
  );

  const [selfie, setSelfie] = useState<IdentityFile | null>(
    initialFiles?.selfie ?? null,
  );

  const [showPepExplanation, setShowPepExplanation] = useState(false);

  const [fileError, setFileError] = useState<string | null>(null);

  const [uploadingField, setUploadingField] = useState<
    "frontDocument" | "backDocument" | "selfie" | null
  >(null);

  const isVerified = verificationStatus === "APPROVED";
  const isPending = verificationStatus === "PENDING";
  const isLocked = isVerified || isPending;

  const isRejected = verificationStatus === "REJECTED";
  const requiresMoreInformation = verificationStatus === "MORE_INFORMATION";

  const countryOptions = useMemo<CountryOption[]>(
    () =>
      reduxCountries
        .filter((country) => country.isActive && country.isSupported)
        .map(
          (country) =>
            ({
              id: country.id,
              name: country.name,
              iso2: country.iso2,
              iso3: country.iso3,
              flag: country.flag,
              dialCode: country.dialCode,
              isActive: country.isActive,
              isSupported: country.isSupported,
            }) as CountryOption,
        ),
    [reduxCountries],
  );

  const issuingCountry = useMemo<CountryOption | null>(() => {
    if (!issuingCountryId) {
      return null;
    }

    return (
      countryOptions.find((country) => country.id === issuingCountryId) ?? null
    );
  }, [issuingCountryId, countryOptions]);

  useEffect(() => {
    if (!issuingCountryId) {
      return;
    }

    const selectedCountry =
      countryOptions.find((country) => country.id === issuingCountryId) ?? null;
  }, [issuingCountryId, countryOptions]);

  useEffect(() => {
    if (initialData?.documentType !== undefined) {
      setDocumentType(initialData.documentType);
    }

    if (initialData?.issuingCountryId !== undefined) {
      setIssuingCountryId(initialData.issuingCountryId);
    }

    if (initialData?.expiryDate !== undefined) {
      setExpiryDate(initialData.expiryDate);
    }

    if (initialData?.isPoliticallyExposed !== undefined) {
      setIsPoliticallyExposed(initialData.isPoliticallyExposed);
    }

    if (initialFiles?.frontDocument !== undefined) {
      setFrontDocument(initialFiles.frontDocument);
    }

    if (initialFiles?.backDocument !== undefined) {
      setBackDocument(initialFiles.backDocument);
    }

    if (initialFiles?.selfie !== undefined) {
      setSelfie(initialFiles.selfie);
    }
  }, [
    initialData?.documentType,
    initialData?.issuingCountryId,
    initialData?.expiryDate,
    initialData?.isPoliticallyExposed,
    initialFiles?.frontDocument,
    initialFiles?.backDocument,
    initialFiles?.selfie,
  ]);

  const identityData = useMemo<IdentityVerificationData>(
    () => ({
      documentType,
      documentNumber: documentNumber.trim(),
      issuingCountryId,
      expiryDate,
      isPoliticallyExposed,

      frontDocumentAssetId:
        frontDocument?.assetId ?? initialData?.frontDocumentAssetId ?? "",

      backDocumentAssetId:
        backDocument?.assetId ?? initialData?.backDocumentAssetId ?? null,

      selfieAssetId: selfie?.assetId ?? initialData?.selfieAssetId ?? null,

      documentNumberLast4: initialData?.documentNumberLast4 ?? null,
    }),
    [
      documentType,
      documentNumber,
      issuingCountryId,
      expiryDate,
      isPoliticallyExposed,

      frontDocument?.assetId,
      backDocument?.assetId,
      selfie?.assetId,

      initialData?.documentNumberLast4,
      initialData?.frontDocumentAssetId,
      initialData?.backDocumentAssetId,
      initialData?.selfieAssetId,
    ],
  );

  const requiresBackDocument =
    documentType !== "" && documentType !== "PASSPORT";

  const validationErrors = useMemo(() => {
    const errors: string[] = [];

    if (!identityData.documentType) {
      errors.push("Document type is required");
    }

    const hasExistingDocumentNumber = Boolean(identityData.documentNumberLast4);

    const hasNewDocumentNumber =
      identityData.documentNumber.trim().length >= 3 &&
      identityData.documentNumber.trim().length <= 100;

    if (!hasExistingDocumentNumber && !hasNewDocumentNumber) {
      errors.push("Document number is required");
    }

    if (!identityData.issuingCountryId) {
      errors.push("Issuing country is required");
    }

    if (!identityData.expiryDate) {
      errors.push("Expiry date is required");
    } else if (!isValidDateString(identityData.expiryDate)) {
      errors.push("Expiry date is invalid");
    } else if (identityData.expiryDate < getToday()) {
      errors.push("Identity document has expired");
    }

    if (identityData.isPoliticallyExposed === null) {
      errors.push("PEP declaration is required");
    }

    if (!identityData.frontDocumentAssetId) {
      errors.push("Front document is required");
    }

    if (requiresBackDocument && !identityData.backDocumentAssetId) {
      errors.push("Back document is required");
    }

    return errors;
  }, [identityData, requiresBackDocument]);

  const isValid = validationErrors.length === 0;

  useEffect(() => {
    onChange?.(identityData);
  }, [identityData, onChange]);

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const handleInputChange = <K extends keyof IdentityVerificationData>(
    field: K,
    fieldValue: IdentityVerificationData[K],
  ) => {
    switch (field) {
      case "documentType":
        setDocumentType(fieldValue as IdentityDocumentType | "");
        break;

      case "documentNumber":
        setDocumentNumber(fieldValue as string);
        break;

      case "issuingCountryId":
        setIssuingCountryId(fieldValue as string);
        break;

      case "expiryDate":
        setExpiryDate(fieldValue as string);
        break;

      case "isPoliticallyExposed":
        setIsPoliticallyExposed(fieldValue as boolean | null);
        break;
    }
  };

  const handleIssuingCountryChange = (country: CountryOption | null) => {
    setIssuingCountryId(country?.id ?? "");
  };

  const handleFileSelect =
    (field: "frontDocument" | "backDocument" | "selfie") =>
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      event.target.value = "";

      if (!file || isLocked) {
        return;
      }

      setFileError(null);

      const acceptedTypes =
        field === "selfie" ? ACCEPTED_SELFIE_TYPES : ACCEPTED_DOCUMENT_TYPES;

      if (!acceptedTypes.includes(file.type)) {
        setFileError(
          field === "selfie"
            ? "Unsupported file format. Please upload a JPG or PNG image."
            : "Unsupported file format. Please upload a JPG, PNG or PDF file.",
        );

        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFileError(
          "The selected file is larger than 10 MB. Please choose a smaller file.",
        );

        return;
      }

      setUploadingField(field);

      try {
        const [uploaded] = await uploadFiles({
          files: file,
          fileNamePrefix: `kyc-${field}`,
          purpose:
            field === "selfie"
              ? ImageAssetPurpose.KYC_SELFIE
              : ImageAssetPurpose.KYC_DOCUMENT,
        });

        const metadata: IdentityFile = {
          file,
          name: uploaded.name,
          size: uploaded.size,
          type: uploaded.mimeType,
          assetId: uploaded.assetId,
          fileId: uploaded.fileId,
          url: uploaded.url,
        };

        console.log("IMAGEKIT UPLOAD RESULT:", uploaded);
        console.log("IMAGEKIT FILE ID:", uploaded.fileId);

        switch (field) {
          case "frontDocument":
            setFrontDocument(metadata);
            break;

          case "backDocument":
            setBackDocument(metadata);
            break;

          case "selfie":
            setSelfie(metadata);
            break;
        }

        onFileChange?.(field, file);
      } catch (error) {
        setFileError(
          error instanceof Error
            ? error.message
            : "Unable to upload the selected file. Please try again.",
        );
      } finally {
        setUploadingField(null);
      }
    };

  const handleRemoveFile = (
    field: "frontDocument" | "backDocument" | "selfie",
  ) => {
    if (isLocked || uploadingField) {
      return;
    }

    setFileError(null);

    switch (field) {
      case "frontDocument":
        setFrontDocument(null);
        break;

      case "backDocument":
        setBackDocument(null);
        break;

      case "selfie":
        setSelfie(null);
        break;
    }

    onRemoveFile?.(field);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Identity verification
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Verify your identity using a valid government-issued identity
              document. Make sure the information you provide matches your
              document exactly.
            </p>
          </div>

          {verificationStatus !== "NOT_STARTED" && (
            <VerificationStatusBadge status={verificationStatus} />
          )}
        </div>
      </div>

      {(isRejected || requiresMoreInformation) && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/[0.04] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

            <div>
              <p className="text-sm font-medium">
                {isRejected
                  ? "Identity verification was not approved"
                  : "Additional information is required"}
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {rejectionReason ||
                  "Please review your identity information and provide the requested documentation."}
              </p>
            </div>
          </div>
        </div>
      )}

      {isVerified && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

            <div>
              <p className="text-sm font-medium">
                Identity verification completed
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Your identity information has been successfully verified.
              </p>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Identity document</CardTitle>

          <p className="text-sm text-muted-foreground">
            Select the document you intend to use for identity verification.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div
            className="grid gap-3 sm:grid-cols-2"
            role="radiogroup"
            aria-label="Identity document type"
          >
            {DOCUMENT_TYPES.map((document) => {
              const selected = documentType === document.value;

              return (
                <button
                  key={document.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() =>
                    handleInputChange("documentType", document.value)
                  }
                  disabled={isLocked}
                  className={[
                    "group w-full rounded-xl border-2 p-4 text-left transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                    selected
                      ? "border-primary bg-primary/[0.06] shadow-sm ring-2 ring-primary/20"
                      : "border-border bg-background hover:border-primary/50 hover:bg-muted/30",
                    isLocked && "cursor-not-allowed opacity-70",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      ].join(" ")}
                    >
                      <FileCheck2 className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={[
                          "text-sm font-semibold",
                          selected ? "text-primary" : "text-foreground",
                        ].join(" ")}
                      >
                        {document.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {document.description}
                      </p>
                    </div>

                    <span
                      className={[
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                        selected
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/40 bg-background",
                      ].join(" ")}
                    >
                      {selected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <Separator />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="documentNumber">
                Document number
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <Input
                id="documentNumber"
                placeholder="Enter document number"
                value={documentNumber}
                onChange={(event) =>
                  handleInputChange("documentNumber", event.target.value)
                }
                disabled={isLocked}
                autoComplete="off"
                maxLength={100}
              />

              {initialData?.documentNumberLast4 && !documentNumber && (
                <p className="text-xs text-muted-foreground">
                  Existing document number ending in{" "}
                  <span className="font-medium">
                    ••••{initialData.documentNumberLast4}
                  </span>
                  . Enter a new number only if you need to replace it.
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Enter the number exactly as shown on the document.
              </p>
            </div>

            <div className="space-y-2">
              <CountrySelect
                label="Issuing country"
                placeholder="Select country of issuance"
                value={issuingCountry}
                onChange={handleIssuingCountryChange}
                required
              />

              <p className="text-xs text-muted-foreground">
                Select the country that issued this identity document.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">
                Expiry date
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <Input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(event) =>
                  handleInputChange("expiryDate", event.target.value)
                }
                disabled={isLocked}
                min={getToday()}
              />

              <p className="text-xs text-muted-foreground">
                The document must remain valid at submission.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-semibold">
              Politically Exposed Person (PEP)
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <button
              type="button"
              onClick={() => setShowPepExplanation((previous) => !previous)}
              className="rounded-full text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Explain politically exposed person"
            >
              <CircleHelp className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Indicate whether you are a politically exposed person or fall within
            another applicable PEP-related category.
          </p>
        </div>

        {showPepExplanation && (
          <Card className="mb-4 border-primary/20 bg-primary/[0.03]">
            <CardContent className="p-4">
              <p className="text-sm font-medium">What does PEP mean?</p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A politically exposed person generally refers to an individual
                who holds or has held a prominent public function, as well as
                certain family members or close associates, depending on the
                applicable legal framework.
              </p>
            </CardContent>
          </Card>
        )}

        <div
          className="grid gap-3 sm:grid-cols-2"
          role="radiogroup"
          aria-label="PEP declaration"
        >
          <DeclarationOption
            selected={isPoliticallyExposed === false}
            title="No"
            description="I am not a politically exposed person."
            disabled={isLocked}
            onClick={() => handleInputChange("isPoliticallyExposed", false)}
          />

          <DeclarationOption
            selected={isPoliticallyExposed === true}
            title="Yes"
            description="I am a politically exposed person or applicable related person."
            disabled={isLocked}
            onClick={() => handleInputChange("isPoliticallyExposed", true)}
          />
        </div>
      </section>

      {fileError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/20 bg-destructive/[0.04] p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

            <p className="text-sm text-destructive">{fileError}</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload your document</CardTitle>

          <p className="text-sm leading-6 text-muted-foreground">
            Upload clear, complete images or a PDF of your identity document.
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <DocumentUpload
            title="Front of document"
            description="Upload the front side of your identity document."
            file={frontDocument}
            required
            disabled={isLocked || uploadingField === "frontDocument"}
            uploading={uploadingField === "frontDocument"}
            accept=".jpg,.jpeg,.png,.pdf"
            onSelect={handleFileSelect("frontDocument")}
            onRemove={() => handleRemoveFile("frontDocument")}
          />

          {requiresBackDocument && (
            <DocumentUpload
              title="Back of document"
              description="Upload the back side of your selected identity document."
              file={backDocument}
              required
              disabled={isLocked || uploadingField === "backDocument"}
              uploading={uploadingField === "backDocument"}
              accept=".jpg,.jpeg,.png,.pdf"
              onSelect={handleFileSelect("backDocument")}
              onRemove={() => handleRemoveFile("backDocument")}
            />
          )}

          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium">
                  Document quality requirements
                </p>

                <ul className="mt-2 space-y-1 text-xs leading-5 text-muted-foreground">
                  <li>• The document must be readable and unobstructed.</li>
                  <li>• Avoid glare, blur and cropped edges.</li>
                  <li>• Do not upload edited or altered documents.</li>
                  <li>• Maximum file size: 10 MB per document.</li>
                  <li>• Accepted formats: JPG, PNG and PDF.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">Identity confirmation</CardTitle>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Additional identity confirmation may be required before your
                verification can be completed.
              </p>
            </div>

            <Badge variant="outline" className="w-fit">
              May be required
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <DocumentUpload
            title="Selfie or verification image"
            description="Provide a clear image if requested as part of your identity verification."
            file={selfie}
            disabled={isLocked || uploadingField === "selfie"}
            uploading={uploadingField === "selfie"}
            accept=".jpg,.jpeg,.png"
            onSelect={handleFileSelect("selfie")}
            onRemove={() => handleRemoveFile("selfie")}
          />

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-border/70 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

            <p className="text-xs leading-5 text-muted-foreground">
              An uploaded selfie is not itself proof of identity. Verification
              must be performed by the backend or an authorized
              identity-verification process.
            </p>
          </div>
        </CardContent>
      </Card>

      {!isValid && !isLocked && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <div>
              <p className="text-sm font-medium">
                Complete the required identity information
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Select a document type, provide the document details, select the
                issuing country, make your PEP declaration and upload the
                required document images before continuing.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">
              Your identity information is protected
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Identity documents should only be uploaded through the secure
              onboarding flow.
            </p>
          </div>
        </div>
      </div>

      {isPending && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <div>
              <p className="text-sm font-medium">
                Verification is under review
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Your submitted identity information is currently being reviewed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface DocumentUploadProps {
  title: string;
  description: string;
  file?: IdentityFile | null;
  required?: boolean;
  disabled?: boolean;
  uploading?: boolean;
  accept: string;
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const DocumentUpload = ({
  title,
  description,
  file,
  required = false,
  disabled = false,
  uploading = false,
  accept,
  onSelect,
  onRemove,
}: DocumentUploadProps) => {
  return (
    <div className="rounded-xl border border-dashed border-border p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            {file ? (
              <FileCheck2 className="h-5 w-5 text-primary" />
            ) : (
              <FileImage className="h-5 w-5" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-medium">{title}</h4>

              {required && (
                <Badge variant="outline" className="text-[10px]">
                  Required
                </Badge>
              )}

              {file && (
                <Badge variant="secondary" className="text-[10px]">
                  {file.assetId ? "Stored" : "Selected"}
                </Badge>
              )}
            </div>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {description}
            </p>

            {file && (
              <div className="mt-2 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                <FileImage className="h-3.5 w-3.5 shrink-0" />

                <span className="truncate">{file.name}</span>

                <span className="shrink-0">({formatFileSize(file.size)})</span>
              </div>
            )}

            {file?.url && file.type !== "application/pdf" && (
              <div className="mt-3 overflow-hidden rounded-lg border">
                <ImageContainer
                  src={file.url}
                  width={180}
                  height={120}
                  alt={title}
                  className="h-24 w-36 object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {file ? (
            <>
              <label
                className={[
                  "inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-xs font-medium transition",
                  "hover:bg-muted",
                  disabled &&
                    "pointer-events-none cursor-not-allowed opacity-50",
                ].join(" ")}
              >
                {uploading ? "Uploading..." : "Replace"}

                <input
                  type="file"
                  className="sr-only"
                  accept={accept}
                  onChange={onSelect}
                  disabled={disabled}
                />
              </label>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                disabled={disabled}
                aria-label={`Remove ${title}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <label
              className={[
                "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition hover:bg-primary/90",
                disabled && "pointer-events-none cursor-not-allowed opacity-50",
              ].join(" ")}
            >
              <Upload className="h-3.5 w-3.5" />

              {uploading ? "Uploading..." : "Upload"}

              <input
                type="file"
                className="sr-only"
                accept={accept}
                onChange={onSelect}
                disabled={disabled}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

const VerificationStatusBadge = ({ status }: { status: KycStatus }) => {
  switch (status) {
    case "APPROVED":
      return (
        <Badge className="w-fit bg-emerald-600 hover:bg-emerald-600">
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
          Verified
        </Badge>
      );

    case "PENDING":
      return (
        <Badge variant="secondary" className="w-fit">
          <Info className="mr-1.5 h-3.5 w-3.5" />
          Under review
        </Badge>
      );

    case "REJECTED":
      return (
        <Badge variant="destructive" className="w-fit">
          <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
          Verification failed
        </Badge>
      );

    case "MORE_INFORMATION":
      return (
        <Badge
          variant="outline"
          className="w-fit border-amber-500/30 text-amber-600"
        >
          <Info className="mr-1.5 h-3.5 w-3.5" />
          Action required
        </Badge>
      );

    default:
      return null;
  }
};

interface DeclarationOptionProps {
  selected: boolean;
  title: string;
  description: string;
  disabled?: boolean;
  onClick: () => void;
}

const DeclarationOption = ({
  selected,
  title,
  description,
  disabled = false,
  onClick,
}: DeclarationOptionProps) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      onClick={onClick}
      disabled={disabled}
      className={[
        "rounded-xl border p-4 text-left transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        selected
          ? "border-primary bg-primary/[0.04] ring-1 ring-primary"
          : "hover:border-primary/40 hover:bg-muted/30",
        disabled &&
          "cursor-not-allowed opacity-70 hover:border-border hover:bg-background",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
            selected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground/30",
          ].join(" ")}
        >
          {selected && <Check className="h-3 w-3" />}
        </div>

        <div>
          <p className="text-sm font-medium">{title}</p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default IdentityVerificationStep;
