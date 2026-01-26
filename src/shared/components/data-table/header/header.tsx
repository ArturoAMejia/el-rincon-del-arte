"use client";

import { Search } from "lucide-react";
import { Input } from "@/shared/components/input";
import { Badge } from "../../badge/badge";

interface DataTableHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchableColumns: string[];
  selectedCount: number;
  totalCount: number;
}

export function DataTableHeader({
  searchQuery,
  onSearchChange,
  searchableColumns,
  selectedCount,
  totalCount,
}: DataTableHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {searchableColumns.length > 0 && (
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder={`Buscar ${searchableColumns.join(", ")}...`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-64 pl-10"
            />
          </div>
        )}

        {selectedCount > 0 && (
          <Badge variant="secondary">
            {selectedCount} of {totalCount} selected
          </Badge>
        )}
      </div>
    </div>
  );
}
