const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 rounded-md border border-input bg-background text-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent transition-colors"
      >
        Previous
      </button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages || 1}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 rounded-md border border-input bg-background text-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
