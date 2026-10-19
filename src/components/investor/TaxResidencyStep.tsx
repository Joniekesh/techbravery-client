import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Info, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaxResidency, TaxResidencyValue } from "@/types/investor";
import CountrySelect, { CountryOption } from "../shared/CountrySelect";

interface TaxResidencyStepProps {
  value?: TaxResidencyValue;
  countries?: CountryOption[];
  onChange?: (
    field: keyof TaxResidencyValue,
    value: string | boolean | TaxResidency[],
  ) => void;
  registerValidator?: (validator: () => boolean) => void;
}

const TaxResidencyStep = ({
  value,
  countries = [],
  onChange,
  registerValidator,
}: TaxResidencyStepProps) => {
  const [localValue, setLocalValue] = useState<TaxResidencyValue>({
    countryId: "",
    taxIdentificationNumber: "",
    hasAdditionalTaxResidencies: false,
    additionalResidencies: [],
  });

  const [primaryCountry, setPrimaryCountry] = useState<CountryOption | null>(
    null,
  );

  const [additionalCountries, setAdditionalCountries] = useState<
    (CountryOption | null)[]
  >([]);

  const [validationErrors, setValidationErrors] = useState<{
    additionalResidencies?: string;
  }>({});

  const countriesById = useMemo(
    () => new Map(countries.map((country) => [country.id, country])),
    [countries],
  );

  // Hydrate saved values and resolve country IDs.
  useEffect(() => {
    if (!value) return;

    const residencies = value.additionalResidencies ?? [];

    setLocalValue({
      countryId: value.countryId ?? "",
      taxIdentificationNumber: value.taxIdentificationNumber ?? "",
      hasAdditionalTaxResidencies: value.hasAdditionalTaxResidencies ?? false,
      additionalResidencies: residencies,
    });

    setPrimaryCountry((previous) => {
      const id = value.countryId ?? "";
      return countriesById.get(id) ?? (previous?.id === id ? previous : null);
    });

    setAdditionalCountries((previous) =>
      residencies.map((residency, index) => {
        const id = residency.countryId ?? "";

        return (
          countriesById.get(id) ??
          (previous[index]?.id === id ? previous[index] : null)
        );
      }),
    );
  }, [value, countriesById]);

  const updateField = (
    field: keyof TaxResidencyValue,
    fieldValue: string | boolean | TaxResidency[],
  ) => {
    setLocalValue((previous) => ({
      ...previous,
      [field]: fieldValue,
    }));

    onChange?.(field, fieldValue);
  };

  const handlePrimaryCountryChange = (country: CountryOption | null) => {
    setPrimaryCountry(country);
    updateField("countryId", country?.id ?? "");
    setValidationErrors({});
  };

  const addResidency = () => {
    const residencies = [
      ...(localValue.additionalResidencies ?? []),
      {
        countryId: "",
        taxIdentificationNumber: "",
      },
    ];

    setAdditionalCountries((previous) => [...previous, null]);
    updateField("additionalResidencies", residencies);
    setValidationErrors({});
  };

  const updateResidency = (
    index: number,
    field: keyof TaxResidency,
    fieldValue: string,
  ) => {
    const residencies = [...(localValue.additionalResidencies ?? [])];

    residencies[index] = {
      ...residencies[index],
      [field]: fieldValue,
    };

    updateField("additionalResidencies", residencies);
    setValidationErrors({});
  };

  const handleAdditionalCountryChange = (
    index: number,
    country: CountryOption | null,
  ) => {
    setAdditionalCountries((previous) =>
      previous.map((item, itemIndex) => (itemIndex === index ? country : item)),
    );

    updateResidency(index, "countryId", country?.id ?? "");
  };

  const removeResidency = (index: number) => {
    const residencies = (localValue.additionalResidencies ?? []).filter(
      (_, residencyIndex) => residencyIndex !== index,
    );

    setAdditionalCountries((previous) =>
      previous.filter((_, residencyIndex) => residencyIndex !== index),
    );

    updateField("additionalResidencies", residencies);
    setValidationErrors({});
  };

  const handleAdditionalResidenciesChange = (hasAdditional: boolean) => {
    updateField("hasAdditionalTaxResidencies", hasAdditional);
    setValidationErrors({});

    if (!hasAdditional) {
      setAdditionalCountries([]);
      updateField("additionalResidencies", []);
    }
  };

  // The entire tax step is optional.
  // Validate additional entries only when the user has added them.
  const validateStep = useCallback((): boolean => {
    const residencies = localValue.additionalResidencies ?? [];

    if (!localValue.hasAdditionalTaxResidencies || residencies.length === 0) {
      setValidationErrors({});
      return true;
    }

    const seenCountries = new Set<string>();
    const primaryCountryId = localValue.countryId?.trim() ?? "";

    if (primaryCountryId) {
      seenCountries.add(primaryCountryId);
    }

    for (const residency of residencies) {
      const countryId = residency.countryId?.trim() ?? "";

      // A user-added residency must have a country.
      if (!countryId) {
        setValidationErrors({
          additionalResidencies:
            "Please select a country for each additional tax residency you add.",
        });
        return false;
      }

      // Prevent duplicate additional countries and duplication of primary.
      if (seenCountries.has(countryId)) {
        setValidationErrors({
          additionalResidencies:
            "Each tax residency must use a different country. Check your primary and additional countries.",
        });
        return false;
      }

      seenCountries.add(countryId);
    }

    setValidationErrors({});
    return true;
  }, [localValue]);

  useEffect(() => {
    registerValidator?.(validateStep);
  }, [registerValidator, validateStep]);

  const getCountryName = (countryId: string) =>
    countriesById.get(countryId)?.name ?? countryId;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Tax residency</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Optionally provide your primary tax residency and let us know if you
          are also tax resident in another country.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          This step is optional. You can continue without entering tax
          information.
        </p>
      </div>

      <Card className="border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">Why we ask for this</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Tax residency information may be required for regulatory,
              reporting, and tax compliance purposes.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-5">
        <CountrySelect
          label="Primary tax residence (optional)"
          placeholder="Select primary tax residence"
          value={primaryCountry}
          onChange={handlePrimaryCountryChange}
        />

        <div className="space-y-2">
          <Label htmlFor="primary-tin">
            Tax identification number
            <span className="ml-1 text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="primary-tin"
            value={localValue.taxIdentificationNumber ?? ""}
            onChange={(event) =>
              updateField("taxIdentificationNumber", event.target.value)
            }
            placeholder="Enter your tax identification number"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="mb-4">
          <h3 className="font-medium">Additional tax residencies</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Are you a tax resident of any other country? This question is
            optional.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleAdditionalResidenciesChange(true)}
            aria-pressed={localValue.hasAdditionalTaxResidencies}
            className={[
              "flex items-center gap-3 rounded-lg border p-4 text-left transition",
              localValue.hasAdditionalTaxResidencies
                ? "border-primary bg-primary/5"
                : "hover:bg-muted",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-5 w-5 items-center justify-center rounded-full border",
                localValue.hasAdditionalTaxResidencies
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/30",
              ].join(" ")}
            >
              {localValue.hasAdditionalTaxResidencies && (
                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
              )}
            </span>
            <div>
              <p className="text-sm font-medium">Yes</p>
              <p className="text-xs text-muted-foreground">
                I have additional tax residencies
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleAdditionalResidenciesChange(false)}
            aria-pressed={!localValue.hasAdditionalTaxResidencies}
            className={[
              "flex items-center gap-3 rounded-lg border p-4 text-left transition",
              !localValue.hasAdditionalTaxResidencies
                ? "border-primary bg-primary/5"
                : "hover:bg-muted",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-5 w-5 items-center justify-center rounded-full border",
                !localValue.hasAdditionalTaxResidencies
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/30",
              ].join(" ")}
            >
              {!localValue.hasAdditionalTaxResidencies && (
                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
              )}
            </span>
            <div>
              <p className="text-sm font-medium">No</p>
              <p className="text-xs text-muted-foreground">
                My primary country is my only tax residency
              </p>
            </div>
          </button>
        </div>
      </div>

      {localValue.hasAdditionalTaxResidencies && (
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Other tax residencies</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add every other country where you are tax resident.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addResidency}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add country
            </Button>
          </div>

          {(localValue.additionalResidencies ?? []).length === 0 && (
            <Card className="border-dashed p-5 text-center">
              <p className="text-sm text-muted-foreground">
                No additional tax residency added yet.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={addResidency}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add tax residency
              </Button>
            </Card>
          )}

          {(localValue.additionalResidencies ?? []).map((residency, index) => (
            <Card key={index} className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium">
                  Additional residency {index + 1}
                </p>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeResidency(index)}
                  aria-label={`Remove additional residency ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <CountrySelect
                  label="Country"
                  placeholder="Select country"
                  value={additionalCountries[index] ?? null}
                  onChange={(country) =>
                    handleAdditionalCountryChange(index, country)
                  }
                />

                <div className="space-y-2">
                  <Label htmlFor={`additional-tin-${index}`}>
                    Tax identification number (optional)
                  </Label>
                  <Input
                    id={`additional-tin-${index}`}
                    value={residency.taxIdentificationNumber ?? ""}
                    onChange={(event) =>
                      updateResidency(
                        index,
                        "taxIdentificationNumber",
                        event.target.value,
                      )
                    }
                    placeholder="Enter tax ID"
                  />
                </div>
              </div>

              {residency.countryId && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Selected country: {getCountryName(residency.countryId)}
                </p>
              )}
            </Card>
          ))}

          {validationErrors.additionalResidencies && (
            <p role="alert" className="text-sm text-destructive">
              {validationErrors.additionalResidencies}
            </p>
          )}
        </div>
      )}

      <Card className="bg-muted/40 p-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Make sure any information you provide is accurate and matches your
          applicable tax records. You may be asked to provide supporting
          documentation later in the onboarding process.
        </p>
      </Card>
    </div>
  );
};

export default TaxResidencyStep;
