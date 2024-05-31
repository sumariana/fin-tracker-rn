/**
 * Created by Widiana Putra on 04/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useState } from "react";
import { useTheme } from "../../core/theming";
import { usePermission } from "../../providers/PermissionProvider";
import { CAMERA_PERMISSIONS, STORAGE_PERMISSIONS } from "../../data/_permissionTypes";
import { ImageBackground, Platform, View, ViewStyle } from "react-native";
import { Button, HelperText, Icon, IconButton } from "../../index";
import ImagePickerBottomSheet, { ImagePickerBSProps } from "../BottomSheet/ImagePickerBottomSheet";
import color from "color";
import { useLocale } from "../../../src/providers/LocaleProvider";
import LabelInput from "../TextInput/Label/LabelInput";
import Typography from "../Typography/Typography";
import RNFS from "react-native-fs";
import ImageViewerModal from "../Modal/ImageViewerModal";
import { ColorVariantType } from "../../types";

interface Props {
  label?: string;
  requiredLabel?: boolean;
  description?: string;
  buttonProps?: ComponentProps<typeof Button>;
  buttonTitle?: string;
  pickerTitle?: string;
  editable?: boolean;
  initialImageUrl?: string;
  error?: boolean;
  errorText?: string;
  style?: ViewStyle;
  onChangeImageUrl?: (imageUrl: string) => void;
  onChangeImageBase64?: (imageBase64: string) => void;
  colorVariant?: ColorVariantType;
}

export default function ImagePicker({
                                      initialImageUrl,
                                      buttonProps,
                                      description,
                                      buttonTitle,
                                      pickerTitle,
                                      editable = true,
                                      error,
                                      errorText,
                                      style,
                                      onChangeImageUrl,
                                      onChangeImageBase64,
                                      colorVariant,
                                      ...rest
                                    }: Props & ImagePickerBSProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowViewer, setIsShowViewer] = useState(false);
  const { colors, roundness, imagePicker } = useTheme();
  const { t } = useLocale();
  const { requestPermissions } = usePermission();
  const usedColorVariant = colorVariant ?? imagePicker.colorVariant;
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>(undefined);
  const handleOpenImagePicker = () => {
    if (Platform.OS == "android") {
      requestPermissions([CAMERA_PERMISSIONS, STORAGE_PERMISSIONS], () => {
        setIsOpen(true);
      });
    } else {
      requestPermissions([CAMERA_PERMISSIONS, STORAGE_PERMISSIONS], () => {
        setIsOpen(true);
      });
    }
  };

  useEffect(() => {
    if (onChangeImageUrl) {
      onChangeImageUrl(selectedImageUrl ?? "");
    }
    if (selectedImageUrl && onChangeImageBase64) {
      convertToBase64(selectedImageUrl, (data) => {
        onChangeImageBase64(data);
      });
    }
  }, [selectedImageUrl]);

  const convertToBase64 = async (uri: string, onSuccess: (base64: string) => void) => {
    await RNFS.readFile(uri, "base64").then((data) => {
      onSuccess(data);
    });
  };

  const handleOpenViewer = () => {
    setIsShowViewer(true);
  };

  useEffect(() => {
    if (initialImageUrl) {
      setSelectedImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);


  const ImagePlaceHolderIcon = () => {
    const size = 70;
    return (
      <View style={{
        width: size,
        height: size,
        justifyContent: "center",
        borderRadius: size / 2,
        alignItems: "center",
        backgroundColor: colors[usedColorVariant].border,
      }}>
        <Icon icon={"image"} color={colors[usedColorVariant].main} size={size / 2 + 10} />
      </View>
    );
  };

  const ImageViewerButton = () => {
    const size = 70;
    return (
      <View style={{
        width: size,
        height: size,
        justifyContent: "center",
        borderRadius: size / 2,
        alignItems: "center",
        backgroundColor: color(colors[usedColorVariant].focus).alpha(0.2).rgb().string(),
      }}>
        <IconButton
          shape={"rounded"}
          onPress={handleOpenViewer}
          size={size / 3}
          variant={"tertiary"}
          icon={"search"} />
        {/*<Icon icon={"image"} color={colors.primary.main} size={size / 2 + 10} />*/}
      </View>
    );
  };

  return (
    <>
      <ImageViewerModal
        images={[{image: selectedImageUrl ?? ""}]}
        onClose={() => {
        setIsShowViewer(false)
      }} open={isShowViewer}/>

      <ImagePickerBottomSheet
        selectedImage={selectedImageUrl}
        onDelete={() => {
          setSelectedImageUrl("");
        }}
        camera={rest.camera}
        gallery={rest.gallery}
        ratio={rest.ratio}
        crop={rest.crop}
        open={isOpen}
        onChangeImage={(image) => {
          setIsOpen(false);
          setSelectedImageUrl(image.path);
        }}
        onClose={() => {
          setIsOpen(false);
        }} />

      <View style={[style]}>
        {
          rest.label &&
          <View>
            <LabelInput
              style={{
                marginBottom: 8,
              }}
              label={rest?.label}
              required={rest?.requiredLabel} />
          </View>
        }
        <View style={{
          alignItems: "center",
          justifyContent: "center",
          height: 160,
          width: "100%",
          borderRadius: roundness,
          backgroundColor: colors[usedColorVariant].surface,
          position: "relative",
        }}>
          {
            !selectedImageUrl
              ? <ImagePlaceHolderIcon />
              : <ImageBackground
                borderRadius={roundness}
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                source={{
                  uri: selectedImageUrl,
                }}
              >
                <ImageViewerButton />
              </ImageBackground>
          }
        </View>
        <View style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {(description || errorText) &&
            <View style={{
              marginTop: 8,
            }}>
              {
                (error && errorText) &&
                <HelperText
                  style={{
                    textAlign: "center",
                  }}
                  type={"error"}>{errorText}</HelperText>
              }
              {
                description &&
                <Typography
                  type={"body3"}
                  style={{
                    textAlign: "center",
                  }}>
                  {description}
                </Typography>
              }
            </View>
          }
          {
            editable &&
            <Button
              size={buttonProps?.size ?? "sm"}
              style={{
                marginTop: 8,
              }}
              colorVariant={buttonProps?.colorVariant ?? usedColorVariant}
              variant={buttonProps?.variant ?? "secondary"}
              onPress={handleOpenImagePicker}
              {...buttonProps}
            >
              {
                buttonTitle ??
                t("pick_image")
              }
            </Button>
          }
        </View>
      </View>
    </>
  );
}
