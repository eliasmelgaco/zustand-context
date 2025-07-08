import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = ({
  children,
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  let extraClass = '';

  switch (variant) {
    case 'secondary':
      extraClass = 'text-gray-700 bg-gray-200 hover:bg-gray-300';
      break;
    case 'ghost':
      extraClass =
        'text-gray-600 bg-gray-200 hover:text-gray-900 hover:bg-gray-100';
      break;
    default:
      extraClass = 'text-white bg-blue-600 hover:bg-blue-700';
      break;
  }

  return (
    <button
      type="button"
      className={`w-full py-2 px-4 rounded transition transition-colors disabled:opacity-50 ${extraClass}`}
      {...rest}
    >
      {children}
    </button>
  );
};
