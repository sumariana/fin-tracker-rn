/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import * as yup from "yup";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button, IconButton, RHFPhoneField, RHFTextField, Toolbar } from "../../tmd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../providers/AuthProvider";
import Page from "../../tmd/components/Page";
import Stack from "../../tmd/components/Layout/Stack";
import Typography from "../../tmd/components/Typography/Typography";
import { colors } from "../../tmd/styles/colors";
import { useLocale } from "../providers/LocaleProvider";
import TextButton from "../../tmd/components/Button/TextButton";
import { navigate } from "../navigations/RootNavigation";
import TmdConstants from "../../tmd/utils/TmdConstants";
import IconLogo from "../assets/icons/icon_rounded.svg"

export default function LoginScreen() {
  const { login, isLoadingLogin } = useAuth();
  const { t } = useLocale()
  
  const schema = yup.object({
    email: yup.string().required().label(t('field.userid')),
    password: yup.string().required().label(t('field.password')),
  });

  const defaultValues = {
    email: TmdConstants.DEV_MODE == true ? "kevin@gmail.com" : "",
    password: TmdConstants.DEV_MODE == true ? "password" : "",
  };

  const method = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
    await login(data?.email, data?.password);
  };

  return (
    <Page>
      <Toolbar
        elevation={0}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
        <FormProvider {...method}>
          <Stack p={16} spacing={20} style={{
            flex: 1,
          }}>
            <Stack spacing={16}>
              <IconLogo 
              width={80}
              height={80}
              />
              <Stack spacing={8}>
                <Typography type="title1">{t('login.login_title')}</Typography>
                <Typography type="body2">{t('login.login_sub')}</Typography>
              </Stack>
            </Stack>
            <RHFTextField
              name={"email"}
              label={t("field.email")}
              placeholder={'Ex. kevin@gmail.com'}
              requiredLabel
              autoCapitalize="none"
            />
            <RHFTextField
              name={"password"}
              label={t("field.password")}
              placeholder={t('field.min_char',{value: 6})}
              requiredLabel
              password
            />
            <Stack direction="row" spacing={4}>
              <Typography type="body2">Doesn't have account yet?</Typography>
              <TextButton
                underline
                size="md"
                onPress={()=>{
                  navigate('RegisterScreen')
                }}
              >{t('login.tap_here')}</TextButton>
            </Stack>
            <Button
              loading={isLoadingLogin}
              onPress={method.handleSubmit(onSubmit)}
              size={'lg'}
              fullWidth
            >{t('login.login')}</Button>
          </Stack>
        </FormProvider>
      </ScrollView>
    </Page>
  );
}
