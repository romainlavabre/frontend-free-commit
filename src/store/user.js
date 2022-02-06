import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: []
}

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        load: (state, action) => {
            state.user = action.payload;
        },
        updateOne: (state, action) => {
            const index = state.user.findIndex(user => user.id === action.payload.id);

            if (index !== -1)
                delete state.user[index];

            state.user.push(action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = user.actions;

export default user.reducer;
