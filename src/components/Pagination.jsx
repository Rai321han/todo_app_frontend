import { useContext, useMemo } from "react";
import { TodoContext } from "../context/TodoContext";

export default function Pagination({ currentPage, totalPages }) {
  const { handleChangeFilter } = useContext(TodoContext);

  if (totalPages <= 1) return null;

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    const siblingsCount = 1;

    pages.push(1);

    let leftSibling = Math.max(2, currentPage - siblingsCount);
    let rightSibling = Math.min(totalPages - 1, currentPage + siblingsCount);

    if (currentPage <= maxVisible - siblingsCount) {
      rightSibling = Math.min(totalPages - 1, maxVisible - 1);
    }

    if (currentPage > totalPages - maxVisible + siblingsCount) {
      leftSibling = Math.max(2, totalPages - maxVisible + 2);
    }

    if (leftSibling > 2) {
      pages.push("...");
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (rightSibling < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageClick = (page) => {
    if (page === "...") return;
    if (page < 1 || page > totalPages || page === currentPage) return;
    handleChangeFilter("page", page);
  };

  const handleClickDots = (direction) => {
    if (direction === "left") {
      const newPage = Math.max(1, currentPage - 5);
      handleChangeFilter("page", newPage);
    } else {
      const newPage = Math.min(totalPages, currentPage + 5);
      handleChangeFilter("page", newPage);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-4">
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        title="First page"
      >
        ⏮
      </button>

      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Previous page"
      >
        ◀
      </button>

      {pageNumbers.map((page, index) => {
        if (page === "...") {
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

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Next page"
      >
        ▶
      </button>

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
