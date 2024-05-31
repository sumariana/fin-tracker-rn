/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Image, Keyboard, Platform, Pressable, ScrollView, View } from "react-native";
import Page from "../../tmd/components/Page";
import Stack from "../../tmd/components/Layout/Stack";
import Typography from "../../tmd/components/Typography/Typography";
import { useLocale } from "../providers/LocaleProvider";
import IconLogo from "../assets/icons/icon_rounded.svg"
import _countries from "../../tmd/data/_countries";
import { useBottomSheet } from "../../tmd/providers/BottomSheetProvider";
import { Button, Toolbar } from "../../tmd";
import { navigate } from "../navigations/RootNavigation";
import TextFieldForm from "../components/TextFieldForm";
import DatePicker from "../../tmd/components/picker/DatePicker";
import { useAuth } from "../providers/AuthProvider";
import formReducer from "../redux/formReducers/formReducers";
import moment from "moment";

export default function RegisterScreen() {
    const { t } = useLocale()
    const { showErrorBS } = useBottomSheet()
    const { register } = useAuth()
    const [formState, dispatch] = useReducer(formReducer, {
        inputValues: {
            email: "",
            name: "",
            password: "",
            repassword: "",
            phone: ""
        },
        inputValidities: {
            email: "",
            name: "",
            password: "",
            repassword: "",
            phone: ""
        },
        formIsValid: false,
        onSubmit: undefined
    });

    useEffect(() => {
        if (formState.onSubmit) {
            if (formState.formIsValid) {
                register(formState.inputValues).then(res => {
                    navigate("LoginScreen")
                })
            } else {
                console.log("form validity", formState.inputValidities);
                showErrorBS({
                    message: "Form is not valid !"
                })
            }
        }
    }, [formState.onSubmit])

    const onSubmit = async () => {
        Keyboard.dismiss()
        setTimeout(() => {
            dispatch({
                type: 'submit'
            })
        }, 200);
    };

    return (
        <Page >
            <Toolbar
                elevation={0}
            />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}>
                <Stack p={16} spacing={20}>
                    <Stack spacing={16}>
                        <IconLogo />
                        <Stack spacing={8}>
                            <Typography type="title1">{t('register.register_title')}</Typography>
                            <Typography type="body2">{t('register.register_sub')}</Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        spacing={16}
                    >
                        <TextFieldForm
                            id="email"
                            dispatcher={dispatch}
                            value={formState.inputValues.email}
                            label={'Email'}
                            keyboardType="email-address"
                            placeholder={'Ex. alex321@gmail.com'}
                        />
                        <TextFieldForm
                            id="name"
                            dispatcher={dispatch}
                            value={formState.inputValues.name}
                            label={'Full Name'}
                            autoCapitalize="words"
                            placeholder={'Ex. Alex Pedro'}
                        />
                        <TextFieldForm
                            id="phone"
                            dispatcher={dispatch}
                            value={formState.inputValues.phone}
                            label={'Phone Number'}
                            placeholder={'8515555'}
                            keyboardType="number-pad"
                            pickerType="phone"
                            initialPhoneCode="62"
                            onOpenPicker={() => {

                            }}
                        />
                        <TextFieldForm
                            id="password"
                            dispatcher={dispatch}
                            value={formState.inputValues.password}
                            label={'Password'}
                            placeholder={'Fill your password'}
                            password
                        />
                        <TextFieldForm
                            id="repassword"
                            dispatcher={dispatch}
                            value={formState.inputValues.repassword}
                            label={'Confirm password'}
                            placeholder={'Fill your password'}
                            password
                        />
                    </Stack>
                    <Stack
                        spacing={8}
                    >
                        <Button
                            loading={false}
                            onPress={onSubmit}
                            size={'lg'}
                            fullWidth
                        >Register</Button>
                        <Stack
                            direction="row"
                            self="center"
                            spacing={4}
                        >
                            <Typography>Already have an account?</Typography>
                            <Pressable
                                onPress={() => {
                                    navigate("LoginScreen")
                                }}
                            >
                                <Typography style={{
                                    textDecorationLine: 'underline'
                                }}>Sign In</Typography>
                            </Pressable>
                        </Stack>
                    </Stack>
                </Stack>
            </ScrollView>
        </Page>
    );
}
