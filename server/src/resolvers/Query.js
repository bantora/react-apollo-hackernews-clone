/* eslint-disable */
async function feed(_parent, { filter, skip, take, orderBy }, context) {
  const where = filter
    ? {
        OR: [
          { description: { contains: filter } },
          { url: { contains: filter } },
        ],
      }
    : {};
  const links = await context.prisma.link.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  const count = await context.prisma.link.count({ where });

  return { links, count };
}

module.exports = {
  feed,
};
