import { configureStore } from '@reduxjs/toolkit'
import {thunk} from "redux-thunk";
import weatherReducer from '../components/main/weatherSlice';

const store = configureStore({
    reducer:{
        weather:weatherReducer,
        middleware: [thunk],
        
    }
})

export default store