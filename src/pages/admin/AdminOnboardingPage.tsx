import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  Loader2,
  Search,
  ShieldCheck,
  Users,
  XCircle,
  RefreshCw,
  ArrowUpDown,
  ClipboardCheck,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { formatDate, formatDateTime } from "@/utils";
// import { useAdminOnboardings } from "@/services/investor-onboarding";

import Loader from "@/components/loader/Loader";
import { ErrorState } from "@/components/ErrorState";
import { useAdminOnboardings } from "@/services/onboarding";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type OnboardingStatus =
  | "DRAFT"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "MORE_INFORMATION_REQUIRED"
  | "APPROVED"
  | "REJECTED";

type OnboardingUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
};

type OnboardingDocument = {
  id: string;
  documentType: string;
  status: string;
};

type InvestorOnboardingRecord = {
  id: string;
  reference: string;
  status: OnboardingStatus;
  currentStep: string;
  completedSteps: string[];
  submittedAt: string | null;
  updatedAt: string;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  moreInfoRequested?: boolean;
  moreInfoRequestedAt?: string | null;
  user: OnboardingUser;
  documents: OnboardingDocument[];
  investmentInterest?: {
    id: string;
    application?: {
      title?: string;
      name?: string;
    } | null;
    investorProfile?: {
      id: string;
    } | null;
  } | null;
};

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const PAGE_SIZE = 10;

const REQUIRED_STEPS = [
  "classification",
  "tax",
  "documents",
  "agreements",
] as const;

