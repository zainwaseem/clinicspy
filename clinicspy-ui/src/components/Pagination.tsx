import { ChevronLeft, ChevronRight } from "lucide-react";

type StyledPaginationProps = {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  perPage?: number;
  onNext?: () => void;
  onPrevious?: () => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  onNext,
  onPrevious,
}: StyledPaginationProps) => {
  return (
    <div className="flex items-center gap-5">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`flex-center size-10 rounded-md border border-primary bg-primary ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-primary-dark"
        }`}
      >
        <ChevronLeft />
      </button>
      <p>
        Page
        <span className="mx-2 text-lg font-bold text-primary">
          {currentPage}
        </span>{" "}
        of
        <span className="mx-2 text-lg font-bold text-primary">
          {totalPages}
        </span>
      </p>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`flex-center size-10 rounded-md border border-primary bg-primary ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-primary-dark"
        }`}
      >
        <ChevronRight />
      </button>
      {totalItems !== undefined && (
        <p className="text-lg">
          Total :&nbsp; <span className="text-primary">{totalItems}</span>
        </p>
      )}
    </div>
  );
};

export default Pagination;
