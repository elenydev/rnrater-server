export interface PaginatedResults<T> {
  results: T[];
  paging: {
    pageNumber: string;
    pageSize: string;
    totalCount: number;
  };
}

export const paginatedResults = <T>(
  results: T[],
  pageNumber: string,
  pageSize: string,
  totalCount: number
): PaginatedResults<T> => ({
  results: results,
  paging: {
    pageNumber,
    pageSize,
    totalCount,
  },
});
