import {configureStore, createSerializableStateInvariantMiddleware} from '@reduxjs/toolkit'
import util from "../store/util";
import api from "./api";

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
        util: util,
        api: api,
    },
    middleware: [serializableMiddleware],
})
