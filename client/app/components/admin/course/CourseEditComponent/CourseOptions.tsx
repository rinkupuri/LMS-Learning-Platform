import { style } from "@/app/styles/style";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { CgAdd } from "react-icons/cg";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

type prerequisites = { title: string };
type benefits = { title: string };

type Props = {
  benefits: Array<benefits>;
  setBenefits: (benefits: Array<benefits>) => void;
  prerequisites: Array<prerequisites>;
  setPrerequisites: (prerequisites: Array<prerequisites>) => void;
  editPage: number;
  setEditPage: (editPage: number) => void;
};

const CourseOptions: FC<Props> = ({
  benefits,
  setBenefits,
  editPage,
  setEditPage,
  prerequisites,
  setPrerequisites,
}) => {
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  const handelAddBenefits = () => {
    const checkArray = benefits.filter((benefit) => benefit.title === "");
    if (checkArray.length > 0) {
      return setError(true);
    }
    setError(false);
    setBenefits([...benefits, { title: "" }]);
  };
  const handelAddPrerequisites = () => {
    const checkArray = prerequisites.filter(
      (prerequisite) => prerequisite.title === ""
    );
    if (checkArray.length > 0) {
      return setError2(true);
    }
    setError2(false);
    setPrerequisites([...prerequisites, { title: "" }]);
  };
  return (
    <>
      <div className="flex w-11/12 *:box-border items-center h-screen flex-col overflow-y-scroll">
        <div
          className={`${style.title} flex w-11/12 my-3 justify-start items-start`}
        >
          <h1>Tell User About benefits</h1>
        </div>
        {benefits.map((element, index) => (
          <div key={index} className="flex gap-2 flex-col    w-11/12 mt-2">
            <div className="flex justify-start items-center flex-row w-full">
              <input
                required
                id={`${index}`}
                className={`cursor-pointer !py-2 !px-4 w-[88%] text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
                type="Course Benefits"
                placeholder="Course Benefits"
                value={element.title}
                onBlur={() => element.title === "" && setError(true)}
                onChange={(e) => {
                  const newBenefits = [...benefits];
                  newBenefits[index].title = e.target.value;
                  setBenefits(newBenefits);
                }}
              />

              {benefits.length > index && index !== 0 && (
                <button
                  className="cursor-pointer w-[40px] px-5 h-[40px]"
                  onClick={() => {
                    benefits.splice(index, 1);
                    setBenefits([...benefits]);
                  }}
                >
                  <MdDelete title="Delete" size={25} />
                </button>
              )}
            </div>
            {/* Erorr Show Here  */}
            <div className="flex w-full">
              {error && element.title === "" && (
                <div className="text-red-500 text-[12px]">
                  Please Fill All The Fields
                </div>
              )}
            </div>
          </div>
        ))}
        {/* add button style */}
        <div
          onClick={handelAddBenefits}
          className=" cursor-pointer !py-2 w-[90px] !px-4 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
          // className="flex items-center  py-5 w-11/12"
        >
          Add &nbsp; {<CgAdd size={20} />}
        </div>
        <br />
        <br />
        <div
          className={`${style.title} flex w-11/12 my-3 justify-start items-start`}
        >
          <h1>Tell User About Prerequisites</h1>
        </div>
        {prerequisites.map((element, index) => (
          <div key={index} className="flex gap-2 flex-col    w-11/12 mt-2">
            <div className="flex justify-start items-center flex-row w-full">
              <input
                required
                id={`${index}`}
                className={`!py-2 !px-4 w-[88%] text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white`}
                type="Course Prerequisites"
                placeholder="Course Prerequisites"
                value={element.title}
                onBlur={() => element.title === "" && setError2(true)}
                onChange={(e) => {
                  const newPrerequisites = [...prerequisites];
                  newPrerequisites[index].title = e.target.value;
                  setPrerequisites(newPrerequisites);
                }}
              />

              {prerequisites.length > index && index !== 0 && (
                <button
                  className="cursor-pointer w-[40px] px-5 h-[40px]"
                  onClick={() => {
                    prerequisites.splice(index, 1);
                    setPrerequisites([...prerequisites]);
                  }}
                >
                  <MdDelete title="Delete" size={25} />
                </button>
              )}
            </div>
            {/* Erorr Show Here  */}
            <div className="flex w-full">
              {error2 && element.title === "" && (
                <div className="text-red-500 text-[12px]">
                  Please Fill All The Fields
                </div>
              )}
            </div>
          </div>
        ))}
        {/* add button style */}
        <div
          onClick={handelAddPrerequisites}
          className="cursor-pointer !py-2 w-[90px] !px-4 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
          // className="flex items-center  py-5 w-11/12"
        >
          Add &nbsp; {<CgAdd size={20} />}
        </div>

        <div className="flex mt-3 w-full justify-center items-center">
          <div className="flex justify-between items-center gap-3 w-11/12">
            <button
              onClick={() => setEditPage(editPage - 1)}
              className="cursor-pointer !py-2 w-[90px] !px-4 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
            >
              Previous
            </button>
            <button
              onClick={() => {
                const arrBlank = benefits.filter(
                  (benefit) => benefit.title === ""
                );
                const arrBlank2 = prerequisites.filter(
                  (prerequisite) => prerequisite.title === ""
                );
                if (arrBlank.length > 0 || arrBlank2.length > 0) {
                  return toast.error("Please Fill All The Fields");
                }
                setEditPage(editPage + 1);
              }}
              className="cursor-pointer !py-2 w-[90px] !px-4 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseOptions;
