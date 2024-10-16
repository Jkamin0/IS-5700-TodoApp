import { useForm } from "./FormProvider";

export const useNumberInputReturn = ({ label, name }) => {
  const form = useForm();

  return (
    <label>
      {label}
      <input
        name={name}
        onChange={(e) => form.setValue(name, e.target.value)}
      />
    </label>
  );
};
