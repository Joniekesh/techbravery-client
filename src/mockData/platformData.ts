import { Platform } from "@/types/platform";
import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Calendar,
  Cloud,
  Globe,
  Phone,
  Pill,
  Shield,
  Smartphone,
  Sprout,
  Stethoscope,
  Truck,
  Users,
  Zap,
} from "lucide-react";

export const platforms: Platform[] = [
  {
    id: 1,
    name: "ExAfrik P2P Exchange",
    slug: "exafrik-p2p-exchange",
    badgeText: "Live Platform",

    title1: "ExAfrik ",
    title2: "P2P Exchange",
    shortDesc:
      "Revolutionary peer-to-peer trading platform connecting African markets with global opportunities.",

    description:
      "Africa's leading peer-to-peer cryptocurrency trading platform. Trade Bitcoin, Ethereum, and other cryptocurrencies with fellow Africans using local payment methods.",
    category: "Fintech",
    status: "Open",
    stage: "Series A",
    image: "/api/placeholder/400/250",
    thumbNail: BarChart3,

    externalLink: {
      title: "Visit Platform",
      url: "#",
    },

    highlights: [
      "Blockchain transparency",
      "Weather integration",
      "Farmer onboarding",
      "Export tracking",
    ],
    fundingGoal: "$250K",
    raised: "$120K",
    investors: 6,

    metrics: {
      totalUsers: "10,500+",
      monthlyVolume: "$2.5M",
      countries: "15",
      transactions: "45K+",
      uptime: "99.9%",
      avgTransactionTime: "< 2 mins",
      growth: "+125%",

      users: "50K+",
      volume: "$2.5M",
    },

    features: [
      {
        icon: Shield,
        title: "Bank-Grade Security",
        description:
          "Multi-layer security with 2FA, cold storage, and real-time fraud detection",
      },
      {
        icon: Zap,
        title: "Lightning Fast",
        description:
          "Instant order matching and quick settlement across all supported currencies",
      },
      {
        icon: Globe,
        title: "Multi-Currency Support",
        description:
          "Trade in 25+ African currencies with competitive rates and low fees",
      },
      {
        icon: Users,
        title: "Community Driven",
        description:
          "Built for Africans by Africans with local payment methods integration",
      },
    ],

    countries: [
      "Nigeria",
      "Kenya",
      "Ghana",
      "South Africa",
      "Uganda",
      "Tanzania",
      "Rwanda",
      "Zambia",
      "Botswana",
      "Ethiopia",
      "Morocco",
      "Egypt",
      "Senegal",
      "Ivory Coast",
      "Cameroon",
    ],

    roadmap: [
      {
        quarter: "Q1 2024",
        milestone: "Launch in 5 new countries",
        status: "completed",
      },
      {
        quarter: "Q2 2024",
        milestone: "Mobile app release",
        status: "in-progress",
      },
      { quarter: "Q3 2024", milestone: "DeFi integration", status: "planned" },
      {
        quarter: "Q4 2024",
        milestone: "Cross-border remittances",
        status: "planned",
      },
    ],
  },

  {
    id: 2,
    slug: "agrilink-supply-chain",
    badgeText: "Growing Fast",
    name: "AgriLink Supply Chain",

    title1: "AgriLink",
    title2: " Supply Chain",
    shortDesc:
      "Blockchain-powered supply chain management for African agricultural products",

    description:
      "Empowering African farmers with smart agriculture solutions. From soil analysis to market connections, our platform is transforming how farming is done across the continent.",
    category: "AgriTech",
    status: "Open",
    stage: "Seed",
    image: "/api/placeholder/400/250",

    externalLink: {
      title: "Try Platform",
      url: "#",
    },

    highlights: [
      "Video consultations",
      "Prescription management",
      "Medical records",
      "Emergency alerts",
    ],

    metrics: {
      totalFarms: "5,200+",
      monthlyRevenue: "$850K",
      countries: "8",
      cropYield: "+35%",
      waterSaved: "2.3M L",
      carbonOffset: "1,500 T",

      users: "12K+",
      volume: "$850K",
      growth: "+89%",
    },

    features: [
      {
        icon: Sprout,
        title: "Smart Crop Planning",
        description:
          "AI-powered crop recommendations based on soil, weather, and market data",
      },
      {
        icon: Cloud,
        title: "Weather Intelligence",
        description:
          "Hyperlocal weather forecasting with farming-specific insights and alerts",
      },
      {
        icon: BarChart3,
        title: "Yield Analytics",
        description:
          "Track and optimize crop yields with detailed performance analytics",
      },
      {
        icon: Truck,
        title: "Supply Chain",
        description:
          "Connect directly with buyers and optimize your distribution network",
      },
    ],

    success_stories: [
      {
        farmer: "John Mbeki",
        location: "Kenya",
        crop: "Maize",
        improvement: "+45% yield increase",
        story:
          "Using AgriTech's soil analysis and weather predictions, John increased his maize yield by 45% while reducing water usage by 30%.",
      },
      {
        farmer: "Amina Hassan",
        location: "Nigeria",
        crop: "Tomatoes",
        improvement: "+60% revenue boost",
        story:
          "Connected directly with urban buyers through our platform, eliminating middlemen and increasing profit margins significantly.",
      },
      {
        farmer: "Peter Mandela",
        location: "South Africa",
        crop: "Grapes",
        improvement: "+25% efficiency",
        story:
          "Smart irrigation scheduling based on weather data helped reduce water costs while maintaining grape quality for wine production.",
      },
    ],

    countries: [
      "Kenya",
      "Nigeria",
      "Ghana",
      "South Africa",
      "Uganda",
      "Tanzania",
      "Rwanda",
      "Ethiopia",
    ],
  },

  {
    id: 3,
    slug: "educonnect-learning-hub",
    name: "EduConnect Learning Hub",
    badgeText: "Education Revolution",

    title1: "EduConnect",
    title2: " Learning Hub",
    shortDesc:
      "AI-powered educational platform providing personalized learning experiences across Africa.",

    description:
      "Africa's premier AI-powered educational platform. Providing world-class education in local languages with offline capabilities, designed specifically for African learners.",
    category: "EdTech",
    status: "Closed",
    stage: "Pre-Seed",
    image: "/api/placeholder/400/250",
    thumbNail: BookOpen,

    externalLink: {
      title: "Explore Courses",
      url: "#",
    },

    metrics: {
      totalStudents: "25,000+",
      monthlyRevenue: "$450K",
      countries: "12",
      courses: "1,500+",
      completion: "85%",
      languages: "8",

      users: "25K+",
      volume: "$450K",
      growth: "+156%",
    },

    fundingGoal: "$150K",
    raised: "$150K",
    investors: 8,

    highlights: [
      "AI tutoring system",
      "Offline capability",
      "Local languages",
      "Progress tracking",
    ],

    features: [
      {
        icon: Brain,
        title: "AI-Powered Learning",
        description:
          "Personalized learning paths adapted to each student's pace and style",
      },
      {
        icon: Smartphone,
        title: "Offline-First Design",
        description:
          "Download content for offline learning, perfect for low-connectivity areas",
      },
      {
        icon: Globe,
        title: "Local Languages",
        description:
          "Content available in 8 African languages with voice narration",
      },
      {
        icon: Award,
        title: "Certified Programs",
        description:
          "Industry-recognized certificates accepted by employers across Africa",
      },
    ],

    learning_paths: [
      {
        category: "Technology",
        courses: [
          "Web Development",
          "Mobile App Development",
          "Data Science",
          "Cybersecurity",
        ],
        students: "8,500+",
        completion: "92%",
      },
      {
        category: "Business",
        courses: [
          "Entrepreneurship",
          "Digital Marketing",
          "Financial Management",
          "Project Management",
        ],
        students: "6,200+",
        completion: "88%",
      },
      {
        category: "Languages",
        courses: [
          "English Proficiency",
          "French for Business",
          "Arabic Basics",
          "Portuguese",
        ],
        students: "4,800+",
        completion: "78%",
      },
      {
        category: "Skills",
        courses: [
          "Communication",
          "Leadership",
          "Creative Writing",
          "Public Speaking",
        ],
        students: "5,500+",
        completion: "85%",
      },
    ],

    success_metrics: [
      { metric: "78%", description: "Job placement rate within 6 months" },
      { metric: "45%", description: "Average salary increase post-completion" },
      { metric: "92%", description: "Student satisfaction rate" },
      { metric: "150+", description: "Partner companies for job placement" },
    ],

    countries: [
      "Nigeria",
      "Kenya",
      "Ghana",
      "South Africa",
      "Uganda",
      "Tanzania",
      "Rwanda",
      "Ethiopia",
      "Senegal",
      "Morocco",
      "Egypt",
      "Cameroon",
    ],
  },

  {
    id: 4,
    slug: "healthtech-connect",
    name: "HealthTech Connect",
    badgeText: "Health Innovation",
    title1: "HealthTech",
    title2: "Connect",
    shortDesc:
      "Telemedicine platform connecting patients with healthcare providers across rural Africa.",
    description:
      "Bridging the healthcare gap in Africa through telemedicine. Connect patients in remote areas with qualified healthcare providers through secure, HIPAA-compliant platform.",
    category: "HealthTech",
    status: "Open",
    stage: "MVP",
    image: "/api/placeholder/400/250",
    thumbNail: Stethoscope,

    externalLink: {
      title: "Book Consultation",
      url: "#",
    },

    metrics: {
      totalPatients: "150K+",
      monthlyRevenue: "$320K",
      providers: "2,500+",
      consultations: "25K/month",
      satisfaction: "97%",
      countries: "8",

      users: "8K+",
      volume: "$120K",
      growth: "+245%",
    },

    highlights: [
      "Video consultations",
      "Prescription management",
      "Medical records",
      "Emergency alerts",
    ],
    fundingGoal: "$100K",
    raised: "$45K",
    investors: 3,

    features: [
      {
        icon: Phone,
        title: "Telemedicine Consultations",
        description:
          "HD video calls with certified healthcare providers across Africa",
      },
      {
        icon: Pill,
        title: "Digital Prescriptions",
        description:
          "Secure, digital prescription management with pharmacy integration",
      },
      {
        icon: Shield,
        title: "HIPAA Compliance",
        description:
          "End-to-end encryption ensuring patient privacy and data security",
      },
      {
        icon: Calendar,
        title: "Smart Scheduling",
        description:
          "AI-powered appointment scheduling with automated reminders",
      },
    ],

    services: [
      {
        category: "Primary Care",
        specialists: [
          "General Practitioners",
          "Family Medicine",
          "Internal Medicine",
          "Pediatrics",
        ],
        consultations: "8,500+/month",
        avgWaitTime: "15 minutes",
      },
      {
        category: "Specialty Care",
        specialists: [
          "Cardiology",
          "Dermatology",
          "Mental Health",
          "Obstetrics",
        ],
        consultations: "5,200+/month",
        avgWaitTime: "45 minutes",
      },
      {
        category: "Emergency Care",
        specialists: [
          "Emergency Medicine",
          "Urgent Care",
          "Triage Nurses",
          "24/7 Support",
        ],
        consultations: "3,800+/month",
        avgWaitTime: "5 minutes",
      },
      {
        category: "Chronic Care",
        specialists: [
          "Diabetes Management",
          "Hypertension",
          "Asthma Care",
          "Follow-ups",
        ],
        consultations: "7,500+/month",
        avgWaitTime: "20 minutes",
      },
    ],

    success_metrics: [
      { metric: "92%", description: "Reduction in travel time to healthcare" },
      { metric: "67%", description: "Lower cost than traditional visits" },
      { metric: "97%", description: "Patient satisfaction rate" },
      { metric: "85%", description: "Provider adoption rate" },
    ],

    countries: [
      "Nigeria",
      "Kenya",
      "Ghana",
      "Uganda",
      "Tanzania",
      "Rwanda",
      "Cameroon",
      "Senegal",
    ],
  },
];
