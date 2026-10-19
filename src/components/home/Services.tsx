import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import Loader from "../loader/Loader";
import { useAppSelector } from "@/redux/hooks";

const aosAnimations = [
  "fade-right",
  "fade-up",
  "fade-left",
  "fade-down",
  "zoom-in",
  "zoom-out",
] as const;

const Services = () => {
  const service = useAppSelector((state) => state.service);
  const services = service?.services;

  console.log("Services from Redux:", services);

  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-emerald-500 to-teal-500",
    "from-green-500 to-emerald-500",
    "from-violet-500 to-purple-500",
    "from-slate-500 to-gray-500",
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-blue-500",
    "from-amber-500 to-orange-500",
    "from-red-500 to-orange-500",
  ];

  const renderLucideIcon = (
    icon: string,
    props?: React.ComponentProps<"svg">,
  ) => {
    const IconComponent = (Icons as any)[icon];

    if (!IconComponent) return null;

    return <IconComponent {...props} />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };
  if (!service) return <Loader type="bounce" />;
  // if (isError) return <div>Failed to load services</div>;
  // if (!data.length) return <div>No services found</div>;

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer comprehensive industry grade software development services
            to bring your ideas to life with cutting-edge technology and African
            innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => {
            const animation = aosAnimations[index % aosAnimations.length];

            return (
              <div
                key={service.slug ?? index}
                data-aos={animation}
                data-aos-duration="800"
                data-aos-delay={(index % 3) * 100}
                data-aos-once="true"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-accent/10">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                        colors[index % colors.length]
                      } p-3 mb-4 shadow-lg`}
                    >
                      {renderLucideIcon(service.icon, {
                        className: "w-full h-full text-white",
                      })}
                    </div>

                    <CardTitle className="text-xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {service.techStacks.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/services/${service.slug}`}>Learn More</Link>
                      </Button>

                      <Button size="sm" asChild>
                        <Link to="/quote">Request Service</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all"
          >
            <Link to="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
