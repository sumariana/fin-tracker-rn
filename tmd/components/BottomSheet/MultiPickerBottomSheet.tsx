/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { useTheme } from "../../core/theming";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, View } from "react-native";
import { Button, Checkbox, Divider, Modalize } from "../../index";
import { Portal } from "react-native-portalize";
import { PickerItem } from "../../model/PickerItem";
import Typography from "../Typography/Typography";
import TextField from "../TextInput/TextField";
import useLayout from "../../utils/useLayout";
import { useDeepEffect } from "../../hooks/useDeepEffect";

interface Props {
  open?: boolean;
  onClose: () => void;
  value?: string[] | number[];
  data?: PickerItem[];
  onReset?: () => void;
  onSave?: (items?: PickerItem[]) => void;
  title?: string;
  search?: boolean;
}


export default function MultiPickerBottomSheet({
                                                 ...props
                                               }: Props & ComponentProps<typeof Modalize>) {
  const modalizeRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState<string[] | number[]>([]);
  const [list, setList] = useState(props.data);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const { colors } = theme;
  const { t } = useTranslation();

  const [isFullHeight, setIsFullHeight] = useState((props?.data?.length ?? 0) > 8);
  const [contentSize, setContentSize] = useLayout();

  useDeepEffect(() => {
    if (contentSize.height > (Dimensions.get("window").height / 1.5)) {
      setIsFullHeight(true);
    }
  }, [contentSize]);

  useEffect(() => {
    if (props.open) {
      if (props?.value) {
        setSelected(props?.value);
      }
      setSearchQuery("");
      modalizeRef?.current?.open();
    } else {
      modalizeRef?.current?.close();
    }
  }, [props.open]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setList(props?.data?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setList(props.data);
    }
  }, [searchQuery]);

  const handleSelected = (id: number | string) => {
    const arr = [...selected];
    if (arr?.includes(id)) {
      const index = arr.indexOf(id);
      if (index !== -1) {
        arr.splice(index, 1);
      }
    } else {
      arr.push(id);
    }
    setSelected(arr);
  };

  const renderItem = ({ item }) => {
    return <Pressable
      onPress={() => {
        handleSelected(item?.id);
      }}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 8, flex: 1 }}>
        {
          item?.image &&
          <View style={{ marginRight: 8 }}>
            {/*<Typography>{item?.image}</Typography>*/}
            <Image
              source={{ uri: item?.image }}
              resizeMode={"center"}
              style={{
                width: 24,
                height: 24,
              }} />

          </View>
        }

        <Checkbox
          checked={selected?.includes(item?.id)}
          containerStyle={{
            flexDirection: "row-reverse",
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 4,
          }}
          text={item?.name}
          textStyle={{
            flexGrow: 1,
            color: colors.neutral.neutral_90,
            marginLeft: 0,
          }}
        />
      </View>
      <Divider />
    </Pressable>;
  };
  return <Portal>
    <Modalize
      adjustToContentHeight={!isFullHeight}
      modalStyle={
        [{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
          isFullHeight ? { flex: 1 } : {},
        ]}
      handlePosition={"inside"}
      customRenderer={
        <View
          style={
            isFullHeight && {
              height: "100%",
            }
          }
        >
          <SafeAreaView style={{ flex: isFullHeight ? 1 : 0 }}>
            <View
              onLayout={setContentSize}
              style={{
                flex: isFullHeight ? 1 : 0,
              }}
            >
              <View
                style={{ flexDirection: "column", paddingTop: 24, paddingBottom: 8 }}>

                <View
                  style={{ flexDirection: "column", paddingHorizontal: 16 }}>

                  <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <Typography type={"title2"}>{props.title ?? "Pick Data"}</Typography>
                    {
                      props.onReset &&
                      <Button
                        size={"sm"}
                        variant={"secondary"}
                        onPress={props?.onReset}
                      >
                        {t("reset")}
                      </Button>
                    }
                  </View>
                  {props.search &&
                    <View style={{ marginTop: 8 }}>
                      <TextField
                        onInvokeTextChanged={(text) => {
                          setSearchQuery(text);
                        }}
                        search
                        placeholder={t("search")}
                      />
                    </View>
                  }
                </View>
              </View>

              <View
                style={{
                  flex: isFullHeight ? 1 : 0,
                  // flexGrow: 1,
                  flexShrink: 1,
                }}
              >
                <FlatList
                  style={{
                    paddingHorizontal: 16,
                  }}
                  data={list}
                  keyExtractor={(item) => item.name}
                  renderItem={renderItem}
                />
              </View>

              <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                <Button
                  size={"lg"}
                  onPress={() => {
                    if (props.onSave) {
                      const objs = props?.data?.filter((item) => selected.includes(item?.id));
                      props.onSave(objs);
                      props.onClose();
                    }
                  }}
                  buttonStyle={{
                    width: "100%",
                  }}
                >{t("save")}</Button>
              </View>

            </View>
          </SafeAreaView>

        </View>
      }
      {...props}
      onClose={() => {
        setSearchQuery("");
        if (props.onClose) {
          props.onClose();
        }
      }}
      ref={modalizeRef}>
    </Modalize>

  </Portal>;

}
