import {
  Activity,
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  Cloud,
  Database,
  GitBranch,
  LockKeyhole,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";

type NodeKind = "primary" | "default" | "external" | "deployment";

type NodeProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  kind?: NodeKind;
};

function DiagramNode({
  x,
  y,
  width,
  height,
  title,
  subtitle,
  kind = "default",
}: NodeProps) {
  const colors: Record<NodeKind, { fill: string; stroke: string }> = {
    primary: {
      fill: "hsl(var(--primary) / 0.12)",
      stroke: "hsl(var(--primary))",
    },
    default: {
      fill: "hsl(var(--card))",
      stroke: "hsl(var(--border))",
    },
    external: {
      fill: "hsl(var(--secondary))",
      stroke: "hsl(var(--border))",
    },
    deployment: {
      fill: "hsl(var(--primary) / 0.06)",
      stroke: "hsl(var(--primary) / 0.55)",
    },
  };

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="12"
        fill={colors[kind].fill}
        stroke={colors[kind].stroke}
        strokeWidth={kind === "primary" ? 1.8 : 1.2}
      />

      <text
        x={x + width / 2}
        y={y + height / 2 - 5}
        textAnchor="middle"
        fill="hsl(var(--foreground))"
        fontSize="15"
        fontWeight="600"
      >
        {title}
      </text>

      <text
        x={x + width / 2}
        y={y + height / 2 + 16}
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))"
        fontSize="12"
      >
        {subtitle}
      </text>
    </g>
  );
}

