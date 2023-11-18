'use client';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import { input } from '@material-tailwind/react';
import { useSearchParams } from 'next/navigation';

export interface IFilters {
  company_name?: string;
  employment_type?: string;
  job_field?: string;
}

interface FiltersProps {
  onFiltersChange: (filters: IFilters) => void;
}

const sortOptions = [
  { name: 'Date Posted', href: '#', current: true },
  { name: 'Job Title', href: '#', current: false },
  { name: 'Company Name', href: '#', current: false },
  { name: 'Salary Range: Low to High', href: '#', current: false },
  { name: 'Salary Range: High to Low', href: '#', current: false },
];

type FilterContentOption = { checked: boolean; label: string; value: string };
type FilterContent = {
  name: string;
  options: FilterContentOption[];
  id: string;
};

const DEFAULT_FILTERS_CONTENT: FilterContent[] = [
  {
    id: 'job_field',
    name: 'Job Field',
    options: [
      {
        value: 'software',
        label: 'Software Development and IT',
        checked: false,
      },
      { value: 'marketing', label: 'Digital Marketing', checked: false },
      { value: 'design', label: 'Design and Creative', checked: false },
      {
        value: 'content',
        label: 'Writing and Content Creation',
        checked: false,
      },
      { value: 'customer_support', label: 'Customer Support', checked: false },
      {
        value: 'project_management',
        label: 'Project Management',
        checked: false,
      },
      {
        value: 'sales',
        label: 'Sales and Business Development',
        checked: false,
      },
      { value: 'hr', label: 'Human Resources', checked: false },
      {
        value: 'education',
        label: 'Education and Online Teaching',
        checked: false,
      },
      { value: 'financial', label: 'Financial and Accounting', checked: false },
      { value: 'healthcare', label: 'Healthcare', checked: false },
      { value: 'legal', label: 'Legal', checked: false },
      { value: 'research', label: 'Research and Analysis', checked: false },
      {
        value: 'translation',
        label: 'Translation and Localization',
        checked: false,
      },
      {
        value: 'virtual_assistance',
        label: 'Virtual Assistance',
        checked: false,
      },
      { value: 'consulting', label: 'Consulting and Coaching', checked: false },
      { value: 'engineering', label: 'Engineering', checked: false },
      { value: 'science', label: 'Science and Laboratory', checked: false },
      { value: 'architecture', label: 'Architecture', checked: false },
      { value: 'data_entry', label: 'Data Entry', checked: false },
    ],
  },
  {
    id: 'employment_type',
    name: 'Employment Type',
    options: [
      { value: 'full-time', label: 'Full-time', checked: false },
      { value: 'part-time', label: 'Part-time', checked: false },
      { value: 'contract', label: 'Contract', checked: false },
      { value: 'internship', label: 'Internship', checked: false },
      { value: 'temporary', label: 'Temporary', checked: false },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function Filters(props: FiltersProps) {
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<IFilters>({});
  const [filtersContent, setFiltersContent] = useState(DEFAULT_FILTERS_CONTENT);

  useEffect(() => {
    setFiltersContent((currentFiltersContent) =>
      currentFiltersContent.map((filterContent) => {
        const newOptions = filterContent.options.map((option) => {
          const shouldBeChecked =
            searchParams.get(filterContent.id) === option.value;
          return {
            ...option,
            checked: shouldBeChecked,
          };
        });

        return { ...filterContent, options: newOptions };
      }),
    );
  }, [searchParams]);

  function onFiltersChange(filters: IFilters) {
    props.onFiltersChange(filters);
  }
  //clear filter
  function clearFilters(key: keyof IFilters) {
    const updatedFilters: IFilters = { ...filters };
    delete updatedFilters[key];

    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  }

  // software, sales, engineering
  function handleChange(
    key: keyof IFilters,
    value: string,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const updatedFilters: IFilters = { ...filters };
    if (event.target.checked) {
      updatedFilters[key] = value;
    } else {
      delete updatedFilters[key];
    }

    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filtersContent.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-3"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-3">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="radio"
                                      checked={option.checked}
                                      onChange={(event) =>
                                        handleChange(
                                          section.id as keyof IFilters,
                                          option.value,
                                          event,
                                        )
                                      }
                                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-5xl">
          <div className="flex items-baseline justify-between md:border-b border-gray-200 pb-6 pt-9">
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>

              {/*<button*/}
              {/*  type="button"*/}
              {/*  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"*/}
              {/*>*/}
              {/*  <span className="sr-only">View grid</span>*/}
              {/*  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />*/}
              {/*</button>*/}
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section
            aria-labelledby="products-heading"
            className="md:pb-24 md:pt-3"
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid-cols-1">
              {/* Filters */}
              <form className="hidden md:block">
                {filtersContent.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-3"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Transition
                          show={open}
                          enter="transition duration-500 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="pt-3">
                            <div className="space-y-4">
                              <div>
                                <span
                                  className="font-medium text-indigo-700 text-sm cursor-pointer hover:underline"
                                  onClick={() =>
                                    clearFilters(section.id as keyof IFilters)
                                  }
                                >
                                  Clear
                                </span>
                              </div>

                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="radio"
                                    checked={option.checked}
                                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 focus:ring-2"
                                    onChange={(event) =>
                                      handleChange(
                                        section.id as keyof IFilters,
                                        option.value,
                                        event,
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
