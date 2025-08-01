import React from "react";

export default function GreenButton({ onClick, children, ...props }) {
  return (
    <button
      className="max-h-10 min-w-10 rounded-md bg-spruceDarkGreen px-4 py-2 text-white transition-colors duration-200 hover:bg-spruceGreen"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
