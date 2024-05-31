import type * as React from "react";
import { TagShape, TagSize } from "./components/Tag/Tag";
import { ButtonShape, ButtonSize, ButtonVariant } from "./components/Button/Button";
import { TextInputMode, TextInputShape } from "./components/TextInput/TextField";
import { AlertType } from "./components/Alert/Alert";
import { ChipShape, ChipVariant } from "./components/Chip";
import { ToastColorVariantType, ToastShape } from "./components/Toast";
import { SkeletonAnimation } from "./components/Skeleton/Skeleton";
import { ToolbarSize } from "./components/Toolbar/Toolbar";
import { BadgeShape, BadgeSize, BadgeVariant } from "./components/Badge/Badge";
import { AvatarSize, AvatarVariant } from "./components/Avatar/Avatar";

export type ColorVariantType = "success" | "warning" | "primary" | "danger" | "info" | "secondary" | "tertiary"

export type Font = {
  fontFamily: string;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
};

export type Fonts = {
  bold: Font;
  semiBold: Font;
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
};

type Mode = "adaptive" | "exact";

export type Theme = {
  dark: boolean;
  mode?: Mode;
  roundness: number;
  colors: ThemeColors;
  textInput: TextInputTheme;
  button: ButtonTheme;
  tag: TagTheme;
  fonts: Fonts;
  alert: AlertTheme;
  chip: ChipTheme;
  toast: ToastTheme;
  skeleton: SkeletonTheme;
  toolbar: ToolbarTheme;
  avatar: AvatarTheme;
  badge: BadgeTheme;
  otpInput: OTPInputTheme;
  checkbox: CheckBoxTheme;
  radioButton: RadioButtonTheme;
  switch: SwitchTheme;
  imagePicker: ImagePickerTheme;
  progressBar: ProgressBarTheme;
  tab: TabTheme;
  stepper: StepperTheme;
  animation: {
    scale: number;
  };
};

interface StepperTheme {
  colorVariant: ColorVariantType;
}

interface TabTheme {
  colorVariant: ColorVariantType;
}

interface ProgressBarTheme {
  colorVariant: ColorVariantType;
}

interface ImagePickerTheme {
  colorVariant: ColorVariantType;
}

interface SwitchTheme {
  colorVariant: ColorVariantType;
}

interface CheckBoxTheme {
  colorVariant: ColorVariantType;
}

interface RadioButtonTheme {
  colorVariant: ColorVariantType;
}

interface OTPInputTheme {
  colorVariant: ColorVariantType;
  mode: TextInputMode;
}

interface BadgeTheme {
  size: BadgeSize;
  shape: BadgeShape;
  colorVariant: BadgeVariant;
}

interface AvatarTheme {
  size: AvatarSize;
  variant: AvatarVariant;
}

interface ToolbarTheme {
  elevation: number;
  size: ToolbarSize;
}

interface SkeletonTheme {
  animation: SkeletonAnimation;
  borderRadius: number;
}

interface ToastTheme {
  colorVariant: ToastColorVariantType;
  shape: ToastShape;
}

interface ChipTheme {
  variant: ChipVariant;
  shape: ChipShape;
  colorVariant: ColorVariantType;
}

interface AlertTheme {
  colorVariant: ColorVariantType;
  type: AlertType;
}

interface TagTheme {
  shape: TagShape;
  colorVariant: ColorVariantType;
  size: TagSize;
}

interface TextInputTheme {
  shape: TextInputShape;
  mode: TextInputMode;
  colorVariant: ColorVariantType;
}

interface ButtonTheme {
  variant: ButtonVariant;
  shape: ButtonShape;
  size: ButtonSize;
  colorVariant: ColorVariantType;
}

interface BaseColorProps {
  main?: string;
  surface?: string;
  border?: string;
  hover?: string;
  pressed?: string;
}

export interface PrimaryColorProps extends BaseColorProps {
  focus?: string;
}

export interface SecondaryColorProps extends BaseColorProps {
  focus?: string;
}

export interface TertiaryColorProps extends BaseColorProps {
  focus?: string;
}

export interface DangerColorProps extends BaseColorProps {
  focus?: string;
}

export interface WarningColorProps extends BaseColorProps {
  focus?: string;
}

export interface SuccessColorProps extends BaseColorProps {
  focus?: string;
}

export interface InfoColorProps extends BaseColorProps {
  focus?: string;
}

export interface NeutralColorProps {
  neutral_10?: string,
  neutral_20?: string,
  neutral_30?: string,
  neutral_40?: string,
  neutral_50?: string,
  neutral_60?: string,
  neutral_70?: string,
  neutral_80?: string,
  neutral_90?: string,
  neutral_100?: string
}


export interface ThemeColors {
  primary: PrimaryColorProps,
  secondary: SecondaryColorProps,
  tertiary: TertiaryColorProps,
  neutral: NeutralColorProps,
  danger: DangerColorProps,
  warning: WarningColorProps,
  success: SuccessColorProps,
  info: InfoColorProps,
  background: string;
  surface: string;
  accent: string;
  error: string;
  text: string;
  onSurface: string;
  disabled: string;
  placeholder: string;
  backdrop: string;
  notification: string;

}


export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<React.ComponentPropsWithoutRef<T>,
  "children">;

export type EllipsizeProp = "head" | "middle" | "tail" | "clip";

export type ImageRatioType = "1:1" | "4:3" | "16:9" | "16:10" | "21:9";

export type GalleryItem = {
  image: string;
  title?: string;
}
