import { IStaffProfile } from "../profile";

export interface ISubDepartment {
  id: string;
  name: string;
  departmentId: string;
  employeeDepartment: IDepartment;
  staffProfiles: IStaffProfile[];
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IDepartment {
  id: string;
  name: string;
  isActive: boolean;
  subDepartments: ISubDepartment[];
  staffProfiles: IStaffProfile[];

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
