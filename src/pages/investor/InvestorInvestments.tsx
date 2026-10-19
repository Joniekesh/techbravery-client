import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";

import { ErrorState } from "@/components/ErrorState";
import InvestorInvestmentApplications from "@/components/investor/InvestorInvestmentApplications";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { useProfile } from "@/services";
import { makeRequest } from "@/utils/makeRequest";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "sonner";

const InvestorInvestments = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id ?? "";

  const { data: profile, isLoading, isError, refetch } = useProfile(userId);

  const startOnboarding = async (
    investmentInterestId: string,
  ): Promise<string> => {
    try {
      const res = await makeRequest.post(
        `/investor-onboarding/interest/${investmentInterestId}/start`,
      );

      return res.data.id;
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (!userId || isLoading) {
    return <Loader type="bounce" />;
  }

  if (isError) {
    return (
      <ErrorState
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <main className="min-h-screen">
      <section className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-sm font-medium text-primary">Cowrie Capital</p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              My investments
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage your investment applications, follow review decisions,
              complete approved commitments, and monitor your investments.
            </p>
          </div>

          <Button
            className="w-full shrink-0 sm:w-auto"
            onClick={() => navigate("/investor-dashboard/opportunities")}
          >
            <Plus className="mr-2 h-4 w-4" />
            New investment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {profile ? (
        <InvestorInvestmentApplications
          interests={profile.investmentInterests ?? []}
          onboardings={profile.investorOnboardings}
          onStartOnboarding={startOnboarding}
        />
      ) : (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          Your investor profile could not be loaded.
        </div>
      )}
    </main>
  );
};

export default InvestorInvestments;
