import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface Props {
  countries: string[];
}

const PlatformCoverage = ({ countries }: Props) => {
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
            Coverage Across Africa
          </h2>
          <p className="text-xl text-muted-foreground">
            Currently serving users in {countries?.length} African countries
          </p>
        </motion.div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {countries.map((country, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg bg-secondary/20"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{country}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PlatformCoverage;
