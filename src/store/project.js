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

            state.projects.sort((p1, p2) => {
                return p1.id > p2.id
                    ? -1
                    : 1;
            });
        },
        updateOne: (state, action) => {
            const result = state.projects.filter(project => project.id !== action.payload.id);

            result.push(action.payload);

            result.sort((p1, p2) => {
                return p1.id > p2.id
                    ? -1
                    : 1;
            });

            state.projects = [...result];
        },
        remove: (state, action) => {
            const result = state.projects.filter(project => project.id !== action.payload.id);

            result.sort((p1, p2) => {
                return p1.id > p2.id
                    ? -1
                    : 1;
            });

            state.projects = [...result];
        }
    }
})

// Action creators are generated for each case reducer function
export const {load, updateOne, remove} = project.actions;

export default project.reducer;
