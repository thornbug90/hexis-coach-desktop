import React from "react";
import GroupHeader from "./components/header";
import GroupMain from "./components/group-main";

type Props = {
  searchParams: {
    groupName: string;
    id: string;
  };
};

const EachGroup = ({ searchParams }: Props) => {
  return (
    <div className="w-full min-h-screen h-full mt-10 mb-3 lg:mt-0 lg:pt-12 lg:mb-2">
      <GroupHeader searchParams={searchParams} />

      <div className="mt-6 px-8 lg:px-6">
        <p className="font-semibold tracking-tight border-b-2 border-lightgrey1-600 w-fit pb-3">Members</p>
      </div>

      <GroupMain searchParams={searchParams} />
    </div>
  );
};

export default EachGroup;
