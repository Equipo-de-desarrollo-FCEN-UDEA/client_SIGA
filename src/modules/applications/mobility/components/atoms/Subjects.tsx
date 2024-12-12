import React, { useState } from 'react';
import Input from '@/components/atoms/inputs/Input';
import InputText from '@/components/atoms/inputs/InputText';
import { SubmitHandler, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Mobility from '@/core/interfaces/applications/mobility/mobility';
import Subject from '@/core/interfaces/applications/mobility/subject';

interface Props {
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    onBack: () => void;
    onSubmit: SubmitHandler<Mobility>;
}

const Subjects: React.FC<Props> = ({ register, setValue, onBack, onSubmit }) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [newSubject, setNewSubject] = useState<Subject>({
        extern_code: '',
        extern_name: '',
        intern_code: '',
        intern_name: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSubject({ ...newSubject, [name]: value });
    };

    const addSubject = () => {
        const updatedSubjects = [...subjects, newSubject];
        setSubjects(updatedSubjects);
        setValue('subjects', updatedSubjects); // Actualiza el valor en react-hook-form
        setNewSubject({
            extern_code: '',
            extern_name: '',
            intern_code: '',
            intern_name: '',
        });
    };

    return (
        <div>
            <div className="space-y-2">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-lg font-semibold">Materias por cursar en el país de destino</h1>
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
                    <h1 className="text-lg font-semibold">Materias reconocidas en la UdeA</h1>
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

                <button onClick={addSubject}>Agregar</button>
                <ul>
                    {subjects.map((subject, index) => (
                        <li key={index}>
                            {subject.extern_code} - {subject.extern_name} - {subject.intern_code} - {subject.intern_name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={onBack}
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Atrás
                </button>

                <button
                    onClick={() => onSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default Subjects;
