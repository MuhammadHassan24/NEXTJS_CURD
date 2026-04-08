"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { memo, useMemo, useState } from "react";

export const Input = memo(
  ({
    name,
    label,
    id,
    error,
    value,
    defaultValue,
    placeholder,
    type = "text",
    isPassword = false,
    disabled = false,
    readOnly = false,
    onChange,
    iconClass,
    className = "",
    inputClassName = "",
    wrapperClassName,
    startIcon,
    endIcon,
    field,
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = useMemo(() => {
      if (!isPassword) return type;
      return showPassword ? "text" : "password";
    }, [isPassword, showPassword, type]);

    const inputProps = field ? { ...field, ...props } : props;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName, className)}>
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-[#6b7a99]">
            {label}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <span
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b7c3]",
                disabled && "opacity-60",
                iconClass,
              )}
            >
              {startIcon}
            </span>
          )}

          <input
            {...inputProps}
            id={id}
            name={name}
            type={inputType}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
            readOnly={readOnly}
            className={cn(
              "w-full px-[18px] py-2.5 rounded-lg border-[1.5px] bg-[#f8f9fc]",
              "text-[#1a1a2e] font-[Inter,sans-serif] text-sm outline-none",
              "transition-all duration-200 placeholder:text-[#b0b7c3]",
              "focus:border-[#1A56FF]/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(26,86,255,0.1)]",
              error ? "border-[#DC2626]" : "border-[#e0e4ee]",
              disabled && "opacity-60 cursor-not-allowed",
              isPassword && "pr-10",
              startIcon && "pl-10",
              inputClassName,
            )}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200",
                error
                  ? "text-[#DC2626]"
                  : "text-[#b0b7c3] hover:text-[#6b7a99]",
              )}
              disabled={disabled}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}

          {endIcon && !isPassword && (
            <span
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-[#b0b7c3]",
                disabled && "opacity-60",
                iconClass,
              )}
            >
              {endIcon}
            </span>
          )}
        </div>

        {error && (
          <span className="text-[11px] text-[#DC2626] font-medium">
            {error}
          </span>
        )}
      </div>
    );
  },
);
