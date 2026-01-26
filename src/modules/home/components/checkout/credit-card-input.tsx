"use client";

import type { Ref } from "react";
import { CreditCardIcon } from "lucide-react";
import { usePaymentInputs } from "react-payment-inputs";
import images, { type CardImages } from "react-payment-inputs/images";
import { Label } from "@/shared/components/label/label";
import { Input } from "@/shared/components/input/input";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type CardNumberFieldProps<TFieldValues extends FieldValues> = {
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

export const CardNumberField = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Número de tarjeta",
  containerClassName,
  inputClassName,
}: CardNumberFieldProps<TFieldValues>) => {
  const { meta, getCardNumberProps, getCardImageProps } = usePaymentInputs();

  return (
    <div className={containerClassName ?? "w-full max-w-xs space-y-2"}>
      <Label htmlFor="cardNumber">{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const paymentProps = getCardNumberProps({
            onBlur: field.onBlur,
            onChange: field.onChange,
          }) as unknown as React.ComponentProps<"input"> & {
            ref?: Ref<HTMLInputElement>;
          };

          const {
            ref: paymentRef,
            id: inputId,
            ...cardNumberProps
          } = paymentProps;

          const mergedRef = (node: HTMLInputElement | null) => {
            assignRef(paymentRef, node);
            field.ref(node);
          };

          return (
            <div className="space-y-1">
              <div className="relative">
                <Input
                  id={inputId ?? "cardNumber"}
                  className={inputClassName ?? "peer pr-11"}
                  {...cardNumberProps}
                  placeholder="Número de tarjeta"
                  defaultValue={field.value ?? ""}
                  ref={mergedRef}
                />
                <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
                  {meta.cardType ? (
                    <svg
                      className="w-6 overflow-hidden"
                      {...getCardImageProps({
                        images: images as unknown as CardImages,
                      })}
                    />
                  ) : (
                    <CreditCardIcon className="size-4" />
                  )}
                  <span className="sr-only">Card Provider</span>
                </div>
              </div>
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
