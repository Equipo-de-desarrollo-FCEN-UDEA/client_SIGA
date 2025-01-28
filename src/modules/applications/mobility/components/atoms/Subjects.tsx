import React, { useState } from "react";
import Input from "@/components/atoms/inputs/Input";
import InputText from "@/components/atoms/inputs/InputText";
import {
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";
import Subject from "@/core/interfaces/applications/mobility/subject";
import Modal from "@/components/templates/Modal";
import { CiSquarePlus } from "react-icons/ci";

interface Props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
//   onSubmit: SubmitHandler<Mobility>;
}

const Subjects: React.FC<Props> = ({
  register,
  setValue,
}) => {
  const [modal, setModal] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
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
    setValue("subjects", updatedSubjects);
    setNewSubject({
      extern_code: "",
      extern_name: "",
      intern_code: "",
      intern_name: "",
    });
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              colSpan={2}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Materias por cursar en el país de destino
            </th>
            <th
              colSpan={2}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Materias reconocidas en la UdeA
            </th>
          </tr>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Código
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-600">
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {subject.extern_code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {subject.extern_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {subject.intern_code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {subject.intern_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Input label="Materias">
        <div
          onClick={() => setModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
        >
          Agregar Materia <CiSquarePlus className="ml-2 text-lg" />
        </div>
      </Input>
      {modal && (
        <Modal setModal={() => setModal(false)}>
          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <h1 className="text-lg font-semibold">
                Materias por cursar en el país de destino
              </h1>
              <div className="flex justify-between">
                <Input label="Codigo">
                  <InputText
                    placeholder="Ingrese el código de la materia que cursará en el país de destino"
                    name="extern_code"
                    value={newSubject.extern_code}
                    onChange={handleChange}
                  />
                </Input>
                <Input label="Nombre">
                  <InputText
                    placeholder="Ingrese el nombre de la materia que cursará en el país de destino"
                    name="extern_name"
                    value={newSubject.extern_name}
                    onChange={handleChange}
                  />
                </Input>
              </div>
              <h1 className="text-lg font-semibold">
                Materias reconocidas en la UdeA
              </h1>
              <div className="flex flex-row justify-between">
                <Input label="Codigo">
                  <InputText
                    placeholder="Ingrese el código de la materia que reconoce la UdeA"
                    name="intern_code"
                    value={newSubject.intern_code}
                    onChange={handleChange}
                  />
                </Input>
                <Input label="Nombre">
                  <InputText
                    placeholder="Ingrese el nombre de la materia que reconoce la UdeA"
                    name="intern_name"
                    value={newSubject.intern_name}
                    onChange={handleChange}
                  />
                </Input>
              </div>
            </div>

            <button
              onClick={() => {
                addSubject();
                setModal(false);
              }}
            >
              Agregar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Subjects;
