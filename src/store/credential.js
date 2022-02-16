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

            state.credentials.sort((p1, p2) => {
                return p1.id > p2.id
                    ? -1
                    : 1;
            });
        },
        updateOne: (state, action) => {
            const result = state.credentials.filter(credential => credential.id !== action.payload.id);

            result.push(action.payload);

            result.sort((p1, p2) => {
                return p1.id > p2.id
                    ? -1
                    : 1;
            });

            state.credentials = [...result];
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = credential.actions;

export default credential.reducer;
