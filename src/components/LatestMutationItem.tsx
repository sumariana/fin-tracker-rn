import React from "react"
import { Divider, Icon, Stack, TouchableRipple } from "../../tmd"
import Typography from "../../tmd/components/Typography/Typography"
import { MutationModel } from "../models/mutation/MutationModel"
import IncomeIcon from '../assets/icons/income.svg'
import ExpenseIcon from '../assets/icons/expense.svg'
import { MutationType, numberToCurrency } from "../utils/Helper"
import { colors } from "../../tmd/styles/colors"
import moment from "moment"
import Avatar from "../../tmd/components/Avatar/Avatar"
import { Image, View } from "react-native"

interface Props {
    item: MutationModel
}

const LatestMutationItem = ({ item }: Props) => {
    console.log("image",item.image);
    
    return <Stack>
        <Stack
            direction="row"
            
            pv={8}
            items="center"
            spacing={12}

        >
            {/* <Avatar
                imageUrl={item.image}
                size={"sm"}
                variant=""
            /> */}
            <View
            style={{
                width:42,
                aspectRatio:1,
                borderRadius:42/2,
                borderWidth:0.5,
                borderColor:colors.neutral.neutral_50,
                overflow:'hidden'
            }}
            >
                <Image
                style={{
                    width:'100%',height:'100%'
                }}
                source={{uri: item.image ?? "https://via.placeholder.com/150"}}
                />
            </View>
            <Stack
                style={{
                    flex: 1
                }}
            >
                <Typography type="label3" numberOfLines={1} ellipsizeMode="tail">{item.notes != "" ? item.notes : "-"}</Typography>
                <Typography type="body4" color={colors.neutral.neutral_60}>{moment(item.date).format('DD MMM YYYY, HH:mm')}</Typography>
            </Stack>
            {
                item.mutation_type.id == MutationType.EXPENSE ?
                    <Typography type="label1"
                        color={colors.danger.main}
                    >-Rp{numberToCurrency(item.value)}</Typography> : <Typography type="label1"
                        color={colors.primary.main}
                    >+Rp{numberToCurrency(item.value)}</Typography>
            }

        </Stack>
        <Divider />
    </Stack>
}

export default LatestMutationItem