const STATUS_OPTIONS: {
  value: OnboardingStatus | "ALL";
  label: string;
}[] = [
  { value: "ALL", label: "All statuses" },
  { value: "SUBMITTED", label: "Awaiting review" },
  { value: "MORE_INFORMATION_REQUIRED", label: "More information" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "DRAFT", label: "Draft" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */

const AdminOnboardingPage = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<OnboardingStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // This hook should call GET /investor-onboarding/admin/list/all.
  const { data, isLoading, isError, isFetching, refetch } = useAdminOnboardings(
    status === "ALL" ? undefined : status,
  );

  console.log("ONBOARDINGS", data);

  // The NestJS list endpoint returns an array.
  const onboardings: InvestorOnboardingRecord[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = onboardings.filter((item) => {
      if (status !== "ALL" && item.status !== status) {
        return false;
      }

      if (!term) return true;

      const applicantName = getUserName(item.user);
      const investmentName = getInvestmentName(item);

      return [
        item.reference,
        applicantName,
        item.user.email,
        investmentName,
      ].some((value) => value.toLowerCase().includes(term));
    });

    return result.sort((a, b) => {
      const aDate = new Date(a.submittedAt ?? a.updatedAt).getTime();
      const bDate = new Date(b.submittedAt ?? b.updatedAt).getTime();

      return sortOrder === "newest" ? bDate - aDate : aDate - bDate;
    });
  }, [onboardings, search, status, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  const currentPage = Math.min(page, totalPages);

  const items = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // These metrics describe the complete list returned by the API,
  // rather than only the visible page.
  const metrics = useMemo(
    () => ({
      total: onboardings.length,
      pending: onboardings.filter((item) => item.status === "SUBMITTED").length,
      attention: onboardings.filter(
        (item) => item.status === "MORE_INFORMATION_REQUIRED",
      ).length,
      approved: onboardings.filter((item) => item.status === "APPROVED").length,
    }),
    [onboardings],
  );

  const openOnboarding = (id: string) => {
    navigate(`/admin-dashboard/onboardings/${id}`);
  };

  if (isLoading) {
    return <Loader type="bounce" />;
  }

  if (isError) {
    return (
      <ErrorState
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardCheck className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Investor Onboarding
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Review investor applications, verify compliance information, inspect
            supporting documents, and manage onboarding decisions.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="w-full sm:w-fit"
        >
          {isFetching ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh applications
        </Button>
      </div>

      {/* Overview metrics */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total applications"
          value={metrics.total}
          description="All returned applications"
          icon={<Users className="h-5 w-5" />}
        />

        <MetricCard
          label="Awaiting review"
          value={metrics.pending}
          description="Submitted for a decision"
          icon={<Clock3 className="h-5 w-5" />}
          emphasis="warning"
        />

        <MetricCard
          label="More information"
          value={metrics.attention}
          description="Applicant follow-up required"
          icon={<AlertCircle className="h-5 w-5" />}
          emphasis="warning"
        />

        <MetricCard
          label="Approved"
          value={metrics.approved}
          description="Successfully approved"
          icon={<CheckCircle2 className="h-5 w-5" />}
          emphasis="success"
        />
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search applicant, email, or reference..."
                className="pl-9"
                aria-label="Search onboarding applications"
              />
            </div>

            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value as OnboardingStatus | "ALL");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-[230px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>

              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sortOrder}
              onValueChange={(value) => {
                setSortOrder(value as "newest" | "oldest");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-[180px]">
                <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              onClick={() => {
                setSearch("");
                setStatus("ALL");
                setSortOrder("newest");
                setPage(1);
              }}
              className="w-full lg:w-fit"
            >
              Clear filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Application queue */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">
                Application review queue
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {filteredItems.length} application
                {filteredItems.length === 1 ? "" : "s"} found
                {search.trim() ? " matching your search" : ""}.
              </p>
            </div>

            <FileCheck2 className="hidden h-5 w-5 text-muted-foreground sm:block" />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {items.length === 0 ? (
            <EmptyState
              hasFilters={Boolean(search.trim()) || status !== "ALL"}
              onClear={() => {
                setSearch("");
                setStatus("ALL");
                setPage(1);
              }}
            />
          ) : (
            <>
              {/* Desktop / tablet queue */}
              <div className="hidden overflow-x-auto md:block">
                <OnboardingTable items={items} onOpen={openOnboarding} />
              </div>

              {/* Mobile queue */}
              <div className="space-y-3 p-4 md:hidden">
                {items.map((item) => (
                  <OnboardingMobileCard
                    key={item.id}
                    item={item}
                    onOpen={openOnboarding}
                  />
                ))}
              </div>
            </>
          )}
        </CardContent>

        {filteredItems.length > 0 && (
          <div className="border-t p-4">
            <Pagination
              page={currentPage}
              pages={totalPages}
              total={filteredItems.length}
              pageSize={PAGE_SIZE}
              onPrevious={() => setPage((value) => Math.max(1, value - 1))}
              onNext={() => setPage((value) => Math.min(totalPages, value + 1))}
            />
          </div>
        )}
      </Card>

      <p className="text-xs leading-5 text-muted-foreground">
        Application statuses reflect the latest records returned by the server.
        Open an application to inspect its information and make a review
        decision.
      </p>
    </div>
  );
};

export default AdminOnboardingPage;

const OnboardingTable = ({
  items,
  onOpen,
}: {
  items: InvestorOnboardingRecord[];
  onOpen: (id: string) => void;
}) => {
  return (
    <table className="w-full min-w-[1050px] text-sm">
      <thead className="border-b bg-muted/30">
        <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <th className="px-5 py-3">Applicant</th>
          <th className="px-5 py-3">Application</th>
          <th className="px-5 py-3">Progress</th>
          <th className="px-5 py-3">Documents</th>
          <th className="px-5 py-3">Submitted</th>
          <th className="px-5 py-3">Status</th>
          <th className="px-5 py-3 text-right">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {items.map((item) => {
          const name = getUserName(item.user);
          const completedCount = REQUIRED_STEPS.filter((step) =>
            item.completedSteps?.includes(step),
          ).length;

          return (
            <tr key={item.id} className="transition-colors hover:bg-muted/20">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={name} />

                  <div className="min-w-0">
                    <p className="font-medium">{name}</p>
                    <p className="mt-1 max-w-[220px] truncate text-xs text-muted-foreground">
                      {item.user.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4">
                <p className="font-medium">{item.reference}</p>
                <p className="mt-1 max-w-[210px] truncate text-xs text-muted-foreground">
                  {getInvestmentName(item)}
                </p>
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${(completedCount / REQUIRED_STEPS.length) * 100}%`,
                      }}
                    />
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {completedCount}/{REQUIRED_STEPS.length}
                  </span>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  Required sections
                </p>
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{item.documents?.length ?? 0} uploaded</span>
                </div>
              </td>

              <td className="px-5 py-4 text-muted-foreground">
                {item.submittedAt
                  ? formatDateTime(item.submittedAt)
                  : "Not submitted"}
              </td>

              <td className="px-5 py-4">
                <OnboardingStatusBadge status={item.status} />
              </td>

              <td className="px-5 py-4 text-right">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onOpen(item.id)}
                >
                  Review
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const OnboardingMobileCard = ({
  item,
  onOpen,
}: {
  item: InvestorOnboardingRecord;
  onOpen: (id: string) => void;
}) => {
  const name = getUserName(item.user);
  const completedCount = REQUIRED_STEPS.filter((step) =>
    item.completedSteps?.includes(step),
  ).length;

  return (
    <div className="rounded-xl border p-4 transition-colors hover:bg-muted/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={name} />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {item.user.email}
            </p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              {item.reference}
            </p>
          </div>
        </div>

        <OnboardingStatusBadge status={item.status} />
      </div>

      <div className="mt-4 space-y-3 border-t pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Investment</p>
          <p className="mt-1 text-sm font-medium">{getInvestmentName(item)}</p>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-muted-foreground">Required sections</span>
            <span className="font-medium">
              {completedCount}/{REQUIRED_STEPS.length} completed
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${(completedCount / REQUIRED_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Documents</p>
            <p className="mt-1 text-sm font-medium">
              {item.documents?.length ?? 0} uploaded
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Submitted</p>
            <p className="mt-1 text-sm font-medium">
              {item.submittedAt
                ? formatDate(item.submittedAt)
                : "Not submitted"}
            </p>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={() => onOpen(item.id)}
      >
        Review application
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

const MetricCard = ({
  label,
  value,
  description,
  icon,
  emphasis = "default",
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  emphasis?: "default" | "warning" | "success";
}) => {
  const iconClass =
    emphasis === "warning"
      ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
      : emphasis === "success"
        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
        : "bg-muted text-muted-foreground";

  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4 sm:p-5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>

          <p className="mt-1 text-2xl font-semibold tracking-tight">
            {value.toLocaleString()}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const OnboardingStatusBadge = ({ status }: { status: OnboardingStatus }) => {
  switch (status) {
    case "SUBMITTED":
      return (
        <Badge
          variant="secondary"
          className="whitespace-nowrap border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400"
        >
          <Clock3 className="mr-1.5 h-3.5 w-3.5" />
          Awaiting review
        </Badge>
      );

    case "MORE_INFORMATION_REQUIRED":
      return (
        <Badge
          variant="secondary"
          className="whitespace-nowrap border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400"
        >
          <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
          More information
        </Badge>
      );

    case "IN_PROGRESS":
      return (
        <Badge variant="secondary" className="whitespace-nowrap">
          <Loader2 className="mr-1.5 h-3.5 w-3.5" />
          In progress
        </Badge>
      );

    case "DRAFT":
      return (
        <Badge variant="outline" className="whitespace-nowrap">
          Draft
        </Badge>
      );

    case "APPROVED":
      return (
        <Badge className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-600">
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
          Approved
        </Badge>
      );

    case "REJECTED":
      return (
        <Badge variant="destructive" className="whitespace-nowrap">
          <XCircle className="mr-1.5 h-3.5 w-3.5" />
          Rejected
        </Badge>
      );

    default:
      return (
        <Badge variant="outline" className="whitespace-nowrap">
          <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
          Unknown status
        </Badge>
      );
  }
};

const EmptyState = ({
  hasFilters,
  onClear,
}: {
  hasFilters: boolean;
  onClear: () => void;
}) => (
  <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
      <FileCheck2 className="h-7 w-7 text-muted-foreground" />
    </div>

    <h3 className="mt-4 text-base font-semibold">
      {hasFilters ? "No matching applications" : "No onboarding applications"}
    </h3>

    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
      {hasFilters
        ? "Try another search term or change your status filter."
        : "Investor onboarding applications will appear here when available."}
    </p>

    {hasFilters && (
      <Button variant="outline" className="mt-4" onClick={onClear}>
        Clear filters
      </Button>
    )}
  </div>
);

const Pagination = ({
  page,
  pages,
  total,
  pageSize,
  onPrevious,
  onNext,
}: {
  page: number;
  pages: number;
  total: number;
  pageSize: number;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Showing {start}–{end} of {total} applications · Page {page} of {pages}
      </p>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={page <= 1}
          onClick={onPrevious}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={page >= pages}
          onClick={onNext}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
    >
      {initials || "U"}
    </div>
  );
};

const getUserName = (user: OnboardingUser) =>
  [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
  "Unnamed applicant";

const getInvestmentName = (item: InvestorOnboardingRecord) =>
  item.investmentInterest?.application?.title ||
  item.investmentInterest?.application?.name ||
  "Investment application";
