"use client";
import React, { useEffect, useState, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import AWS from "aws-sdk";
import { Button } from "hexis/components/common/button";
import { InputField } from "hexis/components/common/input-field";
import TextArea from "hexis/components/common/textarea-field";
import SvgImageIcon from "hexis/components/icons/general/ImageIcon";
import clsx from "clsx";
import ImageUploading, { ImageListType } from "react-images-uploading";
import isEmpty from "lodash/isEmpty";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { createAGroup, deleteGroup, updateGroup } from "hexis/lib/graphql-client";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "hexis/hooks/useRedux";
import { getImageURL } from "./groups-overview";
import { addGroup, saveSelectedGroup } from "hexis/state/groups/slice";
import { Group } from "hexis/generated/graphql";
import { URLtoFile } from "hexis/utils/URLToFile";

AWS.config.update({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

type Props = {
  setModalToggle: Function;
  modalToggle?: boolean;
  editMode?: boolean;
};

interface IAddGroup {
  name: string;
  description: string;
  groupImage: string;
}

const ModalContent = ({ setModalToggle, modalToggle, editMode = false }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<ImageListType>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined);
  const [selectedGroupImageURL, setSelectedGroupImageURL] = useState<string | undefined>(undefined);
  const [awsUploadedImage, setAwsUploadedImage] = useState<string | undefined>(undefined);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const selectedGroupInState = useAppSelector(state => state.groups.selectedGroup);

  const { reset, control, handleSubmit, setValue } = useForm<IAddGroup>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      groupImage: "",
    },
  });

  useEffect(() => {
    if (editMode) {
      setSelectedGroup(selectedGroupInState);
    }
  }, [selectedGroupInState]);

  useEffect(() => {
    if (!isEmpty(selectedGroup)) {
      setValue("name", selectedGroup?.name);
      setValue("description", selectedGroup?.description || "");
      const groupImage = selectedGroup.link || "";
      getImageURL({
        imageKey: groupImage,
        setS3Image: setSelectedGroupImageURL,
      });
    }
  }, [selectedGroup?.id, selectedGroup?.name, selectedGroup?.description, selectedGroup?.link]);

  // remove image from state if it's not saved to the group
  // TODO: implement remove image from AWS if it's not used to save space
  useEffect(() => {
    if (!modalToggle) {
      setAwsUploadedImage(undefined);
      setImage([]);
    }
  }, [modalToggle]);

  useEffect(() => {
    const getGroupImage = async () => {
      if (selectedGroupImageURL?.length) {
        const imageFile = await URLtoFile(selectedGroupImageURL);
        setImage([{ dataURL: selectedGroupImageURL, file: imageFile }]);
      }
    };
    getGroupImage();
  }, [selectedGroupImageURL]);

  // remove image from state if it's not saved to the group
  useEffect(() => {
    if (!modalToggle) {
      setAwsUploadedImage(undefined);
      setImage([]);
      // TODO: implement remove image from AWS if it's not used to save space
    }
  }, [modalToggle]);

  const onEditGroup = async (values: IAddGroup) => {
    setLoading(true);
    const updatedGroup = await updateGroup({
      updateGroupId: selectedGroup?.id!,

      input: {
        name: values?.name,
        link: awsUploadedImage,
        description: values?.description,
      },
    });
    dispatch(saveSelectedGroup(updatedGroup.updateGroup as Group));
    reset();
    setLoading(false);
    setTitle(undefined);
    setImage([]);
    setAwsUploadedImage(undefined);
    setModalToggle(false);
  };

  const onDeleteGroup = async () => {
    setLoading(true);
    await deleteGroup({ deleteGroupId: selectedGroup?.id! });
    reset();
    setLoading(false);
    setTitle(undefined);
    setImage([]);
    setAwsUploadedImage(undefined);
    setConfirmDelete(false);
    setModalToggle(false);
    router?.push("/groups");
  };

  const onSubmit = async (values: IAddGroup) => {
    setLoading(true);

    const newGroup = await createAGroup({
      input: {
        name: values?.name,
        link: awsUploadedImage,
        description: values?.description,
      },
    });

    dispatch(addGroup(newGroup.createGroup as Group));

    reset();
    setLoading(false);
    setTitle(undefined);
    setImage([]);
    setAwsUploadedImage(undefined);
    setModalToggle(false);
    router.push("/groups");
  };

  const imageOnChange = async (imageList: ImageListType, addUpdateIndexList: number[] = []) => {
    setImage(imageList);

    for (const addUpdateIndex of addUpdateIndexList) {
      const currentImage = imageList[addUpdateIndex];

      // Upload to AWS
      if (!isEmpty(currentImage) && currentImage && currentImage.dataURL && currentImage.file) {
        try {
          setImageLoading(true);

          // @ts-ignore
          const base64Data = new Buffer.from(currentImage.dataURL.replace(/^data:image\/\w+;base64,/, ""), "base64");
          const fileId = uuidv4();
          const type = currentImage.dataURL.split(";")[0].split("/")[1];
          const fileName = `${fileId}.${type}`;

          // Save S3 URL
          const S3_BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME;
          setAwsUploadedImage(`groupImages/${fileName}`);

          const myBucket = new AWS.S3({
            params: {
              Bucket: S3_BUCKET,
            },
          });

          const params = {
            Bucket: S3_BUCKET ?? "",
            Key: `groupImages/${fileName}`,
            Body: base64Data,
            ContentEncoding: "base64",
            ContentType: currentImage.file.type,
          };

          myBucket
            .putObject(params, () => {})
            .on("httpUploadProgress", _ => {
              setLoading(true);
            })
            .send(err => {
              setImageLoading(false);
              setLoading(false);
              if (err) console.log(err);
            });
        } catch (error) {
          alert("Could not upload selected image, please try again.");
          console.log(error);
          return error;
        }
      }
    }
    return;
  };

  const autoSize = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textArea = e.currentTarget;
    const maxHeight = 240;
    // avoid overflow, enable scrolling
    const height = textArea.scrollHeight < maxHeight ? textArea.scrollHeight : maxHeight;

    textArea.style.cssText = "min-height:20px; height: 20px;";
    textArea.style.cssText = "height:" + height + "px";
    // TODO: find a way to shrink it when text is deleted
  };

  return (
    <div className="flex flex-col gap-6">
      {editMode ? (
        <>
          <h2 className="text-[20px] font-medium m-0 p-0">Edit Group</h2>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onEditGroup)}>
            {/* group name */}
            <div className="bg-background-900 rounded-lg w-full px-4 py-2">
              <label className="text-[10px] text-activeblue-100 tracking-widest font-semibold uppercase">Name</label>
              <InputField
                name="name"
                control={control}
                placeholder="Add name"
                className="h-5 w-full outline-0 bg-background-900 tracking-[0.15px] placeholder-white placeholder-opacity-50"
                overrideClassName={true}
                inputStyle={{ minHeight: 20 }}
                onBlur={e => setTitle(e.target.value)}
              />
            </div>

            {/* group description */}
            <div className="bg-background-900 rounded-lg w-full px-4 py-3 h-[160px]">
              <label className="text-[10px] text-activeblue-100 tracking-widest font-semibold uppercase">Description</label>
              <TextArea
                name="description"
                control={control}
                placeholder="Add description"
                className="w-full outline-0 bg-background-900 tracking-[0.15px] resize-none placeholder-white placeholder-opacity-50"
                rows={4}
                onKeyDown={autoSize}
              />
            </div>

            {/* group image */}
            <ImageUploading multiple value={image} onChange={imageOnChange} maxNumber={1}>
              {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                <div
                  onClick={onImageUpload}
                  {...dragProps}
                  className="upload__image-wrapper cursor-pointer bg-darkgrey1-600 rounded-lg px-[14px] py-3 min-h-[150px] max-h-[198px] flex flex-col justify-center items-center border-2 border-background-500 border-dashed"
                >
                  {/* style={svgBackground}> */}
                  <div className="uploadedImages min-h-[150px] max-h-[198px] w-full flex flex-col gap-2 justify-center items-center">
                    {imageLoading ? (
                      "Saving Image"
                    ) : image?.length > 0 ? (
                      imageList.map((image, index) => (
                        <div
                          key={image.dataURL}
                          className="images max-h-[150px] overflow-hidden"
                          onClick={e => {
                            // this is to prevent image picker from opening up twice
                            e.stopPropagation();
                            onImageUpdate(index);
                          }}
                        >
                          <Image src={image.dataURL as string} alt="group" width="520" height="150" />
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-full flex justify-center items-center">
                        <SvgImageIcon />
                      </div>
                    )}
                    <div className="text-[10px] text-activeblue-100 uppercase text-center w-full tracking-widest font-semibold mt-2">
                      {image?.length > 0 ? "Drop or click to Change group image" : "Drop or click to Upload group image"}
                    </div>
                  </div>
                </div>
              )}
            </ImageUploading>

            {!confirmDelete ? (
              <div className="flex justify-center items-center gap-3 mt-3">
                <Button
                  loading={loading}
                  className={"disabled:cursor-not-allowed bg-carbcodelow-600 py-3 px-6 w-[200px] rounded-[10px] flex justify-center"}
                  overrideClassName={true}
                  text="Delete Group"
                  onClick={() => setConfirmDelete(true)}
                />
                <Button
                  loading={loading}
                  className={"disabled:cursor-not-allowed bg-activeblue-100 py-3 px-6 w-[200px] rounded-[10px] flex justify-center"}
                  overrideClassName={true}
                  text="Save"
                  buttonType="submit"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-3 mt-3">
                <p className="text-sm tracking-[0.25px] leading-[150%]">Are you sure you want to delete?</p>
                <div className="flex justify-center items-center gap-2">
                  <Button
                    loading={loading}
                    className={
                      " disabled:cursor-not-allowed border-[1px] border-activeblue-100 hover:bg-activeblue-100 py-3 px-6 w-[120px] rounded-[10px] flex justify-center text-sm"
                    }
                    overrideClassName={true}
                    text="Yes"
                    onClick={onDeleteGroup}
                  />
                  <Button
                    loading={loading}
                    className={
                      " disabled:cursor-not-allowed bg-activeblue-100 py-3 px-6 w-[120px] rounded-[10px] flex justify-center text-sm"
                    }
                    overrideClassName={true}
                    text="No"
                    onClick={() => setConfirmDelete(false)}
                  />
                </div>
              </div>
            )}
          </form>
        </>
      ) : (
        <>
          <h2 className="text-[20px] font-medium">Add Group</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            {/* group name */}
            <div className="bg-background-900 rounded-lg w-full px-4 py-2">
              <label className="text-[10px] text-activeblue-100 tracking-widest font-semibold uppercase">Name</label>
              <InputField
                name="name"
                control={control}
                placeholder="Add name"
                className="h-5 w-full outline-0 bg-background-900 tracking-[0.15px] placeholder-white placeholder-opacity-50 text-left"
                overrideClassName={true}
                inputStyle={{ minHeight: 20 }}
                onBlur={e => setTitle(e.target.value)}
              />
            </div>

            {/* group description */}
            <div className="bg-background-900 rounded-lg w-full px-4 py-2 min-h-[96px] max-h-[300px]">
              <label className="text-[10px] text-activeblue-100 tracking-widest font-semibold uppercase">Description</label>
              <TextArea
                name="description"
                control={control}
                placeholder="Add description"
                className="w-full outline-0 bg-background-900 tracking-[0.15px] resize-none placeholder-white placeholder-opacity-50"
                rows={4}
                onKeyDown={autoSize}
              />
            </div>

            {/* group image */}
            <ImageUploading multiple value={image} onChange={imageOnChange} maxNumber={1}>
              {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                <div
                  {...dragProps}
                  className="upload__image-wrapper cursor-pointer bg-darkgrey1-600 rounded-lg px-[14px] py-3 min-h-[150px] max-h-[198px] flex flex-col justify-center items-center border-2 border-background-500 border-dashed"
                >
                  {/* style={svgBackground}> */}
                  <div className="uploadedImages h-full w-full flex justify-center items-center overflow-hidden">
                    {imageLoading ? (
                      "Saving Image"
                    ) : image?.length > 0 ? (
                      imageList.map((image, index) => (
                        <div key={image.dataURL} className="images" onClick={() => onImageUpdate(index)}>
                          <Image src={image.dataURL as string} alt="group" width="520" height="150" />
                        </div>
                      ))
                    ) : (
                      <div onClick={onImageUpload} className="w-full h-full flex justify-center items-center">
                        <SvgImageIcon />
                      </div>
                    )}
                  </div>

                  <div
                    onClick={onImageUpload}
                    className="text-[10px] text-activeblue-100 uppercase text-center w-full tracking-widest font-semibold mt-2"
                  >
                    {image?.length > 0 ? "Drop or click to Change group image" : "Drop or click to Upload group image"}
                  </div>
                </div>
              )}
            </ImageUploading>

            <div className="flex justify-center mt-3">
              <Button
                loading={loading}
                disabled={title ? false : true}
                buttonType="submit"
                className={clsx(
                  "disabled:cursor-not-allowed bg-activeblue-100 py-2 px-6 lg:w-[250px] md:w-[250px] w-[202px] rounded-[10px] flex justify-center",
                  {
                    "opacity-20": !title,
                    "opacity-100": title,
                  },
                )}
                overrideClassName={true}
                text="Add Group"
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ModalContent;
