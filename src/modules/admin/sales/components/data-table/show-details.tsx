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
import { SaleDetailEntity, SaleEntity } from "../../interfaces";
import { getStatusColor } from "@/utils";

interface Props {
  sale: SaleEntity;
}
export const ShowSalesDetails = ({ sale }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <EllipsisVertical />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-max">
        <AlertDialogHeader>
          <AlertDialogTitle>Detalles de la venta #{sale.id}</AlertDialogTitle>
          <AlertDialogDescription>
            <Badge variant="secondary" className="mb-4">
              Estado: Completada
            </Badge>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6">
          {/* Transaction Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <h3 className="text-lg font-semibold">
                {sale.client || "Cliente Genérico"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Venta ID: {sale.id}
              </p>
            </div>
            <Badge className={getStatusColor(sale.state_id)}>
              {sale.state_id}
            </Badge>
          </div>

          {/* Amount Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-2xl font-bold">${sale.subtotal.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground mb-1">
                Tipo de venta
              </p>
              <p className="text-lg font-semibold capitalize">
                {sale.sale_type}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Fecha
              </p>
              <p className="font-medium">
                {new Date(sale.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Hora
              </p>
              <p className="font-medium">
                {new Date(sale.created_at).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Forma de pago
              </p>
              <p className="font-medium capitalize">{sale.form_of_payment}</p>
            </div>
            <div></div>
          </div>
        </div>

        {sale.sale_detail.length > 0 && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">
              Items
            </p>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted">
                    <TableHead>Obra</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">
                      Precio unitario
                    </TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sale.sale_detail.map((item: SaleDetailEntity) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.artwork.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex flex-col items-end gap-2">
              <div className="flex gap-4 text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium w-24 text-right">
                  ${sale.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-muted-foreground">Tax (15%):</span>
                <span className="font-medium w-24 text-right">
                  ${sale.tax.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-4 border-t pt-2 mt-2">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg w-24 text-right">
                  ${sale.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
