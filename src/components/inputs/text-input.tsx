import { UseFormRegisterReturn } from "react-hook-form";

export const TextInput = ({
  error,
  label,
  placeholder,
  register,
  name,
  onChange,
}: {
  error?: string;
  label: string;
  placeholder?: string;
  name: string;
  register?: UseFormRegisterReturn;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        {...register}
        name={name}
        onChange={({ target: { value } }) => onChange?.(value)}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-red-500">{error}</span>
        </label>
      )}
    </div>
  );
};
