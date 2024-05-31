import React, { useEffect, useReducer, useState } from "react";
import { Button, Divider, Icon, IconButton, Page, Stack, Surface, Toast, Toolbar, TouchableRipple, useTheme } from "../../../tmd";
import { useAuth } from "../../providers/AuthProvider";
import formReducer from "../../redux/formReducers/formReducers";
import { useIsFocused } from "@react-navigation/native";
import queryReducer from "../../redux/queryReducers/queryReducers";
import { FlatList, ScrollView, View } from "react-native";
import Typography from "../../../tmd/components/Typography/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../../tmd/components/Avatar/Avatar";
import { colors } from "../../../tmd/styles/colors";
import { MenuModel } from "../../models/environment/MenuModel";
import Spacing from "../../components/Spacing";
import { _dummyMenuAccount, _dummyMenuProfile } from "../../models/dummy/_dummy";
import TmdConstants from "../../../tmd/utils/TmdConstants";
import { getVersion } from "react-native-device-info";
import IconBudget from '../../assets/icons/budget.svg';
import { numberToCurrency } from "../../utils/Helper";
import useMutationActions from "../../redux/actions/useMutationActions";
import { navigate } from "../../navigations/RootNavigation";

export default function AccountScreen() {
    const { getUserProfile, logout } = useAuth()
    const { getUserSummary } = useMutationActions()
    const version = TmdConstants.DEV_MODE ? `${TmdConstants.STAGING_MODE ? "staging" : "dev"}-${getVersion()}` : getVersion();
    const isFocus = useIsFocused()
    const [formState, dispatch] = useReducer(queryReducer, {
        user: undefined,
        summary: {
            total_budget: 0
        }
    })

    useEffect(() => {
        if (isFocus) {
            refresh()
        }
    }, [isFocus])

    const refresh = async () => {
        try {
            const response = await Promise.all([getUserSummary(), getUserProfile()])
            dispatch({
                id: "summary",
                value: response[0]
            })
            dispatch({
                id: "user",
                value: response[1]
            })
        } catch (error) {
            console.log("error", error);
        }
    }

    const RenderMenuItem = ({ item, isFirst, isLast }: { item: MenuModel, isFirst: boolean, isLast: boolean }) => {
        return <Stack
            style={{
                borderTopLeftRadius: isFirst ? 15 : undefined,
                borderTopRightRadius: isFirst ? 15 : undefined,
                borderBottomLeftRadius: isLast ? 15 : undefined,
                borderBottomRightRadius: isLast ? 15 : undefined,
                overflow: 'hidden'
            }}
        >
            <TouchableRipple
                onPress={() => {

                }}
            >
                <Stack>
                    <Stack
                        direction="row"
                        pv={8}
                        items="center"
                        spacing={8}
                        ph={16}
                    >
                        <Icon
                            icon={item.icon}
                            size={24}
                        />
                        <Typography>{item.name}</Typography>
                    </Stack>
                    <Divider />
                </Stack>
            </TouchableRipple>
        </Stack>
    }

    const RenderMenuSection = ({ items }: { items: MenuModel[] }) => {
        return <Surface
            elevation={2}
            style={{
                marginHorizontal: 16,
                borderRadius: 15
            }}
        >
            <Stack

            >
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => `index ke ${index}`}
                    renderItem={({ item, index }) => {
                        return <RenderMenuItem
                            item={item}
                            isFirst={index == 0}
                            isLast={index == items.length - 1}
                        />
                    }}
                />
            </Stack>
        </Surface>
    }

    return <Page>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: colors.primary.main,
                padding: 16
            }}>
            <Typography type="title2" color={colors.neutral.neutral_10}>Account</Typography>
        </View>
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: colors.neutral.neutral_30
            }}
            showsVerticalScrollIndicator={false}
        >
            <Stack
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: 140,
                        backgroundColor: colors.primary.main,
                        borderBottomEndRadius: 20,
                        borderBottomStartRadius: 20,
                        position: 'absolute'
                    }}
                />
                <Stack
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
                                imageUrl={formState.user?.image}
                            />
                        </View>
                        <Stack
                            spacing={4}
                        >
                            <Typography type="body2" color={colors.neutral.neutral_10}>{formState.user?.name}</Typography>
                            <Typography type="body3" color={colors.neutral.neutral_10}>{formState.user?.email}</Typography>
                            <Typography type="body3" color={colors.neutral.neutral_10}>+62 {formState.user?.phone}</Typography>
                        </Stack>
                    </Stack>
                    <Surface
                        elevation={2}
                        style={{
                            margin: 16,
                            borderRadius: 10,
                            overflow: 'hidden',
                        }}
                    >
                        <TouchableRipple
                            onPress={() => {
                                navigate("BudgetScreen")
                            }}
                        >
                            <Stack
                                direction='row'
                                items='center'
                                spacing={8}
                                p={12}
                            >
                                <IconBudget
                                    style={{
                                        width: 36,
                                        height: 36,
                                    }}
                                />
                                <Stack
                                    style={{
                                        flex: 1
                                    }}
                                >
                                    <Typography type='h3' ellipsizeMode='tail' numberOfLines={1} color={colors.primary.main}>Rp {numberToCurrency(formState.summary.total_budget)}</Typography>
                                    <Typography type='body3' color={colors.primary.main}>Total Budget</Typography>
                                </Stack>
                            </Stack>
                        </TouchableRipple>
                    </Surface>
                </Stack>

                <Spacing
                    size={24}
                />
                <RenderMenuSection
                    items={_dummyMenuProfile}
                />
                <Spacing
                    size={24}
                />
                <RenderMenuSection
                    items={_dummyMenuAccount}
                />
                <Stack
                    items="center"
                    p={16}
                    spacing={20}
                >
                    <Typography type="body2" color={colors.neutral.neutral_60}>{version}</Typography>
                    <Button buttonStyle={{
                        width: '100%'
                    }}
                        onPress={() => {
                            logout()
                        }}
                    >Log Out</Button>
                </Stack>
            </Stack>
        </ScrollView>

    </Page>
}