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
import { RotateCcw, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { reactivateClientAction } from "@/modules/admin/client/actions/client.actions";

interface Props {
  id: number;
}

export const ReactivateClient = ({ id }: Props) => {
  const handleReactivate = async () => {
    try {
      const result = await reactivateClientAction(id);
      if (result.success) toast.success("Cliente reactivado con éxito");
      else toast.error(result.error || "Error al reactivar el cliente");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <TriangleAlert className="mr-2 h-6 w-6" color="yellow" />
            ¿Estás seguro que deseas reactivar este cliente?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción marcará el cliente como activo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleReactivate}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
