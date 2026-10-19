import React, { useState } from "react";
import {
  CheckCircle,
  Download,
  Eye,
  FileText,
  Filter,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/makeRequest";
import { IQuote, QuoteBudgetRange, QuoteStatus } from "@/types/quote";
import Loader from "@/components/loader/Loader";
import { toast } from "sonner";
import { DataTable } from "@/components/table/DataTable";
import { quoteColumns } from "@/components/table/quotes/columns";
import TableFilters from "@/components/table/TableFilters";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

const AdminQuotesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const fetchQuotes = async () => {
    const res = await makeRequest.get("/quote/all");
    return res.data as IQuote[];
  };

  const {
    data: quotes = [],
    isLoading,
    isError,
  } = useQuery<IQuote[]>({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
  });

  const pendingQuotes = quotes?.filter(
    (item) => item.status === QuoteStatus.SUBMITTED,
  ).length;

  const filteredQuotes = quotes?.filter((quote) => {
    const matchesSearch =
      quote.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "PENDING":
      case "SUBMITTED":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "ACCEPTED":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300";
      case "ON_HOLD":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "PAID":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "EXPIRED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "DECLINED":
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getBudgetRange = (budGetRange: string) => {
    switch (budGetRange) {
      case QuoteBudgetRange.FIVE_TO_15K:
        return <span>$5k-15k</span>;
      case QuoteBudgetRange.FITEEN_TO_30K:
        return <span>$15k-30k</span>;
      case QuoteBudgetRange.THIRTY_TO_50K:
        return <span>$30k-50k</span>;
      case QuoteBudgetRange.FIFTYK_PLUS:
        return <span>$50k+</span>;
      default:
        return <span>$5-15k</span>;
    }
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "SUBMITTED", label: "Pending" },
    { value: "ACCEPTED", label: "Approved" },
    { value: "DECLINED", label: "Rejected" },
    { value: "EXPIRED", label: "Expired" },
  ];

  const filteredData = quotes.filter((quote) => {
    const matchesSearch =
      quote.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const table = useReactTable({
    data: filteredData ?? [],
    columns: quoteColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleQuoteAction = (quote: IQuote, action: "ACCEPT" | "REJECT") => {
    toast.success(
      `Quote No: ${quote.quoteCode} has been successfully ${action.toLowerCase()}ed.`,
    );
  };

  const handleDeleteQuote = (quote: IQuote) => {
    toast.success(`Quote No: ${quote.quoteCode} has been permanently deleted.`);
  };

  if (isLoading) return <Loader type="bounce" />;

  return (
    <div className="flex-1 flex-col mt-20 ml-4 mr-4 mb-4 gap-10 overflow-x-auto">
      <h1 className="text-4xl font-bold my-6">
        <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Quotes
        </span>
      </h1>
      <div className="flex flex-col gap-4">
        <TableFilters
          // title="Quotes"
          // subTitle="Manage all quote requests"
          // icon={<FileText className="w-5 h-5 text-blue-500" />}
          buttonText="Add Quote"
          url="/admin-dashboard/quotes/new"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          statusOptions={statusOptions}
          table={table} // optional, for column visibility
        />
        <DataTable
          columns={quoteColumns}
          data={filteredData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AdminQuotesPage;
