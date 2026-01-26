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
import { OrderEntity, OrderDetailEntity } from "../../interfaces";
import { getStatusColor } from "@/utils";

interface Props {
  order: OrderEntity;
}
export const ShowOrderDetails = ({ order }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <EllipsisVertical />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-max">
        <AlertDialogHeader>
          <AlertDialogTitle>Detalles de la orden #{order.id}</AlertDialogTitle>
          <AlertDialogDescription>
            <Badge variant="secondary" className="mb-4">
              Estado: Completada
            </Badge>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-6">
          {/* Transaction Header */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="text-lg font-semibold">
                {order.client || "Cliente Genérico"}
              </h3>
              <p className="text-muted-foreground text-sm">
                Venta ID: {order.id}
              </p>
            </div>
            <Badge className={getStatusColor(order.state_id)}>
              {order.state_id}
            </Badge>
          </div>

          {/* Amount Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground mb-1 text-sm">Total</p>
              <p className="text-2xl font-bold">${order.subtotal.toFixed(2)}</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground mb-1 text-sm">
                Tipo de venta
              </p>
              <p className="text-lg font-semibold capitalize">
                {order.order_type}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Fecha
              </p>
              <p className="font-medium">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Hora
              </p>
              <p className="font-medium">
                {new Date(order.created_at).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Forma de pago
              </p>
              <p className="font-medium capitalize">{order.form_of_payment}</p>
            </div>
            <div></div>
          </div>
        </div>

        {order.order_detail.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-3 text-sm font-medium">
              Items
            </p>
            <div className="overflow-hidden rounded-lg border">
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
                  {order.order_detail.map((item: OrderDetailEntity) => (
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
                <span className="w-24 text-right font-medium">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-muted-foreground">
                  Impuesto ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%):
                </span>
                <span className="w-24 text-right font-medium">
                  ${order.tax.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 flex gap-4 border-t pt-2">
                <span className="font-semibold">Total:</span>
                <span className="w-24 text-right text-lg font-bold">
                  ${order.total.toFixed(2)}
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
