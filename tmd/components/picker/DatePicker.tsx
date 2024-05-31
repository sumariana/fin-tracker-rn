/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useState } from "react";
import TextField from "../TextInput/TextField";
import moment from "moment";
import { useTheme } from "../../core/theming";
import { useLocale } from "../../../src/providers/LocaleProvider";
import DatePickerBottomSheet from "../BottomSheet/DatePickerBottomSheet";
import TmdConstants from "../../utils/TmdConstants";
import 'moment/locale/en-gb'
moment.locale('en-gb')

interface Props {
  date?: string;
  onDateChanges?: (date: Date) => void;
  onDateChangesFormatted?: (date: string) => void;
  onDateChangeSendFormatted?: (date: string) => void;
  title?: string;
}


export default function DatePicker({
                                     date,
                                     onDateChanges,
                                     onDateChangesFormatted,
                                     onDateChangeSendFormatted,
                                     ...rest
                                   }: ComponentProps<typeof TextField> & Props) {
  const { t, momentLocale } = useLocale();
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const handleOpen = () => {
    setIsOpenPicker(true);
  };

  useEffect(()=>{
    console.log("selected date",date);
    setSelected(date ? moment(date,"DD-MM-YYYY").toDate() : undefined)
  },[date])

  const theme = useTheme();

  // @ts-ignore
  return (
    <>
      <TextField
        value={
          selected ? moment(selected).format("D MMMM YYYY") : undefined
        }
        pickerType={"date"}
        editable={false}
        mode={theme?.textInput?.mode}
        onOpenPicker={handleOpen}
        {...rest}
        suffixIcon={{
          icon: "ios-calendar",
          size: 18,
        }}
      />


      <DatePickerBottomSheet
        title={rest.title}
        theme={"light"}
        initDate={selected}
        onSave={(date) => {
          setSelected(date);
          if (onDateChanges) {
            onDateChanges(date);
          }
          if (onDateChangesFormatted) {
            const dateFormatted = moment(date).format("DD-MM-YYYY");
            onDateChangesFormatted(dateFormatted);
          }
          if (onDateChangeSendFormatted) {
            const dateFormatted = moment(date).format(TmdConstants.DATE_FORMAT_SEND_API);
            onDateChangeSendFormatted(dateFormatted);
          }
        }}
        open={isOpenPicker}
        onClose={() => setIsOpenPicker(false)}
      />


    </>
  );
}
