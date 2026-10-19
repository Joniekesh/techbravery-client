import { Check, ChevronsUpDown, Globe2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { CreateApplicationForm } from "@/types/application";

interface Country {
  id: string;
  name: string;
  iso2?: string | null;
  flag?: string | null;
}

interface Props {
  value: CreateApplicationForm;
  onChange: (updates: Partial<CreateApplicationForm>) => void;
  countries: Country[];
  //   setSelectedCountry: Dispatch<(prevState: null) => null>;
}

export function ApplicationCountries({ value, onChange, countries }: Props) {
  const toggle = (countryId: string) => {
    const selected = value.countryIds ?? [];

    const exists = selected.includes(countryId);

    onChange({
      countryIds: exists
        ? selected.filter((id) => id !== countryId)
        : [...selected, countryId],
    });
  };

  const getFlagUrl = (iso2?: string | null): string | null => {
    if (!iso2) return null;

    return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Globe2 className="h-5 w-5" />
          </div>

          <div>
            <CardTitle>Countries of Coverage</CardTitle>

            <CardDescription>
              Select the countries where this platform operates or is available.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              className="h-auto min-h-10 w-full justify-between"
            >
              <span className="truncate">
                {value.countryIds.length === 0
                  ? "Select countries..."
                  : `${value.countryIds.length} ${
                      value.countryIds.length === 1 ? "country" : "countries"
                    } selected`}
              </span>

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-0"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Search countries..." />

              <CommandList>
                <CommandEmpty>No countries found.</CommandEmpty>

                <CommandGroup>
                  {countries?.map((country) => {
                    const selected = value.countryIds.includes(country.id);

                    return (
                      <CommandItem
                        key={country.id}
                        value={country.name}
                        onSelect={() => toggle(country.id)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 text-green-500 font-bold",
                            selected ? "opacity-100" : "opacity-0",
                          )}
                        />

                        {country.iso2 ? (
                          <img
                            src={getFlagUrl(country.iso2) ?? ""}
                            alt=""
                            width={36}
                            height={36}
                            className="h-9 w-9 shrink-0 rounded-full border border-border/60 object-cover shadow-sm mr-1"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted text-lg shadow-sm">
                            {country.flag || "🏳️"}
                          </span>
                        )}

                        {country.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {value.countryIds.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {value.countryIds.map((id) => {
              const country = countries.find((item) => item.id === id);

              if (!country) return null;

              return (
                <span
                  key={id}
                  className="
                      inline-flex items-center gap-1.5
                      rounded-full
                      bg-primary/10
                      px-3 py-1.5
                      text-xs font-medium
                      text-primary
                    "
                >
                  {country.flag}
                  {country.name}
                </span>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
