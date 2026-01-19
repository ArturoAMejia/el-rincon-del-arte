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
import { reactivateUserAction } from "@/modules/admin/user/actions/user.actions";
import { toast } from "sonner";
import { RotateCcw, TriangleAlert } from "lucide-react";

export const ReactivateUser = ({ id }: { id: string }) => {
  const handleReactivate = async () => {
    try {
      const res = await reactivateUserAction(id);
      if (res.success) toast.success("Usuario reactivado");
      else toast.error(res.error || "Error al reactivar el usuario");
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
            ¿Estás seguro que deseas reactivar este usuario?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción marcará el usuario como activo.
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
