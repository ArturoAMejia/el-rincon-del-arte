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
import { Power, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { deactivateClientAction } from "@/modules/admin/client/actions/client.actions";

interface Props {
  id: number;
}
export const DeactivateClient = ({ id }: Props) => {
  const handleDeactivate = async () => {
    try {
      const result = await deactivateClientAction(id);
      if (result.success) toast.success("Cliente desactivado con éxito");
      else toast.error(result.error || "Error al desactivar el cliente");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Power className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <TriangleAlert className="mr-2 h-6 w-6" color="yellow" />
            ¿Estás seguro que deseas desactivar este cliente?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción marcará el cliente como inactivo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeactivate}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
