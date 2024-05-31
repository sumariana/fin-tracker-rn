import React from 'react';
const queryReducer = (state: any, action: any) => {
    const updatedValues = {
        ...state,
        [action.id]: action.value
    }
    return updatedValues
}
export default queryReducer