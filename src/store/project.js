import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    projects: []
}

export const project = createSlice({
    name: 'project',
    initialState,
    reducers: {
        load: (state, action) => {
            state.projects = action.payload;
        },
        updateOne: ({state, action}) => {
            const index = state.projects.findIndex(project => project.id === action.payload.id);

            if (index !== -1)
                delete state.projects[index];

            state.projects.push(action.payload);
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne} = project.actions;

export default project.reducer;
