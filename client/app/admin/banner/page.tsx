"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Hero from "@/app/components/Hero";
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
import { Edit2 } from "lucide-react";

type Props = {};

const page = (props: Props) => {
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDescription, setBannerDescription] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");
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
    if (data?.layout?.banner) {
      console.log(data);
      setBannerTitle(data?.layout?.banner.title);
      setBannerDescription(data?.layout?.banner.subtitle);
      setBannerImage(data?.layout?.banner.image);
    }
  }, [data, isLoading]);
  return (
    <AdminLayout>
      <div className="flex relative">
        <Hero />
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
                    className="mt-2  rounded-sm w-full"
                  />

                  <Edit2
                    className={`absolute 
                  ${!bannerImage && "hidden"}
                  top-0 right-3`}
                  />
                  <img
                    src={bannerImage}
                    className={`mt-2 h-[150px] ${
                      !bannerImage && "hidden"
                    }  rounded-full object-cover w-[150px]`}
                  />
                </div>
              </Label>
              <Label className="w-9/12 " htmlFor="email">
                Title
                <Input
                  value={bannerTitle}
                  id="email"
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="mt-2  rounded-sm w-full"
                  placeholder="Enter email"
                />
              </Label>
              <Label className="w-9/12 " htmlFor="description">
                Description
                <Input
                  value={bannerDescription}
                  id="description"
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="mt-2  rounded-sm w-full"
                  placeholder="Enter Description"
                />
              </Label>
              <DialogClose>
                <Button
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
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default page;
