import { style } from "@/app/styles/style";
import Image from "next/image";
import React, { FC, use, useEffect, useState } from "react";
import avatar from "../../../public/user (1).png";
import * as yup from "yup";
import { useFormik } from "formik";
import { BiEdit } from "react-icons/bi";
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useUpdateUserMutation,
} from "@/redux/features/auth/api";
import toast from "react-hot-toast";

interface Props {
  user: {
    name: string;
    email: string;
    avatar: {
      url: string;
      public_id: string;
    };
    _id: Object;
    createdAt: string;
    updatedAt: string;
  };
  activeItem: number;
}

const ProfilePageContent: FC<Props> = ({ user, activeItem }) => {
  return (
    <>
      {activeItem === 0 && <ProfilePart activeItem={activeItem} user={user} />}
      {activeItem === 1 && <></>}
      {activeItem === 2 && (
        <PasswordChangePart activeItem={activeItem} user={user} />
      )}
      {activeItem === 3 && <></>}
    </>
  );
};

export default ProfilePageContent;

// profile page Content

const ProfilePart: FC<Props> = ({ user, activeItem }) => {
  const [updateUser, { isLoading, error, data, isSuccess }] =
    useUpdateUserMutation();
  const [
    updateProfile,
    { isLoading: pisLoading, error: perror, isSuccess: pisSuccess },
  ] = useUpdateProfileMutation();
  const [avatarImage, setAvatarImage] = useState(
    user?.avatar?.url ? user.avatar.url : ""
  );

  useEffect(() => {
    if (pisSuccess) {
      toast.success("Update Successful");
    } else {
      const err = perror as any;
      err && toast.error(err.data.message);
      setAvatarImage("");
    }
  }, [pisLoading]);

  useEffect(() => {
    return () => {
      const err = error as any;
      const mess = isSuccess ? data.message : err?.data?.message;
      if (!isLoading)
        if (isSuccess) {
          toast.success("Update Successful");
        } else {
          error && toast.error(mess);
        }
    };
  }, [isLoading]);

  const schema = new yup.ObjectSchema().shape({
    name: yup
      .string()
      .trim()
      .min(3, "name must be greater than 3")
      .required("Please enter name"),
    lastname: yup.string().trim().min(2, "min length is 2"),
  });

  const formik = useFormik({
    initialValues: {
      name: user.name.split(" ")[0],
      lastname: user.name.split(" ")[1],
    },
    validationSchema: schema,
    onSubmit: ({ name, lastname }) => {
      if (lastname) name = name.concat(" ", lastname);
      updateUser({ name });
    },
  });
  const { values, errors, handleChange, handleSubmit } = formik;
  return (
    <div className="flex w-full justify-center items-center  mjustify-center  mt-5">
      <form
        onSubmit={handleSubmit}
        className="flex w-full 800px:w-[80%] flex-col "
      >
        <h1 className={`${style.title}`}>Profile</h1>
        <div className="flex flex-col w-full mt-5  items-center">
          <div className="flex w-fit h-fit relative">
            <Image
              width={120}
              height={120}
              className="w-[120px] h-[120px] object-cover rounded-full"
              alt={user.name}
              src={
                avatarImage
                  ? avatarImage
                  : user?.avatar?.url
                  ? user?.avatar?.url
                  : avatar
              }
            />
            {/* loader div  */}
            <div
              className={`absolute top-0 rounded-full left-0 w-full h-full bg-[#00000080] flex justify-center items-center ${
                pisLoading ? "block" : "hidden"
              }`}
            >
              <div className="w-[50px] h-[50px] border-4 border-t-white border-slate-400 rounded-full animate-spin"></div>
            </div>
            <label htmlFor="profile">
              <BiEdit size={20} className="absolute bottom-0 right-0" />
            </label>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target?.files;
                if (!file) return toast.error("Please Select File to update");
                setAvatarImage(URL.createObjectURL(file[0]));
                if (file[0].size > 5000000)
                  return toast.error("File size is too large");
                const newFile = new FileReader();
                newFile.readAsDataURL(file[0]);
                newFile.onloadend = () => {
                  const base64data = newFile.result;
                  updateProfile({ avatar: base64data });
                };
              }}
              id="profile"
            />
          </div>

          <h1 className="font-[600] text-[20px] mt-5">{user.name}</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-5 ">
          <div className="flex md:w-[40%] w-full  flex-col gap-1 mt-2">
            <label className="text-[14px]" htmlFor="name">
              Name
            </label>
            <input
              onChange={handleChange}
              className="rounded-sm outline-none ring-1 p-1 px-3 ring-slate-500 dark:ring-white ring-[unset]"
              type="name"
              id="name"
              value={values.name}
            />
            {errors.name && (
              <p className="text-red-500 text-[12px]">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-col md:w-[40%] w-full  gap-1 mt-2">
            <label className="text-[14px]" htmlFor="name">
              Last Name
            </label>
            <input
              onChange={handleChange}
              className="rounded-sm outline-none ring-1 p-1 px-3 ring-slate-500 dark:ring-white ring-[unset]"
              type="lastname"
              id="lastname"
              value={values.lastname}
            />
            {errors.lastname && (
              <p className="text-red-500 text-[12px]">{errors.lastname}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-[14px]" htmlFor="name">
            Email
          </label>
          <input
            className="rounded-sm outline-none ring-1 p-1 px-3 bg-slate-200 dark:bg-slate-700 ring-slate-500 dark:ring-white ring-[unset]"
            type="email"
            id="email"
            readOnly
            value={user.email}
          />

          <div className="flex w-full justify-center items-center mt-6">
            <input
              id="btn"
              name="submit"
              onClick={handleChange}
              className={`${style.button}`}
              type="submit"
              value="Update"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

// password Change Page Content

const PasswordChangePart: FC<Props> = ({ user, activeItem }) => {
  const [updatePassword, { isLoading, isSuccess, error }] =
    useChangePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Update");
    } else {
      const err = error as any;
      err?.data?.message && toast.error(err?.data?.message);
    }
  }, [isLoading]);
  const schema = new yup.ObjectSchema().shape({
    oldPassword: yup.string().required("Please enter old password"),
    newPassword: yup
      .string()
      .trim()
      .min(6, "Minimum 6 chracter required")
      .required("Please enter new password"),
    confirmPassword: yup
      .string()
      .trim()
      .required("Please enter confirm password")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: ({ oldPassword, newPassword }) => {
      oldPassword === newPassword
        ? toast.error("Provide new one")
        : updatePassword({ oldPassword, newPassword });
    },
  });
  const { values, errors, handleChange, handleSubmit } = formik;
  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex w-full  flex-col">
          <h1 className={`${style.title}`}>Change Password</h1>
        </div>
        <div className="flex w-full 800px:w-[80%] mt-8 justify-center items-center flex-col">
          <div className="flex dark:bg-slate-800 bg-slate-100 rounded-md ring-1 ring-white dark:ring-slate-800 ring-[unset] w-[80%] p-5 flex-col gap-5 items-center justify-center shadow-lg">
            <div className="flex flex-col gap-2 w-[80%]">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                onChange={handleChange}
                value={values.oldPassword}
                className={`${style.input}`}
                id="oldPassword"
                type="password"
                placeholder="Old Password"
              />

              <p
                className={`text-red-500 text-[12px] ${
                  errors.oldPassword ? "block" : "invisible"
                }`}
              >
                {errors.oldPassword}
              </p>

              <label htmlFor="newPassword">New Password</label>
              <input
                onChange={handleChange}
                value={values.newPassword}
                className={`${style.input}`}
                id="newPassword"
                type="password"
                placeholder="New Password"
              />
              <p
                className={`text-red-500 text-[12px] ${
                  errors.newPassword ? "block" : "invisible"
                }`}
              >
                {errors.newPassword}
              </p>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={handleChange}
                value={values.confirmPassword}
                className={`${style.input}`}
                id="confirmPassword"
                type="text"
                placeholder="Confirm Password"
              />
              <p
                className={`text-red-500 text-[12px] ${
                  errors.confirmPassword ? "block" : "invisible"
                }`}
              >
                {errors.confirmPassword}
              </p>
              <input
                className={`${style.button} dark:!bg-black dark:!text-white bg-white ring-1 ring-black !text-black my-7 hover:!text-white`}
                type="submit"
                value={"Change Password"}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
