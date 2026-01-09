export const saleInclude = {
  order: {
    include: {
      client: {
        select: {
          id: true,
          person: { select: { name: true, last_name_business_name: true } },
        },
      },
      currency: { select: { id: true, name: true } },
      form_of_payment: { select: { id: true, name: true } },
      order_detail: {
        include: {
          artwork: {
            include: {
              artist: {
                select: {
                  id: true,
                  person: {
                    select: { name: true, last_name_business_name: true },
                  },
                },
              },
              collection: true,
              category: true,
              type_art: true,
              size: true,
            },
          },
        },
      },
    },
  },
  voucher: {
    select: { id: true, numeration: true, serie: true },
  },
} as const;
