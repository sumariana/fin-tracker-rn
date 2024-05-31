/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

/**
 * USE YARN.
 * NPM IS SUCKS
 */

import React, { useEffect, useState } from "react";
import { DefaultTheme, Provider as ThemeProvider } from "./tmd";
import AppNavigation from "./src/navigations/AppNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetProvider from "./tmd/providers/BottomSheetProvider";
import { Host } from "react-native-portalize";
import PermissionProvider from "./tmd/providers/PermissionProvider";
import LocaleProvider from "./src/providers/LocaleProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./src/providers/AuthProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/stores/store";
import { PersistGate } from "redux-persist/integration/react";
import ModalProvider from "./tmd/providers/ModalProvider";
import { RootSiblingParent } from "react-native-root-siblings";
import { LogBox } from "react-native";
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { navigate } from "./src/navigations/RootNavigation";
import { log } from "react-native-reanimated";
import StorageKey from "./src/utils/StorageKey";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a client
const queryClient = new QueryClient();


const App = () => {
  const [pushNotifData, setPushNotifData] = useState(undefined)

  const handleClickItem = (data) => {
    console.log('notif data click', data)
    const id = data['id']
    const type = data['type']
  }

  useEffect(()=>{
    LogBox.ignoreAllLogs()
  },[])

  const requestNotifPermission = async () => {
    try {
      await notifee.requestPermission()
      const status = await messaging().requestPermission();
      if (status === messaging.AuthorizationStatus.AUTHORIZED || status === messaging.AuthorizationStatus.PROVISIONAL) {
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log("MESSAGE - ON NOTIFICATION OPEN APP", remoteMessage);
          handleClickItem(remoteMessage.data)
        });
        messaging().getInitialNotification().then(remoteMessage => {
          console.log("MESSAGE - INITIAL FUNCTION", remoteMessage);
          if (remoteMessage) {
            setPushNotifData(remoteMessage.data)
          }
        });
        return
      } else {
        requestNotifPermission()
      }
    } catch (err) {
      console.log("request notif permission error", err);
    }
  }

  useEffect(() => {
    requestNotifPermission()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("remove messaging", remoteMessage);
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      const data = remoteMessage.data
      if (Object.keys(data).length != 0) {
        await notifee.displayNotification({
          title: data?.title,
          body: data?.body,
          data: data,
          android: {
            channelId,
          }
        })
      } else {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          android: {
            channelId,
          }
        })
      }
    })
    return unsubscribe;
  }, []);

  useEffect(() => {
    //handle foreground events
    notifee.onForegroundEvent(({ type, detail }) => {
      if (type == EventType.PRESS) {
        handleClickItem(detail.notification?.data)
      }
    })
  }, [])

  const saveTokenToDatabase = async (token: string) => {
    await AsyncStorage.setItem(StorageKey.FIREBASE_TOKEN, token);
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        console.log('fbTokennnn === ' + token);
        return saveTokenToDatabase(token);
      })

    messaging().onTokenRefresh(token => {
      return saveTokenToDatabase(token);
    });
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>{/* content */}
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={DefaultTheme}>
              <RootSiblingParent>
                <LocaleProvider>
                  <Host>
                    <BottomSheetProvider>
                      <ModalProvider>
                        <PermissionProvider>
                          <AuthProvider>
                            <AppNavigation />
                          </AuthProvider>
                        </PermissionProvider>
                      </ModalProvider>
                    </BottomSheetProvider>

                  </Host>
                </LocaleProvider>
              </RootSiblingParent>
            </ThemeProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
