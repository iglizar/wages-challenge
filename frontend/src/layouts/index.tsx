import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Container } from "./Container";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
