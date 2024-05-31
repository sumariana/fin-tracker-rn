import React from "react";
import { UserModel } from "../auth/Auth";
import { HomeEnum, HomeModel, MenuModel } from "../environment/MenuModel";
import { MutationModel } from "../mutation/MutationModel";
import CreateIcon from '../../assets/icons/transaction.svg'
import BudgetIcon from '../../assets/icons/budget.svg'

export const _users: UserModel[] = [
    {
        id: 1,
        name: "Andromeda",
        email: "andromeda@gmail.com",
        password: "password",
        phone: "8754887766",
        image: "https://via.placeholder.com/150",
        budget: 0
    },
    {
        id: 2,
        name: "Kevin",
        email: "kevin@gmail.com",
        password: "password",
        phone: "8754887766",
        image: "https://via.placeholder.com/150",
        budget: 1000000
    },
    {
        id: 3,
        name: "Alex",
        email: "alex@gmail.com",
        password: "password",
        phone: "8754887766",
        image: "https://via.placeholder.com/150",
        budget: 0
    },
    {
        id: 4,
        name: "Mike",
        email: "mike@gmail.com",
        password: "password",
        phone: "8754887766",
        image: "https://via.placeholder.com/150",
        budget: 0
    }
]

export const _dummyMenuProfile: MenuModel[] = [
    {
        id: 123,
        name: "Profile Settings",
        icon: "person-outline"
    },
    {
        id: 124,
        name: "Security Settings",
        icon: "lock-closed-outline"
    },
    {
        id: 125,
        name: "Linked Account",
        icon: "link-outline"
    },
    {
        id: 125,
        name: "Bank Account",
        icon: "shield-checkmark-outline"
    },
]

export const _dummyMenuAccount: MenuModel[] = [
    {
        id: 123,
        name: "Help Center",
        icon: "help-circle-outline"
    },
    {
        id: 124,
        name: "Terms & Conditions",
        icon: "newspaper-outline"
    },
    {
        id: 125,
        name: "Privacy Policy",
        icon: "information-circle-outline"
    },
    {
        id: 126,
        name: "Delete Account",
        icon: "trash-bin-outline"
    }
]

export const _dummyMutation: MutationModel[] = [
    {
        id: 1234,
        notes: "Belanja warung",
        category: {
            id: 1,
            name: "Snacks"
        },
        date: "2024-05-27T08:53:31.694Z",
        image: "",
        mutation_type: {
            id: 1,
            name: "Expense"
        },
        user_id: 2,
        value: 80000
    },
    {
        id: 1557,
        notes: "THR bulan Mei 2024",
        category: {
            id: 1,
            name: "Snacks"
        },
        date: "2024-05-22T08:53:31.694Z",
        image: "",
        mutation_type: {
            id: 2,
            name: "Income"
        },
        user_id: 2,
        value: 80000
    },
    {
        id: 1455,
        notes: "Belanja kikil",
        category: {
            id: 1,
            name: "Snacks"
        },
        date: "2024-05-23T08:53:31.694Z",
        image: "",
        mutation_type: {
            id: 1,
            name: "Expense"
        },
        user_id: 2,
        value: 80000
    },
    {
        id: 1235,
        notes: "Belanja tokopedia beli rem",
        category: {
            id: 6,
            name: "Hobbies"
        },
        date: "2024-03-27T06:53:31.694Z",
        image: "",
        mutation_type: {
            id: 1,
            name: "Expense"
        },
        user_id: 2,
        value: 500000
    },
    {
        id: 1236,
        notes: "Belanja warung",
        category: {
            id: 1,
            name: "Snacks"
        },
        date: "2024-02-27T08:53:31.694Z",
        image: "",
        mutation_type: {
            id: 1,
            name: "Expense"
        },
        user_id: 2,
        value: 80000
    },
    {
        id: 1237,
        notes: "Belanja tokopedia beli rem",
        category: {
            id: 6,
            name: "Hobbies"
        },
        date: "2024-03-27T06:53:31.694Z",
        image: "",
        mutation_type: {
            id: 1,
            name: "Expense"
        },
        user_id: 2,
        value: 500000
    },
    {
        id: 1238,
        notes: "Belanja warung",
        category: {
            id: 1,
            name: "Snacks"
        },
        date: "2023-11-27T08:53:31.694Z",
        image: "",
        mutation_type: {
            id: 1,
            name: "Expense"
        },
        user_id: 2,
        value: 80000
    },
    {
        id: 1239,
        notes: "Belanja tokopedia beli rem",
        category: {
            id: 6,
            name: "Hobbies"
        },
        date: "2024-01-27T06:53:31.694Z",
        image: "",
        mutation_type: {
            id: 1,
            name: "Expense"
        },
        user_id: 2,
        value: 500000
    },
    {
        id: 1240,
        notes: "Belanja warung",
        category: {
            id: 1,
            name: "Snacks"
        },
        date: "2024-04-01T08:53:31.694Z",
        image: "",
        mutation_type: {
            id: 1,
            name: "Expense"
        },
        user_id: 2,
        value: 80000
    },
    {
        id: 1255,
        notes: "Belanja tokopedia beli rem",
        category: {
            id: 6,
            name: "Hobbies"
        },
        date: "2024-01-23T06:53:31.694Z",
        image: "",
        mutation_type: {
            id: 1,
            name: "Expense"
        },
        user_id: 2,
        value: 500000
    },
]

export const _dummyHomeMenu: HomeModel[] = [
    {
        id: HomeEnum.CREATE,
        name: `Record\nMutation`,
        icon: <CreateIcon
            width={32}
            height={32}
            preserveAspectRatio="none"
        />
    },
    {
        id: HomeEnum.BUDGET,
        name: `Record\nBudget`,
        icon: <BudgetIcon
            width={32}
            height={32}
            preserveAspectRatio="none"
        />
    },
]