"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";
import UsersIcon from "hexis/components/icons/general/UsersIcon";
import { useRouter } from "next/navigation";
import GroupPlaceholderIcon from "hexis/components/icons/general/AddClientsIcon copy";
import AWS from "aws-sdk";
import { IState } from "hexis/state/state";
import { saveSelectedGroup } from "hexis/state/groups/slice";
import { Group } from "hexis/generated/graphql";

AWS.config.update({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

interface S3Images {
  isLoading: boolean;
  s3Url: string;
}

const gS3Images: S3Images[] = [];
export const getImageURL = async ({ imageKey, setS3Image, index }: { imageKey: string; setS3Image: Function; index?: number }) => {
  const S3_BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME;
  const s3 = new AWS.S3({
    params: {
      Bucket: S3_BUCKET,
    },
  });
  await s3.getSignedUrl(
    "getObject",
    {
      Bucket: S3_BUCKET,
      Key: imageKey,
      Expires: 60 * 24, // time in seconds: e.g. 60 * 5 = 5 mins
    },
    (err, url) => {
      if (err) throw err;

      let theImage = {
        isLoading: false,
        s3Url: url as string,
      };
      if (index) {
        gS3Images[index] = theImage;
        setS3Image(gS3Images);
      } else {
        setS3Image(url as string);
      }
    },
  );
};

const GroupsOverview = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [s3Images, setS3Images] = useState<S3Images[]>([]);

  const allAssociatedGroups = useAppSelector((state: IState) => state.groups.allAssociatedGroups);
  useEffect(() => {
    if (allAssociatedGroups && allAssociatedGroups.groups) {
      setS3Images(allAssociatedGroups.groups.map(() => ({ isLoading: true, s3Url: "" })));
      allAssociatedGroups.groups.map((group, index) => {
        if (group?.group?.link) getImageURL({ imageKey: group?.group?.link, setS3Image: setS3Images, index });
      });
    }

    s3Images;
  }, [allAssociatedGroups?.groups]);

  const handleGroupClick = (groupName: string, id: string) => {
    const params = new URLSearchParams({
      groupName,
      id,
    }).toString();
    const selectedGroup = allAssociatedGroups?.groups?.find(group => group?.group?.id === id);
    dispatch(saveSelectedGroup(selectedGroup?.group as Group));

    router.push(`/groups/${groupName}?${params}`);
  };

  return (
    <div className="w-full max-w-fit grid md:grid-cols-3 xl:grid-cols-4 gap-6">
      {allAssociatedGroups?.groups?.map((group, index) => {
        return (
          <div
            key={group?.group?.id}
            onClick={() => handleGroupClick(group?.group?.name || "", group?.group?.id || "")}
            className="bg-background-300 text-lightgrey1-700 rounded-lg min-w-[270px] max-w-[400px]"
            style={{ cursor: "pointer" }}
          >
            {s3Images?.[index]?.s3Url ? (
              <div
                className="h-[120px] w-full rounded-t-lg"
                style={{
                  background: `url('${s3Images?.[index]?.s3Url}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover", //contain
                }}
              ></div>
            ) : (
              <div className="bg-activeblue-100 h-[120px] w-full rounded-t-lg flex justify-center overflow-hidden">
                <GroupPlaceholderIcon />
              </div>
            )}

            <div className="p-6 flex flex-col gap-3 h-[168px] w-full">
              <h3 className="text-lg font-medium h-1/5">{group?.group?.name}</h3>
              <p className="h-3/5 text-xs tracking-tight">
                {`${
                  (group?.group?.description?.length || 0) > 96
                    ? `${group?.group?.description?.slice(0, 95)}...`
                    : group?.group?.description
                }`}
              </p>

              <div className="flex gap-2 text-xs h-1/5 items-center">
                <UsersIcon />
                <p className="flex items-end gap-[2px]">
                  <span className="font-bold">{group?.memberCount || 0} &nbsp;</span>

                  <span>Members</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupsOverview;
