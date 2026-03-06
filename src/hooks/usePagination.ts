export const usePagination = (items, page, limit) => {
  const totalPages = Math.ceil(items.length / limit);

  const paginatedItems = items.slice(
    (page - 1) * limit,
    page * limit
  );

  return { paginatedItems, totalPages };
};