import { Activity, Gauge, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { CreateApplicationForm } from "@/types/application";

interface Props {
  value: CreateApplicationForm;
  onChange: (updates: Partial<CreateApplicationForm>) => void;
}

export function ApplicationPerformanceSection({ value, onChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Activity className="h-5 w-5" />
          </div>

          <div>
            <CardTitle>Platform Performance</CardTitle>

            <CardDescription>
              Operational metrics displayed to investors and platform visitors.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <MetricField
            label="Active Users"
            value={value.activeUsers}
            onChange={(activeUsers) =>
              onChange({
                activeUsers,
              })
            }
            icon={<Users className="h-4 w-4" />}
          />

          <MetricField
            label="Monthly Volume"
            value={value.monthlyVolume}
            onChange={(monthlyVolume) =>
              onChange({
                monthlyVolume,
              })
            }
          />

          <MetricField
            label="Transactions"
            value={value.numberOfTransactions}
            onChange={(numberOfTransactions) =>
              onChange({
                numberOfTransactions,
              })
            }
          />

          <MetricField
            label="Server Uptime (%)"
            value={value.serverUptime}
            onChange={(serverUptime) =>
              onChange({
                serverUptime,
              })
            }
            max={100}
          />

          <MetricField
            label="Average Speed (ms)"
            value={value.averageSpeed}
            onChange={(averageSpeed) =>
              onChange({
                averageSpeed,
              })
            }
            icon={<Gauge className="h-4 w-4" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function MetricField({
  label,
  value,
  onChange,
  max,
  icon,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1.5">
        {icon}
        {label}
      </Label>

      <Input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
      />
    </div>
  );
}
