import { prisma } from "@/lib/prisma";
import { CurrencyEntity } from "../interfaces";
import { CurrencyMapper } from "../mappers";

export const getCurrencies = async (): Promise<CurrencyEntity[] | []> => {
  try {
    const currencies = await prisma.currency.findMany();

    if (!currencies) return [];
    return currencies.map(CurrencyMapper.toDTO);
  } catch (error) {
    console.error(`Error al obtener las colecciones`, error);
    throw error;
  }
};
