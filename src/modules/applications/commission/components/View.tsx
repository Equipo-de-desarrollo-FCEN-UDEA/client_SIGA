import { useFormContext, useWatch } from "react-hook-form";
import { Commission } from "@/core/interfaces/applications/comission/commission";

const View = () => {
  const { control } = useFormContext();
  const formData = useWatch({ control });

  const requestBody: Commission = {
    country: formData.stepOne?.country || "",
    state: formData.stepOne?.state || "",
    city: formData.stepOne?.city || "",
    date_start: formData.stepTwo?.date_start || "",
    date_end: formData.stepTwo?.date_end || "",
    reason: formData.stepThree?.reason || "",
    justification: formData.stepThree?.justification || "",
    status: [],
    documents: formData.stepFour?.documents || [],
  };

  return (
    <div>
      <h2>Resumen de la Comisión</h2>
      <pre>{JSON.stringify(requestBody, null, 2)}</pre>
    </div>
  );
};

export default View;
