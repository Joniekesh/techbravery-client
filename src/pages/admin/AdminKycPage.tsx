import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileCheck2,
  Loader2,
  Search,
  ShieldCheck,
  XCircle,
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

import { formatDate, formatDateTime, formatDocumentType } from "@/utils";

import { KycRecord, KycStatus } from "@/types/kyc";
import { useAdminKycs } from "@/services/kyc";
import Loader from "@/components/loader/Loader";
import { ErrorState } from "@/components/ErrorState";

const AdminKycPage = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const params = useMemo(() => {
    const query = new URLSearchParams();

    query.set("page", String(page));
    query.set("limit", "10");

    if (status !== "ALL") {
      query.set("status", status);
    }

    if (search.trim()) {
      query.set("search", search.trim());
    }

    return query.toString();
  }, [page, search, status]);

  const { data, isLoading, isError, refetch } = useAdminKycs(params);

  const items = data?.data ?? [];

  const pagination = data?.pagination ?? {
    page,
    limit: 10,
    total: 0,
    pages: 1,
  };

  const pendingCount = useMemo(
    () => items.filter((item) => item.status === KycStatus.PENDING).length,
    [items],
  );

  const attentionCount = useMemo(
    () =>
      items.filter(
        (item) =>
          item.status === KycStatus.REJECTED ||
          item.status === KycStatus.MORE_INFORMATION,
      ).length,
    [items],
  );

  const openKyc = (id: string) => {
    navigate(`/admin-dashboard/kyc/${id}`);
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

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            KYC Verification
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Review investor identity submissions, verify supporting documents,
            and manage KYC compliance decisions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <MetricCard
            label="Pending on page"
            value={pendingCount}
            icon={<Clock3 className="h-4 w-4" />}
          />

          <MetricCard
            label="Attention"
            value={attentionCount}
            icon={<AlertCircle className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => {
                  setPage(1);
                  setSearch(event.target.value);
                }}
                placeholder="Search by name, email or phone..."
                className="pl-9"
              />
            </div>

            <Select
              value={status}
              onValueChange={(value) => {
                setPage(1);
                setStatus(value);
              }}
            >
              <SelectTrigger className="w-full lg:w-[210px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All statuses</SelectItem>

                <SelectItem value={KycStatus.PENDING}>
                  Pending review
                </SelectItem>

                <SelectItem value={KycStatus.MORE_INFORMATION}>
                  More information
                </SelectItem>

                <SelectItem value={KycStatus.REJECTED}>Rejected</SelectItem>

                <SelectItem value={KycStatus.APPROVED}>Approved</SelectItem>

                <SelectItem value={KycStatus.NOT_STARTED}>
                  Not started
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Queue */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Verification queue</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {pagination.total} KYC record
                {pagination.total === 1 ? "" : "s"} found.
              </p>
            </div>

            <FileCheck2 className="hidden h-5 w-5 text-muted-foreground sm:block" />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="hidden md:block">
            <KycTable items={items} onOpen={openKyc} />
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {items.map((item) => (
              <KycMobileCard key={item.id} item={item} onOpen={openKyc} />
            ))}
          </div>
        </CardContent>

        {pagination.pages > 1 && (
          <div className="border-t p-4">
            <Pagination
              page={pagination.page}
              pages={pagination.pages}
              total={pagination.total}
              onPrevious={() => setPage((value) => Math.max(1, value - 1))}
              onNext={() =>
                setPage((value) => Math.min(pagination.pages, value + 1))
              }
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminKycPage;

/* -------------------------------------------------------------------------- */
/* Queue table                                                                */
/* -------------------------------------------------------------------------- */

const KycTable = ({
  items,
  onOpen,
}: {
  items: KycRecord[];
  onOpen: (id: string) => void;
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] text-sm">
        <thead className="border-b bg-muted/30">
          <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <th className="px-5 py-3">Applicant</th>
            <th className="px-5 py-3">Document</th>
            <th className="px-5 py-3">Residence</th>
            <th className="px-5 py-3">PEP</th>
            <th className="px-5 py-3">Submitted</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {items.map((item) => {
            const name = getUserName(item.user);

            return (
              <tr key={item.id} className="transition-colors hover:bg-muted/20">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={name} />

                    <div className="min-w-0">
                      <p className="font-medium">{name}</p>

                      <p className="truncate text-xs text-muted-foreground">
                        {item.user.email}
                      </p>

                      {item.user.phone && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.user.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <p>{formatDocumentType(item.documentType)}</p>

                  {item.documentNumberLast4 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      •••• {item.documentNumberLast4}
                    </p>
                  )}

                  {item.issuingCountry && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.issuingCountry.name}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4">
                  <p>{item.user.country?.name ?? "Not provided"}</p>

                  {item.city && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.city}
                      {item.state ? `, ${item.state}` : ""}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4">
                  {item.isPoliticallyExposed ? (
                    <Badge variant="destructive" className="w-fit">
                      Yes
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="w-fit">
                      No
                    </Badge>
                  )}
                </td>

                <td className="px-5 py-4 text-muted-foreground">
                  {item.submittedAt
                    ? formatDateTime(item.submittedAt)
                    : "Not submitted"}
                </td>

                <td className="px-5 py-4">
                  <KycStatusBadge status={item.status} />
                </td>

                <td className="px-5 py-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpen(item.id)}
                  >
                    Review
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Mobile card                                                                */
/* -------------------------------------------------------------------------- */

const KycMobileCard = ({
  item,
  onOpen,
}: {
  item: KycRecord;
  onOpen: (id: string) => void;
}) => {
  const name = getUserName(item.user);

  return (
    <button
      type="button"
      onClick={() => onOpen(item.id)}
      className="w-full rounded-xl border p-4 text-left transition hover:bg-muted/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={name} />

          <div className="min-w-0">
            <p className="truncate font-medium">{name}</p>

            <p className="truncate text-xs text-muted-foreground">
              {item.user.email}
            </p>
          </div>
        </div>

        <KycStatusBadge status={item.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 text-xs">
        <div>
          <p className="text-muted-foreground">Document</p>

          <p className="mt-1 font-medium">
            {formatDocumentType(item.documentType)}
          </p>

          {item.documentNumberLast4 && (
            <p className="mt-0.5 text-muted-foreground">
              •••• {item.documentNumberLast4}
            </p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground">Residence</p>

          <p className="mt-1 font-medium">
            {item.user.country?.name ?? "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Submitted</p>

          <p className="mt-1 font-medium">
            {item.submittedAt ? formatDate(item.submittedAt) : "Not submitted"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">PEP</p>

          <p className="mt-1 font-medium">
            {item.isPoliticallyExposed ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/* Shared UI                                                                  */
/* -------------------------------------------------------------------------- */

const MetricCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex min-w-[135px] items-center gap-3 rounded-xl border bg-card px-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>

      <div>
        <p className="text-lg font-semibold">{value}</p>

        <p className="text-[11px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
      {initials || "U"}
    </div>
  );
};

const Pagination = ({
  page,
  pages,
  total,
  onPrevious,
  onNext,
}: {
  page: number;
  pages: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Page {page} of {pages} · {total} total
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

const getUserName = (user: KycRecord["user"]) => {
  return (
    [user.firstName, user.middleName, user.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() || "Unnamed applicant"
  );
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
          <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
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
