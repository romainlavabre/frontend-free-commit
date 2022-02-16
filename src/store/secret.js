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

            state.secrets.sort((p1, p2) => {
                return p1.id > p2.id
                    ? -1
                    : 1;
            });
        },
        updateOne: (state, action) => {
            const result = state.secrets.filter(secret => secret.id !== action.payload.id);

            result.push(action.payload);

            result.sort((p1, p2) => {
                return p1.id > p2.id
                    ? -1
                    : 1;
            });

            state.secrets = [...result];
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = secret.actions;

export default secret.reducer;
