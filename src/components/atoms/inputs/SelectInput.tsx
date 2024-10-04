"use client";

/* type InputProps = {
  label?: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}; */

const SelectInput = () => {
  return (
    <>
      <select
        className="h-10 border border-gray-300 p-2 rounded w-48"
        name=""
        id=""
        value="Hola"
        aria-placeholder="fasdf"
      >
        <option value="siga">Siga</option>
      </select>
    </>
  );
};

export default SelectInput;
