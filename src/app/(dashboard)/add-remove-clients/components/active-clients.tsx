"use client";

import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import RemoveClient from "./remove-client";
import { useAppSelector } from "hexis/hooks/useRedux";
import { GetAllActiveClientsQuery } from "hexis/generated/graphql";
import sortBy from "lodash/sortBy";
import isEmpty from "lodash/isEmpty";

const ActiveClients = () => {
  const { activeClients } = useAppSelector(({ clients: { activeClients } }) => ({
    activeClients,
  }));

  const [selectedActiveClients, setSelectedActiveClients] = useState<GetAllActiveClientsQuery["getMyChildren"]>();

  useMemo(() => {
    const allActiveClients = activeClients?.getMyChildren;
    if (!isEmpty(allActiveClients)) {
      setSelectedActiveClients(sortBy(allActiveClients, ["to"]));
    }
  }, [activeClients?.getMyChildren]);

  function Items({ currentItems }: { currentItems?: GetAllActiveClientsQuery["getMyChildren"] }) {
    return (
      <div className="mt-6 w-full h-full bg-background-500">
        {(currentItems?.length || 0) > 0 ? (
          currentItems?.map(data => (
            <div key={data?.id} className="bg-background-600 h-16 border-b-[0.2px] border-b-lightgrey1-600 border-opacity-20">
              <div className="px-4 grid grid-cols-6 gap-[27px] text-sm leading-[64px]" style={{ lineHeight: "64px" }}>
                <p className="col-span-1 px-[10px] font-semibold">{data?.firstName}</p>
                <p className="col-span-1 px-[10px] font-semibold">{data?.lastName}</p>
                <p className="col-span-2 px-[10px] pl-10 font-medium">{data?.email}</p>
                <p className="col-span-1 px-[10px] font-medium">{data?.invitedDate?.slice(0, 10)}</p>
                <div className="col-span-1 flex justify-end items-center">
                  <RemoveClient currentData={data!} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-screen">
            <div className="bg-background-600 h-16 border-b-[0.2px] border-b-lightgrey1-600 border-opacity-20">
              <div className="px-4 grid grid-cols-5 gap-[27px] text-sm leading-[64px]">
                <p className="col-span-1 px-[10px]">-</p>
                <p className="col-span-1 px-[10px]">-</p>
                <p className="col-span-2 px-[10px] pl-10">-</p>
                <div className="col-span-1 flex justify-end items-center text-[11px] pr-[10px]">
                  <div className="flex flex-col items-center justify-between">
                    <p className="w-[5px] opacity-60 border-b-[1.3px] mb-1"></p>
                    <p className="w-[7px] opacity-60 border-b-[0.5px]"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function PaginatedItems({ itemsPerPage }: { itemsPerPage: number }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = selectedActiveClients?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil((selectedActiveClients?.length || 0) / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % (selectedActiveClients?.length || 0);
      setItemOffset(newOffset);
    };

    return (
      <div className="w-[1,072px]">
        <Items currentItems={currentItems} />

        <ReactPaginate
          breakLabel=""
          previousLabel="<"
          previousClassName="mr-3"
          nextLabel=">"
          nextClassName="ml-3"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={0}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          pageClassName="py-[1px] mx-3"
          activeClassName="bg-activeblue-100 px-[9px] rounded-[3px]"
          className="my-7 flex flex-row justify-center pb-10"
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen max-h-full bg-background-500">
      {/* titles */}
      <div className="px-4 w-[1,072px]">
        <div className={`grid ${(activeClients?.getMyChildren?.length || 0) > 0 ? "grid-cols-6" : "grid-cols-5"} gap-[27px]`}>
          <p className="underline text-[11px] px-[10px] font-medium opacity-70 col-span-1">First Name</p>
          <p className="underline text-[11px] px-[10px] font-medium opacity-70 col-span-1">Last Name</p>
          <p className="underline text-[11px] px-[10px] pl-9 font-medium opacity-70 col-span-2">Email</p>
          {(activeClients?.getMyChildren?.length || 0) > 0 && (
            <p className="underline text-[11px] px-[10px] font-medium opacity-70 col-span-1">Date Invited</p>
          )}
          <p className="col-span-1 flex justify-end"></p>
        </div>
      </div>

      {/* results - fields */}
      <PaginatedItems itemsPerPage={25} />
    </div>
  );
};

export default ActiveClients;
