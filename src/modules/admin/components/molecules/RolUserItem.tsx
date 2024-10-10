import { Icon } from "@iconify/react/dist/iconify.js";

const RolUserItem = ({
  academic_unit,
  academic_rol,
}: {
  academic_unit: string;
  academic_rol: string;
}) => {
  return (
    <>
      <div>
        <p>
          {academic_unit}
          <br />{" "}
        </p>{" "}
        <strong>{academic_rol}</strong>
      </div>
      <Icon
        icon="material-symbols:delete-outline"
        className="text-xl text-red-700"
      />
    </>
  );
};

export default RolUserItem;
