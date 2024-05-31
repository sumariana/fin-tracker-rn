import { Dimensions, Platform, StatusBar } from 'react-native';
import { PickerItem } from '../../tmd/model/PickerItem';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;

export const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0
})

export const numberToCurrency = (number?: number,showZero?: boolean): string => {
    if (number) {
        if(showZero && number == 0){
            return '0'
        }
        return String(number).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); /* Rp. 500.000 */
    }

    return '0'
}

export const stringToCurrency = (number?: string): string => {
    if (number) {
        return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'); /* Rp. 500.000 */
    }

    return ''
}

export const cleanCurrency = (text?: string): string => {
    if (text) {
        return text.replace(/\./g, "")
    }
    return ''
}

export enum MutationType {
    EXPENSE = 1,
    INCOME = 2,
}

export const getFilterCategory = (): PickerItem[] => {
    const data: PickerItem[] = []
    data.push({ id: 1, name: "Snacks" })
    data.push({ id: 2, name: "Internet Bills" })
    data.push({ id: 3, name: "Electricity Bills" })
    data.push({ id: 4, name: "Groceries" })
    data.push({ id: 5, name: "Investment" })
    data.push({ id: 6, name: "Hobbies" })
    data.push({ id: 7, name: "Shopping" })
    data.push({ id: 8, name: "Salary" })
    data.push({ id: 9, name: "PDAM Bills" })
    return data
}

export const getMonthData = (): PickerItem[] => {
    const data: PickerItem[] = []
    data.push({ id: 1, name: "January" })
    data.push({ id: 2, name: "February" })
    data.push({ id: 3, name: "March" })
    data.push({ id: 4, name: "April" })
    data.push({ id: 5, name: "May" })
    data.push({ id: 6, name: "June" })
    data.push({ id: 7, name: "July" })
    data.push({ id: 8, name: "August" })
    data.push({ id: 9, name: "September" })
    data.push({ id: 10, name: "October" })
    data.push({ id: 11, name: "November" })
    data.push({ id: 12, name: "Desember" })
    return data
}

export const getMutationType = (): PickerItem[] => {
    const data: PickerItem[] = []
    data.push({ id: MutationType.EXPENSE, name: "Expense" })
    data.push({ id: MutationType.INCOME, name: "Income" })
    return data
}

export const stringToNumber = (text?: string): number => {
    if (text) {
        if (text.length == 0) {
            return 0
        } else {
            return Number(text)
        }
    }
    return 0
}

export const isEmptyString = (text?: string) => {
    if (text) {
        return text.length == 0
    }
    return true
}

export const formatTime = (duration: number) => {
    const getSeconds = `0${(duration % 60)}`.slice(-2)
    const minutes = Math.floor(duration / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(duration / 3600)}`.slice(-2)
    if (getHours == "00") {
        return `${getMinutes} : ${getSeconds}`
    } else {
        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

}