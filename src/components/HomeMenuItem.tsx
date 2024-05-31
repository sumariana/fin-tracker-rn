import React from "react"
import { Divider, Icon, Stack, TouchableRipple } from "../../tmd"
import Typography from "../../tmd/components/Typography/Typography"
import { MutationModel } from "../models/mutation/MutationModel"
import IncomeIcon from '../assets/icons/income.svg'
import ExpenseIcon from '../assets/icons/expense.svg'
import { MutationType, numberToCurrency } from "../utils/Helper"
import { colors } from "../../tmd/styles/colors"
import moment from "moment"
import { HomeEnum, HomeModel } from "../models/environment/MenuModel"
import { navigate } from "../navigations/RootNavigation"

interface Props {
    item: HomeModel
}

const HomeMenuItem = ({ item }: Props) => {
    return <Stack
        mr={12}
        style={{
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.neutral.neutral_40,
        }}
    >
        <TouchableRipple
            onPress={() => {
                switch (item.id) {
                    case HomeEnum.CREATE:
                        navigate('RecordMutationScreen')
                        break;
                    case HomeEnum.BUDGET:
                        navigate('BudgetScreen')
                        break;

                    default:
                        break;
                }
            }}
        >
            <Stack
                p={16}
                items="center"
                spacing={12}
                style={{
                }}
            >
                {
                    item.icon
                }
                <Typography type="body3" style={{
                    textAlign: 'center'
                }}>{item.name}</Typography>
            </Stack>
        </TouchableRipple>
    </Stack>
}

export default HomeMenuItem