import { createSlice } from "@reduxjs/toolkit";
import { StepperType } from "../../types/Stepper";

const initialState: StepperType = {
  step: 1,
};

const slice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    increamentStep(state: StepperType) {
      if (state.step <= 3) {
        state.step = state.step + 1;
      }
    },
    decreamentStep(state: StepperType) {
      if (state.step >= 2) {
        state.step = state.step - 1;
      }
    },
    resetStep(state: StepperType) {
      return (state = initialState);
    },
  },
});

export default slice.reducer;
export const { increamentStep, decreamentStep, resetStep } = slice.actions;
