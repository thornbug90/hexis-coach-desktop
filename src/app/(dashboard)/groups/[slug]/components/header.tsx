"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "hexis/hooks/useRedux";
import Link from "next/link";
import GroupPlaceholderIcon from "hexis/components/icons/general/AddClientsIcon copy";
import AddGroupModal from "../../components/add-group-modal";
import { getImageURL } from "../../components/groups-overview";
import ReadMoreParagraph from "hexis/components/common/read-more-paragraph";

type Props = {
  searchParams: {
    groupName: string;
    id: string;
  };
};

const GroupHeader = ({ searchParams }: Props) => {
  const groupSelected = useAppSelector(state => state?.groups?.selectedGroup);
  const user = useAppSelector(state => state?.user.user);

  const [S3Image, setS3Image] = useState("");

  useEffect(() => {
    getImageURL({ imageKey: groupSelected?.link || "", setS3Image });
  }, []);

  return (
    <div className="w-full md:flex lg items-center justify-between gap-6 px-8 lg:px-6">
      <div className="w-auto">
        {S3Image ? (
          <div
            className="h-[152px] w-[152px] rounded-xl"
            style={{
              background: `url('${S3Image}')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover", //cover
            }}
          ></div>
        ) : (
          <div className="bg-activeblue-100 h-[152px] w-[152px] rounded-xl rounded-t-lg flex justify-center items-center overflow-hidden">
            <GroupPlaceholderIcon />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow gap-3 md:gap-6 lg:gap-6">
        <div className="flex justify-between items-center gap-2">
          <div>
            <p className="flex gap-2 text-gray-400 whitespace-nowrap">
              <Link href={"/groups"} className="font-light">
                All Groups
              </Link>
              <span>/</span>
              <span className="font-semibold">{groupSelected?.name || searchParams?.groupName}</span>
            </p>

            <div className="flex gap-4 items-center">
              <h2 className="font-semibold text-xl sm:text-2xl tracking-wider">{groupSelected?.name || searchParams?.groupName}</h2>
              <AddGroupModal editMode={true} />
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center text-xl w-10 h-10 rounded-full bg-carbcodehigh-100">
            <p className="text-center">
              {user?.firstName && user?.firstName[0].toUpperCase()}
              {user?.lastName && user?.lastName[0].toUpperCase()}
            </p>
          </div>
        </div>
        <div className="tracking-tight text-gray-400 max-w-[565px]">
          <ReadMoreParagraph
            text={groupSelected?.description || ""}
            readMoreLessClassNames={
              "text-activeblue-100 underline decoration-activeblue-100 cursor-pointer hover:text-activeblue-300 hover:decoration-activeblue-300	ease-in"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
