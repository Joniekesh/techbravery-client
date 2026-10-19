import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import {
  CheckCircle2,
  FileCheck2,
  FileImage,
  FileText,
  Info,
  LockKeyhole,
  Trash2,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { uploadFiles } from "@/image/upload";
import { ImageAssetPurpose } from "@/types/image-asset";
import type {
  ClassificationForm,
  DocumentType,
  InvestorDocument,
} from "@/types/investor";
import ImageContainer from "@/image/ImageContainer";
import { queryClient } from "@/services/queryClient";
import { useAppSelector } from "@/redux/hooks";

type ClassificationData = Partial<
  Pick<ClassificationForm, "investmentType" | "individualInvestmentType">
>;

interface DocumentsStepProps {
  value?: InvestorDocument[];
  onChange: (documents: InvestorDocument[]) => void;
  classification?: ClassificationData;
  registerValidator?: (validator: () => boolean) => void;
}

const DOCUMENT_TYPES: Array<{
  value: DocumentType;
  label: string;
  description: string;
}> = [
  {
    value: "PROOF_OF_ADDRESS",
    label: "Proof of address",
    description: "Utility bill, government letter, or similar document.",
  },
  {
    value: "SOURCE_OF_FUNDS",
    label: "Proof of funds",
    description: "Evidence showing the source or availability of funds.",
  },
  {
    value: "TAX_DOCUMENT",
    label: "Tax document",
    description: "Relevant tax certificate or tax registration document.",
  },
  {
    value: "BANK_STATEMENT",
    label: "Bank statement",
    description: "Recent statement from your financial institution.",
  },
  {
    value: "CORPORATE_REGISTRATION",
    label: "Corporate document",
    description: "Company registration or other applicable documentation.",
  },
  {
    value: "OTHER",
    label: "Other document",
    description: "Any other document requested for your investment.",
  },
];

const getRequiredDocumentTypes = (
  classification?: ClassificationData,
): DocumentType[] => {
  switch (classification?.investmentType) {
    case "INDIVIDUAL": {
      switch (classification.individualInvestmentType) {
        case "MYSELF":
          return ["PROOF_OF_ADDRESS"];

        case "SOMEONE_ELSE":
        case "JOINT_INVESTMENT":
          return ["PROOF_OF_ADDRESS", "SOURCE_OF_FUNDS"];

        default:
          return [];
      }
    }

    case "CORPORATE":
    case "INSTITUTION":
      return [
        "PROOF_OF_ADDRESS",
        "SOURCE_OF_FUNDS",
        "TAX_DOCUMENT",
        "CORPORATE_REGISTRATION",
      ];

    default:
      return [];
  }
};

const ACCEPTED_FILE_TYPES = ".pdf,.jpg,.jpeg,.png";
const ACCEPTED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const DocumentsStep = ({
  value = [],
  onChange,
  classification,
  registerValidator,
}: DocumentsStepProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? "";

  const [documents, setDocuments] = useState<InvestorDocument[]>(
    Array.isArray(value) ? value : [],
  );
  const [selectedType, setSelectedType] =
    useState<DocumentType>("PROOF_OF_ADDRESS");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const requiredDocumentTypes = useMemo(
    () => getRequiredDocumentTypes(classification),
    [classification?.investmentType, classification?.individualInvestmentType],
  );

  const requiredDocuments = useMemo(
    () =>
      requiredDocumentTypes
        .map((type) => DOCUMENT_TYPES.find((item) => item.value === type))
        .filter(
          (item): item is (typeof DOCUMENT_TYPES)[number] => item !== undefined,
        ),
    [requiredDocumentTypes],
  );

  useEffect(() => {
    setDocuments(Array.isArray(value) ? value : []);
  }, [value]);

  useEffect(() => {
    if (
      requiredDocumentTypes.length > 0 &&
      !requiredDocumentTypes.includes(selectedType)
    ) {
      setSelectedType(requiredDocumentTypes[0]);
    }
  }, [requiredDocumentTypes, selectedType]);

  const isUploaded = useCallback(
    (type: DocumentType, list: InvestorDocument[]) =>
      list.some(
        (document) =>
          document.type === type &&
          Boolean(document.assetId) &&
          document.status === "UPLOADED",
      ),
    [],
  );

  const validateStep = useCallback((): boolean => {
    if (!classification?.investmentType) {
      const message = "Please complete your investor classification first.";
      setError(message);
      toast.error(message);
      return false;
    }

    if (
      classification.investmentType === "INDIVIDUAL" &&
      !classification.individualInvestmentType
    ) {
      const message =
        "Please select your individual investment purpose in the classification step.";
      setError(message);
      toast.error(message);
      return false;
    }

    if (requiredDocumentTypes.length === 0) {
      const message =
        "No document requirements could be determined. Please check your investor classification and investment purpose.";
      setError(message);
      toast.error(message);
      return false;
    }

    // Prefer the latest parent-provided data when available.
    const currentDocuments = Array.isArray(value) ? value : documents;

    const missing = requiredDocumentTypes.filter(
      (type) => !isUploaded(type, currentDocuments),
    );

    if (missing.length > 0) {
      const labels = missing.map(
        (type) =>
          DOCUMENT_TYPES.find((item) => item.value === type)?.label ?? type,
      );

      const message = `Please upload all required documents: ${labels.join(", ")}.`;

      setError(message);
      toast.error(message);
      return false;
    }

    setError("");
    return true;
  }, [classification, requiredDocumentTypes, value, documents, isUploaded]);

  useEffect(() => {
    registerValidator?.(validateStep);
  }, [registerValidator, validateStep]);

  const updateDocuments = (
    updater: (current: InvestorDocument[]) => InvestorDocument[],
  ) => {
    setDocuments((current) => {
      const next = updater(current);
      onChange(next);
      return next;
    });
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setError("");

    if (!classification?.investmentType) {
      toast.error("Complete your investor classification first.");
      return;
    }

    if (
      classification.investmentType === "INDIVIDUAL" &&
      !classification.individualInvestmentType
    ) {
      toast.error("Select your individual investment purpose first.");
      return;
    }

    if (!requiredDocumentTypes.includes(selectedType)) {
      toast.error("This document is not required for your classification.");
      return;
    }

    if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
      const message = "Unsupported format. Upload a PDF, JPG, or PNG.";
      setError(message);
      toast.error(message);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      const message = "The selected file exceeds the 10 MB limit.";
      setError(message);
      toast.error(message);
      return;
    }

    setUploading(true);

    try {
      const [uploaded] = await uploadFiles({
        files: file,
        fileNamePrefix: `investment-document-${selectedType.toLowerCase()}`,
        purpose: ImageAssetPurpose.INVESTMENT_DOCUMENT,
      });

      if (!uploaded?.assetId) {
        throw new Error("The upload did not return a valid asset ID.");
      }

      // Prevent uploading the same asset/type combination twice.
      const duplicate = documents.some(
        (item) =>
          item.assetId === uploaded.assetId ||
          (item.name === uploaded.name &&
            item.size === uploaded.size &&
            item.type === selectedType),
      );

      if (duplicate) {
        throw new Error("This document has already been uploaded.");
      }

      const newDocument: InvestorDocument = {
        id: `document-${uploaded.assetId}`,
        assetId: uploaded.assetId,
        type: selectedType,
        name: uploaded.name,
        size: uploaded.size,
        mimeType: uploaded.mimeType,
        status: "UPLOADED",
        url: uploaded.url,
      };

      updateDocuments((current) => [...current, newDocument]);

      void queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });

      toast.success(`${getDocumentLabel(selectedType)} uploaded successfully.`);
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload the document.";

      setError(message);
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = (id: string) => {
    setError("");

    updateDocuments((current) =>
      current.filter((document) => document.id !== id),
    );

    toast.success("Document removed.");
  };

  function getDocumentLabel(type: DocumentType) {
    return (
      DOCUMENT_TYPES.find((item) => item.value === type)?.label ?? "Document"
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileCheck2 className="h-5 w-5" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Supporting documents
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Upload the documents required for your investor classification.
        </p>
      </div>

      <Card>
        <div className="space-y-3 p-5">
          <h3 className="font-semibold">
            Required documents for your classification
          </h3>

          {!classification?.investmentType ? (
            <p className="text-sm text-muted-foreground">
              Complete your investor classification to see your requirements.
            </p>
          ) : classification.investmentType === "INDIVIDUAL" &&
            !classification.individualInvestmentType ? (
            <p className="text-sm text-muted-foreground">
              Select your individual investment purpose to determine your
              document requirements.
            </p>
          ) : (
            <div className="space-y-2">
              {requiredDocuments.map(({ value: type, label }) => {
                const uploaded = isUploaded(type, documents);

                return (
                  <div
                    key={type}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm">{label}</span>
                    <Badge variant={uploaded ? "secondary" : "outline"}>
                      {uploaded ? "Uploaded" : "Required"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="documentType">Document type</Label>

            <select
              id="documentType"
              value={selectedType}
              onChange={(event) =>
                setSelectedType(event.target.value as DocumentType)
              }
              disabled={uploading || requiredDocuments.length === 0}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {requiredDocuments.map((document) => (
                <option key={document.value} value={document.value}>
                  {document.label}
                </option>
              ))}
            </select>

            <p className="text-xs text-muted-foreground">
              {requiredDocuments.find((item) => item.value === selectedType)
                ?.description ??
                "Select a classification to view requirements."}
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/20 bg-destructive/[0.04] p-4"
            >
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </div>
          )}

          <label
            className={[
              "flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition",
              "hover:border-primary/50 hover:bg-muted/30",
              uploading || requiredDocuments.length === 0
                ? "pointer-events-none cursor-not-allowed opacity-60"
                : "cursor-pointer",
            ].join(" ")}
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Upload className="h-5 w-5" />
            </div>

            <p className="text-sm font-medium">
              {uploading ? "Uploading document..." : "Upload document"}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              PDF, JPG or PNG · Maximum 10 MB
            </p>

            <input
              type="file"
              className="sr-only"
              accept={ACCEPTED_FILE_TYPES}
              onChange={handleFileSelect}
              disabled={uploading || requiredDocuments.length === 0}
            />
          </label>
        </div>
      </Card>

      {documents.length > 0 && (
        <Card>
          <div className="p-6">
            <h3 className="text-base font-semibold">Uploaded documents</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {documents.length} document{documents.length === 1 ? "" : "s"}{" "}
              uploaded.
            </p>

            <div className="mt-5 space-y-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      {document.mimeType === "application/pdf" ? (
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <FileImage className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="break-all text-sm font-medium">
                          {document.name}
                        </p>

                        <Badge variant="secondary" className="text-[10px]">
                          {getDocumentLabel(document.type)}
                        </Badge>

                        {document.assetId && (
                          <Badge variant="outline" className="text-[10px]">
                            Stored
                          </Badge>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatFileSize(document.size)}
                      </p>

                      {document.url &&
                        document.mimeType !== "application/pdf" && (
                          <div className="mt-3 overflow-hidden rounded-lg border">
                            <ImageContainer
                              src={document.url}
                              width={180}
                              height={120}
                              alt={document.name}
                              className="h-24 w-36 object-cover"
                            />
                          </div>
                        )}
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDocument(document.id)}
                    disabled={uploading}
                    aria-label={`Remove ${document.name}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">Your documents are protected</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Documents are associated with your investment application.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-muted/50 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">Document requirements</p>
            <ul className="mt-2 space-y-1 text-xs leading-5 text-muted-foreground">
              <li>• Maximum file size: 10 MB.</li>
              <li>• Accepted formats: PDF, JPG and PNG.</li>
              <li>• Documents must be clear and readable.</li>
              <li>
                • Every required document must be uploaded before continuing.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export default DocumentsStep;
