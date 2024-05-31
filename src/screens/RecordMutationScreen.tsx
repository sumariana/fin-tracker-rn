import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useReducer } from "react";
import AppNavigationType from "../navigations/AppNavigationType";
import { Button, Page, Stack, TextField, Toast, Toolbar } from "../../tmd";
import { Keyboard, ScrollView } from "react-native";
import Spacing from "../components/Spacing";
import ImagePicker from "../../tmd/components/picker/ImagePicker";
import Select from "../../tmd/components/Select/Select";
import DatePicker from "../../tmd/components/picker/DatePicker";
import { MutationType, getFilterCategory, getMutationType } from "../utils/Helper";
import formReducer from "../redux/formReducers/formReducers";
import moment from "moment";
import PriceTextFieldForm from "../components/PriceTextFieldForm";
import { useBottomSheet } from "../../tmd/providers/BottomSheetProvider";
import useMutationActions from "../redux/actions/useMutationActions";
import { goBack } from "../navigations/RootNavigation";
import TextFieldForm from "../components/TextFieldForm";

const mutationTypeList = getMutationType()
const categoryList = getFilterCategory()

export default function RecordMutationScreen({ route }: NativeStackScreenProps<AppNavigationType, "RecordMutationScreen">) {
    const { showErrorBS } = useBottomSheet()
    const { createMutation } = useMutationActions()
    const [formState, dispatch] = useReducer(formReducer, {
        inputValues: {
            image: "",
            value: null,
            date: moment().format('DD-MM-YYYY,HH:mm:ss'),
            type: mutationTypeList.find(it => it.id == MutationType.EXPENSE),
            category: categoryList[0],
            notes: ""
        },
        inputValidities: {
            image: true,
            value: false,
            date: true,
            type: true,
            category: true,
            notes: true
        },
        formIsValid: false,
        onSubmit: undefined
    })

    useEffect(() => {
        if (formState.onSubmit) {
            if (formState.formIsValid) {
                createMutation(formState.inputValues).then(res=>{
                    Toast.show("Success create mutation")
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
            title={"Record Mutation"}
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
                    padding: 16
                }}
            >
                <Stack
                    spacing={16}
                >
                    <ImagePicker
                        ratio="9:16"
                        style={{
                            width: '100%',
                        }}
                        buttonProps={{
                            icon: {
                                icon: "camera",
                            },
                        }}
                        initialImageUrl={formState.inputValues.image}
                        onDelete={() => { }}
                        onChangeImageUrl={(url) => {

                        }}
                    />
                    <Spacing size={20} />
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
                    <Spacing size={20} />
                    <DatePicker
                        label="Date"
                        placeholder="Select date"
                        date={formState.inputValues.date}
                        onDateChanges={(date) => {
                            const dateformat = moment(date).format('DD-MM-YYYY,HH:mm:ss')
                            dispatch({
                                type: 'input',
                                id: "date",
                                input: dateformat,
                                isValid: true
                            })
                        }}
                    />
                    <Select
                        label={'Mutation Type'}
                        mode={"contained"}
                        pickerMode="auto"
                        onReset={() => {
                            dispatch({
                                type: 'input',
                                id: "type",
                                input: mutationTypeList.find(it => it.id == MutationType.EXPENSE),
                                isValid: true
                            })
                        }}
                        clearButtonMode="always"
                        placeholder="Select Mutation Type"
                        options={mutationTypeList}
                        initial={formState.inputValues.type.id}
                        onSelectedValueChange={(id) => {
                            dispatch({
                                type: 'input',
                                id: "type",
                                input: {
                                    id: id,
                                    name: mutationTypeList.find(it => it.id == id)?.name
                                },
                                isValid: true
                            })
                        }}

                    />
                    <Select
                        label={'Mutation Category'}
                        mode={"contained"}
                        pickerMode="auto"
                        onReset={() => {
                            dispatch({
                                type: 'input',
                                id: "type",
                                input: categoryList[0],
                                isValid: true
                            })
                        }}
                        clearButtonMode="always"
                        placeholder="Select Mutation Type"
                        initial={formState.inputValues.category.id}
                        options={categoryList}
                        onSelectedValueChange={(id) => {
                            dispatch({
                                type: 'input',
                                id: "type",
                                input: {
                                    id: id,
                                    name: categoryList.find(it => it.id == id)?.name
                                },
                                isValid: true
                            })
                        }}
                    />
                    <Spacing size={12} />
                </Stack>
            </Stack>
        </ScrollView>
        <Stack
            p={16}
            spacing={16}
        >
            <TextFieldForm
                id="notes"
                dispatcher={dispatch}
                value={formState.inputValues.notes}
                placeholder={'Type notes here...'}
            />
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