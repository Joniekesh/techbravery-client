import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

import type { Platform } from "@/types/platform";

interface Props {
  platform: Platform;
}

const PlatformFeatures = ({ platform }: Props) => {
  return (
    <section className="py-16 bg-gradient-to-br from-accent/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Platform Features
          </h2>

          <p className="text-xl text-muted-foreground">{platform.shortDesc}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {platform.features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <Icon className="w-6 h-6 text-primary mx-auto" />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
