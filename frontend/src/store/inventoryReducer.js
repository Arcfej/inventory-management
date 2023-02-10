import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "idle",
    products: [],
    error: null
}

const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
    const { data: { inventory } } = await axios.get("http://localhost:5000/api/inventory", { withCredentials: false });
    return inventory;
});

const addProduct = createAsyncThunk('inventory/addProduct', async (product) => {
    const { data: { inventory } } = await axios.post("http://localhost:5000/api/inventory/add", product, { withCredentials: false });
    return inventory;
});

const removeProduct = createAsyncThunk('inventory/removeProduct', async (name) => {
    const { data: { inventory } } = await axios.put("http://localhost:5000/api/inventory/remove", { name }, { withCredentials: false });
    return inventory;
});

const modifyQuantity = createAsyncThunk('inventory/modifyQuantity', async ({ name, quantity }) => {
    return await axios.put("http://localhost:5000/api/inventory/changeStock", { name, quantity }, { withCredentials: false });
});

export const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchInventory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchInventory.rejected, (state) => {
                state.status = "failed";
                state.products = [];
                state.error = "Error fetching inventory";
            })
            .addCase(addProduct.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
                state.error = null;
            })
            .addCase(addProduct.rejected, (state) => {
                state.status = "failed";
                state.products = [];
                state.error = "Error adding product";
            })
            .addCase(removeProduct.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
                state.error = null;
            })
            .addCase(removeProduct.rejected, (state) => {
                state.status = "failed";
                state.products = [];
                state.error = "Error removing product";
            })
            .addCase(modifyQuantity.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(modifyQuantity.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload.data.inventory;
                state.error = null;
            })
            .addCase(modifyQuantity.rejected, (state) => {
                state.status = "failed";
                state.error = "Error modifying quantity";
            });
    }
});

export { fetchInventory, addProduct, removeProduct, modifyQuantity };

export default inventorySlice.reducer;
