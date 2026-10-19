import { motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Code2,
  Compass,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ArchitectureDiagram from "../ArchitectureDiagram";

const workflowSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your business objectives, users, requirements, existing systems and technical constraints.",
    icon: Search,
    label: "Understand the opportunity",
  },
  {
    number: "02",
    title: "Plan & Architect",
    description:
      "We define the scope, system boundaries, architecture, data models, security controls and delivery milestones.",
    icon: Compass,
    label: "Design the right solution",
  },
  {
    number: "03",
    title: "Engineer",
    description:
      "We develop the frontend, backend, APIs, databases and integrations as a cohesive, maintainable product.",
    icon: Code2,
    label: "Build with engineering discipline",
  },
  {
    number: "04",
    title: "Integrate & Secure",
    description:
      "We connect external services and AI capabilities while implementing authentication, authorization and security testing.",
    icon: ShieldCheck,
    label: "Connect and protect",
  },
  {
    number: "05",
    title: "Test & Deploy",
    description:
      "We validate functionality, reliability and performance, then release through a controlled deployment process.",
    icon: Rocket,
    label: "Prepare for production",
  },
  {
    number: "06",
    title: "Monitor & Evolve",
    description:
      "We monitor production systems, address issues and continuously improve the product as your business grows.",
    icon: Activity,
    label: "Keep improving",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const HowWeWork = () => {
  return (
    <section
      id="how-we-work"
      className="relative min-w-0 overflow-hidden border-y border-border/60 py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Settings2 className="h-4 w-4" />
            How We Engineer
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            From business vision to{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              production-ready technology.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            We combine product strategy, full-stack engineering, secure
            integrations, AI capabilities and cloud infrastructure to deliver
            software designed around real business outcomes.
          </p>
        </motion.div>

        {/* Responsive system architecture */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 w-full min-w-0 sm:mt-14 lg:mt-16"
        >
          <ArchitectureDiagram />
        </motion.div>

        {/* Engineering process */}
        <div className="mt-16 min-w-0 sm:mt-20 lg:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              <Workflow className="h-4 w-4" />
              Our delivery process
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              A clear process. Accountable engineering.
            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              Every engagement follows a practical delivery lifecycle, with
              clear priorities, continuous communication and decisions grounded
              in your business goals.
            </p>
          </motion.div>

          {/* Desktop: six-column timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="relative mt-12 hidden lg:block"
          >
            <div
              aria-hidden="true"
              className="absolute left-[8.33%] right-[8.33%] top-7 h-px bg-border"
            />

            <div className="grid grid-cols-4 gap-4 xl:gap-5">
              {workflowSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    key={step.number}
                    variants={itemVariants}
                    className="group relative min-w-0"
                  >
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-sm transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/5">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <p className="mt-6 font-mono text-xs tracking-wider text-primary/80">
                      STEP {step.number}
                    </p>

                    <h4 className="mt-2 break-words text-base font-bold tracking-tight text-foreground xl:text-lg">
                      {step.title}
                    </h4>

                    <p className="mt-2 text-xs font-medium leading-5 text-primary">
                      {step.label}
                    </p>

                    <p className="mt-3 break-words text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>

          {/* Mobile and tablet: vertical timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="relative mt-10 lg:hidden"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-6 top-8 w-px bg-border"
            />

            <div className="space-y-4">
              {workflowSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    key={step.number}
                    variants={itemVariants}
                    className="relative flex min-w-0 gap-3 sm:gap-4"
                  >
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-4 sm:p-5">
                      <p className="font-mono text-xs tracking-wider text-primary/80">
                        STEP {step.number}
                      </p>

                      <h4 className="mt-1 break-words text-lg font-bold tracking-tight text-foreground">
                        {step.title}
                      </h4>

                      <p className="mt-1 text-xs font-medium leading-5 text-primary">
                        {step.label}
                      </p>

                      <p className="mt-3 break-words text-sm leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Client call to action */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mt-14 min-w-0 sm:mt-20"
        >
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="flex min-w-0 flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 max-w-2xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Sparkles className="h-4 w-4" />
                  Engineering with purpose
                </div>

                <h3 className="mt-3 break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Have a product to build, modernize or scale?
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  Tell us what you are trying to achieve. We will help you
                  evaluate the requirements, identify the right technical
                  approach and define a practical path to delivery.
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
                  {[
                    "Clear technical direction",
                    "Business-aligned delivery",
                    "Scalable engineering",
                  ].map((benefit) => (
                    <span
                      key={benefit}
                      className="inline-flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-3 sm:flex-row lg:shrink-0 lg:flex-col xl:flex-row">
                <Button asChild size="lg" className="group w-full sm:w-auto">
                  <Link to="/quote">
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Link to="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
