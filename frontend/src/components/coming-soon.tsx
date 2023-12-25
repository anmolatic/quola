import React from "react";

const ComingSoon = () => {
  return (
    <div className=" grid h-screen place-content-center bg-black">
      <div className="relative">
        <h1 className="mb-5 font-mono text-7xl font-bold text-white">
          Coming Soon
        </h1>
        <span className="w-2/2 absolute inset-x-0 -bottom-px mx-auto h-px bg-gradient-to-r from-transparent via-blue-500  to-transparent" />
      </div>
    </div>
  );
};

export default ComingSoon;
