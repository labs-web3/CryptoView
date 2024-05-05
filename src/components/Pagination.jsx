import { Button } from "./ui/button";

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className="flex items-center gap-4">
      {currentPage > 1 && (
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="flex items-center gap-2 rounded-full"
        >
          Previous
        </Button>
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          disabled={currentPage === index + 1}
          className="rounded-full"
        >
          {index + 1}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex items-center gap-2 rounded-full"
        >
          Next
        </Button>
      )}
    </div>
  );
}
