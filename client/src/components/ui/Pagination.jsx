import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const leftSibling = Math.max(1, currentPage - siblingCount);
    const rightSibling = Math.min(totalPages, currentPage + siblingCount);

    if (leftSibling > 1) {
      pages.push(1);
      if (leftSibling > 2) pages.push('...');
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }

    if (rightSibling < totalPages) {
      if (rightSibling < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-4 w-4 text-gray-600" />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`
            h-9 min-w-[36px] rounded-xl text-sm font-semibold transition-colors
            ${page === currentPage
              ? 'bg-primary-600 text-white shadow-md'
              : page === '...'
                ? 'cursor-default text-gray-400'
                : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
            }
          `}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );
};

export default Pagination;