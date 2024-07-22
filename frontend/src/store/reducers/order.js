import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder)=>{
  // get all orders of user
  builder.addCase(createAction("getAllOrdersUserRequest"), (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("getAllOrdersUserSuccess"), (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  }),
  builder.addCase(createAction("getAllOrdersUserFailed"), (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }),
  
  // get all orders of shop
  builder.addCase(createAction("getAllOrdersShopRequest"), (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("getAllOrdersShopSuccess"), (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  }),
  builder.addCase(createAction("getAllOrdersShopFailed"), (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }),

  // get all orders for admin
  builder.addCase(createAction("adminAllOrdersRequest"), (state) => {
    state.adminOrderLoading = true;
  }),
  builder.addCase(createAction("adminAllOrdersSuccess"), (state, action) => {
    state.adminOrderLoading = false;
    state.adminOrders = action.payload;
  }),
  builder.addCase(createAction("adminAllOrdersFailed"), (state, action) => {
    state.adminOrderLoading = false;
    state.error = action.payload;
  }),
  builder.addCase(createAction("clearErrors"), (state) => {
    state.error = null;
  })
});
