import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Amara Okafor",
      role: "CEO, Lagos Fintech",
      location: "Nigeria",
      content:
        "Techbravery transformed our vision into a world-class fintech platform. Their understanding of African markets is unmatched.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    },
    {
      name: "Kwame Asante",
      role: "Founder, AgriConnect",
      location: "Ghana",
      content:
        "The blockchain solution they built for our agricultural supply chain has revolutionized how farmers connect with buyers.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    {
      name: "Fatima Al-Rashid",
      role: "CTO, EduTech Solutions",
      location: "Kenya",
      content:
        "Their AI-powered learning platform exceeded our expectations. The team's technical expertise and cultural understanding are exceptional.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=100&q=80",
    },
    {
      name: "David Mutua",
      role: "Product Manager, Health+",
      location: "Tanzania",
      content:
        "From concept to deployment, Techbravery delivered a scalable health management system that serves thousands of patients daily.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    {
      name: "Aisha Camara",
      role: "Director, Microfinance Plus",
      location: "Senegal",
      content:
        "Their mobile-first approach and understanding of French-speaking markets made our expansion seamless across West Africa.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    {
      name: "Omar Hassan",
      role: "VP Innovation, Trade Hub",
      location: "Morocco",
      content:
        "The e-commerce platform they built handles our complex multi-currency transactions flawlessly. Outstanding work!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    },
  ];

  /**
   * Split testimonials into columns.
   *
   * Example with 3 columns:
   *
   * Column 1 → 1, 4
   * Column 2 → 2, 5
   * Column 3 → 3, 6
   */
  const splitIntoColumns = (columnCount: number) => {
    return Array.from({ length: columnCount }, (_, columnIndex) =>
      testimonials.filter(
        (_, testimonialIndex) => testimonialIndex % columnCount === columnIndex,
      ),
    );
  };

  const desktopColumns = splitIntoColumns(3);
  const tabletColumns = splitIntoColumns(2);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by innovative companies across Africa and beyond
          </p>
        </motion.div>

        {/* =====================================================
            DESKTOP
            3 COLUMNS
            ↑  ↓  ↑
        ====================================================== */}

        <div className="hidden lg:grid lg:grid-cols-3 gap-8 h-[720px]">
          {desktopColumns.map((column, columnIndex) => (
            <VerticalMarquee
              key={`desktop-column-${columnIndex}`}
              testimonials={column}
              direction={columnIndex % 2 === 0 ? "up" : "down"}
              duration={columnIndex % 2 === 0 ? 38 : 44}
            />
          ))}
        </div>

        {/* =====================================================
            TABLET
            2 COLUMNS
            ↑  ↓
        ====================================================== */}

        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-8 h-[680px]">
          {tabletColumns.map((column, columnIndex) => (
            <VerticalMarquee
              key={`tablet-column-${columnIndex}`}
              testimonials={column}
              direction={columnIndex % 2 === 0 ? "up" : "down"}
              duration={columnIndex === 0 ? 40 : 46}
            />
          ))}
        </div>

        {/* =====================================================
            MOBILE
            1 COLUMN
            ↑
        ====================================================== */}

        <div className="grid md:hidden h-[620px]">
          <VerticalMarquee
            testimonials={testimonials}
            direction="up"
            duration={42}
          />
        </div>

        {/* =====================================================
            COMPANY METRICS
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
            {[
              {
                number: "98%",
                label: "Client Satisfaction",
              },
              {
                number: "50+",
                label: "Successful Projects",
              },
              {
                number: "15+",
                label: "Countries Served",
              },
              {
                number: "24/7",
                label: "Support Available",
              },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {metric.number}
                </div>

                <div className="text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =============================================================
   VERTICAL MARQUEE
============================================================= */

type Testimonial = {
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
};

type VerticalMarqueeProps = {
  testimonials: Testimonial[];
  direction: "up" | "down";
  duration: number;
};

const VerticalMarquee = ({
  testimonials,
  direction,
  duration,
}: VerticalMarqueeProps) => {
  /**
   * Duplicate the entire group.
   *
   * Group A:
   * [Card 1]
   * [Card 2]
   * [Card 3]
   *
   * Group B:
   * [Card 1]
   * [Card 2]
   * [Card 3]
   *
   * We animate exactly half of the track.
   * When Group A leaves, Group B is in exactly the
   * same position, creating a seamless infinite loop.
   */
  const items = [...testimonials, ...testimonials];

  return (
    <div
      className="
        relative
        h-full
        overflow-hidden
        rounded-2xl
      "
    >
      {/* Top fade */}
      <div
        className="
          pointer-events-none
          absolute
          top-0
          left-0
          right-0
          h-20
          z-20
          bg-gradient-to-b
          from-background
          to-transparent
        "
      />

      {/* Bottom fade */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-20
          z-20
          bg-gradient-to-t
          from-background
          to-transparent
        "
      />

      {/* =====================================================
          MOVING TRACK
      ====================================================== */}

      <motion.div
        className="flex flex-col gap-6"
        animate={
          direction === "up"
            ? {
                y: ["0%", "-50%"],
              }
            : {
                y: ["-50%", "0%"],
              }
        }
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        whileHover={{
          animationPlayState: "paused",
        }}
      >
        {items.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </motion.div>
    </div>
  );
};

/* =============================================================
   TESTIMONIAL CARD
============================================================= */

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card
      className="
        flex-shrink-0
        h-auto
        min-h-[280px]
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        border-border/60
        bg-card/90
        backdrop-blur-sm
      "
    >
      <CardContent className="p-6">
        {/* Stars */}
        <div className="flex items-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="
                  w-5
                  h-5
                  text-yellow-400
                  fill-current
                "
            />
          ))}
        </div>

        {/* Testimonial */}
        <blockquote
          className="
            text-muted-foreground
            mb-6
            leading-relaxed
          "
        >
          "{testimonial.content}"
        </blockquote>

        {/* User */}
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />

            <AvatarFallback>
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="font-semibold text-foreground">
              {testimonial.name}
            </div>

            <div className="text-sm text-muted-foreground">
              {testimonial.role}
            </div>

            <div className="text-xs text-primary font-medium">
              {testimonial.location}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonials;
