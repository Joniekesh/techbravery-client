import { useState } from "react";
import {
  AlertTriangle,
  CircleHelp,
  LockKeyhole,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type RiskTolerance =
  | "CONSERVATIVE"
  | "MODERATELY_CONSERVATIVE"
  | "MODERATE"
  | "MODERATELY_AGGRESSIVE"
  | "AGGRESSIVE";

type InvestmentObjective =
  | "CAPITAL_PRESERVATION"
  | "INCOME"
  | "CAPITAL_GROWTH"
  | "DIVERSIFICATION"
  | "LONG_TERM_WEALTH";

type LossReaction =
  | "SELL_IMMEDIATELY"
  | "REDUCE_EXPOSURE"
  | "HOLD"
  | "INVEST_MORE"
  | "UNSURE";

interface RiskAssessmentValue {
  riskTolerance?: RiskTolerance | "";
  investmentObjective?: InvestmentObjective | "";
  lossReaction?: LossReaction | "";
  investmentHorizon?: string;
  acceptableLossPercentage?: string;
  description?: string;
}

interface RiskAssessmentStepProps {
  value?: RiskAssessmentValue;
  onChange?: (field: keyof RiskAssessmentValue, value: string) => void;
}

const RISK_OPTIONS: Array<{
  value: RiskTolerance;
  label: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    value: "CONSERVATIVE",
    label: "Conservative",
    description:
      "I prefer to protect capital and accept lower potential returns in exchange for lower volatility.",
    icon: ShieldCheck,
  },
  {
    value: "MODERATELY_CONSERVATIVE",
    label: "Moderately conservative",
    description:
      "I prioritize stability but can accept some investment risk for the opportunity for higher returns.",
    icon: TrendingDown,
  },
  {
    value: "MODERATE",
    label: "Moderate",
    description:
      "I am comfortable with a balanced level of risk and potential fluctuations in value.",
    icon: CircleHelp,
  },
  {
    value: "MODERATELY_AGGRESSIVE",
    label: "Moderately aggressive",
    description:
      "I can accept meaningful fluctuations in pursuit of higher long-term returns.",
    icon: TrendingUp,
  },
  {
    value: "AGGRESSIVE",
    label: "Aggressive",
    description:
      "I am comfortable taking substantial investment risk and potentially experiencing significant losses.",
    icon: AlertTriangle,
  },
];

const OBJECTIVE_OPTIONS: Array<{
  value: InvestmentObjective;
  label: string;
  description: string;
}> = [
  {
    value: "CAPITAL_PRESERVATION",
    label: "Capital preservation",
    description: "Protect the value of invested capital.",
  },
  {
    value: "INCOME",
    label: "Income generation",
    description: "Generate regular income or distributions.",
  },
  {
    value: "CAPITAL_GROWTH",
    label: "Capital growth",
    description: "Grow the value of investments over time.",
  },
  {
    value: "DIVERSIFICATION",
    label: "Portfolio diversification",
    description: "Diversify existing assets and investments.",
  },
  {
    value: "LONG_TERM_WEALTH",
    label: "Long-term wealth",
    description: "Build wealth over a longer investment horizon.",
  },
];

const LOSS_REACTION_OPTIONS: Array<{
  value: LossReaction;
  label: string;
  description: string;
}> = [
  {
    value: "SELL_IMMEDIATELY",
    label: "Sell immediately",
    description:
      "I would prefer to exit the investment to avoid further losses.",
  },
  {
    value: "REDUCE_EXPOSURE",
    label: "Reduce my exposure",
    description: "I would reduce the amount invested or rebalance my position.",
  },
  {
    value: "HOLD",
    label: "Hold the investment",
    description: "I would generally wait and reassess the investment.",
  },
  {
    value: "INVEST_MORE",
    label: "Consider investing more",
    description: "I may see a significant decline as an opportunity.",
  },
  {
    value: "UNSURE",
    label: "I'm not sure",
    description: "I would need guidance before deciding what to do.",
  },
];

const HORIZON_OPTIONS = [
  ["<1", "Less than 1 year"],
  ["1-3", "1–3 years"],
  ["3-5", "3–5 years"],
  ["5-10", "5–10 years"],
  ["10+", "More than 10 years"],
] as const;

const LOSS_OPTIONS = [
  ["0-5", "0–5%"],
  ["5-10", "5–10%"],
  ["10-20", "10–20%"],
  ["20-30", "20–30%"],
  ["30+", "More than 30%"],
] as const;

