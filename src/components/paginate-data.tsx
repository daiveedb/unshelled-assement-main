const PaginateData = ({
  pagination,
  onPageChange,
}: {
  pagination: {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    lastPage: number;
  };
  onPageChange: (page: number) => void;
}) => {
  const { currentPage, hasNext, hasPrevious, lastPage } = pagination;

  return (
    <div className="flex items-center justify-between my-4 text-black px-10">
      <button
        className={`px-4 py-2 border rounded-md ${
          hasPrevious
            ? "text-[#032282] border-[#032282]"
            : "text-gray-500 border-gray-300"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
      >
        Previous
      </button>

      <span className="px-4 py-2">
        Page {currentPage} of {lastPage}
      </span>

      <button
        className={`px-4 py-2 border rounded-md ${
          hasNext
            ? "text-[#032282] border-[#032282]"
            : "text-gray-500 border-gray-300"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};

export default PaginateData;
