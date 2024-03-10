import React, { FC } from "react";
interface HeadProp {
  title: string;
  description: string;
  keywords: string;
}
const Header: FC<HeadProp> = ({ title, description, keywords }) => {
  return (
    <div>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </div>
  );
};

export default Header;
