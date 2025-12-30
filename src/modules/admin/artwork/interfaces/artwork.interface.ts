export interface ArtworkEntity {
  id: number;
  name: string;
  description: string;
  dimension: string;
  price: number;
  artist: string | null;
  artist_id: number;
  collection_id: number;
  collection: string | null;
  category_id: number;
  category: string | null;
  type_art_id: number;
  type_art: string | null;
  size_id: number;
  size: string | null;
  quantity?: number;
}
