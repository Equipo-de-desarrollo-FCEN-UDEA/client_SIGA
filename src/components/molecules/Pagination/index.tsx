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

        <PaginationItem
          label={`Goto first page ${pageNumbers.firstPage}`}
          active={pageNumbers.firstPage === pageNumbers.activePage}
          onClick={() => updateActivePage(pageNumbers.firstPage)}
        >
          {pageNumbers.firstPage}
        </PaginationItem>

        {pageNumbers.customPreviousPage && (
          <PaginationItem
            label={`Goto page ${pageNumbers.customPreviousPage}`}
            onClick={() => updateActivePage(pageNumbers.customPreviousPage)}
          >
            &middot;&middot;&middot;
          </PaginationItem>
        )}

        {pageNumbers.navigation.map((navigationNumber) => {
          const isFirstOrLastPage =
            navigationNumber === pageNumbers.firstPage ||
            navigationNumber === pageNumbers.lastPage;

          return isFirstOrLastPage ? null : (
            <PaginationItem
              label={`Goto page ${navigationNumber}`}
              key={navigationNumber}
              active={navigationNumber === pageNumbers.activePage}
              onClick={() => updateActivePage(navigationNumber)}
            >
              {navigationNumber}
            </PaginationItem>
          );
        })}

        {pageNumbers.customNextPage && (
          <PaginationItem
            label={`Goto page ${pageNumbers.customNextPage}`}
            onClick={() => updateActivePage(pageNumbers.customNextPage)}
          >
            &middot;&middot;&middot;
          </PaginationItem>
        )}

        {pageNumbers.firstPage !== pageNumbers.lastPage && (
          <PaginationItem
            label={`Goto last page ${pageNumbers.lastPage}`}
            active={pageNumbers.lastPage === pageNumbers.activePage}
            onClick={() => updateActivePage(pageNumbers.lastPage)}
          >
            {pageNumbers.lastPage}
          </PaginationItem>
        )}

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
