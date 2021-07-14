import { ResponseErrorType, ResponseSuccessType } from "./General";

export type AccountType = {
  disableEdit: boolean;
  accountNumber?: string;
  email: string;
  beneficiary: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  accountOwner: {
    firstName: string;
    lastName: string;
    phone: string;
  };
};

export type GetAccountResponseType = {
  success: boolean;
  message: string;
  data: AccountType;
};

export type ChangeAccountStateType = {
  key: string;
  value: string;
  type?: string;
};

export type ChangeAccountStateAction = {
  payload: {
    key: string;
    value: string;
    type?: "accountOwner" | "beneficiary";
  };
};

export type PopulateAccountDataAction = {
  payload: AccountType | undefined;
};

export type DisableEditStateAction = {
  payload: boolean;
};

export type ChangedAccountType = Omit<AccountType, "accountOwner"> & {
  owner: AccountType["accountOwner"];
};

// ------------------------- Typed Functions -------------------------

export type getAccountFn = (
  id: string
) => Promise<ResponseSuccessType<AccountType> | ResponseErrorType>;

export type getAccountIdFn = (
  account: AccountType
) => Promise<ResponseSuccessType<""> | ResponseErrorType>;
