import { Course } from "@/app/interface/AllInterface";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  videoId: string;
};

const CoursePreview: FC<Props> = ({ videoId }) => {
  const [playerData, setPlayerData] = useState<{
    otp: string;
    playbackInfo: string;
  }>({
    otp: "",
    playbackInfo: "",
  });
  useEffect(() => {
    return () => {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}course/vidociper/${videoId}`
        )
        .then((res) => setPlayerData(res.data))
        .catch((err) => toast.error(err?.responce?.data?.message));
    };
  }, [videoId]);
  return (
    <div className="w-full flex justify-center items-center ">
      {playerData.otp && playerData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${playerData.otp}&playbackInfo=${playerData.playbackInfo}`}
          allowFullScreen={true}
          className="w-[48vw] h-[27vw] "
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePreview;
