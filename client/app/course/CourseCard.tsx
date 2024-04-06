import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Course } from "../interface/AllInterface";
import { Library, Star, UsersRound } from "lucide-react";

type Props = {};

const CourseCard = ({ coursesData }: { coursesData: Course }) => {
  return (
    <Card className="bg-slate-900 pb-2 pt-0 mt-0 rounded-sm">
      <div className="flex flex-col">
        <div className="flex">
          <Image
            width={1200}
            height={1200}
            className="w-full rounded-sm h-[120px]"
            src={coursesData?.thumbnail?.url || ""}
            alt="sdnfi"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[16px] font-[600] text-white p-2">
            {coursesData?.name.slice(0, 40)}
          </p>
          <p className="text-[12px] px-2 flex justify-between items-center font-[600] text-white p-2">
            <span className="flex">
              <Star size={14} color="yellow" />
              <Star size={14} color="yellow" />
              <Star size={14} color="yellow" />
              <Star size={14} color="yellow" />
              <Star size={14} color="yellow" />
            </span>
            <span className="text-[12px] flex items-center justify-center gap-3 font-[600] text-white">
              <UsersRound size={14} />
              {coursesData?.purchased}
            </span>
          </p>
          <div className="flex items-center justify-between px-2">
            <span className="flex gap-1">
              <span>{coursesData?.price} $</span>
              <span className="text-[12px] line-through">
                {coursesData?.estimatedprice} $
              </span>
            </span>
            <span
              className="text-[14px] flex items-center justify-center gap-1 "
              title="videos"
            >
              <Library size={14} />
              {coursesData?.courseData.length}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
