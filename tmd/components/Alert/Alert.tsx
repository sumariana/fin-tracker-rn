/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useRef, useState } from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "../../core/theming";
import Icon from "../Icon";
import Typography from "../Typography/Typography";
import IconButton from "../IconButton";
import { ColorVariantType } from "../../types";

export type AlertType = "basic" | "outlined" | "filled"

interface Props {
  style?: StyleProp<ViewStyle>;
  colorVariant?: ColorVariantType;
  type?: AlertType;
  title?: string;
  description: string;
  dismissible?: boolean;
  iconProps?: ComponentProps<typeof Icon>;
}

export default function Alert({ title, description, dismissible, type, colorVariant, iconProps, ...rest }: Props) {
  const { colors, roundness, alert } = useTheme();
  const [isShown, setIsShown] = useState(true);
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  let backgroundColor = colors.info.surface;
  let iconName = "information-circle";
  let textColor = colors.neutral.neutral_100;
  let iconColor = colors.info.main;
  const usedVariant = colorVariant ?? alert.colorVariant;
  const usedType = type ?? alert.type;
  iconColor = colors[usedVariant].main;
  backgroundColor = colors[usedVariant].surface;
  switch (usedVariant) {
    case "success": {
      iconName = "checkmark-circle";
      break;
    }
    case "warning": {
      iconName = "warning";
      break;
    }
    case "danger": {
      iconName = "alert-circle";
      break;
    }
    case "info": {
      iconName = "information-circle";
      break;
    }
  }

  const handleDismiss = () => {
    Animated.timing(opacityAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsShown(false);
    });

  };

  if (usedType == "filled") {
    backgroundColor = iconColor;
    textColor = colors.neutral.neutral_10;
    iconColor = colors.neutral.neutral_10;
  }

  return (
    <>
      {isShown &&
        <Animated.View

          style={[
            {
              backgroundColor: backgroundColor,
              padding: 8,
              borderRadius: roundness,
              opacity: opacityAnimation,
            },
            usedType == "outlined" ? {
              borderWidth: 1,
              borderColor: iconColor,
            } : {},
            rest.style,
          ]}>
          <View
            style={{
              alignItems: title ? "flex-start" : "center",
              flexDirection: "row",

            }}>
            <View style={{ marginRight: 6 }}>
              <Icon
                icon={iconProps?.icon ?? iconName}
                color={iconProps?.color ?? iconColor}
                size={iconProps?.size ?? 18}
              />
            </View>
            <View
              style={{
                flexGrow: 1,
                flexDirection: "column",
                flex: 1,
              }}>
              {
                title &&
                <Typography
                  type={"label1"}
                  style={{
                    color: textColor,
                  }}
                >
                  {title}
                </Typography>
              }

              <Typography
                type={"body3"}
                style={{
                  color: textColor,
                }}
              >
                {description}
              </Typography>
            </View>

            <View>
              {
                (dismissible) &&
                <IconButton
                  variant={"tertiary"}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  fitIcon
                  onPress={() => {
                    // setIsShown(false);
                    handleDismiss();
                  }}

                  color={usedType == "filled" ? colors.neutral.neutral_10 : colors.neutral.neutral_80}
                  size={22}
                  icon={"close"} />
              }
            </View>

          </View>


        </Animated.View>
      }
    </>
  );
}
