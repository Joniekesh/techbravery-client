import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock3,
  DollarSign,
  ExternalLink,
  Globe2,
  Image as ImageIcon,
  Lock,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useApplication } from "@/services";
import { normalizeImageUrl } from "@/utils/normalizeImageUrl ";
import { getFlagUrl } from "@/utils/getFlagUrl";

const formatCurrency = (value: string | number | null | undefined) => {
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

const formatStage = (value?: string | null) => {
  if (!value) return "—";

  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatYear = (value: string | Date | null | undefined) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return String(date.getFullYear());
};

const getInvestmentProgress = (
  amountRealized: string | number | null | undefined,
  investmentCap: string | number | null | undefined,
) => {
  const realized = Number(amountRealized ?? 0);
  const cap = Number(investmentCap ?? 0);

  if (!cap || cap <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((realized / cap) * 100));
};

const statusClass = (status?: string | null) => {
  switch (status) {
    case "LIVE":
    case "ACTIVE":
    case "COMPLETED":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600";

    case "DEVELOPMENT":
    case "PLANNED":
      return "border-blue-500/20 bg-blue-500/10 text-blue-600";

    case "PAUSED":
    case "PENDING":
      return "border-amber-500/20 bg-amber-500/10 text-amber-600";

    case "CANCELLED":
    case "REJECTED":
      return "border-red-500/20 bg-red-500/10 text-red-600";

    default:
      return "bg-muted text-muted-foreground";
  }
};

function MetricCard({
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
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>

            <p className="mt-2 truncate text-2xl font-bold tracking-tight">
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

function SectionHeading({
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
      <div className="rounded-xl bg-primary/10 p-2.5">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

const PlatformDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: application, isLoading, isError } = useApplication(id);

  console.log("APPLICTION", application);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-40" />

          <Skeleton className="h-[420px] w-full rounded-2xl" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-32 rounded-xl" />
            ))}
          </div>

          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-lg">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="rounded-full bg-red-500/10 p-4">
              <Lock className="h-8 w-8 text-red-500" />
            </div>

            <h1 className="mt-5 text-2xl font-bold">Platform Not Found</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              The platform you're looking for does not exist or is no longer
              available.
            </p>

            <Button className="mt-6" asChild>
              <Link to="/platforms">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Platforms
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const countries = application.countriesOfCoverage ?? [];
  const highlights =
    application.keyHighlights?.filter((item) => item.isActive) ?? [];

  const features = application.appFeatures ?? [];
  const roadmap = application.roadMaps ?? [];
  const images = application.images ?? [];

  const completedRoadmap = roadmap.filter((item) => item.isCompleted);

  const roadmapProgress =
    roadmap.length > 0
      ? Math.round((completedRoadmap.length / roadmap.length) * 100)
      : 0;

  const investmentProgress = getInvestmentProgress(
    application.amountRealized,
    application.investmentCap,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* =========================================
          HERO
      ========================================= */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary-glow/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/platforms">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Platforms
              </Link>
            </Button>
          </div>

          <div className="grid overflow-hidden rounded-3xl border bg-background/80 shadow-sm backdrop-blur lg:grid-cols-[0.9fr_1.1fr]">
            {/* Hero image */}
            <div className="relative min-h-[300px] bg-muted lg:min-h-[520px]">
              {application.thumbNail ? (
                <img
                  src={application.thumbNail.url}
                  alt={application.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                <Badge className="border-emerald-400/30 bg-emerald-500/90 text-white">
                  {application.isLive ? "Live Platform" : "Not Live"}
                </Badge>

                <Badge className="bg-background/90 text-foreground">
                  {formatStage(application.investmentStage)}
                </Badge>
              </div>
            </div>

            {/* Hero content */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  {formatStage(application.status)}
                </Badge>

                <Badge variant="outline">
                  {formatStage(application.investmentStage)}
                </Badge>

                {application.isInvestmentEnabled && (
                  <Badge className="bg-primary">Investment Open</Badge>
                )}
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {application.title}
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                {application.shortDescription}
              </p>

              {application.longDescription && (
                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                  {application.longDescription}
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {application.isInvestmentEnabled && (
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                    asChild
                  >
                    <Link to="/investor-dashboard">
                      <DollarSign className="mr-2 h-5 w-5" />
                      Investment Opportunities
                    </Link>
                  </Button>
                )}

                {application.appCallToAction && (
                  <Button size="lg" variant="outline">
                    {application.appCallToAction.title}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* =========================================
            METRICS
        ========================================= */}
        <section className="space-y-6">
          <SectionHeading
            icon={BarChart3}
            title="Platform Metrics"
            description="Current operational and performance indicators."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={Users}
              label="Active Users"
              value={formatNumber(application.activeUsers)}
            />

            <MetricCard
              icon={DollarSign}
              label="Monthly Revenue"
              value={formatCurrency(application.monthlyRevenue)}
            />

            <MetricCard
              icon={BarChart3}
              label="Monthly Volume"
              value={formatNumber(application.monthlyVolume)}
            />

            <MetricCard
              icon={TrendingUp}
              label="Transactions"
              value={formatNumber(application.numberOfTransactions)}
            />

            <MetricCard
              icon={Globe2}
              label="Countries"
              value={countries.length}
            />

            <MetricCard
              icon={Users}
              label="Active Investors"
              value={formatNumber(application.activeInvestors)}
            />

            <MetricCard
              icon={ShieldCheck}
              label="Server Uptime"
              value={`${application.serverUptime ?? 0}%`}
            />

            <MetricCard
              icon={Clock3}
              label="Average Speed"
              value={
                application.averageSpeed
                  ? `${application.averageSpeed} ms`
                  : "—"
              }
            />
          </div>
        </section>

        {/* =========================================
            INVESTMENT
        ========================================= */}
        {(application.investmentCap ||
          application.valuation ||
          application.minInvestmentAmount) && (
          <section className="space-y-6">
            <SectionHeading
              icon={TrendingUp}
              title="Investment Overview"
              description="Current funding and investment information."
            />

            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Investment Stage
                    </p>

                    <p className="mt-1 font-semibold">
                      {formatStage(application.investmentStage)}
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
                      Funding Target
                    </p>

                    <p className="mt-1 font-semibold">
                      {formatCurrency(application.investmentCap)}
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
                      Investment Availability
                    </p>

                    <Badge
                      className="mt-2"
                      variant={
                        application.isInvestmentEnabled
                          ? "default"
                          : "secondary"
                      }
                    >
                      {application.isInvestmentEnabled ? "Open" : "Closed"}
                    </Badge>
                  </div>
                </div>

                {Number(application.investmentCap) > 0 && (
                  <>
                    <Separator className="my-8" />

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">Funding Progress</p>

                          <p className="text-xs text-muted-foreground">
                            Amount realized against funding target
                          </p>
                        </div>

                        <span className="font-semibold">
                          {investmentProgress}%
                        </span>
                      </div>

                      <Progress value={investmentProgress} />

                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>
                          {formatCurrency(application.amountRealized)}
                        </span>

                        <span>{formatCurrency(application.investmentCap)}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </section>
        )}

        {/* =========================================
            HIGHLIGHTS
        ========================================= */}
        {highlights.length > 0 && (
          <section className="space-y-6">
            <SectionHeading
              icon={CheckCircle2}
              title="Key Highlights"
              description="Core capabilities and differentiating features."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((highlight) => (
                <Card key={highlight.id} className="border-border/60">
                  <CardContent className="p-5">
                    <CheckCircle2 className="h-6 w-6 text-primary" />

                    <h3 className="mt-4 font-semibold">{highlight.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            FEATURES
        ========================================= */}
        {features.length > 0 && (
          <section className="space-y-6">
            <SectionHeading
              icon={Rocket}
              title="Platform Features"
              description="Capabilities and functionality available on the platform."
            />

            <div className="grid gap-6 lg:grid-cols-2">
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
                      <div className="grid gap-3 sm:grid-cols-2">
                        {feature.appFeatureItems.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl border bg-muted/20 p-4"
                          >
                            <h4 className="font-medium">{item.title}</h4>

                            {item.description && (
                              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                {item.description}
                              </p>
                            )}

                            {item.value !== null &&
                              item.value !== undefined && (
                                <Badge variant="secondary" className="mt-3">
                                  {formatNumber(item.value)}
                                </Badge>
                              )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No feature details available.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            IMAGES
        ========================================= */}
        {images.length > 0 && (
          <section className="space-y-6">
            <SectionHeading
              icon={ImageIcon}
              title="Platform Gallery"
              description="Images from the platform and product ecosystem."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {images.map((image, index) => {
                const imageUrl = normalizeImageUrl(image);

                if (!imageUrl) return null;

                return (
                  <Card
                    key={`${imageUrl}-${index}`}
                    className="group overflow-hidden"
                  >
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={imageUrl}
                        alt={`${application.title} ${index + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* =========================================
            COUNTRY COVERAGE
        ========================================= */}
        <section className="space-y-6">
          <SectionHeading
            icon={Globe2}
            title="Country Coverage"
            description={`${countries.length} ${
              countries.length === 1 ? "country" : "countries"
            } currently covered by the platform.`}
          />

          <Card>
            <CardContent className="p-6">
              {countries.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {countries.map((country) => (
                    <div
                      key={country.id}
                      className="flex items-center gap-3 rounded-xl border bg-muted/20 p-4"
                    >
                      <img
                        src={getFlagUrl(country.iso2) ?? ""}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 shrink-0 rounded-full border border-border/60 object-cover shadow-sm"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <div>
                        <p className="font-medium">{country.name}</p>

                        <p className="text-xs text-muted-foreground">
                          {country.iso2}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No countries available.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* =========================================
            ROADMAP
        ========================================= */}
        {roadmap.length > 0 && (
          <section className="space-y-6">
            <SectionHeading
              icon={Rocket}
              title="Roadmap"
              description="Product development milestones and expansion plans."
            />

            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="mb-8">
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
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>

                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline">{item.quarter}</Badge>

                              <Badge
                                variant="outline"
                                className={statusClass(item.status)}
                              >
                                {formatStage(item.status)}
                              </Badge>

                              <Badge variant="secondary">
                                {formatYear(item.year)}
                              </Badge>
                            </div>
                          </div>

                          <Badge
                            variant={item.isCompleted ? "default" : "secondary"}
                          >
                            {item.isCompleted ? "Completed" : "Planned"}
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

        {/* =========================================
            CTA
        ========================================= */}
        {application.appCallToAction && (
          <section>
            <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 to-primary-glow/10">
              <CardContent className="p-8 text-center sm:p-12">
                <Rocket className="mx-auto h-10 w-10 text-primary" />

                <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                  {application.appCallToAction.title}
                </h2>

                {application.appCallToAction.description && (
                  <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                    {application.appCallToAction.description}
                  </p>
                )}

                <Button
                  size="lg"
                  className="mt-6 bg-gradient-to-r from-primary to-primary-glow"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
};

export default PlatformDetail;
