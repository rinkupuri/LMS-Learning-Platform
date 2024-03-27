import React, { FC, useEffect, useState } from "react";
import CourseEditComponent from "../components/admin/course/CourseEditComponent";
import { Course } from "../interface/AllInterface";
import cloneDeep from "lodash/cloneDeep";
type Props = {
  courseData?: Course;
  componentType: string;
};

const CourseComponent: FC<Props> = ({ componentType, courseData }) => {
  const [courseChecker, setCourseChecker] = useState({});
  const [course, setCourse] = useState<Course>({
    name: "",
    description: "",
    price: 0,
    estimatedprice: 0,
    thumbnail: {
      public_id: "",
      url: "",
    },
    tags: "",
    level: "",
    demoUrl: "",
    benefits: [],
    prerequisites: [],
    reviews: [],
    courseData: [],
    ratings: 0,
    purchased: 0,
  });
  const [editPage, setEditPage] = useState(0);
  const [benefits, setBenefits] = useState<Array<{ title: string }>>([
    { title: "" },
  ]);
  const [prerequisites, setPrerequisites] = useState<Array<{ title: string }>>([
    { title: "" },
  ]);
  const [videoContent, setVideoContent] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoThumbnail: {
        public_id: "",
        url: "",
      },
      videoSection: "",
      videolength: 0,
      videoplayer: "",
      links: [{ title: "", url: "" }],
    },
  ]);

  useEffect(() => {
    if (!courseData) return;
    const videoData: Course = cloneDeep(courseData);
    const courseClone = cloneDeep(videoData);
    setCourseChecker(courseClone);
    videoData && setCourse(videoData);
    videoData?.benefits && setBenefits(videoData.benefits);
    videoData?.prerequisites && setPrerequisites(videoData.prerequisites);
    videoData?.courseData && setVideoContent(videoData.courseData as any);
  }, [courseData]);

  useEffect(() => {
    setCourse((prevCourse: any) => ({
      ...prevCourse,
      courseData: [...videoContent],
    }));
  }, [videoContent]);
  useEffect(() => {
    setCourse((prevCourse: any) => ({
      ...prevCourse,
      benefits: [...benefits],
    }));
  }, [benefits]);
  useEffect(() => {
    setCourse((prevCourse: any) => ({
      ...prevCourse,
      prerequisites: [...prerequisites],
    }));
  }, [prerequisites]);
  return (
    <div className="flex w-full mt-2 overflow-hidden ">
      <CourseEditComponent
        editPage={editPage}
        setEditPage={setEditPage}
        course={course}
        setCourse={setCourse}
        componentType={componentType}
        benefits={benefits}
        setBenefits={setBenefits}
        prerequisites={prerequisites}
        videoData={JSON.stringify(courseChecker)}
        setPrerequisites={setPrerequisites}
        videoContent={videoContent}
        setVideoContent={setVideoContent}
      />
    </div>
  );
};

export default CourseComponent;
