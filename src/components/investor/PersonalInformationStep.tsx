import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Info,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hooks";
import { useProfile } from "@/services";
import CountrySelect, { CountryOption } from "../shared/CountrySelect";

export interface PersonalInformationData {
  dateOfBirth: string;
  countryOfOriginId: string;
  countryOfResidenceId: string;
  residentialAddress: string;
  city: string;
  state: string;
  phone: string;
}

interface PersonalInformationStepProps {
  initialData?: Partial<PersonalInformationData> | null;
  onChange?: (data: PersonalInformationData) => void;
  onValidityChange?: (isValid: boolean) => void;
}

const PersonalInformationStep = ({
  initialData,
  onChange,
  onValidityChange,
}: PersonalInformationStepProps) => {
  const auth = useAppSelector((state) => state.auth);
  const userId = auth?.user?.id ?? "";

  const { data: user, isLoading: isProfileLoading } = useProfile(userId);

  const [dateOfBirth, setDateOfBirth] = useState(
    initialData?.dateOfBirth ?? "",
  );

  const [residentialAddress, setResidentialAddress] = useState(
    initialData?.residentialAddress ?? "",
  );

  const [city, setCity] = useState(initialData?.city ?? "");
  const [state, setState] = useState(initialData?.state ?? "");

  // const [documentNumberLast4, setDocumentNumberLast4] = useState(
  //   initialData?.documentNumberLast4 ?? "",
  // );

  const [phone, setPhone] = useState("");

  const [countryOfResidence, setCountryOfResidence] =
    useState<CountryOption | null>(null);

  const [countryOfOrigin, setCountryOfOrigin] = useState<CountryOption | null>(
    null,
  );

  const initializedRef = useRef(false);
  const readyToSynchronizeRef = useRef(false);

  const fullPhone = useMemo(() => {
    const rawPhone = phone.trim();

    if (!rawPhone) {
      return "";
    }

    const dialCode = countryOfResidence?.dialCode?.trim();

    if (!dialCode) {
      return rawPhone;
    }

    const normalizedDialCode = dialCode.startsWith("+")
      ? dialCode
      : `+${dialCode}`;

    // Remove everything except digits.
    let nationalNumber = rawPhone.replace(/\D/g, "");

    // If the stored/input phone is already international,
    // remove the country code before rebuilding it.
    const countryCode = normalizedDialCode.replace(/\D/g, "");

    if (nationalNumber.startsWith(countryCode)) {
      nationalNumber = nationalNumber.slice(countryCode.length);
    }

    // Remove Nigerian/local trunk prefix.
    nationalNumber = nationalNumber.replace(/^0+/, "");

    return `${normalizedDialCode}${nationalNumber}`;
  }, [phone, countryOfResidence?.dialCode]);

  const fullName = useMemo(
    () =>
      [user?.firstName, user?.middleName, user?.lastName]
        .filter(Boolean)
        .join(" "),
    [user],
  );

  const maximumDateOfBirth = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split("T")[0];
  }, []);

  const toCountryOption = (
    country:
      | {
          id: string;
          name: string;
          iso2: string;
          iso3: string;
          flag: string;
          isActive: boolean;
          isSupported: boolean;
          dialCode?: string | null;
        }
      | null
      | undefined,
  ): CountryOption | null => {
    if (!country) {
      return null;
    }

    return {
      id: country.id,
      name: country.name,
      iso2: country.iso2,
      iso3: country.iso3,
      flag: country.flag,
      isActive: country.isActive,
      isSupported: country.isSupported,
      dialCode: country.dialCode ?? "",
    };
  };

  useEffect(() => {
    if (!user || initializedRef.current) {
      return;
    }

    const persistedOriginId = initialData?.countryOfOriginId ?? "";
    const persistedResidenceId = initialData?.countryOfResidenceId ?? "";

    const userResidence = toCountryOption(user.country);
    const userNationality = toCountryOption(user.nationality);

    let resolvedResidence: CountryOption | null = null;

    if (persistedResidenceId) {
      if (userResidence?.id === persistedResidenceId) {
        resolvedResidence = userResidence;
      }
    }

    if (!resolvedResidence && userResidence) {
      resolvedResidence = userResidence;
    }

    if (resolvedResidence) {
      setCountryOfResidence(resolvedResidence);
    }

    let resolvedOrigin: CountryOption | null = null;

    if (persistedOriginId) {
      if (userNationality?.id === persistedOriginId) {
        resolvedOrigin = userNationality;
      }
    }

    if (!resolvedOrigin && userNationality) {
      resolvedOrigin = userNationality;
    }

    if (resolvedOrigin) {
      setCountryOfOrigin(resolvedOrigin);
    }

    const accountPhone = user.phone ?? "";
    const countryCode = (user.country?.dialCode ?? "").replace(/\D/g, "");

    let nationalPhone = accountPhone.replace(/\D/g, "");

    if (countryCode && nationalPhone.startsWith(countryCode)) {
      nationalPhone = nationalPhone.slice(countryCode.length);
    }

    setPhone(nationalPhone);

    initializedRef.current = true;
    readyToSynchronizeRef.current = true;
  }, [user, initialData]);

  useEffect(() => {
    if (!initialData) {
      return;
    }

    if (initialData.dateOfBirth !== undefined) {
      setDateOfBirth(initialData.dateOfBirth);
    }

    if (initialData.residentialAddress !== undefined) {
      setResidentialAddress(initialData.residentialAddress);
    }

    if (initialData.city !== undefined) {
      setCity(initialData.city);
    }

    if (initialData.state !== undefined) {
      setState(initialData.state);
    }
  }, [
    initialData?.dateOfBirth,
    initialData?.residentialAddress,
    initialData?.city,
    initialData?.state,
  ]);

  const formData = useMemo<PersonalInformationData>(
    () => ({
      dateOfBirth: dateOfBirth.trim(),
      countryOfOriginId: countryOfOrigin?.id ?? "",
      countryOfResidenceId: countryOfResidence?.id ?? "",
      residentialAddress: residentialAddress.trim(),
      city: city.trim(),
      state: state.trim(),
      phone: fullPhone,
    }),
    [
      dateOfBirth,
      countryOfOrigin,
      countryOfResidence,
      residentialAddress,
      city,
      state,
      fullPhone,
    ],
  );

  const isValid = useMemo(() => {
    if (!formData.dateOfBirth) {
      return false;
    }

    if (!formData.countryOfOriginId) {
      return false;
    }

    if (!formData.phone) {
      return false;
    }

    if (!formData.countryOfResidenceId) {
      return false;
    }

    if (!formData.residentialAddress) {
      return false;
    }

    if (formData.residentialAddress.length > 300) {
      return false;
    }

    if (!formData.city || formData.city.length < 2) {
      return false;
    }

    if (formData.city.length > 100) {
      return false;
    }

    if (!formData.state || formData.state.length < 2) {
      return false;
    }

    if (formData.state.length > 100) {
      return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)) {
      return false;
    }

    const dob = new Date(`${formData.dateOfBirth}T00:00:00.000Z`);
    if (Number.isNaN(dob.getTime())) {
      return false;
    }

    const today = new Date();
    if (dob > today) {
      return false;
    }

    const maximumDob = new Date(`${maximumDateOfBirth}T00:00:00.000Z`);
    if (dob > maximumDob) {
      return false;
    }
    return true;
  }, [formData, maximumDateOfBirth]);

  useEffect(() => {
    onChange?.(formData);
    onValidityChange?.(isValid);
  }, [formData, isValid, onChange, onValidityChange]);

  const residenceDialCode = countryOfResidence?.dialCode ?? "";

  const accountDialCode = user?.country?.dialCode ?? "";

  const getFlagUrl = (iso2?: string | null): string | null => {
    if (!iso2) {
      return null;
    }
    return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
  };

  const CountryFlag = ({
    country,
    size = "small",
  }: {
    country: CountryOption | null;
    size?: "small" | "medium";
  }) => {
    if (!country) {
      return (
        <span
          className={
            size === "medium"
              ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted text-lg shadow-sm"
              : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted text-base shadow-sm"
          }
        >
          🏳️
        </span>
      );
    }

    const flagUrl = getFlagUrl(country.iso2);

    return flagUrl ? (
      <img
        src={flagUrl}
        alt={`${country.name} flag`}
        width={size === "medium" ? 36 : 28}
        height={size === "medium" ? 36 : 28}
        className={
          size === "medium"
            ? "h-9 w-9 shrink-0 rounded-full border border-border/60 object-cover shadow-sm"
            : "h-7 w-7 shrink-0 rounded-full border border-border/60 object-cover shadow-sm"
        }
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    ) : (
      <span
        className={
          size === "medium"
            ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted text-lg shadow-sm"
            : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted text-base shadow-sm"
        }
      >
        {country.flag || "🏳️"}
      </span>
    );
  };

  if (isProfileLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="animate-pulse space-y-3">
          <div className="h-10 w-10 rounded-xl bg-muted" />
          <div className="h-7 w-64 rounded bg-muted" />
          <div className="h-4 w-full max-w-2xl rounded bg-muted" />
        </div>
        <Card>
          <CardContent className="space-y-5 p-6">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="h-10 animate-pulse rounded-md bg-muted" />
              <div className="h-10 animate-pulse rounded-md bg-muted" />
              <div className="h-10 animate-pulse rounded-md bg-muted" />
              <div className="h-10 animate-pulse rounded-md bg-muted" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div>
                <h2 className="font-semibold">Unable to load your profile</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your account information could not be loaded. Please refresh
                  the page and try again before continuing with investor
                  onboarding.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserRound className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Personal information
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Confirm your basic personal details and provide your current
          residential information.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">Account information</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Information already associated with your account.
              </p>
            </div>
            <Badge variant="secondary" className="w-fit">
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Account verified
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {/* Legal name */}
          <div className="space-y-2">
            <Label>Legal name</Label>
            <div className="flex min-h-10 items-center rounded-md border bg-muted/40 px-3 text-sm">
              {fullName || "Not provided"}
            </div>
            <p className="text-xs text-muted-foreground">
              To change your legal name, contact support.
            </p>
          </div>
          {/* Email */}
          <div className="space-y-2">
            <Label>Email address</Label>
            <div className="flex min-h-10 items-center rounded-md border bg-muted/40 px-3 text-sm">
              {user.email || "Not provided"}
            </div>
          </div>
          {/* Account country */}
          <div className="space-y-2">
            <Label>Account country</Label>
            <div className="flex min-h-10 items-center gap-2 rounded-md border bg-muted/40 px-3 text-sm">
              <CountryFlag
                country={toCountryOption(user.country)}
                size="medium"
              />
              <span> {user.country?.name || "Not provided"} </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Country currently associated with your account.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Phone number</Label>
            <div className="flex min-h-10 overflow-hidden rounded-md border bg-muted/40">
              {/* Account dial code */}
              <div className="flex min-w-[90px] items-center gap-1.5 border-r bg-muted/60 px-3 text-sm font-medium">
                {user.country?.flag && (
                  <span className="text-base leading-none">
                    {user.country.flag}
                  </span>
                )}
                <span> {accountDialCode || "--"} </span>
              </div>
              {/* Read-only account phone */}
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate text-sm">
                  {phone || "Not provided"}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              This is your account phone number. It can be updated from your
              account profile settings.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-4">
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Country information</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Select your current country of residence and country of origin.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <CountrySelect
                label="Country of residence"
                placeholder="Select country of residence"
                value={countryOfResidence}
                onChange={setCountryOfResidence}
                required
              />

              <CountrySelect
                label="Country of origin"
                placeholder="Select country of origin"
                value={countryOfOrigin}
                onChange={setCountryOfOrigin}
                required
              />
            </div>
            <div className="mt-4 rounded-lg border border-primary/10 bg-primary/[0.03] p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-xs leading-5 text-muted-foreground">
                  Country of origin is independent of your country of residence.
                  Select the country that represents your country of origin.
                </p>
              </div>
            </div>
          </div>
          <Separator />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="registeredPhone">Registered phone number</Label>
              <div className="flex min-h-11 overflow-hidden rounded-md border bg-background">
                {/* Residence dial code */}
                <div className="flex min-w-[90px] items-center gap-1.5 border-r bg-muted/60 px-3 text-sm font-medium">
                  {countryOfResidence?.flag && (
                    <span className="text-base leading-none">
                      {countryOfResidence.flag}
                    </span>
                  )}
                  <span> {residenceDialCode || "--"} </span>
                </div>
                {/* Editable phone */}
                <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                  <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <Input
                    id="registeredPhone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Enter phone number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                The dial code automatically follows your country of residence.
                The phone value is synchronized with the account phone shown
                above.
              </p>
            </div>

            {/* Date of birth */}
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">
                Date of birth
                <span className="ml-1 text-destructive"> * </span>
              </Label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  className="pl-10"
                  max={maximumDateOfBirth}
                  autoComplete="bday"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter your date of birth exactly as it appears on your identity
                document.
              </p>
            </div>
          </div>
          {/* ======================================================== RESIDENTIAL ADDRESS ======================================================== */}
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Residential address</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Provide your current residential address.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Address */}
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="residentialAddress">
                  Residential address
                  <span className="ml-1 text-destructive"> * </span>
                </Label>
                <Input
                  id="residentialAddress"
                  placeholder="Enter your residential address"
                  value={residentialAddress}
                  onChange={(event) =>
                    setResidentialAddress(event.target.value)
                  }
                  autoComplete="street-address"
                  maxLength={300}
                />
              </div>
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="ml-1 text-destructive"> * </span>
                </Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  autoComplete="address-level2"
                  maxLength={100}
                />
              </div>
              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">
                  State / Province
                  <span className="ml-1 text-destructive"> * </span>
                </Label>
                <Input
                  id="state"
                  placeholder="Enter state or province"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  autoComplete="address-level1"
                  maxLength={100}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* ============================================================ VALIDATION MESSAGE ============================================================ */}
      {!isValid && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium">
                Complete the required information
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Date of birth, country of origin, country of residence,
                residential address, city and state/province are required.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* ============================================================ INFORMATION NOTICE ============================================================ */}
      <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">Keep your information current</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Your residential information may be used for verification,
              investor communications and applicable compliance requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalInformationStep;
