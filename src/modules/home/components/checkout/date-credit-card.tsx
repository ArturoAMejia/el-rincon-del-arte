"use client";

import { Input } from "@/shared/components/input/input";
import { Label } from "@/shared/components/label/label";
import type { Ref } from "react";

import { usePaymentInputs } from "react-payment-inputs";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type ExpiryDateFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
};

function assignRef<T>(ref: Ref<T> | undefined, value: T | null): void {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ref as any).current = value;
  } catch {
    // ignore
  }
}

export const ExpiryDateField = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Expiry date",
  containerClassName,
  inputClassName,
}: ExpiryDateFieldProps<TFieldValues>) => {
  const { getExpiryDateProps } = usePaymentInputs();

  return (
    <div className={containerClassName ?? "w-full space-y-3.5"}>
      <Label htmlFor="expiryDate">{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const paymentProps = getExpiryDateProps({
            onBlur: field.onBlur,
            onChange: field.onChange,
          }) as unknown as React.ComponentProps<"input"> & {
            ref?: Ref<HTMLInputElement>;
          };

          const { ref: paymentRef, id: inputId, ...expiryProps } = paymentProps;

          const mergedRef = (node: HTMLInputElement | null) => {
            assignRef(paymentRef, node);
            field.ref(node);
          };

          return (
            <div className="space-y-1">
              <Input
                id={inputId ?? "expiryDate"}
                className={inputClassName}
                {...expiryProps}
                defaultValue={field.value ?? ""}
                ref={mergedRef}
              />
              {fieldState.error ? (
                <p className="text-destructive text-sm">
                  {fieldState.error.message}
                </p>
              ) : null}
            </div>
          );
        }}
      />
    </div>
  );
};
