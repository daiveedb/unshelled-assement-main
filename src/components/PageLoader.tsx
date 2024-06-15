import React from "react";
import Loader from "react-loading";

const PageLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Loader type="bubbles" color="#032282" width={60} height={60} />
    </div>
  );
};

export default PageLoader;
