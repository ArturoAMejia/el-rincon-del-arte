import { prisma } from "@/lib/prisma";
import {
  createSizeDto,
  CreateSizeDto,
} from "@/modules/admin/size/dto/size.dto";
import { SizeEntity } from "@/modules/admin/size/interfaces";
import { SizeMapper } from "@/modules/admin/size/mappers";

export const createSizeService = async (
  size: CreateSizeDto
): Promise<SizeEntity> => {
  if (!size.name) {
    throw new Error("El nombre es obligatorio");
  }

  try {
    const newSize = createSizeDto.parse(size);

    const created = await prisma.size.create({
      data: {
        name: newSize.name,
        state_id: 1,
      },
    });

    return SizeMapper.toDTO(created);
  } catch (error) {
    console.error("Error creating size", error);
    throw new Error(String(error));
  }
};
