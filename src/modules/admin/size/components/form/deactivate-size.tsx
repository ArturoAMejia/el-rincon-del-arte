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
import { toast } from "sonner";
import { deactivateSizeAction } from "../../actions";

interface Props {
  id: number;
}
export const DeactivateSize = ({ id }: Props) => {
  const handleDeactivate = async () => {
    try {
      const result = await deactivateSizeAction(id);
      if (result.success) {
        toast.success("Medida desactivada con éxito");
      } else {
        toast.error(result.error || "Error al desactivar la medida");
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
            ¿Estás seguro que deseas desactivar esta medida?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto marcará tu medida como
            inactiva, por lo que ya no será visible ni accesible para los
            usuarios, pero no se eliminarán tus datos de nuestros servidores.
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
