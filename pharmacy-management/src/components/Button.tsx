interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const Button = ({
  variant = "primary",
  title,
  className,
  onClick,
  size = "md",
}: ButtonProps) => {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base ",
    lg: "px-6 py-3 text-lg",
  };

  const variants = {
    primary: "bg-primary text-white hover:bg-teal-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    outline: "border border-primary text-primary hover:bg-primary/10",
  };

  return (
    <button
      className={`
              ${variants[variant]} 
              ${sizes[size]}
              ${className || ""}
              rounded-md transition
            `}
      onClick={onClick}
    >
      {title || "Add"}
    </button>
  );
};

export default Button;
