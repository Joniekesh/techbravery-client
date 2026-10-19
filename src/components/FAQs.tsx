import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  CreditCard,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQ[] = [
  {
    category: "Services",
    question: "What services does TechBravery provide?",
    answer:
      "TechBravery provides software engineering and digital product development services, including custom web applications, mobile applications, SaaS platforms, API development and integrations, fintech solutions, AI integration, blockchain applications, cybersecurity-focused engineering, and technical consulting. We help businesses turn ideas into secure, maintainable digital solutions aligned with their operational and commercial objectives.",
  },
  {
    category: "Services",
    question: "Can TechBravery help develop a new product from idea to launch?",
    answer:
      "Yes. We can support the product lifecycle from discovery and requirements definition through solution architecture, UI/UX design, development, testing, deployment, and post-launch improvements. For early-stage products, we can help define a minimum viable product (MVP), prioritize essential features, and establish a practical roadmap for validating the idea before expanding its scope.",
  },
  {
    category: "Services",
    question: "Can you improve or modernize an existing application?",
    answer:
      "Yes. We can assess an existing application's architecture, code quality, performance, usability, integrations, and security considerations. Depending on the findings, the engagement may involve fixing defects, improving performance, refactoring legacy code, modernizing the frontend or backend, integrating new services, strengthening access controls, or gradually migrating to a more maintainable architecture.",
  },
  {
    category: "Technology",
    question: "What technologies and platforms do you work with?",
    answer:
      "Our engineering capabilities can span modern frontend frameworks such as React, backend technologies such as Node.js and Python, API frameworks such as NestJS and FastAPI, relational databases such as PostgreSQL, cloud infrastructure, and AI/ML integrations. Technology selection depends on the product requirements, team capabilities, operational constraints, scalability needs, and long-term maintenance considerations rather than adopting a stack simply because it is popular.",
  },
  {
    category: "Delivery",
    question: "What does your software development process look like?",
    answer:
      "Engagements typically begin with a discovery discussion to understand your objectives, users, requirements, constraints, and success criteria. We then define the scope and delivery milestones, agree on the solution approach, implement the work in manageable increments, conduct appropriate testing and reviews, and prepare the agreed deliverables for deployment or handover. Communication, demonstrations, and feedback help keep the project aligned with its intended outcomes.",
  },
  {
    category: "Delivery",
    question: "How long does a project take to complete?",
    answer:
      "Timelines depend on scope, complexity, integrations, design requirements, dependencies, and acceptance criteria. A focused MVP may take several weeks, while a production-grade platform with multiple workflows, external integrations, or compliance requirements may take several months. After understanding your requirements, we can propose a realistic delivery plan with milestones, dependencies, and assumptions.",
  },
  {
    category: "Commercial",
    question: "How much does it cost to build a software product?",
    answer:
      "Pricing depends on the scope of work, technical complexity, required expertise, integrations, delivery timeline, and ongoing support expectations. Depending on the engagement, a proposal may use fixed-price milestones, time-based billing, or a clearly defined dedicated-development arrangement. We first clarify the requirements and deliverables so the proposed budget is tied to an agreed scope rather than an arbitrary estimate.",
  },
  {
    category: "Commercial",
    question: "How do payments, milestones, and project deliverables work?",
    answer:
      "For milestone-based engagements, the proposal or statement of work should define the deliverables, acceptance criteria, target dates, payment amounts, and responsibilities associated with each phase. The agreement should also explain how scope changes, delays, approvals, and handover are handled. Payment schedules and delivery obligations are agreed upon before work begins.",
  },
  {
    category: "Commercial",
    question: "Can you work with international clients and distributed teams?",
    answer:
      "Yes. We can structure suitable engagements for clients working across different locations and time zones. Project communication can take place through agreed meetings, written updates, demonstrations, and shared project-management tools. We establish communication expectations, responsibilities, working hours, documentation practices, and delivery milestones at the beginning of an engagement.",
  },
  {
    category: "Security",
    question: "How do you approach security and protection of client data?",
    answer:
      "Security considerations should be incorporated throughout the development lifecycle. Depending on the project, this can include secure authentication and authorization, input validation, least-privilege access, protected secrets, encryption where appropriate, dependency management, audit logging, secure deployment practices, and testing. Specific controls and compliance obligations are agreed according to the product's risk profile and applicable requirements. Any formal certification or compliance status should be confirmed separately.",
  },
  {
    category: "Ownership",
    question: "Who owns the source code and intellectual property?",
    answer:
      "Ownership and usage rights depend on the written agreement. For custom development, the contract should explicitly address ownership or licensing of project-specific source code, designs, documentation, and other deliverables, along with any pre-existing tools, third-party components, and open-source dependencies. We recommend agreeing on these terms before development starts so both parties understand their rights and responsibilities.",
  },
  {
    category: "Support",
    question: "Do you provide maintenance and support after launch?",
    answer:
      "Post-launch support can be included in an engagement or arranged under a separate support agreement. Depending on the agreed scope, it may cover defect resolution, dependency updates, performance monitoring, security maintenance, backups, infrastructure support, and future enhancements. Response times, service hours, service levels, and exclusions should be documented in the applicable agreement.",
  },
  {
    category: "Partnerships",
    question:
      "Does TechBravery work with startups, established businesses, and investors?",
    answer:
      "We can discuss engagements with founders, startups, established organizations, and other technology partners whose objectives align with our capabilities. These discussions may cover product development, technical collaboration, product validation, or potential strategic opportunities. Investment, equity, or revenue-sharing arrangements are considered separately and are subject to due diligence, commercial viability, and mutually agreed written terms.",
  },
  {
    category: "Getting Started",
    question: "What should I prepare before contacting TechBravery?",
    answer:
      "A short description of your business or product idea is a useful starting point. If available, include the problem you want to solve, intended users, essential features, preferred timeline, approximate budget, existing systems, and any technical or regulatory constraints. You do not need a complete specification. We can use an initial discussion to clarify requirements and identify the next practical steps.",
  },
];

