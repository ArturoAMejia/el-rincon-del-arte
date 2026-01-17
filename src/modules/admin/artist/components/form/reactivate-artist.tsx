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
import { reactivateArtistAction } from "@/modules/admin/artist/actions/artist.actions";

interface Props {
  id: number;
}

export const ReactivateArtist = ({ id }: Props) => {
  const handleReactivate = async () => {
    try {
      const result = await reactivateArtistAction(id);
      if (result.success) toast.success("Artista reactivado con éxito");
      else toast.error(result.error || "Error al reactivar el artista");
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
            ¿Estás seguro que deseas reactivar este artista?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción marcará el artista como activo.
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
