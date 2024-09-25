import React, { Children } from "react";
// import { Props } from "react-select";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col border border-zinc-100 w-full p-2 space-y-2 bg-white rounded-md h-auto">
        {children}
      </div>
    </>
  );
};

export default Card;
