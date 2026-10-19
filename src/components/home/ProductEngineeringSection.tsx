import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Code2,
  Gauge,
  Lightbulb,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const engineeringStages = [
  {
    number: "01",
    title: "Idea",
    description: "Define the opportunity",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Architecture",
    description: "Design the foundation",
    icon: Boxes,
  },
  {
    number: "03",
    title: "Product",
    description: "Build what matters",
    icon: Code2,
  },
  {
    number: "04",
    title: "Launch",
    description: "Ship with confidence",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Scale",
    description: "Grow without friction",
    icon: Gauge,
  },
];

const clientNeeds = [
  {
    icon: Lightbulb,
    eyebrow: "01",
    title: "Building something new?",
    description:
      "Turn your product vision into a working MVP and establish a technical foundation designed for growth.",
    features: [
      "Product architecture",
      "MVP development",
      "Technical foundation",
    ],
    gradient: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Zap,
    eyebrow: "02",
    title: "Existing product?",
    description:
      "Add new capabilities, improve performance and evolve your technology without rebuilding everything unnecessarily.",
    features: [
      "Feature development",
      "Performance optimization",
      "Product evolution",
    ],
    gradient: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Wrench,
    eyebrow: "03",
    title: "Software in trouble?",
    description:
      "We assess, stabilize and modernize unfinished, fragile or difficult-to-maintain systems so they can move forward.",
    features: [
      "Technical assessment",
      "System stabilization",
      "Legacy modernization",
    ],
    gradient: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: ServerCog,
    eyebrow: "04",
    title: "Need engineering capacity?",
    description:
      "Extend your product team with dedicated engineering capability that integrates with your workflow and delivery process.",
    features: [
      "Dedicated engineers",
      "Team augmentation",
      "Long-term engineering",
    ],
    gradient: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

const ProductEngineeringSection = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Sparkles className="h-4 w-4" /> Product Engineering Capability
          </div>
          {/* Heading */}
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Technology shouldn't become the{" "}
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              bottleneck{" "}
            </span>
            to your growth.
          </h2>
          {/* Description */}
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Whether you're validating a new product, scaling an existing
            platform or trying to recover an unfinished application, the
            technology behind your business has to keep pace with the
            opportunity.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
            Techbravery provides the product engineering capability to move from
            an early idea to a reliable, scalable digital product.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <div className="relative hidden lg:block">
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-[10%] right-[10%] top-[52px] z-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="relative z-10 grid grid-cols-5 gap-5">
              {engineeringStages.map((stage, index) => {
                const Icon = stage.icon;

                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    className="group relative flex flex-col items-center text-center"
                  >
                    {/* Stage node */}
                    <div className="relative z-10 flex h-[104px] w-[104px] items-center justify-center">
                      {/* Outer circle */}
                      <div className="absolute inset-0 rounded-full border border-primary/20 bg-background shadow-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10" />

                      {/* Inner circle */}
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" />
                      </div>

                      {/* Number */}
                      <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                        {index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-6 max-w-[220px]">
                      <h3 className="text-base font-bold tracking-tight sm:text-lg">
                        {stage.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative lg:hidden">
            {/* Vertical connecting line */}
            <div className="pointer-events-none absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-primary/40 via-primary/25 to-transparent" />

            <div className="relative space-y-7">
              {engineeringStages.map((stage, index) => {
                const Icon = stage.icon;

                return (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    className="group relative flex items-start gap-5"
                  >
                    {/* Stage node */}
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background shadow-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Number */}
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-[9px] font-bold text-primary-foreground shadow-sm">
                        {index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-md">
                      <h3 className="text-lg font-bold tracking-tight">
                        {stage.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Journey statement */}
          <div className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-primary/10 bg-background/70 px-5 py-4 text-center shadow-sm backdrop-blur">
            <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />

            <span className="text-sm font-medium text-muted-foreground sm:text-base">
              From <span className="font-semibold text-foreground">Idea</span> →
              <span className="font-semibold text-foreground">
                Architecture
              </span>{" "}
              →<span className="font-semibold text-foreground">Product</span> →
              <span className="font-semibold text-foreground">Launch</span> →
              <span className="font-semibold text-primary">Scale</span>
            </span>
          </div>
        </motion.div>

        <div className="mt-24 sm:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Where We Fit
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Wherever your product is on its journey.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground md:text-right">
              Bring us in at the beginning, during growth, when things go wrong,
              or whenever your team needs additional engineering capability.
            </p>
          </motion.div>
          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {clientNeeds.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group"
                >
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-8">
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg}`}
                        >
                          <Icon className={`h-7 w-7 ${item.iconColor}`} />
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground/50">
                          {item.eyebrow}
                        </span>
                      </div>
                      {/* Content */}
                      <h4 className="mt-7 text-2xl font-bold tracking-tight">
                        {item.title}
                      </h4>
                      <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                      {/* Features */}
                      <div className="mt-6 grid gap-2 sm:grid-cols-3">
                        {item.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/10 via-primary-glow/5 to-primary/10 p-8 text-center sm:p-10 lg:p-12">
            {/* Decorative elements */}
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-primary-glow/10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-2xl font-bold sm:text-3xl">
                Have a product opportunity in mind?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Tell us what you're building, what isn't working, or where your
                team needs additional engineering capacity.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="group bg-gradient-to-r from-primary to-primary-glow shadow-lg shadow-primary/20"
                >
                  <Link to="/quote">
                    Start a Conversation
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services">Explore Our Capabilities</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default ProductEngineeringSection;
