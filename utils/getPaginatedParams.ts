export const getPaginationValue = ({
  pageSize,
  pageNumber,
}: {
  pageSize: string;
  pageNumber: string;
}) => {
  return {
    skip: +pageNumber === 1 ? 0 : +pageNumber,
    take: +pageSize,
  };
};
