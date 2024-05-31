import React, { ComponentProps, Dispatch, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "../../tmd";

interface Props {
    id: string;
    value: string;
    dispatcher: Dispatch<any>
    required?: boolean
}

export default function TextFieldForm({ id, value, required = false, dispatcher, ...props }: Props & ComponentProps<typeof TextField>) {
    const [error, setError] = useState("")

    const onTextChange = (text: string) => {
        if(required){
            setError(text.length == 0 ? "Value cannot be empty !" : "")
        }
        dispatcher({
            type: 'input',
            id: id,
            input: text,
            isValid: error.length == 0
        })
    }
    return <TextField
        value={value}
        onChangeText={onTextChange}
        requiredLabel={required}
        error={error != ""}
        errorText={error}
        {...props}
    />
}