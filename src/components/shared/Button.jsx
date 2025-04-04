import React from "react";

export default function Button({
  children,
  variant = "default",
  size = "default",
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors hover:bg-opacity-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";

  const variantStyles = {
    default: "bg-primary-600 text-black rounded-lg shadow hover:cursor-pointer",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    icon: "h-10 w-10 p-0",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-11 px-8 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
