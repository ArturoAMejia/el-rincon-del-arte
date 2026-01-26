"use client";

import { X } from "lucide-react";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/badge/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterableColumn {
  key: string;
  label: string;
  options: FilterOption[];
}

interface DataTableFiltersProps {
  filters: Record<string, string>;
  onFiltersChange: (filters: Record<string, string>) => void;
  filterableColumns: FilterableColumn[];
}

export function DataTableFilters({
  filters,
  onFiltersChange,
  filterableColumns,
}: DataTableFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const handleClearAllFilters = () => {
    onFiltersChange({});
  };

  const activeFilters = Object.entries(filters).filter(([, value]) => value);

  return (
    <div className="mb-4">
      <div className="mb-3 flex items-center gap-4">
        {filterableColumns.map((column) => (
          <Select
            key={column.key}
            value={filters[column.key] || "all"}
            onValueChange={(value) => handleFilterChange(column.key, value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder={`Filter by ${column.label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {column.label}s</SelectItem>
              {column.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearAllFilters}>
            Clear all
          </Button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm">Active filters:</span>
          {activeFilters.map(([key, value]) => {
            const column = filterableColumns.find((col) => col.key === key);
            const option = column?.options.find((opt) => opt.value === value);
            return (
              <Badge key={key} variant="secondary" className="gap-1">
                {column?.label}: {option?.label || value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-auto p-0"
                  onClick={() => handleRemoveFilter(key)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
