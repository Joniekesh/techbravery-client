"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Download, FileText, Filter, Plus, Search } from "lucide-react";

import { CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Table } from "@tanstack/react-table";

interface TableFiltersProps<TData> {
  title?: string;
  subTitle?: string;
  icon?: React.ReactNode;

  buttonText?: string;
  url?: string;

  searchQuery: string;
  onSearchChange: (value: string) => void;

  showFilterButton?: boolean;
  showExportButton?: boolean;

  statusFilter?: string;
  onStatusChange?: (value: string) => void;

  statusOptions?: {
    label: string;
    value: string;
  }[];

  table?: Table<TData>;
}

const TableFilters = <TData,>({
  title,
  subTitle,
  icon,
  buttonText,
  url,

  searchQuery,
  onSearchChange,

  showFilterButton = false,
  showExportButton = false,

  statusFilter,
  onStatusChange,
  statusOptions,

  table,
}: TableFiltersProps<TData>) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Heading + actions */}
      {(title || icon || buttonText) && (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {(title || icon) && (
            <div>
              <CardTitle className="flex items-center gap-2">
                {icon || <FileText className="h-5 w-5" />}
                {title}
              </CardTitle>

              {subTitle && (
                <CardDescription className="mt-1">{subTitle}</CardDescription>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {showFilterButton && (
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            )}

            {showExportButton && (
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            )}

            {buttonText && url && (
              <Button
                onClick={() => navigate(url)}
                size="sm"
                className="bg-gradient-to-r from-primary to-primary-glow"
              >
                <Plus className="mr-2 h-4 w-4" />
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Search / filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {statusFilter !== undefined && onStatusChange && statusOptions && (
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {table && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default TableFilters;
