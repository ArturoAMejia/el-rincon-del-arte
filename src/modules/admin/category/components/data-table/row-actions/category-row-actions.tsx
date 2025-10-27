"use client";

import { CategoryEntity } from "@/modules/admin/category/interfaces";
import { DeactivateCategory, UpdateCategoryForm } from "../../form";

interface Props {
  category?: CategoryEntity;
}

export const CategoryRowActions = ({ category }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <UpdateCategoryForm category={category!} />
      <DeactivateCategory id={Number(category!.id)} />
    </div>
  );
};