function Connector({ d, dashed = false }: { d: string; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="hsl(var(--primary) / 0.8)"
      strokeWidth="1.8"
      strokeDasharray={dashed ? "5 5" : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd="url(#architecture-arrow)"
    />
  );
}

function SectionLabel({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fill="hsl(var(--muted-foreground))"
      fontSize="13"
      fontWeight="700"
      letterSpacing="1.2"
    >
      {children}
    </text>
  );
}

const mobileLayers = [
  {
    number: "01",
    title: "Users & client applications",
    description: "Web browsers and mobile applications.",
    icon: Activity,
    kind: "external",
  },
  {
    number: "02",
    title: "Frontend",
    description: "React UI, forms, state and client-side navigation.",
    icon: Workflow,
    kind: "primary",
  },
  {
    number: "03",
    title: "API gateway",
    description: "Request routing, authentication and validation.",
    icon: GitBranch,
    kind: "default",
  },
  {
    number: "04",
    title: "Backend services",
    description: "Business logic, authorization and application APIs.",
    icon: Server,
    kind: "primary",
  },
];

const mobileIntegrations = [
  {
    title: "Primary database",
    description: "PostgreSQL and persistent application data.",
    icon: Database,
  },
  {
    title: "External services",
    description: "Payment providers and third-party APIs.",
    icon: Cloud,
  },
  {
    title: "AI orchestration",
    description: "Prompts, tools, guardrails and model requests.",
    icon: BrainCircuit,
  },
  {
    title: "Knowledge store",
    description: "Embeddings, retrieval and vector search.",
    icon: Database,
  },
];

const deliveryStages = [
  {
    title: "Source control",
    subtitle: "Git and code review",
  },
  {
    title: "CI / CD",
    subtitle: "Test, build and release",
  },
  {
    title: "Artifact registry",
    subtitle: "Versioned build artifacts",
  },
  {
    title: "Cloud runtime",
    subtitle: "Containers and scaling",
  },
  {
    title: "Observability",
    subtitle: "Logs, metrics and alerts",
  },
];

export default function ArchitectureDiagram() {
  return (
    <section className="w-full min-w-0">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            INDUSTRY GRADE SYSTEM DESIGN
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            From request to production
          </h3>

          <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
            A sample connected view of application services, AI integrations,
            security controls, data stores and cloud deployment.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Reference architecture
        </div>
      </header>

      {/* Detailed vector architecture for medium and large screens */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block">
        <svg
          viewBox="0 0 1200 850"
          width="100%"
          height="auto"
          preserveAspectRatio="xMidYMin meet"
          role="img"
          aria-labelledby="architecture-title architecture-description"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full min-w-[900px]"
        >
          <title id="architecture-title">
            Connected software system architecture
          </title>
          <desc id="architecture-description">
            Users connect to the frontend, API gateway and backend. Backend
            services connect to data stores, external services and AI providers.
            Security and deployment controls span the system.
          </desc>

          <defs>
            <marker
              id="architecture-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
            </marker>
          </defs>

          {/* Application boundary */}
          <rect
            x="20"
            y="20"
            width="1160"
            height="500"
            rx="18"
            fill="hsl(var(--secondary) / 0.22)"
            stroke="hsl(var(--border))"
          />

          <SectionLabel x={42} y={48}>
            APPLICATION ARCHITECTURE
          </SectionLabel>

          {/* Security trust boundary */}
          <rect
            x="450"
            y="65"
            width="500"
            height="425"
            rx="16"
            fill="hsl(var(--primary) / 0.025)"
            stroke="hsl(var(--primary) / 0.6)"
            strokeDasharray="7 5"
          />

          <rect
            x="475"
            y="53"
            width="450"
            height="25"
            rx="6"
            fill="hsl(var(--card))"
          />

          <text
            x="700"
            y="70"
            textAnchor="middle"
            fill="hsl(var(--primary))"
            fontSize="10"
            fontWeight="700"
            letterSpacing="1"
          >
            TRUST BOUNDARY · AUTH · VALIDATION · ACCESS CONTROL
          </text>

          {/* Request flow */}
          <Connector d="M190 145 H235" />
          <Connector d="M405 145 H480" />
          <Connector d="M650 145 H710" />
          <Connector d="M890 145 H930 V107 H970" />
          <Connector d="M930 145 V197 H970" />
          <Connector d="M800 180 V328" />
          <Connector d="M890 363 H930 V352 H970" />
          <Connector d="M930 363 V442 H970" />

          <DiagramNode
            x={40}
            y={110}
            width={150}
            height={70}
            title="Users"
            subtitle="Web / mobile clients"
            kind="external"
          />
          <DiagramNode
            x={235}
            y={110}
            width={170}
            height={70}
            title="Frontend"
            subtitle="React / application UI"
            kind="primary"
          />
          <DiagramNode
            x={480}
            y={110}
            width={170}
            height={70}
            title="API gateway"
            subtitle="Routes / authentication"
          />
          <DiagramNode
            x={710}
            y={110}
            width={180}
            height={70}
            title="Backend services"
            subtitle="Business logic / APIs"
            kind="primary"
          />
          <DiagramNode
            x={970}
            y={75}
            width={180}
            height={64}
            title="Primary database"
            subtitle="PostgreSQL / persistence"
          />
          <DiagramNode
            x={970}
            y={165}
            width={180}
            height={64}
            title="External services"
            subtitle="Payments / third-party APIs"
            kind="external"
          />

          <text
            x="845"
            y="255"
            fill="hsl(var(--muted-foreground))"
            fontSize="10"
          >
            AI requests
          </text>

          <DiagramNode
            x={710}
            y={328}
            width={180}
            height={70}
            title="AI orchestrator"
            subtitle="Prompts / tools / guardrails"
            kind="primary"
          />
          <DiagramNode
            x={970}
            y={320}
            width={180}
            height={64}
            title="LLM provider"
            subtitle="Model inference"
            kind="external"
          />
          <DiagramNode
            x={970}
            y={410}
            width={180}
            height={64}
            title="Knowledge store"
            subtitle="Embeddings / vector search"
          />

          {/* Security and governance */}
          <rect
            x="40"
            y="264"
            width="590"
            height="205"
            rx="14"
            fill="hsl(var(--card))"
            stroke="hsl(var(--border))"
          />

          <SectionLabel x={62} y={290}>
            SECURITY &amp; GOVERNANCE
          </SectionLabel>

          <text
            x="62"
            y="315"
            fill="hsl(var(--muted-foreground))"
            fontSize="11"
          >
            Applied across API, backend, data and AI boundaries
          </text>

          <g transform="translate(62 338)">
            <rect
              width="246"
              height="48"
              rx="9"
              fill="hsl(var(--secondary))"
              stroke="hsl(var(--border))"
            />
            <ShieldCheck x={12} y={12} size={20} color="hsl(var(--primary))" />
            <text
              x="46"
              y="20"
              fill="hsl(var(--foreground))"
              fontSize="12"
              fontWeight="600"
            >
              Identity &amp; access
            </text>
            <text
              x="46"
              y="35"
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
            >
              Authentication / authorization
            </text>
          </g>

          <g transform="translate(326 338)">
            <rect
              width="278"
              height="48"
              rx="9"
              fill="hsl(var(--secondary))"
              stroke="hsl(var(--border))"
            />
            <LockKeyhole x={12} y={12} size={20} color="hsl(var(--primary))" />
            <text
              x="46"
              y="20"
              fill="hsl(var(--foreground))"
              fontSize="12"
              fontWeight="600"
            >
              Data &amp; application protection
            </text>
            <text
              x="46"
              y="35"
              fill="hsl(var(--muted-foreground))"
              fontSize="10"
            >
              Secrets / encryption / audit logs
            </text>
          </g>

          <text
            x="62"
            y="422"
            fill="hsl(var(--muted-foreground))"
            fontSize="10.5"
          >
            Rate limiting · Input validation · Monitoring · Least privilege
          </text>

          {/* Delivery and cloud operations */}
          <rect
            x="20"
            y="550"
            width="1160"
            height="280"
            rx="18"
            fill="hsl(var(--secondary) / 0.22)"
            stroke="hsl(var(--border))"
          />

          <SectionLabel x={42} y={580}>
            DELIVERY &amp; CLOUD OPERATIONS
          </SectionLabel>

          <text
            x="42"
            y="602"
            fill="hsl(var(--muted-foreground))"
            fontSize="11"
          >
            Repeatable releases, runtime infrastructure and operational feedback
          </text>

          <Connector d="M190 690 H245" />
          <Connector d="M395 690 H450" />
          <Connector d="M600 690 H655" />
          <Connector d="M805 690 H860" />
          <Connector d="M1010 690 H1035" />

          <DiagramNode
            x={40}
            y={655}
            width={150}
            height={70}
            title="Source control"
            subtitle="Git / code review"
            kind="deployment"
          />
          <DiagramNode
            x={245}
            y={655}
            width={150}
            height={70}
            title="CI / CD"
            subtitle="Test / build / release"
            kind="deployment"
          />
          <DiagramNode
            x={450}
            y={655}
            width={150}
            height={70}
            title="Artifact registry"
            subtitle="Versioned images"
            kind="deployment"
          />
          <DiagramNode
            x={655}
            y={655}
            width={150}
            height={70}
            title="Cloud runtime"
            subtitle="Containers / scaling"
            kind="primary"
          />
          <DiagramNode
            x={860}
            y={655}
            width={150}
            height={70}
            title="Observability"
            subtitle="Logs / metrics / alerts"
            kind="deployment"
          />

          <g>
            <rect
              x="1035"
              y="650"
              width="120"
              height="115"
              rx="12"
              fill="hsl(var(--card))"
              stroke="hsl(var(--border))"
            />
            <Cloud x={1080} y={665} size={28} color="hsl(var(--primary))" />
            <text
              x="1095"
              y="713"
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontWeight="600"
            >
              Infrastructure
            </text>
            <text
              x="1095"
              y="730"
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize="9.5"
            >
              Networking
            </text>
            <text
              x="1095"
              y="744"
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize="9.5"
            >
              Backups / recovery
            </text>
          </g>

          {/* Feedback loop */}
          <Connector d="M935 725 V775 H320 V725" dashed />

          <rect
            x="440"
            y="759"
            width="390"
            height="22"
            rx="5"
            fill="hsl(var(--secondary))"
          />
          <text
            x="635"
            y="774"
            textAnchor="middle"
            fill="hsl(var(--muted-foreground))"
            fontSize="10"
          >
            Operational feedback → improve and redeploy
          </text>

          <line
            x1="40"
            y1="800"
            x2="1155"
            y2="800"
            stroke="hsl(var(--border))"
          />
          <text
            x="42"
            y="818"
            fill="hsl(var(--muted-foreground))"
            fontSize="10.5"
          >
            Conceptual reference architecture — final components depend on
            project requirements.
          </text>
        </svg>
      </div>

      {/* Mobile architecture: readable text and connected stages */}
      <div className="space-y-5 md:hidden">
        <div className="rounded-2xl border border-primary/30 bg-primary/[0.03] p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-primary">
            <Workflow className="h-5 w-5" />
            APPLICATION REQUEST FLOW
          </div>

          <div className="space-y-0">
            {mobileLayers.map((layer, index) => {
              const Icon = layer.icon;

              return (
                <div key={layer.number}>
                  <div className="flex min-w-0 items-start gap-3 rounded-xl border border-border bg-card p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-xs font-semibold tracking-wider text-primary/80">
                        LAYER {layer.number}
                      </div>
                      <h4 className="break-words text-base font-semibold text-foreground">
                        {layer.title}
                      </h4>
                      <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
                        {layer.description}
                      </p>
                    </div>
                  </div>

                  {index < mobileLayers.length - 1 && (
                    <div className="flex h-8 items-center justify-center">
                      <ArrowDown
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-primary">
            <Database className="h-4 w-4" />
            DATA &amp; INTEGRATIONS
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mobileIntegrations.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex min-w-0 gap-3 rounded-xl border border-border bg-secondary/30 p-3"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <h4 className="break-words text-base font-semibold">
                      {item.title}
                    </h4>
                    <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/[0.03] p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-primary">
            <ShieldCheck className="h-4 w-4" />
            SECURITY &amp; GOVERNANCE
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              "Authentication and authorization",
              "Secrets and encryption",
              "Input validation and rate limiting",
              "Audit logs and least privilege",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-sm leading-6"
              >
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-primary">
            <Cloud className="h-4 w-4" />
            DELIVERY &amp; CLOUD OPERATIONS
          </div>

          <div className="space-y-0">
            {deliveryStages.map((stage, index) => (
              <div key={stage.title}>
                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <h4 className="break-words text-base font-semibold">
                      {stage.title}
                    </h4>

                    <p className="mt-1 break-words text-sm text-muted-foreground">
                      {stage.subtitle}
                    </p>
                  </div>
                </div>

                {index < deliveryStages.length - 1 && (
                  <div className="flex h-7 items-center justify-center">
                    <ArrowDown className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-dashed border-primary/50 bg-primary/5 p-3">
            <p className="text-xs leading-5 text-muted-foreground">
              Operational feedback, monitoring, backups and recovery support
              continuous improvement and reliable releases.
            </p>
          </div>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          Conceptual reference architecture. Final components depend on project
          requirements.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Core application services
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full border border-border bg-secondary" />
          External systems and infrastructure
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-5 border-t-2 border-dashed border-primary" />
          Feedback and cross-cutting controls
        </span>
      </div>
    </section>
  );
}
