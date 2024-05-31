import React, { useEffect, useReducer, useState } from 'react'
import { Dimensions, FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Chip, Divider, Icon, IconButton, Page, Skeleton, Stack, Surface, TextField, Toolbar, TouchableRipple, useTheme } from '../../../tmd'
import moment from 'moment';
import { colors } from '../../../tmd/styles/colors';
import { getMonthData, numberToCurrency } from '../../utils/Helper';
import Typography from '../../../tmd/components/Typography/Typography';
import Spacing from '../../components/Spacing';
import IconTransaction from '../../assets/icons/transaction.svg';
import IconBudget from '../../assets/icons/budget.svg';
import queryReducer from '../../redux/queryReducers/queryReducers';
import LatestMutationItem from '../../components/LatestMutationItem';
import useMutationActions from '../../redux/actions/useMutationActions';
import { useIsFocused } from '@react-navigation/native';
import HomeMenuItem from '../../components/HomeMenuItem';
import { _dummyHomeMenu } from '../../models/dummy/_dummy';
moment.locale('en-gb')

export default function HomeScreen() {
    const isFocus = useIsFocused()
    const { getUsersMutation, getUserSummary } = useMutationActions()

    const [formState, dispatch] = useReducer(queryReducer, {
        latest: [],
        currentMonth: moment().month() + 1,
        months: getMonthData(),
        summary: {
            balance: 0,
            total_transaction: 0,
            total_budget: 0,
            total_income: 0
        }
    })

    useEffect(() => {
        if (isFocus) {
            console.log("focus");
            refresh()
        }
    }, [isFocus])

    const refresh = async () => {
        try {
            const response = await Promise.all([getUserSummary(), getUsersMutation()])
            dispatch({
                id: "summary",
                value: response[0]
            })
            dispatch({
                id: "latest",
                value: response[1]
            })
        } catch (error) {
            console.log("error", error);
        }
    }

    const BuildHomeMenu = () => {
        return <Stack
            spacing={12}>
            <Typography type='title3'>Action Menu</Typography>
            <FlatList
                data={_dummyHomeMenu}
                keyExtractor={(item, index) => `index ke ${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return <HomeMenuItem
                        item={item}
                    />
                }}
            />
        </Stack>
    }

    const BuildLatestMutation = () => {
        return <Stack
            spacing={12}
        >
            <Typography type='title3'>Latest Mutation</Typography>
            <FlatList
                data={formState.latest?.splice(0, 5)}
                keyExtractor={(item, index) => `index ke ${index}`}
                scrollEnabled={false}
                renderItem={({ item, index }) => {
                    return <LatestMutationItem
                        item={item}
                    />
                }}
            />
        </Stack>
    }

    return (
        <Page
            bgColor={colors.primary.main}
        >
            <Stack
                items='center'
                content='center'
                pv={12}
                style={{
                    zIndex: 1
                }}

            >
                <Stack>
                    <Chip
                        variant='filled'
                        colorVariant='primary'
                        type='picker'
                        selected
                        selectedPickerValue={formState.months.find(it => it.id == formState.currentMonth).id}
                        pickerList={formState.months}
                        onPickerChanges={(value) => {
                            console.log("value", value);
                            if (value) {
                                dispatch({
                                    id: "currentMonth",
                                    value: value.id
                                })
                            }
                        }}
                    />
                </Stack>
            </Stack>
            <ScrollView
                style={{
                    flex: 1
                }}
                contentContainerStyle={{
                    flexGrow: 1
                }}
                refreshControl={<RefreshControl
                    refreshing={false}
                    onRefresh={() => {
                        refresh()
                    }}
                />}
            >
                <Stack
                    style={{
                        flex: 1
                    }}
                >
                    <Stack
                        items='center'
                        content='center'
                    >
                        <Spacing
                            size={50}
                        />
                        <Typography color={colors.neutral.neutral_10} type='label2'>Monthly Balance</Typography>
                        <Spacing
                            size={8}
                        />
                        <Stack
                            direction='row'
                            items='center'
                            spacing={8}
                        >
                            <Icon
                                size={24}
                                icon={formState.summary?.balance > 0 ? 'caret-up' : 'caret-down'}
                                color={formState.summary?.balance > 0 ? colors.primary.surface : colors.danger.pressed}
                            />
                            <Typography color={colors.neutral.neutral_10} type='h1' >Rp {numberToCurrency(Math.abs(formState.summary?.balance))}</Typography>
                        </Stack>
                    </Stack>
                    <Spacing
                        size={30}
                    />
                    <Stack
                        style={{
                            marginHorizontal: 16,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: colors.primary.surface,
                            backgroundColor: colors.primary.main,
                            elevation: 20,
                        }}
                        items='center'
                        direction='row'
                        p={12}
                        spacing={12}
                    >
                        <Stack
                            style={{
                                flex: 1
                            }}
                            direction='row'
                            items='center'
                            spacing={8}
                        >
                            <Stack
                                style={{
                                    width: 36,
                                    height: 36,
                                    backgroundColor: colors.neutral.neutral_10,
                                    borderRadius: 18,
                                    overflow: 'hidden'
                                }}
                                items='center'
                                content='center'
                            >
                                <IconTransaction
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            </Stack>
                            <Stack
                                style={{
                                    flex: 1
                                }}
                            >
                                <Typography color={colors.neutral.neutral_10} type='title3' ellipsizeMode='tail' numberOfLines={1}>Rp {numberToCurrency(formState.summary?.total_transaction)}</Typography>
                                <Typography color={colors.neutral.neutral_10} type='label3'>Total Expense</Typography>
                            </Stack>
                        </Stack>
                        <View
                            style={{
                                height: '80%',
                                width: 1,
                                backgroundColor: colors.primary.surface
                            }}
                        />
                        <Stack
                            style={{
                                flex: 1
                            }}
                            direction='row'
                            items='center'
                            spacing={8}
                        >
                            <Stack
                                style={{
                                    width: 36,
                                    height: 36,
                                    backgroundColor: colors.neutral.neutral_10,
                                    borderRadius: 18,
                                    overflow: 'hidden'
                                }}
                                items='center'
                                content='center'
                            >
                                <IconBudget
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            </Stack>
                            <Stack
                                style={{
                                    flex: 1
                                }}
                            >
                                <Typography color={colors.neutral.neutral_10} type='title3' ellipsizeMode='tail' numberOfLines={1}>Rp {numberToCurrency(formState.summary?.total_income)}</Typography>
                                <Typography color={colors.neutral.neutral_10} type='label3'>Total Income</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Spacing
                        size={30}
                    />
                    <Stack
                        style={{
                            backgroundColor: 'white',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 16,
                            flex: 1
                        }}
                    >
                        <BuildHomeMenu/>
                        <Spacing size={20}/>
                        <BuildLatestMutation/>
                    </Stack>
                </Stack>
            </ScrollView>
        </Page>
    )
}