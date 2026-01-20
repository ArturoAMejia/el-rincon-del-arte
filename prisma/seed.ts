import { PrismaClient } from "../generated/prisma";
import {
  artwork,
  // artwork_images,
  painter,
  modules,
  sub_modules,
  modules_roles,
  roles,
  sub_modules_roles,
  category,
  colection,
  persons,
  // users,
  sizes,
  states,
} from "./data";
import { type_art } from "./data/artwork/type-art";
import { currency } from "./data/currency";
import { form_of_payment } from "./data/form-payment";

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  await prisma.$connect();
  try {
    await prisma.state.createMany({ data: states });
    await prisma.category.createMany({ data: category });
    await prisma.collection.createMany({ data: colection });
    await prisma.size.createMany({ data: sizes });
    await prisma.person.createMany({ data: persons });
    await prisma.artist.createMany({ data: painter });
    await prisma.type_art.createMany({ data: type_art });
    await prisma.artwork.createMany({ data: artwork });
    // await prisma.artwork_image.createMany({ data: artwork_images })
    // await prisma.module.createMany({ data: modules });
    // await prisma.sub_module.createMany({ data: sub_modules });
    // await prisma.role.createMany({ data: roles });
    // await prisma.module_role.createMany({ data: modules_roles });
    // await prisma.sub_module_role.createMany({ data: sub_modules_roles });
    // await prisma.user.createMany({ data: users })
    await prisma.currency.createMany({ data: currency });
    await prisma.form_of_payment.createMany({ data: form_of_payment });

    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
  }
};

main();
