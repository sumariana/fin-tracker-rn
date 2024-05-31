import React, { SVGProps, ReactElement, ReactNode } from "react"
import { View } from "react-native"
import { Stack, useTheme } from "../../tmd"
import Typography from "../../tmd/components/Typography/Typography"

interface Props {
    title: string
    desc: string
    asset: (props: SVGProps<SVGElement>) => ReactElement
    button?: ReactNode | undefined
}

export default function EmptyLayout({ title, desc, asset,button }: Props) {
    const { colors } = useTheme()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={16} items="center" content="center">
                {asset}
                <Stack spacing={8} items="center" content="center">
                    <Typography type="title2" style={{ textAlign: 'center' }}>{title}</Typography>
                    <Typography type="body2" style={{ color: colors.neutral.neutral_80, textAlign: 'center' }}>{desc}</Typography>
                </Stack>
                {button}
            </Stack>
        </View>
    )
}