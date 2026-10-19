import { Plus, Trash2, Map } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AppDevRoadmapQuarter,
  AppDevRoadmapStatus,
  CreateApplicationForm,
} from "@/types/application";

interface Props {
  value: CreateApplicationForm;
  onChange: (updates: Partial<CreateApplicationForm>) => void;
}

const statuses = ["PLANNED", "IN_PROGRESS", "COMPLETED"];

const quarters = ["Q1", "Q2", "Q3", "Q4"];

export function ApplicationRoadmap({ value, onChange }: Props) {
  const add = () => {
    onChange({
      roadmaps: [
        ...value.roadmaps,
        {
          title: "",
          status: AppDevRoadmapStatus.PLANNED,
          quarter: AppDevRoadmapQuarter.Q1,
          year: new Date().getFullYear(),
          isCompleted: false,
        },
      ],
    });
  };

  const update = (
    index: number,
    updates: Partial<(typeof value.roadmaps)[number]>,
  ) => {
    onChange({
      roadmaps: value.roadmaps.map((item, i) =>
        i === index ? { ...item, ...updates } : item,
      ),
    });
  };

  const remove = (index: number) => {
    onChange({
      roadmaps: value.roadmaps.filter((_, i) => i !== index),
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Map className="h-5 w-5" />
            </div>

            <div>
              <CardTitle>Development Roadmap</CardTitle>

              <CardDescription>
                Define upcoming and completed development milestones.
              </CardDescription>
            </div>
          </div>

          <Button type="button" variant="outline" onClick={add}>
            <Plus className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {value.roadmaps.map((roadmap, index) => (
          <div key={index} className="rounded-xl border bg-muted/20 p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">Milestone {index + 1}</span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2 lg:col-span-2">
                <Label>Title</Label>

                <Input
                  value={roadmap.title}
                  onChange={(event) =>
                    update(index, {
                      title: event.target.value,
                    })
                  }
                  placeholder="Launch mobile application"
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>

                <Select
                  value={roadmap.status}
                  onValueChange={(status) =>
                    update(index, {
                      status: status as AppDevRoadmapStatus,
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

              <div className="space-y-2">
                <Label>Quarter</Label>

                <Select
                  value={roadmap.quarter}
                  onValueChange={(quarter) =>
                    update(index, {
                      quarter: quarter as AppDevRoadmapQuarter,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {quarters.map((quarter) => (
                      <SelectItem key={quarter} value={quarter}>
                        {quarter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Year</Label>

                <Input
                  type="number"
                  value={roadmap.year ?? ""}
                  onChange={(e) =>
                    update(index, {
                      year:
                        e.target.value === "" ? null : Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-3 pt-7">
                <Switch
                  checked={roadmap.isCompleted}
                  onCheckedChange={(isCompleted) =>
                    update(index, {
                      isCompleted,
                    })
                  }
                />

                <Label>Completed</Label>
              </div>
            </div>
          </div>
        ))}

        {value.roadmaps.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No roadmap milestones added.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
