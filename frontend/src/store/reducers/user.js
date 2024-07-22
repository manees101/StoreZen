import { createReducer,createAction } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder)=>{
  builder.addCase(
    createAction("LoadUserRequest"), (state) => {
      state.loading = true;
    },
  ),
  builder.addCase(
    createAction("LoadUserSuccess"), (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    }
  ),
  builder.addCase(
   createAction("LoadUserFail"), (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    }
  ),
  // update user information
  builder.addCase(
    createAction("updateUserInfoRequest"), (state) => {
      state.loading = true;
    }
  ),
  builder.addCase(
    createAction("updateUserInfoSuccess"), (state, action) => {
      state.loading = false;
      state.user = action.payload;
    }
  ),
  builder.addCase(
    createAction("updateUserInfoFailed"), (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  )
  // update user address
  builder.addCase(
   createAction("updateUserAddressRequest"), (state) => {
      state.addressloading = true;
    }
  ),
  builder.addCase(
    createAction("updateUserAddressSuccess"), (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    }
  ),
  builder.addCase(
    createAction("updateUserAddressFailed"), (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    }
  ),
  // delete user address
  builder.addCase(
    createAction("deleteUserAddressRequest"), (state) => {
      state.addressloading = true;
    }
  ),
  builder.addCase(
    createAction("deleteUserAddressSuccess"), (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    }
  ),
  builder.addCase(
    createAction("deleteUserAddressFailed"), (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    }
  ),
  // get all users --- admin
 builder.addCase(
   createAction("getAllUsersRequest"), (state) => {
     state.usersLoading = true;
   }
 ),
 builder.addCase(
   createAction("getAllUsersSuccess"), (state,action) => {
     state.usersLoading = false;
     state.users = action.payload;
   }
 ),
 builder.addCase(
   createAction("getAllUsersFailed"), (state,action) => {
     state.usersLoading = false;
     state.error = action.payload;
   }
 ),
 builder.addCase(
   createAction("clearErrors"), (state) => {
     state.error = null;
   }
),
builder.addCase(
  createAction("clearMessages"), (state) => {
    state.successMessage = null;
  }
)  
});
