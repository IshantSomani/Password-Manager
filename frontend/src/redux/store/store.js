import { configureStore } from "@reduxjs/toolkit";
// import passwordReducer from "../slice/passwordSlice";
import passwordReducer from "../slice/passwordSlice";
 
const store = configureStore({
    reducer : {
        passwordList: passwordReducer
    }
})

export default store;