import { useState } from "react";

export default function ContactInput({
  label,
  type = "text",
  id,
  placeholder,
  required = false,
  error,
  onChange,
  value,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full px-4 py-2 rounded-md border border-gray-400 bg-gray/50 text-gray-700
            transition-all duration-200 placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary/50
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-red-500 focus:ring-red-500/50" : "border-input"}
            ${focused ? "border-primary" : ""}
          `}
          required={required}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
