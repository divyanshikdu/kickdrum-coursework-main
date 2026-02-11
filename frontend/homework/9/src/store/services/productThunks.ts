import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";


export const fetchProducts = createAsyncThunk<Product[]>(
    "products/fetchProducts",
    async () => {
        const res = await fetch("https://dummyjson.com/products")
        //TODO: typecast this response 
        const data = await res.json()
        return data.products 
    }
);


export const fetchProductById = createAsyncThunk<Product, string>(
    "products/fetchProductById",
    async (id: string) => {
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await res.json()
        return data 
    }
);

export const searchProducts = createAsyncThunk(
    "products/searchProducts",
    async (query: string) => {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
        const data = await res.json()
        //TODO: typecast this response
        return data.products as Product[]
    }
);