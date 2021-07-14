import { AccountType } from "./Account";
import { ContributionType } from "./Contribution";
import { StepperType } from "./Stepper";

export interface RootReduxState {
  account: AccountType;
  contribution: ContributionType;
  general: GeneralType;
  stepper: StepperType;
}

export type GeneralType = {
  loading: boolean;
};

export type changeLoadingAction = {
  payload: boolean;
};

export type ResponseErrorType = {
  success: false;
  message: string;
  data?: any;
  status?: number;
};

export type ResponseSuccessType<T> = {
  success: true;
  message: string;
  data: T;
  status?: number;
};
