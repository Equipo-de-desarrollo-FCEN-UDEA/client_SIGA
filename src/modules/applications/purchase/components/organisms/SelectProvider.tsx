import Modal from '@/components/templates/Modal'
import { useStepperForm } from '@/core/hooks/useStepperForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { UUID } from 'crypto'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CombinedSchema, combinedSchema } from '@/core/schemas/application/purchase/SelectProviderForm'
import FormStepper from '@/components/molecules/FormStepper/FormStepper'
import FileInput from '@/components/atoms/inputs/FileInput'
import InfoProvider from '@/modules/applications/purchase/components/molecules/InfoProvider'
import Materials from '@/modules/applications/purchase/components/molecules/Materials'
import PurchaseService from '@/core/services/api/applications/purchases'
import { Provider, PurchaseRequest, PurchaseSelectedProvider } from '@/core/interfaces/applications/purchases/Purchase'

interface SelectProviderProps {
  user_application_id: UUID,
  setSelectProviderModal: React.Dispatch<React.SetStateAction<boolean>>
}



const SelectProvider = ({ user_application_id, setSelectProviderModal }: SelectProviderProps) => {

  const methods = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      stepOne: {
        quotations: []
      },
      stepTwo: {
        marketPrices: []
      },
      stepFour: {
        materials: []
      }
    }
  });

  const { setValue, watch, formState: { errors } } = methods;
  const quotations = watch("stepOne.quotations", []);
  const marketPrices = watch("stepTwo.marketPrices", []);
  const materials = watch("stepFour.materials", []);


  const steps = ['', '', '', ''];

  const { currentStep, complete, nextStep, previusStep } = useStepperForm({
    methods,
    combinedSchema,
  });

  const purchaseService = new PurchaseService();

  const onsubmit = async (data: any) => {
    console.log(data)
    const selected_provider: Provider = {
      id: data.stepThree.providerId,
      name: data.stepThree.providerName,
      email: data.stepThree.providerEmail,
      phone: data.stepThree.providerPhone
    }

    const request: PurchaseRequest = {
      user_to_assign_id: null,
      observation: null,
      purchase_complete: null,
      selected_provider: selected_provider,
      materials: data.stepFour.materials
    }

    const response = await purchaseService.advancePurchaseStatus(request, user_application_id, true);

    if (response) {
      window.location.reload();
    }
    
  }

  return (
    <Modal setModal={() => setSelectProviderModal(false)}>
      <h2 className='text-xl font-bold text-center my-3'>Seleecionar Proveedor</h2>
      <FormProvider {...methods}>
        <FormStepper
          complete={complete}
          currentStep={currentStep}
          steps={steps}
          onNext={nextStep}
          onPrevius={previusStep}
          onSubmit={onsubmit}
          handleSubmit={methods.handleSubmit}
        >
          <div className='flex flex-col gap-5 my-5'>
              {currentStep === 1 && (
                <>
                  <FileInput
                    label="Ingrese dos cotizaciones actualizadas con fecha posterior al CDP"
                    name="stepOne.quotations"
                    files={quotations}
                    setValue={setValue}
                    error={errors.stepOne?.quotations?.message}
                  />
                </>
              )}
              {currentStep === 2 && (
                <>
                  <FileInput
                    label="Ingrese el cuadro comparativo de precios del mercado"
                    name="stepTwo.marketPrices"
                    files={marketPrices}
                    setValue={setValue}
                    error={errors.stepTwo?.marketPrices?.message}
                  />
                </>
              )}
              {currentStep === 3 && (
                <InfoProvider/>
              )}
              {currentStep === 4 && (
                <Materials 
                materials={materials} 
                setValue={setValue}
                error={methods.formState.errors.stepFour?.materials?.message}  
              />
              )}
          </div>
        </FormStepper>

      </FormProvider>
    </Modal>
  )
}

export default SelectProvider