import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { useAppSelector } from "@/redux/hooks";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { getFlagUrl } from "@/utils/getFlagUrl";

export interface CountryOption {
  id: string;
  name: string;
  iso2?: string | null;
  iso3?: string | null;
  flag?: string | null;
  dialCode?: string | null;
  isActive: boolean;
  isSupported: boolean;
}

interface CountrySelectProps {
  value: CountryOption | null;
  onChange: (country: CountryOption | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function CountrySelect({
  value,
  onChange,
  label = "Country",
  placeholder = "Select your country",
  disabled = false,
  required = false,
  className,
}: CountrySelectProps) {
  const countries = useAppSelector((state) => state.country.countries);

  const [open, setOpen] = useState(false);

  const availableCountries = useMemo(
    () =>
      countries?.filter(
        (country: CountryOption) => country.isActive && country.isSupported,
      ) ?? [],
    [countries],
  );

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "h-12 w-full justify-between rounded-xl px-3.5",
              "border-border/80 bg-background font-normal shadow-sm",
              "transition-all duration-200 hover:bg-accent/40",
              "focus-visible:ring-2 focus-visible:ring-primary/30",
              open && "border-primary ring-2 ring-primary/15",
              disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {value ? (
              <div className="flex min-w-0 items-center gap-3">
                {value.iso2 ? (
                  <img
                    src={getFlagUrl(value.iso2) ?? ""}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 shrink-0 rounded-full border border-border/60 object-cover shadow-sm"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted text-lg shadow-sm">
                    {value.flag || "🏳️"}
                  </span>
                )}

                <span className="truncate text-sm font-medium">
                  {value.name}
                </span>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                {placeholder}
              </span>
            )}

            <ChevronsUpDown className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className={cn(
            "w-[--radix-popover-trigger-width] overflow-hidden",
            "rounded-xl border border-border/80 bg-popover p-0 shadow-xl",
          )}
        >
          <Command className="rounded-xl">
            <CommandInput
              placeholder="Search country..."
              className="h-12 text-sm"
            />

            <CommandList className="max-h-72 p-1.5">
              <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
                No country found.
              </CommandEmpty>

              <CommandGroup>
                {availableCountries.map((country: CountryOption) => {
                  const flagUrl = getFlagUrl(country.iso2);
                  const isSelected = value?.id === country.id;

                  return (
                    <CommandItem
                      key={country.id}
                      value={[country.name, country.iso2, country.iso3]
                        .filter(Boolean)
                        .join(" ")}
                      onSelect={() => {
                        onChange(country);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex min-h-14 cursor-pointer items-center",
                        "gap-3 rounded-lg px-3 py-2.5",
                        "text-sm transition-colors",
                        "aria-selected:bg-accent",
                        isSelected && "bg-primary/5 text-primary",
                      )}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        {flagUrl ? (
                          <img
                            src={flagUrl}
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8 shrink-0 rounded-full border border-border/60 object-cover shadow-sm"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted text-base shadow-sm">
                            {country.flag || "🏳️"}
                          </span>
                        )}

                        <span className="truncate font-medium">
                          {country.name}
                        </span>
                      </div>

                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0 text-primary",
                          isSelected ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
