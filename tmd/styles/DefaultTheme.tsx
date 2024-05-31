import configureFonts from "./fonts";
import type { Theme } from "../types";
import { colors } from "./colors";

const DefaultTheme: Theme = {
  dark: false,
  roundness: 8,
  colors: colors,
  textInput: {
    mode: "contained",
    shape: "rect",
    colorVariant: "secondary",
  },
  button: {
    variant: "primary",
    shape: "rect",
    size: "md",
    colorVariant: "primary",
  },
  tag: {
    colorVariant: "primary",
    size: "md",
    shape: "rounded",
  },
  alert: {
    colorVariant: "info",
    type: "basic",
  },
  chip: {
    variant: "filled",
    shape: "rounded",
    colorVariant: "primary",
  },
  toast: {
    colorVariant: "default",
    shape: "rect",
  },
  skeleton: {
    animation: "pulse",
    borderRadius: 8,
  },
  avatar: {
    variant: "icon",
    size: "2xl",
  },
  badge: {
    size: "md",
    shape: "rounded",
    colorVariant: "danger",
  },
  toolbar: {
    elevation: 4,
    size: "sm",
  },
  otpInput: {
    colorVariant: "primary",
    mode: "contained",
  },
  checkbox: {
    colorVariant: "primary",
  },
  radioButton: {
    colorVariant: "primary",
  },
  switch: {
    colorVariant: "primary",
  },
  imagePicker: {
    colorVariant: "primary",
  },
  progressBar: {
    colorVariant: "primary",
  },
  tab: {
    colorVariant: "primary",
  },
  stepper: {
    colorVariant: "primary",
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
