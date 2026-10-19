import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Save,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { Switch } from "@/components/ui/switch";

import { Badge } from "@/components/ui/badge";

import { useAppSelector } from "@/redux/hooks";

import { useAdminApplication, useUpdateApplication } from "@/services";

import {
  ApplicationImage,
  CreateApplicationForm,
  UpdateApplicationPayload,
} from "@/types/application";

import { defaultApplicationForm } from "@/components/admin/application/application-form";

import { slugify } from "@/utils/slugify";

import { ApplicationBasicSection } from "@/components/admin/application/form/ApplicationBasicSection";

import { ApplicationInvestmentSection } from "@/components/admin/application/form/ApplicationInvestmentSection";

import { ApplicationPerformanceSection } from "@/components/admin/application/form/ApplicationPerformanceSection";

import { ApplicationHighlights } from "@/components/admin/application/form/ApplicationHighlights";

import { ApplicationRoadmap } from "@/components/admin/application/form/ApplicationRoadmap";

import { ApplicationCountries } from "@/components/admin/application/form/ApplicationCountries";

import { ApplicationFeatures } from "@/components/admin/application/form/ApplicationFeatures";
import Loader from "@/components/loader/Loader";

function applicationToForm(application: any): CreateApplicationForm {
  const thumbnail = application.thumbNail ?? null;

  const images: ApplicationImage[] = (application.images ?? [])
    .filter((image: any) => image?.id && image?.url)
    .map(
      (image: any): ApplicationImage => ({
        assetId: image.id,
        fileId: image.fileId ?? image.id,
        url: image.url,
        name: image.fileName ?? "Application image",
      }),
    );

  return {
    ...defaultApplicationForm,

    title: application.title ?? "",
    slug: application.slug ?? "",
    shortDescription: application.shortDescription ?? "",
    longDescription: application.longDescription ?? "",

    thumbNail: thumbnail?.url ?? "",
    thumbnailAssetId: thumbnail?.id ?? null,
    images,

    investmentStage:
      application.investmentStage ?? defaultApplicationForm.investmentStage,

    status: application.status ?? defaultApplicationForm.status,
    isLive: application.isLive ?? false,
    isInvestmentEnabled: application.isInvestmentEnabled ?? false,

    amountRealized: Number(application.amountRealized ?? 0),
    valuation: Number(application.valuation ?? 0),
    projectedReturn: Number(application.projectedReturn ?? 0),
    monthlyRevenue: Number(application.monthlyRevenue ?? 0),
    activeInvestors: Number(application.activeInvestors ?? 0),
    minInvestmentAmount: Number(application.minInvestmentAmount ?? 0),
    maxInvestmentAmount: Number(application.maxInvestmentAmount ?? 0),
    investmentCap: Number(application.investmentCap ?? 0),
    activeUsers: Number(application.activeUsers ?? 0),
    monthlyVolume: Number(application.monthlyVolume ?? 0),
    numberOfTransactions: Number(application.numberOfTransactions ?? 0),
    serverUptime: Number(application.serverUptime ?? 0),
    averageSpeed: Number(application.averageSpeed ?? 0),

    countryIds: (application.countriesOfCoverage ?? []).map(
      (country: { id: string }) => country.id,
    ),

    keyHighlights: (application.keyHighlights ?? []).map(
      (highlight: { name: string; isActive: boolean }) => ({
        name: highlight.name ?? "",
        isActive: highlight.isActive ?? true,
      }),
    ),

    roadmaps: (application.roadMaps ?? []).map((roadmap: any) => ({
      title: roadmap.title?.trim() ?? "",
      status: roadmap.status,
      quarter: roadmap.quarter,
      currencyId: application.currencyId ?? null,

      // Backend stores Date, frontend form uses numeric year
      year:
        roadmap.year !== null && roadmap.year !== undefined
          ? new Date(roadmap.year).getUTCFullYear()
          : undefined,

      isCompleted: roadmap.isCompleted ?? false,
    })),

    appFeatures: (application.appFeatures ?? []).map(
      (feature: {
        title: string;
        description: string;
        appFeatureItems?: Array<{
          title: string;
          description: string;
          icon: string | null;
          value: number | null;
        }>;
      }) => ({
        title: feature.title ?? "",
        description: feature.description ?? "",

        items: (feature.appFeatureItems ?? []).map((item) => ({
          title: item.title ?? "",
          description: item.description ?? "",
          icon: item.icon ?? "",
          value:
            item.value !== null && item.value !== undefined
              ? Number(item.value)
              : null,
        })),
      }),
    ),

    appCallToAction: application.appCallToAction
      ? {
          icon: application.appCallToAction.icon ?? "",
          title: application.appCallToAction.title ?? "",
          description: application.appCallToAction.description ?? "",
        }
      : null,
  };
}

