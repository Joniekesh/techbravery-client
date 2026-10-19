import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import { IPlatformRoadMap } from "@/types/platform";

interface Props {
  roadMap: IPlatformRoadMap[];
}

const PlatformRoadmap = ({ roadMap }: Props) => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary-glow/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Development Roadmap
          </h2>
          <p className="text-xl text-muted-foreground">
            Our journey towards becoming Africa's #1 P2P exchange
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadMap.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant={
                        item.status === "completed"
                          ? "default"
                          : item.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {item.quarter}
                    </Badge>
                    {item.status === "completed" && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{item.milestone}</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {item.status.replace("-", " ")}
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

export default PlatformRoadmap;
