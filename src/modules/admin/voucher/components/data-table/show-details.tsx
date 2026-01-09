"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components";
import { EllipsisVertical } from "lucide-react";
import { VoucherEntity, VoucherSaleSummary } from "../../interfaces";
import { getStatusColor } from "@/utils";

interface Props {
  voucher: VoucherEntity;
}

export const ShowVoucherDetails = ({ voucher }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <EllipsisVertical />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Detalles del comprobante #{voucher.id}</AlertDialogTitle>
          <AlertDialogDescription>
            <Badge variant="secondary" className="mb-4">
              Serie: {voucher.serie || "-"}
            </Badge>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <h3 className="text-lg font-semibold">
                {voucher.client || "Cliente no disponible"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Numeración: {voucher.numeration || "-"}
              </p>
            </div>
            <Badge className={getStatusColor(voucher.state_id)}>
              {voucher.state_id}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Moneda
              </p>
              <p className="font-medium">{voucher.currency || "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Forma de pago
              </p>
              <p className="font-medium capitalize">
                {voucher.form_of_payment || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Fecha
              </p>
              <p className="font-medium">
                {new Date(voucher.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Hora
              </p>
              <p className="font-medium">
                {new Date(voucher.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Ventas relacionadas
            </p>
            {voucher.sales.length === 0 ? (
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  No hay ventas relacionadas a este comprobante.
                </p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead>ID</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {voucher.sales.map((sale: VoucherSaleSummary) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{sale.id}</TableCell>
                        <TableCell>
                          {new Date(sale.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ${sale.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
