import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = ({
  name,
  label,
  error,
  options,
  ...rest
}: SelectProps) => {
  return (
    <div className="min-w-[150px]" data-testid={`${name}-wrapper`}>
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <div
          data-testid={`${name}-error`}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </div>
      )}
    </div>
  );
};
