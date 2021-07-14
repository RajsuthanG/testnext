import { createSlice } from "@reduxjs/toolkit";
import {
  AccountType,
  ChangeAccountStateAction,
  ChangeAccountStateType,
  DisableEditStateAction,
  PopulateAccountDataAction,
} from "../../types/Account";

const initialState: AccountType = {
  disableEdit: false,
  accountNumber: "",
  email: "",
  beneficiary: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  },
  accountOwner: {
    firstName: "",
    lastName: "",
    phone: "",
  },
};

const slice = createSlice({
  name: "account",
  initialState,
  reducers: {
    changeAccountState(state: AccountType, action: ChangeAccountStateAction) {
      const { key, value, type }: ChangeAccountStateType = action.payload;
      if (key === "accountNumber" || key === "email") {
        return (state = {
          ...state,
          [key]: value,
        });
      }

      if (type === "beneficiary") {
        return (state = {
          ...state,
          beneficiary: {
            ...state.beneficiary,
            [key]: value,
          },
        });
      }

      if (type === "accountOwner") {
        return (state = {
          ...state,
          accountOwner: {
            ...state.accountOwner,
            [key]: value,
          },
        });
      }
    },
    populateAccountData(state: AccountType, action: PopulateAccountDataAction) {
      return (state = <AccountType>action.payload);
    },
    changeEditState(state: AccountType, action: DisableEditStateAction) {
      console.log(action.payload);
      state.disableEdit = action.payload;
    },
    resetAccountState(state: AccountType) {
      return (state = initialState);
    },
  },
});

export default slice.reducer;
export const {
  changeAccountState,
  populateAccountData,
  resetAccountState,
  changeEditState,
} = slice.actions;
