"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AddGroupModal from "./add-group-modal";
import { getAllAssociatedGroups } from "hexis/lib/graphql-client";
import { useAppDispatch } from "hexis/hooks/useRedux";
import { saveGroups } from "hexis/state/groups/slice";
import GroupsOverview from "./groups-overview";
import isEmpty from "lodash/isEmpty";

const AllGroups = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["getAllAssociatedGroups"],
    queryFn: () => getAllAssociatedGroups(),
  });

  useEffect(() => {
    dispatch(saveGroups(data));
  }, [data, dispatch]);

  return (
    <div className="py-3 w-full h-full">
      {isLoading || isFetching ? (
        "Loading ..."
      ) : isEmpty(data?.groups) ? (
        <>
          <h2 className="tracking-tight font-medium text-[24px]">All Groups</h2>

          <div className="w-full my-[20%] flex items-center justify-center">
            <AddGroupModal className="gap-2 font-normal px-6 py-3 bg-background-300 w-fit text-[20px]" buttonText="Add your first group" />
          </div>
        </>
      ) : (
        <GroupsOverview />
      )}
    </div>
  );
};

export default AllGroups;
