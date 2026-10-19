import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Filter,
  ReceiptText,
  Search,
  ShieldCheck,
  Wallet,
  XCircle,
} from "lucide-react";

import { ErrorState } from "@/components/ErrorState";
import Loader from "@/components/loader/Loader";
import { useAppSelector } from "@/redux/hooks";
import { useMyInvestorInvoices } from "@/services/invoice";
import { Invoice } from "@/types/invoice";

type InvoiceFilter = "ALL" | "PENDING" | "PAID" | "OVERDUE" | "CANCELLED";

const currencyFormatter = (amount: string | number, currencyCode?: string) => {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "Amount unavailable";
  }

  if (!currencyCode) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currencyCode} ${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

const formatDate = (date?: string | null) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
};

const getInvoiceState = (invoice: Invoice) => {
  const status = invoice.status?.toUpperCase();
  const paid =
    Boolean(invoice.paidAt) ||
    ["PAID", "COMPLETED", "SUCCESSFUL"].includes(status);

  if (paid) return "PAID";

  if (["CANCELLED", "CANCELED", "VOID"].includes(status)) {
    return "CANCELLED";
  }

  if (["FAILED", "REJECTED"].includes(status)) {
    return "FAILED";
  }

  const dueTime = new Date(invoice.dueDate).getTime();

  if (
    status === "PENDING" &&
    Number.isFinite(dueTime) &&
    dueTime < Date.now()
  ) {
    return "OVERDUE";
  }

  return status || "PENDING";
};

const statusStyles: Record<string, string> = {
  PAID: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  OVERDUE: "bg-rose-50 text-rose-700 ring-rose-600/20",
  CANCELLED: "bg-slate-100 text-slate-600 ring-slate-500/20",
  FAILED: "bg-rose-50 text-rose-700 ring-rose-600/20",
  PROCESSING: "bg-blue-50 text-blue-700 ring-blue-600/20",
};

