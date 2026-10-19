import { Plus, Trash2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Switch } from "@/components/ui/switch";

import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ApplicationHighlightForm,
  CreateApplicationForm,
} from "@/types/application";

interface Props {
  value: CreateApplicationForm;
  onChange: (updates: Partial<CreateApplicationForm>) => void;
}

export function ApplicationHighlights({ value, onChange }: Props) {
  const add = () => {
    onChange({
      keyHighlights: [
        ...value.keyHighlights,
        {
          name: "",
          isActive: true,
        },
      ],
    });
  };

  const update = (
    index: number,
    updates: Partial<ApplicationHighlightForm>,
  ) => {
    onChange({
      keyHighlights: value.keyHighlights.map((item, i) =>
        i === index ? { ...item, ...updates } : item,
      ),
    });
  };

  const remove = (index: number) => {
    onChange({
      keyHighlights: value.keyHighlights.filter((_, i) => i !== index),
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Star className="h-5 w-5" />
            </div>

            <div>
              <CardTitle>Key Highlights</CardTitle>

              <CardDescription>
                Short highlights shown throughout the platform experience.
              </CardDescription>
            </div>
          </div>

          <Button type="button" variant="outline" onClick={add}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {value.keyHighlights.map((highlight, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-xl border bg-muted/20 p-4 sm:flex-row sm:items-center"
          >
            <Input
              value={highlight.name}
              onChange={(event) =>
                update(index, {
                  name: event.target.value,
                })
              }
              placeholder="e.g. 24/7 trading"
              className="flex-1"
            />

            <div className="flex items-center gap-2">
              <Switch
                checked={highlight.isActive}
                onCheckedChange={(isActive) =>
                  update(index, {
                    isActive,
                  })
                }
              />

              <Label className="text-sm">Active</Label>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {value.keyHighlights.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No highlights added.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
