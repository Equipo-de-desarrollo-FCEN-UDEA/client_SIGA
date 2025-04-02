import FileInput from '@/components/atoms/inputs/FileInput'
import { MobilityFormSchema } from '@/core/schemas/mobilityCreateFormSchema';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';

interface DocumentsProps {
    methods: UseFormReturn<MobilityFormSchema>
}

const Documents = ({methods}: DocumentsProps) => {
    const { setValue, watch, formState: { errors } } = methods;

    const admissionLetter = watch('stepThree.admissionLetter', [])
    const enrollmentCertificate = watch('stepThree.enrollmentCertificate', [])
    const insurance = watch('stepThree.insurance') || []
    const passport = watch('stepThree.passport') || []

    const type = watch('stepOne.type')

  return (
    <div>
        <FileInput 
        label="Carta de admisión" 
        name='stepThree.admissionLetter'
        files = {admissionLetter}
        setValue={setValue}
        error={errors.stepThree?.admissionLetter?.message}
        />
        <FileInput 
        label="Certificado de matrícula"
        name='stepThree.enrollmentCertificate'
        files = {enrollmentCertificate}
        setValue={setValue}
        error={errors.stepThree?.enrollmentCertificate?.message}
        />

        {type === 'Saliente Internacional' && (
        <>
          <FileInput 
            label="Seguro"
            name='stepThree.insurance'
            files={insurance}
            setValue={setValue}
            error={errors.stepThree?.insurance?.message}
          />
          <FileInput 
            label="Pasaporte"
            name='stepThree.passport'
            files={passport}
            setValue={setValue}
            error={errors.stepThree?.passport?.message}
          />
        </>
        )}
    </div>
  )
}

export default Documents