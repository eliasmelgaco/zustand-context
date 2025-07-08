import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({
  name,
  label,
  error,
  type = 'text',
  ...rest
}: InputProps) => {
  return (
    <div data-testid={`${name}-wrapper`}>
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
      />
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
