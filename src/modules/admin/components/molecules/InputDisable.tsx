"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

type InputProps = {
  label: string;
  type?: string;
  value: string;
};

const TextInput: React.FC<InputProps> = ({ label, type = "text", value }) => {
  return (
    <>
      {/* <label className="flex flex-col mb-2">
        <strong>{label}</strong>
        <input
          type={type}
          value={value}
          className="h-10 border border-gray-300 p-2 rounded w-full"
          disabled
        />
      </label> */}
      <div className="relative mb-1 w-full">
        <input
          id="inputField"
          type={type}
          className="h-10 border border-gray-300 p-2 pt-6 rounded w-full focus:outline-none"
          placeholder=" "
          value={value}
          disabled
        />

        <label
          htmlFor="inputField"
          className="absolute left-2 -top-0 text-sm text-gray-500 transition-all"
        >
          {label}
        </label>

        <Icon
          icon="material-symbols:delete-outline"
          className="absolute top-2.5 right-2 text-xl text-red-700 cursor-pointer"
        />
      </div>
    </>
  );
};

export default TextInput;
