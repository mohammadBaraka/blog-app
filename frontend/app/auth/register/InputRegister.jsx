"use client";
import { Input, Button } from "@material-tailwind/react";

export default function InputRegister({
  type,
  label,
  register,
  name,
  variant,
  hidden,
}) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <Input
        hidden={hidden}
        size="lg"
        variant={variant}
        color="blue"
        type={type}
        label={label}
        id="File"
        name={name}
        {...register(name)}
      />
    </div>
  );
}
