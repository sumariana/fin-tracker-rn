import { _dummyMutation } from "../../models/dummy/_dummy";
import { MutationModel } from "../../models/mutation/MutationModel"

export type MutationState = {
    mutationData: MutationModel[]
}

const initialState: MutationState = {
    mutationData: [],
};

const mutationReducer = (state: MutationState = initialState, action: any) => {
    switch (action.type) {
        case "INIT":
            return {
                ...state,
                mutationData: _dummyMutation
            };
        case "ADD_MUTATION":
            return {
                ...state,
                mutationData: [...state.mutationData,action.payload.data]
            };
        default:
            return state;
    }
}

export default mutationReducer;