import {createSlice} from '@reduxjs/toolkit'
import isNull from "../mixin/isNull";

const initialState = {}

export const api = createSlice({
    name: 'api',
    initialState,
    reducers: {
        addOrOverwrite: (state, action) => {
            if (isNull(state[action.payload.service])) {
                state[action.payload.service] = {};
            }

            if (isNull(state[action.payload.service][action.payload.subject])) {
                state[action.payload.service][action.payload.subject] = [];
            }

            if (Array.isArray(action.payload.entity)) {
                for (let i = 0; i < action.payload.entity.length; i++) {
                    state[action.payload.service][action.payload.subject][action.payload.entity[i].getId()] = action.payload.entity[i];
                }

            } else {
                state[action.payload.service][action.payload.subject][action.payload.entity.getId()] = action.payload.entity;
            }

            state[action.payload.service][action.payload.subject] = [...state[action.payload.service][action.payload.subject]];
        },
        remove: (state, action) => {
            if (isNull(state[action.payload.service]) || isNull(state[action.payload.service][action.payload.subject])) {
                return;
            }

            delete state[action.payload.service][action.payload.subject][action.payload.id];

            state[action.payload.service][action.payload.subject] = [...state[action.payload.service][action.payload.subject]];
        }
    },
})

// Action creators are generated for each case reducer function
export const {addOrOverwrite, remove} = api.actions;

export default api.reducer;
