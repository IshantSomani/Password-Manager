import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = `${import.meta.env.VITE_API_URL}/userData`;

export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState =  {
    products: [],  
    status: STATUS.IDLE,
    error: null,
};

export const fetchData = createAsyncThunk('password/fetchData', async (id) => {
        const response = await axios.get(`${api}/getAllUserData/${id}`);
        // console.log(response)
        return response.data; 
});

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        // Add reducers if needed for updating specific parts of your state
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { } = passwordSlice.actions;  // Add actions if needed

export default passwordSlice.reducer;