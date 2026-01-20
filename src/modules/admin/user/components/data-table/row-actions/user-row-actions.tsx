"use client";

import { UserEntity } from "@/modules/admin/user/interfaces";
import { UpdateUserForm } from "@/modules/admin/user/components/form";
import {
  DeactivateUser,
  ReactivateUser,
} from "@/modules/admin/user/components/form";

export const UserRowActions = ({ row }: { row: UserEntity }) => {
  return (
    <div className="flex gap-2">
      <UpdateUserForm user={row} />
      {row.stateId === 1 ? (
        <DeactivateUser id={row.id} />
      ) : (
        <ReactivateUser id={row.id} />
      )}
    </div>
  );
};
