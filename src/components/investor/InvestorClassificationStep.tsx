import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Info,
  Landmark,
  Users,
  UserRound,
  Check,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  ClassificationForm,
  ENTITY_TYPES,
  IndividualInvestmentType,
  INSTITUTION_TYPES,
  InvestorClassificationStepProps,
  InvestorType,
  RELATIONSHIPS,
} from "@/types/investor";

import CountrySelect, { type CountryOption } from "../shared/CountrySelect";
import { Currency } from "@/types/currency";
import { toast } from "sonner";

const EMPTY_COUNTRIES: CountryOption[] = [];

const INITIAL_FORM: ClassificationForm = {
  investmentType: InvestorType.INDIVIDUAL ?? "",
  individualInvestmentType: IndividualInvestmentType.MYSELF,

  investmentAmount: "",
  minInvestmentAmount: "",
  maxInvestmentAmount: "",

  beneficiaryFirstName: "",
  beneficiaryMiddleName: "",
  beneficiaryLastName: "",
  beneficiaryEmail: "",
  beneficiaryPhoneNumber: "",
  beneficiaryDateOfBirth: "",
  beneficiaryRelationship: "",
  beneficiaryAddress: "",

  jointInvestorFirstName: "",
  jointInvestorMiddleName: "",
  jointInvestorLastName: "",
  jointInvestorEmail: "",
  jointInvestorPhoneNumber: "",
  jointInvestorDateOfBirth: "",
  jointInvestorRelationship: "",
  jointInvestorAddress: "",

  isPoliticallyExposed: null,

  corporateLegalName: "",
  corporateRegistrationNumber: "",
  corporateEntityType: "",
  corporateCountryOfRegistration: "",
  corporateDateOfIncorporation: "",
  corporateTaxIdentificationNumber: "",
  corporateWebsite: "",
  corporateBusinessActivity: "",
  corporateRegisteredAddress: "",

  institutionalLegalName: "",
  institutionalType: "",
  institutionalRegistrationNumber: "",
  institutionalCountryOfRegistration: "",
  institutionalDateOfEstablishment: "",
  institutionalTaxIdentificationNumber: "",
  institutionalRegulatoryBody: "",
  institutionalLicenseNumber: "",
  institutionalWebsite: "",
  institutionalBusinessActivity: "",
  institutionalRegisteredAddress: "",
};

type InvestorClassificationStepWithCountriesProps =
  InvestorClassificationStepProps & {
    countries?: CountryOption[];
    currency?: Currency;

    // Allows the parent onboarding page to validate before proceeding.
    registerValidator?: (validator: () => boolean) => void;
  };

type ClassificationErrors = Partial<Record<keyof ClassificationForm, string>>;

