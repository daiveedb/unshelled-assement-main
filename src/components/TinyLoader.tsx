import React from "react";
import Loader from "react-loading";
const TinyLoader = () => {
  return (
    <div>
      <Loader type="spin" color="white" width={20} height={20} />
    </div>
  );
};

export default TinyLoader;
