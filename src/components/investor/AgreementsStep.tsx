import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2, FileCheck2, Info, ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Agreement, AgreementsValue } from "@/types/investor";

interface AgreementsStepProps {
  value?: AgreementsValue;
  agreements?: Agreement[];
  onChange?: (value: AgreementsValue) => void;
  registerValidator?: (validator: () => boolean) => void;
}

const DEFAULT_AGREEMENTS: Agreement[] = [
  {
    id: "investment-terms",
    title: "Investment terms and conditions",
    description:
      "I have read and agree to the terms and conditions governing my investment.",
    version: "1.0",
    required: true,
  },
  {
    id: "risk-disclosure",
    title: "Investment risk disclosure",
    description:
      "I acknowledge that investments involve risk and that returns are not guaranteed.",
    version: "1.0",
    required: true,
  },
  {
    id: "privacy-policy",
    title: "Privacy and data processing",
    description:
      "I consent to the processing of my information for investment administration, verification, and regulatory purposes.",
    version: "1.0",
    required: true,
  },
];

type DeclarationField =
  | "informationAccurate"
  | "understandRisks"
  | "authorizeVerification";

const AgreementsStep = ({
  value,
  agreements = DEFAULT_AGREEMENTS,
  onChange,
  registerValidator,
}: AgreementsStepProps) => {
  const [localValue, setLocalValue] = useState<AgreementsValue>({
    acceptedAgreementIds: [],
    declarations: {
      informationAccurate: false,
      understandRisks: false,
      authorizeVerification: false,
    },
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!value) return;

    setLocalValue({
      acceptedAgreementIds: value.acceptedAgreementIds ?? [],
      declarations: {
        informationAccurate: value.declarations?.informationAccurate ?? false,
        understandRisks: value.declarations?.understandRisks ?? false,
        authorizeVerification:
          value.declarations?.authorizeVerification ?? false,
      },
    });
  }, [value]);

  const requiredAgreements = useMemo(
    () => agreements.filter((agreement) => agreement.required !== false),
    [agreements],
  );

  const acceptedAgreementIds = localValue.acceptedAgreementIds ?? [];
  const declarations = localValue.declarations;

  const allRequiredAgreementsAccepted = requiredAgreements.every((agreement) =>
    acceptedAgreementIds.includes(agreement.id),
  );

  const allDeclarationsAccepted =
    declarations.informationAccurate === true &&
    declarations.understandRisks === true &&
    declarations.authorizeVerification === true;

  const isComplete = allRequiredAgreementsAccepted && allDeclarationsAccepted;

  const updateValue = (nextValue: AgreementsValue) => {
    setLocalValue(nextValue);
    onChange?.(nextValue);
    setValidationErrors([]);
  };

  const toggleAgreement = (agreementId: string) => {
    const accepted = acceptedAgreementIds.includes(agreementId);

    updateValue({
      ...localValue,
      acceptedAgreementIds: accepted
        ? acceptedAgreementIds.filter((id) => id !== agreementId)
        : [...acceptedAgreementIds, agreementId],
    });
  };

  const toggleDeclaration = (field: DeclarationField) => {
    updateValue({
      ...localValue,
      declarations: {
        ...declarations,
        [field]: !declarations[field],
      },
    });
  };

  // Called by the parent onboarding page before saving/proceeding.
  const validateStep = useCallback((): boolean => {
    const errors: string[] = [];

    const missingAgreements = requiredAgreements.filter(
      (agreement) => !acceptedAgreementIds.includes(agreement.id),
    );

    if (missingAgreements.length > 0) {
      errors.push("Please accept all required agreements before continuing.");
    }

    if (!declarations.informationAccurate) {
      errors.push("Please confirm that your information is accurate.");
    }

    if (!declarations.understandRisks) {
      errors.push("Please acknowledge that you understand investment risks.");
    }

    if (!declarations.authorizeVerification) {
      errors.push("Please authorize verification of your information.");
    }

    setValidationErrors(errors);

    return errors.length === 0;
  }, [requiredAgreements, acceptedAgreementIds, declarations]);

  useEffect(() => {
    registerValidator?.(validateStep);
  }, [registerValidator, validateStep]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Agreements and declarations</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Review the applicable agreements and confirm the declarations required
          to complete your investment application.
        </p>
      </div>

      <Card className="border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">Please review carefully</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              You should only accept an agreement after reviewing and
              understanding its contents.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <div>
          <h3 className="font-medium">Required agreements</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            All required agreements must be accepted before submission.
            Agreements marked optional do not block progression.
          </p>
        </div>

        {agreements.map((agreement) => {
          const accepted = acceptedAgreementIds.includes(agreement.id);
          const required = agreement.required !== false;

          return (
            <button
              key={agreement.id}
              type="button"
              aria-pressed={accepted}
              onClick={() => toggleAgreement(agreement.id)}
              className={[
                "w-full rounded-lg border p-4 text-left transition",
                accepted ? "border-primary bg-primary/5" : "hover:bg-muted",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <span
                  className={[
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                    accepted
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30",
                  ].join(" ")}
                >
                  {accepted && (
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{agreement.title}</p>

                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {required ? "Required" : "Optional"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {agreement.description}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <FileCheck2 className="h-3.5 w-3.5" />
                    Version {agreement.version}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t pt-6">
        <div className="mb-4">
          <h3 className="font-medium">Declarations</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Confirm each statement below before continuing.
          </p>
        </div>

        <div className="space-y-3">
          <Declaration
            checked={declarations.informationAccurate === true}
            onChange={() => toggleDeclaration("informationAccurate")}
          >
            I confirm that the information I have provided during this
            application is accurate, complete, and not misleading.
          </Declaration>

          <Declaration
            checked={declarations.understandRisks === true}
            onChange={() => toggleDeclaration("understandRisks")}
          >
            I understand that investments involve risk and that investment
            returns are not guaranteed.
          </Declaration>

          <Declaration
            checked={declarations.authorizeVerification === true}
            onChange={() => toggleDeclaration("authorizeVerification")}
          >
            I authorize the platform to verify the information and documents
            provided as required for my investment application.
          </Declaration>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <Card className="border-destructive/30 bg-destructive/5 p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-destructive">
              Please complete the following:
            </p>

            <ul className="list-disc space-y-1 pl-5 text-sm text-destructive">
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      <Card
        className={[
          "p-4",
          isComplete ? "border-primary/30 bg-primary/5" : "bg-muted/40",
        ].join(" ")}
      >
        <div className="flex items-start gap-3">
          <ShieldCheck
            className={[
              "mt-0.5 h-5 w-5 shrink-0",
              isComplete ? "text-primary" : "text-muted-foreground",
            ].join(" ")}
          />

          <div>
            <p className="text-sm font-medium">
              {isComplete
                ? "All confirmations completed"
                : "Confirmation required"}
            </p>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {isComplete
                ? "You have accepted the required agreements and completed all declarations."
                : "Accept all required agreements and complete every declaration before submitting your application."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface DeclarationProps {
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}

const Declaration = ({ checked, onChange, children }: DeclarationProps) => (
  <button
    type="button"
    aria-pressed={checked}
    onClick={onChange}
    className={[
      "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition",
      checked ? "border-primary bg-primary/5" : "hover:bg-muted",
    ].join(" ")}
  >
    <span
      className={[
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
        checked ? "border-primary bg-primary" : "border-muted-foreground/30",
      ].join(" ")}
    >
      {checked && <CheckCircle2 className="h-4 w-4 text-primary-foreground" />}
    </span>

    <span className="text-sm leading-relaxed text-muted-foreground">
      {children}
    </span>
  </button>
);

export default AgreementsStep;
