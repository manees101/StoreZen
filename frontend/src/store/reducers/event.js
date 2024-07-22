import { createReducer,createAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, (builder)=>{
  builder.addCase(createAction("eventCreateRequest"),
  (state) => {
    state.isLoading = true;
  }),
  
  builder.addCase(createAction("eventCreateSuccess"),
  (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  }),
  builder.addCase(createAction("eventCreateFail"),
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  }),

  // get all events of shop
  builder.addCase(createAction("getAlleventsShopRequest"),
  (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("getAlleventsShopSuccess"),
  (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  }
),
  builder.addCase(createAction("getAlleventsShopFailed"),
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }),

  // delete event of a shop
  builder.addCase(createAction("deleteeventRequest"),
  (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("deleteeventSuccess"),
  (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  }),
  builder.addCase(createAction("deleteeventFailed"),
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
),

  // get all events 
  builder.addCase(createAction("getAlleventsRequest"),
  (state) => {
    state.isLoading = true;
  }),
  builder.addCase(createAction("getAlleventsSuccess"),
  (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  }),
  builder.addCase(createAction("getAlleventsFailed"),
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }),

  builder.addCase(createAction("clearErrors"),
  (state) => {
    state.error = null;
  })
});
