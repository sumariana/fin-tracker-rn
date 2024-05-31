import React, { useEffect } from "react";
import { Colors, Page, Stack } from "../../tmd";
import Typography from "../../tmd/components/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../tmd/styles/colors";
import IconLogo from '../assets/icons/icon_logo.svg';
import TmdConstants from "../../tmd/utils/TmdConstants";
import { getVersion } from "react-native-device-info";
import SplashScreen from "react-native-splash-screen";
import { View } from "react-native";
import { useModal } from "../../tmd/providers/ModalProvider";
import { useLocale } from "../providers/LocaleProvider";
import { usePermission } from "../../tmd/providers/PermissionProvider";
import { NOTIF_PERMISSIONS } from "../../tmd/data/_permissionTypes";

export default function SplashScreens() {

  SplashScreen.hide()
  const dispatch = useDispatch();
  const version = TmdConstants.DEV_MODE ? `${TmdConstants.STAGING_MODE ? "staging" : "dev"}-${getVersion()}` : getVersion();
  const { requestPermissions } = usePermission();
  const isFirst = useSelector(state=>state.authReducer.isFirst)

  useEffect(() => {
    requestPermissions([NOTIF_PERMISSIONS], () => {
      setTimeout(() => {
        if(isFirst){
          dispatch({
            type: "INIT",
          });
        }
        dispatch({
          type: "DONE_LOADING_SPLASH",
        });
      }, 2000);
    });
  }, []);


  return (
    <Page bgColor={colors.primary.main}>
      <Stack style={{ flex: 1 }} items={"center"} content={"center"}>
        <Typography type="h1" color={colors.neutral.neutral_10}>FinTracker</Typography>
      </Stack>
      <View style={{
        position: 'absolute',
        bottom: 16,
        width: '100%',
        alignItems: 'center'
      }}>
        <Typography style={{ color: colors.neutral.neutral_10 }}>V.{version}</Typography>
      </View>
    </Page>
  );
}
