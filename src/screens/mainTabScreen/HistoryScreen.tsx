import React, { useEffect, useReducer, useRef, useState } from "react";
import { Chip, Page, Stack, Surface, TextField, Toolbar } from "../../../tmd";
import { FlatList } from "react-native";
import queryReducer from "../../redux/queryReducers/queryReducers";
import moment from "moment";
import HistoryMutationItem from "../../components/HistoryMutationItem";
import Typography from "../../../tmd/components/Typography/Typography";
import DateFilterBottomSheet from "../../../tmd/components/BottomSheet/DateFilterBottomSheet";
import PickerBottomSheet from "../../../tmd/components/BottomSheet/PickerBottomSheet";
import { getFilterCategory, getMutationType } from "../../utils/Helper";
import MultiPickerBottomSheet from "../../../tmd/components/BottomSheet/MultiPickerBottomSheet";
import useMutationActions from "../../redux/actions/useMutationActions";
import { useIsFocused } from "@react-navigation/native";


export default function HistoryScreen() {
    const { getUsersMutation } = useMutationActions()
    const isFocus = useIsFocused()
    const isFirst = useRef(true)
    const [showDateFilter, setShowDateFilter] = useState(false)
    const [showCategoryFilter, setShowCategoryFilter] = useState(false)
    const [showTypeFilter, setShowTypeFilter] = useState(false)
    const [formState, dispatch] = useReducer(queryReducer, {
        search: "",
        history: [],
        category: [],
        type: undefined,
        date: {
            id: 1,
            date_range: {
                start_date: moment().subtract(30, 'days').format('DD-MM-YYYY'),
                end_date: moment().format('DD-MM-YYYY')
            }
        } //id of the date filter
    })

    useEffect(() => {
        if (!isFirst.current) {
            fetchHistory()
        }
    }, [formState.search,formState.category,formState.type,formState.date])

    useEffect(() => {
        if (isFocus) {
            console.log("focus");
            isFirst.current = true
            fetchHistory()
        }
    }, [isFocus])

    const fetchHistory = () => {
        getUsersMutation({
            search: formState.search != "" ? formState.search : undefined,
            type: formState.type != undefined ? formState.type.id : undefined,
            date: formState.date.date_range
        }).then(res => {
            console.log("res", res);
            isFirst.current = false
            if (res) {
                dispatch({
                    id: "history",
                    value: res
                })
            }
        })
    }

    return <>
        <Page>
            <Surface
                elevation={4}
            >
                <Stack
                    ph={16}
                    pt={16}
                    pb={12}
                    spacing={12}
                >
                    <TextField
                        shape={"rect"}
                        placeholder={"Search mutation..."}
                        onClear={() => {
                            //clear search
                        }}
                        returnKeyType={"search"}
                        onEndEditing={(e) => {
                            //trigger search
                        }}
                        search
                    />
                    <Stack
                        direction="row"
                        spacing={8}
                    >
                        <Chip
                            text="Date"
                            shape="rect"
                            variant="outlined"
                            selected={formState.date.id != 1}
                            onPress={() => {
                                setShowDateFilter(!showDateFilter)
                            }}
                        />
                        <Chip
                            text="Category"
                            shape="rect"
                            variant="outlined"
                            selected={formState.category.length > 0}
                            onPress={() => {
                                setShowCategoryFilter(!showCategoryFilter)
                            }}
                        />
                        <Chip
                            text="Mutation type"
                            shape="rect"
                            variant="outlined"
                            selected={formState.type != undefined}
                            onPress={() => {
                                setShowTypeFilter(!showTypeFilter)
                            }}
                        />
                    </Stack>
                </Stack>
            </Surface>
            <FlatList
                data={formState.history}
                keyExtractor={(item, index) => `index ke ${index}`}
                style={{
                    flex: 1
                }}
                contentContainerStyle={{
                    flexGrow: 1
                }}
                refreshing={false}
                onRefresh={fetchHistory}
                renderItem={({ item, index }) => {
                    return <HistoryMutationItem
                        item={item}
                    />
                }}
            />
        </Page>
        <DateFilterBottomSheet
            title="Date Filter"
            open={showDateFilter}
            initial={formState.date}
            onClose={() => { setShowDateFilter(false) }}
            onReset={() => {
                setShowDateFilter(false)
                dispatch({
                    id: "date",
                    value: {
                        id: 1,
                        date_range: {
                            start_date: moment().subtract(30, 'days').format('DD-MM-YYYY'),
                            end_date: moment().format('DD-MM-YYYY')
                        }
                    }
                })
            }}
            onSave={(data) => {
                setShowDateFilter(false)
                dispatch({
                    id: "date",
                    value: {
                        id: data.id,
                        date_range: data.date_range
                    }
                })
            }} />
        <MultiPickerBottomSheet
            value={formState.category}
            open={showCategoryFilter}
            onClose={() => {
                setShowCategoryFilter(false)
            }}
            onReset={() => {
                //reset the category
                setShowCategoryFilter(false)
                dispatch({
                    id: "category",
                    value: []
                })
            }}
            data={getFilterCategory()}
            onSave={(values) => {
                //objects
                console.log("value", values);
                setShowCategoryFilter(false)
                dispatch({
                    id: "category",
                    value: values
                })
            }}
            title={"Category Filter"}
        />
        <PickerBottomSheet
            value={formState.type?.id}
            open={showTypeFilter}
            onClose={() => {
                setShowTypeFilter(false)
            }}
            onReset={() => {
                //reset the category
                setShowTypeFilter(false)
                dispatch({
                    id: "type",
                    value: undefined
                })
            }}
            data={getMutationType()}
            onSave={(value) => {
                //objects
                console.log("value", value);
                setShowTypeFilter(false)
                dispatch({
                    id: "type",
                    value: value
                })
            }}
            title={"Mutation type"}
        />
    </>
}