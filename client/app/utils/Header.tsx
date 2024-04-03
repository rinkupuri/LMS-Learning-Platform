import React, { FC } from "react";
interface HeadProp {
  title?: string;
  description?: string;
  keywords?: string;
}
const Header: FC<HeadProp> = ({ title, description, keywords }) => {
  return (
    <div>
      <title>{title || "LMS Panel"}</title>
      <meta
        name="description"
        content={
          description ||
          "LMS Learning managment System for students to develope our skills"
        }
      />
      <meta
        name="keywords"
        content={keywords || "LMS Panel, Learning Sysytem"}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </div>
  );
};

export default Header;
