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

export interface CurrencyOption {
  id: string;
  iso: string;
  iso2: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
  isActive: boolean;
}

interface CurrencySelectProps {
  value: CurrencyOption | null;
  onChange: (currency: CurrencyOption | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function CurrencySelect({
  value,
  onChange,
  label = "Investment Currency",
  placeholder = "Select a currency",
  disabled = false,
  required = false,
  className,
}: CurrencySelectProps) {
  const currencies = useAppSelector((state) => state.currency.currencies);

  const [open, setOpen] = useState(false);

  const availableCurrencies = useMemo(
    () =>
      currencies?.filter(
        (currency: CurrencyOption) => currency.isActive !== false,
      ) ?? [],
    [currencies],
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
            className="h-12 w-full justify-between rounded-xl"
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded-lg bg-muted font-semibold">
                  {value.symbol}
                </span>

                <span className="truncate text-left">
                  {value.name} ({value.iso2})
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[--radix-popover-trigger-width] p-0"
        >
          <Command>
            <CommandInput placeholder="Search currency..." />

            <CommandList>
              <CommandEmpty>No currency found.</CommandEmpty>

              <CommandGroup>
                {availableCurrencies.map((currency: CurrencyOption) => {
                  const selected = value?.id === currency.id;

                  return (
                    <CommandItem
                      key={currency.id}
                      value={`${currency.name} ${currency.iso2} ${currency.symbol}`}
                      onSelect={() => {
                        onChange(currency);
                        setOpen(false);
                      }}
                    >
                      <span className="mr-3 flex h-8 w-12 items-center justify-center rounded-lg bg-muted font-semibold">
                        {currency.symbol}
                      </span>

                      <span className="flex-1">
                        {currency.name} ({currency.iso2})
                      </span>

                      <Check
                        className={cn(
                          "h-4 w-4",
                          selected ? "opacity-100" : "opacity-0",
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
