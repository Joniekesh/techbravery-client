import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  DollarSign,
  Eye,
  Globe2,
  Loader2,
  Lock,
  LockKeyhole,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { normalizeImageUrl } from "@/utils/normalizeImageUrl ";

import type { Application } from "@/types/application";
import { makeRequest } from "@/utils/makeRequest";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { queryClient } from "@/services/queryClient";

interface Props {
  application: Application;
  isNew?: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const formatCurrency = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) return String(value);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: Math.abs(number) >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(number);
};

const formatNumber = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) return String(value);

  return new Intl.NumberFormat("en-US", {
    notation: Math.abs(number) >= 100_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(number);
};

const formatStage = (value?: string | null): string => {
  if (!value) return "Stage not specified";

  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getFundingProgress = (application: Application): number => {
  const realized = Number(application.amountRealized ?? 0);
  const cap = Number(application.investmentCap ?? 0);

  if (!Number.isFinite(realized) || !Number.isFinite(cap) || cap <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round((realized / cap) * 100)));
};

const PlatformItem = ({ application, isNew = false }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? "";

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const countries = application.countriesOfCoverage ?? [];

  const highlights =
    application.keyHighlights?.filter((item) => item.isActive) ?? [];

  const progress = getFundingProgress(application);

  const isLive = Boolean(application.isLive && !application.deletedAt);

  const canInvest = Boolean(isLive && application.isInvestmentEnabled);

  const detailsPath = `/platforms/${application.id}`;

  const handleCloseForm = () => {
    if (!loading) {
      setShowForm(false);
    }
  };

  // Original Express Investment Interest workflow.
  const handleInvest = () => {
    if (!user) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });

      return;
    }

    if (!application.id) {
      toast.error("Investment opportunity unavailable");
      return;
    }

    if (!isLive || !application.isInvestmentEnabled) {
      toast.error("Investment is currently unavailable");
      return;
    }

    setShowForm(true);
  };

  // Original investment-interest endpoint and navigation.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!application?.id) {
      toast.error("Application unavailable", {
        description: "This investment opportunity could not be identified.",
      });

      return;
    }

    if (!application.isLive || application.deletedAt) {
      toast.error("Opportunity unavailable", {
        description: "This investment opportunity is no longer available.",
      });

      return;
    }

    if (!application.isInvestmentEnabled) {
      toast.error("Investment unavailable", {
        description:
          "Investment is not currently enabled for this opportunity.",
      });

      return;
    }

    setLoading(true);

    try {
      await makeRequest.post("/investment/interest", {
        applicationId: application.id,
      });

      await queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });

      toast.success("Investment onboarding started", {
        description:
          "Your investment draft has been created. Continue to your investor dashboard.",
      });

      setShowForm(false);

      navigate("/investor-dashboard/investments");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // Original Start Investing onboarding workflow.
  const handleStartInvesting = async () => {
    if (!user) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });

      return;
    }

    if (!application?.id) {
      toast.error("Investment opportunity unavailable");
      return;
    }

    setLoading(true);

    try {
      const response = await makeRequest.post("/investor-onboarding/new", {
        applicationId: application.id,
      });

      const onboarding = response.data?.onboarding ?? response.data;

      if (!onboarding?.id) {
        throw new Error("The onboarding ID was not returned.");
      }

      toast.success("Onboarding started");

      navigate(`/investor-dashboard/onboarding/${onboarding.id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div variants={itemVariants} className="h-full">
        <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.06]">
          {/* Image and opportunity identity */}
          <Link
            to={detailsPath}
            aria-label={`Explore ${application.title}`}
            className="relative block aspect-[16/9] overflow-hidden bg-muted"
          >
            {application.thumbNail ? (
              <img
                src={normalizeImageUrl(application.thumbNail)}
                alt={application.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/[0.12] via-muted to-primary/[0.04]">
                <BarChart3
                  className="h-12 w-12 text-primary/40"
                  strokeWidth={1.3}
                />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/15" />

            <div className="absolute left-4 top-4">
              <Badge
                className={
                  isLive
                    ? "border border-emerald-300/30 bg-emerald-500/90 text-white shadow-sm"
                    : "border-white/20 bg-black/55 text-white"
                }
              >
                <span
                  className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                    isLive ? "bg-white" : "bg-white/60"
                  }`}
                />
                {isLive ? "Live platform" : "Not live"}
              </Badge>
            </div>

            <Badge
              variant="secondary"
              className="absolute right-4 top-4 max-w-[48%] truncate border border-white/20 bg-black/45 text-white backdrop-blur-md"
            >
              {formatStage(application.investmentStage)}
            </Badge>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                  Investment opportunity
                </p>

                <h3 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
                  {application.title}
                </h3>
              </div>

              <div className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-primary">
                <ArrowDownRight className="h-5 w-5" />
              </div>
            </div>
          </Link>

          {/* Header */}
          <CardHeader className="space-y-3 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge
                variant="outline"
                className="max-w-full truncate font-medium"
              >
                {formatStage(application.status)}
              </Badge>

              {canInvest ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Accepting interest
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <LockKeyhole className="h-3.5 w-3.5" />
                  {isLive ? "Investment disabled" : "Not currently live"}
                </span>
              )}
            </div>

            <CardTitle className="text-base leading-relaxed tracking-tight sm:text-lg">
              <Link
                to={detailsPath}
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {application.title}
              </Link>
            </CardTitle>

            <CardDescription className="line-clamp-3 text-sm leading-6">
              {application.shortDescription ||
                "Explore the platform, its market opportunity, and its growth potential."}
            </CardDescription>
          </CardHeader>

          {/* Key metrics */}
          <CardContent className="flex-1 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="min-w-0 rounded-xl border border-border/60 bg-muted/25 p-3.5">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-xs">Valuation</span>
                </div>

                <p className="truncate text-lg font-bold tracking-tight sm:text-xl">
                  {formatCurrency(application.valuation)}
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-border/60 bg-muted/25 p-3.5">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-xs">Monthly revenue</span>
                </div>

                <p className="truncate text-lg font-bold tracking-tight sm:text-xl">
                  {formatCurrency(application.monthlyRevenue)}
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-border/60 bg-muted/25 p-3.5">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-xs">Active users</span>
                </div>

                <p className="truncate text-lg font-bold tracking-tight sm:text-xl">
                  {formatNumber(application.activeUsers)}
                </p>
              </div>

              <div className="min-w-0 rounded-xl border border-border/60 bg-muted/25 p-3.5">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Globe2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-xs">Market reach</span>
                </div>

                <p className="text-lg font-bold tracking-tight sm:text-xl">
                  {countries.length}
                  <span className="ml-1 text-xs font-medium text-muted-foreground">
                    {countries.length === 1 ? "country" : "countries"}
                  </span>
                </p>
              </div>
            </div>

            {/* Funding progress */}
            {Number(application.investmentCap) > 0 && (
              <div className="space-y-3 rounded-xl border border-border/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Funding progress</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Capital raised toward the target
                    </p>
                  </div>

                  <span className="text-sm font-bold tabular-nums text-primary">
                    {progress}%
                  </span>
                </div>

                <div
                  className="h-2 overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-label="Funding progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex flex-wrap justify-between gap-2 text-xs">
                  <div>
                    <p className="font-semibold">
                      {formatCurrency(application.amountRealized)}
                    </p>
                    <p className="mt-0.5 text-muted-foreground">Raised</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(application.investmentCap)}
                    </p>
                    <p className="mt-0.5 text-muted-foreground">Target</p>
                  </div>
                </div>
              </div>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="space-y-2.5">
                <p className="text-sm font-semibold">Key highlights</p>

                <div className="flex flex-wrap gap-2">
                  {highlights.slice(0, 3).map((highlight) => (
                    <Badge
                      key={highlight.id}
                      variant="secondary"
                      className="rounded-md px-2.5 py-1 text-xs font-medium"
                    >
                      {highlight.name}
                    </Badge>
                  ))}

                  {highlights.length > 3 && (
                    <Badge
                      variant="outline"
                      className="rounded-md px-2.5 py-1 text-xs"
                    >
                      +{highlights.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>

          {/* Original conditional button behavior */}
          <CardFooter className="flex flex-col gap-2 border-t border-border/50 bg-muted/[0.12] p-4 sm:p-5">
            <Button
              asChild
              variant="outline"
              className="w-full rounded-xl font-semibold flex items-center justify-center"
            >
              <Link to={detailsPath}>
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Explore Platform
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            {isLive &&
            !application.deletedAt &&
            application.isInvestmentEnabled &&
            !isNew ? (
              <Button
                type="button"
                disabled={loading}
                onClick={handleInvest}
                className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow font-semibold shadow-sm transition-all hover:shadow-md flex items-center justify-center"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Express Investment Interest
              </Button>
            ) : (
              <Button
                type="button"
                disabled={loading}
                onClick={handleStartInvesting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-center font-semibold shadow-sm transition-all hover:shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                    <span>Starting...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 shrink-0" />
                    <span>Start Investing</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      {/* Express Investment Interest modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseForm();
            }
          }}
        >
          <Card
            role="dialog"
            aria-modal="true"
            aria-labelledby="investment-interest-title"
            className="relative flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border-border/70 shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b bg-gradient-to-br from-primary/[0.09] to-transparent p-5 sm:p-6">
              <div>
                <Badge className="mb-3 border border-primary/15 bg-primary/10 text-primary hover:bg-primary/10">
                  <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
                  Investment opportunity
                </Badge>

                <h2
                  id="investment-interest-title"
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                >
                  Express Investment Interest
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Take the first step toward becoming an investor in{" "}
                  <span className="font-medium text-foreground">
                    {application.title}
                  </span>
                  .
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={loading}
                aria-label="Close investment interest form"
                onClick={handleCloseForm}
                className="shrink-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Scrollable modal content */}
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
              <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {application.thumbNail ? (
                    <img
                      src={normalizeImageUrl(application.thumbNail)}
                      alt={application.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BarChart3 className="h-7 w-7 text-primary/50" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{application.title}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatStage(application.investmentStage)}
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    Valuation: {formatCurrency(application.valuation)}
                  </p>
                </div>
              </div>

              {/* Investment snapshot */}
              <section className="space-y-3">
                <div>
                  <h3 className="font-semibold">Investment snapshot</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Key figures for this opportunity.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: "Monthly revenue",
                      value: formatCurrency(application.monthlyRevenue),
                    },
                    {
                      label: "Active users",
                      value: formatNumber(application.activeUsers),
                    },
                    {
                      label: "Funding target",
                      value: formatCurrency(application.investmentCap),
                    },
                    {
                      label: "Raised",
                      value: formatCurrency(application.amountRealized),
                    },
                    {
                      label: "Market reach",
                      value: `${countries.length} ${
                        countries.length === 1 ? "country" : "countries"
                      }`,
                    },
                    {
                      label: "Funding progress",
                      value: `${progress}%`,
                    },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="min-w-0 rounded-xl border border-border/60 bg-muted/20 p-3"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {metric.label}
                      </p>
                      <p className="mt-1.5 truncate text-sm font-bold sm:text-base">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Account details */}
              <section className="space-y-3">
                <div>
                  <h3 className="font-semibold">Your investor account</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your account information for this request.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="min-w-0 rounded-xl border border-border/60 p-3">
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <Label
                        htmlFor="investor-full-name"
                        className="text-xs text-muted-foreground"
                      >
                        Full name
                      </Label>
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    </div>

                    <Input
                      id="investor-full-name"
                      value={
                        user
                          ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                          : ""
                      }
                      readOnly
                      className="h-auto border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus-visible:ring-0"
                    />
                  </div>

                  <div className="min-w-0 rounded-xl border border-border/60 p-3">
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <Label
                        htmlFor="investor-email"
                        className="text-xs text-muted-foreground"
                      >
                        Email address
                      </Label>
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    </div>

                    <Input
                      id="investor-email"
                      type="email"
                      value={user?.email ?? ""}
                      readOnly
                      className="h-auto border-0 bg-transparent px-0 text-sm font-semibold shadow-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </section>

              {/* Investor journey */}
              <section className="rounded-xl border border-primary/15 bg-primary/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Your next steps</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Register your interest, complete the required investor
                      onboarding, and review the applicable terms before making
                      an investment decision.
                    </p>
                  </div>
                </div>
              </section>

              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                <div>
                  <p className="text-sm font-semibold">
                    No financial commitment at this stage
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Expressing interest does not initiate a payment or require
                    an investment amount. Review the applicable terms before
                    committing funds.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal actions */}
            <form
              onSubmit={handleSubmit}
              className="shrink-0 border-t bg-background/95 p-4 backdrop-blur-xl sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="hidden items-center gap-2 sm:flex">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <p className="text-xs text-muted-foreground">
                    Your account information is ready
                  </p>
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={loading}
                    onClick={handleCloseForm}
                    className="flex-1 rounded-xl sm:flex-none"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading || !canInvest}
                    className="flex-1 rounded-xl bg-gradient-to-r from-primary to-primary-glow font-semibold sm:min-w-[220px] sm:flex-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Continue to dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default PlatformItem;
