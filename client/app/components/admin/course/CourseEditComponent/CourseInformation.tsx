import Image from "next/image";
import React, { FC, useState } from "react";
import upload from "./../../../../../public/upload.png";
import { Course } from "@/app/interface/AllInterface";
import { BiCross } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { IoAddCircle } from "react-icons/io5";

type Props = {
  course: Course;
  setCourse: (course: Course) => void;
  editPage: number;
  setEditPage: (editPage: number) => void;
};

const CourseInformation: FC<Props> = ({
  editPage,
  setEditPage,
  course,
  setCourse,
}) => {
  const [drag, setDrag] = useState(false);
  // write type of e in this function

  //   handel Change for image
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        if (reader.result)
          setCourse({
            ...course,
            thumbnail: { url: reader.result.toString() },
          });
      };
    }
  };

  //   handelDragOver for drag and Drop
  const handelDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  //   handelDrop for drag and Drop
  const handelDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result)
        setCourse({
          ...course,
          thumbnail: { url: reader.result.toString() },
        });
    };
  };
  //   handelDragLeave for drag and Drop
  const handelDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  return (
    <>
      <form
        onSubmit={() => setEditPage(1)}
        className="flex overflow-y-scroll w-full mt-1  flex-col items-center"
      >
        <div className="flex gap-2  w-11/12 flex-col mt-2">
          <label htmlFor="name">Course Name</label>
          <input
            required
            className={`!py-2 !px-4 text-black bg *:-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
            type="courseName"
            value={course.name}
            placeholder="Course Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCourse({ ...course, name: e.target.value })
            }
          />
        </div>
        <div className="flex gap-2 w-11/12 flex-col mt-2">
          <label htmlFor="name">Course Description</label>
          <textarea
            rows={6}
            cols={10}
            value={course.description}
            className={`!py-2 h-min !px-4 text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
            placeholder="Course Description"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </div>
        <div className="flex gap-2  w-11/12 flex-col mt-2">
          <label htmlFor="name">Tags</label>
          <input
            required
            value={course.tags}
            className={`!py-2 !px-4 text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
            type="tags"
            placeholder="Tags"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCourse({ ...course, tags: e.target.value })
            }
          />
        </div>
        {/* Price Inputs */}
        <div className="flex w-11/12 gap-3 mt-2">
          <div className="flex-[1] flex flex-col">
            <label htmlFor="name">Price</label>
            <input
              value={course.price ? course.price : ""}
              required
              className={`!py-2 !px-4 text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
              type="price"
              placeholder="Price"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourse({ ...course, price: Number.parseInt(e.target.value) })
              }
            />
          </div>
          <div className="flex-[1] flex flex-col">
            <label htmlFor="name">Estimated Price</label>
            <input
              value={course.estimatedprice !== 0 ? course.estimatedprice : ""}
              required
              className={`!py-2 !px-4 text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
              type="estimatedPrice"
              placeholder="Estimated Price"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourse({
                  ...course,
                  estimatedprice: Number.parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="flex w-11/12 gap-3 mt-2">
          <div className="flex-[1] flex flex-col">
            <label htmlFor="name">Level</label>
            <input
              required
              value={course.level}
              className={`!py-2 !px-4 text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
              type="level"
              placeholder="Beginner/Intermediate/Advanced"
              list="level"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourse({
                  ...course,
                  level: e.target.value,
                })
              }
            />
            <datalist id="level">
              <option value="Beginner" />
              <option value="Intermediate" />
              <option value="Advanced" />
            </datalist>
          </div>
          <div className="flex-[1] flex flex-col">
            <label htmlFor="name">Demo Video id</label>
            <div
              className={` !px-4 text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
            >
              <input
                required
                value={course.demoUrl}
                className="!py-2 w-[80%] bg-slate-800 outline-none border-none text-white"
                type="demoUrl"
                placeholder="mern-fullstack"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCourse({
                    ...course,
                    demoUrl: e.target.value.toLowerCase(),
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex relative w-11/12 justify-center items-center gap-3 mt-2">
          <label
            onDrop={handelDrop}
            onDragOver={handelDragOver}
            className="w-full"
            htmlFor="thumbnail"
          >
            <div
              className={`!py-6  w-full flex p-4 justify-center items-center rounded-md !px-4 text-black bg-slate-800 dark:text-white  ring-1 ring-white`}
            >
              {!course.thumbnail?.url ? (
                <>
                  <div className="flex flex-col justify-center items-center border-dotted border-[1px] border-slate-700 w-[150px] rounded-md h-[150px]">
                    <Image
                      width={100}
                      className="w-[40%] h-[40%]"
                      height={100}
                      alt="upload"
                      src={upload}
                    />
                    <p className="p-2 text-[12px] text-center font-Josefin font-[500]">
                      Drag and or Click to upload Image
                    </p>
                  </div>
                </>
              ) : (
                <div className="relative ring-1 ring-white p-1 rounded-sm">
                  <Image
                    width={150}
                    height={84.375}
                    src={course.thumbnail?.url ? course.thumbnail?.url : ""}
                    alt="thumbnail"
                    className="w-[266px] h-[150px] rounded-lg"
                  />
                  <IoAddCircle
                    title="Change Image"
                    className="absolute bg-[#00000050] rounded-full h-[30px] w-[30px] p-[4px] top-0 right-0"
                    size={15}
                  />
                </div>
              )}
            </div>
            <input
              onChange={handelChange}
              id="thumbnail"
              className="hidden"
              type="file"
            />
          </label>
          <label
            onDrop={handelDrop}
            onDragLeave={handelDragLeave}
            onDragOver={handelDragOver}
            className={`    ${
              drag
                ? "block !duration-500 ease-in-out  translate-x-0"
                : " hidden translate-x-[100%]"
            } absolute flex rounded-md items-center justify-center top-0 left-0 w-full h-full bg-black`}
          >
            <div className="flex justify-center items-center w-[150px] h-[150px] bg-slate-900 rounded-lg ">
              <h1 className="text-[20px] font-[600] font-Poppins">Drop here</h1>
            </div>
          </label>
        </div>
        <br />
        <br />
        {/* provide me button for dark theme */}
        <div className="flex w-full justify-center items-center">
          <div className="flex w-11/12 justify-end items-end gap-2">
            <button className="!py-2 hover:bg-black !px-4 text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white">
              Clear
            </button>
            <button
              type="submit"
              className="!py-2 !px-4 hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
            >
              Next
            </button>
          </div>
        </div>

        <br />
        <br />
      </form>
    </>
  );
};

export default CourseInformation;
