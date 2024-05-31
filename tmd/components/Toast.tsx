/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import { default as ExToast, ToastOptions } from "react-native-root-toast";
import configureFonts from "../styles/fonts";
import { colors } from "../styles/colors";
import { DefaultTheme } from "../index";
import { ColorVariantType } from "../types";

export type ToastShape = "rounded" | "rect";
export type ToastColorVariantType = ColorVariantType | "default";
interface ToastOption extends ToastOptions {
  colorVariant?: ToastColorVariantType;
  shape?: ToastShape;
}

export default class Toast extends ExToast {
  static show(message: string, options?: ToastOption) {
    const theme = DefaultTheme.toast;
    const usedVariant = options?.colorVariant ?? theme.colorVariant;
    const usedShape = options?.shape ?? theme.shape;
    let borderRadius, backgroundColor, textColor = colors.neutral.neutral_10;
    if (usedShape === "rounded") {
      borderRadius = 24;
    } else {
      borderRadius = 8;
    }
    if (usedVariant === "default") {
      backgroundColor = colors.neutral.neutral_100;
    } else {
      backgroundColor = colors[usedVariant].main;
    }
    ExToast.show(message, {
      ...options,
      opacity: 1,
      shadow: true,
      backgroundColor: backgroundColor,
      textColor: textColor,
      containerStyle: { borderRadius: borderRadius, paddingVertical: 8, paddingHorizontal: 16 },
      textStyle: { ...configureFonts().regular, fontSize: 14 },
    });
  }
}
