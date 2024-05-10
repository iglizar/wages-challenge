import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-black">
      <h1 className="text-6xl">404</h1>
      <p className="mt-3 text-xl">Page not found</p>
    </div>
  );
};

export default ErrorPage;
