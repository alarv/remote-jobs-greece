import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const PAGE_SIZE = 10;

interface PaginationProps {
  total: number;
  totalPages: number;
  currentPage: number;
  onPageChanged?: (currentPage: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const currentPageClassName =
    'z-10 bg-indigo-600 relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
  const defaultPageClassName =
    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';

  function getPaginationText(
    page: number,
    pageSize: number,
    totalResults: number,
  ) {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalResults);

    return (
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{start}</span> to{' '}
        <span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{totalResults}</span> results
      </p>
    );
  }

  function previousClicked() {
    if (!isPreviousPageAllowed()) {
      return;
    }
    pageChanged(props.currentPage - 1);
  }

  function nextClicked() {
    if (!isNextPageAllowed()) {
      return;
    }
    pageChanged(props.currentPage + 1);
  }

  function pageChanged(page: number) {
    props.onPageChanged && props.onPageChanged(page);
  }

  function isNextPageAllowed() {
    return props.currentPage + 1 <= props.totalPages;
  }

  function isPreviousPageAllowed() {
    return props.currentPage - 1 > 0;
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3 ">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          onClick={previousClicked}
          className={`${
            !isPreviousPageAllowed() ? 'cursor-not-allowed' : ''
          } relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
        >
          Previous
        </a>
        <a
          onClick={nextClicked}
          className={`${
            !isNextPageAllowed() ? 'cursor-not-allowed' : ''
          } relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          {getPaginationText(props.currentPage, PAGE_SIZE, props.total)}
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={previousClicked}
              className={`${
                !isPreviousPageAllowed() ? 'cursor-not-allowed' : ''
              } relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {Array.from(
              Array.from(Array(props.totalPages), (e, pageNumber) => {
                return (
                  <a
                    key={pageNumber + 1}
                    aria-current="page"
                    className={
                      props.currentPage === pageNumber + 1
                        ? currentPageClassName
                        : defaultPageClassName
                    }
                    onClick={() => pageChanged(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </a>
                );
              }),
            )}
            <a
              onClick={nextClicked}
              className={`${
                !isNextPageAllowed() ? 'cursor-not-allowed' : ''
              } relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
