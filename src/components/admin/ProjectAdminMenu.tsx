// components/admin/ProjectAdminMenu.tsx
import { MoreVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ProjectAdminMenu() {
  return (
    <div className="relative">
      <Select
      //  value={statusFilter} onValueChange={setStatusFilter}
      >
        <SelectTrigger className="">
          <MoreVertical size={18} />

          {/* <SelectValue placeholder="Status" /> */}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="SUBMITTED"> Change Status</SelectItem>
          <SelectItem value="ACCEPTED"> Reassign PM</SelectItem>
          <SelectItem value="DECLINED"> View Ledger</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
