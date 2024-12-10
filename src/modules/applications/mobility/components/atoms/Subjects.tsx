import React, { useState } from 'react'
import Input from '@/components/atoms/inputs/Input';
import InputText from '@/components/atoms/inputs/InputText';

const Subjects = () => {

    interface Subject {
        extern_code: string;
        extern_name: string;
        intern_code: string;
        intern_name: string;
    }
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [newSubject, setNewSubject] = useState<Subject>({
        extern_code: '',
        extern_name: '',
        intern_code: '',
        intern_name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSubject({ ...newSubject, [name]: value });
    };

    const addSubject = () => {
        setSubjects([...subjects, newSubject]);
        setNewSubject({
            extern_code: '',
            extern_name: '',
            intern_code: '',
            intern_name: ''
        });
    };

    return (
        <div>
            <div className='space-y-2'>
                <div className='flex flex-col space-y-2'>
                <h1 className='text-lg font-semibold'>Materias por cursar en el país de destino</h1>
                    <div className='flex justify-between'>
                    <Input label='Codigo'>
                            <InputText
                                placeholder='Ingrese el código de la materia que cursará en el país de destino'
                                name='extern_code'
                            />
                        </Input>
                        <Input label='Nombre'>
                            <InputText
                                placeholder='Ingrese el nombre de la materia que cursará en el país de destino'
                                name='extern_name'
                            />
                        </Input>
                    </div>
                    <h1 className='text-lg font-semibold'>Materias reconocidas en la UdeA</h1>
                    <div className='flex flex-row justify-between'>
                        <Input label='Codigo'>
                            <InputText
                                placeholder='Ingrese el código de la materia que reconoce la UdeA'
                                name='intern_code'
                            />
                        </Input>
                        <Input label='Nombre'>
                            <InputText
                                placeholder='Ingrese el nombre de la materia que reconoce la UdeA'
                                name='intern_name'
                            />
                        </Input>
                    </div>
                </div>


                <button onClick={addSubject}>Add Subject</button>
                <ul>
                    {subjects.map((subject, index) => (
                        <li key={index}>
                            {subject.extern_code} - {subject.extern_name} - {subject.intern_code} - {subject.intern_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Subjects
