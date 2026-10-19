import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useApplications } from "@/services";

const PlatformsPreview = () => {
  const { data: applicationData, isLoading, isError } = useApplications();

  console.log("APPS DATA", applicationData);

  const applications = applicationData?.data ?? [];

  const getImageUrl = (image?: string | { url?: string | null } | null) => {
    if (!image) return "";

    // Existing string support
    if (typeof image === "string") {
      const markdownMatch = image.match(/\]\((.*?)\)/);

      if (markdownMatch?.[1]) {
        return markdownMatch[1];
      }

      return image;
    }

    return image.url ?? "";
  };

  const platforms = applications.map((application) => ({
    id: application.id,
    name: application.title,
    description: application.shortDescription,
    stats: {
      users: Number(application.activeUsers || 0).toLocaleString(),
      volume: `$${Number(application.monthlyVolume || 0).toLocaleString()}`,
      countries: `${application.countriesOfCoverage?.length ?? 0}`,
    },
    status: application.isInvestmentEnabled
      ? "Open for Investment"
      : application.isLive
        ? "Live"
        : "Closed",
    growth: application.projectedReturn
      ? `$${Number(application.projectedReturn).toLocaleString()}`
      : "—",
    image:
      getImageUrl(application.thumbNail) ||
      getImageUrl(application.images?.[0]) ||
      "",
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-accent/20 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Proprietary Digital Products
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Innovative products built in-house, solving real African challenges.
            Track performance and explore investment opportunities.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="text-muted-foreground">Loading products...</div>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Unable to load platforms at the moment.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && platforms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No platforms available at the moment.
            </p>
          </div>
        )}

        {/* =========================================================
            INFINITE PLATFORM MARQUEE
           ========================================================= */}
        {!isLoading && !isError && platforms.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mb-16"
          >
            {/* Left fade */}
            <div
              className="
                pointer-events-none
                absolute
                left-0
                top-0
                bottom-0
                w-16
                sm:w-24
                z-20
                bg-gradient-to-r
                from-background
                to-transparent
              "
            />

            {/* Right fade */}
            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                bottom-0
                w-16
                sm:w-24
                z-20
                bg-gradient-to-l
                from-background
                to-transparent
              "
            />

            {/* Viewport */}
            <div className="overflow-hidden">
              {/* Track */}
              <div className="platform-marquee-track">
                {/* FIRST SET */}
                <div className="platform-marquee-group">
                  {platforms.map((platform) => (
                    <PlatformCard
                      key={`first-${platform.id}`}
                      platform={platform}
                    />
                  ))}
                </div>

                {/* DUPLICATED SET */}
                <div className="platform-marquee-group" aria-hidden="true">
                  {platforms.map((platform) => (
                    <PlatformCard
                      key={`second-${platform.id}`}
                      platform={platform}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-primary-glow"
            >
              <Link
                to="/platforms"
                className="flex items-center justify-center space-x-2"
              >
                <span>View All Platforms</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link to="/investor">Become an Investor</Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Partner With Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          MARQUEE CSS
         ========================================================= */}
      <style>{`
        .platform-marquee-track {
          display: flex;
          width: max-content;
          animation: platform-marquee 45s linear infinite;
          will-change: transform;
        }

        .platform-marquee-group {
          display: flex;
          gap: 2rem;
          flex-shrink: 0;
          padding-right: 2rem;
        }

        .platform-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes platform-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50%));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .platform-marquee-track {
            animation: none;
          }
        }

        @media (max-width: 640px) {
          .platform-marquee-track {
            animation-duration: 35s;
          }

          .platform-marquee-group {
            gap: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

/* =============================================================
   PLATFORM CARD
   ============================================================= */

type PlatformCardData = {
  id: string;
  name: string;
  description: string;
  stats: {
    users: string;
    volume: string;
    countries: string;
  };
  status: string;
  growth: string;
  image: string;
};

const PlatformCard = ({ platform }: { platform: PlatformCardData }) => {
  return (
    <div className="w-[340px] sm:w-[380px] lg:w-[400px] flex-shrink-0">
      <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {platform.image ? (
            <img
              src={platform.image}
              alt={platform.name}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                hover:scale-110
              "
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image available</span>
            </div>
          )}

          {/* Status */}
          <div className="absolute top-4 right-4">
            <Badge
              variant={
                platform.status === "Open for Investment"
                  ? "default"
                  : "secondary"
              }
              className={
                platform.status === "Open for Investment"
                  ? "bg-green-500 hover:bg-green-600"
                  : platform.status === "Live"
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-500"
              }
            >
              {platform.status}
            </Badge>
          </div>

          {/* Growth */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
              <TrendingUp className="w-4 h-4 text-green-400" />

              <span className="text-white text-sm font-medium">
                {platform.growth}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <CardHeader>
          <CardTitle className="text-xl font-bold">{platform.name}</CardTitle>

          <p className="text-muted-foreground">{platform.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {/* Users */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-4 h-4 text-primary" />
              </div>

              <div className="font-bold text-lg">{platform.stats.users}</div>

              <div className="text-xs text-muted-foreground">Users</div>
            </div>

            {/* Volume */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>

              <div className="font-bold text-lg">{platform.stats.volume}</div>

              <div className="text-xs text-muted-foreground">Volume</div>
            </div>

            {/* Countries */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Globe className="w-4 h-4 text-primary" />
              </div>

              <div className="font-bold text-lg">
                {platform.stats.countries}
              </div>

              <div className="text-xs text-muted-foreground">Countries</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link to={`/platforms/${platform.id}`}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Explore
              </Link>
            </Button>

            {platform.status === "Open for Investment" && (
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
                asChild
              >
                <Link to="/investor">Invest Now</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformsPreview;
