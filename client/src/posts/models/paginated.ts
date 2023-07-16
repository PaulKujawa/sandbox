/*
 * Interface for query-based pagination. Page-based
 * could have has_next, has_previous, offset, total.
 */
export interface Paginated<TData> {
  cursor: string;
  cursorNext?: string;
  items: TData[];
  limit: number;
}

// for a project of that size surely over-engineered
export const mapPaginatedDto = <TDto, TData>(mapFn: (dto: TDto) => TData) => {
  return (paginated: Paginated<TDto>) => ({
    ...paginated,
    items: paginated.items.map(mapFn),
  });
};
