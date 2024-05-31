import React, { useEffect } from "react";
import BottomSheetWrapper from "./BottomSheetWrapper";
import { Button, Stack } from "../../index";
import ImagePicker from "../picker/ImagePicker";
import { usePermission } from "../../providers/PermissionProvider";
import { CAMERA_PERMISSIONS, STORAGE_PERMISSIONS } from "../../data/_permissionTypes";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TestBS({ open, onClose }: Props) {
  const { requestPermissions } = usePermission();

  useEffect(() => {
    if (open) {
    }
  }, [open]);

  return (
    <BottomSheetWrapper
      onClose={onClose}
      open={open}
    >
      <Stack p={16}>
        <Stack>
          {/*<FlatList*/}
          {/*  data={_countries.splice(0, 2)} renderItem={({ item, index }) => {*/}
          {/*  return <Typography>{item?.name}</Typography>;*/}
          {/*}}*/}
          {/*/>*/}
          <ImagePicker
            label={"Select Image"}
            description={"Pick an image from your camera roll"}
          />
        </Stack>
        <Stack mt={16}>
          <Button buttonStyle={{ width: "100%" }} onPress={onClose}>Widiana</Button>
        </Stack>
      </Stack>
    </BottomSheetWrapper>
  );
}
