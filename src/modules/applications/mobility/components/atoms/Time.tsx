import React from 'react'

import { useForm } from "react-hook-form";
import Mobility from "@/core/interfaces/applications/mobility/mobility";

import { UseFormRegister, SubmitHandler } from "react-hook-form";

interface Props {
    register: UseFormRegister<any>;
    onBack: () => void;
    onSubmit: SubmitHandler<Mobility>;
}

const Time: React.FC<Props> = ({register, onBack, onSubmit}) => {
    return (
        <div>

            
            
        </div>
    )
}

export default Time
