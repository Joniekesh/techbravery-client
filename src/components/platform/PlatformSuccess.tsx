import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

import { PlatformSuccessMetric, PlatformSuccessStory } from "@/types/platform";

interface Props {
  success_metrics?: PlatformSuccessMetric[];
  stories?: PlatformSuccessStory[];
  title: string;
}

const PlatformSuccess = ({ success_metrics, stories, title }: Props) => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Healthcare Transformation
          </h2>
          <p className="text-xl text-muted-foreground">
            Measurable improvements in healthcare accessibility
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {success_metrics?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {item.metric}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSuccess;
