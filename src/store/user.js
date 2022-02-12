import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    users: []
}

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        load: (state, action) => {
            state.users = action.payload;
        },
        updateOne: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);

            if (index !== -1)
                delete state.users[index];

            state.users.push(action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = user.actions;

export default user.reducer;