const StatusBadge = ({ status }: { status: string }) => {
  const style =
    statusStyles[status] ?? "bg-slate-100 text-slate-600 ring-slate-500/20";

  const Icon =
    status === "PAID"
      ? CheckCircle2
      : status === "OVERDUE" || status === "FAILED"
        ? AlertCircle
        : status === "CANCELLED"
          ? XCircle
          : Clock3;

  const label =
    status === "PAID"
      ? "Paid"
      : status === "OVERDUE"
        ? "Overdue"
        : status === "CANCELLED"
          ? "Cancelled"
          : status === "FAILED"
            ? "Failed"
            : status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${style}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
};

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {value}
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
      </div>

      <div className={`rounded-xl p-3 ${iconClass}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

const InvestorInvoicesPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? "";

  const {
    data: invoices,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useMyInvestorInvoices(userId);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<InvoiceFilter>("ALL");

  const invoiceList = useMemo(() => {
    const list = (Array.isArray(invoices) ? invoices : []) as Invoice[];

    return list.filter((invoice) => !invoice.deletedAt);
  }, [invoices]);

  const getAmount = (invoice: Invoice) => Number(invoice.amount) || 0;

  const getCurrencyCode = (invoice: Invoice) => invoice.currency?.iso || "USD";

  const formatInvoiceAmount = (invoice: Invoice) =>
    currencyFormatter(invoice.amount, getCurrencyCode(invoice));

  const filteredInvoices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return invoiceList.filter((invoice) => {
      const state = getInvoiceState(invoice);

      const matchesFilter =
        activeFilter === "ALL" ||
        (activeFilter === "PENDING" &&
          ["PENDING", "PROCESSING"].includes(state)) ||
        state === activeFilter;

      const searchableValues = [
        invoice.invoiceNo,
        invoice.onboarding?.reference,
        invoice.onboardingId,
        invoice.currency?.iso,
        invoice.currency?.name,
        invoice.status,
      ];

      const matchesSearch =
        !query ||
        searchableValues.some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(query),
        );

      return matchesFilter && matchesSearch;
    });
  }, [invoiceList, searchTerm, activeFilter]);

  const stats = useMemo(() => {
    let paidTotal = 0;
    let outstandingTotal = 0;
    let overdueCount = 0;
    let pendingCount = 0;

    invoiceList.forEach((invoice) => {
      const state = getInvoiceState(invoice);
      const amount = getAmount(invoice);

      if (state === "PAID") {
        paidTotal += amount;
      } else if (["PENDING", "OVERDUE", "PROCESSING"].includes(state)) {
        outstandingTotal += amount;
      }

      if (state === "OVERDUE") overdueCount += 1;
      if (["PENDING", "PROCESSING"].includes(state)) pendingCount += 1;
    });

    return {
      total: invoiceList.length,
      paidTotal,
      outstandingTotal,
      overdueCount,
      pendingCount,
    };
  }, [invoiceList]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader type="bounce" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <ErrorState onRetry={() => void refetch()} />
      </div>
    );
  }

  const filters: { label: string; value: InvoiceFilter }[] = [
    { label: "All invoices", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Paid", value: "PAID" },
    { label: "Overdue", value: "OVERDUE" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  return (
    <main className="min-h-screen bg-slate-50/80">
      <div className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500">
              <Wallet className="h-4 w-4" />
              Investor portal
              <span className="text-slate-300">/</span>
              <span className="text-slate-700">Invoices</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              My investment invoices
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Review your investment invoices, track payment deadlines, and
              manage outstanding balances in one place.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-800 md:self-center">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            Secure investor account
          </div>
        </section>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total invoices"
            value={stats.total}
            description="All your active investment invoices"
            icon={ReceiptText}
            iconClass="bg-blue-50 text-blue-700"
          />

          <StatCard
            title="Outstanding balance"
            value={currencyFormatter(
              stats.outstandingTotal,
              invoiceList[0]?.currency?.iso || "USD",
            )}
            description={`${stats.pendingCount} awaiting payment · ${stats.overdueCount} overdue`}
            icon={ArrowDownRight}
            iconClass="bg-amber-50 text-amber-700"
          />

          <StatCard
            title="Total paid"
            value={currencyFormatter(
              stats.paidTotal,
              invoiceList[0]?.currency?.iso || "USD",
            )}
            description="Combined value of paid invoices"
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-700"
          />

          <StatCard
            title="Overdue invoices"
            value={stats.overdueCount}
            description={
              stats.overdueCount > 0
                ? "Payment deadline has passed"
                : "No overdue invoices"
            }
            icon={CalendarDays}
            iconClass={
              stats.overdueCount > 0
                ? "bg-rose-50 text-rose-700"
                : "bg-slate-100 text-slate-600"
            }
          />
        </section>

        {/* Invoice list */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Invoice history
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filteredInvoices.length}{" "}
                  {filteredInvoices.length === 1 ? "invoice" : "invoices"} found
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <div className="relative min-w-0 flex-1 sm:min-w-[260px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search invoice or application..."
                    aria-label="Search invoices"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => void refetch()}
                  disabled={isFetching}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ArrowUpRight
                    className={`h-4 w-4 ${isFetching ? "animate-pulse" : ""}`}
                  />
                  Refresh
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
              <Filter className="h-4 w-4 shrink-0 text-slate-400" />

              {filters.map((filter) => {
                const selected = activeFilter === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setActiveFilter(filter.value)}
                    className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                      selected
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredInvoices.length === 0 ? (
            <div className="px-5 py-16 text-center sm:px-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <FileText className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-base font-bold text-slate-900">
                {invoiceList.length === 0
                  ? "No investment invoices yet"
                  : "No invoices match your search"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {invoiceList.length === 0
                  ? "When an invoice is issued for your investment application, it will appear here with its amount, due date, and payment status."
                  : "Try another invoice number or application reference, or select a different status filter."}
              </p>

              {(searchTerm || activeFilter !== "ALL") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveFilter("ALL");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Invoice
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Investment application
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Issue date
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Due date
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredInvoices.map((invoice) => {
                      const status = getInvoiceState(invoice);
                      const currency = invoice.currency;

                      return (
                        <tr
                          key={invoice.id}
                          className="transition hover:bg-slate-50/80"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                <ReceiptText className="h-5 w-5" />
                              </div>

                              <div className="min-w-0">
                                <p className="whitespace-nowrap text-sm font-bold text-slate-900">
                                  {invoice.invoiceNo}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                  Investment invoice
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <p className="text-sm font-semibold text-slate-800">
                              {invoice.onboarding?.reference || "Investment"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {invoice.onboarding?.status
                                ? `Application ${invoice.onboarding.status
                                    .toLowerCase()
                                    .replace(/_/g, " ")}`
                                : "Investment application"}
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <p className="whitespace-nowrap text-sm font-bold text-slate-900">
                              {currency?.flag ? `${currency.flag} ` : ""}
                              {formatInvoiceAmount(invoice)}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {currency?.name ||
                                currency?.iso ||
                                "Invoice currency"}
                            </p>
                          </td>

                          <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                            {formatDate(invoice.createdAt)}
                          </td>

                          <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                            {formatDate(invoice.dueDate)}
                          </td>

                          <td className="px-6 py-5">
                            <StatusBadge status={status} />
                          </td>

                          <td className="px-6 py-5 text-right">
                            {status === "PENDING" || status === "OVERDUE" ? (
                              <Link
                                to={`/investor-dashboard/invoices//${invoice.id}/pay`}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-slate-900 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                              >
                                Pay invoice
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            ) : (
                              <Link
                                to={`/investor-dashboard/invoices/${invoice.id}/pay`}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                              >
                                View details
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile and tablet cards */}
              <div className="grid grid-cols-1 gap-0 divide-y divide-slate-100 lg:hidden">
                {filteredInvoices.map((invoice) => {
                  const status = getInvoiceState(invoice);
                  const currency = invoice.currency;
                  const canPay = status === "PENDING" || status === "OVERDUE";

                  return (
                    <article
                      key={invoice.id}
                      className="p-4 transition hover:bg-slate-50/70 sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <ReceiptText className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="break-all text-sm font-bold text-slate-900">
                              {invoice.invoiceNo}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {invoice.onboarding?.reference ||
                                "Investment invoice"}
                            </p>
                          </div>
                        </div>

                        <StatusBadge status={status} />
                      </div>

                      <div className="mt-5 rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-500">
                          Invoice amount
                        </p>
                        <p className="mt-1 break-words text-2xl font-bold tracking-tight text-slate-950">
                          {currency?.flag ? `${currency.flag} ` : ""}
                          {formatInvoiceAmount(invoice)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {currency?.name ||
                            currency?.iso ||
                            "Invoice currency"}
                        </p>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-500">Issue date</p>
                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {formatDate(invoice.createdAt)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">Due date</p>
                          <p
                            className={`mt-1 text-sm font-semibold ${
                              status === "OVERDUE"
                                ? "text-rose-600"
                                : "text-slate-800"
                            }`}
                          >
                            {formatDate(invoice.dueDate)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
                        {canPay ? (
                          <Link
                            to={`/invoice-payment/${invoice.id}`}
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                          >
                            <CreditCard className="h-4 w-4" />
                            Pay invoice
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        ) : (
                          <Link
                            to={`/investor/invoices/${invoice.id}`}
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            <FileText className="h-4 w-4" />
                            View invoice details
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </section>

        {/* Payment guidance */}
        <section className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-start sm:p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Payment and account security
            </h3>
            <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-600">
              Always confirm the invoice number, amount, and currency before
              making a payment. Your invoice status should update after the
              payment has been verified. If a payment has been completed but the
              invoice still shows as pending, contact investor support with your
              invoice number.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default InvestorInvoicesPage;
