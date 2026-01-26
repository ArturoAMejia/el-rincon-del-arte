import Link from "next/link";
import { Share2 } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Separator,
} from "@/shared/components";
import { ArtworkEntity } from "@/modules/admin";
import { AddCartButton } from "./add-cart-button";

type Props = {
  idx: number;
  artwork: ArtworkEntity;
};

export const ArtworkCard = ({ idx, artwork }: Props) => {
  return (
    <Card
      className={`group cursor-pointer overflow-hidden border border-[#e0dada] py-0 transition hover:shadow-lg dark:border-[#5a5a5a] ${
        idx === 0 ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      <Link
        href={`/obras/${artwork.id}`}
        className={`${
          idx === 0 ? "h-48 md:h-64" : "h-40"
        } flex items-center justify-center bg-[#e8e1d9] font-serif text-sm text-[#5a5a5a] dark:bg-[#3a3a3a] dark:text-[#d4cec5]`}
      >
        Image
      </Link>
      <CardContent className="p-4">
        <CardTitle className="mb-1 font-serif text-sm font-bold">
          {artwork.name}
        </CardTitle>
        <p className="mb-2 text-xs text-[#c17855]">{artwork.artist}</p>
        <p className="mb-4 text-xs">{artwork.category}</p>
        <Separator />
        <div className="flex items-center justify-between pt-3">
          <span className="text-sm font-bold">
            C${artwork.price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <AddCartButton artwork={artwork} />
            <Button className="opacity-50 transition hover:opacity-100">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
