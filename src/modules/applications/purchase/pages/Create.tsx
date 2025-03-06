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
    const requestBody: Purchase = {
      type: data.stepOne.type,
      scope: data.stepOne.scope,
      need: data.stepOne.need,
      description: data.stepOne.description,
      estimated_budget: data.stepOne.estimated_budget,
      id: null,
      responsible_condition: null,
      marco_agreement: null,
      status: [],
      prior_consultation: null,
      selected_provider: null,
      materials: null
    };

    const academicUnitId = AcademicsUnit[data.stepOne.academicUnit as keyof typeof AcademicsUnit];

    const response = await puchaseService.create({ ...requestBody }, academicUnitId as UUID);
    if (response) {
      const responseFiles = await puchaseService.uploadFiles(files, response.id as UUID);
      if (responseFiles) {
        router.push(`/solicitudes/compras/ver/${response.id}`);
      }
    }
  }

  return (
    <div className="max-w-4xl border shadow-lg p-10 rounded-md mx-auto mt-3">
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