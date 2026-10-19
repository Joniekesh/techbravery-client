import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface WelcomeStepProps {
  onContinue?: () => void;
}

const ONBOARDING_HIGHLIGHTS = [
  {
    icon: UserRoundCheck,
    title: "Verify your investor profile",
    description:
      "Provide the personal, identity, financial and tax information required to establish your investor profile.",
  },
  {
    icon: FileCheck2,
    title: "Review investment requirements",
    description:
      "Confirm the information, declarations and documents required before you can participate in an investment opportunity.",
  },
  {
    icon: ShieldCheck,
    title: "Complete compliance checks",
    description:
      "Your information may be reviewed to verify eligibility and satisfy applicable investor verification requirements.",
  },
];

const PROCESS_STEPS = [
  "Complete your investor information",
  "Submit the required verification details",
  "Review and accept the applicable agreements",
  "Submit your onboarding for review",
];

const WelcomeStep = ({ onContinue }: WelcomeStepProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Intro */}
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <Badge variant="secondary" className="mb-4">
          Investor onboarding
        </Badge>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Let&apos;s set up your investor profile
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Before you can participate in investment opportunities, we need to
          establish and verify your investor profile. This process helps us
          understand who you are, your investment profile and the information
          required to administer your investments.
        </p>
      </div>

      {/* Meta information */}
      <div className="mx-auto mt-6 flex w-fit flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-primary" />
          <span>About 10–15 minutes</span>
        </div>

        <div className="hidden h-4 w-px bg-border sm:block" />

        <div className="flex items-center gap-2">
          <LockKeyhole className="h-4 w-4 text-primary" />
          <span>Secure information handling</span>
        </div>
      </div>

      {/* What we'll collect */}
      <div className="mt-10">
        <div className="mb-4">
          <h3 className="text-base font-semibold">What you&apos;ll complete</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ll guide you through each section one step at a time.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {ONBOARDING_HIGHLIGHTS.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="border-border/70 bg-card transition-shadow hover:shadow-sm"
              >
                <CardContent className="p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h4 className="text-sm font-semibold">{item.title}</h4>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Process */}
      <Card className="mt-8 overflow-hidden">
        <div className="border-b bg-muted/20 px-5 py-4 sm:px-6">
          <h3 className="text-sm font-semibold">
            What happens after onboarding?
          </h3>

          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Completing onboarding does not automatically create or activate an
            investment.
          </p>
        </div>

        <CardContent className="p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {PROCESS_STEPS.map((item, index) => (
              <div key={item} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </div>

                <div>
                  <p className="text-sm font-medium">{item}</p>

                  {index === PROCESS_STEPS.length - 1 && (
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Once submitted, your profile may enter a review process
                      before you can proceed to investment activation.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security notice */}
      <div className="mt-8 rounded-xl border border-primary/15 bg-primary/[0.03] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">Your information matters</p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Only provide accurate and current information. Some information
              may be used for identity verification, compliance checks,
              investment administration and regulatory reporting where
              applicable.
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Bottom action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

          <span>
            Your progress can be saved while you complete the onboarding.
          </span>
        </div>

        <Button
          type="button"
          size="lg"
          onClick={onContinue}
          className="w-full sm:w-auto"
        >
          Start onboarding
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
