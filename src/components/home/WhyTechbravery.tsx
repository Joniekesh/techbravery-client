import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Eye,
  Handshake,
  Layers3,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    number: "01",
    icon: BriefcaseBusiness,
    title: "Business-first",
    description:
      "We understand the business objective before determining the technology. Every engineering decision should contribute to a meaningful business outcome.",
    highlights: ["Business objectives", "User needs", "Technology alignment"],
    accent: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    number: "02",
    icon: Code2,
    title: "Engineering depth",
    description:
      "We work across frontend, backend, data, infrastructure and complex integrations, giving your product the technical depth required to operate reliably.",
    highlights: [
      "Frontend & backend",
      "Data & infrastructure",
      "Complex integrations",
    ],
    accent: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Product ownership mindset",
    description:
      "We think beyond individual features. Our focus is the complete product, including how its technology, users, workflows and business model work together.",
    highlights: [
      "End-to-end thinking",
      "Product architecture",
      "User experience",
    ],
    accent: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    number: "04",
    icon: Eye,
    title: "Transparent delivery",
    description:
      "You should always understand what is being built, why it matters and where the project stands. We make progress, priorities and decisions visible.",
    highlights: ["Clear priorities", "Visible progress", "Open communication"],
    accent: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    number: "05",
    icon: LineChart,
    title: "Designed to evolve",
    description:
      "We build with future requirements in mind, creating foundations that can accommodate new capabilities, users, integrations and changing business needs.",
    highlights: [
      "Scalable foundations",
      "Future capabilities",
      "Adaptable architecture",
    ],
    accent: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    number: "06",
    icon: Handshake,
    title: "Long-term partnership",
    description:
      "Our relationship does not have to end at launch. We can continue to improve, maintain, scale and evolve the product as your business grows.",
    highlights: [
      "Post-launch support",
      "Continuous improvement",
      "Long-term engineering",
    ],
    accent: "",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

const WhyTechbravery = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-20 " />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            SECTION HEADER
        ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />

            <span>Why Techbravery</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Engineering with{" "}
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              purpose.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Technology is only valuable when it moves the business forward. We
            combine business understanding, engineering depth and product
            thinking to build software that creates lasting value.
          </p>
        </motion.div>

        {/* =========================================================
            SIX REASONS
        ========================================================== */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.07,
                }}
                className="group relative h-full"
              >
                <div className="relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-8">
                  {/* Top row */}
                  <div className="relative flex items-start justify-between">
                    {/* Icon */}
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl ${reason.iconBg} transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon
                        className={`h-7 w-7 ${reason.iconColor}`}
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* Number */}
                    <span className="font-mono text-sm font-medium tracking-wider text-muted-foreground/60">
                      {reason.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative mt-8">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {reason.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="relative mt-auto pt-8">
                    <div className="mb-4 h-px w-full bg-border/60" />

                    <div className="space-y-2.5">
                      {reason.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-7 right-7 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-border/70 bg-background/70 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =========================================================
            BOTTOM STATEMENT
        ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-7 shadow-sm sm:px-8 sm:py-8">
            <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="font-semibold">More than software delivery.</p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-base">
                  We build technology around the realities of your business,
                  with the engineering discipline to support where you are today
                  and where you intend to go next.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTechbravery;
