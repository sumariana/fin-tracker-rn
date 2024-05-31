import { ReactNode } from "react"

export interface MenuModel {
    id: number
    name: string
    icon: string
}

export enum HomeEnum{
    CREATE = 1,
    BUDGET = 2
}

export interface HomeModel{
    id: HomeEnum
    name: string
    icon: ReactNode
}