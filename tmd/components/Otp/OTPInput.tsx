/**
 * Created by Widiana Putra on 28/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useTheme } from "../../core/theming";
import { View } from "react-native";
import HelperText from "../HelperText";
import { TextInputMode } from "../TextInput/TextField";
import { ColorVariantType } from "../../types";

interface Props {
  helperText?: string;
  errorText?: string;
  error?: boolean;
  mode?: TextInputMode;
  colorVariant?: ColorVariantType;
}

export default function OTPInput({
                                   error, errorText, helperText, mode, colorVariant, ...rest
                                 }: Props & ComponentProps<typeof OTPInputView>) {
  const { colors, textInput, fonts, otpInput } = useTheme();
  const usedColorVariant = colorVariant ?? otpInput.colorVariant;
  const usedMode = mode ?? otpInput.mode;
  const [isError, setIsError] = useState(false);
  const borderColor = isError ? colors.danger.main : colors.neutral.neutral_60;
  const selectedBorderColor = isError ? colors.danger.main : colors[usedColorVariant].main;
  const filledBGColor = isError ? colors.danger.surface : colors[usedColorVariant].surface;
  const selectedFilledBGColor = isError ? colors.danger.surface : colors[usedColorVariant].surface;
  useEffect(() => {
    setIsError(error);
  }, [error, errorText]);

  const handleChanges = (val: string) => {
    if (isError) {
      setIsError(false);
    }
    if (rest.onCodeChanged) {
      rest.onCodeChanged(val);
    }
  };

  const Filled = () => {
    return (
      <OTPInputView
        onCodeChanged={handleChanges}
        selectionColor={colors[usedColorVariant].main}
        codeInputFieldStyle={
          [
            {
              borderWidth: 0,
              backgroundColor: filledBGColor,
              borderRadius: 8,
              color: colors.neutral.neutral_90,
              fontSize: 24,
              paddingVertical: 0,
              marginVertical: 0,
            },
            fonts.medium,
          ]
        }

        codeInputHighlightStyle={{
          backgroundColor: selectedFilledBGColor,
          borderColor: colors[usedColorVariant].border,
          borderWidth: isError ? 0 : 2,
        }}


        {...rest}
        style={[{
          width: "100%",
        }, rest.style]}
      />
    );
  };
  const Flat = () => {
    return (
      <OTPInputView
        onCodeChanged={handleChanges}
        selectionColor={colors[usedColorVariant].main}
        codeInputFieldStyle={
          [
            {
              borderWidth: 0,
              borderBottomWidth: 2,
              borderBottomColor: borderColor,
              color: colors.neutral.neutral_90,
              fontSize: 24,
              paddingVertical: 0,
              marginVertical: 0,
            },
            fonts.medium,
          ]
        }
        codeInputHighlightStyle={{
          borderBottomColor: selectedBorderColor,
          borderBottomWidth: 2,
        }}
        {...rest}
        style={[{
          width: "100%",
        }, rest.style]}
      />
    );
  };
  const Contained = () => {
    return (
      <OTPInputView
        onCodeChanged={handleChanges}
        selectionColor={colors[usedColorVariant].main}
        codeInputFieldStyle={
          [
            {
              borderRadius: 8,
              borderColor: borderColor,
              color: colors.neutral.neutral_90,
              fontSize: 24,
              paddingVertical: 0,
              marginVertical: 0,
            },
            fonts.medium,
          ]
        }
        codeInputHighlightStyle={{
          borderColor: selectedBorderColor,
          borderWidth: 2,
        }}
        {...rest}

        style={[{
          width: "100%",
        }, rest.style]}
      />
    );
  };
  return (
    <View style={{
      flexDirection: "column",
      width: "100%",
      flex: 1,
    }}>
      <View style={
        [{
          flex: 1,
          flexDirection: "row",
          position: "relative",
        }, rest.style]
      }>
        {
          Contained()
        }

      </View>
      {
        isError &&
        <HelperText type={"error"} style={{
          marginTop: 12,
        }}>{errorText}</HelperText>
      }
    </View>
  );
}
