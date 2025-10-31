import { prisma } from "@/lib/prisma";
import {
  updateSizeDto,
  UpdateSizeDto,
} from "@/modules/admin/size/dto/size.dto";
import { SizeEntity } from "@/modules/admin/size/interfaces";
import { SizeMapper } from "@/modules/admin/size/mappers";

export const updateSizeService = async (
  id: number,
  size: UpdateSizeDto
): Promise<SizeEntity> => {
  try {
    const parsed = updateSizeDto.parse(size);

    const updated = await prisma.size.update({
      where: { id },
      data: {
        name: parsed.name,
      },
    });

    return SizeMapper.toDTO(updated);
  } catch (error) {
    console.error("Error updating size:", error);
    throw new Error(String(error));
  }
};
