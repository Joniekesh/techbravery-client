import {
  Plus,
  Trash2,
  Layers3,
  ListPlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import type {
  ApplicationFeatureForm,
  ApplicationFeatureItemForm,
  CreateApplicationForm,
} from "@/types/application";

interface ApplicationFeaturesProps {
  value: CreateApplicationForm;
  onChange: (updates: Partial<CreateApplicationForm>) => void;
}

const createEmptyFeatureItem = (): ApplicationFeatureItemForm => ({
  title: "",
  description: "",
  icon: null,
  value: null,
});

const createEmptyFeature = (): ApplicationFeatureForm => ({
  title: "",
  description: "",
  items: [],
});

export function ApplicationFeatures({
  value,
  onChange,
}: ApplicationFeaturesProps) {
  const [collapsedFeatures, setCollapsedFeatures] = useState<number[]>([]);

  const features = value.appFeatures ?? [];

  const updateFeatures = (nextFeatures: ApplicationFeatureForm[]) => {
    onChange({
      appFeatures: nextFeatures,
    });
  };

  const addFeature = () => {
    updateFeatures([...features, createEmptyFeature()]);
  };

  const removeFeature = (featureIndex: number) => {
    updateFeatures(features.filter((_, index) => index !== featureIndex));

    setCollapsedFeatures((previous) =>
      previous
        .filter((index) => index !== featureIndex)
        .map((index) => (index > featureIndex ? index - 1 : index)),
    );
  };

  const updateFeature = (
    featureIndex: number,
    updates: Partial<ApplicationFeatureForm>,
  ) => {
    updateFeatures(
      features.map((feature, index) =>
        index === featureIndex
          ? {
              ...feature,
              ...updates,
            }
          : feature,
      ),
    );
  };

  const addFeatureItem = (featureIndex: number) => {
    const feature = features[featureIndex];

    if (!feature) return;

    updateFeature(featureIndex, {
      items: [...(feature.items ?? []), createEmptyFeatureItem()],
    });
  };

  const removeFeatureItem = (featureIndex: number, itemIndex: number) => {
    const feature = features[featureIndex];

    if (!feature) return;

    updateFeature(featureIndex, {
      items: feature.items.filter((_, index) => index !== itemIndex),
    });
  };

  const updateFeatureItem = (
    featureIndex: number,
    itemIndex: number,
    updates: Partial<ApplicationFeatureItemForm>,
  ) => {
    const feature = features[featureIndex];

    if (!feature) return;

    updateFeature(featureIndex, {
      items: feature.items.map((item, index) =>
        index === itemIndex
          ? {
              ...item,
              ...updates,
            }
          : item,
      ),
    });
  };

  const toggleFeature = (featureIndex: number) => {
    setCollapsedFeatures((previous) =>
      previous.includes(featureIndex)
        ? previous.filter((index) => index !== featureIndex)
        : [...previous, featureIndex],
    );
  };

  const totalItems = features.reduce(
    (total, feature) => total + (feature.items?.length ?? 0),
    0,
  );

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Layers3 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <CardTitle>Application Features</CardTitle>

              <CardDescription className="mt-1">
                Organize your platform capabilities into feature groups and
                individual feature items.
              </CardDescription>
            </div>
          </div>

          <Button
            type="button"
            onClick={addFeature}
            className="w-full shrink-0 sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Feature
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {features.length} {features.length === 1 ? "feature" : "features"}
          </span>

          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {totalItems} {totalItems === 1 ? "feature item" : "feature items"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="min-w-0 space-y-5">
        {features.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-4 py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Layers3 className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="font-semibold">No features added yet</h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Add feature groups to describe what your platform offers.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={addFeature}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add First Feature
            </Button>
          </div>
        ) : (
          features.map((feature, featureIndex) => {
            const isCollapsed = collapsedFeatures.includes(featureIndex);

            return (
              <Card
                key={featureIndex}
                className="min-w-0 border-border/70 shadow-none"
              >
                <CardHeader className="space-y-3 p-4 sm:p-5">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                      {String(featureIndex + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="break-words font-semibold">
                        {feature.title.trim() || `Feature ${featureIndex + 1}`}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {feature.items.length}{" "}
                        {feature.items.length === 1 ? "item" : "items"}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFeature(featureIndex)}
                      >
                        {isCollapsed ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronUp className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeFeature(featureIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {!isCollapsed && (
                  <CardContent className="min-w-0 space-y-5 px-4 pb-5 sm:px-5">
                    <Separator />

                    {/* Feature */}
                    <div className="grid min-w-0 grid-cols-1 gap-4">
                      <div className="min-w-0 space-y-2">
                        <Label>
                          Feature Title{" "}
                          <span className="text-destructive">*</span>
                        </Label>

                        <Input
                          value={feature.title}
                          onChange={(event) =>
                            updateFeature(featureIndex, {
                              title: event.target.value,
                            })
                          }
                          placeholder="e.g. Payment Management"
                          maxLength={150}
                        />
                      </div>

                      <div className="min-w-0 space-y-2">
                        <Label>
                          Feature Description{" "}
                          <span className="text-destructive">*</span>
                        </Label>

                        <Textarea
                          value={feature.description}
                          onChange={(event) =>
                            updateFeature(featureIndex, {
                              description: event.target.value,
                            })
                          }
                          placeholder="Describe this feature group..."
                          rows={3}
                          maxLength={2000}
                        />
                      </div>
                    </div>

                    {/* Items */}
                    <div className="min-w-0 rounded-xl border bg-muted/20 p-3 sm:p-4">
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-2">
                          <ListPlus className="h-5 w-5 shrink-0 text-primary" />

                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold">
                              Feature Items
                            </h4>

                            <p className="text-xs text-muted-foreground">
                              Individual capabilities under this feature.
                            </p>
                          </div>
                        </div>

                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() => addFeatureItem(featureIndex)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Item
                        </Button>
                      </div>

                      {feature.items.length === 0 ? (
                        <div className="rounded-lg border border-dashed px-3 py-6 text-center">
                          <p className="text-sm text-muted-foreground">
                            No items added to this feature.
                          </p>

                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="mt-2"
                            onClick={() => addFeatureItem(featureIndex)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                          </Button>
                        </div>
                      ) : (
                        <div className="min-w-0 space-y-4">
                          {feature.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="min-w-0 rounded-lg border bg-background p-3 sm:p-4"
                            >
                              <div className="mb-4 flex items-center justify-between gap-3">
                                <p className="text-sm font-medium">
                                  Item {itemIndex + 1}
                                </p>

                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                  onClick={() =>
                                    removeFeatureItem(featureIndex, itemIndex)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="min-w-0 space-y-2">
                                  <Label>
                                    Item Title{" "}
                                    <span className="text-destructive">*</span>
                                  </Label>

                                  <Input
                                    value={item.title}
                                    onChange={(event) =>
                                      updateFeatureItem(
                                        featureIndex,
                                        itemIndex,
                                        {
                                          title: event.target.value,
                                        },
                                      )
                                    }
                                    placeholder="e.g. Instant Transfers"
                                  />
                                </div>

                                <div className="min-w-0 space-y-2">
                                  <Label>Icon</Label>

                                  <Input
                                    value={item.icon ?? ""}
                                    onChange={(event) =>
                                      updateFeatureItem(
                                        featureIndex,
                                        itemIndex,
                                        {
                                          icon: event.target.value || null,
                                        },
                                      )
                                    }
                                    placeholder="e.g. shield-check"
                                  />
                                </div>

                                <div className="min-w-0 space-y-2 sm:col-span-2">
                                  <Label>
                                    Description{" "}
                                    <span className="text-destructive">*</span>
                                  </Label>

                                  <Textarea
                                    value={item.description}
                                    onChange={(event) =>
                                      updateFeatureItem(
                                        featureIndex,
                                        itemIndex,
                                        {
                                          description: event.target.value,
                                        },
                                      )
                                    }
                                    placeholder="Describe this capability..."
                                    rows={3}
                                  />
                                </div>

                                <div className="min-w-0 space-y-2 sm:col-span-2">
                                  <Label>Numeric Value</Label>

                                  <Input
                                    type="number"
                                    step="any"
                                    value={item.value ?? ""}
                                    onChange={(event) => {
                                      const raw = event.target.value;

                                      const parsed =
                                        raw === "" ? null : Number(raw);

                                      updateFeatureItem(
                                        featureIndex,
                                        itemIndex,
                                        {
                                          value:
                                            parsed === null ||
                                            Number.isFinite(parsed)
                                              ? parsed
                                              : null,
                                        },
                                      );
                                    }}
                                    placeholder="Optional numeric value"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })
        )}

        {features.length > 0 && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addFeature}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Feature
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
