/**
 * Created by Widiana Putra on 07/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef } from "react";
import { Modalize } from "../Modalize";
import { SafeAreaView, View } from "react-native";

interface Props {
  dismissible?: boolean;
  onClose: () => void;
  open: boolean;
  children?: React.ReactNode;
}

const BottomSheetWrapper = ({ open, onClose, dismissible, ...props }: Props) => {
  const ref = useRef<Modalize>(null);
  useEffect(() => {
    if (open) {
      ref?.current?.open();
    } else {
      ref?.current?.close();
    }
  }, [open]);

  return <>
    <Modalize
      ref={ref}
      handlePosition={"inside"}
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
      modalStyle={{
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
      }}
      onClose={onClose}
      customRenderer={
        <SafeAreaView>
          <View>
            {
              props.children
            }
          </View>
        </SafeAreaView>
      }
    />
  </>;
};

export default BottomSheetWrapper;
