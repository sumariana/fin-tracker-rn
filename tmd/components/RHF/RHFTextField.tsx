/**
 * Created by Widiana Putra on 29/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "../TextInput/TextField";

interface Props {
  name: string;
}

export default function RHFTextField({ name, ...props }: Props & ComponentProps<typeof TextField>) {
  const { control } = useFormContext();
  return <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value }, fieldState }) => {
      return <TextField
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        error={fieldState.error != undefined}
        errorText={fieldState.error?.message}
        {...props}
      />;
    }}
  />;
}
