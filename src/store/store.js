import {configureStore, createSerializableStateInvariantMiddleware} from '@reduxjs/toolkit'
import util from "../store/util";
import project from "../store/project";
import user from "../store/user";

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
        project: project,
        user: user
    },
    middleware: [serializableMiddleware],
})
