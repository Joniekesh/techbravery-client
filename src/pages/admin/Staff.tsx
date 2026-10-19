import { AddClientDialog } from "@/components/AddClientDialog";
import Loader from "@/components/loader/Loader";
import {
  clientColumns,
  staffColumns,
} from "@/components/table/clients/columns";
import { DataTable } from "@/components/table/DataTable";
import TableFilters from "@/components/table/TableFilters";
import { Role } from "@/types/user";
import { IUserProfile } from "@/types/profile";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { makeRequest } from "@/utils/makeRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Staff = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  const fetchAllStaff = async () => {
    const res = await makeRequest.get("/user/staff");
    return res.data;
  };

  const {
    data: staff = [],
    isLoading,
    isError,
  } = useQuery<IUserProfile[]>({
    queryKey: ["staff-all"],
    queryFn: fetchAllStaff,
  });

  const filteredData = staff?.filter((staff) => {
    const matchesSearch =
      staff.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const deleteStaffMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await makeRequest.delete(`/user/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-all"] });
      queryClient.invalidateQueries({ queryKey: ["client-all"] });
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
      console.log(error);
    },
  });

  const handleDleteStaff = (id: string) => {
    deleteStaffMutation.mutate(id);
  };

  console.log("ALL STAFF", staff);

  if (isLoading) return <Loader type="bounce" />;

  return (
    <div className="flex-1 flex-col mt-20 ml-4 mr-4 mb-4 gap-10 overflow-x-auto">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold my-6">
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Employees
          </span>
        </h1>

        <AddClientDialog type="staff" />
      </div>

      <div className="flex flex-col gap-4">
        <TableFilters
          title="Staff"
          subTitle="Staff management"
          icon={<Users className="w-5 h-5 text-blue-500" />}
          // buttonText="Add Client"
          url="/admin-dashboard/staff/new"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          // statusFilter={statusFilter}
          // onStatusChange={setStatusFilter}
          // statusOptions={statusOptions}
          // table={table} // optional, for column visibility
        />
        <DataTable
          columns={staffColumns(handleDleteStaff)}
          data={filteredData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Staff;
