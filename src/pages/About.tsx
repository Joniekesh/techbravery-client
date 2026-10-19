import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  CloudCog,
  Code2,
  Database,
  Globe2,
  Layers3,
  Lightbulb,
  LineChart,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const capabilities = [
  {
    icon: Code2,
    title: "Product Engineering",
    description:
      "End-to-end engineering for digital products, from architecture and MVP development through production and continuous evolution.",
  },
  {
    icon: Layers3,
    title: "SaaS Platforms",
    description:
      "Scalable software platforms designed around recurring workflows, users, organizations and business models.",
  },
  {
    icon: Network,
    title: "Fintech & Digital Systems",
    description:
      "Financial and transaction-driven systems built around reliability, security, integrations and operational complexity.",
  },
  {
    icon: BrainCircuit,
    title: "AI-enabled Applications",
    description:
      "Practical AI capabilities integrated into products and workflows where they can create measurable value.",
  },
  {
    icon: Globe2,
    title: "Web & Mobile Platforms",
    description:
      "Modern digital experiences engineered for customers, teams, communities and businesses across devices.",
  },
  {
    icon: CloudCog,
    title: "Cloud & Infrastructure",
    description:
      "Deployment, infrastructure and engineering foundations designed for reliability, observability and growth.",
  },
];

const philosophy = [
  {
    number: "01",
    title: "Understand the problem.",
    description:
      "We start with the business objective, users, constraints and opportunity before deciding what technology is required.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Engineer the solution.",
    description:
      "We translate the problem into architecture, systems and software that can perform reliably in real-world conditions.",
    icon: Wrench,
  },
  {
    number: "03",
    title: "Build for reality.",
    description:
      "Products have budgets, users, regulations, operational constraints and changing requirements. Our engineering accounts for them.",
    icon: BriefcaseBusiness,
  },
  {
    number: "04",
    title: "Design for evolution.",
    description:
      "We create foundations that can support new capabilities, integrations, users and business requirements over time.",
    icon: LineChart,
  },
  {
    number: "05",
    title: "Create lasting value.",
    description:
      "The objective is not simply to ship software. It is to create technology that continues to generate useful business value.",
    icon: Rocket,
  },
];

const companyPrinciples = [
  {
    icon: TargetIcon,
    title: "Business alignment",
    description:
      "Technology decisions are connected to the outcome the business is trying to achieve.",
  },
  {
    icon: ShieldCheck,
    title: "Engineering discipline",
    description:
      "Architecture, quality, security and maintainability are considered throughout the product lifecycle.",
  },
  {
    icon: Workflow,
    title: "Product thinking",
    description:
      "We look beyond individual features and consider the complete product, workflow and user experience.",
  },
  {
    icon: Globe2,
    title: "Global perspective",
    description:
      "We are building for international standards, distributed teams, diverse users and global opportunities.",
  },
];

