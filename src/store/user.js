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

            state.users.sort((p1, p2) => {
                return p1.id > p2.id
                    ? -1
                    : 1;
            });
        },
        updateOne: (state, action) => {
            const result = state.users.filter(user => user.id !== action.payload.id);

            result.push(action.payload);

            result.sort((p1, p2) => {
                return p1.id > p2.id
                    ? -1
                    : 1;
            });

            state.users = [...result];
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = user.actions;

export default user.reducer;
