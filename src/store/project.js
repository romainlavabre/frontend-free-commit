import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    project: []
}

export const project = createSlice({
    name: 'project',
    initialState,
    reducers: {
        load: (state, action) => {
            state.project = action.payload;
        },
        updateOne: ({state, action}) => {
            const index = state.project.findIndex(project => project.id === action.payload.id);

            if (index !== -1)
                delete state.project[index];

            state.project.push(action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = project.actions;

export default project.reducer;
