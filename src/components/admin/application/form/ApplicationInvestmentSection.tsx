import { DollarSign, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AppStatus,
  CreateApplicationForm,
  InvestmentStage,
} from "@/types/application";
import { Switch } from "@/components/ui/switch";

interface Props {
  value: CreateApplicationForm;
  onChange: (updates: Partial<CreateApplicationForm>) => void;
}

const stages: InvestmentStage[] = [
  InvestmentStage.PRE_SEED,
  InvestmentStage.SEED,
  InvestmentStage.SERIES_A,
  InvestmentStage.ANGEL,
];

const statuses: AppStatus[] = [
  AppStatus.ACTIVE,
  AppStatus.DEVELOPMENT,
  AppStatus.SCALING,
];

export function ApplicationInvestmentSection({ value, onChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <DollarSign className="h-5 w-5" />
          </div>

          <div>
            <CardTitle>Investment & Financials</CardTitle>

            <CardDescription>
              Configure the platform's investment and financial information.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Investment Stage</Label>

            <Select
              value={value.investmentStage}
              onValueChange={(investmentStage) =>
                onChange({
                  investmentStage: investmentStage as InvestmentStage,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage.toLowerCase().replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-xl border bg-muted/30 p-4">
            <div>
              <p className="font-medium">Enable Investments</p>

              <p className="text-sm text-muted-foreground">
                Allow investors to invest in this application.
              </p>
            </div>

            <Switch
              checked={value.isInvestmentEnabled}
              onCheckedChange={(isInvestmentEnabled) =>
                onChange({
                  isInvestmentEnabled,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Development Status</Label>

            <Select
              value={value.status}
              onValueChange={(status) =>
                onChange({
                  status: status as AppStatus,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.toLowerCase().replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NumberField
            label="Amount Realized"
            value={value.amountRealized}
            onChange={(amountRealized) => onChange({ amountRealized })}
          />

          <NumberField
            label="Valuation"
            value={value.valuation}
            onChange={(valuation) => onChange({ valuation })}
          />

          <NumberField
            label="Projected Return"
            value={value.projectedReturn}
            onChange={(projectedReturn) => onChange({ projectedReturn })}
          />

          <NumberField
            label="Monthly Revenue"
            value={value.monthlyRevenue}
            onChange={(monthlyRevenue) => onChange({ monthlyRevenue })}
          />
        </div>

        <div className="rounded-xl border bg-muted/30 p-4">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />

            <p className="font-medium">Investment Limits</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <NumberField
              label="Minimum Investment"
              value={value.minInvestmentAmount}
              onChange={(minInvestmentAmount) =>
                onChange({
                  minInvestmentAmount,
                })
              }
            />

            <NumberField
              label="Maximum Investment"
              value={value.maxInvestmentAmount}
              onChange={(maxInvestmentAmount) =>
                onChange({
                  maxInvestmentAmount,
                })
              }
            />

            <NumberField
              label="Investment Cap"
              value={value.investmentCap}
              onChange={(investmentCap) =>
                onChange({
                  investmentCap,
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Input
        type="number"
        min={0}
        step="0.01"
        value={value}
        onChange={(event) => {
          const raw = event.target.value;

          onChange(raw === "" ? 0 : Number(raw));
        }}
      />
    </div>
  );
}
