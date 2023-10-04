import {createSlice} from '@reduxjs/toolkit'
import isNull from "../mixin/global/isNull";

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
                state[action.payload.service][action.payload.subject] = {
                    values: [],
                    metadata: {}
                }
            }

            if (Array.isArray(action.payload.entity)) {
                for (let i = 0; i < action.payload.entity.length; i++) {
                    state[action.payload.service][action.payload.subject].values[action.payload.entity[i].id] = action.payload.entity[i];
                }

                // Clear removed entities (by backend) without reloading
                if (isNull(action.payload.prop)) {
                    state[action.payload.service][action.payload.subject].values.forEach((item, index) => {
                        if (!isNull(item) && isNull(action.payload.entity.find(entity => entity.id == index))) {
                            delete state[action.payload.service][action.payload.subject].values[index];
                        }
                    });
                } else {
                    state[action.payload.service][action.payload.subject].values.forEach((item, index) => {
                        if (!isNull(item)
                            && item[action.payload.prop] == action.payload.value
                            && isNull(action.payload.entity.find(entity => entity.id == index))) {
                            delete state[action.payload.service][action.payload.subject].values[index];
                        }
                    });

                }
            } else {
                state[action.payload.service][action.payload.subject].values[action.payload.entity.id] = action.payload.entity;
            }

            if (!isNull(action.payload.findAllAt)) {
                state[action.payload.service][action.payload.subject].metadata.findAllAt = action.payload.findAllAt;
            } else {
                Object.keys(action.payload)
                    .forEach(key => {
                        if (key.startsWith("findAllBy")) {
                            state[action.payload.service][action.payload.subject].metadata[key] = action.payload[key];
                        }
                    });
            }

            state[action.payload.service][action.payload.subject] = {...state[action.payload.service][action.payload.subject]};
        },
        remove: (state, action) => {
            if (isNull(state[action.payload.service]) || isNull(state[action.payload.service][action.payload.subject])) {
                return;
            }

            delete state[action.payload.service][action.payload.subject].values[action.payload.id];

            state[action.payload.service][action.payload.subject] = {...state[action.payload.service][action.payload.subject]};
        }
    },
})

// Action creators are generated for each case reducer function
export const {addOrOverwrite, remove} = api.actions;

export default api.reducer;
