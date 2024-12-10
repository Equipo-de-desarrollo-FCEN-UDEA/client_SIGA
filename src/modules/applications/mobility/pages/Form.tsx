import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";
import GeneralInfo from '../components/atoms/GeneralInfo';
import create from '@/core/services/api/applications/mobility';
import Time from '../components/atoms/Time';
import Contact from '../components/atoms/Contact';
import Subjects from '../components/atoms/Subjects';

const FormMobility = () => {

    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const { register, handleSubmit, reset } = useForm<Mobility>();
    const onSubmit: SubmitHandler<Mobility> = async (data) => {
        console.log(data);
        //create(data);
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 rounded-lg shadow-md max-w-lg mx-auto">
            {step === 1 && <GeneralInfo register={register} onNext={handleNext} />}
            {step === 2 && <Contact register={register} onBack={handleBack} onNext={handleNext} />}
            {step === 3 && <Subjects register={register} onBack={handleBack} />}
        </form>
    )
}

export default FormMobility
