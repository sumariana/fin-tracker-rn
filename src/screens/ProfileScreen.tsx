import moment from 'moment';
import React, { useEffect, useReducer, useState } from 'react'
import { ScrollView, View } from 'react-native';
import { Button, Page, RHFTextField, Stack, Surface, TextField, Toolbar, useTheme } from '../../tmd'
import Typography from '../../tmd/components/Typography/Typography'
import AvatarImagePicker from '../../tmd/components/picker/AvatarImagePicker';
import Spacing from '../components/Spacing';
import { useAuth } from '../providers/AuthProvider';
import { User } from '../models/auth/Auth';
import { useBottomSheet } from '../../tmd/providers/BottomSheetProvider';
import formReducer from '../redux/formReducers/formReducers';
import TextFieldForm from '../components/TextFieldForm';
moment.locale('en-gb')

export default function ProfileScreen() {
    const theme = useTheme()
    const { showErrorBS } = useBottomSheet()
    const { updateUserProfile, isLoadingLogin, getUserProfile } = useAuth()

    const [formState, dispatch] = useReducer(formReducer, {
        id: '',
        name: '',
        username: '',
        email: '',
        image_url: '',
        date_joined: ''
    });

    const onSubmit = async () => {
        updateUserProfile(formState).then(res => {
            console.log("success");
        }).catch(e => {
            showErrorBS(e)
        })
    }

    useEffect(() => {
        getUserProfile().then(res => {
            initReducer(res)
        }).catch(e => {
            showErrorBS(e)
        })
    }, [])

    const initReducer = (res: User) => {
        dispatch({
            type: "COMMON",
            id: "id",
            input: res.id
        })
        dispatch({
            type: "COMMON",
            id: "name",
            input: res.name
        })
        dispatch({
            type: "COMMON",
            id: "username",
            input: res.username
        })
        dispatch({
            type: "COMMON",
            id: "email",
            input: res.email
        })
        dispatch({
            type: "COMMON",
            id: "image_url",
            input: res.image_url
        })
        dispatch({
            type: "COMMON",
            id: "date_joined",
            input: res.date_joined
        })
    }

    return (
        <Page>
            <Surface
                elevation={4}>
                <Toolbar
                    title='Profile'
                    actionButton={<></>}
                    center
                />
            </Surface>
            <ScrollView
                style={{
                    flex: 1,
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
                        spacing={12}
                        items="center"
                    >
                        <Spacing
                            size={20}
                        />
                        <View>
                            <AvatarImagePicker
                                avatarSize={90}
                                underlineButton
                                imageUrl={formState.image_url}
                                helperText={`User since ${moment(formState.date_joined).format('YYYY')}`}
                                onImageChange={(url)=>{
                                    console.log("test",url);
                                    dispatch({
                                        type: "COMMON",
                                        id: "image_url",
                                        input: url
                                    })
                                }}
                            />
                        </View>
                    </Stack>
                    {/* section basic profile */}
                    <Spacing size={20} />
                    <Stack
                    >
                        <Typography type='title2' fontTheme={theme.fonts.semiBold}>Basic Profile</Typography>
                        <Spacing size={10} />
                        <TextFieldForm
                            id='name'
                            dispatcher={dispatch}
                            value={formState.name}
                            label={'Name'}
                            placeholder={'Ex. Albert Wendy'}
                        />
                        <Spacing size={12} />
                        <TextFieldForm
                            id='username'
                            dispatcher={dispatch}
                            value={formState.username}
                            label={'User ID'}
                            placeholder={'Ex. wendy3213'}
                        />
                    </Stack>
                    {/* section password */}
                    <Spacing size={20} />
                    <Stack
                    >
                        <Typography type='title2' fontTheme={theme.fonts.semiBold}>Change Password</Typography>
                        <Spacing size={10} />
                        <TextField
                            label={'New Password'}
                            defaultValue=''
                            password
                            placeholder={'Ex. Albert Wendy'}
                        />
                        <Spacing size={12} />
                        <TextField
                            label={'Re-type New Password'}
                            defaultValue=''
                            password
                            placeholder={'Ex. wendy3213'}
                        />
                    </Stack>
                    <Spacing size={20} />
                    <Button
                        loading={isLoadingLogin}
                        onPress={onSubmit}
                        size={'lg'}
                        fullWidth
                    >Save</Button>
                </Stack>
            </ScrollView>
        </Page>
    )
}