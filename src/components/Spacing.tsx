import React from "react";
import { View } from "react-native";

interface Props{
    size: number
}

const Spacing = ({size}: Props) => {
    return <View
    style={{
        height: size,
        width:'100%'
    }}
    />
}

export default Spacing