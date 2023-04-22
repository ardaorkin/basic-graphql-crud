import * as React from "react";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelDirection?: string;
}

export function Input({ label, labelDirection = "row", ...rest }: IInputProps) {
  return (
    <div className="flex-row space-y-8 flex">
      <label htmlFor={rest.id}>
        {label}
        {": "}

        <input
          {...rest}
          className="w-48 border-b-2 focus:border-indigo-600 focus:outline-none rounded"
        />
      </label>
    </div>
  );
}
