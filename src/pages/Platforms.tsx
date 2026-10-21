import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Loader2, Rocket, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import PlatformItem from "@/components/platform/PlatformItem";
import { useApplications } from "@/services";

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const Platforms = () => {
  const [search, setSearch] = useState("");

  const { data: applicationData, isLoading, isError } = useApplications();

  const applications = applicationData?.data ?? [];

  const liveApplications = useMemo(() => {
    return applications.filter(
      (application) => application.isLive && !application.deletedAt,
    );
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return liveApplications;
    }

    return liveApplications.filter((application) => {
      return (
        application.title?.toLowerCase().includes(query) ||
        application.shortDescription?.toLowerCase().includes(query) ||
        application.investmentStage?.toLowerCase().includes(query)
      );
    });
  }, [liveApplications, search]);

  /**
   * Smoothly scroll to the proprietary products section.
   */
  const handleExploreProducts = () => {
    const productsSection = document.getElementById("start");

    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/investment-image.png')",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-2xl text-left"
          >
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_10px_rgba(94,234,212,0.8)]" />
              TECHBRAVERY · PROPRIETARY PRODUCTS
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Our Proprietary
              <br className="hidden sm:block" /> Digital Products
              <span className="mt-1 block text-teal-300">Built for Scale</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white sm:text-base sm:leading-7 lg:text-lg">
              Discover digital platforms built to solve meaningful problems and
              unlock new opportunities across technology, financial services,
              artificial intelligence, and digital infrastructure.
            </p>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
              Independently developed by Techbravery, our products combine
              innovation, scalable engineering, and long-term intellectual
              property development.
            </p>

            <Button
              type="button"
              size="lg"
              onClick={handleExploreProducts}
              className="mt-7 rounded-lg bg-teal-400 px-6 font-semibold text-[#003b37] shadow-lg shadow-black/10 transition-all hover:bg-teal-300"
            >
              Explore Our Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Platforms */}
      <section id="start" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Our Proprietary Digital Products
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {liveApplications.length} live{" "}
                {liveApplications.length === 1
                  ? "digital product"
                  : "digital products"}{" "}
                currently available.
              </p>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search platforms..."
                className="pl-9"
              />
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />

                <p>Loading platforms...</p>
              </div>
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <Card>
              <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground/40" />

                <h3 className="mt-4 text-lg font-semibold">
                  Unable to load platforms
                </h3>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  We couldn't retrieve the available platforms at the moment.
                  Please try again later.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Empty */}
          {!isLoading && !isError && filteredApplications.length === 0 && (
            <Card>
              <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <Search className="h-12 w-12 text-muted-foreground/40" />

                <h3 className="mt-4 text-lg font-semibold">
                  No platforms found
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try changing your search criteria.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Grid */}
          {!isLoading && !isError && filteredApplications.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {filteredApplications.map((application) => (
                <PlatformItem key={application.id} application={application} />
              ))}
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mt-16"
          >
            <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5">
              <CardContent className="p-8 text-center sm:p-10">
                <h3 className="text-2xl font-bold">
                  Explore Our Investment Ecosystem
                </h3>

                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  Explore our platforms, monitor their progress, and access
                  investment opportunities when available.
                </p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                    asChild
                  >
                    <Link to="/investor-dashboard">
                      Investor Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button size="lg" variant="outline" asChild>
                    <Link to="/demo">Schedule a Demo</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Platforms;
