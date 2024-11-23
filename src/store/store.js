import {configureStore, createSerializableStateInvariantMiddleware} from '@reduxjs/toolkit'
import api from "../store/api";

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (val) => {
    return true;
}

const getEntries = (value) => Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
    isSerializable,
    getEntries,
})

export const store = configureStore({
    reducer: {
        api: api,
    },
    middleware: [serializableMiddleware],
})