const validateClassification = (
  form: ClassificationForm,
  minimum: number,
  maximum: number,
): ClassificationErrors => {
  const errors: ClassificationErrors = {};

  const required = (
    field: keyof ClassificationForm,
    label: string,
    value: unknown,
  ) => {
    if (typeof value !== "string" || !value.trim()) {
      errors[field] = `${label} is required`;
    }
  };

  const validEmail = (
    field: keyof ClassificationForm,
    label: string,
    value: string,
  ) => {
    required(field, label, value);

    if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      errors[field] = `Enter a valid ${label.toLowerCase()}`;
    }
  };

  const validDate = (
    field: keyof ClassificationForm,
    label: string,
    value: string,
    mustBeAdult = false,
  ) => {
    required(field, label, value);

    if (!value.trim()) return;

    // Accept HTML date input format: YYYY-MM-DD
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

    if (!match) {
      errors[field] = `Enter a valid ${label.toLowerCase()}`;
      return;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const date = new Date(year, month - 1, day);

    // Reject impossible dates such as 2024-02-30.
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      errors[field] = `Enter a valid ${label.toLowerCase()}`;
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date > today) {
      errors[field] = `${label} cannot be in the future`;
      return;
    }

    if (mustBeAdult) {
      const adultDate = new Date(
        date.getFullYear() + 18,
        date.getMonth(),
        date.getDate(),
      );

      if (adultDate > today) {
        errors[field] = `${label}: the person must be at least 18 years old`;
      }
    }
  };

  const validWebsite = (field: keyof ClassificationForm, value: string) => {
    if (!value.trim()) return;

    try {
      const url = new URL(value.trim());

      if (url.protocol !== "https:" && url.protocol !== "http:") {
        errors[field] = "Enter a valid HTTP or HTTPS website URL";
      }
    } catch {
      errors[field] = "Enter a valid website URL, including https://";
    }
  };

  // Investment amount
  const amount = form.investmentAmount.trim();
  const parsedAmount = Number(amount);

  if (!amount) {
    errors.investmentAmount = "Investment amount is required";
  } else if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    errors.investmentAmount = "Enter a valid positive investment amount";
  } else if (
    !Number.isFinite(minimum) ||
    !Number.isFinite(maximum) ||
    minimum < 0 ||
    maximum < minimum
  ) {
    errors.investmentAmount =
      "The application's investment limits are invalid. Please contact support.";
  } else if (parsedAmount < minimum) {
    errors.investmentAmount = `The minimum investment is ${minimum.toFixed(2)}`;
  } else if (parsedAmount > maximum) {
    errors.investmentAmount = `The maximum investment is ${maximum.toFixed(2)}`;
  }

  // Investor type
  const investorTypes = Object.values(InvestorType) as string[];

  if (!investorTypes.includes(form.investmentType)) {
    errors.investmentType = "Select a valid investor type";
  }

  // Individual investor
  if (form.investmentType === InvestorType.INDIVIDUAL) {
    const purposes = Object.values(IndividualInvestmentType) as string[];

    if (!purposes.includes(form.individualInvestmentType)) {
      errors.individualInvestmentType = "Select an investment purpose";
    }

    if (
      form.isPoliticallyExposed !== true &&
      form.isPoliticallyExposed !== false
    ) {
      errors.isPoliticallyExposed =
        "Please indicate whether any involved investor is a PEP";
    }

    if (
      form.individualInvestmentType === IndividualInvestmentType.SOMEONE_ELSE
    ) {
      required(
        "beneficiaryFirstName",
        "Beneficiary first name",
        form.beneficiaryFirstName,
      );
      required(
        "beneficiaryLastName",
        "Beneficiary last name",
        form.beneficiaryLastName,
      );
      validEmail(
        "beneficiaryEmail",
        "Beneficiary email",
        form.beneficiaryEmail,
      );
      required(
        "beneficiaryPhoneNumber",
        "Beneficiary phone number",
        form.beneficiaryPhoneNumber,
      );
      validDate(
        "beneficiaryDateOfBirth",
        "Beneficiary date of birth",
        form.beneficiaryDateOfBirth,
        true,
      );
      required(
        "beneficiaryRelationship",
        "Beneficiary relationship",
        form.beneficiaryRelationship,
      );
      required(
        "beneficiaryAddress",
        "Beneficiary address",
        form.beneficiaryAddress,
      );
    }

    if (
      form.individualInvestmentType ===
      IndividualInvestmentType.JOINT_INVESTMENT
    ) {
      required(
        "jointInvestorFirstName",
        "Joint investor first name",
        form.jointInvestorFirstName,
      );
      required(
        "jointInvestorLastName",
        "Joint investor last name",
        form.jointInvestorLastName,
      );
      validEmail(
        "jointInvestorEmail",
        "Joint investor email",
        form.jointInvestorEmail,
      );
      required(
        "jointInvestorPhoneNumber",
        "Joint investor phone number",
        form.jointInvestorPhoneNumber,
      );
      validDate(
        "jointInvestorDateOfBirth",
        "Joint investor date of birth",
        form.jointInvestorDateOfBirth,
        true,
      );
      required(
        "jointInvestorRelationship",
        "Joint investor relationship",
        form.jointInvestorRelationship,
      );
      required(
        "jointInvestorAddress",
        "Joint investor address",
        form.jointInvestorAddress,
      );
    }
  }

  // Corporate investor
  if (form.investmentType === InvestorType.CORPORATE) {
    required(
      "corporateLegalName",
      "Corporate legal name",
      form.corporateLegalName,
    );
    required(
      "corporateRegistrationNumber",
      "Corporate registration number",
      form.corporateRegistrationNumber,
    );
    required(
      "corporateEntityType",
      "Corporate entity type",
      form.corporateEntityType,
    );
    required(
      "corporateCountryOfRegistration",
      "Corporate country of registration",
      form.corporateCountryOfRegistration,
    );
    validDate(
      "corporateDateOfIncorporation",
      "Date of incorporation",
      form.corporateDateOfIncorporation,
    );
    required(
      "corporateBusinessActivity",
      "Corporate business activity",
      form.corporateBusinessActivity,
    );
    required(
      "corporateRegisteredAddress",
      "Corporate registered address",
      form.corporateRegisteredAddress,
    );

    validWebsite("corporateWebsite", form.corporateWebsite);
  }

  // Institutional investor
  if (form.investmentType === InvestorType.INSTITUTION) {
    required(
      "institutionalLegalName",
      "Institutional legal name",
      form.institutionalLegalName,
    );
    required("institutionalType", "Institution type", form.institutionalType);
    required(
      "institutionalRegistrationNumber",
      "Institutional registration number",
      form.institutionalRegistrationNumber,
    );
    required(
      "institutionalCountryOfRegistration",
      "Institutional country of registration",
      form.institutionalCountryOfRegistration,
    );
    validDate(
      "institutionalDateOfEstablishment",
      "Date of establishment",
      form.institutionalDateOfEstablishment,
    );
    required(
      "institutionalRegulatoryBody",
      "Regulatory body",
      form.institutionalRegulatoryBody,
    );
    required(
      "institutionalLicenseNumber",
      "License number",
      form.institutionalLicenseNumber,
    );
    required(
      "institutionalBusinessActivity",
      "Institutional business activity",
      form.institutionalBusinessActivity,
    );
    required(
      "institutionalRegisteredAddress",
      "Institutional registered address",
      form.institutionalRegisteredAddress,
    );

    validWebsite("institutionalWebsite", form.institutionalWebsite);
  }

  return errors;
};

