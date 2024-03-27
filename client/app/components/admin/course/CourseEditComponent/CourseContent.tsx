import { style } from "@/app/styles/style";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

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

type Props = {
  videoContent: Array<videoContent>;
  setVideoContent(videoContent: Array<videoContent>): void;
  editPage: number;
  setEditPage: (editPage: number) => void;
};

const CourseContent: FC<Props> = ({
  videoContent,
  setVideoContent,
  editPage,
  setEditPage,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<Array<boolean>>(
    Array(videoContent.length).fill(false)
  );
  const [activeSelection, setActiveSelection] = useState<number>(1);
  const [linkCollapse, setLinksCollapse] = useState<Array<Array<boolean>>>([
    [false],
  ]);
  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handelSubmit} className="w-11/12 overflow-y-scroll p-3">
        {...videoContent.map((video, index) => {
          const showSection =
            index === 0 ||
            video.videoSection !== videoContent[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  index > 0 && showSection ? "mt-10" : "mb-0"
                }`}
              >
                {showSection && (
                  <div className=" flex justify-between items-center">
                    <label
                      className="flex justify-center items-center"
                      htmlFor={`titleInput-${index + 1}`}
                    >
                      <input
                        id={`titleInput-${index + 1}`}
                        placeholder={`Untitled ${index > 0 ? index + 2 : ""}`}
                        className={`outline-none placeholder:text-white titleSection focus:outline-none bg-transparent ${
                          style.title
                        } ${
                          video.videoSection === "" ? "w-[120px]" : "min-w-fit "
                        }`}
                        value={
                          video.videoSection !== ""
                            ? video.videoSection
                            : `Untitled ${index + 1}`
                        }
                        onChange={(e) => {
                          video.videoSection = e.target.value;
                          setVideoContent([...videoContent]);
                        }}
                      />
                      <BsPencil className="cursor-pointer" />
                    </label>
                  </div>
                )}
                <div className="flex w-full justify-center items-center">
                  {isCollapsed[index] && (
                    <>
                      {video.title ? (
                        <h1 className="text-xl font-Poppins font-bold">
                          {index + 1}. {video.title}
                        </h1>
                      ) : (
                        <h1 className="text-xl font-Poppins font-bold">
                          {index + 1}. Untitled
                        </h1>
                      )}
                      <br />
                    </>
                  )}

                  <div className="flex-[1] gap-2 w-full justify-end items-end flex">
                    {!showSection && (
                      <BsPencil
                        size={20}
                        title="Edit"
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          video.videoSection = `Untitled ${index + 1}`;
                          setVideoContent([...videoContent]);
                        }}
                      />
                    )}
                    {index !== 0 && (
                      <div className="flex item-center">
                        <AiOutlineDelete
                          size={20}
                          title="Delete"
                          className="text-2xl cursor-pointer"
                          onClick={() => {
                            videoContent.splice(index, 1);
                            setVideoContent([...videoContent]);
                          }}
                        />
                      </div>
                    )}
                    <br />
                    <MdOutlineKeyboardArrowDown
                      size={20}
                      style={{
                        transition: "all 0.5s",
                        transform: isCollapsed[index] ? "rotate(180deg)" : "",
                      }}
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        isCollapsed[index] = !isCollapsed[index];
                        setIsCollapsed([...isCollapsed]);
                      }}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor={`VideoTitle-${index + 1}`}
                      className="flex-col flex"
                    >
                      Video Title
                      <input
                        id={`VideoTitle-${index + 1}`}
                        className="!py-2 w-[80%] bg-slate-800 ring-1 ring-white px-3 my-2 outline-none border-none text-white"
                        value={video.title}
                        onChange={(e) => {
                          video.title = e.target.value;
                          setVideoContent([...videoContent]);
                        }}
                      />
                    </label>
                    <label
                      htmlFor={`VideoUrl-${index + 1}`}
                      className="flex-col flex"
                    >
                      Video Url
                      <input
                        id={`VideoUrl-${index + 1}`}
                        className="!py-2 w-[80%] bg-slate-800 ring-1 ring-white px-3 my-2 outline-none border-none text-white"
                        value={video.videoUrl}
                        onChange={(e) => {
                          video.videoUrl = e.target.value;
                          setVideoContent([...videoContent]);
                        }}
                      />
                    </label>
                    <label htmlFor="VideoDesc" className="flex-col flex">
                      Video Description
                      <textarea
                        id="VideoDesc"
                        rows={7}
                        cols={10}
                        className="!py-2 w-[80%] bg-slate-800 ring-1 ring-white px-3 my-2 outline-none border-none text-white"
                        value={video.description}
                        onChange={(e) => {
                          video.description = e.target.value;
                          setVideoContent([...videoContent]);
                        }}
                      />
                    </label>
                    <h1 className="w-full flex font-Poppins justify-center items-center text-[20px] font-[600]">
                      <span>Links</span>
                    </h1>

                    <div className="flex w-11/12 justify-center items-center flex-col">
                      {video?.links.map((link, i) => {
                        return (
                          <>
                            <div className="flex w-full justify-between items-center">
                              <h1 className="w-full mt-3">{i + 1}. Link </h1>
                              <div className="flex gap-3">
                                {i !== 0 && (
                                  <AiOutlineDelete
                                    title="Delete"
                                    className="text-[18px] cursor-pointer"
                                    onClick={() => {
                                      video.links.splice(i, 1);
                                      setVideoContent([...videoContent]);
                                    }}
                                  />
                                )}
                                <MdKeyboardArrowDown
                                  className="text-[18px] cursor-pointer"
                                  style={{
                                    transition: "all 0.5s",
                                    transform:
                                      !linkCollapse[index][i] === true
                                        ? "rotate(180deg)"
                                        : "",
                                  }}
                                  onClick={() => {
                                    linkCollapse[index][i] =
                                      !linkCollapse[index][i];
                                    setLinksCollapse([...linkCollapse]);
                                  }}
                                />
                              </div>
                            </div>
                            {!linkCollapse[index][i] && (
                              <>
                                <label
                                  htmlFor={`linksTitle-${index}`}
                                  className="w-11/12 flex-col flex"
                                >
                                  <p className="text-[12px]">Link Title</p>

                                  <div className="flex gap-2">
                                    <input
                                      placeholder="Link Title"
                                      id={`linksTitle-${index}`}
                                      className="!py-1 text-[16px] w-[80%] bg-slate-800 ring-1 ring-white px-3 my-2 outline-none border-none text-white"
                                      value={link.title}
                                      onChange={(e) => {
                                        video.links[i].title = e.target.value;
                                        setVideoContent([...videoContent]);
                                      }}
                                    />
                                  </div>
                                </label>

                                <label
                                  htmlFor={`linksUrl-${index}`}
                                  className="w-11/12 flex-col flex"
                                >
                                  <p className="text-[12px]">Link Url</p>

                                  <div className="flex gap-2">
                                    <input
                                      placeholder="Link Url"
                                      id={`linksUrl-${index}`}
                                      className="!py-1 text-[16px] w-[80%] bg-slate-800 ring-1 ring-white px-3 my-2 outline-none border-none text-white"
                                      value={link.url}
                                      onBlur={(e) => {
                                        if (
                                          e.target.value.trim().includes(" ") ||
                                          !e.target.value
                                            .trim()
                                            .includes("http")
                                        )
                                          return toast.error(
                                            "Provide a url in url field"
                                          );
                                      }}
                                      onChange={(e) => {
                                        video.links[i].url = e.target.value;
                                        setVideoContent([...videoContent]);
                                      }}
                                    />
                                  </div>
                                </label>
                              </>
                            )}
                          </>
                        );
                      })}
                      <button
                        onClick={() => {
                          video.links.push({ title: "", url: "" });
                          linkCollapse[index].push(false);
                          setLinksCollapse([...linkCollapse]);
                          setVideoContent([...videoContent]);
                        }}
                        className=" cursor-pointer !py-1 text-[14px] !px-2 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
                      >
                        Add Link
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <button
          onClick={() => {
            const isEmpty = videoContent.map((video, index) => {
              if (
                video.description === "" ||
                video.videoSection === "" ||
                video.title === ""
              )
                return false;
              const isEmp = video.links.map((link) => {
                if (link.title === "" || link.url === "") return false;
                return true;
              });
              if (isEmp.includes(false)) return false;
              return true;
            });
            if (isEmpty.includes(false))
              return toast.error("Please fill all fields");
            videoContent.push({
              videoUrl: "",
              title: "",
              description: "",
              videoThumbnail: {
                public_id: "",
                url: "",
              },
              videoSection: `Untitled ${videoContent.length + 1}`,
              videolength: 0,
              videoplayer: "",
              links: [{ title: "", url: "" }],
            });
            setLinksCollapse([...linkCollapse, [false]]);
            setIsCollapsed([...isCollapsed, false]);
            setActiveSelection(videoContent.length);
            setVideoContent([...videoContent]);
          }}
          className=" cursor-pointer !py-1 text-[14px] !px-2 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
        >
          Add New
        </button>
        <div className="flex mt-3 w-full justify-end items-end">
          <div className="flex justify-between items-center gap-3 w-full">
            <button
              onClick={() => setEditPage(editPage - 1)}
              className="cursor-pointer !py-2 w-[90px] !px-4 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
            >
              Previous
            </button>
            <button
              onClick={() => {
                const isEmpty = videoContent.map((video, index) => {
                  if (
                    video.description === "" ||
                    video.videoSection === "" ||
                    video.title === ""
                  )
                    return false;
                  const isEmp = video.links.map((link) => {
                    if (link.title === "" || link.url === "") return false;
                    return true;
                  });
                  if (isEmp.includes(false)) return false;
                  return true;
                });
                if (isEmpty.includes(false))
                  return toast.error("Please fill all fields");
                setEditPage(editPage + 1);
              }}
              className="cursor-pointer !py-2 w-[90px] !px-4 mt-4 justify-center items-center  flex hover:bg-black text-black bg-slate-800 dark:text-white rounded-sm ring-1 ring-white"
            >
              Next
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
      </form>
    </>
  );
};

export default CourseContent;
