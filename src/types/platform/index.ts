import type { LucideIcon } from "lucide-react";

export interface PlatformMetric {
  label: string;
  value: string;
  icon?: LucideIcon;
}

export interface PlatformFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PlatformSuccessMetric {
  metric: string;
  description: string;
}

export interface PlatformService {
  category: string;
  specialists: string[];
  consultations: string;
  avgWaitTime: string;
}
export interface PlatformSuccessStory {
  farmer: string;
  location: string;
  crop: string;
  improvement: string;
  story: string;
}

export interface PlatformLearninPath {
  category: string;
  courses: string[];
  students: string;
  completion: string;
}

export interface IPlatformRoadMap {
  quarter: string;
  milestone: string;
  status: string;
}

export interface Platform {
  id: number;
  slug: string;
  name: string;
  title1: string;
  title2: string;
  badgeText: string;
  shortDesc: string;
  description: string;
  category: string;
  status: string;
  stage: string;

  image?: string;
  thumbNail?: LucideIcon;

  externalLink: {
    title: string;
    url: string;
  };

  metrics: Record<string, string>;

  highlights: string[];
  features: PlatformFeature[];

  fundingGoal?: string;
  raised?: string;
  investors?: number;

  countries?: string[];

  success_metrics?: PlatformSuccessMetric[];

  services?: PlatformService[];

  learning_paths?: PlatformLearninPath[];

  success_stories?: PlatformSuccessStory[];

  roadmap?: IPlatformRoadMap[];
}
