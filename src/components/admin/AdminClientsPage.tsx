import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, MessageSquare, Users } from "lucide-react";
import { AddClientDialog } from "../AddClientDialog";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/makeRequest";
import { IUserProfile } from "@/types/profile";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ContactSupportDialog } from "../ContactSupportDialog";
import Loader from "../loader/Loader";
import TableFilters from "../table/TableFilters";
import { useState } from "react";
import { DataTable } from "../table/DataTable";
import { clientColumns } from "../table/clients/columns";
import { Role } from "@/types/user";

const AdminClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchClients = async () => {
    const res = await makeRequest.get("/client");

    return res.data;
  };

  const {
    data: clients = [],
    isLoading,
    isError: isError,
  } = useQuery<IUserProfile[]>({
    queryKey: ["client-all"],
    queryFn: fetchClients,
  });

  const filteredData = clients.filter((client) => {
    const matchesSearch =
      client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.companyName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <Loader type="bounce" />;

  return (
    <Card className="mt-20 ml-4 mr-4 mb-4 flex-1 flex-col">
      <h1 className="text-4xl font-bold my-6">
        <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Clients
        </span>
      </h1>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Client Management
            </CardTitle>
            <CardDescription>
              Manage client accounts and relationships
            </CardDescription>
          </div>
          <AddClientDialog type="client" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client, index) => (
            <Card key={index} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-medium text-primary">
                      {(client?.firstName + " " + client?.lastName)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {client?.firstName + " " + client?.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {client?.company?.companyName}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Projects</p>
                    <p className="font-medium">{client?.projects?.length}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Value</p>
                    <p className="font-medium">
                      {client?.projects?.reduce(
                        (acc, project) => acc + (project?.amountSpent ?? 0),
                        0,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="outline">{client.status}</Badge>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      title="View Details"
                    >
                      <Link to={`/admin-dashboard/client/${client.id}`}>
                        <Eye className="w-3 h-3" />
                      </Link>
                      {/* <Link to={`/case-study/${index + 1}`}>
                                  <Eye className="w-3 h-3" />
                                </Link> */}
                    </Button>
                    <ContactSupportDialog
                      trigger={
                        <Button
                          size="sm"
                          variant="outline"
                          title="Contact Client"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>

      <div className="flex flex-col gap-4">
        <TableFilters
          title="Clients"
          subTitle="Clients management"
          icon={<Users className="w-5 h-5 text-blue-500" />}
          buttonText="Add Client"
          url="/admin-dashboard/quotes/new"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          // statusOptions={statusOptions}
          // table={table} // optional, for column visibility
        />
        <DataTable
          columns={clientColumns}
          data={filteredData}
          isLoading={isLoading}
        />
      </div>
    </Card>
  );
};

export default AdminClientsPage;
