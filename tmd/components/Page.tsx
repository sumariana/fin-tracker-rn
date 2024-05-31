/**
 * Created by - on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import { useTheme } from '../core/theming';
import Color from 'color';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children: React.ReactNode;
  statusBarColor?: string;
  bgColor?: string;
}

export default function Page({ children, statusBarColor, bgColor }: Props) {
  const { colors } = useTheme();
  const statusBarHeight = StatusBar.currentHeight;
  const statusBarBackgroundColor = statusBarColor ?? colors.neutral.neutral_10;
  const isLight = Color(statusBarBackgroundColor).isLight();

  const CStatusBar = ({ backgroundColor, ...props }: any) => (
    <>
      {Platform.OS === 'ios' ? (
        <View
          style={[
            {
              height: statusBarHeight,
            },
            { backgroundColor },
          ]}>
          <SafeAreaView>
            <StatusBar
              translucent
              backgroundColor={backgroundColor}
              barStyle={isLight ? 'dark-content' : 'light-content'}
              {...props}
            />
          </SafeAreaView>
        </View>
      ) : (
        <StatusBar
          backgroundColor={backgroundColor}
          barStyle={isLight ? 'dark-content' : 'light-content'}
          {...props}
        />
      )}
    </>
  );

  return (
    <>
      {/* <CStatusBar
        backgroundColor={statusBarColor ?? colors.neutral.neutral_10}
      /> */}

      <SafeAreaView
        style={[{ flex: 1 }, bgColor ? { backgroundColor: bgColor } : {}]}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          {children}
        </KeyboardAwareScrollView>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1}}>
          {children}
        </KeyboardAvoidingView> */}
      </SafeAreaView>
    </>
  );
}
