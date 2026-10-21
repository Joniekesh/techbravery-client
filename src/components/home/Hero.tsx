import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Globe2,
  Users,
  Layers3,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-bg.jpg";
import SEOHead from "@/components/SEOHead";

/**
 * Static globe representing TechBravery's global technology network.
 * Preserves the original visual components without continuous animation.
 */
const GlobeVisual = () => {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[620px]"
      aria-label="Globe representing TechBravery's global technology network"
      role="img"
    >
      {/* Atmospheric glow */}
      <div className="absolute inset-[10%] rounded-full bg-primary/15 blur-[65px]" />
      <div className="absolute inset-[20%] rounded-full bg-primary/10 blur-[35px]" />

      {/* Static orbital paths */}
      <div
        className="absolute inset-[5%] rounded-full border border-primary/20"
        style={{ transform: "rotate(-25deg) scaleY(0.36)" }}
      />
      <div
        className="absolute inset-[12%] rounded-full border border-primary/15"
        style={{ transform: "rotate(35deg) scaleY(0.56)" }}
      />

      {/* Static orbital nodes */}
      <div className="absolute inset-[5%] z-20">
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_22px_hsl(var(--primary))]" />
      </div>

      <div className="absolute inset-[12%] z-20">
        <span className="absolute right-[5%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary-glow shadow-[0_0_20px_hsl(var(--primary-glow))]" />
      </div>

      {/* Globe body */}
      <div className="absolute inset-[17%] overflow-hidden rounded-full border border-primary/30 bg-background/70 shadow-[inset_-22px_-10px_65px_hsl(var(--primary)/0.15),0_0_55px_hsl(var(--primary)/0.12)] backdrop-blur-sm">
        {/* Sphere lighting */}
        <div className="pointer-events-none absolute inset-0 z-10 rounded-full bg-[radial-gradient(circle_at_30%_25%,hsl(var(--primary)/0.13),transparent_42%),radial-gradient(circle_at_70%_75%,transparent_25%,hsl(var(--background)/0.8)_100%)]" />

        {/* Static globe texture */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 400 400"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="globeClip">
                <circle cx="200" cy="200" r="198" />
              </clipPath>

              <radialGradient id="globeFill" cx="35%" cy="30%" r="80%">
                <stop
                  offset="0%"
                  stopColor="hsl(180 100% 35%)"
                  stopOpacity=".16"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(180 100% 20%)"
                  stopOpacity=".02"
                />
              </radialGradient>
            </defs>

            <g clipPath="url(#globeClip)">
              <circle cx="200" cy="200" r="198" fill="url(#globeFill)" />

              {/* Latitude lines */}
              {[48, 88, 128, 168].map((y) => (
                <ellipse
                  key={y}
                  cx="200"
                  cy="200"
                  rx="198"
                  ry={y}
                  stroke="hsl(var(--primary))"
                  strokeOpacity=".24"
                  strokeWidth="0.8"
                />
              ))}

              {/* Longitude lines */}
              {[45, 90, 135].map((angle) => (
                <ellipse
                  key={angle}
                  cx="200"
                  cy="200"
                  rx={Math.abs(198 * Math.sin((angle * Math.PI) / 180))}
                  ry="198"
                  stroke="hsl(var(--primary))"
                  strokeOpacity=".25"
                  strokeWidth="0.8"
                />
              ))}

              <ellipse
                cx="200"
                cy="200"
                rx="90"
                ry="198"
                stroke="hsl(var(--primary))"
                strokeOpacity=".3"
              />

              {/* Continents */}
              <g
                fill="hsl(var(--primary))"
                fillOpacity=".5"
                stroke="hsl(var(--primary-glow))"
                strokeOpacity=".7"
                strokeWidth="1"
                strokeLinejoin="round"
              >
                {/* North America */}
                <path d="M43 87 L66 63 100 53 122 66 145 71 153 91 135 105 119 104 112 124 95 137 84 163 65 151 62 126 48 114 35 98 Z" />
                <path d="M119 146 L140 153 151 176 145 199 157 220 148 241 136 224 130 199 117 180 110 160 Z" />

                {/* South America */}
                <path d="M147 220 L170 231 181 252 174 279 164 304 158 334 145 318 143 293 133 269 132 244 Z" />

                {/* Europe */}
                <path d="M185 88 L205 76 228 81 242 94 233 109 215 114 201 106 187 111 178 99 Z" />

                {/* Africa */}
                <path d="M190 126 L219 117 242 133 251 158 237 188 224 216 207 237 194 214 186 184 177 161 179 140 Z" />

                {/* Asia */}
                <path d="M234 78 L260 62 292 65 321 78 348 98 354 121 335 133 312 125 297 143 272 134 253 119 234 112 224 95 Z" />
                <path d="M272 143 L293 150 307 173 294 189 277 174 Z" />

                {/* Southeast Asia */}
                <path d="M300 192 L323 194 335 209 327 220 309 211 Z" />

                {/* Australia */}
                <path d="M309 254 L332 247 353 261 348 282 328 292 310 279 Z" />

                {/* Greenland */}
                <path d="M112 32 L135 22 152 32 147 52 129 60 115 49 Z" />
              </g>

              {/* Network locations */}
              {[
                [91, 113],
                [135, 173],
                [201, 99],
                [213, 160],
                [228, 185],
                [277, 112],
                [307, 201],
                [324, 269],
                [162, 277],
                [255, 94],
                [240, 235],
                [116, 90],
              ].map(([cx, cy], index) => (
                <circle
                  key={index}
                  cx={cx}
                  cy={cy}
                  r={index % 3 === 0 ? 2.7 : 1.8}
                  fill="hsl(var(--primary-glow))"
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Fixed highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(120deg,transparent_30%,hsl(var(--primary)/0.08)_55%,transparent_75%)]" />
      </div>

      {/* Static data connection arcs */}
      <svg
        viewBox="0 0 600 600"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M90 315 Q300 20 510 315"
          stroke="hsl(var(--primary))"
          strokeOpacity=".6"
          strokeWidth="1.3"
          strokeDasharray="4 7"
        />
        <path
          d="M105 365 Q300 565 495 365"
          stroke="hsl(var(--primary-glow))"
          strokeOpacity=".5"
          strokeWidth="1.3"
          strokeDasharray="3 8"
        />
      </svg>

      {/* Static floating information cards */}
      <div className="absolute left-0 top-[24%] z-20 rounded-xl border border-primary/20 bg-background/85 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:left-2 sm:px-4">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-primary/10 p-2">
            <Globe2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">
              Global Reach
            </p>
            <p className="text-[10px] text-muted-foreground">
              Connecting ideas
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[21%] right-0 z-20 rounded-xl border border-primary/20 bg-background/85 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:right-1 sm:px-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <span className="absolute h-2 w-2 translate-x-3 -translate-y-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10" />
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">
              Built for Scale
            </p>
            <p className="text-[10px] text-muted-foreground">
              Technology without limits
            </p>
          </div>
        </div>
      </div>

      {/* Globe caption */}
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-primary/80 sm:text-xs">
          Engineering Beyond Boundaries
        </p>
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();

  const rotatingPhrases = [
    {
      text: "Digital Future",
      color: "from-teal-500 via-cyan-500 to-teal-600",
    },
    {
      text: "AI-Powered Innovation",
      color: "from-violet-500 via-purple-500 to-indigo-500",
    },
    {
      text: "Future of Fintech",
      color: "from-emerald-500 via-teal-500 to-cyan-600",
    },
    {
      text: "Next-Generation SaaS",
      color: "from-blue-500 via-sky-500 to-cyan-500",
    },
    {
      text: "Blockchain Innovation",
      color: "from-indigo-500 via-violet-500 to-purple-600",
    },
    {
      text: "Intelligent Enterprise",
      color: "from-amber-500 via-orange-500 to-rose-500",
    },
    {
      text: "Secure Digital Infrastructure",
      color: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      text: "Scalable Digital Products",
      color: "from-rose-500 via-pink-500 to-purple-500",
    },
    {
      text: "Enterprise Transformation",
      color: "from-teal-500 via-emerald-500 to-green-600",
    },
    {
      text: "Future of Digital Finance",
      color: "from-fuchsia-500 via-purple-500 to-blue-500",
    },
  ];

  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActivePhraseIndex((current) => (current + 1) % rotatingPhrases.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const stats = [
    { number: "50+", label: "Clients Served", icon: Users },
    {
      number: "15+",
      label: "Proprietary Digital Products",
      icon: Layers3,
    },
    { number: "12+", label: "Countries Reached", icon: Globe2 },
    { number: "5+", label: "Years of Experience", icon: TrendingUp },
  ];

  return (
    <>
      <SEOHead />

      <section className="relative isolate mt-8 overflow-hidden bg-background">
        {/* Background image and overlays */}

        {/* Background image and sharper theme-aware overlays */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.08] dark:opacity-20"
          />

          {/* Crisp base gradient: bright in light mode, atmospheric in dark mode */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-50/80 dark:from-background dark:via-background dark:to-primary/10" />

          {/* Defined teal accent in the upper-right */}
          <div className="absolute -right-40 -top-32 h-[480px] w-[480px] rounded-full bg-teal-400/[0.10] blur-[100px] dark:bg-primary/10" />

          {/* Soft lower-left accent */}
          <div className="absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-cyan-300/[0.12] blur-[100px] dark:bg-primary/10" />

          {/* Subtle central illumination */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.7),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_50%_35%,hsl(var(--primary)/0.06),transparent_65%)]" />
        </div>

        {/* Refined technical grid */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          {/* Main hero: content left, globe right */}
          <div className="grid items-center gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-4 xl:gap-8">
            <div className="relative z-10 text-center lg:text-left">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="mb-7 flex justify-center lg:justify-start"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium text-primary backdrop-blur-md sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <Sparkles className="h-4 w-4" />
                  Technology Without Boundaries
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.75 }}
                className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl xl:text-7xl"
              >
                Engineering the{" "}
                <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                  Digital Future
                </span>
              </motion.h1>

              {/* Main positioning */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0 xl:text-xl"
              >
                We design, build, and scale powerful, industry-grade digital
                solutions that transform businesses and turn ambitious ideas
                into reality—from{" "}
                <span className="font-semibold text-foreground">
                  AI and fintech
                </span>{" "}
                to{" "}
                <span className="font-semibold text-foreground">
                  blockchain and enterprise technology.
                </span>
              </motion.p>

              {/* <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base lg:mx-0"
              >
                TechBravery helps startups, growing businesses, and
                organizations turn ideas, business challenges, and technology
                opportunities into reliable digital products.
              </motion.p> */}

              {/* Calls to action */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-start"
              >
                <Button
                  size="lg"
                  asChild
                  className="group h-12 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-6 text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 sm:h-14"
                >
                  <Link to="/quote" className="flex items-center gap-2">
                    Build With Us
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-12 rounded-xl border-border bg-background/50 px-6 backdrop-blur-md transition-all duration-300 hover:bg-accent sm:h-14"
                >
                  <Link to="/platforms" className="flex items-center gap-2">
                    <Play className="h-4 w-4 fill-current" />
                    Explore Our Solutions
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="h-12 rounded-xl px-5 text-foreground hover:bg-accent sm:h-14"
                >
                  <Link to="/investor" className="flex items-center gap-2">
                    Invest With Us
                    <TrendingUp className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              {/* Trust message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground sm:text-sm lg:justify-start"
              >
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80",
                    "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=60&q=80",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80",
                  ].map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt=""
                      loading="lazy"
                      className="h-8 w-8 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <span>Trusted by innovators and businesses worldwide</span>
              </motion.div>
            </div>

            {/* Globe visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: 18 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 1 }}
              className="relative mx-auto w-full max-w-[540px] lg:max-w-none"
            >
              <GlobeVisual />
            </motion.div>
          </div>

          {/* Company statistics */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-8 border-t border-border/70 pt-8 sm:mt-12 sm:pt-10 lg:mt-16"
          >
            <div className="grid grid-cols-2 gap-y-5 md:grid-cols-4 md:gap-0">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="relative flex flex-col items-center justify-center px-2 py-4 text-center"
                  >
                    <Icon className="mb-3 h-5 w-5 text-primary" />

                    <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                      {stat.number}
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      {stat.label}
                    </div>

                    {index !== stats.length - 1 && (
                      <div className="absolute right-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-border md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent sm:h-24" />
      </section>
    </>
  );
};

export default Hero;
