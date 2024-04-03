import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Course } from "../interface/AllInterface";

type Props = {};

const CourseCard = ({ coursesData }: { coursesData: Course }) => {
  return (
    <Card className="bg-slate-900 rounded-sm">
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
            {coursesData?.name}
          </p>
          <p className="text-[12px] font-[600] text-white p-2">
            {coursesData?.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
