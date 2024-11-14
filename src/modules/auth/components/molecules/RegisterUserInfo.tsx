import TextInput from "@/components/atoms/inputs/TextInput";
import SelectInput from "@/components/atoms/inputs/SelectInput";
import createUser from "@/core/interfaces/createUser";
import Faculty from "@/core/interfaces/faculty";
import { useEffect, useState } from "react";
import { UseFormRegister, FieldValues, useForm, useFormContext } from "react-hook-form";

type TypeAcademicUnit = { name: string; id: string }[];

const RegisterUserInfo = ({
  formValues,
  facultyObject,
  handleChange,
  rolId,
  academicUnitId,
  setRolId,
  setAcademicUnitId,
  register,
}: {
  formValues: createUser;
  facultyObject: {
    undergraduate: TypeAcademicUnit;
    postgraduate: TypeAcademicUnit;
    institute: TypeAcademicUnit;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  rolId: string;
  academicUnitId: string;
  setRolId: (rolId: string) => void;
  setAcademicUnitId: (academicUnitId: string) => void;
  register: UseFormRegister<FieldValues>;
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

  const { setValue } = useFormContext();

  const [faculty, setFaculty] = useState("");
  const [vinculation, setVinculation] = useState(""); // Estado para guardar la vinculación seleccionada

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setVinculation(selectedRole); // Actualiza el estado con el valor de vinculación
    setValue("vinculation", selectedRole);
    if (selectedRole === "PROFESOR") {
      setRolId(rolesId.PROFESOR);
    } else if (selectedRole === "ESTUDIANTE PREGRADO") {
      setRolId(rolesId.ESTUDIANTE_PREGRADO);
    } else if (selectedRole === "ESTUDIANTE POSGRADO") {
      setRolId(rolesId.ESTUDIANTE_POSGRADO);
    } else if (selectedRole === "ADMINISTRATIVO") {
      setRolId(rolesId.ADMINISTRATIVO);
    }
  };

  return (
    <div className="grid gap-4 my-7">
      <TextInput
        placeholder=""
        label="Correo Institucional:"
        {...register("email")}
      />
      <SelectInput
        options={facultyOptions}
        valueOptions={facultyOptions}
        label="Facultad:"
        {...register("faculty")}
      />
      <SelectInput
        value={vinculation}
        valueOptions={roleOptions}
        options={roleOptions}
        label="Vinculación:"
        onChange={(e) => {
          handleRoleChange(e);
        }}
      />
      {vinculation === "ESTUDIANTE PREGRADO" && (
        <div>
          <SelectInput
            valueOptions={facultyObject.undergraduate.map((item) => item.id)}
            options={facultyObject.undergraduate.map((item) =>
              item.name.toLocaleUpperCase()
            )}
            label="Pregrado:"
            {...register("academic_unit")}
          />
        </div>
      )}
      {vinculation === "ESTUDIANTE POSGRADO" && (
        <div>
          <SelectInput
            valueOptions={facultyObject.postgraduate.map((item) => item.id)}
            options={facultyObject.postgraduate.map((item) =>
              item.name.toLocaleUpperCase()
            )}
            {...register("academic_unit")}
            label="Posgrado:"
          />
        </div>
      )}
    </div>
  );
};

export default RegisterUserInfo;
