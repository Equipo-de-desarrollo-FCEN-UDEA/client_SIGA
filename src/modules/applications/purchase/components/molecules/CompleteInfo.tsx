import SelectInput from '@/components/atoms/inputs/SelectInput';
import TextInput from '@/components/atoms/inputs/TextInput';
import FormStepper from '@/components/molecules/FormStepper/FormStepper';
import Modal from '@/components/templates/Modal'
import { useStepperForm } from '@/core/hooks/useStepperForm';
import React, { useEffect } from 'react'
import { combinedSchema, StepOneFormData, StepTwoFormData, StepThreeFormData, CombinedSchema } from '@/core/schemas//application/purchase/PurchaseCompleteFormSchema';
import { FieldErrors, Form, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PurchaseComplete } from '@/core/interfaces/applications/purchases/Purchase';
import PurchaseService from '@/core/services/api/applications/purchases';
import { UUID } from 'crypto';
interface CompleteInfoProps {
    user_application_id: UUID;
    setCompleteInfoModal: React.Dispatch<React.SetStateAction<boolean>>;

}

const CompleteInfo = ({user_application_id, setCompleteInfoModal }: CompleteInfoProps) => {
    const methods = useForm({
        resolver: zodResolver(combinedSchema),
    });

    const { errors } = methods.formState as { errors: FieldErrors<CombinedSchema> };

    const steps = ['', '', '', ''];
    const { currentStep, complete, nextStep, previusStep } = useStepperForm({
        methods,
        combinedSchema,
    });
    const puchaseService = new PurchaseService();

    useEffect(() => {
        if (methods.watch("stepThree.annualPlanIsTrue") === "false") {
            methods.setValue("stepThree.annualPlanCode", null); // Limpia el campo
            methods.clearErrors("stepThree.annualPlanCode"); // Elimina errores previos
        }
    }, [methods.watch("stepThree.annualPlanIsTrue")]);
    
    useEffect(() => {
        if (methods.watch("stepThree.bankConsultationIsTrue") === "false") {
            methods.setValue("stepThree.bankConsultationCode", null); // Limpia el campo
            methods.clearErrors("stepThree.bankConsultationCode"); // Elimina errores previos
        }
    }, [methods.watch("stepThree.bankConsultationIsTrue")]);


    const onSubmit = async (data: {
        stepOne: StepOneFormData;
        stepTwo: StepTwoFormData
        stepThree: StepThreeFormData
    }) => {
        data.stepTwo.marcoAgreement = (data.stepTwo.marcoAgreement === 'true');
        data.stepThree.annualPlanIsTrue = (data.stepThree.annualPlanIsTrue === 'true');
        data.stepThree.bankConsultationIsTrue = (data.stepThree.bankConsultationIsTrue === 'true');
        const requestBody: PurchaseComplete = {
            responsible_condition: data.stepOne.responsibleCondition,
            marco_agreement: data.stepTwo.marcoAgreement,
            prior_consultation: {
                annual_plan: {
                    is_true: data.stepThree.annualPlanIsTrue,
                    code: data.stepThree.annualPlanCode ?? null
                },
                bank_consultation: {
                    is_true: data.stepThree.bankConsultationIsTrue,
                    code: data.stepThree.bankConsultationCode ?? null
                },
                contract: data.stepThree.contract ?? null
            }
        }

        const response = await puchaseService.completePurchase(user_application_id, true, requestBody);
        if (response) {
            const file = await puchaseService.downloadFormat(user_application_id);
            window.location.reload();
        }


    }

    return (
        <Modal setModal={() => setCompleteInfoModal(false)}>
            <h2 className='text-xl font-bold text-center my-3'>Completar información de la compra</h2>
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
                    <div className='flex flex-col gap-5 my-5'>
                        {currentStep === 1 && (
                            <TextInput
                                label="Condición del responsable de la contratación:"
                                placeholder="competente:"
                                {...methods.register("stepOne.responsibleCondition")}
                                error={errors.stepOne?.responsibleCondition?.message}
                            />
                        )}

                        {currentStep === 2 && (

                            <SelectInput
                                options={['Existe', 'No Existe']}
                                valueOptions={['true', 'false']}
                                label="Verificación de contratos marco o acuerdos generales para el servicio, obra o bien requerido."
                                {...methods.register("stepTwo.marcoAgreement")}
                                error={errors.stepTwo?.marcoAgreement?.message}
                            />
                        )}

                        {currentStep === 3 && (
                            <div className='flex flex-col gap-5'>
                                <h3 className='text-md font-semibold my-3'>consulta previa en las herramientas internas de la Universidad</h3>
                                <SelectInput
                                    options={['Existe', 'No Existe']}
                                    valueOptions={['true', 'false']}
                                    label="Plan Anual de Compras"
                                    {...methods.register("stepThree.annualPlanIsTrue")}
                                    error={errors.stepThree?.annualPlanIsTrue?.message}
                                />
                                {methods.watch("stepThree.annualPlanIsTrue") === 'true' && (
                                    <TextInput
                                        label="Código de registro"
                                        placeholder="Código de registro"
                                        {...methods.register("stepThree.annualPlanCode")}
                                        error={errors.stepThree?.annualPlanCode?.message}
                                    />
                                )}
                                <SelectInput
                                    options={['Existe', 'No Existe']}
                                    valueOptions={["true", "false"]}
                                    label="Banco Universitario de Programas y Proyectos"
                                    {...methods.register("stepThree.bankConsultationIsTrue")}
                                    error={errors.stepThree?.bankConsultationIsTrue?.message}
                                />
                                {methods.watch("stepThree.bankConsultationIsTrue") === 'true' && (
                                    <TextInput
                                        label="Código de la ficha del proyecto"
                                        placeholder="Código de la ficha del proyecto"
                                        {...methods.register("stepThree.bankConsultationCode")}
                                        error={errors.stepThree?.bankConsultationCode?.message}
                                    />
                                )}
                                <TextInput
                                    label="Número del Contrato o convenio"
                                    placeholder="Número del contrato o convenio"
                                    {...methods.register("stepThree.contract")}
                                    error={errors.stepThree?.contract?.message}
                                />

                            </div>
                        )}
                    </div>
                </FormStepper>
            </FormProvider>
        </Modal>
    )
}

export default CompleteInfo