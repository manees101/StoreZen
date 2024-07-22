import { createReducer,createAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder)=>{
  builder.addCase(createAction("productCreateRequest"), (state) => {
    state.isLoading = true;
  }),

  builder.addCase(createAction("productCreateSuccess"), (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  }),
  builder.addCase(createAction("productCreateFail"), (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  }),

  // get all products of shop
  builder.addCase(createAction("getAllProductsShopRequest"), (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("getAllProductsShopSuccess"), (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  }),
  builder.addCase(createAction("getAllProductsShopFailed"), (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }),

  // delete product of a shop
  builder.addCase(createAction("deleteProductRequest"), (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("deleteProductSuccess"), (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  }),
  builder.addCase(createAction("deleteProductFailed"), (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }),

  // get all products
  builder.addCase(createAction("getAllProductsRequest"), (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("getAllProductsSuccess"), (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload.products;
    state.count=action.payload.count
  }),
  builder.addCase(createAction("getAllProductsFailed"), (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }),
  
  builder.addCase(createAction("clearErrors"), (state) => {
    state.error = null;
  })
});
