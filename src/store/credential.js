import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    credentials: []
}

export const credential = createSlice({
    name: 'credential',
    initialState,
    reducers: {
        load: (state, action) => {
            state.credentials = action.payload;
        },
        updateOne: (state, action) => {
            const index = state.credentials.findIndex(credential => credential.id === action.payload.id);

            if (index !== -1)
                delete state.credentials[index];

            state.credentials.push(action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = credential.actions;

export default credential.reducer;
