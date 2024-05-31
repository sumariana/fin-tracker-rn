/**
 * Created by Widiana Putra on 30/05/2022
 * Copyright (c) 2022 - Made with love
 */
import * as React from "react";
import { useState } from "react";
import {
  ColorValue,
  Platform,
  Pressable,
  StyleSheet,
  TextInput as NativeTextInput,
  TextStyle,
  View,
} from "react-native";
import color from "color";
import type { ChildTextInputProps, RenderProps } from "./types";
import { useTheme } from "../../core/theming";
import LabelInput from "./Label/LabelInput";
import { CircularProgressBar, HelperText } from "../../index";
import Typography from "../Typography/Typography";
import IconButton from "../IconButton";
import _countries from "../../data/_countries";
import Icon from "../Icon";

const INPUT_PADDING_HORIZONTAL = 12;
const MIN_HEIGHT = 40;
const SHAPE_RADIUS = 10;
const ROUNDED_RADIUS = 32;
const ICON_BUTTON = MIN_HEIGHT - 20;

const TextInputFilled = ({
                           disabled = false,
                           editable = true,
                           label,
                           error = false,
                           selectionColor,
                           underlineColor: _underlineColor,
                           outlineColor: customOutlineColor,
                           activeOutlineColor,
                           dense,
                           style,
                           render = (props: RenderProps) => <NativeTextInput {...props} />,
                           multiline = false,
                           parentState,
                           innerRef,
                           onFocus,
                           forceFocus,
                           onBlur,
                           onChangeText,
                           onLayoutAnimatedText,
                           onLeftAffixLayoutChange,
                           onRightAffixLayoutChange,
                           left,
                           right,
                           placeholderTextColor,
                           maxLength,
                           value,
                           errorText = "",
                           helperText,
                           suffixText,
                           suffixIcon,
                           secureTextEntry,
                           prefixIcon,
                           prefixText,
                           counter,
                           password,
                           shape,
                           initialPhoneCode,
                           colorVariant,
                           ...rest
                         }: ChildTextInputProps) => {
  const theme = useTheme();
  const [isShowPassword, setIsShowPassword] = useState(!password);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const { colors, fonts, textInput } = theme;
  const font = fonts.regular;
  const hasActiveOutline = parentState.focused || error;
  const usedColorVariant = colorVariant ?? textInput.colorVariant;
  const {
    fontSize: fontSizeStyle,
    fontWeight,
    lineHeight,
    height,
    backgroundColor = colors.neutral.neutral_10,
    textAlign,
    ...viewStyle
  } = (StyleSheet.flatten(style) || {}) as TextStyle;
  const fontSize = fontSizeStyle;

  let inputTextColor, activeColor, outlineColor, placeholderColor, errorColor, backgroundColors;

  if (disabled) {
    inputTextColor = activeColor = color(colors.neutral.neutral_60)
      .rgb()
      .string();
    placeholderColor = colors.neutral.neutral_70;
    backgroundColors = colors.neutral.neutral_30;
  } else {
    inputTextColor = colors.text;
    placeholderColor = colors.neutral.neutral_70;
    backgroundColors = error ? colors.danger.surface : parentState.focused ? colors[usedColorVariant].surface : colors.neutral.neutral_20;
  }


  const isIconButtonVisible = password || isShowSearch;
  return (
    <View style={viewStyle}>
      {
        label &&
        <LabelInput
          disabled={disabled}
          label={label}
          style={{ marginBottom: 4 }}
          required={rest.requiredLabel}
        />
      }
      <View>

        <Pressable
          onPress={() => {
            if (rest.pickerType && rest.pickerType != "phone") {
              if (!disabled) {
                // @ts-ignore
                rest.onOpenPicker();
              }
            }
          }}

          style={[
            styles.input,
            {
              paddingHorizontal: rest.pickerType == "phone" ? 0 : INPUT_PADDING_HORIZONTAL,
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
            }]}
            >
          {
            rest.search &&
            <View style={{
              flexShrink: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginRight:Platform.OS == "ios" ? 8 : 0,
            }}>
              <Icon icon={"search"} size={20} color={colors.neutral.neutral_70} />
            </View>
          }

          {
            (prefixText || prefixIcon) &&
            <View style={{
              flexShrink: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginRight:Platform.OS == "ios" ? 8 : 0,
            }}>
              {
                prefixIcon &&
                <Icon
                  color={colors.neutral.neutral_70}
                  size={18}
                  {...prefixIcon}
                />
              }
              {
                prefixText &&
                <Typography
                  type={"body2"}
                  style={{
                    color: disabled ? colors.neutral.neutral_60 : colors.neutral.neutral_90,
                  }}>
                  {prefixText}
                </Typography>
              }
            </View>
          }

          {/*Phone*/}
          {
            rest.pickerType == "phone" &&
            <PhonePicker
              initial={initialPhoneCode}
              onChange={() => {
                rest.onOpenPicker();
              }}
            />

          }

          <View
            pointerEvents={
              editable ? "auto" : "none"
            }
            style={{
              flexGrow: 1,
              flex: 1,

            }}
          >
            {render?.({
              testID: "text-input-filled",
              ...rest,
              ref: innerRef,
              onChangeText: (val) => {
                if (rest.search) {
                  setIsShowSearch(val.length > 0);
                  if (rest?.onInvokeTextChanged) {
                    rest?.onInvokeTextChanged(val);
                  }
                }
                if (onChangeText) {
                  onChangeText(val);
                }
              },
              value: value,
              maxLength: maxLength,
              secureTextEntry: !isShowPassword,
              placeholder: rest.placeholder,
              placeholderTextColor: placeholderTextColor || placeholderColor,
              editable: !disabled && editable,
              selectionColor: colors.info.border,
              onFocus,
              onBlur,
              underlineColorAndroid: "transparent",
              multiline,
              style: [
                !multiline || (multiline && height)
                  ? { height: height ?? MIN_HEIGHT }
                  : {},
                {
                  ...font,
                  fontSize,
                  fontWeight,
                  color: inputTextColor,
                  textAlignVertical: "center",
                  textAlign: textAlign
                    ? textAlign
                    : "auto",
                },
                Platform.OS === "web" && { outline: "none" },
              ],
            } as RenderProps)}
          </View>
          {
            isShowSearch &&
            <View style={{
              flexShrink: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
              <IconButton
                style={{
                  backgroundColor: "transparent",
                }}
                variant={"tertiary"}
                color={
                  colors.neutral.neutral_70
                }
                shape={"rounded"}
                onPress={() => {
                  if (rest.onClear) {
                    rest?.onClear();
                  }
                  if (rest.onInvokeTextChanged) {
                    rest?.onInvokeTextChanged("");
                  }
                  setIsShowSearch(false);
                }}
                icon={"close-circle"}
                size={ICON_BUTTON} />
            </View>

          }
          {
            password &&
            <View style={{
              flexShrink: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
              <IconButton
                style={{
                  backgroundColor: "transparent",
                }}
                variant={'tertiary'}
                color={
                  isShowPassword ? theme.colors[usedColorVariant].main : theme.colors.neutral.neutral_70
                }
                onPress={() => {
                  disabled ? null
                    : setIsShowPassword(!isShowPassword);
                }}
                icon={
                  isShowPassword ? "eye-off" :
                    "eye"}
                size={ICON_BUTTON} />
            </View>
          }

          {
            (suffixText || suffixIcon) &&
            <View style={{
              flexShrink: 1,
              display: "flex",
              paddingLeft: 4,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {
                suffixText &&
                <Typography
                  type={"body2"}
                  style={{
                    color: disabled ? colors.neutral.neutral_60 : colors.neutral.neutral_70,
                  }}>
                  {suffixText}
                </Typography>
              }

              {
                suffixIcon &&
                <Icon
                  color={colors.neutral.neutral_70}
                  size={18}
                  {...suffixIcon}
                />

              }
            </View>
          }

        </Pressable>


        <Outline
          outlineColor={parentState.focused && !error ? colors[usedColorVariant].focus : "transparent"}
          backgroundColor={backgroundColors}
          shape={shape ?? theme?.textInput?.shape}
        />

        {
          rest?.loading &&
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 8,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <CircularProgressBar
              size={"sm"}
              {...rest?.loadingProps}
            />
          </View>
        }

        {/*      marginTop: 6,*/}
        {/*      backgroundColor: backgroundColors,*/}
        {/*      borderRadius: shape*/}
        {/*        ? shape == "rect" ? 10 : 32*/}
        {/*        : theme?.textInput?.shape == "rect" ? 10 : 32,*/}
        {/*      borderWidth: 1,*/}
        {/*      borderColor: parentState.focused && !error ? colors.primary.focus : "transparent",*/}

        {/*</View>*/}
      </View>

      {
        (errorText || helperText || maxLength) &&
        <View style={{ display: "flex", flexDirection: "row", marginTop: 4 }}>
          <HelperText type={error ? "error" : "info"} style={{ flexGrow: 1, flex: 1 }}>
            {error ? errorText : helperText}
          </HelperText>

          {
            (counter && maxLength) &&
            <Typography style={{ flexShrink: 1, paddingLeft: 3, color: theme.colors.neutral.neutral_90 }}
                        type={"body3"}>
              {value?.length ?? 0} / {maxLength}
            </Typography>
          }
        </View>
      }

    </View>
  );
};

export default TextInputFilled;


type PhonePickerProps = {
  initial?: string;
  onChange?: Function;
}

const PhonePicker = ({ initial, onChange }: PhonePickerProps) => {
  const country = _countries.find((it) => it.phone_code == initial);
  const theme = useTheme();
  return <View
    style={{
      display: "flex",
      paddingLeft: INPUT_PADDING_HORIZONTAL,
      paddingRight: INPUT_PADDING_HORIZONTAL / 2,
      //marginVertical 1 because of the container border
      marginVertical: 1,
      height: MIN_HEIGHT,
      borderRightWidth: 1,
      borderRightColor: theme.colors.neutral.neutral_40,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 4,
    }}
  >
    <Pressable
      onPress={() => onChange() ?? null}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {/*<SvgUri*/}
      {/*  height={24}*/}
      {/*  width={30}*/}
      {/*  uri={country?.flag ?? ""}*/}
      {/*/>*/}
      <Typography type={'body2'}>+{country?.phone_code}</Typography>
      <Icon icon={"chevron-down"} color={theme.colors.neutral.neutral_70} size={14} />
    </Pressable>
  </View>;
};


type OutlineProps = {
  activeColor: string;
  outlineColor?: string;
  backgroundColor: ColorValue;
  shape?: string;
};

const Outline = ({
                   outlineColor,
                   backgroundColor,
                   shape,
                 }: OutlineProps) => {
  const theme = useTheme();
  const { colors } = theme;
  return <View
    testID="text-input-outline"
    pointerEvents="none"
    style={[
      styles.outline,
      {
        zIndex: 0,
        backgroundColor: backgroundColor,
        borderRadius: shape
          ? shape == "rect" ? SHAPE_RADIUS : ROUNDED_RADIUS
          : theme?.textInput?.shape == "rect" ? SHAPE_RADIUS : ROUNDED_RADIUS,
        borderWidth: 1,
        borderColor: outlineColor,

      },
    ]}
  />;
};

const styles = StyleSheet.create({
  placeholder: {
    position: "absolute",
    left: 0,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  },
  outline: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  labelContainer: {
    paddingBottom: 0,
  },
  input: {
    flexGrow: 1,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
    margin: 0,
    zIndex: 1,
  },
});
