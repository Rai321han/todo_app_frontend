import { useContext } from "react";
import { todocontext } from "../context/TodoContext";

export default function Pagination({ currentPage, totalPages }) {
  const { handleChangeFilter } = useContext(todocontext);

  if (totalPages <= 1) return null;

  // Determine which page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Maximum page numbers to show (excluding dots)
    const siblingsCount = 1; // Number of pages to show on each side of current page

    // Always show first page
    pages.push(1);

    // Calculate the range around current page
    let leftSibling = Math.max(2, currentPage - siblingsCount);
    let rightSibling = Math.min(totalPages - 1, currentPage + siblingsCount);

    // Adjust range if current page is near start or end
    if (currentPage <= maxVisible - siblingsCount) {
      rightSibling = Math.min(totalPages - 1, maxVisible - 1);
    }
    if (currentPage > totalPages - maxVisible + siblingsCount) {
      leftSibling = Math.max(2, totalPages - maxVisible + 2);
    }

    // Add left dots if needed
    if (leftSibling > 2) {
      pages.push("...");
    }

    // Add pages around current page
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add right dots if needed
    if (rightSibling < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page if more than one page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page === "...") return;
    handleChangeFilter("page", page);
  };

  const handleClickDots = (direction) => {
    if (direction === "left") {
      // Jump left by showing pages on the left side
      const newPage = Math.max(1, currentPage - 5);
      handleChangeFilter("page", newPage);
    } else {
      // Jump right by showing pages on the right side
      const newPage = Math.min(totalPages, currentPage + 5);
      handleChangeFilter("page", newPage);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-4">
      {/* Start button */}
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        title="First page"
      >
        ⏮
      </button>

      {/* Previous button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Previous page"
      >
        ◀
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          // Determine if this is left or right dots
          const isLeftDots = index < pageNumbers.indexOf(currentPage);
          return (
            <button
              key={`dots-${index}`}
              onClick={() => handleClickDots(isLeftDots ? "left" : "right")}
              className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300"
              title={isLeftDots ? "Show earlier pages" : "Show later pages"}
            >
              ...
            </button>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-2 rounded-md ${
              currentPage === page
                ? "bg-amber-200 font-semibold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Next page"
      >
        ▶
      </button>

      {/* End button */}
      <button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Last page"
      >
        ⏭
      </button>
    </div>
  );
}
