import TextInput from "@/components/atoms/inputs/TextInput";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

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

  const rolesId = {
    PROFESOR: "007cafea-5b30-48bd-9cc6-f6c8e3b43815",
    ESTUDIANTE_PREGRADO: "939875b2-3e34-4a17-9f3c-76cabba73f52",
    ESTUDIANTE_POSGRADO: "1ca355db-8700-4ee7-883b-18b8bbed403b",
    ADMINISTRATIVO: "ea81184e-952c-4eb2-a01f-fc2ec6e8b876",
  };

  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  // Sincroniza vinculation con el formulario
  const vinculation = watch("stepTwo.vinculation", ""); 

  useEffect(() => {
    // Actualiza el rolId basado en la vinculación seleccionada
    if (vinculation === "PROFESOR") {
      setRolId(rolesId.PROFESOR);
    } else if (vinculation === "ESTUDIANTE PREGRADO") {
      setRolId(rolesId.ESTUDIANTE_PREGRADO);
    } else if (vinculation === "ESTUDIANTE POSGRADO") {
      setRolId(rolesId.ESTUDIANTE_POSGRADO);
    } else if (vinculation === "ADMINISTRATIVO") {
      setRolId(rolesId.ADMINISTRATIVO);
    }
  }, [vinculation]);

  return (
    <div className="grid gap-4 my-7">
      {/* Correo Institucional */}
      <TextInput
        placeholder=""
        label="Correo Institucional:"
        {...register("stepTwo.email")}
        error={(errors.stepTwo as any)?.email?.message}
      />

      {/* Facultad */}
      <SelectInput
        options={facultyOptions}
        valueOptions={facultyOptions}
        label="Facultad:"
        {...register("stepTwo.faculty")}
        error={(errors.stepTwo as any)?.faculty?.message}
      />

      {/* Vinculación */}
      <SelectInput
        options={roleOptions}
        valueOptions={roleOptions}
        label="Vinculación:"
        {...register("stepTwo.vinculation", {
          onChange: (e) => {
            setValue("stepTwo.vinculation", e.target.value);
          },
        })}
        error={(errors.stepTwo as any)?.vinculation?.message}
      />

      {/* Campos Condicionales */}
      {vinculation === "ESTUDIANTE PREGRADO" && (
        <SelectInput
          valueOptions={facultyObject.undergraduate.map((item) => item.id)}
          options={facultyObject.undergraduate.map((item) =>
            item.name.toLocaleUpperCase()
          )}
          label="Pregrado:"
          {...register("stepTwo.academic_unit")}
          error={(errors.stepTwo as any)?.academic_unit?.message}
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
          error={(errors.stepTwo as any)?.academic_unit?.message}
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
          error={(errors.stepTwo as any)?.academic_unit?.message}
        />
      )}
    </div>
  );
};

export default RegisterUserInfo;
