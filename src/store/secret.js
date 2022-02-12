import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    secrets: []
}

export const secret = createSlice({
    name: 'secret',
    initialState,
    reducers: {
        load: (state, action) => {
            state.secrets = action.payload;
        },
        updateOne: (state, action) => {
            const index = state.secrets.findIndex(secret => secret.id === action.payload.id);

            if (index !== -1)
                delete state.secrets[index];

            state.secrets.push(action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = secret.actions;

export default secret.reducer;
