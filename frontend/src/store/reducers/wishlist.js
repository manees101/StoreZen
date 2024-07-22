import { createReducer,createAction } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState,(builder)=> {
  builder.addCase(createAction("addToWishlist"),
  (state, action) => {
    const item = action.payload;
    const isItemExist = state.wishlist.find((i) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        wishlist: state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        ),
      };
    } else {
      return {
        ...state,
        wishlist: [...state.wishlist, item],
      };
    }
  }),

  builder.addCase(createAction("removeFromWishlist"),
  (state, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((i) => i._id !== action.payload),
    };
  })
});
