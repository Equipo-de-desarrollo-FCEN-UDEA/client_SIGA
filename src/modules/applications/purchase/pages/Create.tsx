"use client"
import { AcademicsUnit, Purchase } from '@/core/interfaces/applications/purchases/Purchase';
import { combinedSchema, StepOneFormData } from '@/core/schemas//application/purchase/PurchaseCreateFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useStepperForm } from "@/core/hooks/useStepperForm";
import PurchaseService from '@/core/services/api/applications/purchases';
import FormStepper from '@/components/molecules/FormStepper/FormStepper';
import GeneralInfo from '@/modules/applications/purchase/components/molecules/GeneralInfo';
import Confirm from '@/modules/applications/purchase/components/molecules/Confirm';

import UploadFiles from '@/components/organisms/UploadFiles';
import { UUID } from 'crypto';



const Create = () => {
  const router = useRouter();
  const methods = useForm<Purchase>({
    resolver: zodResolver(combinedSchema),
  });
  const [files, setFiles] = useState<File[]>([]);
  const steps = ['Info. general', 'Cotizaciones', 'Confirmar'];
  const { currentStep, complete, nextStep, previusStep } = useStepperForm<Purchase>({
    methods,
    combinedSchema,
  });

  const puchaseService = new PurchaseService();

  const onSubmit = async (data: {
    stepOne: StepOneFormData;
  }) => {
    const formData = new FormData();
    formData.append('type', data.stepOne.type);
    formData.append('scope', data.stepOne.scope);
    formData.append('need', data.stepOne.need);
    formData.append('description', data.stepOne.description);
    formData.append('estimated_budget', data.stepOne.estimated_budget.toString());
    files.forEach((file) => {
      formData.append('files', file);
    });

    const academicUnitId = AcademicsUnit[data.stepOne.academicUnit as keyof typeof AcademicsUnit];

    const response = await puchaseService.create(formData, academicUnitId as UUID);
    if (response) {
      router.push(`/solicitudes/compra/ver/${response.id}`);
    }
  }

  return (
    <div className=" w-2/3 max-h-2/3 border shadow-lg p-10 rounded-md mx-auto my-3">
      <FormProvider {...methods}>
        <FormStepper
          complete={complete}
          currentStep={currentStep}
          steps={steps}
          onNext={nextStep}
          onPrevius={previusStep}
          onSubmit={onSubmit}
          handleSubmit={methods.handleSubmit}
        >
          {currentStep === 1 && <GeneralInfo />}
          {currentStep === 2 && <UploadFiles files={files} setFiles={setFiles} />}
          {currentStep === 3 && <Confirm />}
        </FormStepper>
      </FormProvider>
    </div>
  )
}
export default Create