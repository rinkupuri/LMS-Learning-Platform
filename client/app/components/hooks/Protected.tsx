import { useSocialAuthMutation } from "../../../redux/features/api/apislicer";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: any) => state.auth);
  return user ? children : redirect("/");
};

export default Protected;
