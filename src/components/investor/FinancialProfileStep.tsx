import { useState } from "react";
import {
  BriefcaseBusiness,
  CircleDollarSign,
  Info,
  Landmark,
  WalletCards,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FinancialProfileValue {
  occupation?: string;
  employerName?: string;
  annualIncome?: string;
  netWorth?: string;
  liquidAssets?: string;
}

interface FinancialProfileStepProps {
  value?: FinancialProfileValue;
  currencySymbol?: string;
  onChange?: (field: keyof FinancialProfileValue, value: string) => void;
}

const INCOME_RANGES = [
  { value: "UNDER_25K", label: "Under 25,000" },
  { value: "25K_50K", label: "25,000 – 50,000" },
  { value: "50K_100K", label: "50,000 – 100,000" },
  { value: "100K_250K", label: "100,000 – 250,000" },
  { value: "250K_500K", label: "250,000 – 500,000" },
  { value: "500K_1M", label: "500,000 – 1,000,000" },
  { value: "OVER_1M", label: "Over 1,000,000" },
];

const NET_WORTH_RANGES = [
  { value: "UNDER_50K", label: "Under 50,000" },
  { value: "50K_100K", label: "50,000 – 100,000" },
  { value: "100K_250K", label: "100,000 – 250,000" },
  { value: "250K_500K", label: "250,000 – 500,000" },
  { value: "500K_1M", label: "500,000 – 1,000,000" },
  { value: "1M_5M", label: "1,000,000 – 5,000,000" },
  { value: "OVER_5M", label: "Over 5,000,000" },
];

const LIQUID_ASSET_RANGES = [
  { value: "UNDER_10K", label: "Under 10,000" },
  { value: "10K_50K", label: "10,000 – 50,000" },
  { value: "50K_100K", label: "50,000 – 100,000" },
  { value: "100K_250K", label: "100,000 – 250,000" },
  { value: "250K_500K", label: "250,000 – 500,000" },
  { value: "500K_1M", label: "500,000 – 1,000,000" },
  { value: "OVER_1M", label: "Over 1,000,000" },
];

const FinancialProfileStep = ({
  value,
  currencySymbol = "₦",
  onChange,
}: FinancialProfileStepProps) => {
  const [localValue, setLocalValue] = useState<FinancialProfileValue>({
    occupation: value?.occupation ?? "",
    employerName: value?.employerName ?? "",
    annualIncome: value?.annualIncome ?? "",
    netWorth: value?.netWorth ?? "",
    liquidAssets: value?.liquidAssets ?? "",
  });

  const currentValue = {
    ...localValue,
    ...value,
  };

  const handleChange = (
    field: keyof FinancialProfileValue,
    fieldValue: string,
  ) => {
    setLocalValue((previous) => ({
      ...previous,
      [field]: fieldValue,
    }));

    onChange?.(field, fieldValue);
  };

  const selectedIncome = INCOME_RANGES.find(
    (item) => item.value === currentValue.annualIncome,
  );

  const selectedNetWorth = NET_WORTH_RANGES.find(
    (item) => item.value === currentValue.netWorth,
  );

  const selectedLiquidAssets = LIQUID_ASSET_RANGES.find(
    (item) => item.value === currentValue.liquidAssets,
  );

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CircleDollarSign className="h-5 w-5" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Financial profile
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Help us understand your financial profile and investment capacity.
          This information is used to support appropriate investor
          classification and compliance review.
        </p>
      </div>

      {/* Professional information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-primary" />

            <CardTitle className="text-base">
              Professional information
            </CardTitle>
          </div>

          <p className="text-sm text-muted-foreground">
            Tell us about your current professional situation.
          </p>
        </CardHeader>

        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="occupation">
              Occupation
              <span className="ml-1 text-destructive">*</span>
            </Label>

            <Input
              id="occupation"
              placeholder="e.g. Software Engineer"
              value={currentValue.occupation ?? ""}
              onChange={(event) =>
                handleChange("occupation", event.target.value)
              }
              autoComplete="organization-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employerName">Employer / Organization</Label>

            <Input
              id="employerName"
              placeholder="Enter employer or organization"
              value={currentValue.employerName ?? ""}
              onChange={(event) =>
                handleChange("employerName", event.target.value)
              }
              autoComplete="organization"
            />

            <p className="text-xs text-muted-foreground">
              If you are self-employed, enter your business or trading name.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Annual income */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <WalletCards className="h-4 w-4 text-primary" />

            <CardTitle className="text-base">Annual income</CardTitle>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            Select the range that best represents your approximate annual
            income.
          </p>
        </CardHeader>

        <CardContent>
          <div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            role="radiogroup"
            aria-label="Annual income"
          >
            {INCOME_RANGES.map((range) => (
              <RangeOption
                key={range.value}
                selected={currentValue.annualIncome === range.value}
                title={range.label}
                prefix={currencySymbol}
                onClick={() => handleChange("annualIncome", range.value)}
              />
            ))}
          </div>

          {selectedIncome && (
            <div className="mt-4">
              <Badge variant="secondary">
                Selected: {currencySymbol}
                {selectedIncome.label}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Net worth */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-primary" />

            <CardTitle className="text-base">Estimated net worth</CardTitle>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            Select your approximate total net worth, excluding liabilities where
            appropriate.
          </p>
        </CardHeader>

        <CardContent>
          <div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            role="radiogroup"
            aria-label="Estimated net worth"
          >
            {NET_WORTH_RANGES.map((range) => (
              <RangeOption
                key={range.value}
                selected={currentValue.netWorth === range.value}
                title={range.label}
                prefix={currencySymbol}
                onClick={() => handleChange("netWorth", range.value)}
              />
            ))}
          </div>

          {selectedNetWorth && (
            <div className="mt-4">
              <Badge variant="secondary">
                Selected: {currencySymbol}
                {selectedNetWorth.label}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Liquid assets */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <WalletCards className="h-4 w-4 text-primary" />

            <CardTitle className="text-base">
              Liquid investment assets
            </CardTitle>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            Estimate the amount of assets that could reasonably be converted
            into cash or invested without materially affecting your normal
            financial obligations.
          </p>
        </CardHeader>

        <CardContent>
          <div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            role="radiogroup"
            aria-label="Liquid investment assets"
          >
            {LIQUID_ASSET_RANGES.map((range) => (
              <RangeOption
                key={range.value}
                selected={currentValue.liquidAssets === range.value}
                title={range.label}
                prefix={currencySymbol}
                onClick={() => handleChange("liquidAssets", range.value)}
              />
            ))}
          </div>

          {selectedLiquidAssets && (
            <div className="mt-4">
              <Badge variant="secondary">
                Selected: {currencySymbol}
                {selectedLiquidAssets.label}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Additional financial declaration */}
      <Card className="bg-muted/20">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-medium">Provide accurate estimates</p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                You do not need to provide an exact figure where a range is
                provided. Select the range that most accurately represents your
                current financial position. Supporting documentation may be
                requested during verification.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface RangeOptionProps {
  selected: boolean;
  title: string;
  prefix?: string;
  onClick: () => void;
}

const RangeOption = ({
  selected,
  title,
  prefix,
  onClick,
}: RangeOptionProps) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={[
        "group flex min-h-16 w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        selected
          ? "border-primary bg-primary/[0.06] shadow-sm ring-2 ring-primary/20"
          : "border-border bg-background hover:border-primary/50 hover:bg-muted/30",
      ].join(" ")}
    >
      {/* Amount */}
      <div className="min-w-0 flex-1">
        <p
          className={[
            "text-sm font-medium transition-colors",
            selected ? "text-primary" : "text-foreground",
          ].join(" ")}
        >
          {prefix}
          {title}
        </p>
      </div>

      {/* Selection circle - RIGHT */}
      <span
        className={[
          "ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
          selected
            ? "border-primary bg-primary"
            : "border-muted-foreground/40 bg-background group-hover:border-primary/60",
        ].join(" ")}
      >
        {selected && (
          <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
        )}
      </span>
    </button>
  );
};

export default FinancialProfileStep;
