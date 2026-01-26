import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/alert-dialog";
import { Button } from "@/shared/components/button";
import { Trash2, TriangleAlert } from "lucide-react";
import { deleteFormOfPaymentAction } from "../../actions/form-of-payment.actions";
import { toast } from "sonner";

interface Props {
  id: number;
}

export const DeleteFormOfPayment = ({ id }: Props) => {
  const handleDelete = async () => {
    try {
      const result = await deleteFormOfPaymentAction(id);
      if (result.success) {
        toast.success("Forma de pago eliminada con éxito");
      } else {
        toast.error(result.error || "Error al eliminar la forma de pago");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <TriangleAlert className="mr-2 h-6 w-6" color="yellow" />
            ¿Estás seguro que deseas eliminar esta forma de pago?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Si esta forma de pago está siendo
            usada en ventas o comprobantes, la eliminación puede fallar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
