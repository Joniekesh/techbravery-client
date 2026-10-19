import { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  CreditCard,
  FileText,
  Gift,
  HelpCircle,
  Landmark,
  LockKeyhole,
  PiggyBank,
  Wallet,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SourceOfFunds =
  | "EMPLOYMENT"
  | "BUSINESS"
  | "INVESTMENTS"
  | "SAVINGS"
  | "PROPERTY"
  | "INHERITANCE"
  | "GIFT"
  | "LOAN"
  | "OTHER";

interface SourceOfFundsValue {
  sourceOfFunds?: SourceOfFunds | "";
  description?: string;
  institutionName?: string;
  accountReference?: string;
}

interface SourceOfFundsStepProps {
  value?: SourceOfFundsValue;
  onChange?: (field: keyof SourceOfFundsValue, value: string) => void;
}

const SOURCE_OPTIONS: Array<{
  value: SourceOfFunds;
  label: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    value: "EMPLOYMENT",
    label: "Employment income",
    description: "Salary, wages, bonuses or professional compensation.",
    icon: BriefcaseBusiness,
  },
  {
    value: "BUSINESS",
    label: "Business income",
    description: "Income generated from a business or commercial activity.",
    icon: Building2,
  },
  {
    value: "INVESTMENTS",
    label: "Investment proceeds",
    description: "Returns, dividends, capital gains or other investments.",
    icon: CircleDollarSign,
  },
  {
    value: "SAVINGS",
    label: "Personal savings",
    description: "Accumulated funds held from previous income or earnings.",
    icon: PiggyBank,
  },
  {
    value: "PROPERTY",
    label: "Property proceeds",
    description: "Sale, rental or other proceeds from property holdings.",
    icon: Landmark,
  },
  {
    value: "INHERITANCE",
    label: "Inheritance",
    description: "Funds received through an estate or inheritance.",
    icon: FileText,
  },
  {
    value: "GIFT",
    label: "Gift",
    description: "Funds received from another individual or organization.",
    icon: Gift,
  },
  {
    value: "LOAN",
    label: "Loan or financing",
    description: "Funds obtained through a loan or financing arrangement.",
    icon: CreditCard,
  },
  {
    value: "OTHER",
    label: "Other",
    description: "Another legitimate source not listed above.",
    icon: HelpCircle,
  },
];

const SourceOfFundsStep = ({ value, onChange }: SourceOfFundsStepProps) => {
  const [localValue, setLocalValue] = useState<SourceOfFundsValue>({
    sourceOfFunds: value?.sourceOfFunds ?? "",
    description: value?.description ?? "",
    institutionName: value?.institutionName ?? "",
    accountReference: value?.accountReference ?? "",
  });

  /*
   * If the component is used as a controlled component, the supplied
   * value takes precedence. When rendered without props, local state
   * keeps the selections interactive.
   */
  const currentValue: SourceOfFundsValue = {
    ...localValue,
    ...value,
  };

  const handleChange = (
    field: keyof SourceOfFundsValue,
    fieldValue: string,
  ) => {
    setLocalValue((previous) => ({
      ...previous,
      [field]: fieldValue,
    }));

    onChange?.(field, fieldValue);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Wallet className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Source of funds
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Tell us where the funds you intend to invest will come from. This
              information supports our compliance and investor verification
              process.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy notice */}
      <Card className="border-primary/10 bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">
              Your financial information is confidential
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Information provided here is used for compliance, suitability
              assessment and account administration. It is not displayed
              publicly on your investor profile.
            </p>
          </div>
        </div>
      </Card>

      {/* Source selection */}
      <section className="space-y-4">
        <div>
          <Label className="text-sm font-medium">
            Primary source of investment funds
          </Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Select the source that best represents the funds you expect to use.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          role="radiogroup"
          aria-label="Primary source of investment funds"
        >
          {SOURCE_OPTIONS.map((option) => {
            const Icon = option.icon;
            const selected = currentValue.sourceOfFunds === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleChange("sourceOfFunds", option.value)}
                className={[
                  "group flex min-h-[104px] w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  selected
                    ? "border-primary bg-primary/[0.06] shadow-sm ring-2 ring-primary/20"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/30",
                ].join(" ")}
              >
                {/* Icon */}
                <div
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                  ].join(" ")}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p
                    className={[
                      "text-sm font-medium transition-colors",
                      selected ? "text-primary" : "text-foreground",
                    ].join(" ")}
                  >
                    {option.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {option.description}
                  </p>
                </div>

                {/* Right-side selection indicator */}
                <span
                  className={[
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
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
          })}
        </div>
      </section>

      {/* Additional information */}
      <section className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold">Additional information</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Provide enough context for our compliance team to understand the
            source of your investment funds.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="funds-description">Source of funds description</Label>

          <Textarea
            id="funds-description"
            value={currentValue.description ?? ""}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            placeholder="Briefly describe how the funds were generated or accumulated..."
            className="min-h-28 resize-none"
            maxLength={1000}
          />

          <div className="flex justify-end">
            <span className="text-xs text-muted-foreground">
              {(currentValue.description ?? "").length}/1000
            </span>
          </div>
        </div>

        {/* Employment / business */}
        {(currentValue.sourceOfFunds === "EMPLOYMENT" ||
          currentValue.sourceOfFunds === "BUSINESS") && (
          <div className="space-y-2">
            <Label htmlFor="institution-name">Employer or business name</Label>

            <Input
              id="institution-name"
              value={currentValue.institutionName ?? ""}
              onChange={(event) =>
                handleChange("institutionName", event.target.value)
              }
              placeholder="Enter employer or business name"
            />

            <p className="text-xs text-muted-foreground">
              This helps us understand the relationship between your stated
              income source and the funds being invested.
            </p>
          </div>
        )}

        {/* Account reference */}
        <div className="space-y-2">
          <Label htmlFor="account-reference">
            Supporting account or reference{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>

          <Input
            id="account-reference"
            value={currentValue.accountReference ?? ""}
            onChange={(event) =>
              handleChange("accountReference", event.target.value)
            }
            placeholder="Optional account, institution or reference"
          />

          <p className="text-xs text-muted-foreground">
            Do not enter passwords, PINs, card numbers or other security
            credentials.
          </p>
        </div>
      </section>

      {/* Verification notice */}
      <Card className="border-dashed p-4">
        <div className="flex items-start gap-3">
          <CircleDollarSign className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

          <div className="space-y-1">
            <p className="text-sm font-medium">
              Additional verification may be requested
            </p>

            <p className="text-xs leading-5 text-muted-foreground">
              Depending on your investor profile, transaction size and
              applicable requirements, we may request supporting documents such
              as bank statements, payslips, business records or investment
              statements.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SourceOfFundsStep;
