"use client";

import { use, useState } from "react";
import { Edit } from "lucide-react";
import { updateArtworkAction } from "../../actions/artwork.actions";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { useForm } from "react-hook-form";
import { UpdateArtworkDto, updateArtworkDto } from "../../dto/artwork.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/form/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components";
import { Textarea } from "@/shared/components/textarea/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/dialog/dialog";
import { ArtistEntity } from "../../../artist/interfaces";
import { CategoryEntity } from "../../../category/interfaces";
import { CollectionEntity } from "../../../collection/interfaces";
import { SizeEntity } from "../../../size/interfaces";
import { TypeArtEntity } from "../../../type-art/interfaces";
import { toast } from "sonner";
import { ArtworkEntity } from "../../interfaces";

interface UpdateArtworkFormProps {
  artwork?: ArtworkEntity;
  artists: Promise<{
    success: boolean;
    data?: ArtistEntity[];
    error?: string;
  }>;
  categories: Promise<{
    success: boolean;
    data?: CategoryEntity[];
    error?: string;
  }>;
  collections: Promise<{
    success: boolean;
    data?: CollectionEntity[];
    error?: string;
  }>;
  sizes: Promise<{
    success: boolean;
    data?: SizeEntity[];
    error?: string;
  }>;
  typesArt: Promise<{
    success: boolean;
    data?: TypeArtEntity[];
    error?: string;
  }>;
}

export const UpdateArtworkForm = ({
  artwork,
  artists,
  categories,
  collections,
  sizes,
  typesArt,
}: UpdateArtworkFormProps) => {
  console.log(artwork);
  const { data: allArtists } = use(artists);
  const { data: allCategories } = use(categories);
  const { data: allCollections } = use(collections);
  const { data: allSizes } = use(sizes);
  const { data: allTypesArt } = use(typesArt);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UpdateArtworkDto>({
    resolver: zodResolver(updateArtworkDto),
    defaultValues: {
      id: artwork?.id || 0,
      name: artwork?.name || "",
      description: artwork?.description || "",
      dimension: artwork?.dimension || "",
      price: artwork?.price.toString() || "0",
      artist_id: artwork?.artist_id.toString() || "",
      collection_id: artwork?.collection_id.toString() || "",
      category_id: artwork?.category_id.toString() || "",
      type_art_id: artwork?.type_art_id.toString() || "",
      size_id: artwork?.size_id.toString() || "",
    },
  });

  const handleSubmit = async (formData: UpdateArtworkDto) => {
    console.log("test");
    setIsLoading(true);

    try {
      const result = await updateArtworkAction(formData.id, formData);

      if (result.success) {
        toast.success("Obra actualizada con éxito");
        setOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Error al actualizar la obra");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Editar obra</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-3 items-center gap-4 justify-center"
            id="form"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre de la obra"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artista</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un artista para esta obra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allArtists?.map((artist) => (
                        <SelectItem
                          key={artist.id}
                          value={artist.id.toString()}
                        >
                          {artist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una categoría para esta obra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allCategories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collection_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colección</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una colección para esta obra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allCollections?.map((collection) => (
                        <SelectItem
                          key={collection.id}
                          value={collection.id.toString()}
                        >
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="size_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medidas</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una medida para esta obra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allSizes?.map((size) => (
                        <SelectItem key={size.id} value={size.id.toString()}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type_art_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de arte</FormLabel>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un tipo de arte para esta obra" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allTypesArt?.map((typeArt) => (
                        <SelectItem
                          key={typeArt.id}
                          value={typeArt.id.toString()}
                        >
                          {typeArt.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese una descripción para la obra"
                      className="resize-none w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el precio de la obra"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimension"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dimensiones</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese las dimensiones de la obra"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="sm:justify-start">
          <Button type="submit" disabled={isLoading} form="form">
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
