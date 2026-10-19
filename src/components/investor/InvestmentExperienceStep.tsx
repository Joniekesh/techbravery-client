import { useState } from "react";
import {
  BarChart3,
  CircleHelp,
  Clock3,
  LineChart,
  LockKeyhole,
  TrendingUp,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ExperienceLevel =
  | "NONE"
  | "BEGINNER"
  | "INTERMEDIATE"
  | "EXPERIENCED"
  | "PROFESSIONAL";

type InvestmentProduct =
  | "STOCKS"
  | "BONDS"
  | "FUNDS"
  | "REAL_ESTATE"
  | "PRIVATE_COMPANIES"
  | "CRYPTO"
  | "STARTUPS"
  | "OTHER";

interface InvestmentExperienceValue {
  experienceLevel?: ExperienceLevel | "";
  yearsOfExperience?: string;
  products?: InvestmentProduct[];
  description?: string;
}

interface InvestmentExperienceStepProps {
  value?: InvestmentExperienceValue;
  onChange?: (
    field: keyof InvestmentExperienceValue,
    value: string | InvestmentProduct[],
  ) => void;
}

const EXPERIENCE_OPTIONS: Array<{
  value: ExperienceLevel;
  label: string;
  description: string;
}> = [
  {
    value: "NONE",
    label: "No investment experience",
    description:
      "I have not previously invested in financial or alternative investment products.",
  },
  {
    value: "BEGINNER",
    label: "Beginner",
    description:
      "I have some experience but generally require guidance when making investment decisions.",
  },
  {
    value: "INTERMEDIATE",
    label: "Intermediate",
    description:
      "I understand common investment concepts and have made investments independently.",
  },
  {
    value: "EXPERIENCED",
    label: "Experienced",
    description:
      "I regularly evaluate investments and understand the associated risks and returns.",
  },
  {
    value: "PROFESSIONAL",
    label: "Professional",
    description:
      "I have substantial professional or institutional experience with investments.",
  },
];

const YEARS_OPTIONS = [
  ["0", "Less than 1 year"],
  ["1-3", "1–3 years"],
  ["3-5", "3–5 years"],
  ["5-10", "5–10 years"],
  ["10+", "More than 10 years"],
] as const;

const PRODUCT_OPTIONS: Array<{
  value: InvestmentProduct;
  label: string;
}> = [
  { value: "STOCKS", label: "Stocks / Equities" },
  { value: "BONDS", label: "Bonds / Fixed Income" },
  { value: "FUNDS", label: "Funds / ETFs" },
  { value: "REAL_ESTATE", label: "Real Estate" },
  { value: "PRIVATE_COMPANIES", label: "Private Companies" },
  { value: "CRYPTO", label: "Digital Assets / Crypto" },
  { value: "STARTUPS", label: "Startups / Venture Capital" },
  { value: "OTHER", label: "Other Investments" },
];

const InvestmentExperienceStep = ({
  value,
  onChange,
}: InvestmentExperienceStepProps) => {
  const [localValue, setLocalValue] = useState<InvestmentExperienceValue>({
    experienceLevel: value?.experienceLevel ?? "",
    yearsOfExperience: value?.yearsOfExperience ?? "",
    products: value?.products ?? [],
    description: value?.description ?? "",
  });

  /*
   * Parent value takes precedence when supplied.
   * Local state keeps the component interactive when rendered
   * without props, as in the current onboarding page.
   */
  const currentValue: InvestmentExperienceValue = {
    ...localValue,
    ...value,
  };

  const selectedProducts = currentValue.products ?? [];

  const handleChange = (
    field: keyof InvestmentExperienceValue,
    fieldValue: string | InvestmentProduct[],
  ) => {
    setLocalValue((previous) => ({
      ...previous,
      [field]: fieldValue,
    }));

    onChange?.(field, fieldValue);
  };

  const toggleProduct = (product: InvestmentProduct) => {
    const nextProducts = selectedProducts.includes(product)
      ? selectedProducts.filter((item) => item !== product)
      : [...selectedProducts, product];

    handleChange("products", nextProducts);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Investment experience
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Help us understand your previous investment experience. Your
              answers help us assess suitability and determine what information
              may be useful before you invest.
            </p>
          </div>
        </div>
      </div>

      {/* Information notice */}
      <Card className="border-primary/10 bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">This is not a test</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              There are no right or wrong answers. Provide an accurate
              representation of your experience so we can maintain an
              appropriate investor profile.
            </p>
          </div>
        </div>
      </Card>

      {/* Experience level */}
      <section className="space-y-4">
        <div>
          <Label className="text-sm font-medium">
            What best describes your investment experience?
          </Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Select the option that most closely reflects your overall
            experience.
          </p>
        </div>

        <div
          className="space-y-3"
          role="radiogroup"
          aria-label="Investment experience level"
        >
          {EXPERIENCE_OPTIONS.map((option) => {
            const selected = currentValue.experienceLevel === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleChange("experienceLevel", option.value)}
                className={[
                  "group flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  selected
                    ? "border-primary bg-primary/[0.06] shadow-sm ring-2 ring-primary/20"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/30",
                ].join(" ")}
              >
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

                {/* Right-side active indicator */}
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

      {/* Years of experience */}
      <section className="space-y-4">
        <div>
          <Label className="text-sm font-medium">
            How long have you been investing?
          </Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Select the approximate length of your investment experience.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          role="radiogroup"
          aria-label="Years of investment experience"
        >
          {YEARS_OPTIONS.map(([option, label]) => {
            const selected = currentValue.yearsOfExperience === option;

            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleChange("yearsOfExperience", option)}
                className={[
                  "group flex min-h-16 w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  selected
                    ? "border-primary bg-primary/[0.06] shadow-sm ring-2 ring-primary/20"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/30",
                ].join(" ")}
              >
                <Clock3
                  className={[
                    "h-4 w-4 shrink-0 transition-colors",
                    selected
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary",
                  ].join(" ")}
                />

                <span
                  className={[
                    "min-w-0 flex-1 text-sm font-medium transition-colors",
                    selected ? "text-primary" : "text-foreground",
                  ].join(" ")}
                >
                  {label}
                </span>

                {/* Right-side active indicator */}
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
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

      {/* Investment products */}
      <section className="space-y-4">
        <div>
          <Label className="text-sm font-medium">
            Which investment products have you used?
          </Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Select all that apply.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PRODUCT_OPTIONS.map((option) => {
            const selected = selectedProducts.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleProduct(option.value)}
                className={[
                  "group flex min-h-16 w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  selected
                    ? "border-primary bg-primary/[0.06] shadow-sm ring-2 ring-primary/20"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/30",
                ].join(" ")}
              >
                <span
                  className={[
                    "min-w-0 flex-1 text-sm font-medium transition-colors",
                    selected ? "text-primary" : "text-foreground",
                  ].join(" ")}
                >
                  {option.label}
                </span>

                {/* Right-side active indicator */}
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
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

        {selectedProducts.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {selectedProducts.length} investment{" "}
            {selectedProducts.length === 1 ? "category" : "categories"}{" "}
            selected.
          </p>
        )}
      </section>

      {/* Description */}
      <section className="space-y-2">
        <Label htmlFor="investment-experience-description">
          Tell us about your investment experience
        </Label>

        <Textarea
          id="investment-experience-description"
          value={currentValue.description ?? ""}
          onChange={(event) => handleChange("description", event.target.value)}
          placeholder="Briefly describe any relevant investment experience, responsibilities or areas you are familiar with..."
          className="min-h-32 resize-none"
          maxLength={1500}
        />

        <div className="flex justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Include professional, personal or business investment experience
            where relevant.
          </p>

          <span className="shrink-0 text-xs text-muted-foreground">
            {(currentValue.description ?? "").length}/1500
          </span>
        </div>
      </section>

      {/* Suitability notice */}
      <Card className="border-dashed p-4">
        <div className="flex items-start gap-3">
          <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

          <div>
            <p className="text-sm font-medium">
              Investment experience helps with suitability
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Your experience is considered together with your financial
              profile, objectives and risk assessment. It does not by itself
              determine whether you can invest in an opportunity.
            </p>
          </div>
        </div>
      </Card>

      {/* Guidance */}
      <div className="flex items-start gap-3 rounded-lg bg-muted/40 p-4">
        <LineChart className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

        <p className="text-xs leading-5 text-muted-foreground">
          If you are unsure about any investment category, choose the option
          that most accurately reflects your actual experience.
        </p>
      </div>

      {/* Compliance help */}
      <div className="flex items-start gap-3 text-xs text-muted-foreground">
        <CircleHelp className="mt-0.5 h-4 w-4 shrink-0" />

        <p>
          You may be asked for additional information during compliance review
          if your responses require clarification.
        </p>
      </div>
    </div>
  );
};

export default InvestmentExperienceStep;
