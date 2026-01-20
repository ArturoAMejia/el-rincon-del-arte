"use client";

import { Button } from "@/shared/components/button";
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
import { deactivateUserAction } from "@/modules/admin/user/actions/user.actions";
import { toast } from "sonner";
import { Power, TriangleAlert } from "lucide-react";

export const DeactivateUser = ({ id }: { id: string }) => {
  const handleDeactivate = async () => {
    try {
      const res = await deactivateUserAction(id);
      if (res.success) toast.success("Usuario desactivado");
    } catch (error) {
      toast.error("Ocurrió un error inesperadoal desactivar el usuario");
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
            ¿Estás seguro que deseas desactivar este usuario?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción marcará el usuario como inactivo.
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
