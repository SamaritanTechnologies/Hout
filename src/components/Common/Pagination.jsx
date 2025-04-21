import React from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ pageCount, onPageChange, forcePage }) => {
  return (
    <ReactPaginate
      breakLabel={<span className="mr-4">...</span>}
      nextLabel={
        <span className="w-10 h-10 flex items-center justify-center bg-gray rounded-md">
          <ChevronRightIcon className="h-5 w-5 text-black" />
        </span>
      }
      onPageChange={onPageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel={
        <span className="w-10 h-10 flex items-center justify-center bg-gray rounded-md">
          <ChevronLeftIcon className="h-5 w-5 text-black" />
        </span>
      }
      renderOnZeroPageCount={null}
      containerClassName="flex items-center justify-center gap-3"
      pageClassName="block hover:bg-[#FBC700] hover:text-white w-10 h-10 flex items-center justify-center rounded-md"
      activeClassName="bg-[#FBC700] text-white"
      forcePage={forcePage}
    />
  );
};

export default Pagination;
