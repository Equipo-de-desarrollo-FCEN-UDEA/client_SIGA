import PaginationItem from "./PaginationItem";
import "./index.css";

type PaginationProps = {
  pageNumbers: {
    activePage: number;
    firstPage: number;
    lastPage: number;
    previousPage: number | false;
    nextPage: number | false;
    customPreviousPage: number | false;
    customNextPage: number | false;
    navigation: number[];
  };
  updateActivePage: (pageNumber: number | false) => void;
};

const Pagination = ({ pageNumbers, updateActivePage }: PaginationProps) => {
  // Limitar la cantidad de páginas visibles (Ejemplo: 3 páginas anteriores y 3 páginas posteriores)
  const pageLimit = 3;
  const startPage = Math.max(pageNumbers.activePage - pageLimit, pageNumbers.firstPage);
  const endPage = Math.min(pageNumbers.activePage + pageLimit, pageNumbers.lastPage);

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <nav className="mt-4" role="navigation" aria-label="Pagination Navigation">
      <ul className="pagination">
        <PaginationItem
          label={`Goto first page ${pageNumbers.firstPage}`}
          rel="first"
          onClick={() => updateActivePage(pageNumbers.firstPage)}
        >
          &laquo;
        </PaginationItem>

        <PaginationItem
          label={`Goto previous page ${pageNumbers.previousPage}`}
          rel="prev"
          onClick={() => updateActivePage(pageNumbers.previousPage)}
        >
          &lsaquo;
        </PaginationItem>

        {/* Mostrar las páginas visibles */}
        {visiblePages.map((page) => (
          <PaginationItem
            key={page}
            label={`Goto page ${page}`}
            active={page === pageNumbers.activePage}
            onClick={() => updateActivePage(page)}
          >
            {page}
          </PaginationItem>
        ))}

        <PaginationItem
          label={`Goto next page ${pageNumbers.nextPage}`}
          rel="next"
          onClick={() => updateActivePage(pageNumbers.nextPage)}
        >
          &rsaquo;
        </PaginationItem>

        <PaginationItem
          label={`Goto last page ${pageNumbers.lastPage}`}
          rel="last"
          onClick={() => updateActivePage(pageNumbers.lastPage)}
        >
          &raquo;
        </PaginationItem>
      </ul>
    </nav>
  );
};

export default Pagination;
