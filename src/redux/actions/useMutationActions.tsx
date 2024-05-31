
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { MutationModel } from "../../models/mutation/MutationModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKey from "../../utils/StorageKey";
import moment from "moment";
import { useAuth } from "../../providers/AuthProvider";
import { UserModel } from "../../models/auth/Auth";
import { MutationType } from "../../utils/Helper";
import { toNumber } from "lodash";

export default function useMutationActions() {
    const mutationData = useSelector(state => state.mutationReducer.mutationData);
    const dispatch = useDispatch()
    const { showErrorBS } = useBottomSheet();
    const { getUserProfile } = useAuth()

    const getUserId = async () => {
        const userid = await AsyncStorage.getItem(StorageKey.USER_ID)
        return userid
    }

    const getUsersMutation = (params?: any) => {
        return new Promise<MutationModel[]>(async (resolve, reject) => {
            try {
                const userid = await getUserId()
                if (userid) {
                    let usersMutation = mutationData.filter(it => it.user_id == userid)
                    console.log("user mutation", usersMutation);
                    if (params?.date) {
                        //filter by date
                        const start = moment(params?.date.start_date, "DD-MM-YYYY").startOf('day')
                        const end = moment(params?.date.end_date, "DD-MM-YYYY").endOf('day')
                        console.log("start", start);
                        console.log("end", end);

                        usersMutation = usersMutation.filter(mutation => {
                            const mutationDateMoment = moment(mutation.date);
                            return mutationDateMoment.isSameOrAfter(start) && mutationDateMoment.isSameOrBefore(end);
                        })
                        console.log("user date", usersMutation);
                    }
                    if (params?.search) {
                        //filter by search
                        usersMutation = usersMutation.filter(it => it.notes == params?.search)
                        console.log("user search", usersMutation);
                    }
                    if (params?.type) {
                        //filter by date
                        usersMutation = usersMutation.filter(it => it.mutation_type.id == params?.type)
                        console.log("user type", usersMutation);
                    }
                    if (params?.category) {
                        //filter by categories
                    }
                    usersMutation = usersMutation.sort((a, b) => b.date.localeCompare(a.date))
                    resolve(usersMutation)
                } else {
                    reject()
                    showErrorBS({
                        message: "User not found !"
                    });
                }

            } catch (e) {
                reject()
                showErrorBS(e)
            }
        })
    }

    const getUserSummary = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let balance, total_transaction, total_budget, total_income = 0
                const user = await getUserProfile() as UserModel
                const currentMonthMutation = await getUsersMutation({
                    date: {
                        start_date: moment().startOf('month').format('DD-MM-YYYY'),
                        end_date: moment().endOf('month').format('DD-MM-YYYY'),
                    }
                })
                const expenseList = currentMonthMutation.filter(it => it.mutation_type.id == MutationType.EXPENSE)
                const incomeList = currentMonthMutation.filter(it => it.mutation_type.id == MutationType.INCOME)


                total_budget = user.budget
                total_transaction = expenseList.reduce((total, transaction) => total + transaction.value, 0);
                total_income = incomeList.reduce((total, transaction) => total + transaction.value, 0)
                balance = total_budget - total_transaction
                resolve({
                    balance: balance,
                    total_transaction: total_transaction,
                    total_budget: total_budget,
                    total_income: total_income
                })

            } catch (e) {
                reject()
                showErrorBS(e)
            }
        })
    }

    const createMutation = async (body: any) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user_id = await getUserId()
                if (user_id) {
                    const mutation: MutationModel = {
                        id: moment().valueOf(),
                        date: moment(body.date, "DD-MM-YYYY,HH:mm:ss").format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                        notes: body.notes,
                        image: body.image,
                        mutation_type: body.type,
                        category: body.category,
                        value: body.value,
                        user_id: parseInt(user_id)
                    }
                    console.log("new mutation", mutation);
                    dispatch({
                        type: "ADD_MUTATION",
                        payload: {
                            data: mutation
                        }
                    })
                    resolve(mutation)
                }
            } catch (error) {
                showErrorBS(error)
                reject(error)
            }
        })
    }

    return {
        getUsersMutation,
        getUserSummary,
        createMutation
    }
}