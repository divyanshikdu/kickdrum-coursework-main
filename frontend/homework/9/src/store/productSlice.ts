import {createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import { fetchProductById, fetchProducts, searchProducts } from "./services/productThunks";



type ProductState = {
    products: Product[]
    selectedProduct: Product | null
    searchQuery: string
    searchResults: Product[]
    loading: boolean
    error: string | null
}

const startState: ProductState = {
    products: [],
    selectedProduct: null,
    loading:false,
    error:null,
    searchQuery:"",
    searchResults:[]    
}

const productSlice = createSlice({
    name: "products",
    initialState: startState,
    reducers:{
        setSearchQuery: (state, action) => {
    state.searchQuery = action.payload
    }
},
    extraReducers: (builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load products";
      })
            .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load product";
      })
      .addCase(searchProducts.pending, (state) => {
  state.loading = true
  state.error = null
})
.addCase(searchProducts.fulfilled, (state, action) => {
  state.loading = false
  state.searchResults = action.payload
})
.addCase(searchProducts.rejected, (state) => {
  state.loading = false
  state.error = "Failed to search products"
})

    },
});
export const { setSearchQuery } = productSlice.actions

export default productSlice.reducer