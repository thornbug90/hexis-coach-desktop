"use client";

import { useState, useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import ResendOrCancelInvite from "./resend-cancel-invite";
import { Invitation_Status } from "hexis/constants/clients";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";
import { GetAllInvitationsQuery } from "hexis/generated/graphql";

import { saveInvitesPending } from "hexis/state/clients/slice";
import { getAllInvitations } from "hexis/lib/graphql-client";
import sortBy from "lodash/sortBy";
import isEmpty from "lodash/isEmpty";

const InvitationsPending = () => {
  const { invitesPending } = useAppSelector(({ clients: { invitesPending } }) => ({
    invitesPending,
  }));

  const dispatch = useAppDispatch();

  const [selectedPendingInvites, setSelectedPendingInvites] = useState<GetAllInvitationsQuery["listInvitations"] | undefined>();

  useMemo(() => {
    const pendingInvites = invitesPending?.listInvitations?.filter(
      item => item?.status !== Invitation_Status.Canceled?.toUpperCase() && item?.status !== Invitation_Status.Used?.toUpperCase(),
    );
    if (!isEmpty(pendingInvites)) {
      setSelectedPendingInvites(sortBy(pendingInvites, ["to"]));
    }
  }, [invitesPending?.listInvitations]);

  const getAllActiveClients = async () => {
    const response = await getAllInvitations();
    const result = response.listInvitations.filter(invitation => invitation?.status === "PENDING" || invitation?.status === "EXPIRED");
    dispatch(saveInvitesPending({ listInvitations: result }));
  };

  useEffect(() => {
    getAllActiveClients();
  }, []);

  function Items({ currentItems }: { currentItems: GetAllInvitationsQuery["listInvitations"] | undefined }) {
    return (
      <div className="mt-6 w-full">
        {(currentItems?.length || 0) > 0 ? (
          currentItems?.map(data => (
            <div key={data?.id} className="bg-background-600 h-16 border-b-[0.2px] border-b-lightgrey1-600 border-opacity-20">
              <div className="px-4 grid grid-cols-8 gap-[27px] text-sm leading-[64px]">
                <p className="col-span-3 px-[10px] font-medium">{data?.to}</p>
                <p className="col-span-2 px-[10px] font-medium">
                  {data?.created?.toString()?.slice(0, 10)?.split("-")?.reverse()?.join("/")}
                </p>
                <p className="col-span-2 px-[10px] font-normal italic">
                  {(data?.status === Invitation_Status.Pending?.toUpperCase() && Invitation_Status.WAITING_FOR_RESPONSE) ||
                    (data?.status === Invitation_Status.Expired?.toUpperCase() && Invitation_Status.Expired)}
                </p>
                <div className="col-span-1 px-[10px] relative">
                  <ResendOrCancelInvite currentData={data} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-screen">
            <div className="bg-background-600 h-16 border-b-[0.2px] border-b-lightgrey1-600 border-opacity-20">
              <div className="px-4 grid grid-cols-8 gap-[27px] text-sm leading-[64px]">
                <p className="col-span-3 px-[10px] font-normal">-</p>
                <p className="col-span-2 px-[10px] font-normal">-</p>
                <p className="col-span-2 px-[10px] font-normal">-</p>
                <p className="col-span-1 px-[10px] flex justify-end font-bold tracking-widest">...</p>
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
    const currentItems = selectedPendingInvites?.slice(itemOffset, endOffset);

    const pageCount = Math.ceil((selectedPendingInvites?.length || 0) / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % (selectedPendingInvites?.length || 0);
      setItemOffset(newOffset);
    };

    return (
      <div className="w-[1,072px]">
        <Items currentItems={currentItems} />

        <ReactPaginate
          breakLabel=""
          previousLabel="<"
          previousClassName="mr-3 font-medium"
          nextLabel=">"
          nextClassName="ml-3 font-medium"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={0}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          pageClassName="py-[1px] mx-[10px]"
          activeClassName="bg-activeblue-100 px-[9px] rounded-[3px]"
          className="my-7 flex flex-row justify-center pb-10 text-sm font-medium"
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen max-h-full bg-background-500">
      {/* titles */}
      <div className="px-4 w-[1,072px]">
        <div className="grid grid-cols-8 gap-[27px]">
          <p className="underline text-[11px] font-medium opacity-70 col-span-3 px-[10px]">Email</p>
          <p className="underline text-[11px] font-medium opacity-70 col-span-2 px-[10px]">Invite Sent On</p>
          <p className="underline text-[11px] font-medium opacity-70 col-span-2 px-[10px]">Status</p>
          <p className="underline text-[11px] font-medium opacity-70 col-span-1 flex justify-end px-[10px]">Options</p>
        </div>
      </div>

      {/* results - fields */}
      <PaginatedItems itemsPerPage={25} />
    </div>
  );
};

export default InvitationsPending;
