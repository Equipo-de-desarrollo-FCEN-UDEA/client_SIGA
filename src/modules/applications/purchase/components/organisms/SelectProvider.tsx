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

  const onsubmit = (data: any) => {
    console.log(data)
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