const InvestorClassificationStep = ({
  value,
  onChange,
  countries = EMPTY_COUNTRIES,
  minInvestmentAmount,
  maxInvestmentAmount,
  currency,
  registerValidator,
}: InvestorClassificationStepWithCountriesProps) => {
  const [form, setForm] = useState<ClassificationForm>({
    ...INITIAL_FORM,
    ...value,
  });

  const [validationErrors, setValidationErrors] =
    useState<ClassificationErrors>({});

  const [corporateCountry, setCorporateCountry] =
    useState<CountryOption | null>(null);

  const [institutionalCountry, setInstitutionalCountry] =
    useState<CountryOption | null>(null);

  const [investmentAmountError, setInvestmentAmountError] = useState("");

  const minimum = Number(minInvestmentAmount);
  const maximum = Number(maxInvestmentAmount);

  const validateStep = useCallback((): boolean => {
    const errors = validateClassification(form, minimum, maximum);

    setValidationErrors(errors);

    const firstError = Object.values(errors).find(Boolean);

    if (firstError) {
      toast.error(firstError);
      return false;
    }

    return true;
  }, [form, minimum, maximum]);

  useEffect(() => {
    registerValidator?.(validateStep);
  }, [registerValidator, validateStep]);

  const suggestedAmounts = [
    minimum,
    minimum + (maximum - minimum) * 0.25,
    minimum + (maximum - minimum) * 0.5,
    maximum,
  ]
    .map((amount) => Math.round(amount * 100) / 100)
    .filter((amount, index, amounts) => amounts.indexOf(amount) === index);

  const handleInvestmentAmountChange = (amount: string) => {
    updateForm("investmentAmount", amount);

    const errors = validateClassification(
      { ...form, investmentAmount: amount },
      minimum,
      maximum,
    );

    const error = errors.investmentAmount ?? "";

    setInvestmentAmountError(error);

    setValidationErrors((previous) => {
      const next = { ...previous };

      if (error) {
        next.investmentAmount = error;
      } else {
        delete next.investmentAmount;
      }

      return next;
    });
  };

  const countriesById = useMemo(
    () => new Map(countries.map((country) => [country.id, country])),
    [countries],
  );

  const resolveCountry = (savedValue?: string | null): CountryOption | null => {
    if (!savedValue) return null;

    return (
      countriesById.get(savedValue) ??
      countries.find(
        (country) => country.name.toLowerCase() === savedValue.toLowerCase(),
      ) ??
      null
    );
  };

  useEffect(() => {
    if (!value) return;

    setForm({
      ...INITIAL_FORM,
      ...value,
    });
  }, [value]);

  useEffect(() => {
    setCorporateCountry(resolveCountry(form.corporateCountryOfRegistration));

    setInstitutionalCountry(
      resolveCountry(form.institutionalCountryOfRegistration),
    );
  }, [
    form.corporateCountryOfRegistration,
    form.institutionalCountryOfRegistration,
    countriesById,
    countries,
  ]);

  const updateForm = <K extends keyof ClassificationForm>(
    field: K,
    fieldValue: ClassificationForm[K],
  ) => {
    const updated: ClassificationForm = {
      ...form,
      [field]: fieldValue,
    };

    setForm(updated);
    onChange?.(updated);

    setValidationErrors((previous) => {
      if (!previous[field]) return previous;

      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleCorporateCountryChange = (country: CountryOption | null) => {
    setCorporateCountry(country);
    updateForm("corporateCountryOfRegistration", country?.id ?? "");
  };

  const handleInstitutionalCountryChange = (country: CountryOption | null) => {
    setInstitutionalCountry(country);
    updateForm("institutionalCountryOfRegistration", country?.id ?? "");
  };

  const selectInvestorType = (
    investmentType: ClassificationForm["investmentType"],
  ) => {
    const updated: ClassificationForm = {
      ...form,
      investmentType,
    };

    if (investmentType !== InvestorType.INDIVIDUAL) {
      updated.individualInvestmentType = IndividualInvestmentType.SOMEONE_ELSE;

      updated.beneficiaryFirstName = "";
      updated.beneficiaryMiddleName = "";
      updated.beneficiaryLastName = "";
      updated.beneficiaryEmail = "";
      updated.beneficiaryPhoneNumber = "";
      updated.beneficiaryDateOfBirth = "";
      updated.beneficiaryRelationship = "";
      updated.beneficiaryAddress = "";

      updated.jointInvestorFirstName = "";
      updated.jointInvestorMiddleName = "";
      updated.jointInvestorLastName = "";
      updated.jointInvestorEmail = "";
      updated.jointInvestorPhoneNumber = "";
      updated.jointInvestorDateOfBirth = "";
      updated.jointInvestorRelationship = "";
      updated.jointInvestorAddress = "";
    }

    if (investmentType !== InvestorType.CORPORATE) {
      updated.corporateLegalName = "";
      updated.corporateRegistrationNumber = "";
      updated.corporateEntityType = "";
      updated.corporateCountryOfRegistration = "";
      updated.corporateDateOfIncorporation = "";
      updated.corporateTaxIdentificationNumber = "";
      updated.corporateWebsite = "";
      updated.corporateBusinessActivity = "";
      updated.corporateRegisteredAddress = "";
    }

    if (investmentType !== InvestorType.INSTITUTION) {
      updated.institutionalLegalName = "";
      updated.institutionalType = "";
      updated.institutionalRegistrationNumber = "";
      updated.institutionalCountryOfRegistration = "";
      updated.institutionalDateOfEstablishment = "";
      updated.institutionalTaxIdentificationNumber = "";
      updated.institutionalRegulatoryBody = "";
      updated.institutionalLicenseNumber = "";
      updated.institutionalWebsite = "";
      updated.institutionalBusinessActivity = "";
      updated.institutionalRegisteredAddress = "";
    }

    setForm(updated);
    onChange?.(updated);
  };

  const selectIndividualInvestmentType = (
    individualInvestmentType: ClassificationForm["individualInvestmentType"],
  ) => {
    const updated: ClassificationForm = {
      ...form,
      individualInvestmentType,
    };

    if (individualInvestmentType !== IndividualInvestmentType.SOMEONE_ELSE) {
      updated.beneficiaryFirstName = "";
      updated.beneficiaryMiddleName = "";
      updated.beneficiaryLastName = "";
      updated.beneficiaryEmail = "";
      updated.beneficiaryPhoneNumber = "";
      updated.beneficiaryDateOfBirth = "";
      updated.beneficiaryRelationship = "";
      updated.beneficiaryAddress = "";
    }

    if (
      individualInvestmentType !== IndividualInvestmentType.JOINT_INVESTMENT
    ) {
      updated.jointInvestorFirstName = "";
      updated.jointInvestorMiddleName = "";
      updated.jointInvestorLastName = "";
      updated.jointInvestorEmail = "";
      updated.jointInvestorPhoneNumber = "";
      updated.jointInvestorDateOfBirth = "";
      updated.jointInvestorRelationship = "";
      updated.jointInvestorAddress = "";
    }

    setForm(updated);
    onChange?.(updated);
  };

  return (
    <div className="space-y-8">
      {/* Investment Amount */}
      <Card className="space-y-5 p-5">
        <div>
          <h2 className="text-xl font-semibold">Investment amount</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose how much you want to invest. Your amount must be within the
            application's approved investment range.
          </p>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-muted-foreground">Minimum investment</span>
            <span className="font-semibold">
              {" "}
              {currency?.iso} {minimum.toFixed(2)}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-muted-foreground">Maximum investment</span>
            <span className="font-semibold">
              {currency?.iso} {maximum.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="investmentAmount">Amount you want to invest</Label>

          <Input
            id="investmentAmount"
            type="number"
            min={minimum}
            max={maximum}
            step="0.01"
            value={form.investmentAmount}
            placeholder={`Enter an amount (${minimum} - ${maximum})`}
            onChange={(event) =>
              handleInvestmentAmountChange(event.target.value)
            }
            aria-invalid={Boolean(investmentAmountError)}
          />

          {investmentAmountError && (
            <p className="text-sm text-destructive">{investmentAmountError}</p>
          )}

          {validationErrors.investmentAmount && (
            <p className="text-sm text-destructive" role="alert">
              {validationErrors.investmentAmount}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label>Suggested amounts</Label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {suggestedAmounts.map((amount) => {
              const selected =
                form.investmentAmount !== "" &&
                Number(form.investmentAmount) === amount;

              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleInvestmentAmountChange(String(amount))}
                  aria-pressed={selected}
                  className={[
                    "rounded-lg border p-3 text-sm font-medium transition",
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted",
                  ].join(" ")}
                >
                  {amount.toLocaleString()}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-semibold">Investor classification</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Tell us who is making this investment and the type of investor you
          represent.
        </p>
      </div>

      {/* Investor Type */}
      <section className="space-y-4">
        <div>
          <Label className="text-base font-semibold">Investor type</Label>

          <p className="mt-1 text-sm text-muted-foreground">
            Select the type of investor for this investment.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
          <InvestorTypeCard
            title="Individual"
            description="Investing as a person."
            icon={<UserRound className="h-5 w-5" />}
            selected={form.investmentType === InvestorType.INDIVIDUAL}
            onClick={() => selectInvestorType(InvestorType.INDIVIDUAL)}
          />

          <InvestorTypeCard
            title="Corporate"
            description="Investing through a registered company."
            icon={<Building2 className="h-5 w-5" />}
            selected={form.investmentType === InvestorType.CORPORATE}
            onClick={() => selectInvestorType(InvestorType.CORPORATE)}
          />

          <InvestorTypeCard
            title="Institutional"
            description="Investing through an institution."
            icon={<Landmark className="h-5 w-5" />}
            selected={form.investmentType === InvestorType.INSTITUTION}
            onClick={() => selectInvestorType(InvestorType.INSTITUTION)}
          />
        </div>
      </section>

      {/* Individual */}
      {form.investmentType === InvestorType.INDIVIDUAL && (
        <section className="space-y-6">
          <div>
            <Label className="text-base font-semibold">
              Investment purpose
            </Label>

            <p className="mt-1 text-sm text-muted-foreground">
              Tell us who the investment is being made for.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
            <InvestorTypeCard
              title="Myself"
              description="I am investing for myself."
              icon={<UserRound className="h-6 w-6" />}
              selected={
                form.individualInvestmentType ===
                IndividualInvestmentType.MYSELF
              }
              onClick={() => selectIndividualInvestmentType("MYSELF")}
            />

            <InvestorTypeCard
              title="Someone else"
              description="I am investing on behalf of another person."
              icon={<Users className="h-6 w-6" />}
              selected={
                form.individualInvestmentType ===
                IndividualInvestmentType.SOMEONE_ELSE
              }
              onClick={() => selectIndividualInvestmentType("SOMEONE_ELSE")}
            />

            <InvestorTypeCard
              title="Joint investment"
              description="The investment will be jointly owned."
              icon={<Users className="h-6 w-6" />}
              selected={
                form.individualInvestmentType ===
                IndividualInvestmentType.JOINT_INVESTMENT
              }
              onClick={() => selectIndividualInvestmentType("JOINT_INVESTMENT")}
            />
          </div>
          {form.individualInvestmentType ===
            IndividualInvestmentType.SOMEONE_ELSE && (
            <PersonForm
              title="Beneficiary information"
              firstName={form.beneficiaryFirstName}
              middleName={form.beneficiaryMiddleName}
              lastName={form.beneficiaryLastName}
              email={form.beneficiaryEmail}
              phone={form.beneficiaryPhoneNumber}
              dateOfBirth={form.beneficiaryDateOfBirth}
              relationship={form.beneficiaryRelationship}
              address={form.beneficiaryAddress}
              onChange={(field, value) => updateForm(field, value)}
              fields={{
                firstName: "beneficiaryFirstName",
                middleName: "beneficiaryMiddleName",
                lastName: "beneficiaryLastName",
                email: "beneficiaryEmail",
                phone: "beneficiaryPhoneNumber",
                dateOfBirth: "beneficiaryDateOfBirth",
                relationship: "beneficiaryRelationship",
                address: "beneficiaryAddress",
              }}
            />
          )}
          {form.individualInvestmentType ===
            IndividualInvestmentType.JOINT_INVESTMENT && (
            <PersonForm
              title="Joint investor information"
              firstName={form.jointInvestorFirstName}
              middleName={form.jointInvestorMiddleName}
              lastName={form.jointInvestorLastName}
              email={form.jointInvestorEmail}
              phone={form.jointInvestorPhoneNumber}
              dateOfBirth={form.jointInvestorDateOfBirth}
              relationship={form.jointInvestorRelationship}
              address={form.jointInvestorAddress}
              onChange={(field, value) => updateForm(field, value)}
              fields={{
                firstName: "jointInvestorFirstName",
                middleName: "jointInvestorMiddleName",
                lastName: "jointInvestorLastName",
                email: "jointInvestorEmail",
                phone: "jointInvestorPhoneNumber",
                dateOfBirth: "jointInvestorDateOfBirth",
                relationship: "jointInvestorRelationship",
                address: "jointInvestorAddress",
              }}
            />
          )}

          {form.individualInvestmentType && (
            <section className="space-y-3">
              <Label className="text-base font-semibold">
                Politically exposed person
              </Label>

              <p className="text-sm text-muted-foreground">
                Are you, the beneficiary, or a joint investor a politically
                exposed person (PEP)?
              </p>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
                <button
                  type="button"
                  onClick={() => updateForm("isPoliticallyExposed", true)}
                  className={[
                    "rounded-lg border p-4 text-left transition",
                    form.isPoliticallyExposed === true
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted",
                  ].join(" ")}
                >
                  <div className="font-medium">Yes</div>

                  <div className="mt-1 text-sm text-muted-foreground">
                    I am or someone involved is a PEP.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateForm("isPoliticallyExposed", false)}
                  className={[
                    "rounded-lg border p-4 text-left transition",
                    form.isPoliticallyExposed === false
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted",
                  ].join(" ")}
                >
                  <div className="font-medium">No</div>

                  <div className="mt-1 text-sm text-muted-foreground">
                    None of the involved investors are PEPs.
                  </div>
                </button>
              </div>
            </section>
          )}
        </section>
      )}

      {/* Corporate */}
      {form.investmentType === InvestorType.CORPORATE && (
        <section className="space-y-6">
          <SectionHeading
            title="Corporate information"
            description="Provide the legal and registration information of the company."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Legal name"
              placeholder="Enter registered company name"
              value={form.corporateLegalName}
              onChange={(value) => updateForm("corporateLegalName", value)}
              required
              error={validationErrors.corporateLegalName}
            />

            <FormField
              label="Registration number"
              placeholder="Enter company registration number"
              value={form.corporateRegistrationNumber}
              onChange={(value) =>
                updateForm("corporateRegistrationNumber", value)
              }
              required
              error={validationErrors.corporateRegistrationNumber}
            />

            <div className="space-y-2">
              <Label>
                Entity type
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <select
                value={form.corporateEntityType}
                onChange={(event) =>
                  updateForm("corporateEntityType", event.target.value)
                }
                required
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer "
              >
                <option value="">Select entity type</option>

                {ENTITY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <CountrySelect
              label="Country of registration"
              placeholder="Select country of registration"
              value={corporateCountry}
              onChange={handleCorporateCountryChange}
              required
            />

            <FormField
              label="Date of incorporation"
              type="date"
              value={form.corporateDateOfIncorporation}
              onChange={(value) =>
                updateForm("corporateDateOfIncorporation", value)
              }
              required
              error={validationErrors.corporateDateOfIncorporation}
            />

            <FormField
              label="Tax identification number"
              placeholder="Enter tax ID (if applicable)"
              value={form.corporateTaxIdentificationNumber}
              onChange={(value) =>
                updateForm("corporateTaxIdentificationNumber", value)
              }
              error={validationErrors.corporateTaxIdentificationNumber}
            />

            <FormField
              label="Website"
              type="url"
              value={form.corporateWebsite}
              onChange={(value) => updateForm("corporateWebsite", value)}
              placeholder="https://"
              error={validationErrors.corporateWebsite}
            />

            <FormField
              label="Business activity"
              placeholder="Describe the company's main activity"
              value={form.corporateBusinessActivity}
              onChange={(value) =>
                updateForm("corporateBusinessActivity", value)
              }
              required
              error={validationErrors.corporateBusinessActivity}
            />
          </div>

          <FormField
            label="Registered address"
            placeholder="Enter full registered address"
            value={form.corporateRegisteredAddress}
            onChange={(value) =>
              updateForm("corporateRegisteredAddress", value)
            }
            required
            error={validationErrors.corporateRegisteredAddress}
          />
        </section>
      )}

      {/* Institutional */}
      {form.investmentType === InvestorType.INSTITUTION && (
        <section className="space-y-6">
          <SectionHeading
            title="Institutional information"
            description="Provide the legal and regulatory information of the institution."
          />

          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Legal name"
              placeholder="Enter registered company name"
              value={form.institutionalLegalName}
              onChange={(value) => updateForm("institutionalLegalName", value)}
              required
              error={validationErrors.institutionalLegalName}
            />
            <div className="space-y-2">
              <Label>
                Institution type
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <select
                value={form.institutionalType}
                onChange={(event) =>
                  updateForm("institutionalType", event.target.value)
                }
                required
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer "
              >
                <option value="">Select institution type</option>

                {INSTITUTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <FormField
              label="Registration number"
              placeholder="Enter company registration number"
              value={form.institutionalRegistrationNumber}
              onChange={(value) =>
                updateForm("institutionalRegistrationNumber", value)
              }
              required
              error={validationErrors.institutionalRegistrationNumber}
            />
            <CountrySelect
              label="Country of registration"
              placeholder="Select country of registration"
              value={institutionalCountry}
              onChange={handleInstitutionalCountryChange}
              required
            />
            <FormField
              label="Date of establishment"
              type="date"
              value={form.institutionalDateOfEstablishment}
              onChange={(value) =>
                updateForm("institutionalDateOfEstablishment", value)
              }
              required
              error={validationErrors.institutionalDateOfEstablishment}
            />
            <FormField
              label="Tax identification number"
              placeholder="Enter tax ID (if applicable)"
              value={form.institutionalTaxIdentificationNumber}
              onChange={(value) =>
                updateForm("institutionalTaxIdentificationNumber", value)
              }
              error={validationErrors.institutionalTaxIdentificationNumber}
            />
            <FormField
              label="Regulatory body"
              placeholder="e.g. SEC, CBN, PENCOM"
              value={form.institutionalRegulatoryBody}
              onChange={(value) =>
                updateForm("institutionalRegulatoryBody", value)
              }
              required
              error={validationErrors.institutionalRegulatoryBody}
            />
            <FormField
              label="License number"
              placeholder="Enter regulatory license number"
              value={form.institutionalLicenseNumber}
              onChange={(value) =>
                updateForm("institutionalLicenseNumber", value)
              }
              required
              error={validationErrors.institutionalLicenseNumber}
            />
            <FormField
              label="Website"
              type="url"
              value={form.institutionalWebsite}
              onChange={(value) => updateForm("institutionalWebsite", value)}
              placeholder="https://"
              error={validationErrors.institutionalWebsite}
            />
            <FormField
              label="Business activity"
              placeholder="Describe the institution's main activity"
              value={form.institutionalBusinessActivity}
              onChange={(value) =>
                updateForm("institutionalBusinessActivity", value)
              }
              required
              error={validationErrors.institutionalBusinessActivity}
            />
          </div>

          <FormField
            label="Registered address"
            placeholder="Enter full registered address"
            value={form.institutionalRegisteredAddress}
            onChange={(value) =>
              updateForm("institutionalRegisteredAddress", value)
            }
            required
            error={validationErrors.institutionalRegisteredAddress}
          />
        </section>
      )}

      {/* Information */}
      <Card className="border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">Why we need this information</p>

            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              This information helps us establish the legal ownership and
              classification of the investment and supports our investor
              verification and regulatory obligations.
            </p>
          </div>
        </div>
      </Card>

      {/* Summary */}
      {form.investmentType && (
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />

            <h3 className="font-semibold">Classification selected</h3>
          </div>

          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <SummaryItem
              label="Investor type"
              value={formatValue(form.investmentType)}
            />

            {form.investmentType === InvestorType.INDIVIDUAL && (
              <SummaryItem
                label="Investment purpose"
                value={formatValue(form.individualInvestmentType)}
              />
            )}

            {form.investmentType === InvestorType.CORPORATE && (
              <>
                <SummaryItem
                  label="Legal name"
                  value={form.corporateLegalName}
                />

                <SummaryItem
                  label="Country of registration"
                  value={corporateCountry?.name ?? ""}
                />
              </>
            )}

            {form.investmentType === InvestorType.INSTITUTION && (
              <>
                <SummaryItem
                  label="Legal name"
                  value={form.institutionalLegalName}
                />

                <SummaryItem
                  label="Country of registration"
                  value={institutionalCountry?.name ?? ""}
                />
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

interface InvestorTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const InvestorTypeCard = ({
  title,
  description,
  icon,
  selected,
  onClick,
}: InvestorTypeCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "flex w-full min-w-0 items-center gap-3 rounded-xl border p-3 text-left",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "focus-visible:ring-offset-2",
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-background hover:border-primary/40 hover:bg-muted/40",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          "transition-colors",
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={[
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
          "transition-colors duration-200",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/40 bg-transparent",
        ].join(" ")}
      >
        {selected && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
    </button>
  );
};

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const FormField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  error,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label>
        {label}

        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

interface PersonFormProps {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  relationship: string;
  address: string;
  onChange: (field: keyof ClassificationForm, value: string) => void;
  fields: {
    firstName: keyof ClassificationForm;
    middleName: keyof ClassificationForm;
    lastName: keyof ClassificationForm;
    email: keyof ClassificationForm;
    phone: keyof ClassificationForm;
    dateOfBirth: keyof ClassificationForm;
    relationship: keyof ClassificationForm;
    address: keyof ClassificationForm;
  };
}

const PersonForm = ({
  title,
  firstName,
  middleName,
  lastName,
  email,
  phone,
  dateOfBirth,
  relationship,
  address,
  onChange,
  fields,
}: PersonFormProps) => {
  return (
    <Card className="space-y-5 p-5">
      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Provide the relevant investor information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <FormField
          label="First name"
          placeholder="Enter first name"
          value={firstName}
          onChange={(value) => onChange(fields.firstName, value)}
          required
        />

        <FormField
          label="Middle name"
          placeholder="Enter middle name (optional)"
          value={middleName}
          onChange={(value) => onChange(fields.middleName, value)}
        />

        <FormField
          label="Last name"
          placeholder="Enter last name"
          value={lastName}
          onChange={(value) => onChange(fields.lastName, value)}
          required
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label="Email"
          placeholder="name@example.com"
          type="email"
          value={email}
          onChange={(value) => onChange(fields.email, value)}
          required
        />

        <FormField
          label="Phone number"
          placeholder="name@example.com"
          type="tel"
          value={phone}
          onChange={(value) => onChange(fields.phone, value)}
          required
        />

        <FormField
          label="Date of birth"
          type="date"
          value={dateOfBirth}
          onChange={(value) => onChange(fields.dateOfBirth, value)}
          required
        />

        <div className="space-y-2">
          <Label>
            Relationship
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <select
            value={relationship}
            onChange={(event) =>
              onChange(fields.relationship, event.target.value)
            }
            required
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Select relationship</option>

            {RELATIONSHIPS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <FormField
        label="Address"
        placeholder="Enter residential address"
        value={address}
        onChange={(value) => onChange(fields.address, value)}
        required
      />
    </Card>
  );
};

const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h3 className="text-base font-semibold">{title}</h3>

      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const SummaryItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 font-medium">{value || "Not provided"}</p>
    </div>
  );
};

const formatValue = (value: string) => {
  if (!value) return "Not selected";

  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

export default InvestorClassificationStep;
