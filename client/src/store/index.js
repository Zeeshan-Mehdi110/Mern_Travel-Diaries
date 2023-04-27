import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { rootReducer } from "./reducers/rootReducer"

let middleWares = null

if (window.__REDUX_DEVTOOLS_EXTENSION__()) {
    middleWares = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
} else {
    middleWares = applyMiddleware(thunk)
}
export const store = createStore(rootReducer,middleWares)