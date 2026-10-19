import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Globe2,
  Image as ImageIcon,
  Landmark,
  LayoutDashboard,
  Mail,
  MapPin,
  Pencil,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  Activity,
  BarChart3,
  Gauge,
  Database,
  ExternalLink,
  XCircle,
  CircleAlert,
  FileText,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { useAdminApplication } from "@/services";
import { normalizeImageUrl } from "@/utils/normalizeImageUrl ";

const formatCurrency = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
};

const formatNumber = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-US").format(number);
};

const formatDate = (value: string | Date | null | undefined) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatYear = (value: string | Date | null | undefined) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return String(date.getFullYear());
};

const statusLabel = (value?: string | null) => {
  if (!value) return "Unknown";

  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const statusClass = (status?: string | null) => {
  switch (status) {
    case "LIVE":
    case "ACTIVE":
    case "COMPLETED":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";

    case "DEVELOPMENT":
    case "PLANNED":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";

    case "PAUSED":
    case "PENDING":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";

    case "CANCELLED":
    case "REJECTED":
      return "bg-red-500/10 text-red-600 border-red-500/20";

    default:
      return "bg-muted text-muted-foreground";
  }
};

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  description?: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>

            <p className="mt-2 text-2xl font-bold tracking-tight break-words">
              {value}
            </p>

            {description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <div className="shrink-0 rounded-xl bg-primary/10 p-3">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-primary/10 p-2.5">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

const AdminApplication = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const {
    data: application,
    isLoading,
    isError,
    error,
  } = useAdminApplication(id);

  console.log("APPLICATION", application);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background w-full">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Skeleton className="h-10 w-48" />

            <Skeleton className="h-72 w-full rounded-2xl" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-32 rounded-xl" />
              ))}
            </div>

            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4">
        <Card className="w-full max-w-lg">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-red-500/10 p-4">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>

            <h1 className="mt-5 text-2xl font-bold">Application not found</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "The application could not be loaded."}
            </p>

            <Button
              className="mt-6"
              onClick={() => navigate("/admin-dashboard/applications")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const countries = application.countriesOfCoverage ?? [];

  const features = application.appFeatures ?? [];

  const highlights = application.keyHighlights ?? [];

  const roadmap = application.roadMaps ?? [];

  const investments = application.investments ?? [];

  const activeHighlights = highlights.filter((item) => item.isActive);

  const completedRoadmap = roadmap.filter((item) => item.isCompleted);

  const roadmapProgress =
    roadmap.length > 0
      ? Math.round((completedRoadmap.length / roadmap.length) * 100)
      : 0;

  const investmentProgress =
    Number(application.investmentCap) > 0
      ? Math.min(
          100,
          Math.round(
            (Number(application.amountRealized) /
              Number(application.investmentCap)) *
              100,
          ),
        )
      : 0;

  return (
    <div className="min-h-screen bg-muted/30 mt-20">
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="border-b bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin-dashboard/applications")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-xl font-bold sm:text-2xl">
                    {application.title}
                  </h1>

                  <Badge
                    variant="outline"
                    className={statusClass(application.status)}
                  >
                    {statusLabel(application.status)}
                  </Badge>

                  {application.isLive ? (
                    <Badge className="bg-emerald-600">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Live
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </div>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  /{application.slug}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link
                  to={`/platforms/${application.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Public Page
                </Link>
              </Button>

              <Button asChild>
                <Link
                  to={`/admin-dashboard/applications/${application.id}/edit`}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Application
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        {/* ==========================================
            HERO / OVERVIEW
        ========================================== */}

        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-[320px_1fr]">
            <div className="relative aspect-video bg-muted lg:aspect-auto lg:min-h-[300px]">
              {application.thumbNail ? (
                <img
                  src={normalizeImageUrl(application.thumbNail)}
                  alt={application.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/40" />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  {statusLabel(application.investmentStage)}
                </Badge>

                <Badge
                  variant="outline"
                  className={statusClass(application.status)}
                >
                  {statusLabel(application.status)}
                </Badge>
              </div>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                {application.title}
              </h2>

              <p className="mt-3 max-w-3xl text-muted-foreground">
                {application.shortDescription}
              </p>

              {application.longDescription && (
                <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
                  {application.longDescription}
                </p>
              )}

              <Separator className="my-6" />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(application.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(application.updatedAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Application ID
                  </p>

                  <p className="mt-1 break-all font-mono text-xs">
                    {application.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Owner</p>

                  <p className="mt-1 text-sm font-medium">
                    {application.user
                      ? `${application.user.firstName} ${application.user.lastName}`
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ==========================================
            KEY METRICS
        ========================================== */}

        <section className="space-y-4">
          <SectionHeader
            icon={BarChart3}
            title="Platform Metrics"
            description="Current operational and platform performance metrics."
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Users}
              label="Active Users"
              value={formatNumber(application.activeUsers)}
            />

            <StatCard
              icon={Wallet}
              label="Active Investors"
              value={formatNumber(application.activeInvestors)}
            />

            <StatCard
              icon={CircleDollarSign}
              label="Monthly Revenue"
              value={formatCurrency(application.monthlyRevenue)}
            />

            <StatCard
              icon={Activity}
              label="Monthly Volume"
              value={formatNumber(application.monthlyVolume)}
            />

            <StatCard
              icon={Database}
              label="Transactions"
              value={formatNumber(application.numberOfTransactions)}
            />

            <StatCard
              icon={Gauge}
              label="Average Speed"
              value={
                application.averageSpeed
                  ? `${application.averageSpeed} ms`
                  : "—"
              }
            />

            <StatCard
              icon={ShieldCheck}
              label="Server Uptime"
              value={`${application.serverUptime}%`}
            />

            <StatCard
              icon={Globe2}
              label="Countries"
              value={countries.length}
              description="Countries currently covered"
            />
          </div>
        </section>

        {/* ==========================================
            INVESTMENT
        ========================================== */}

        <section className="space-y-4">
          <SectionHeader
            icon={TrendingUp}
            title="Investment Overview"
            description="Capital, valuation and investment configuration."
          />

          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Investment Stage
                  </p>

                  <p className="mt-1 font-semibold">
                    {statusLabel(application.investmentStage)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Valuation</p>

                  <p className="mt-1 font-semibold">
                    {formatCurrency(application.valuation)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Amount Realized
                  </p>

                  <p className="mt-1 font-semibold">
                    {formatCurrency(application.amountRealized)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Investment Cap
                  </p>

                  <p className="mt-1 font-semibold">
                    {formatCurrency(application.investmentCap)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Minimum Investment
                  </p>

                  <p className="mt-1 font-semibold">
                    {formatCurrency(application.minInvestmentAmount)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Maximum Investment
                  </p>

                  <p className="mt-1 font-semibold">
                    {formatCurrency(application.maxInvestmentAmount)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Projected Return
                  </p>

                  <p className="mt-1 font-semibold">
                    {formatCurrency(application.projectedReturn)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Investment Status
                  </p>

                  <Badge
                    variant={application.isLive ? "default" : "secondary"}
                    className="mt-2"
                  >
                    {application.isLive ? "Enabled" : "Disabled"}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Investment Records
                  </p>

                  <p className="mt-1 font-semibold">{investments.length}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Capital Progress</p>

                    <p className="text-xs text-muted-foreground">
                      Amount realized against investment cap
                    </p>
                  </div>

                  <span className="text-sm font-semibold">
                    {investmentProgress}%
                  </span>
                </div>

                <Progress value={investmentProgress} />
              </div>
            </CardContent>
          </Card>
        </section>

        {application.images?.length > 0 && (
          <section className="space-y-4">
            <SectionHeader
              icon={ImageIcon}
              title="Application Images"
              description="Images currently associated with this application."
            />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {application.images.map((image, index) => {
                const imageUrl = normalizeImageUrl(
                  typeof image === "string" ? image : image,
                );

                if (!imageUrl) {
                  return null;
                }

                return (
                  <Card
                    key={`${imageUrl}-${index}`}
                    className="overflow-hidden"
                  >
                    <div className="aspect-video bg-muted">
                      <img
                        src={imageUrl}
                        alt={`${application.title} ${index + 1}`}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* ==========================================
            HIGHLIGHTS
        ========================================== */}

        {highlights.length > 0 && (
          <section className="space-y-4">
            <SectionHeader
              icon={CheckCircle2}
              title="Key Highlights"
              description="Important capabilities and selling points."
            />

            <Card>
              <CardContent className="p-6">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight.id}
                      className="flex items-start gap-3 rounded-xl border bg-background p-4"
                    >
                      {highlight.isActive ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                      ) : (
                        <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      )}

                      <div>
                        <p className="font-medium">{highlight.name}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {highlight.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ==========================================
            FEATURES
        ========================================== */}

        {features.length > 0 && (
          <section className="space-y-4">
            <SectionHeader
              icon={LayoutDashboard}
              title="Application Features"
              description="Feature groups and their individual capabilities."
            />

            <div className="space-y-4">
              {features.map((feature) => (
                <Card key={feature.id}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>

                    {feature.description && (
                      <CardDescription>{feature.description}</CardDescription>
                    )}
                  </CardHeader>

                  <CardContent>
                    {feature.appFeatureItems?.length ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        {feature.appFeatureItems.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl border bg-muted/20 p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <h4 className="font-medium">{item.title}</h4>

                                {item.description && (
                                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              {item.value !== null &&
                                item.value !== undefined && (
                                  <Badge
                                    variant="secondary"
                                    className="shrink-0"
                                  >
                                    {formatNumber(item.value)}
                                  </Badge>
                                )}
                            </div>

                            {item.icon && (
                              <p className="mt-3 text-xs text-muted-foreground">
                                Icon: {item.icon}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No feature items available.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ==========================================
            COUNTRY COVERAGE
        ========================================== */}

        <section className="space-y-4">
          <SectionHeader
            icon={Globe2}
            title="Country Coverage"
            description={`${countries.length} ${
              countries.length === 1 ? "country" : "countries"
            } associated with this application.`}
          />

          <Card>
            <CardContent className="p-6">
              {countries.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {countries.map((country) => (
                    <div
                      key={country.id}
                      className="flex items-center justify-center rounded-xl border p-4"
                    >
                      {country.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <MapPin className="mx-auto h-8 w-8 text-muted-foreground/50" />

                  <p className="mt-3 text-sm text-muted-foreground">
                    No countries assigned.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* ==========================================
            ROADMAP
        ========================================== */}

        {roadmap.length > 0 && (
          <section className="space-y-4">
            <SectionHeader
              icon={Rocket}
              title="Roadmap"
              description="Development milestones and planned expansion."
            />

            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Roadmap Progress</p>

                      <p className="text-xs text-muted-foreground">
                        {completedRoadmap.length} of {roadmap.length} milestones
                        completed
                      </p>
                    </div>

                    <span className="font-semibold">{roadmapProgress}%</span>
                  </div>

                  <Progress value={roadmapProgress} />
                </div>

                <div className="space-y-4">
                  {roadmap.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-xl border p-4"
                    >
                      <div className="mt-0.5 shrink-0">
                        {item.isCompleted ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        ) : (
                          <Clock3 className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>

                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline">{item.quarter}</Badge>

                              <Badge
                                variant="outline"
                                className={statusClass(item.status)}
                              >
                                {statusLabel(item.status)}
                              </Badge>

                              {item.year && (
                                <Badge variant="secondary">
                                  {formatYear(item.year)}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <Badge
                            variant={item.isCompleted ? "default" : "secondary"}
                          >
                            {item.isCompleted ? "Completed" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ==========================================
            CTA
        ========================================== */}

        {application.appCallToAction && (
          <section className="space-y-4">
            <SectionHeader
              icon={Rocket}
              title="Call To Action"
              description="Public-facing call-to-action configuration."
            />

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {application.appCallToAction.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {application.appCallToAction.description}
                    </p>

                    {application.appCallToAction.icon && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        Icon: {application.appCallToAction.icon}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* ==========================================
            INVESTMENT RECORDS
        ========================================== */}

        <section className="space-y-4">
          <SectionHeader
            icon={Landmark}
            title="Investment Records"
            description="Investment activity associated with this application."
          />

          <Card>
            <CardContent className="p-0">
              {investments.length > 0 ? (
                <div className="divide-y">
                  {investments.map((investment) => (
                    <div
                      key={investment.id}
                      className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium">Investment</p>

                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                          {investment.id}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatDate(investment.createdAt)}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        {/* <p className="font-semibold">
                          {formatCurrency(investment.amount)}
                        </p> */}

                        {investment.status && (
                          <Badge variant="outline" className="mt-2">
                            {statusLabel(investment.status)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-12 text-center">
                  <Wallet className="mx-auto h-9 w-9 text-muted-foreground/40" />

                  <h3 className="mt-4 font-semibold">No investments yet</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    There are currently no investment records associated with
                    this application.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* ==========================================
            OWNER / AUDIT INFORMATION
        ========================================== */}

        <section className="space-y-4">
          <SectionHeader
            icon={ShieldCheck}
            title="Application Administration"
            description="Ownership and audit information."
          />

          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Application Owner
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2.5">
                      <Users className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="font-medium">
                        {application.user
                          ? `${application.user.firstName} ${application.user.lastName}`
                          : "Unknown"}
                      </p>

                      {application.user?.email && (
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" />
                          {application.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Lifecycle</p>

                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm">Public visibility</span>

                      <Badge
                        variant={application.isLive ? "default" : "secondary"}
                      >
                        {application.isLive ? "Live" : "Hidden"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm">Investment enabled</span>

                      <Badge
                        variant={
                          application.isInvestmentEnabled
                            ? "default"
                            : "secondary"
                        }
                      >
                        {application.isInvestmentEnabled
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm">Created</span>

                      <span className="text-sm text-muted-foreground">
                        {formatDate(application.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm">Updated</span>

                      <span className="text-sm text-muted-foreground">
                        {formatDate(application.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ==========================================
            BOTTOM ACTIONS
        ========================================== */}

        <div className="flex flex-col gap-3 border-t pt-6 pb-10 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/admin-dashboard/applications")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" asChild>
              <Link
                to={`/platforms/${application.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Public Page
              </Link>
            </Button>

            <Button asChild>
              <Link to={`/admin-dashboard/applications/${application.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Application
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminApplication;
