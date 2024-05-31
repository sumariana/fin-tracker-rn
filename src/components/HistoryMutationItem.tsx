import React from "react"
import { Divider, Icon, Stack, TouchableRipple } from "../../tmd"
import Typography from "../../tmd/components/Typography/Typography"
import { MutationModel } from "../models/mutation/MutationModel"
import IncomeIcon from '../assets/icons/income.svg'
import ExpenseIcon from '../assets/icons/expense.svg'
import { MutationType, numberToCurrency } from "../utils/Helper"
import { colors } from "../../tmd/styles/colors"
import moment from "moment"

interface Props {
    item: MutationModel
}

const HistoryMutationItem = ({ item }: Props) => {
    return <Stack>
        <TouchableRipple
        onPress={()=>{}}
        >
            <Stack
                direction="row"
                ph={16}
                pv={8}
                items="center"
                spacing={12}
            >
                <Stack
                    items="center"
                    content="center"
                    style={{
                        borderWidth: 1,
                        borderColor: colors.neutral.neutral_40,
                        borderRadius: 5,
                        padding: 4
                    }}
                >
                    {
                        item.mutation_type.id == MutationType.EXPENSE ?
                            <ExpenseIcon style={{
                                width: 32,
                                height: 32
                            }} /> :
                            <IncomeIcon style={{
                                width: 32,
                                height: 32
                            }}
                            />
                    }
                </Stack>
                <Stack
                    style={{
                        flex: 1
                    }}
                >
                    <Typography type="label1">{item.notes != "" ? item.notes : "-"}</Typography>
                    <Typography type="body3" color={colors.neutral.neutral_60}>{moment(item.date).format('DD MMM YYYY, HH:mm')}</Typography>
                </Stack>
                {
                    item.mutation_type.id == MutationType.EXPENSE ?
                        <Typography type="title1"
                            color={colors.danger.main}
                        >-Rp{numberToCurrency(item.value)}</Typography> : <Typography type="title1"
                            color={colors.primary.main}
                        >+Rp{numberToCurrency(item.value)}</Typography>
                }

            </Stack>
        </TouchableRipple>
        <Divider
            style={{
                marginHorizontal: 16
            }}
        />
    </Stack>
}

export default HistoryMutationItem