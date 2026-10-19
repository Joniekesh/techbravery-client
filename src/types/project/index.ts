import { UserRole } from "../profile";
import { IProjectItem, QuoteComplexity } from "../quote";

export enum ProjectStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum TeamRole {
  PROJECT_OWNER = "PROJECT_OWNER",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  TECH_LEAD = "TECH_LEAD",
  BACKEND_ENGINEER = "BACKEND_ENGINEER",
  FRONTEND_ENGINEER = "FRONTEND_ENGINEER",
  MOBILE_ENGINEER = "MOBILE_ENGINEER",
  DEVOPS_ENGINEER = "DEVOPS_ENGINEER",
  QA_ENGINEER = "QA_ENGINEER",
  SECURITY_ENGINEER = "SECURITY_ENGINEER",
  UI_UX_DESIGNER = "UI_UX_DESIGNER",
  DATA_ENGINEER = "DATA_ENGINEER",
  PRODUCT_MANAGER = "PRODUCT_MANAGER",
  SCRUM_MASTER = "SCRUM_MASTER",
  SUPPORT_ENGINEER = "SUPPORT_ENGINEER",
  INTERN = "INTERN",
}

export enum TeamMemberStatus {
  INVITED = "INVITED",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  REMOVED = "REMOVED",
}

export enum MilestonePhaeFeatureStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  BLOCKED = "BLOCKED",
}

export enum MilestonePhaseStatus {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

export const TEAM_ROLES: { label: string; value: TeamRole }[] = [
  { value: TeamRole.PROJECT_OWNER, label: "Project Owner" },
  { value: TeamRole.PROJECT_MANAGER, label: "Project Manager" },
  { value: TeamRole.TECH_LEAD, label: "Tech Lead" },
  { value: TeamRole.BACKEND_ENGINEER, label: "Backend Engineer" },
  { value: TeamRole.FRONTEND_ENGINEER, label: "Frontend Engineer" },
  { value: TeamRole.MOBILE_ENGINEER, label: "Mobile Engineer" },
  { value: TeamRole.DEVOPS_ENGINEER, label: "DevOps Engineer" },
  { value: TeamRole.QA_ENGINEER, label: "QA Engineer" },
  { value: TeamRole.SECURITY_ENGINEER, label: "Security Engineer" },
  { value: TeamRole.UI_UX_DESIGNER, label: "UI/UX Designer" },
  { value: TeamRole.DATA_ENGINEER, label: "Data Engineer" },
  { value: TeamRole.PRODUCT_MANAGER, label: "Product Manager" },
  { value: TeamRole.SCRUM_MASTER, label: "Scrum Master" },
  { value: TeamRole.SUPPORT_ENGINEER, label: "Support Engineer" },
  { value: TeamRole.INTERN, label: "Intern" },
];

export const TEAM_ROLE_LABEL_MAP: Record<TeamRole, string> = {
  PROJECT_OWNER: "Project Owner",
  PROJECT_MANAGER: "Project Manager",
  TECH_LEAD: "Tech Lead",
  BACKEND_ENGINEER: "Backend Engineer",
  FRONTEND_ENGINEER: "Frontend Engineer",
  MOBILE_ENGINEER: "Mobile Engineer",
  DEVOPS_ENGINEER: "DevOps Engineer",
  QA_ENGINEER: "QA Engineer",
  SECURITY_ENGINEER: "Security Engineer",
  UI_UX_DESIGNER: "UI/UX Designer",
  DATA_ENGINEER: "Data Engineer",
  PRODUCT_MANAGER: "Product Manager",
  SCRUM_MASTER: "Scrum Master",
  SUPPORT_ENGINEER: "Support Engineer",
  INTERN: "Intern",
};

export const PROJECT_STATUS_TRANSITIONS: Record<
  ProjectStatus,
  readonly ProjectStatus[]
> = {
  [ProjectStatus.PENDING]: [ProjectStatus.IN_PROGRESS, ProjectStatus.CANCELLED],

  [ProjectStatus.IN_PROGRESS]: [
    ProjectStatus.ON_HOLD,
    ProjectStatus.COMPLETED,
    ProjectStatus.CANCELLED,
  ],

  [ProjectStatus.ON_HOLD]: [ProjectStatus.IN_PROGRESS, ProjectStatus.CANCELLED],

  [ProjectStatus.COMPLETED]: [], // terminal

  [ProjectStatus.CANCELLED]: [], // terminal
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  ON_HOLD: "On Hold",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export interface IInvoice {
  id: string;
  projectId: string;
  amount: number;
  currency: string;
  invoiceNo: string;
  paymentId: null | string;
  status: string;
  dueDate: string | null;
  deletedAt: string | null;
  createdAt: string | null;
  paidAt: null | string;
}

export type ProjectMilestone = {
  id: string;
  title: string;
  description?: string | null;
  status: MilestonePhaseStatus;
  progress?: number | null;
  startDate?: string | null;
  dueDate?: string | null;
  order?: number | null;
  estimatedCost?: number | null;
  actualCost?: number | null;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type MilestonePhaseFeature = {
  createdAt: string | null;
  deletedAt: null | string;
  dueDate: null | string;
  id: string;
  milestonePhaseId: string;
  percentCompletion: null | string;
  startDate: null | string;
  status: MilestonePhaeFeatureStatus;
  title: string;
  updatedAt: string | null;
};

export type MilestonePhase = {
  actualCost: number;
  completedAt: string | null;
  createdAt: string | null;
  deletedAt: null | string;
  description: string;
  dueDate: null | string;
  estimatedCost: number;
  id: string;
  percent: number;
  progress: number;
  projectMilestoneId: string;
  startDate: null | string;
  status: MilestonePhaseStatus;
  title: string;
  updatedAt: string | null;
  features: MilestonePhaseFeature[];
  invoice: IInvoice | null;
};

export type Milestone = {
  id: string;
  progress: number;
  projectId: string;
  status: MilestonePhaeFeatureStatus;
  phases: MilestonePhase[];
  createdAt: string;
  updatedAt: string;
};

export type ProjectWithQuoteAndUser = {
  id: string;
  status: ProjectStatus;
  progress: number;
  amountSpent: number;
  hostedUrl: string | null;
  testUrl: string | null;
  repoUrl: string | null;
  projectDueDate: string | null;
  teamSize: number | null;
  projectManagerId: string | null;
  projectAssignedTo: null;
  quoteId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quote: {
    id: string;
    status: string;
    description: string;
    projectName: string;
    budgetRange: string;
    quoteCode: string;
    complexity: QuoteComplexity;
    features: IProjectItem[];
    techStacks: IProjectItem[];
    projectType: {
      id: string;
      label: string;
      value: string;
      description: string;
    };
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    company: {
      companyName: string;
    };
  };
  milestones: Milestone[];
  teams: {
    id: string;
    role: TeamRole;
    permissions: [];
    status: TeamMemberStatus;
    allocation: number;
    isBillable: Boolean;
    joinedAt: string;
    leftAt: string;
    updatedAt: string;
    assignedById: string;
    assignedBy: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: UserRole;
    };
    metadata: null;
    projectId: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: UserRole;
    };
  }[];
};
