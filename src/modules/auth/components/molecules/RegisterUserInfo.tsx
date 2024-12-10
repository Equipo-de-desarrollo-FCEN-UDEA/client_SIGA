import TextInput from "@/components/atoms/inputs/TextInput";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { StepTwoFormData } from "@/core/schemas/registerFormSchema";

type TypeAcademicUnit = { name: string; id: string }[];

const RegisterUserInfo = ({
  facultyObject,
  rolId,
  setRolId,
}: {
  facultyObject: {
    undergraduate: TypeAcademicUnit;
    postgraduate: TypeAcademicUnit;
    institute: TypeAcademicUnit;
  };
  rolId: string;
  setRolId: (rolId: string) => void;
}) => {
  const facultyOptions = ["FACULTAD DE CIENCIAS EXACTAS"];
  const roleOptions = [
    "PROFESOR",
    "ESTUDIANTE PREGRADO",
    "ESTUDIANTE POSGRADO",
    "ADMINISTRATIVO",
  ];

  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext<{stepTwo: StepTwoFormData}>();


  // Sincroniza vinculation con el formulario
  const vinculation = watch("stepTwo.vinculation", ""); 

  useEffect(() => {
    // Actualiza el rolId basado en la vinculación seleccionada
    if (vinculation === "PROFESOR") {
      setRolId(process.env.NEXT_PUBLIC_ROL_PROFESOR || "");
    } else if (vinculation === "ESTUDIANTE PREGRADO") {
      setRolId(process.env.NEXT_PUBLIC_ROL_ESTUDIANTE_PREGRADO || "");
    } else if (vinculation === "ESTUDIANTE POSGRADO") {
      setRolId(process.env.NEXT_PUBLIC_ROL_ESTUDIANTE_POSGRADO || "");
    } else if (vinculation === "ADMINISTRATIVO") {
      setRolId(process.env.NEXT_PUBLIC_ROL_ADMINISTRATIVO || "");
    }
  }, [vinculation]);

  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        label="Correo Institucional:"
        {...register("stepTwo.email")}
        error={errors.stepTwo?.email?.message}
      />

      <SelectInput
        options={facultyOptions}
        valueOptions={facultyOptions}
        label="Facultad:"
        {...register("stepTwo.faculty")}
        error={errors.stepTwo?.faculty?.message}
      />

      <SelectInput
        options={roleOptions}
        valueOptions={roleOptions}
        label="Vinculación:"
        {...register("stepTwo.vinculation", {
          onChange: (e) => {
            setValue("stepTwo.vinculation", e.target.value);
          },
        })}
        error={errors.stepTwo?.vinculation?.message}
      />

      {vinculation === "ESTUDIANTE PREGRADO" && (
        <SelectInput
          valueOptions={facultyObject.undergraduate.map((item) => item.id)}
          options={facultyObject.undergraduate.map((item) =>
            item.name.toLocaleUpperCase()
          )}
          label="Pregrado:"
          {...register("stepTwo.academic_unit")}
          error={errors.stepTwo?.academic_unit?.message}
        />
      )}
      {vinculation === "ESTUDIANTE POSGRADO" && (
        <SelectInput
          valueOptions={facultyObject.postgraduate.map((item) => item.id)}
          options={facultyObject.postgraduate.map((item) =>
            item.name.toLocaleUpperCase()
          )}
          label="Posgrado:"
          {...register("stepTwo.academic_unit")}
          error={errors.stepTwo?.academic_unit?.message}
        />
      )}
      {(vinculation === "PROFESOR" || vinculation === "ADMINISTRATIVO") && (
        <SelectInput
          valueOptions={facultyObject.institute.map((item) => item.id)}
          options={facultyObject.institute.map((item) =>
            item.name.toLocaleUpperCase()
          )}
          label="Instituto:"
          {...register("stepTwo.academic_unit")}
          error={errors.stepTwo?.academic_unit?.message}
        />
      )}
    </div>
  );
};

export default RegisterUserInfo;
