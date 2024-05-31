import React, { ComponentProps, Dispatch, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "../../tmd";
import { cleanCurrency, stringToCurrency, stringToNumber } from "../utils/Helper";

interface Props {
    value: string;
    id: string;
    dispatcher: Dispatch<any>
}

export default function PriceTextFieldForm({ value, id, dispatcher, ...props }: Props & ComponentProps<typeof TextField>) {
    const [temp, setTemp] = useState<string>()
    const [error, setError] = useState("")

    const onTextChange = (text: string) => {
        const cleanValue = text.replace(/[^0-9]/g, '')
        setTemp(stringToCurrency(cleanValue))
        setError(cleanValue.length == 0 ? "Value cannot be empty !" : "")
    }

    useEffect(() => {
        const cleanValue = value?.replace(/[^0-9]/g, '')
        setTemp(stringToCurrency(cleanValue))
    }, [value])

    return <TextField
        value={temp}
        onEndEditing={() => {
            const clean = cleanCurrency(temp)
            console.log("clean", clean);
            dispatcher({
                type: 'input',
                id: id,
                input: clean == "" ? null : stringToNumber(clean),
                isValid: error.length == 0
            })
        }}
        onChangeText={onTextChange}
        error={error != ""}
        errorText={error}
        {...props}
    />
}