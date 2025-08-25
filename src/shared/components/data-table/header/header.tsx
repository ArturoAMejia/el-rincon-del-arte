"use client"

import { Search } from "lucide-react"
import { Input } from "@/shared/components/input"
import { Badge } from "../../badge"

interface DataTableHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  searchableColumns: string[]
  selectedCount: number
  totalCount: number
}

export function DataTableHeader({
  searchQuery,
  onSearchChange,
  searchableColumns,
  selectedCount,
  totalCount,
}: DataTableHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-4">
        {searchableColumns.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={`Buscar ${searchableColumns.join(", ")}...`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-64"
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
  )
}
