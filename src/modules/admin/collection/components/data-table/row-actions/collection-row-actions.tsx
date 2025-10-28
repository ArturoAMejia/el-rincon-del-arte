import { CollectionEntity } from "@/modules/admin/collection/interfaces";
import { UpdateCollectionForm, DeactivateCollection } from "@/modules/admin/collection/components/form";

interface Props {
  collection: CollectionEntity;
}

export const CollectionRowActions = ({ collection }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <UpdateCollectionForm collection={collection} />
      <DeactivateCollection id={collection.id} />
    </div>
  );
};