const categories = [
  "All questions",
  "Services",
  "Technology",
  "Delivery",
  "Commercial",
  "Security",
  "Ownership",
  "Support",
  "Partnerships",
  "Getting Started",
] as const;

type Category = (typeof categories)[number];

const categoryIcons = {
  Services: Code2,
  Technology: Layers3,
  Delivery: Sparkles,
  Commercial: CreditCard,
  Security: ShieldCheck,
  Ownership: ShieldCheck,
  Support: ShieldCheck,
  Partnerships: Layers3,
  "Getting Started": ArrowUpRight,
} as const;

export default function FAQs() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All questions");
  const [openFAQ, setOpenFAQ] = useState<string | null>(faqs[0].question);

  const filteredFAQs =
    activeCategory === "All questions"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section
      id="frequently-asked-questions"
      aria-labelledby="contact-faq-heading"
      className="relative overflow-hidden border-t border-border bg-secondary/20 py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Frequently asked questions
          </div>

          <h2
            id="contact-faq-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Everything you need to know
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Learn how TechBravery approaches software development, project
            delivery, security, pricing, and long-term partnerships.
          </p>
        </div>

        {/* Category filters */}
        <div
          className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
          aria-label="Filter frequently asked questions by category"
        >
          {categories.map((category) => {
            const selected = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setOpenFAQ(null);
                }}
                aria-pressed={selected}
                className={[
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-primary focus-visible:ring-offset-2",
                  selected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
                ].join(" ")}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* FAQ list */}
        <div className="mx-auto max-w-4xl space-y-3">
          {filteredFAQs.map((faq, index) => {
            const isOpen = openFAQ === faq.question;
            const answerId = `contact-faq-answer-${index}`;
            const triggerId = `contact-faq-trigger-${index}`;
            const Icon =
              categoryIcons[faq.category as keyof typeof categoryIcons] ??
              Sparkles;

            return (
              <article
                key={faq.question}
                className={[
                  "overflow-hidden rounded-xl border bg-background",
                  "transition-all duration-200",
                  isOpen
                    ? "border-primary/40 shadow-md shadow-primary/[0.04]"
                    : "border-border hover:border-primary/25",
                ].join(" ")}
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFAQ(isOpen ? null : faq.question)}
                    className="flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-5 lg:p-6"
                  >
                    <span
                      className={[
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                        "transition-colors duration-200 sm:h-11 sm:w-11",
                        isOpen
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary",
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-xs">
                        {faq.category}
                      </span>

                      <span className="block text-sm font-semibold leading-6 text-foreground sm:text-base sm:leading-7">
                        {faq.question}
                      </span>
                    </span>

                    <ChevronDown
                      aria-hidden="true"
                      className={[
                        "h-5 w-5 shrink-0 text-muted-foreground",
                        "transition-transform duration-200",
                        isOpen ? "rotate-180 text-primary" : "",
                      ].join(" ")}
                    />
                  </button>
                </h3>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                >
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 lg:pl-[5.75rem] lg:pr-6">
                    <div className="mb-4 h-px bg-border" />

                    <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Contact call to action */}
        <div className="mx-auto mt-12 max-w-4xl sm:mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background p-6 shadow-sm sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-primary/[0.08] blur-2xl"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Have a project in mind?
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  Tell us what you are building, the challenge you want to
                  solve, or the opportunity you want to explore. Let&apos;s
                  discuss a practical way forward.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  document.getElementById("contact-form")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-base"
              >
                Discuss your project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
