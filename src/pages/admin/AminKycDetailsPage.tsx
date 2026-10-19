import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Copy,
  ExternalLink,
  FileCheck2,
  FileImage,
  Info,
  Loader2,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { makeRequest } from "@/utils/makeRequest";
import { formatDate, formatDateTime, formatDocumentType } from "@/utils";

import {
  AdminKycAsset,
  AdminKycReview,
  KycUser,
  KycDocumentAssetType,
  KycStatus,
  ReviewAction,
} from "@/types/kyc";
import { useAdminKyc } from "@/services/kyc";
import { queryClient } from "@/services/queryClient";
import Loader from "@/components/loader/Loader";
import { ErrorState } from "@/components/ErrorState";

const AdminKycDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: kyc, isLoading, isError, refetch } = useAdminKyc(id);

  console.log("ADMIN KYC", kyc);

  const [reviewAction, setReviewAction] = useState<ReviewAction | null>(null);

  const [reviewNote, setReviewNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const executeReviewAction = async () => {
    if (!kyc || !reviewAction) {
      return;
    }

    if (
      (reviewAction === ReviewAction.REJECT ||
        reviewAction === ReviewAction.MORE_INFORMATION) &&
      !reviewNote.trim()
    ) {
      toast.error(
        reviewAction === ReviewAction.REJECT
          ? "A rejection reason is required."
          : "Please specify the information required.",
      );

      return;
    }

    setActionLoading(true);

    try {
      const endpoint =
        reviewAction === ReviewAction.APPROVE
          ? `/kyc/admin/${kyc.id}/approve`
          : reviewAction === ReviewAction.REJECT
            ? `/kyc/admin/${kyc.id}/reject`
            : `/kyc/admin/${kyc.id}/request-more-information`;

      const payload =
        reviewAction === ReviewAction.APPROVE
          ? {
              note: reviewNote.trim() || undefined,
            }
          : reviewAction === ReviewAction.REJECT
            ? {
                rejectionReason: reviewNote.trim(),
                note: reviewNote.trim(),
              }
            : {
                informationRequest: reviewNote.trim(),
                note: reviewNote.trim(),
              };

      await makeRequest.put(endpoint, payload);

      toast.success(
        reviewAction === ReviewAction.APPROVE
          ? "KYC approved successfully."
          : reviewAction === ReviewAction.REJECT
            ? "KYC rejected successfully."
            : "Additional information requested successfully.",
      );

      setReviewAction(null);
      setReviewNote("");

      //   await refetch();
      queryClient.invalidateQueries({ queryKey: ["admin-kyc", id] });
    } catch (error) {
      console.error("KYC review action failed:", error);

      toast.error("Unable to complete the KYC review action.");
    } finally {
      setActionLoading(false);
    }
  };

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

  if (!kyc) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-xl items-center justify-center p-6">
        <Card className="w-full">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <FileCheck2 className="h-6 w-6 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">KYC record not found</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              The requested KYC submission could not be loaded.
            </p>

            <Button className="mt-5" onClick={() => navigate("/admin/kyc")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to KYC
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const canApprove = kyc.status === KycStatus.PENDING;

  const canReject =
    kyc.status === KycStatus.PENDING ||
    kyc.status === KycStatus.MORE_INFORMATION;

  const canRequestInformation = kyc.status === KycStatus.PENDING;

  return (
    <div className="w-full space-y-6 p-4 pb-24 sm:p-6 sm:pb-6 lg:p-8 mt-20">
      {/* Page header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => navigate("/admin-dashboard/kyc")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="max-w-full break-words text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                {getUserName(kyc.user)}
              </h1>

              <KycStatusBadge status={kyc.status} />
            </div>

            <p className="mt-1 break-all text-sm text-muted-foreground">
              {kyc.user.email}
            </p>

            {kyc.submittedAt && (
              <p className="mt-1 text-xs text-muted-foreground">
                Submitted {formatDateTime(kyc.submittedAt)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          {/* Applicant information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <UserRound className="h-4 w-4 text-primary" />
                Applicant information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <InfoGrid>
                <InfoRow label="Full name" value={getUserName(kyc.user)} />

                <InfoRow label="Email" value={kyc.user.email} copyable />

                <InfoRow label="Phone" value={kyc.user.phone} copyable />

                <InfoRow
                  label="Date of birth"
                  value={formatDate(kyc.dateOfBirth)}
                />

                <InfoRow
                  label="Country of origin"
                  value={kyc.user.nationality?.name}
                />

                <InfoRow
                  label="Country of residence"
                  value={kyc.user.country?.name}
                />

                <InfoRow
                  label="Residential address"
                  value={kyc.residentialAddress}
                />

                <InfoRow label="City" value={kyc.city} />

                <InfoRow label="State" value={kyc.state} />

                <InfoRow
                  label="Politically exposed"
                  value={kyc.isPoliticallyExposed ? "Yes" : "No"}
                />
              </InfoGrid>
            </CardContent>
          </Card>

          {/* Identity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Identity verification
              </CardTitle>
            </CardHeader>

            <CardContent>
              <InfoGrid>
                <InfoRow
                  label="Document type"
                  value={formatDocumentType(kyc.documentType)}
                />

                <InfoRow
                  label="Document number"
                  value={
                    kyc.documentNumberLast4
                      ? `•••• ${kyc.documentNumberLast4}`
                      : null
                  }
                />

                <InfoRow
                  label="Issuing country"
                  value={kyc.issuingCountry?.name}
                />

                <InfoRow
                  label="Expiry date"
                  value={formatDate(kyc.expiryDate)}
                />

                <InfoRow label="Document status" value={kyc.status} />

                <InfoRow
                  label="Submitted"
                  value={formatDateTime(kyc.submittedAt)}
                />
              </InfoGrid>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileImage className="h-4 w-4 text-primary" />
                Submitted documents
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                Review the original identity documents and selfie before making
                a compliance decision.
              </p>
            </CardHeader>

            <CardContent>
              <DocumentGrid documents={kyc.documents} />
            </CardContent>
          </Card>

          {/* Existing messages */}
          {(kyc.rejectionReason ||
            kyc.informationRequest ||
            kyc.reviewNote) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Previous review notes
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {kyc.rejectionReason && (
                  <ReviewMessage
                    title="Rejection reason"
                    value={kyc.rejectionReason}
                    destructive
                  />
                )}

                {kyc.informationRequest && (
                  <ReviewMessage
                    title="Information requested"
                    value={kyc.informationRequest}
                  />
                )}

                {kyc.reviewNote && (
                  <ReviewMessage title="Reviewer note" value={kyc.reviewNote} />
                )}
              </CardContent>
            </Card>
          )}

          {/* Review history */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock3 className="h-4 w-4 text-primary" />
                Review history
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ReviewHistory reviews={kyc.reviews} />
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Review decision */}
          <Card className="hidden xl:sticky xl:top-6 md:block">
            <CardHeader>
              <CardTitle className="text-base">Review decision</CardTitle>

              <p className="text-sm text-muted-foreground">
                Carefully verify all submitted information before taking action.
              </p>
            </CardHeader>

            <CardContent className="space-y-3">
              {canRequestInformation && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  disabled={actionLoading}
                  onClick={() => {
                    setReviewNote("");
                    setReviewAction("MORE_INFORMATION");
                  }}
                >
                  <Info className="mr-2 h-4 w-4" />
                  Request more information
                </Button>
              )}

              {canReject && (
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  disabled={actionLoading}
                  onClick={() => {
                    setReviewNote("");
                    setReviewAction("REJECT");
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject submission
                </Button>
              )}

              {canApprove && (
                <Button
                  className="w-full justify-start"
                  disabled={actionLoading}
                  onClick={() => {
                    setReviewNote("");
                    setReviewAction("APPROVE");
                  }}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve KYC
                </Button>
              )}

              {!canApprove && !canReject && !canRequestInformation && (
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm font-medium">No actions available</p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    This KYC record is currently{" "}
                    {formatStatus(kyc.status).toLowerCase()}.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Submission timeline</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <TimelineRow label="Created" value={kyc.createdAt} />

              <TimelineRow label="Submitted" value={kyc.submittedAt} />

              <TimelineRow label="Reviewed" value={kyc.reviewedAt} />

              <TimelineRow label="Approved" value={kyc.approvedAt} />

              <TimelineRow label="Rejected" value={kyc.rejectedAt} />

              <TimelineRow
                label="Information requested"
                value={kyc.moreInformationRequestedAt}
              />
            </CardContent>
          </Card>

          {/* Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Compliance summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <ComplianceRow
                label="Identity document"
                value={kyc.documentType ? "Provided" : "Missing"}
                positive={Boolean(kyc.documentType)}
              />

              <ComplianceRow
                label="Document number"
                value={kyc.documentNumberLast4 ? "Provided" : "Missing"}
                positive={Boolean(kyc.documentNumberLast4)}
              />

              <ComplianceRow
                label="Document expiry"
                value={kyc.expiryDate ? formatDate(kyc.expiryDate) : "Missing"}
                positive={Boolean(kyc.expiryDate)}
              />

              <ComplianceRow
                label="Selfie"
                value={
                  hasDocument(kyc.documents, KycDocumentAssetType.SELFIE)
                    ? "Provided"
                    : "Missing"
                }
                positive={hasDocument(
                  kyc.documents,
                  KycDocumentAssetType.SELFIE,
                )}
              />

              <ComplianceRow
                label="PEP"
                value={kyc.isPoliticallyExposed ? "Yes" : "No"}
                positive={!kyc.isPoliticallyExposed}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile review actions */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-3 shadow-lg backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-3 gap-2">
          {canRequestInformation && (
            <Button
              variant="outline"
              className="h-11 min-w-0 px-2 text-xs"
              disabled={actionLoading}
              onClick={() => {
                setReviewNote("");
                setReviewAction("MORE_INFORMATION");
              }}
            >
              <Info className="mr-1.5 h-4 w-4 shrink-0" />
              <span className="truncate">Request info</span>
            </Button>
          )}

          {canReject && (
            <Button
              variant="destructive"
              className="h-11 min-w-0 px-2 text-xs"
              disabled={actionLoading}
              onClick={() => {
                setReviewNote("");
                setReviewAction("REJECT");
              }}
            >
              <XCircle className="mr-1.5 h-4 w-4 shrink-0" />
              <span className="truncate">Reject</span>
            </Button>
          )}

          {canApprove && (
            <Button
              className="h-11 min-w-0 px-2 text-xs"
              disabled={actionLoading}
              onClick={() => {
                setReviewNote("");
                setReviewAction("APPROVE");
              }}
            >
              <CheckCircle2 className="mr-1.5 h-4 w-4 shrink-0" />
              <span className="truncate">Approve</span>
            </Button>
          )}
        </div>
      </div>

      {/* Review confirmation */}
      <Dialog
        open={Boolean(reviewAction)}
        onOpenChange={(open) => {
          if (!open && !actionLoading) {
            setReviewAction(null);
            setReviewNote("");
          }
        }}
      >
        <DialogContent className="max-h-[90vh] w-[calc(100%-1rem)] overflow-y-auto sm:w-[calc(100%-2rem)] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === ReviewAction.APPROVE
                ? "Approve KYC"
                : reviewAction === ReviewAction.REJECT
                  ? "Reject KYC"
                  : "Request more information"}
            </DialogTitle>

            <DialogDescription>
              {reviewAction === ReviewAction.APPROVE
                ? "Confirm that you have reviewed the applicant information, identity document, expiry date, and supporting files."
                : reviewAction === ReviewAction.REJECT
                  ? "Provide a clear reason for rejecting this KYC submission."
                  : "Specify exactly what additional information or documentation the applicant must provide."}
            </DialogDescription>
          </DialogHeader>

          {reviewAction !== ReviewAction.APPROVE && (
            <div className="space-y-2">
              <Label>
                {reviewAction === ReviewAction.REJECT
                  ? "Rejection reason"
                  : "Information required"}
              </Label>

              <Textarea
                value={reviewNote}
                onChange={(event) => setReviewNote(event.target.value)}
                placeholder={
                  reviewAction === ReviewAction.REJECT
                    ? "Explain why the KYC submission cannot be approved..."
                    : "Explain what the applicant needs to provide or correct..."
                }
                rows={5}
              />
            </div>
          )}

          {reviewAction === ReviewAction.APPROVE && (
            <>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <p className="text-sm leading-6 text-muted-foreground">
                    Approving this submission will mark the applicant&apos;s KYC
                    as verified. Make sure the identity document, applicant
                    information, expiry date, and supporting files have been
                    reviewed.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Reviewer note
                  <span className="ml-1 font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>

                <Textarea
                  value={reviewNote}
                  onChange={(event) => setReviewNote(event.target.value)}
                  placeholder="Add an optional review note..."
                  rows={4}
                />
              </div>
            </>
          )}

          <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              disabled={actionLoading}
              onClick={() => {
                setReviewAction(null);
                setReviewNote("");
              }}
            >
              Cancel
            </Button>

            <Button
              variant={
                reviewAction === ReviewAction.REJECT ? "destructive" : "default"
              }
              className="w-full sm:w-auto"
              disabled={actionLoading}
              onClick={executeReviewAction}
            >
              {actionLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}

              {reviewAction === ReviewAction.APPROVE
                ? "Approve KYC"
                : reviewAction === ReviewAction.REJECT
                  ? "Reject KYC"
                  : "Request information"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminKycDetailsPage;

const DocumentGrid = ({ documents }: { documents: AdminKycAsset[] }) => {
  const documentTypes = [
    {
      type: KycDocumentAssetType.FRONT_DOCUMENT,
      title: "Front document",
    },
    {
      type: KycDocumentAssetType.BACK_DOCUMENT,
      title: "Back document",
    },
    {
      type: KycDocumentAssetType.SELFIE,
      title: "Selfie",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {documentTypes.map((item) => {
        const document = documents.find((value) => value.type === item.type);

        if (!document) {
          return (
            <div
              key={item.type}
              className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/10 text-center"
            >
              <FileImage className="h-8 w-8 text-muted-foreground/50" />

              <p className="mt-3 text-sm font-medium">{item.title}</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Not submitted
              </p>
            </div>
          );
        }

        const isImage = document.asset.mimeType.startsWith("image/");

        return (
          <div
            key={item.type}
            className="overflow-hidden rounded-xl border bg-card"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              {isImage ? (
                <a
                  href={document.asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-full w-full"
                >
                  <img
                    src={document.asset.url}
                    alt={item.title}
                    className="h-full w-full object-contain transition-transform duration-200 hover:scale-[1.02]"
                  />
                </a>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <FileCheck2 className="h-10 w-10 text-muted-foreground" />

                  <p className="mt-2 px-4 text-center text-xs text-muted-foreground">
                    PDF document
                  </p>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{item.title}</p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {document.asset.fileName}
                  </p>
                </div>

                <a
                  href={document.asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  title="Open document"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {document.asset.status && (
                <div className="mt-3">
                  <Badge variant="secondary" className="text-[11px]">
                    {document.asset.status}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ReviewHistory = ({ reviews }: { reviews: AdminKycReview[] }) => {
  if (!reviews.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center">
        <Clock3 className="mx-auto h-6 w-6 text-muted-foreground/50" />

        <p className="mt-2 text-sm text-muted-foreground">
          No review history available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {reviews.map((review) => {
        const reviewerName = review.reviewer
          ? [review.reviewer.firstName, review.reviewer.lastName]
              .filter(Boolean)
              .join(" ")
              .trim() || review.reviewer.email
          : "Applicant";

        return (
          <div
            key={review.id}
            className="relative border-l-2 border-muted pl-5"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold">
                {formatReviewAction(review.action)}
              </p>

              <p className="text-xs text-muted-foreground">
                {formatDateTime(review.createdAt)}
              </p>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">{reviewerName}</p>

            <p className="mt-1 text-xs text-muted-foreground">
              {formatStatus(review.fromStatus)} →{" "}
              {formatStatus(review.toStatus)}
            </p>

            {review.note && (
              <div className="mt-3 rounded-lg bg-muted/40 p-3 text-sm leading-6 text-muted-foreground">
                {review.note}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const InfoGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{children}</div>;
};

const InfoRow = ({
  label,
  value,
  copyable = false,
}: {
  label: string;
  value?: string | null;
  copyable?: boolean;
}) => {
  const copy = async () => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Unable to copy.");
    }
  };

  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <div className="mt-1 flex items-start gap-2">
        <p className="min-w-0 break-words text-sm">{value || "Not provided"}</p>

        {copyable && value && (
          <button
            type="button"
            onClick={copy}
            className="shrink-0 rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            title="Copy"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

const ReviewMessage = ({
  title,
  value,
  destructive = false,
}: {
  title: string;
  value: string;
  destructive?: boolean;
}) => {
  return (
    <div
      className={[
        "rounded-lg border p-4",
        destructive
          ? "border-destructive/20 bg-destructive/[0.04]"
          : "border-amber-500/20 bg-amber-500/[0.04]",
      ].join(" ")}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </p>

      <p className="mt-1 text-sm leading-6">{value}</p>
    </div>
  );
};

const TimelineRow = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="text-right text-sm font-medium">
        {value ? formatDateTime(value) : "—"}
      </p>
    </div>
  );
};

const ComplianceRow = ({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive: boolean;
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">{label}</p>

      <Badge
        variant={positive ? "secondary" : "destructive"}
        className={
          positive
            ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10"
            : ""
        }
      >
        {value}
      </Badge>
    </div>
  );
};

const getUserName = (user: KycUser) => {
  return (
    [user.firstName, user.middleName, user.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() || "Unnamed applicant"
  );
};

const hasDocument = (
  documents: AdminKycAsset[],
  type: KycDocumentAssetType,
) => {
  return documents.some((document) => document.type === type);
};

const formatReviewAction = (action: string) => {
  switch (action) {
    case "SUBMITTED":
      return "KYC submitted";

    case "RESUBMITTED":
      return "KYC resubmitted";

    case "APPROVED":
      return "KYC approved";

    case "REJECTED":
      return "KYC rejected";

    case "MORE_INFORMATION_REQUESTED":
      return "More information requested";

    default:
      return action.replace(/_/g, " ");
  }
};

const formatStatus = (status: KycStatus) => {
  switch (status) {
    case KycStatus.APPROVED:
      return "Approved";

    case KycStatus.PENDING:
      return "Pending";

    case KycStatus.REJECTED:
      return "Rejected";

    case KycStatus.MORE_INFORMATION:
      return "More information";

    case KycStatus.NOT_STARTED:
      return "Not started";

    default:
      return status;
  }
};

const KycStatusBadge = ({ status }: { status: KycStatus }) => {
  switch (status) {
    case KycStatus.APPROVED:
      return (
        <Badge className="w-fit bg-emerald-600 px-2.5 py-1 hover:bg-emerald-600">
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
          Approved
        </Badge>
      );

    case KycStatus.PENDING:
      return (
        <Badge
          variant="secondary"
          className="w-fit border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-amber-700"
        >
          <Clock3 className="mr-1.5 h-3.5 w-3.5" />
          Pending
        </Badge>
      );

    case KycStatus.REJECTED:
      return (
        <Badge variant="destructive" className="w-fit px-2.5 py-1">
          <XCircle className="mr-1.5 h-3.5 w-3.5" />
          Rejected
        </Badge>
      );

    case KycStatus.MORE_INFORMATION:
      return (
        <Badge
          variant="secondary"
          className="w-fit border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-amber-700"
        >
          <Info className="mr-1.5 h-3.5 w-3.5" />
          Action required
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary" className="w-fit px-2.5 py-1">
          <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
          Not started
        </Badge>
      );
  }
};
