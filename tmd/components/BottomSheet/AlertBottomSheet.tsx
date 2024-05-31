/**
 * Created by Widiana Putra on 20/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef } from "react";
import { Button,  Stack } from "../../index";
import { Modalize } from "react-native-modalize";
import Portal from "../Portal/Portal";
import { SafeAreaView, View } from "react-native";
import Typography from "../Typography/Typography";
import { useTheme } from "../../core/theming";
import { useTranslation } from "react-i18next";

export interface BSProps {
  open: boolean;
  imageNode?: React.ReactNode;
  title?: string;
  description?: string;
  buttonPrimaryTitle?: string;
  buttonSecondary?: boolean;
  buttonSecondaryTitle?: string;
  buttonPrimaryAction?: () => void;
  buttonSecondaryAction?: () => void;
  onClose: () => void;
  dismissible?: boolean;
}

export default function AlertBottomSheet({ dismissible = true, ...props }: BSProps) {
  const modalizeRef = useRef<Modalize>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (props.open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [props.open]);


  const handleClose = () => {
    props.onClose();
    modalizeRef?.current?.close();
  };


  const handleOpen = () => {
    modalizeRef?.current?.open();
  };

  const theme = useTheme();
  return (
    <Portal>
      <Modalize
        handlePosition={"inside"}
        modalStyle={{
          padding: 16,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
        onClose={props.onClose}
        closeOnOverlayTap={dismissible}
        withHandle={dismissible}
        adjustToContentHeight
        onBackButtonPress={dismissible == false
          ? () => {
            return true;
          }
          : undefined}
        tapGestureEnabled={dismissible}
        panGestureEnabled={dismissible}
        ref={modalizeRef}
      >
        <SafeAreaView style={{ flex: 1 }}>

          <View style={{
            flexDirection: "column",
            paddingVertical: 16,
          }}>
            <Stack style={{
              justifyContent: "center",
              alignItems: "center",
            }}>
              {
                props.imageNode &&
                <View style={{ paddingBottom: 16 }}>
                  {
                    props.imageNode
                  }
                </View>
              }
              {
                props.title &&
                <Typography type={"title2"} style={{ textAlign: "center" }}>{props.title}</Typography>
              }
              {
                props.description &&
                <Typography type={"body2"} style={{
                  color: theme.colors.neutral.neutral_80, textAlign: "center",
                  marginTop: 8,
                }}
                numberOfLines={5}
                ellipsizeMode="tail"
                >{props.description}</Typography>
              }
            </Stack>
            <Stack
              spacing={16}
              direction={"row"}
              style={{
                marginTop: 18,
              }}>
              {
                props.buttonSecondary &&
                <View style={{ flex: 1 }}>
                  <Button
                    fullWidth
                    variant={"secondary"}
                    onPress={() => {
                      if (props.buttonSecondaryAction) {
                        props.buttonSecondaryAction();
                      } else {
                        handleClose();
                      }
                    }}
                  >{props.buttonSecondaryTitle ?? t("cancel")}</Button>
                </View>
              }
              <Button
                fullWidth
                onPress={() => {
                  if (props.buttonPrimaryAction) {
                    props.buttonPrimaryAction();
                  } else {
                    handleClose();
                  }
                }}
              >{props.buttonPrimaryTitle ?? t("back")}</Button>

            </Stack>

          </View>
        </SafeAreaView>

      </Modalize>
    </Portal>
  );
}
