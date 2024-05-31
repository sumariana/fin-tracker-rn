import React, { ReactNode, useState } from "react";
import Typography from "../Typography/Typography";
import { IconButton, Stack, Surface, useTheme } from "../../index";
import Color from "color";
import { View } from "react-native";
import { goBack, navigationRef } from "../../../src/navigations/RootNavigation";
import { color } from "react-native-reanimated";

export type ToolbarSize = "sm" | "md" | "lg";

interface Props {
  title?: string;
  description?: string;
  backgroundColor?: string;
  center?: boolean;
  backable?: boolean;
  size?: ToolbarSize;
  actionButton?: ReactNode;
  elevation?: number;
  backIconName?: string
  roundedContainer?: boolean;
  customBackAction?: ()=>void;
  backIconBackgroundColor?: string
}

const smHeight = 64;
const mdHeight = 116;
const lgHeight = 156;

export default function Toolbar({
  title,
  description,
  backgroundColor,
  backable = true,
  center,
  size,
  actionButton,
  elevation,
  roundedContainer = false,
  customBackAction,
  backIconBackgroundColor,
  ...rest
}: Props) {
  const { colors, toolbar } = useTheme();
  const usedBg = backgroundColor ?? colors.neutral.neutral_10;
  const isLight = Color(usedBg).isLight();
  const usedTitleColor = isLight || roundedContainer ? colors.neutral.neutral_100 : colors.neutral.neutral_10;
  const usedDescColor = isLight || roundedContainer ? colors.neutral.neutral_80 : colors.neutral.neutral_10;
  const isShowBack = (backable && navigationRef.canGoBack()) || customBackAction;
  const [iconViewWidth, setIconViewWidth] = useState(0);
  const [actionButtonWidth, setActionButtonWidth] = useState(0);

  const usedSize = size ?? toolbar.size;
  const usedElevation = elevation ?? toolbar.elevation;
  const usedBackIconBackgroundColor = backIconBackgroundColor ?? colors.neutral.neutral_10

  const SmToolbar = () => {
    return (
      <View
      style={{
        backgroundColor:'transparent'
      }}
      >
        <Stack
          spacing={16}
          direction={"row"}
          items={"center"}
          style={{
            backgroundColor: usedBg,
            paddingHorizontal: 16,
            height: smHeight,
            
            // paddingVertical: isShowBack ? 12 : 16,
          }}>
          {
            isShowBack &&
            (
              <Surface
                elevation={roundedContainer ? 1 : 0}
                style={{
                  justifyContent:'center',
                  alignItems:'center',
                  backgroundColor: usedBackIconBackgroundColor,
                  borderRadius:20,
                  width:40,
                  height:40,
                  shadowOffset: {
                    height: 0,
                    width: 0
                  }
                }}
                onLayout={(event) => {
                  setIconViewWidth(event.nativeEvent.layout.width);
                }}>
                <IconButton
                  shape={"rounded"}
                  onPress={() => {
                    customBackAction ? customBackAction() : goBack()
                  }}
                  variant="primary"
                  fitIcon={false}
                  size={24}
                  icon={rest.backIconName ?? "arrow-back"} color={usedTitleColor} style={{
                    backgroundColor: "transparent",
                    
                  }} />
              </Surface>
            )
          }
          <View style={{
            flex: 1,
          }}>
            <Stack
              direction={"column"}
              spacing={2}
              style={
                [
                  { flex: 1, flexGrow: 1 },
                  { justifyContent: "center" },
                  center && { alignItems: "center", justifyContent: "center" },
                  (isShowBack && center) && {
                    marginLeft: -iconViewWidth - 16,
                  },
                  (actionButton != undefined && center) && {
                    marginLeft: actionButtonWidth - 16,
                  },
                ]
              }>
              <Typography
                numberOfLines={1}
                ellipsizeMode={"tail"}
                type={"title2"}
                style={{ color: usedTitleColor }}>{title}</Typography>
              {
                description &&
                <Typography
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  type={"body3"} style={{ color: usedDescColor }}>{description} </Typography>
              }
            </Stack>
          </View>
          {
            actionButton &&
            <View onLayout={(e) => {
              setActionButtonWidth(e.nativeEvent.layout.width);
            }}>
              {actionButton}
            </View>
          }
        </Stack>
      </View>
    );
  };

  const MdToolbar = () => {
    return (
      <Stack
        style={{
          height: mdHeight,
          backgroundColor: usedBg,
        }}>
        <Stack
          direction={"row"}
          style={{
            padding: 16,
            flexGrow: 1,
          }} spacing={16}>
          {
            isShowBack &&
            (
              <View onLayout={(event) => {
                setIconViewWidth(event.nativeEvent.layout.width);
              }}
                style={{
                  flexGrow: 1,
                }}
              >
                <IconButton
                  shape={"rounded"}
                  onPress={() => {
                    goBack();
                  }}
                  fitIcon={false}
                  icon={"arrow-back"} color={usedTitleColor} style={{
                    backgroundColor: "transparent",
                    marginLeft: -8,
                  }} />
              </View>
            )
          }
          {
            actionButton &&
            <View onLayout={(e) => {
              setActionButtonWidth(e.nativeEvent.layout.width);
            }}>
              {actionButton}
            </View>
          }
        </Stack>
        <Stack style={{
          paddingHorizontal: 16,
          paddingBottom: 8,
        }} direction={"column"} spacing={2}>
          <Typography
            numberOfLines={1}
            ellipsizeMode={"tail"}
            type={"title1"}
            style={{ color: usedTitleColor }}>{title}</Typography>
          {
            description &&
            <Typography
              numberOfLines={1}
              ellipsizeMode={"tail"}
              type={"body3"} style={{ color: usedDescColor }}>{description} </Typography>
          }
        </Stack>
      </Stack>
    );
  };

  const LgToolbar = () => {
    return (
      <Stack
        style={{
          height: lgHeight,
          backgroundColor: usedBg,
        }}>
        <Stack direction={"row"} style={{
          padding: 16,
          flexGrow: 1,
        }} spacing={16}>
          {
            isShowBack &&
            (
              <View
                style={{ flexGrow: 1 }}
                onLayout={(event) => {
                  setIconViewWidth(event.nativeEvent.layout.width);
                }}>
                <IconButton
                  shape={"rounded"}
                  onPress={() => {
                    goBack();
                  }}
                  fitIcon={false}
                  icon={"arrow-back"} color={usedTitleColor} style={{
                    backgroundColor: "transparent",
                    marginLeft: -8,
                  }} />
              </View>
            )
          }

          {actionButton &&
            <View onLayout={(e) => {
              setActionButtonWidth(e.nativeEvent.layout.width);
            }}>
              {actionButton}
            </View>
          }
        </Stack>
        <Stack style={{
          paddingHorizontal: 16,
          paddingBottom: 8,
        }} direction={"column"} spacing={2}>
          <Typography
            numberOfLines={1}
            ellipsizeMode={"tail"}
            type={"h2"}
            style={{ color: usedTitleColor }}>{title}</Typography>
          {
            description &&
            <Typography
              numberOfLines={1}
              ellipsizeMode={"tail"}
              type={"body3"} style={{ color: usedDescColor }}>{description} </Typography>
          }
        </Stack>
      </Stack>
    );
  };
  return (
    <Surface elevation={usedElevation} style={{ zIndex: 10,backgroundColor:'transparent' }}>
      {
        usedSize == "sm" &&
        <View style={{ width: "100%",backgroundColor:'transparent' }}>
          <SmToolbar />
        </View>
      }

      {
        usedSize == "md" &&
        <MdToolbar />
      }

      {
        usedSize == "lg" &&
        <LgToolbar />
      }
    </Surface>
  );
}