export default function AdminApplicationEdit() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const countries = useAppSelector((state) => state.country.countries);

  const {
    data: application,
    isLoading,
    isError,
    error,
  } = useAdminApplication(id);

  const updateMutation = useUpdateApplication();

  const [form, setForm] = useState<CreateApplicationForm>(
    defaultApplicationForm,
  );

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(true);

  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!application || hasInitialized) {
      return;
    }

    const hydrated = applicationToForm(application);

    setForm(hydrated);

    setSlugManuallyEdited(true);

    setHasInitialized(true);
  }, [application, hasInitialized]);

  const updateForm = (updates: Partial<CreateApplicationForm>) => {
    setForm((previous) => ({
      ...previous,
      ...updates,
    }));
  };

  const updateTitle = (title: string) => {
    setForm((previous) => ({
      ...previous,

      title,

      ...(slugManuallyEdited
        ? {}
        : {
            slug: slugify(title),
          }),
    }));
  };

  const buildUpdatePayload = (): UpdateApplicationPayload => {
    return {
      title: form.title.trim(),
      slug: form.slug.trim(),
      shortDescription: form.shortDescription.trim(),
      longDescription: form.longDescription.trim(),
      thumbnailAssetId: form.thumbnailAssetId,
      currencyId: form.currencyId,

      imageAssetIds: (form.images ?? [])
        .map((image) => image.assetId)
        .filter(Boolean),

      investmentStage: form.investmentStage,
      status: form.status,
      isLive: form.isLive,
      isInvestmentEnabled: form.isInvestmentEnabled,
      amountRealized: form.amountRealized,
      valuation: form.valuation,
      projectedReturn: form.projectedReturn,
      monthlyRevenue: form.monthlyRevenue,
      activeInvestors: form.activeInvestors,
      minInvestmentAmount: form.minInvestmentAmount,
      maxInvestmentAmount: form.maxInvestmentAmount,
      investmentCap: form.investmentCap,
      activeUsers: form.activeUsers,
      monthlyVolume: form.monthlyVolume,
      numberOfTransactions: form.numberOfTransactions,
      serverUptime: form.serverUptime,
      averageSpeed: form.averageSpeed,
      countryIds: form.countryIds,

      keyHighlights: (form.keyHighlights ?? []).map((highlight) => ({
        name: highlight.name.trim(),
        isActive: highlight.isActive,
      })),

      roadmaps: (form.roadmaps ?? []).map((roadmap) => ({
        title: roadmap.title.trim(),
        status: roadmap.status,
        quarter: roadmap.quarter,
        year: roadmap.year ?? undefined,
        isCompleted: roadmap.isCompleted,
      })),

      appFeatures: (form.appFeatures ?? []).map((feature) => ({
        title: feature.title.trim(),
        description: feature.description.trim(),
        items: (feature.items ?? []).map((item) => ({
          title: item.title.trim(),
          description: item.description.trim(),

          ...(item.icon?.trim()
            ? {
                icon: item.icon.trim(),
              }
            : {}),

          value:
            item.value !== null && item.value !== undefined ? item.value : null,
        })),
      })),

      ...(form.appCallToAction
        ? {
            appCallToAction: {
              icon: form.appCallToAction.icon.trim(),
              title: form.appCallToAction.title.trim(),
              description: form.appCallToAction.description.trim(),
            },
          }
        : {}),
    };
  };

  const validate = () => {
    if (!form.title.trim()) {
      toast.error("Platform name is required");
      return false;
    }

    if (!form.slug.trim()) {
      toast.error("Platform slug is required");
      return false;
    }

    if (!form.shortDescription.trim()) {
      toast.error("Short description is required");
      return false;
    }

    if (!form.longDescription.trim()) {
      toast.error("Full description is required");
      return false;
    }

    if (!form.thumbnailAssetId) {
      toast.error("Application thumbnail is required");
      return false;
    }

    if (!form.images?.length) {
      toast.error("At least one application image is required");
      return false;
    }

    if ((form.images?.length ?? 0) > 30) {
      toast.error("An application cannot have more than 30 gallery images");
      return false;
    }

    if (form.minInvestmentAmount > form.maxInvestmentAmount) {
      toast.error("Minimum investment cannot exceed maximum investment");
      return false;
    }

    if (form.investmentCap < form.maxInvestmentAmount) {
      toast.error("Investment cap cannot be lower than maximum investment");
      return false;
    }

    if (form.isInvestmentEnabled && !form.currencyId) {
      toast.error("Investment currency is required when investment is enabled");

      return false;
    }

    if (
      form.amountRealized < 0 ||
      form.valuation < 0 ||
      form.projectedReturn < 0 ||
      form.monthlyRevenue < 0 ||
      form.activeInvestors < 0 ||
      form.minInvestmentAmount < 0 ||
      form.maxInvestmentAmount < 0 ||
      form.investmentCap < 0 ||
      form.activeUsers < 0 ||
      form.monthlyVolume < 0 ||
      form.numberOfTransactions < 0 ||
      form.averageSpeed < 0
    ) {
      toast.error("Numeric values cannot be negative");
      return false;
    }

    if (form.serverUptime < 0 || form.serverUptime > 100) {
      toast.error("Server uptime must be between 0 and 100");
      return false;
    }

    if (!form.countryIds || form.countryIds.length === 0) {
      toast.error("Select at least one country of coverage");
      return false;
    }

    for (const [featureIndex, feature] of (form.appFeatures ?? []).entries()) {
      if (!feature.title.trim()) {
        toast.error(`Feature ${featureIndex + 1}: title is required`);
        return false;
      }

      if (!feature.description.trim()) {
        toast.error(`Feature ${featureIndex + 1}: description is required`);
        return false;
      }

      for (const [itemIndex, item] of (feature.items ?? []).entries()) {
        if (!item.title.trim()) {
          toast.error(
            `Feature ${featureIndex + 1}, item ${
              itemIndex + 1
            }: title is required`,
          );
          return false;
        }

        if (!item.description.trim()) {
          toast.error(
            `Feature ${featureIndex + 1}, item ${
              itemIndex + 1
            }: description is required`,
          );
          return false;
        }

        if (
          item.value !== null &&
          item.value !== undefined &&
          !Number.isFinite(item.value)
        ) {
          toast.error(
            `Feature ${featureIndex + 1}, item ${
              itemIndex + 1
            }: value must be a valid number`,
          );
          return false;
        }
      }
    }

    for (const [index, highlight] of (form.keyHighlights ?? []).entries()) {
      if (!highlight.name.trim()) {
        toast.error(`Highlight ${index + 1}: name is required`);
        return false;
      }
    }

    for (const [index, roadmap] of (form.roadmaps ?? []).entries()) {
      if (!roadmap.title.trim()) {
        toast.error(`Roadmap ${index + 1}: title is required`);
        return false;
      }
    }

    if (form.appCallToAction) {
      if (!form.appCallToAction.title.trim()) {
        toast.error("CTA title is required");
        return false;
      }

      if (!form.appCallToAction.description.trim()) {
        toast.error("CTA description is required");
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!id) {
      toast.error("Application ID is missing");
      return;
    }

    if (!validate()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      const payload = buildUpdatePayload();

      const res = await updateMutation.mutateAsync({
        id,
        payload,
      });

      setForm(applicationToForm(res));
      toast.success("Application updated successfully");

      navigate(`/admin-dashboard/applications/${id}`);
    } catch (error: any) {
      const message = error?.response?.data?.message;

      toast.error(
        Array.isArray(message)
          ? message[0]
          : message || "Unable to update application",
      );
    }
  };

  if (isLoading) {
    return <Loader type="bounce" />;
  }

  // if (isError || !application || !hasInitialized) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center px-4">
  //       <Card className="w-full max-w-lg">
  //         <CardContent className="p-8 text-center">
  //           <h1 className="text-2xl font-bold">Unable to load application</h1>

  //           <p className="mt-2 text-sm text-muted-foreground">
  //             {error instanceof Error
  //               ? error.message
  //               : "The requested application could not be loaded."}
  //           </p>

  //           <Button
  //             className="mt-6"
  //             onClick={() => navigate("/admin-dashboard/applications")}
  //           >
  //             <ArrowLeft className="mr-2 h-4 w-4" />
  //             Back to Applications
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-muted/30 mt-20">
      <div className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/admin-dashboard/applications/${id}`)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-xl font-bold sm:text-2xl">
                    Edit Application
                  </h1>

                  <Badge variant="outline">{form.investmentStage}</Badge>

                  {form.isLive ? (
                    <Badge className="bg-emerald-600">
                      <Eye className="mr-1 h-3 w-3" />
                      Live
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <EyeOff className="mr-1 h-3 w-3" />
                      Draft
                    </Badge>
                  )}
                </div>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {form.title || "Untitled application"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/admin-dashboard/applications/${id}`)}
                disabled={updateMutation.isPending}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleSave}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}

                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* =========================================
            PUBLICATION / INVESTMENT CONTROLS
        ========================================= */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Application Controls
            </CardTitle>

            <CardDescription>
              Control the visibility and investment availability of this
              application.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {/* LIVE */}

              <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    {form.isLive ? (
                      <Eye className="h-5 w-5 text-primary" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  <div>
                    <p className="font-medium">Public Visibility</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {form.isLive
                        ? "This application is visible on the public platform."
                        : "This application is hidden from the public platform."}
                    </p>
                  </div>
                </div>

                <Switch
                  checked={form.isLive}
                  onCheckedChange={(checked) =>
                    updateForm({
                      isLive: checked,
                    })
                  }
                />
              </div>

              {/* INVESTMENT */}

              <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="font-medium">Investment Availability</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {form.isInvestmentEnabled
                        ? "Investors can interact with this investment offering."
                        : "Investment functionality is currently disabled."}
                    </p>
                  </div>
                </div>

                <Switch
                  checked={form.isInvestmentEnabled}
                  onCheckedChange={(checked) =>
                    updateForm({
                      isInvestmentEnabled: checked,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <ApplicationBasicSection
          value={form}
          onChange={updateForm}
          onTitleChange={updateTitle}
        />

        <ApplicationInvestmentSection value={form} onChange={updateForm} />

        <ApplicationHighlights value={form} onChange={updateForm} />

        <ApplicationFeatures value={form} onChange={updateForm} />

        <ApplicationPerformanceSection value={form} onChange={updateForm} />

        <ApplicationCountries
          value={form}
          onChange={updateForm}
          countries={countries}
        />

        <ApplicationRoadmap value={form} onChange={updateForm} />

        <Card>
          <CardHeader>
            <CardTitle>Review & Save</CardTitle>

            <CardDescription>
              Review the application configuration before saving your changes.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border p-4">
                <p className="text-xs text-muted-foreground">Application</p>

                <p className="mt-1 font-semibold">{form.title || "Untitled"}</p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-xs text-muted-foreground">Visibility</p>

                <p className="mt-1 font-semibold">
                  {form.isLive ? "Public" : "Draft"}
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-xs text-muted-foreground">Countries</p>

                <p className="mt-1 font-semibold">
                  {form.countryIds?.length ?? 0}
                </p>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-xs text-muted-foreground">Features</p>

                <p className="mt-1 font-semibold">
                  {form.appFeatures?.length ?? 0}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/admin-dashboard/applications/${id}`)}
                disabled={updateMutation.isPending}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleSave}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Save Application
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