const RiskAssessmentStep = ({ value, onChange }: RiskAssessmentStepProps) => {
  const [localValue, setLocalValue] = useState<RiskAssessmentValue>({
    riskTolerance: value?.riskTolerance ?? "",
    investmentObjective: value?.investmentObjective ?? "",
    lossReaction: value?.lossReaction ?? "",
    investmentHorizon: value?.investmentHorizon ?? "",
    acceptableLossPercentage: value?.acceptableLossPercentage ?? "",
    description: value?.description ?? "",
  });

  /*
   * Parent value takes precedence when supplied.
   * Local state keeps this step interactive when rendered as:
   *
   * <RiskAssessmentStep />
   */
  const currentValue: RiskAssessmentValue = {
    ...localValue,
    ...value,
  };

  const handleChange = (
    field: keyof RiskAssessmentValue,
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
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Risk assessment
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Help us understand your investment objectives, time horizon and
              ability to tolerate potential losses.
            </p>
          </div>
        </div>
      </div>

      {/* Information notice */}
      <Card className="border-primary/10 bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">
              Risk assessment is part of suitability review
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Your responses are considered alongside your financial profile,
              investment experience and objectives. Investment values can fall
              as well as rise, and losses are possible.
            </p>
          </div>
        </div>
      </Card>

      {/* Risk tolerance */}
      <section className="space-y-4">
        <div>
          <Label className="text-sm font-medium">
            How would you describe your risk tolerance?
          </Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Consider how comfortable you are with fluctuations and potential
            loss of capital.
          </p>
        </div>

        <div
          className="space-y-3"
          role="radiogroup"
          aria-label="Risk tolerance"
        >
          {RISK_OPTIONS.map((option) => {
            const Icon = option.icon;
            const selected = currentValue.riskTolerance === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleChange("riskTolerance", option.value)}
                className={[
                  "group flex w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  selected
                    ? "border-primary bg-primary/[0.06] shadow-sm ring-2 ring-primary/20"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/30",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                </div>

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

      {/* Investment objective */}
      <section className="space-y-4">
        <div>
          <Label className="text-sm font-medium">
            What is your primary investment objective?
          </Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Choose the objective that most closely reflects your primary goal.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          role="radiogroup"
          aria-label="Investment objective"
        >
          {OBJECTIVE_OPTIONS.map((option) => {
            const selected = currentValue.investmentObjective === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() =>
                  handleChange("investmentObjective", option.value)
                }
                className={[
                  "group flex min-h-[104px] w-full items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200",
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

      {/* Investment horizon */}
      <section className="space-y-4">
        <div>
          <Label className="text-sm font-medium">
            How long do you expect to keep your investment?
          </Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Select your expected investment horizon.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="radiogroup"
          aria-label="Investment horizon"
        >
          {HORIZON_OPTIONS.map(([option, label]) => {
            const selected = currentValue.investmentHorizon === option;

            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleChange("investmentHorizon", option)}
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

      {/* Acceptable loss */}
      <section className="space-y-4">
        <div>
          <Label className="text-sm font-medium">
            What level of loss could you tolerate?
          </Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Think about the temporary decline in value you could financially and
            emotionally tolerate without needing to exit the investment.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="radiogroup"
          aria-label="Acceptable loss percentage"
        >
          {LOSS_OPTIONS.map(([option, label]) => {
            const selected = currentValue.acceptableLossPercentage === option;

            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleChange("acceptableLossPercentage", option)}
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

      {/* Loss reaction */}
      <section className="space-y-4">
        <div>
          <Label className="text-sm font-medium">
            If an investment declined significantly, what would you most likely
            do?
          </Label>
        </div>

        <div
          className="space-y-3"
          role="radiogroup"
          aria-label="Reaction to investment loss"
        >
          {LOSS_REACTION_OPTIONS.map((option) => {
            const selected = currentValue.lossReaction === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleChange("lossReaction", option.value)}
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

      {/* Additional information */}
      <section className="space-y-2">
        <Label htmlFor="risk-description">
          Additional information{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>

        <Textarea
          id="risk-description"
          value={currentValue.description ?? ""}
          onChange={(event) => handleChange("description", event.target.value)}
          placeholder="Tell us about any circumstances, objectives or considerations that may affect your investment decisions..."
          className="min-h-28 resize-none"
          maxLength={1500}
        />

        <div className="flex justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Only provide information relevant to your investment profile.
          </p>

          <span className="shrink-0 text-xs text-muted-foreground">
            {(currentValue.description ?? "").length}/1500
          </span>
        </div>
      </section>

      {/* Risk warning */}
      <Card className="border-amber-500/20 bg-amber-500/5 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <div>
            <p className="text-sm font-medium">Investment risk</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Past performance does not guarantee future results. Depending on
              the investment, you may lose some or all of the capital invested.
              Your risk assessment does not eliminate investment risk.
            </p>
          </div>
        </div>
      </Card>

      {/* Guidance */}
      <div className="flex items-start gap-3 rounded-lg bg-muted/40 p-4">
        <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

        <p className="text-xs leading-5 text-muted-foreground">
          If your circumstances or investment objectives change, you should
          update your investor information where required.
        </p>
      </div>
    </div>
  );
};

export default RiskAssessmentStep;
