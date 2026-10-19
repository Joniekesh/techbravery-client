export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  active: boolean;
};

export type ServiceFeature = BaseEntity & {
  name: string;
  serviceId: string;
};

export type ServiceTechStack = BaseEntity & {
  name: string;
  serviceId: string;
};

export type ServiceProcess = BaseEntity & {
  name: string;
  serviceId: string;
  order: number;
};

export type IService = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  icon: string;
  image: string | null;
  price: number;
  timeline: string;
  projectsCompleted: number;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  userId: string | null;
  features: ServiceFeature[];
  techStacks: ServiceTechStack[];
  process: ServiceProcess[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
