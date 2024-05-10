import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <main className="p-4 pb-0 md:px-6">{children}</main>;
};
