import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Activity } from "lucide-react";
import { PlatformService } from "@/types/platform";

interface Props {
  services: PlatformService[];
}

const PlatformServices = ({ services }: Props) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Healthcare Services
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive medical care across all specialties
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">
                      {service.category}
                    </CardTitle>
                    <Badge variant="outline">
                      {service.specialists.length} specialties
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      {service.consultations}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.avgWaitTime} avg wait
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {service.specialists.map((specialist, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 rounded bg-secondary/20"
                      >
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs font-medium">
                          {specialist}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformServices;
