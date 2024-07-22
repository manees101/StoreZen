import { createReducer,createAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const sellerReducer = createReducer(initialState,(builder)=> {
  builder.addCase(createAction("LoadSellerRequest"), (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("LoadSellerSuccess"), (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  }),
  builder.addCase(
    createAction("LoadSellerFail"), (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    }
  ),
  // get all sellers ---admin
  builder.addCase(createAction("getAllSellersRequest"), (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("getAllSellersSuccess"), (state, action) => {
    state.isLoading = false;
    state.sellers = action.payload;
  }),
  builder.addCase(createAction("getAllSellerFailed"), (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }),
  builder.addCase(createAction("clearErrors"), (state) => {
    state.error = null;
  })
});
