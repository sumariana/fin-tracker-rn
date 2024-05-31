import React from 'react';
const formReducer = (state: any, action: any) => {
    if (action.type == "input") {
        console.log(action.id, action.input, action.isValid)
        const updatedValues = {
            ...state.inputValues,
            [action.id]: action.input
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.id]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            ...state,
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        }
    }
    if(action.type == "submit"){
        return {
            ...state,
            onSubmit: true
        }
    }
    if (action.type === 'reset') {
        return {
            ...state,
            onSubmit: undefined,
            formIsValid: false
        }
    }
    return state
}
export default formReducer