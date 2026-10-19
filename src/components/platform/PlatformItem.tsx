import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CheckCircle2,
  DollarSign,
  Eye,
  Globe2,
  Loader2,
  Lock,
  TrendingUp,
  Unlock,
  Users,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { normalizeImageUrl } from "@/utils/normalizeImageUrl ";

import type { Application } from "@/types/application";
import { makeRequest } from "@/utils/makeRequest";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { logout } from "@/redux/actions/authActions";
import { queryClient } from "@/services/queryClient";

interface Props {
  application: Application;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const formatCurrency = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
};

const formatNumber = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-US").format(number);
};

const formatStage = (value?: string | null) => {
  if (!value) return "—";

  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getFundingProgress = (application: Application) => {
  const realized = Number(application?.amountRealized ?? 0);
  const cap = Number(application?.investmentCap ?? 0);

  if (!cap || cap <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((realized / cap) * 100));
};

const PlatformItem = ({ application }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? "";

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fundingProgress = getFundingProgress(application);

  const activeHighlights =
    application?.keyHighlights?.filter((item) => item.isActive) ?? [];

  const countries = application?.countriesOfCoverage ?? [];

  console.log("APPLICATION", application);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleInvest = () => {
    if (!user) {
      navigate("/login", {
        state: {
          from: location,
        },
        replace: true,
      });

      return;
    }

    setShowForm(true);
  };

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
      const response = await makeRequest.post("/investment/interest", {
        applicationId: application.id,
      });

      // const interest = response.data?.interest ?? response.data;

      // const investment = interest?.investments?.[0];

      // if (!investment?.id) {
      //   throw new Error("Investment was created but could not be identified.");
      // }

      queryClient.invalidateQueries({ queryKey: ["profile", userId] });

      toast.success("Investment onboarding started", {
        description:
          "Your investment draft has been created. Continue to complete your investor onboarding.",
      });

      handleCloseForm();

      navigate(`/investor-dashboard/investments`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div variants={itemVariants} className="h-full">
        <Card className="group flex h-full flex-col overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            {application?.thumbNail ? (
              <img
                src={normalizeImageUrl(application.thumbNail)}
                alt={application?.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <BarChart3 className="h-14 w-14 text-muted-foreground/30" />
              </div>
            )}

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Status */}
            <div className="absolute left-4 top-4">
              <Badge
                className={
                  application?.isLive
                    ? "border-emerald-400/30 bg-emerald-500/90 text-white"
                    : "bg-black/60 text-white"
                }
              >
                {application?.isLive ? (
                  <>
                    <Unlock className="mr-1 h-3 w-3" />
                    Live
                  </>
                ) : (
                  <>
                    <Lock className="mr-1 h-3 w-3" />
                    Not Live
                  </>
                )}
              </Badge>
            </div>

            {/* Stage */}
            <div className="absolute right-4 top-4">
              <Badge
                variant="secondary"
                className="bg-background/90 backdrop-blur"
              >
                {formatStage(application?.investmentStage)}
              </Badge>
            </div>

            {/* Bottom title */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="line-clamp-1 text-xl font-bold text-white">
                {application?.title}
              </h3>
            </div>
          </div>

          {/* Header */}
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle className="line-clamp-1 text-xl transition-colors group-hover:text-primary">
                  {application?.title}
                </CardTitle>

                <CardDescription className="mt-2 line-clamp-3">
                  {application?.shortDescription}
                </CardDescription>
              </div>

              <Badge variant="outline" className="shrink-0 capitalize">
                {formatStage(application?.status)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-6">
            {/* Metrics */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0 text-primary" />

                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {formatNumber(application?.activeUsers)}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Active Users
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 shrink-0 text-primary" />

                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {formatCurrency(application?.monthlyRevenue)}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Monthly Revenue
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 shrink-0 text-primary" />

                  <div>
                    <p className="font-semibold">{countries.length}</p>

                    <p className="text-xs text-muted-foreground">Countries</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 shrink-0 text-primary" />

                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {formatCurrency(application?.valuation)}
                    </p>

                    <p className="text-xs text-muted-foreground">Valuation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment progress */}
            {Number(application?.investmentCap) > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span>Funding Progress</span>

                  <span className="font-semibold">{fundingProgress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-all"
                    style={{
                      width: `${fundingProgress}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {formatCurrency(application?.amountRealized)} raised
                  </span>

                  <span>
                    {formatCurrency(application?.investmentCap)} target
                  </span>
                </div>
              </div>
            )}

            {/* Highlights */}
            {activeHighlights.length > 0 && (
              <div>
                <h4 className="mb-2 font-semibold">Key Highlights</h4>

                <div className="flex flex-wrap gap-1.5">
                  {activeHighlights.slice(0, 4).map((highlight) => (
                    <Badge
                      key={highlight.id}
                      variant="outline"
                      className="text-xs"
                    >
                      {highlight.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col gap-2 lg:flex-row">
            <Button className="w-full sm:flex-1" variant="outline" asChild>
              <Link to={`/platforms/${application?.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Explore Platform
              </Link>
            </Button>

            {application?.isLive &&
              !application?.deletedAt &&
              application.isInvestmentEnabled && (
                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-primary to-primary-glow sm:flex-1"
                  onClick={handleInvest}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Express Investment Interest
                </Button>
              )}
          </CardFooter>
        </Card>
      </motion.div>

      {/* Investment Interest Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-md sm:p-5">
          <Card className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden border-border/60 bg-background shadow-2xl">
            <div className="relative shrink-0 overflow-hidden border-b">
              {/* Soft platform-themed background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

              {/* Decorative glow */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative p-5 sm:p-6">
                {/* Close */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 z-20 h-9 w-9 rounded-full border border-border/40 bg-background/70 backdrop-blur-md transition-all hover:bg-background sm:right-5 sm:top-5"
                  onClick={handleCloseForm}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>

                <div className="pr-12">
                  {/* Eyebrow */}
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Investment Opportunity
                    </span>

                    {application?.isLive && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live Platform
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                    Express Investment Interest
                  </h2>

                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Take the first step toward becoming an investor in{" "}
                    <span className="font-medium text-foreground">
                      {application?.title}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <CardContent className="space-y-6 p-4 sm:p-6">
                <section className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.07] via-primary/[0.025] to-transparent p-4 sm:p-5">
                  {/* Decorative background */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

                  <div className="relative flex items-start gap-4">
                    {/* Platform image */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm sm:h-20 sm:w-20">
                      {application?.thumbNail ? (
                        <img
                          src={normalizeImageUrl(application.thumbNail)}
                          alt={application.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/10">
                          <BarChart3 className="h-7 w-7 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Platform identity */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                          {application?.title}
                        </h3>

                        <Badge
                          variant="outline"
                          className="border-primary/20 bg-primary/5 text-primary"
                        >
                          {formatStage(application?.investmentStage)}
                        </Badge>
                      </div>

                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {application?.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-5 border-t border-primary/10 pt-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">
                          Investment Snapshot
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Key figures for this opportunity
                        </p>
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <BarChart3 className="h-4 w-4 text-primary" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {/* Valuation */}
                      <div className="rounded-xl border border-border/60 bg-background/75 p-3 transition-colors hover:border-primary/20">
                        <div className="mb-1 flex items-center gap-1.5">
                          <TrendingUp className="h-3.5 w-3.5 text-primary" />

                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Valuation
                          </p>
                        </div>

                        <p className="truncate text-sm font-bold sm:text-base">
                          {formatCurrency(application?.valuation)}
                        </p>
                      </div>

                      {/* Investment Target */}
                      <div className="rounded-xl border border-border/60 bg-background/75 p-3 transition-colors hover:border-primary/20">
                        <div className="mb-1 flex items-center gap-1.5">
                          <DollarSign className="h-3.5 w-3.5 text-primary" />

                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Target
                          </p>
                        </div>

                        <p className="truncate text-sm font-bold sm:text-base">
                          {formatCurrency(application?.investmentCap)}
                        </p>
                      </div>

                      {/* Active Users */}
                      <div className="rounded-xl border border-border/60 bg-background/75 p-3 transition-colors hover:border-primary/20">
                        <div className="mb-1 flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-primary" />

                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Active Users
                          </p>
                        </div>

                        <p className="truncate text-sm font-bold sm:text-base">
                          {formatNumber(application?.activeUsers)}
                        </p>
                      </div>

                      {/* Monthly Revenue */}
                      <div className="rounded-xl border border-border/60 bg-background/75 p-3 transition-colors hover:border-primary/20">
                        <div className="mb-1 flex items-center gap-1.5">
                          <DollarSign className="h-3.5 w-3.5 text-primary" />

                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Monthly Revenue
                          </p>
                        </div>

                        <p className="truncate text-sm font-bold sm:text-base">
                          {formatCurrency(application?.monthlyRevenue)}
                        </p>
                      </div>

                      {/* Market Reach */}
                      <div className="rounded-xl border border-border/60 bg-background/75 p-3 transition-colors hover:border-primary/20">
                        <div className="mb-1 flex items-center gap-1.5">
                          <Globe2 className="h-3.5 w-3.5 text-primary" />

                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Market Reach
                          </p>
                        </div>

                        <p className="text-sm font-bold sm:text-base">
                          {countries.length}{" "}
                          {countries.length === 1 ? "Country" : "Countries"}
                        </p>
                      </div>

                      {/* Investment Stage */}
                      <div className="rounded-xl border border-border/60 bg-background/75 p-3 transition-colors hover:border-primary/20">
                        <div className="mb-1 flex items-center gap-1.5">
                          <BarChart3 className="h-3.5 w-3.5 text-primary" />

                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Stage
                          </p>
                        </div>

                        <p className="truncate text-sm font-bold sm:text-base">
                          {formatStage(application?.investmentStage)}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold">
                          Your Investor Account
                        </h3>

                        <p className="text-xs text-muted-foreground">
                          Your verified account information
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* Full Name */}
                    <div className="rounded-xl border border-border/60 bg-muted/[0.18] p-3.5">
                      <div className="mb-1.5 flex items-center justify-between">
                        <Label
                          htmlFor="full-name"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          Full Name
                        </Label>

                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      </div>

                      <Input
                        id="full-name"
                        value={user ? `${user.firstName} ${user.lastName}` : ""}
                        readOnly
                        className="border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus-visible:ring-0"
                      />
                    </div>

                    {/* Email */}
                    <div className="rounded-xl border border-border/60 bg-muted/[0.18] p-3.5">
                      <div className="mb-1.5 flex items-center justify-between">
                        <Label
                          htmlFor="email"
                          className="text-xs font-medium text-muted-foreground"
                        >
                          Email Address
                        </Label>

                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      </div>

                      <Input
                        id="email"
                        type="email"
                        value={user?.email ?? ""}
                        readOnly
                        className="border-0 bg-transparent p-0 text-sm font-semibold shadow-none focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-primary/15 bg-primary/[0.035] p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Begin Your Investor Journey
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Continue to your investor dashboard to explore the
                        opportunity in greater detail and complete the necessary
                        onboarding steps.
                      </p>
                    </div>
                  </div>

                  {/* Journey steps */}
                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    <div className="rounded-xl border border-border/50 bg-background/70 p-3">
                      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        1
                      </div>

                      <p className="text-xs font-semibold">Express Interest</p>

                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        Register your interest in the opportunity.
                      </p>
                    </div>

                    <div className="rounded-xl border border-border/50 bg-background/70 p-3">
                      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        2
                      </div>

                      <p className="text-xs font-semibold">
                        Complete Onboarding
                      </p>

                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        Complete your investor profile and requirements.
                      </p>
                    </div>

                    <div className="rounded-xl border border-border/50 bg-background/70 p-3">
                      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        3
                      </div>

                      <p className="text-xs font-semibold">Review & Invest</p>

                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        Review available investment terms when eligible.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      No financial commitment at this stage
                    </p>

                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                      Expressing interest does not require an investment amount
                      or payment. You will review the relevant investment
                      information before making any financial commitment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="shrink-0 border-t bg-background/95 p-4 backdrop-blur-xl sm:p-5">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="hidden items-center gap-2 sm:flex">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      Your account information is ready
                    </p>
                  </div>

                  <div className="flex w-full gap-2 sm:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 sm:min-w-[100px] sm:flex-none"
                      onClick={handleCloseForm}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-primary to-primary-glow shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:min-w-[230px] sm:flex-none"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading...
                        </span>
                      ) : (
                        "Continue to Investor Dashboard"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default PlatformItem;
