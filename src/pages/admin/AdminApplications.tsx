import { Database, Plus, RefreshCw, ServerCrash } from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { Application } from "@/types/application";

import { toast } from "sonner";
import { ApplicationStats } from "@/components/admin/application/ApplicationStats";
import { ApplicationFilters } from "@/components/admin/application/ApplicationFilters";
import { DeleteApplicationDialog } from "@/components/admin/application/DeleteApplicationDialog";
import {
  useApplications,
  useApplicationStats,
  useDeleteApplication,
  usePublishApplication,
} from "@/services";
import { DataTable } from "@/components/table/DataTable";
import { applicationColumns } from "@/components/table/application";
import TableFilters from "@/components/table/TableFilters";
import Loader from "@/components/loader/Loader";

export default function AdminApplications() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [investmentStage, setInvestmentStage] = useState("");

  const [isLive, setIsLive] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);

  const query = useMemo(
    () => ({
      page,
      limit: 12,
      ...(search.trim() && {
        search: search.trim(),
      }),
      ...(status && { status: status as never }),
      ...(investmentStage && {
        investmentStage: investmentStage as never,
      }),
      ...(isLive && {
        isLive: isLive === "true",
      }),
    }),
    [page, search, status, investmentStage, isLive],
  );

  const applicationsQuery = useApplications(query);

  const statsQuery = useApplicationStats();

  const deleteMutation = useDeleteApplication();

  const publishMutation = usePublishApplication();

  const applications = applicationsQuery.data?.data ?? [];

  console.log("APPLICATIONS", applications);

  const meta = applicationsQuery.data?.meta;

  const stats = statsQuery.data;

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setInvestmentStage("");
    setIsLive("");
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteMutation.mutateAsync(deleteTarget.id);

      toast.success("Application deleted successfully");

      setDeleteTarget(null);
    } catch (error) {
      toast.error("Unable to delete application");
    }
  };

  const handleToggleLive = async (application: Application) => {
    try {
      await publishMutation.mutateAsync({
        id: application.id,
        isLive: !application.isLive,
      });

      toast.success(
        application.isLive
          ? "Application unpublished"
          : "Application published",
      );
    } catch {
      toast.error("Unable to update application visibility");
    }
  };

  const handleView = (application: Application) => {
    navigate(`/admin-dashboard/applications/${application.id}`);
  };

  const handleEdit = (application: Application) => {
    navigate(`/admin-dashboard/applications/${application.id}/edit`);
  };

  if (applicationsQuery.isLoading) {
    return <Loader type="bounce" />;
  }

  return (
    <div className="min-h-screen bg-background w-full mt-20">
      <div className="w-full space-y-6 p-4sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  h-2 w-2 rounded-full
                  bg-primary
                  shadow-[0_0_12px_hsl(var(--primary)/0.6)]
                "
              />

              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Platform Management
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Applications
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Manage Techbravery proprietary platforms, investment information,
              performance metrics, content and publication status.
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin-dashboard/applications/new")}
            className="
              bg-gradient-to-r
              from-primary
              to-primary-glow
              shadow-sm
            "
          >
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        {/* Stats */}
        {statsQuery.isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <CardContent className="p-5">
                  <div className="h-16 animate-pulse rounded-lg bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <ApplicationStats
            activePlatforms={stats?.activePlatforms ?? 0}
            totalUsers={stats?.totalUsers ?? 0}
            totalVolume={stats?.totalVolume ?? 0}
            totalCountries={stats?.totalCountries ?? 0}
          />
        )}

        {/* Filters */}
        <ApplicationFilters
          search={search}
          status={status}
          investmentStage={investmentStage}
          isLive={isLive}
          onSearchChange={handleSearch}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onInvestmentStageChange={(value) => {
            setInvestmentStage(value);
            setPage(1);
          }}
          onLiveChange={(value) => {
            setIsLive(value);
            setPage(1);
          }}
          onClear={clearFilters}
        />

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {meta?.total ?? 0}{" "}
              {meta?.total === 1 ? "application" : "applications"}
            </p>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => applicationsQuery.refetch()}
              disabled={applicationsQuery.isFetching}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  applicationsQuery.isFetching ? "animate-spin" : ""
                }`}
              />
              Refresh
            </Button>
          </div>

          {/* Loading */}
          {applicationsQuery.isLoading && (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <Card key={item}>
                  <CardContent className="h-20 animate-pulse bg-muted/40" />
                </Card>
              ))}
            </div>
          )}

          {/* Error */}
          {applicationsQuery.isError && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div
                  className="
                    flex h-12 w-12 items-center
                    justify-center rounded-full
                    bg-destructive/10
                    text-destructive
                  "
                >
                  <ServerCrash className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-semibold">
                  Unable to load applications
                </h3>

                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  Something went wrong while loading the application list.
                </p>

                <Button
                  className="mt-5"
                  variant="outline"
                  onClick={() => applicationsQuery.refetch()}
                >
                  Try again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Empty */}
          {!applicationsQuery.isLoading &&
            !applicationsQuery.isError &&
            applications.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div
                    className="
                      flex h-12 w-12 items-center
                      justify-center rounded-full
                      bg-primary/10
                      text-primary
                    "
                  >
                    <Plus className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 font-semibold">No applications found</h3>

                  <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    {search || status || investmentStage || isLive
                      ? "Try adjusting your filters."
                      : "Create your first proprietary platform."}
                  </p>

                  {!(search || status || investmentStage || isLive) && (
                    <Button
                      className="mt-5"
                      onClick={() =>
                        navigate("/admin-dashboard/applications/new")
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Application
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

          <div className="flex flex-col gap-4">
            <TableFilters
              title="Applications"
              subTitle="Application management"
              icon={<Database className="w-5 h-5 text-blue-500" />}
              buttonText="Add Application"
              url="/admin-dashboard/applications/new"
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              // statusOptions={statusOptions}
              // table={table} // optional, for column visibility
            />

            <DataTable
              columns={applicationColumns}
              data={applications}
              isLoading={applicationsQuery.isLoading}
              enablePagination
              enableColumnVisibility
              mobileColumns={[
                "title",
                "status",
                "investmentStage",
                "activeUsers",
                "monthlyVolume",
                "actions",
              ]}
            />
          </div>
        </div>

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between border-t pt-5">
            <p className="text-sm text-muted-foreground">
              Page {meta.page} of {meta.totalPages}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!meta.hasPreviousPage || page <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={!meta.hasNextPage || page >= meta.totalPages}
                onClick={() =>
                  setPage((value) => Math.min(meta.totalPages, value + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <DeleteApplicationDialog
        open={Boolean(deleteTarget)}
        applicationName={deleteTarget?.title}
        loading={deleteMutation.isPending}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
