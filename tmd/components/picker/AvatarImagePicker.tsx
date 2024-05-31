import React, { ComponentProps, useEffect, useState } from "react";
import Avatar, { AvatarVariant } from "../Avatar/Avatar";
import TextButton from "../Button/TextButton";
import ImagePickerBottomSheet from "../BottomSheet/ImagePickerBottomSheet";
import { HelperText, Stack } from "../../index";
import ImageViewerModal from "../Modal/ImageViewerModal";
import { StyleProp, View, ViewStyle } from "react-native";
import { useLocale } from "../../../src/providers/LocaleProvider";
import { usePermission } from "../../providers/PermissionProvider";
import { CAMERA_PERMISSIONS, STORAGE_PERMISSIONS } from "../../data/_permissionTypes";

interface Props {
  initialImageUrl?: string;
  emptyVariant?: AvatarVariant;
  onImageChange?: (imageUrl: string) => void;
  bsProps?: ComponentProps<typeof ImagePickerBottomSheet>;
  buttonStyle?: StyleProp<ViewStyle>;
  avatarStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  buttonTitle?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  isEditable?: boolean;
  underlineButton?: boolean
}

export default function AvatarImagePicker({
  initialImageUrl,
  emptyVariant = "icon",
  onImageChange,
  bsProps,
  buttonStyle,
  avatarStyle, style, buttonTitle,
  helperText, error, errorText, isEditable = true,
  underlineButton = false,
  ...rest
}: Props & ComponentProps<typeof Avatar>) {
  const [isOpenBS, setIsOpenBS] = useState(false);
  const [selectedImage, setSelectedImage] = useState(initialImageUrl);
  const [openImagePreview, setOpenImagePreview] = useState(false);
  const { requestPermissions } = usePermission();
  const { t } = useLocale();

  useEffect(() => {
    if (onImageChange) {
      console.log("trigger", selectedImage);
      onImageChange(selectedImage ?? "");
    }
  }, [selectedImage]);

  return (
    <>
      <Stack items={"center"} content={"center"} spacing={8} style={[style]}>
        <View>
          <Avatar
            onPress={selectedImage ? () => {
              setOpenImagePreview(true);
            } : undefined}
            {...rest}
            variant={selectedImage ? "image" : emptyVariant}
            imageUrl={selectedImage}
            style={
              [
                {
                  alignSelf: "center",
                },
                avatarStyle]}
          />
        </View>
        <Stack items={"center"} spacing={2}>
          {
            helperText &&
            <HelperText type={"info"}>{helperText}</HelperText>
          }
          {
            (error && errorText) &&
            <HelperText type={"error"}>{errorText}</HelperText>
          }
          {
            isEditable &&
            <TextButton
              underline={underlineButton}
              style={buttonStyle}
              onPress={() => {
                requestPermissions([CAMERA_PERMISSIONS, STORAGE_PERMISSIONS], () => {
                  setIsOpenBS(true);
                });
              }}>
              {buttonTitle ?? t("change_photo")}
            </TextButton>
          }
        </Stack>
      </Stack>
      <ImageViewerModal onClose={() => {
        setOpenImagePreview(false);
      }} open={openImagePreview}
        images={[{
          image: selectedImage ?? "",
        }]} />
      <ImagePickerBottomSheet
        {...bsProps}
        selectedImage={selectedImage}
        onDelete={() => {
          setSelectedImage("");
        }}
        onChangeImage={(image) => {
          setSelectedImage(image?.path);
          setIsOpenBS(false);
        }}
        open={isOpenBS} onClose={() => {
          setIsOpenBS(false);
        }} />
    </>
  );
}
