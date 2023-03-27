import React, { FC } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutAdmin: FC<LayoutProps> = ({ children }) => {
  return <div>admin layout{children}</div>;
};

export default LayoutAdmin;
