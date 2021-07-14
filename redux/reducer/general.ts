import { createSlice } from "@reduxjs/toolkit";
import { changeLoadingAction, GeneralType } from "../../types/General";

const initialState: GeneralType = {
  loading: false,
};

const slice = createSlice({
  name: "general",
  initialState,
  reducers: {
    changeLoading(state: GeneralType, action: changeLoadingAction) {
      state.loading = action.payload;
    },
  },
});

export default slice.reducer;
export const { changeLoading } = slice.actions;
