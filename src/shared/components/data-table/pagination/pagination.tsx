"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  previousPage: () => void;
  nextPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  previousPage,
  nextPage,
  getCanPreviousPage,
  getCanNextPage,
}: DataTablePaginationProps) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-muted-foreground text-sm">
        Mostrando {startItem} a {endItem} de {totalItems} resultados
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <span className="text-sm">Página</span>
          <Select value={currentPage.toString()}>
            <SelectTrigger className="h-8 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <SelectItem key={page} value={page.toString()}>
                    {page}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <span className="text-sm">de {totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
