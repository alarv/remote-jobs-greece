import { FormEvent, useRef } from 'react';

interface SearchProps {
  onSearchSubmitted: (searchValue: string) => void;
}

export default function Search(props: SearchProps) {
  const searchInput = useRef<HTMLInputElement | null>(null);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (searchInput.current?.value) {
      props.onSearchSubmitted(searchInput.current?.value);
    }
  };

  return (
    <>
      <form className="w-36 sm:w-2/4" onSubmit={submitForm}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            ref={searchInput}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 border-b-4 border-indigo-700 hover:border-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
