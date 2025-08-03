import React from "react";

export default function GreenButton({ onClick, children, ...props }) {
  return (
    <button
      className="hover:bg-spruceLightGreenFoam max-h-10 min-w-10 rounded-md bg-spruceGreenFoam px-4 py-2 font-bold text-spruceDarkGreen transition-colors duration-100"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
