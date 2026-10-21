import { motion } from "framer-motion";
import { ArrowRight, Rocket, Search } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import PlatformItem from "@/components/platform/PlatformItem";
import { useApplications } from "@/services";
import Loader from "@/components/loader/Loader";
import { ErrorState } from "@/components/ErrorState";

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const InvestorOpportunities = () => {
  const {
    data: applicationData,
    isLoading,
    isError,
    refetch,
  } = useApplications();

  const applications = applicationData?.data ?? [];

  const liveApplications = useMemo(() => {
    return applications.filter(
      (application) => application.isLive && !application.deletedAt,
    );
  }, [applications]);

  if (isLoading) {
    return <Loader type="bounce" />;
  }

  if (isError) {
    return (
      <ErrorState
        onRetry={() => {
          refetch();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/investment-image.png')",
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary-glow/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Rocket className="h-7 w-7 text-primary" />
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Investment Opportunities
                <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Built for Scale
                </span>
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid */}
      {!isLoading && !isError && liveApplications.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {liveApplications.map((application) => (
            <PlatformItem
              key={application.id}
              application={application}
              isNew
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default InvestorOpportunities;
