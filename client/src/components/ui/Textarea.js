import React from "react";

const Textarea = ({ placeholder, value, onChange, className }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded w-full h-24 ${className}`}
    />
  );
};

export default Textarea;
