import { ArrowLeft, Check, Loader2, Save, Send } from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import type {
  CreateApplicationForm,
  CreateApplicationPayload,
} from "@/types/application";

import { defaultApplicationForm } from "@/components/admin/application/application-form";

import { useCreateApplication } from "@/services";

import { slugify } from "@/utils/slugify";

import { ApplicationBasicSection } from "@/components/admin/application/form/ApplicationBasicSection";

import { ApplicationInvestmentSection } from "@/components/admin/application/form/ApplicationInvestmentSection";

import { ApplicationPerformanceSection } from "@/components/admin/application/form/ApplicationPerformanceSection";

import { ApplicationHighlights } from "@/components/admin/application/form/ApplicationHighlights";

import { ApplicationRoadmap } from "@/components/admin/application/form/ApplicationRoadmap";

import { ApplicationCountries } from "@/components/admin/application/form/ApplicationCountries";

import { ApplicationFeatures } from "@/components/admin/application/form/ApplicationFeatures";

import { useAppSelector } from "@/redux/hooks";
import CurrencySelect, {
  CurrencyOption,
} from "@/components/shared/CurrencySelect";

export default function ApplicationCreate() {
  const navigate = useNavigate();

  const countries = useAppSelector((state) => state.country.countries);

  const currencies = useAppSelector((state) => state.currency.currencies);

  const [form, setForm] = useState<CreateApplicationForm>(
    defaultApplicationForm,
  );

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const createMutation = useCreateApplication();

  const selectedCurrency =
    currencies?.find(
      (currency: CurrencyOption) => currency.id === form.currencyId,
    ) ?? null;

  console.log("SELECTED CURRENCY", selectedCurrency);

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

  const buildCreateApplicationPayload = (
    currentForm: CreateApplicationForm,
    publish: boolean,
  ): CreateApplicationPayload => {
    if (!currentForm.thumbnailAssetId) {
      throw new Error("Please upload an application thumbnail.");
    }

    return {
      title: currentForm.title.trim(),
      slug: currentForm.slug.trim(),
      shortDescription: currentForm.shortDescription.trim(),
      longDescription: currentForm.longDescription.trim(),
      thumbNailAssetId: currentForm.thumbnailAssetId,

      imageAssetIds: currentForm.images
        .map((image) => image.assetId)
        .filter((assetId) => assetId !== currentForm.thumbnailAssetId),

      investmentStage: currentForm.investmentStage,
      status: currentForm.status,
      isLive: publish,
      isInvestmentEnabled: currentForm.isInvestmentEnabled,
      amountRealized: currentForm.amountRealized,
      valuation: currentForm.valuation,
      projectedReturn: currentForm.projectedReturn,
      monthlyRevenue: currentForm.monthlyRevenue,
      activeInvestors: currentForm.activeInvestors,
      minInvestmentAmount: currentForm.minInvestmentAmount,
      maxInvestmentAmount: currentForm.maxInvestmentAmount,
      investmentCap: currentForm.investmentCap,
      activeUsers: currentForm.activeUsers,
      monthlyVolume: currentForm.monthlyVolume,
      numberOfTransactions: currentForm.numberOfTransactions,
      serverUptime: currentForm.serverUptime,
      averageSpeed: currentForm.averageSpeed,
      currencyId: currentForm.currencyId,

      countryIds: [...new Set(currentForm.countryIds)],

      keyHighlights: currentForm.keyHighlights
        .filter((highlight) => highlight.name.trim().length > 0)
        .map((highlight) => ({
          name: highlight.name.trim(),
          isActive: highlight.isActive,
        })),

      roadmaps: currentForm.roadmaps
        .filter((roadmap) => roadmap.title.trim().length > 0)
        .map((roadmap) => ({
          title: roadmap.title.trim(),
          status: roadmap.status,
          quarter: roadmap.quarter,

          ...(roadmap.year !== null && roadmap.year !== undefined
            ? {
                year: roadmap.year,
              }
            : {}),

          isCompleted: roadmap.isCompleted,
        })),

      appFeatures: currentForm.appFeatures
        .filter((feature) => feature.title.trim().length > 0)
        .map((feature) => ({
          title: feature.title.trim(),

          description: feature.description.trim(),

          items: feature.items
            .filter((item) => item.title.trim().length > 0)
            .map((item) => ({
              title: item.title.trim(),

              description: item.description.trim(),

              icon: item.icon?.trim() || null,

              value:
                item.value !== null && item.value !== undefined
                  ? item.value
                  : null,
            })),
        })),

      appCallToAction: currentForm.appCallToAction
        ? {
            icon: currentForm.appCallToAction.icon.trim(),

            title: currentForm.appCallToAction.title.trim(),

            description: currentForm.appCallToAction.description.trim(),
          }
        : undefined,
    };
  };

  const validate = () => {
    if (!form.title.trim()) {
      toast.error("Platform name is required.");

      return false;
    }

    if (!form.slug.trim()) {
      toast.error("Platform slug is required.");

      return false;
    }

    if (!form.shortDescription.trim()) {
      toast.error("Short description is required.");

      return false;
    }

    if (!form.longDescription.trim()) {
      toast.error("Full description is required.");

      return false;
    }

    if (!form.currencyId) {
      toast.error("Please select an investment currency.");
      return false;
    }

    if (!form.thumbnailAssetId) {
      toast.error("Application thumbnail is required.");

      return false;
    }

    if (
      form.images.some(
        (image) => !image.assetId || image.assetId === form.thumbnailAssetId,
      )
    ) {
      toast.error("Application gallery contains an invalid image.");

      return false;
    }

    if (form.minInvestmentAmount > form.maxInvestmentAmount) {
      toast.error("Minimum investment cannot exceed maximum investment.");

      return false;
    }

    if (form.investmentCap < form.maxInvestmentAmount) {
      toast.error("Investment cap cannot be lower than maximum investment.");

      return false;
    }

    if (form.serverUptime < 0 || form.serverUptime > 100) {
      toast.error("Server uptime must be between 0 and 100.");

      return false;
    }

    if (form.averageSpeed < 0 || !Number.isInteger(form.averageSpeed)) {
      toast.error("Average speed must be a non-negative integer.");

      return false;
    }

    if (form.monthlyVolume < 0 || !Number.isInteger(form.monthlyVolume)) {
      toast.error("Monthly volume must be a non-negative integer.");

      return false;
    }

    if (
      form.numberOfTransactions < 0 ||
      !Number.isInteger(form.numberOfTransactions)
    ) {
      toast.error("Number of transactions must be a non-negative integer.");

      return false;
    }

    for (const [featureIndex, feature] of form.appFeatures.entries()) {
      if (!feature.title.trim()) {
        toast.error(`Feature ${featureIndex + 1}: title is required.`);

        return false;
      }

      if (!feature.description.trim()) {
        toast.error(`Feature ${featureIndex + 1}: description is required.`);

        return false;
      }

      for (const [itemIndex, item] of feature.items.entries()) {
        if (!item.title.trim()) {
          toast.error(
            `Feature ${featureIndex + 1}, item ${
              itemIndex + 1
            }: title is required.`,
          );

          return false;
        }

        if (!item.description.trim()) {
          toast.error(
            `Feature ${featureIndex + 1}, item ${
              itemIndex + 1
            }: description is required.`,
          );

          return false;
        }

        if (item.value !== null && !Number.isFinite(item.value)) {
          toast.error(
            `Feature ${featureIndex + 1}, item ${
              itemIndex + 1
            }: value must be a valid number.`,
          );

          return false;
        }
      }
    }

    return true;
  };

  console.log(form);

  const submit = async (publish: boolean) => {
    if (!validate()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      const payload = buildCreateApplicationPayload(form, publish);

      const result = await createMutation.mutateAsync(payload);

      toast.success(
        publish
          ? "Application created and published."
          : "Application saved as draft.",
      );

      navigate(`/admin-dashboard/applications/${result.id}`);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message;

      toast.error(
        Array.isArray(message)
          ? message[0]
          : message || "Unable to create application.",
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="-ml-3 mb-4"
            onClick={() => navigate("/admin-dashboard/applications")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Button>

          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Platform Management
              </div>

              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Create Application
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Create a complete Techbravery platform profile including
                investment data, performance metrics, capabilities and
                development roadmap.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button
                variant="outline"
                disabled={createMutation.isPending}
                onClick={() => submit(false)}
                className="w-full sm:w-auto"
              >
                {createMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Draft
              </Button>

              <Button
                disabled={createMutation.isPending}
                onClick={() => submit(true)}
                className="w-full bg-gradient-to-r from-primary to-primary-glow sm:w-auto"
              >
                {createMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Create & Publish
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <CurrencySelect
            value={selectedCurrency}
            onChange={(currency) =>
              updateForm({
                currencyId: currency?.id ?? "",
              })
            }
            required
          />

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
        </div>

        <div className="sticky bottom-0 z-20 mt-8 border-t bg-background/95 py-4 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              disabled={createMutation.isPending}
              onClick={() => navigate("/admin-dashboard/applications")}
            >
              Cancel
            </Button>

            <Button
              variant="outline"
              disabled={createMutation.isPending}
              onClick={() => submit(false)}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>

            <Button
              disabled={createMutation.isPending}
              onClick={() => submit(true)}
              className="bg-gradient-to-r from-primary to-primary-glow"
            >
              <Check className="mr-2 h-4 w-4" />
              Create & Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
