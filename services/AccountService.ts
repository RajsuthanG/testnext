import axios from "axios";
import { AccountType } from "../types/Account";
import { ResponseErrorType } from "../types/General";
import { getUrl } from "./GeneralServices";

//------------------------- Functions -------------------------
export const getAccount = async (id: string | {} | undefined) => {
  try {
    let response = await axios.get(`${getUrl()}/api/account/${id}`);
    if (response.data.success === false) {
      return response;
    }
    return response.data;
  } catch (err) {
    return <ResponseErrorType>{
      success: false,
      message: "Unable to find account",
    };
  }
};

export const getAccountId = async (account: AccountType) => {
  try {
    let response = await axios.post(`${getUrl()}/api/account`, account);
    return response;
  } catch (err) {
    return <ResponseErrorType>{
      success: false,
      message: "Unable to find account",
    };
  }
};
