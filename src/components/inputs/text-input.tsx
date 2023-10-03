import { UseFormRegisterReturn } from "react-hook-form";

export const TextInput = ({
  error,
  label,
  placeholder,
  ...register
}: {
  error?: string;
  label: string;
  placeholder?: string;
} & UseFormRegisterReturn) => {
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
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-red-500">{error}</span>
        </label>
      )}
    </div>
  );
};
