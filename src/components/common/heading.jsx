import React from "react";

function Heading({ title, newClass, addClass }) {
  return (
    <h2
      className={
        newClass
          ? newClass
          : `md:text-[35px] text-[28px] font-semibold   text-center ${addClass}`
      }
    >
      {title}
    </h2>
  );
}

export default Heading;
