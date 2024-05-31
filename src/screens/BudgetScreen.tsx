import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useReducer } from "react";
import AppNavigationType from "../navigations/AppNavigationType";
import { Button, Page, Stack, Surface, TextField, Toast, Toolbar } from "../../tmd";
import { Keyboard, ScrollView, View } from "react-native";
import formReducer from "../redux/formReducers/formReducers";
import PriceTextFieldForm from "../components/PriceTextFieldForm";
import { useBottomSheet } from "../../tmd/providers/BottomSheetProvider";
import useMutationActions from "../redux/actions/useMutationActions";
import { goBack } from "../navigations/RootNavigation";
import { colors } from "../../tmd/styles/colors";
import Typography from "../../tmd/components/Typography/Typography";
import { useAuth } from "../providers/AuthProvider";
import Avatar from "../../tmd/components/Avatar/Avatar";

export default function BudgetScreen({ route }: NativeStackScreenProps<AppNavigationType, "BudgetScreen">) {
    const { showErrorBS } = useBottomSheet()
    const { createMutation } = useMutationActions()
    const { getUserProfile, updateUserBudget } = useAuth()
    const [formState, dispatch] = useReducer(formReducer, {
        inputValues: {
            value: null,
            user: undefined
        },
        inputValidities: {
            value: false,
            user: false
        },
        formIsValid: false,
        onSubmit: undefined
    })

    useEffect(() => {
        if (formState.onSubmit) {
            if (formState.formIsValid) {
                updateUserBudget({
                    budget: formState.inputValues.value
                }).then(res => {
                    Toast.show("Success update Budget")
                    goBack()
                })
            } else {
                console.log("form validity", formState.inputValidities);
                showErrorBS({
                    message: "Form is not valid !"
                })
            }
        }
    }, [formState.onSubmit])

    useEffect(() => {
        getUserProfile().then(res => {
            dispatch({
                type: 'input',
                id: "user",
                input: res,
                isValid: true
            })
            dispatch({
                type: 'input',
                id: "value",
                input: res.budget,
                isValid: true
            })
        })
    }, [])

    const onSubmit = () => {
        Keyboard.dismiss()
        setTimeout(() => {
            dispatch({
                type: 'submit'
            })
        }, 200);
    }

    return <Page>
        <Toolbar
            title={"Budget Setting"}
            backgroundColor={colors.primary.main}
            backIconBackgroundColor={colors.primary.main}
        />
        <ScrollView
            style={{
                flex: 1
            }}
            contentContainerStyle={{
                flexGrow: 1
            }}
        >
            <Stack
                style={{
                    flex: 1,
                }}
                spacing={16}
            >
                <View
                    style={{
                        width: '100%',
                        height: 60,
                        backgroundColor: colors.primary.main,
                        borderBottomEndRadius: 20,
                        borderBottomStartRadius: 20,
                        position: 'absolute'
                    }}
                />
                <Surface
                    elevation={3}
                    style={{
                        margin: 16,
                        borderRadius: 10,
                    }}
                >
                    <Stack
                        direction="row"
                        ph={16}
                        pt={16}
                        pb={8}
                        spacing={12}
                        items="center"
                    >
                        <View>
                            <Avatar
                                avatarSize={60}
                                imageUrl={formState.inputValues.user?.image}
                            />
                        </View>
                        <Stack
                            spacing={4}
                        >
                            <Typography type="body1" >{formState.inputValues.user?.name}</Typography>
                            <Typography type="body3" >+62 {formState.inputValues.user?.phone}</Typography>
                        </Stack>
                    </Stack>
                </Surface>
                <Stack
                    spacing={16}
                    p={16}
                >
                    <PriceTextFieldForm
                        value={formState.inputValues.value?.toString()}
                        dispatcher={dispatch}
                        id={"value"}
                        mode="filled"
                        placeholder="Rp"
                        keyboardType="number-pad"
                        style={{
                            fontSize: 40,
                            height: 80
                        }}
                    />
                </Stack>
            </Stack>
        </ScrollView>
        <Stack
            p={16}
            spacing={16}
            style={{
                borderTopWidth: 1,
                borderColor: colors.neutral.neutral_30
            }}
        >
            <Typography type="body2">Set your monthly budget, so that your expense is managable !</Typography>
            <Button
                size={'lg'}
                buttonStyle={{
                    width: '100%'
                }}
                onPress={onSubmit}
            >Save</Button>
        </Stack>
    </Page>
}