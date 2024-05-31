/**
 * Created by Widiana Putra on 06/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { Portal } from "react-native-portalize";
import { Modalize } from "../Modalize";
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, View } from "react-native";
import { Button, Divider, TextField, useTheme } from "../../index";
import { PickerItem } from "../../model/PickerItem";
import RadioButton from "../RadioButton/RadioButton";
import { useTranslation } from "react-i18next";
import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import Typography from "../Typography/Typography";
import useLayout from "../../utils/useLayout";
import { useDeepEffect } from "../../hooks/useDeepEffect";

interface Props {
  open?: boolean;
  onClose?: () => void;
  value?: string | number;
  data?: PickerItem[];
  onReset?: () => void;
  onSave?: (item?: PickerItem) => void;
  title?: string;
  search?: boolean;
  pickerMode?: "select" | "auto";
}

export default function PickerBottomSheet({
                                            pickerMode = "select",
                                            ...props
                                          }: Props & ComponentProps<typeof Modalize>) {
  const modalizeRef = useRef<Modalize>(null);
  const flatListRef = useRef<FlatList>(null);
  const [selected, setSelected] = useState();
  const [list, setList] = useState(props.data);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const { colors } = theme;
  const { t } = useTranslation();


  // const isFullHeight = props.data?.length >= 6;
  const [isFullHeight, setIsFullHeight] = useState((props?.data?.length ?? 0) > 8);
  const [contentSize, setContentSize] = useLayout();

  // useEffect(() => {
  //   // if (props?.initial) {
  //   setSelected(props?.value);
  //   // }
  // }, [props.value]);

  useEffect(() => {
    if (props.open) {
      setSelected(props?.value);
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

  useDeepEffect(() => {
    setSearchQuery("");
    setList(props.data);
  }, [props.data]);


  useDeepEffect(() => {
    if (contentSize.height > (Dimensions.get("window").height / 1.5)) {
      setIsFullHeight(true);
    }
  }, [contentSize]);


  const handleSave = (value: string) => {
    if (props.onSave) {
      const obj = props.data?.find(it => it.id == value);
      props.onSave(obj);
      if (props.onClose) {
        props?.onClose();
      }
    }
  };

  const renderItem = ({ item }) => {
    return <Pressable
      onPress={() => {
        console.log("pressed",item);
        
        setSelected(item?.id);
        if (pickerMode == "auto") {
          handleSave(item?.id);
        }
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

        <RadioButton
          containerStyle={{
            flexDirection: "row-reverse",
            flex: 1,
          }}
          text={item?.name}
          textStyle={{
            flexGrow: 1,
            color: colors.neutral.neutral_90,
          }}
          value={item?.id}
        />
      </View>
      <Divider />
    </Pressable>;
  };

  return <Portal>
    <Modalize
      adjustToContentHeight
      onClose={() => {
        setSearchQuery("");
        if (props.onClose) {
          props.onClose();
        }
      }}
      modalStyle={
        [{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: "100%",
        },
          // isFullHeight ? { flex: 1 } : {},
        ]}
      handlePosition={"inside"}
      {...props}
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
                        color={colors.danger.main}
                        labelStyle={{
                          fontFamily: theme.fonts.bold.fontFamily,
                          fontSize: 14
                        }}
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
                        placeholder={"Search"}
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
                <RadioButtonGroup
                  onValueChange={(value) => {
                    setSelected(value);
                    if (pickerMode == "auto") {
                      handleSave(value);
                    }
                  }}
                  value={selected}>
                  <FlatList
                    ref={flatListRef}
                    style={{
                      paddingHorizontal: 16,
                    }}
                    data={list}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
                  />
                </RadioButtonGroup>
              </View>
              {/*<Divider*/}
              {/*  style={{*/}
              {/*    marginTop: 0,*/}
              {/*  }}*/}
              {/*  variant={"dotted"} />*/}

              {
                pickerMode == "select" &&
                <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                  <Button
                    size={"lg"}
                    onPress={() => {
                      if (props.onSave) {
                        const obj = props.data?.find(it => it.id == selected);
                        props.onSave(obj);
                        if (props.onClose) {
                          props?.onClose();
                        }
                      }
                    }}
                    buttonStyle={{
                      width: "100%",
                    }}
                  >{t("save")}</Button>
                </View>
              }

            </View>
          </SafeAreaView>
        </View>
      }
      ref={modalizeRef}>
    </Modalize>

  </Portal>;

}
