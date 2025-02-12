import React from "react";
import TextInput from "@/components/atoms/inputs/TextInput";
import { useFormContext } from "react-hook-form";
import { StepTwoFormData } from "@/core/schemas/mobilityCreateFormSchema";

const Contact = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    stepTwo: StepTwoFormData;
  }>();

  return (
    <div className="space-y-4">
      <TextInput
        label="Institución de destino:"
        placeholder="Ingrese la institución de destino"
        {...register("stepTwo.destination_institution")}
        error={errors.stepTwo?.destination_institution?.message}
      />
      <TextInput
        label="Programa académico:"
        placeholder="Ingrese el programa académico"
        {...register("stepTwo.academic_program")}
        error={errors.stepTwo?.academic_program?.message}
      />
      <TextInput
        label="Nombre:"
        placeholder="Ingrese el nombre del contacto en la institución de destino"
        {...register("stepTwo.name_contact_person")}
        error={errors.stepTwo?.name_contact_person?.message}
      />
      <TextInput
        label="Celular:"
        placeholder="Ingrese el celular del contacto en la institución de destino"
        {...register("stepTwo.cellphone_contact_person")}
        error={errors.stepTwo?.cellphone_contact_person?.message}
      />
      <TextInput
        label="Correo:"
        placeholder="Ingrese el correo del contacto en la institución de destino"
        {...register("stepTwo.email_contact_person")}
        error={errors.stepTwo?.email_contact_person?.message}
      />
    </div>
  );
};

export default Contact;
