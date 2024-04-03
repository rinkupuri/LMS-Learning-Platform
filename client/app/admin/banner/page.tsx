"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Hero, { BannerTypes } from "@/app/components/Hero";
import { BiPencil } from "react-icons/bi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useGetLayoutQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/ui/api";
import toast from "react-hot-toast";
import { Edit2, Pencil } from "lucide-react";
import Header from "@/app/utils/Header";

type Props = {
  image: {
    url: string;
    public_id?: string;
  };
  title: string;
  subTitle: string;
};

const page = (props: Props) => {
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDescription, setBannerDescription] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");
  const [bannerDumy, setBannerDumy] = useState<Props>();
  const { data, isLoading, isSuccess, isError, error } = useGetLayoutQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [
    updateBanner,
    {
      data: updateData,
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
      error: updateErrorData,
    },
  ] = useUpdateLayoutMutation();
  useEffect(() => {
    setBannerDumy({
      image: { url: bannerImage },
      title: bannerTitle,
      subTitle: bannerDescription,
    });
  }, [bannerTitle, bannerImage, bannerDescription]);
  useEffect(() => {
    if (data?.layout?.banner) {
      setBannerTitle(data?.layout?.banner.title);
      setBannerDescription(data?.layout?.banner.subTitle);
      setBannerImage(data?.layout?.banner.image?.url);
    }
  }, [data, isLoading]);
  return (
    <AdminLayout>
      <Header title="Banner Set" />
      <div className="flex relative">
        {bannerDumy && <Hero banner={bannerDumy} />}
        <Dialog>
          <DialogTrigger>
            <div className="absolute top-10 h-7 w-7 right-20 ring-1 flex justify-center items-center cursor-pointer ring-white rounded-full bg-[#00000024]">
              <BiPencil className="" size={15} />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Chaneg Banner</DialogTitle>
              <DialogDescription>
                Here you can edit your orignal Banner
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col *:mt-3 justify-center mt-3 w-full">
              <Label className="w-9/12 " htmlFor="image">
                Image
                <div className="flex relative  justify-center items-center  w-full">
                  <Input
                    id="image"
                    onChange={(e) => {
                      const file = e.target.files![0];
                      const reader = new FileReader();
                      reader.onload = () => {
                        setBannerImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }}
                    type="file"
                    className={`${
                      bannerImage && "hidden"
                    } mt-2  rounded-sm w-full`}
                  />

                  <Pencil
                    className={`absolute 
                  ${!bannerImage && "hidden"}
                  top-0 right-3`}
                  />
                  <img
                    src={bannerImage}
                    className={`mt-2 h-[150px] ${
                      !bannerImage && "hidden"
                    }  rounded-full object-contain w-[150px]`}
                  />
                </div>
              </Label>
              <Label className="w-9/12 " htmlFor="bannerTitle">
                Title
                <Input
                  value={bannerTitle}
                  id="bannerTitle"
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="mt-2  rounded-sm w-full"
                  placeholder="Enter Banner title"
                />
              </Label>
              <Label className="w-9/12 " htmlFor="description">
                Description
                <Input
                  value={bannerDescription}
                  id="description"
                  onChange={(e) => setBannerDescription(e.target.value)}
                  className="mt-2  rounded-sm w-full"
                  placeholder="Enter Description"
                />
              </Label>
              <div className="flex w-9/12 justify-center items-center">
                <DialogClose>Preview</DialogClose>
                <DialogClose
                  onClick={() => {
                    updateBanner({
                      type: "layout",
                      banner: {
                        title: bannerTitle,
                        subTitle: bannerDescription,
                        image: {
                          url: bannerImage,
                        },
                      },
                    }).then((res) => {
                      if (updateSuccess) {
                        toast.success("Banner updated successfully");
                      }
                    });
                  }}
                  className="w-9/12"
                >
                  Update Banner
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default page;
