import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "idle",
    inventory: [],
    error: null
}

const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
    const { data: { inventory } } = await axios.get("http://localhost:5000/api/inventory");
    return inventory;
});

const addProduct = createAsyncThunk('inventory/addProduct', async (product) => {
    const { data: { inventory } } = await axios.post("http://localhost:5000/api/inventory/add", product);
    return inventory;
});

const removeProduct = createAsyncThunk('inventory/removeProduct', async (name) => {
    const { data: { inventory } } = await axios.put("http://localhost:5000/api/inventory/remove", { name });
    return inventory;
});

const modifyQuantity = createAsyncThunk('inventory/modifyQuantity', async ({ name, quantity }) => {
    return await axios.put("http://localhost:5000/api/inventory/changeStock", { name, quantity });
});

export const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    extraReducers: {
        [fetchInventory.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [fetchInventory.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.inventory = action.payload;
            state.error = null;
        },
        [fetchInventory.rejected]: (state) => {
            state.status = "failed";
            state.inventory = [];
            state.error = "Error fetching inventory";
        },
        [addProduct.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [addProduct.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.inventory = action.payload;
            state.error = null;
        },
        [addProduct.rejected]: (state) => {
            state.status = "failed";
            state.inventory = [];
            state.error = "Error adding product";
        },
        [removeProduct.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [removeProduct.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.inventory = action.payload;
            state.error = null;
        },
        [removeProduct.rejected]: (state) => {
            state.status = "failed";
            state.inventory = [];
            state.error = "Error removing product";
        },
        [modifyQuantity.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [modifyQuantity.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.inventory.find(product => product.name === action.payload.name).quantity = action.payload.quantity;
            state.error = null;
        },
        [modifyQuantity.rejected]: (state) => {
            state.status = "failed";
            state.error = "Error modifying quantity";
        }
    }
});

export { fetchInventory, addProduct, removeProduct, modifyQuantity };

export default inventorySlice.reducer;
