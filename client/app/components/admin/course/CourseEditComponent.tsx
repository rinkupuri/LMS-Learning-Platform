import { Course } from "../../../interface/AllInterface";
import React, { FC, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import CourseInfoCompinent from "./CourseEditComponent/CourseInformation";
import CourseOptions from "./CourseEditComponent/CourseOptions";
import CourseContent from "./CourseEditComponent/CourseContent";
import CoursePreview from "./CourseEditComponent/CoursePreview";

type prerequisites = { title: string };
type benefits = { title: string };
type videoContent = {
  videoUrl: string;
  title: string;
  description: string;
  videoThumbnail: {
    public_id: string;
    url: string;
  };
  videoSection: string;
  videolength: number;
  videoplayer: string;
  links: Array<{ title: string; url: string }>;
};

interface Props {
  componentType: string;
  course: Course;
  setCourse: (course: any) => void;
  editPage: number;
  setEditPage: (editPage: number) => void;
  benefits: Array<benefits>;
  setBenefits: (benefits: Array<benefits>) => void;
  prerequisites: Array<prerequisites>;
  setPrerequisites: (prerequisites: Array<prerequisites>) => void;
  videoContent: Array<videoContent>;
  setVideoContent(videoContent: Array<videoContent>): void;
  videoData: string;
}

const CourseEditComponent: FC<Props> = ({
  editPage,
  setEditPage,
  course,
  setCourse,
  componentType,
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  videoContent,
  setVideoContent,
  videoData,
}) => {
  const courseOptions = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <>
      <div className="flex-[4]  h-full flex-col flex items-center  w-full ">
        {editPage === 0 && (
          <CourseInfoCompinent
            editPage={editPage}
            setEditPage={setEditPage}
            setCourse={setCourse}
            course={course}
          />
        )}
        {editPage === 1 && (
          <CourseOptions
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            setEditPage={setEditPage}
            editPage={editPage}
          />
        )}
        {editPage === 2 && (
          <CourseContent
            videoContent={videoContent}
            setVideoContent={setVideoContent}
            setEditPage={setEditPage}
            editPage={editPage}
          />
        )}
        {editPage === 3 && (
          <CoursePreview
            course={course}
            editPage={editPage}
            setEditPage={setEditPage}
            componentType={componentType}
            videoData={videoData}
          />
        )}
      </div>
      <div className="flex-[2] relative w-full h-screen">
        <div className="flex items-center justify-center">
          <div className="flex flex-col justify-center items-start gap-2">
            {courseOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => setEditPage(index)}
                className={`flex gap-2 h-[30px] relative cursor-pointer   items-center`}
              >
                <div
                  className={`${
                    editPage + 1 > index
                      ? "bg-blue-500 rounded-full border-transparent border-[1px] ring-1 ring-blue-500"
                      : "bg-slate-800 rounded-full border-transparent border-[1px] ring-1 ring-slate-800"
                  }`}
                >
                  <IoMdCheckmark size={20} />

                  {index !== courseOptions.length - 1 && (
                    <div
                      className={`absolute top-[80%] left-[8px] w-1 h-[30px] ${
                        editPage + 1 > index ? "bg-blue-500" : "bg-slate-800"
                      } `}
                    ></div>
                  )}
                </div>
                <p>{option}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseEditComponent;
