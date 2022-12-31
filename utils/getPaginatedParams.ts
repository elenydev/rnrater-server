export const getPaginationValue = ({
  pageSize,
  pageNumber,
}: {
  pageSize: string;
  pageNumber: string;
}) => {
  return {
    skip: +pageNumber > 1 ? (+pageNumber - 1) * +pageSize : 0,
    take: +pageSize,
  };
};
