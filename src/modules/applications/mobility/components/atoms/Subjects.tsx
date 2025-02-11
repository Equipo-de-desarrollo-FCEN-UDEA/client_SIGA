import React, { useState } from "react";
import Subject from "@/core/interfaces/applications/mobility/subject";
import Modal from "@/components/templates/Modal";
import { CiSquarePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import MainButton from "@/components/atoms/buttons/MainButton";
import TextInput from "@/components/atoms/inputs/TextInput";

const Subjects = ({
  subjects,
  setSubjects,
}: {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
}) => {
  const [modal, setModal] = useState(false);
  const [newSubject, setNewSubject] = useState<Subject>({
    extern_code: "",
    extern_name: "",
    intern_code: "",
    intern_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const addSubject = () => {
    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);
    setNewSubject({
      extern_code: "",
      extern_name: "",
      intern_code: "",
      intern_name: "",
    });
  };

  const deleteSubject = (index: number) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  return (
    <div className="w-full">
      <table className="divide-y divide-gray-200 mt-6">
        <thead className="bg-gray-50">
          <tr>
            <th
              colSpan={2}
              className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
            >
              Materias por cursar en el país de destino
            </th>
            <th
              colSpan={2}
              className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
            >
              Materias reconocidas en la UdeA
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              Borrar
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {subjects.map((subject, index) => (
            <tr
              key={index}
              className={`border-b border-x border-gray-700 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <td className="px-6 py-4 text-left text-sm text-gray-700">
                {subject.extern_code}
              </td>
              <td className="px-6 py-4 text-left text-sm text-gray-700">
                {subject.extern_name}
              </td>
              <td className="px-6 py-4 text-left text-sm text-gray-700">
                {subject.intern_code}
              </td>
              <td className="px-6 py-4 text-left text-sm text-gray-700">
                {subject.intern_name}
              </td>
              <td className="px-3 py-4 flex justify-center items-center text-sm text-gray-700">
                <MdDelete
                  color="#e84848eb"
                  size="20px"
                  className="cursor-pointer"
                  onClick={() => deleteSubject(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setModal(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
        setModal(true);
          }
        }}
        className="bg-green-500 text-white cursor-pointer mt-16 px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
      >
        Agregar Materia <CiSquarePlus className="ml-2 text-lg" />
      </button>
      {modal && (
        <Modal setModal={() => setModal(false)}>
          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold">
                Materias por cursar en el país de destino
              </h2>
              <div>
                <TextInput
                  name="extern_code"
                  label="Código:"
                  placeholder="Código de la materia que cursará en el país de destino"
                  value={newSubject.extern_code}
                  onChange={handleChange}
                />
                <TextInput
                  name="extern_name"
                  label="Nombre:"
                  placeholder="Nombre de la materia que cursará en el país de destino"
                  value={newSubject.extern_name}
                  onChange={handleChange}
                />
              </div>
              <h2 className="text-lg font-semibold">
                Materias reconocidas en la UdeA
              </h2>
              <div className="mb-6">
                <TextInput
                  name="intern_code"
                  label="Código:"
                  placeholder="Código de la materia que reconoce la UdeA"
                  value={newSubject.intern_code}
                  onChange={handleChange}
                />
                <TextInput
                  name="intern_name"
                  label="Nombre:"
                  placeholder="Nombre de la materia que reconoce la UdeA"
                  value={newSubject.intern_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <MainButton
              text="Agregar"
              buttonType="button"
              onClick={() => {
                addSubject();
                setModal(false);
              }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Subjects;
