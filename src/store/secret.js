import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    secrets: []
}

export const secret = createSlice({
    name: 'secret',
    initialState,
    reducers: {
        load: (state, action) => {
            state.secret = action.payload;
        },
        updateOne: (state, action) => {
            const index = state.secret.findIndex(secret => secret.id === action.payload.id);

            if (index !== -1)
                delete state.secret[index];

            state.secret.push(action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = secret.actions;

export default secret.reducer;
