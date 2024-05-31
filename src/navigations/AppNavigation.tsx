/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { navigate, navigationRef } from "./RootNavigation";
import AppNavigationType, { MainTabNavigationType } from "./AppNavigationType";
import SplashScreen from "../screens/SplashScreens";
import { useSelector } from "react-redux";
import { rootReducer } from "../redux/stores/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/mainTabScreen/HomeScreen";
import { colors } from "../../tmd/styles/colors";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import Typography from "../../tmd/components/Typography/Typography";
import HomeIcon from '../assets/icons/home.svg';
import { useLocale } from "../providers/LocaleProvider";
import { Icon } from "../../tmd";
import AccountScreen from "../screens/mainTabScreen/AccountScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import HistoryScreen from "../screens/mainTabScreen/HistoryScreen";
import RecordMutationScreen from "../screens/RecordMutationScreen";
import BudgetScreen from "../screens/BudgetScreen";

const Tab = createBottomTabNavigator<MainTabNavigationType>();
const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<AppNavigationType>();
  const { isAuthenticated } = useSelector((state: ReturnType<typeof rootReducer>) => state.authReducer);
  const { isLoading: isLoadingSplash } = useSelector((state: ReturnType<typeof rootReducer>) => state.splashReducer);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={NavTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {
          isLoadingSplash
            ? <>
              <Stack.Screen name={"SplashScreen"} component={SplashScreen} />
            </>
            : <>
              {
                !isAuthenticated
                  ?
                  <>
                    <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
                    <Stack.Screen name={"RegisterScreen"} component={RegisterScreen} />
                  </>
                  : <>
                    <Stack.Screen name={"MainTabNavigation"} component={MainTabNavigation} />
                    <Stack.Screen name={"RecordMutationScreen"} component={RecordMutationScreen} />
                    <Stack.Screen name={"BudgetScreen"} component={BudgetScreen} />
                  </>
              }
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function MyTabBar({ state, descriptors, navigation }: any) {
  const getTabIcon = (name: string, isFocused: boolean) => {
    const usedColor = isFocused ? colors.primary.main : colors.neutral.neutral_50;
    return (
      <>
        {
          name == "HomeScreen" &&
          <>
            {
              <HomeIcon
                color={usedColor}
                width={24} height={24} />
            }
          </>
        }
        {
          name == "HistoryScreen" &&
          <>
            {
              <Icon
                size={24}
                color={usedColor}
                icon="reader-outline"
              />
            }
          </>
        }
        {
          name == "AccountScreen" &&
          <>
            {
              <Icon
                size={24}
                color={usedColor}
                icon="person-outline"
              />
            }
          </>
        }
      </>
    );
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          shadowRadius: 2,
          shadowOpacity: 0.2,
          backgroundColor: colors.neutral.neutral_10,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowColor: "black",
          elevation: 10,
        }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              key={route.name}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: "center" }}
            >
              {
                getTabIcon(route.name, isFocused)
              }
              <Typography
                type={"body3"}
                style={{
                  color: isFocused ? colors.primary.main : colors.neutral.neutral_50,
                  marginTop: 2,
                  fontWeight: '700'
                }}>
                {label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const MainTabNavigation = () => {
  const { t } = useLocale()
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: t("home"),
        }}
        name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        options={{
          tabBarLabel: t("history"),
        }}
        name={"HistoryScreen"} component={HistoryScreen} />
      <Tab.Screen
        options={{
          tabBarLabel: t("account"),
        }}
        name={"AccountScreen"} component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
