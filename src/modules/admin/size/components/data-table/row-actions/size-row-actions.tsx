"use client";

import { SizeEntity } from "@/modules/admin/size/interfaces";
import { DeactivateSize, UpdateSizeForm } from "../../form";

interface Props {
  size?: SizeEntity;
}

export const SizeRowActions = ({ size }: Props) => {
  if (!size) {
    return null;
  }
  return (
    <div className="flex items-center gap-2">
      <UpdateSizeForm size={size} />
      <DeactivateSize id={size.id} />
    </div>
  );
};
