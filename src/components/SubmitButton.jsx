import { useForm } from "../store/FormProvider";

export const SubmitButton = ({ children }) => {
  const form = useForm();
  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {children}
    </button>
  );
};