const team = [
  {
    name: "Kwame Osei",
    role: "Chief Executive Officer & Founder",
    shortRole: "CEO & Founder",
    bio: "Technology entrepreneur focused on building products, partnerships and engineering capabilities that create sustainable business value.",
    expertise: ["Product Strategy", "Technology", "Business"],
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
    linkedin: "#",
  },
  {
    name: "Amara Diallo",
    role: "Chief Technology Officer",
    shortRole: "CTO",
    bio: "Technology leader focused on scalable architecture, engineering systems, AI and emerging technologies.",
    expertise: ["Architecture", "AI", "Engineering"],
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=85",
    linkedin: "#",
  },
  {
    name: "David Mutua",
    role: "Head of Product",
    shortRole: "Product",
    bio: "Product strategist focused on translating business opportunities into useful, intuitive and scalable digital products.",
    expertise: ["Product", "UX", "Strategy"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85",
    linkedin: "#",
  },
  {
    name: "Fatima Al-Rashid",
    role: "Lead Product Designer",
    shortRole: "Design",
    bio: "Product designer focused on creating clear, accessible and purposeful digital experiences for diverse users.",
    expertise: ["UX/UI", "Research", "Design Systems"],
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=85",
    linkedin: "#",
  },
];

function TargetIcon(props: React.ComponentProps<typeof LineChart>) {
  return <LineChart {...props} />;
}

const About = () => {
  return (
    <>
      <SEOHead
        title="About TechBravery | Our Team and Mission"
        description="Learn about TechBravery, our approach to software engineering, and how we help businesses build digital products."
        url="/about"
      />
      <div className="min-h-screen overflow-hidden">
        {/* =========================================================
          HERO / COMPANY POSITIONING
      ========================================================== */}
        <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-primary/[0.06] via-background to-primary-glow/[0.06] pt-28 sm:pt-32 lg:pt-36">
          {/* Background glow */}
          <div className="absolute -left-40 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px]" />

          <div className="absolute -right-40 bottom-0 -z-10 h-[460px] w-[460px] rounded-full bg-primary-glow/10 blur-[150px]" />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]"
            style={{
              backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
              backgroundSize: "48px 48px",
            }}
          />

          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-5xl text-center"
            >
              {/* Eyebrow */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <Sparkles className="h-4 w-4" />
                Product Engineering & Technology
              </div>

              {/* Main heading */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Building Technology
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                  {" "}
                  That Creates Value.
                </span>
              </h1>

              {/* Primary statement */}
              <p className="mx-auto mt-7 max-w-3xl text-xl font-medium leading-8 text-foreground sm:text-2xl sm:leading-9">
                Techbravery is a Nigeria-based product engineering and
                technology company focused on building digital products for
                ambitious businesses.
              </p>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                We work with founders, growing companies and organizations that
                need more than isolated development work. They need technology
                that supports a real product, business model, workflow or market
                opportunity.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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
            </motion.div>

            {/* =====================================================
              BUSINESS + TECHNOLOGY SPLIT
          ====================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-16 max-w-6xl lg:mt-20"
            >
              <div className="grid overflow-hidden rounded-3xl border border-border/60 bg-card/70 shadow-xl shadow-primary/5 backdrop-blur-sm md:grid-cols-2">
                {/* Business */}
                <div className="relative overflow-hidden p-7 sm:p-9 lg:p-11">
                  <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <BriefcaseBusiness className="h-6 w-6 text-primary" />
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      The Business
                    </p>

                    <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      What does the business need to achieve?
                    </h2>

                    <p className="mt-4 leading-7 text-muted-foreground">
                      We begin with the objective, opportunity, users, operating
                      environment and constraints—not with a technology stack.
                    </p>
                  </div>
                </div>

                {/* Technology */}
                <div className="relative overflow-hidden border-t border-border/60 bg-gradient-to-br from-primary/[0.06] to-transparent p-7 sm:p-9 md:border-l md:border-t-0 lg:p-11">
                  <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-primary-glow/10 blur-3xl" />

                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <Code2 className="h-6 w-6 text-primary" />
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      The Technology
                    </p>

                    <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      What must the technology do to make that possible?
                    </h2>

                    <p className="mt-4 leading-7 text-muted-foreground">
                      We then engineer the architecture, systems and product
                      experience required to turn that objective into something
                      useful, reliable and scalable.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
          COMPANY STORY
      ========================================================== */}
        <section className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-4"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Who We Are
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Engineering beyond the code.
                </h2>

                <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary-glow" />
              </motion.div>

              {/* Story */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="space-y-6 lg:col-span-8"
              >
                <p className="text-lg leading-8 text-foreground sm:text-xl sm:leading-9">
                  Our engineering capabilities span product development, SaaS,
                  fintech, AI-enabled applications, web and mobile platforms,
                  APIs, cloud infrastructure and emerging technologies.
                </p>

                <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                  We work across the full product lifecycle—from discovery and
                  architecture to engineering, deployment, modernization and
                  continued product development.
                </p>

                <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                  This means our role can change depending on what the business
                  needs. We may help shape an early product, take an existing
                  platform to the next stage, modernize difficult technology or
                  provide the engineering capacity required to keep a growing
                  product moving.
                </p>

                <div className="rounded-2xl border border-primary/15 bg-primary/[0.045] p-6 sm:p-7">
                  <div className="flex gap-4">
                    <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-primary" />

                    <p className="text-base font-medium leading-7 text-foreground sm:text-lg">
                      The goal is not simply to deliver software. The goal is to
                      create technology that works within the realities of the
                      business and continues to create value as those realities
                      change.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
          WHAT WE BUILD
      ========================================================== */}
        <section className="relative overflow-hidden border-y border-border/40 bg-gradient-to-b from-primary/[0.025] via-background to-primary/[0.025] py-20 sm:py-24 lg:py-28">
          <div className="absolute -left-40 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                What We Build
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Technology across the{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  product lifecycle.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Our capabilities span the systems, products and infrastructure
                required to turn business opportunities into working technology.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;

                return (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.06,
                    }}
                    className="group"
                  >
                    <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl sm:p-8">
                      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10" />

                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>

                        <h3 className="mt-6 text-xl font-bold tracking-tight">
                          {capability.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
          HOW WE THINK
      ========================================================== */}
        <section className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Our Philosophy
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                A simple philosophy.
                <br />
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Serious engineering.
                </span>
              </h2>

              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                Five principles guide how we approach products, engineering
                decisions and long-term partnerships.
              </p>
            </motion.div>

            {/* Desktop timeline */}
            <div className="relative mt-16 hidden lg:block">
              <div className="absolute left-[10%] right-[10%] top-7 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <div className="relative grid grid-cols-5 gap-5">
                {philosophy.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.08,
                      }}
                      className="group text-center"
                    >
                      <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-background shadow-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10">
                        <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />

                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-[9px] font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-bold tracking-tight">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile / tablet timeline */}
            <div className="relative mt-14 lg:hidden">
              <div className="absolute bottom-8 left-7 top-8 w-px bg-gradient-to-b from-primary/40 via-primary/25 to-transparent" />

              <div className="relative space-y-7">
                {philosophy.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.07,
                      }}
                      className="group relative flex items-start gap-5"
                    >
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background shadow-sm">
                        <Icon className="h-5 w-5 text-primary" />

                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-[9px] font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur-sm">
                        <h3 className="text-lg font-bold tracking-tight">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Philosophy statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mx-auto mt-14 max-w-3xl rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/[0.07] via-background to-primary-glow/[0.07] p-7 text-center sm:p-9"
            >
              <p className="text-lg font-semibold leading-8 sm:text-xl">
                Understand the problem.
                <span className="mx-2 text-primary">→</span>
                Engineer the solution.
                <span className="mx-2 text-primary">→</span>
                Build for reality.
                <span className="mx-2 text-primary">→</span>
                Design for evolution.
                <span className="mx-2 text-primary">→</span>
                Create lasting value.
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
          TECHBRAVERY LABS
      ========================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.06] via-background to-primary-glow/[0.06] py-20 sm:py-24 lg:py-28">
          <div className="absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-4 py-2 text-sm font-medium text-primary backdrop-blur">
                  <Rocket className="h-4 w-4" />
                  Techbravery Labs
                </div>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Building beyond client work.
                </h2>

                <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                  Alongside our client engineering work, Techbravery Labs
                  develops proprietary digital products around opportunities we
                  believe can create meaningful value at scale.
                </p>

                <p className="mt-5 leading-7 text-muted-foreground">
                  This allows us to operate from both sides of the technology
                  equation: helping organizations solve their technology
                  challenges while also developing and validating products of
                  our own.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Product development",
                    "Market opportunities",
                    "Technology assets",
                    "Long-term value",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Visual panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="lg:col-span-5"
              >
                <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-background/70 p-7 shadow-xl shadow-primary/5 backdrop-blur sm:p-9">
                  <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                        <Layers3 className="h-6 w-6 text-primary" />
                      </div>

                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Labs
                      </span>
                    </div>

                    <h3 className="mt-8 text-2xl font-bold">
                      From opportunity to product.
                    </h3>

                    <div className="mt-7 space-y-4">
                      {[
                        "Identify meaningful opportunities",
                        "Validate product concepts",
                        "Engineer scalable foundations",
                        "Launch and learn",
                        "Build long-term technology assets",
                      ].map((item, index) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {index + 1}
                          </div>

                          <span className="text-sm font-medium text-muted-foreground">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
          PRINCIPLES
      ========================================================== */}
        <section className="py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                What We Stand For
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Built around{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  trust and execution.
                </span>
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {companyPrinciples.map((principle, index) => {
                const Icon = principle.icon;

                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.07,
                    }}
                    className="group"
                  >
                    <div className="h-full rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl sm:p-7">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>

                      <h3 className="mt-6 text-lg font-bold">
                        {principle.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
    TEAM
========================================================== */}
        <section className="relative overflow-hidden border-y border-border/40 bg-gradient-to-b from-primary/[0.025] via-background to-primary/[0.035] py-20 sm:py-24 lg:py-28">
          {/* Background glow */}
          <div className="absolute -left-40 top-20 -z-10 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[140px]" />

          <div className="absolute -right-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-primary-glow/10 blur-[150px]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* =====================================================
        HEADER
    ====================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Our People
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                The people behind{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Techbravery.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Technology is built by people. Our team brings together product
                thinking, engineering, design and business perspective to turn
                opportunities into working products.
              </p>
            </motion.div>

            {/* =====================================================
        TEAM GRID
    ====================================================== */}
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="group"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                    {/* =================================================
                IMAGE
            ================================================== */}
                    <div className="relative aspect-[4/4.2] overflow-hidden">
                      {/* Image */}
                      <img
                        src={member.avatar}
                        alt={`${member.name} - ${member.role}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-80" />

                      {/* Number */}
                      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 font-mono text-xs font-semibold text-white backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Role over image */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <span className="inline-flex rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                          {member.shortRole}
                        </span>
                      </div>
                    </div>

                    {/* =================================================
                CONTENT
            ================================================== */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold tracking-tight">
                        {member.name}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-primary">
                        {member.role}
                      </p>

                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {member.bio}
                      </p>

                      {/* Expertise */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {member.expertise.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* LinkedIn / profile */}
                      <div className="mt-6 border-t border-border/60 pt-5">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background transition-colors group-hover:border-primary/20">
                            in
                          </span>

                          <span>Professional profile</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* =====================================================
        TEAM PHILOSOPHY
    ====================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="mx-auto mt-12 max-w-4xl"
            >
              <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/[0.07] via-background to-primary-glow/[0.07] p-7 sm:p-9">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">
                      Different disciplines. One engineering mindset.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                      We bring business, product, design and engineering
                      perspectives together so important decisions are made with
                      the complete product in view.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
          COMPANY METRICS
      ========================================================== */}
        <section className="border-y border-border/40 bg-gradient-to-b from-primary/[0.025] to-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {[
                ["50+", "Projects Delivered"],
                ["15+", "Countries Served"],
                ["5+", "Years Experience"],
                ["98%", "Client Satisfaction"],
              ].map(([value, label], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="rounded-3xl border border-border/60 bg-card p-5 text-center shadow-sm sm:p-7"
                >
                  <div className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                    {value}
                  </div>

                  <div className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
          GLOBAL POSITIONING / CTA
      ========================================================== */}
        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.07] via-background to-primary-glow/[0.07]" />

          <div className="absolute -left-24 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

          <div className="absolute -right-24 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-primary-glow/10 blur-[100px]" />

          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Globe2 className="h-7 w-7 text-primary" />
              </div>

              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Built for a global market
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                One product.
                <br className="sm:hidden" /> One partnership.
                <br className="sm:hidden" /> One engineering challenge at a
                time.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                We are building Techbravery for businesses and organizations
                that see technology as more than an operational tool—a
                foundation for creating, improving and scaling value.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="group bg-gradient-to-r from-primary to-primary-glow shadow-lg shadow-primary/20"
                >
                  <Link to="/quote">
                    Build With Techbravery
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Talk to Our Team</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
