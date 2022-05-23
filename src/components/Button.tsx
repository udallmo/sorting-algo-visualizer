import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  onClick,
  children,
  disabled = false,
  ...props
}) => {
  // console.log(disabled)
  return (
    <button
      className={
        `${disabled ? 'text-white bg-gray-400'
        : 'bg-gray-700 text-green-600 hover:rounded-3xl hover:text-white hover:bg-green-600 hover:font-bold'} 
        font-medium  p-4 w-full rounded-2xl my-2 transition-all duration-200 ease-linear`
      }
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
