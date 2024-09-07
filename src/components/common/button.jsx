import React from "react";

function Button({ name, addClass, newClass, onClick, disabled, type }) {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      disabled={disabled}
      className={
        newClass
          ? newClass
          : ` px-3 py-1.5 text-sm border bg-white hover:bg-slate-50 transition-opacity duration-500 text-gray-600 border-slate-2  00 rounded ${addClass} `
      }
    >
      {name}
    </button>
  );
}

export default Button;
