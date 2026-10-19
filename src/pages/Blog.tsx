import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  User,
  ArrowRight,
  Bookmark,
  Share2,
  Calendar,
  Tag,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: "The Future of Fintech in Africa: Trends Shaping 2024",
    excerpt:
      "Exploring how blockchain, AI, and mobile-first approaches are revolutionizing financial services across the continent.",
    content:
      "As Africa continues to lead the world in mobile money adoption, we're witnessing unprecedented innovation in financial technology...",
    author: "Dr. Kwame Asante",
    authorRole: "CTO, Techbravery",
    readTime: "12 min read",
    publishDate: "March 15, 2024",
    category: "Fintech",
    tags: ["Fintech", "Blockchain", "Africa", "Mobile Money"],
    image: "/api/placeholder/800/400",
    featured: true,
  };

  const posts = [
    {
      id: 2,
      title: "Building Scalable Backend Systems with Node.js and Microservices",
      excerpt:
        "Learn how we architected a system handling 1M+ daily transactions across multiple African markets.",
      author: "Sarah Okafor",
      authorRole: "Lead Backend Engineer",
      readTime: "8 min read",
      publishDate: "March 12, 2024",
      category: "Engineering",
      tags: ["Node.js", "Microservices", "Architecture"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 3,
      title: "Mobile-First Design Principles for African Markets",
      excerpt:
        "Why mobile-first isn't just a design choice but a necessity when building for African users.",
      author: "Ahmed Hassaan",
      authorRole: "UI/UX Director",
      readTime: "6 min read",
      publishDate: "March 10, 2024",
      category: "Design",
      tags: ["Mobile", "UX", "Africa", "Design"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 4,
      title: "AI in Agriculture: How Machine Learning is Transforming Farming",
      excerpt:
        "Case study on implementing predictive analytics for crop yield optimization in Kenya.",
      author: "Dr. Grace Mwangi",
      authorRole: "AI Research Lead",
      readTime: "10 min read",
      publishDate: "March 8, 2024",
      category: "AI/ML",
      tags: ["AI", "Agriculture", "Machine Learning"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 5,
      title: "Blockchain Beyond Cryptocurrency: Real-World Applications",
      excerpt:
        "Exploring how blockchain technology is solving supply chain and identity challenges in Africa.",
      author: "Michael Owusu",
      authorRole: "Blockchain Developer",
      readTime: "9 min read",
      publishDate: "March 5, 2024",
      category: "Blockchain",
      tags: ["Blockchain", "Supply Chain", "Identity"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 6,
      title: "The Rise of Progressive Web Apps in Emerging Markets",
      excerpt:
        "Why PWAs are the perfect solution for delivering app-like experiences with limited internet connectivity.",
      author: "Fatima Al-Rashid",
      authorRole: "Frontend Architect",
      readTime: "7 min read",
      publishDate: "March 1, 2024",
      category: "Frontend",
      tags: ["PWA", "Web Development", "Mobile"],
      image: "/api/placeholder/400/250",
    },
    {
      id: 7,
      title: "DevOps Best Practices for African Startups",
      excerpt:
        "Cost-effective strategies for implementing CI/CD and infrastructure automation on a budget.",
      author: "James Mutua",
      authorRole: "DevOps Engineer",
      readTime: "11 min read",
      publishDate: "February 28, 2024",
      category: "DevOps",
      tags: ["DevOps", "CI/CD", "Infrastructure"],
      image: "/api/placeholder/400/250",
    },
  ];

  const categories = [
    "All",
    "Fintech",
    "Engineering",
    "Design",
    "AI/ML",
    "Blockchain",
    "Frontend",
    "DevOps",
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // For individual blog
  //   <SEOHead
  //   title={`${article.title} | TechBravery`}
  //   description={article.metaDescription}
  //   url={`/blog/${article.slug}`}
  //   image={article.ogImage || "/og-image.png"}
  //   type="article"
  // />

  return (
    <>
      <SEOHead
        title="Technology Insights and Software Guides | TechBravery"
        description="Explore practical software engineering insights, technology guides, and digital product development articles from TechBravery."
        url="/blog"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-background via-accent/20 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Tech{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Insights
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Thought leadership, technical deep-dives, and insights from our
                team of African tech innovators. Stay ahead of the curve with
                our latest articles and case studies.
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-3 rounded-full border-primary/20"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-8 text-center">
                Featured Article
              </h2>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Featured Image */}
                  <div className="relative h-64 lg:h-auto bg-gradient-to-br from-primary/20 to-primary-glow/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ArrowRight className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Featured Article
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-primary to-primary-glow">
                        Featured
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">{featuredPost.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredPost.publishDate}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">
                            {featuredPost.author}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {featuredPost.authorRole}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-6">
                      {featuredPost.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-primary to-primary-glow">
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-accent/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className="rounded-full"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary-glow/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ArrowRight className="w-8 h-8 text-primary/60" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.publishDate}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">
                              {post.author}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {post.authorRole}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" variant="outline">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-primary-glow/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with Our Latest Insights
              </h3>
              <p className="text-muted-foreground mb-8">
                Get weekly tech insights, case studies, and industry trends
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button className="bg-gradient-to-r from-primary to-primary-glow">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Join 5,000+ tech professionals. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
