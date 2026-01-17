"use client";

import { ArtistEntity } from "@/modules/admin/artist/interfaces";
import {
  DeactivateArtist,
  ReactivateArtist,
  UpdateArtistForm,
} from "../../form";

interface Props {
  artist?: ArtistEntity;
}

export const ArtistRowActions = ({ artist }: Props) => {
  if (!artist) return null;
  return (
    <div className="flex items-center gap-2">
      <UpdateArtistForm artist={artist} />
      {artist.state_id === 1 && <DeactivateArtist id={artist.id} />}
      {artist.state_id === 2 && <ReactivateArtist id={artist.id} />}
    </div>
  );
};
