import { createSlice } from "@reduxjs/toolkit";
import {
  ChangeContributionStateType,
  ContributionAction,
  ContributionType,
} from "../../types/Contribution";

const initialState: ContributionType = {
  amount: 0,
  contributor: {
    firstName: "",
    lastName: "",
    relationship: "Grandpa",
    email: "",
    message: "",
  },
};

const slice = createSlice({
  name: "contribution",
  initialState,
  reducers: {
    changeContributionState(
      state: ContributionType,
      action: ContributionAction
    ) {
      const { key, value }: ChangeContributionStateType = action.payload;
      if (key === "amount") {
        state.amount = +value;
      } else {
        return (state = {
          ...state,
          contributor: {
            ...state.contributor,
            [key]: value,
          },
        });
      }
    },
    resetContributionState(state: ContributionType) {
      return (state = initialState);
    },
  },
});

export default slice.reducer;
export const { changeContributionState, resetContributionState } =
  slice.actions;
