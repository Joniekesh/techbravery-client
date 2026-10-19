import { Link } from "react-router-dom";
import { ExternalLink, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Platform } from "@/types/platform";

interface Props {
  platform: Platform;
}

const PlatformHero = ({ platform }: Props) => {
  const Thumbnail = platform.thumbNail;

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <Badge className="mb-4">{platform.badgeText}</Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {platform.title1}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {platform.title2}
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {platform.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow"
                asChild
              >
                <a
                  href={platform.externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {platform.externalLink.title}
                </a>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link to="/investor">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Invest in {platform.name}
                </Link>
              </Button>
            </div>
          </div>

          <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
            {Thumbnail ? (
              <Thumbnail className="w-24 h-24 text-primary" />
            ) : (
              <span className="text-muted-foreground">{platform.name}</span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformHero;
