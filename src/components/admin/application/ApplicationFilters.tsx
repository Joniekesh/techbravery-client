import { Search, SlidersHorizontal, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApplicationFiltersProps {
  search: string;
  status: string;
  investmentStage: string;
  isLive: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onInvestmentStageChange: (value: string) => void;
  onLiveChange: (value: string) => void;
  onClear: () => void;
}

const statuses = ["DEVELOPMENT", "BETA", "LIVE", "MAINTENANCE", "ARCHIVED"];

const stages = [
  "IDEA",
  "PRE_SEED",
  "SEED",
  "SERIES_A",
  "SERIES_B",
  "SERIES_C",
  "GROWTH",
];

export function ApplicationFilters({
  search,
  status,
  investmentStage,
  isLive,
  onSearchChange,
  onStatusChange,
  onInvestmentStageChange,
  onLiveChange,
  onClear,
}: ApplicationFiltersProps) {
  const hasFilters =
    Boolean(search) ||
    Boolean(status) ||
    Boolean(investmentStage) ||
    Boolean(isLive);

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" />

        <h2 className="font-semibold">Filters</h2>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_180px_180px_160px_auto]">
        <div className="relative">
          <Search
            className="
              absolute left-3 top-1/2
              h-4 w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search applications..."
            className="pl-9"
          />
        </div>

        <Select
          value={status || "all"}
          onValueChange={(value) =>
            onStatusChange(value === "all" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>

            {statuses.map((item) => (
              <SelectItem key={item} value={item}>
                {item.toLowerCase().replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={investmentStage || "all"}
          onValueChange={(value) =>
            onInvestmentStageChange(value === "all" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Investment stage" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>

            {stages.map((item) => (
              <SelectItem key={item} value={item}>
                {item.toLowerCase().replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={isLive || "all"}
          onValueChange={(value) => onLiveChange(value === "all" ? "" : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            <SelectItem value="true">Live</SelectItem>

            <SelectItem value="false">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          disabled={!hasFilters}
          onClick={onClear}
        >
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
