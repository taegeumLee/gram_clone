interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isFixed?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  isFixed = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "w-full p-3 font-medium rounded-xl transition-all duration-200";

  const variants = {
    primary: disabled
      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
      : "bg-sky-500 text-white hover:bg-sky-600 hover:-translate-y-0.5",
    secondary: disabled
      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: disabled
      ? "border-2 border-gray-200 text-gray-400 cursor-not-allowed"
      : "border-2 border-sky-500 text-sky-500 hover:bg-sky-50",
  };

  const fixedStyles = isFixed
    ? "fixed bottom-0 left-1/2 -translate-x-1/2 mb-6 w-[calc(100%-2rem)] max-w-screen-md shadow-sm"
    : "";

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fixedStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
