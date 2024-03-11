import { VscWorkspaceTrusted } from "react-icons/vsc";
import { style } from "../../styles/style";
import React, { FC, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  setRoute: (route: string) => void;
};
type verifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const VerifyOTP: FC<Props> = ({ setRoute }) => {
  const [error, setError] = useState(false);
  const [verifyNumber, setVerifyNumber] = React.useState<verifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const inputRefs = [
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
    useRef<HTMLInputElement>(),
  ];

  const handelInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setError(false);
    const value = e.target.value.slice(0, 1);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full  justify-center items-center">
          <h1 className={`${style.title}`}>Verify OTP</h1>
        </div>
        <div className="flex justify-center items-center my-5">
          <VscWorkspaceTrusted color="blue" size={70} />
        </div>
        <div className="flex justify-center items-center mt-5">
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              key={key}
              type="number"
              ref={inputRefs[index]}
              maxLength={1}
              onChange={(e) => handelInputChange(e, index)}
              className={`${
                error && "shake !border-red-700"
              } w-[50px] h-[50px] ml-2 rounded-md text-center border-2 border-white`}
            />
          ))}
        </div>
        <div className="flex justify-center items-center mt-7">
          <button
            type="button"
            onClick={() => setError(true)}
            className="text-white border-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Verify OTP
          </button>

          {/* Loading Button */}

          {/* 

          <button
            disabled
            type="button"
            className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </button>

           */}
        </div>
        <div
          onClick={() => setRoute("SignIn")}
          className="flex gap-2 cursor-pointer my-3 justify-center items-center"
        >
          <IoMdArrowRoundBack
            className="flex justify-center items-center "
            size={15}
          />
          <div className="flex h-full justify-center items-center">
            Back to <span> &nbsp;Sign in</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
