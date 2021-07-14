import { NextApiRequest, NextApiResponse } from "next";
import api from "../../../api";
import { AccountType, getAccountIdFn } from "../../../types/Account";
import { ResponseErrorType, ResponseSuccessType } from "../../../types/General";

const getAccountIdServer: getAccountIdFn = async (account: AccountType) => {
  let data = {
    owner: {
      firstName: account.accountOwner.firstName,
      lastName: account.accountOwner.lastName,
      email: account.email,
    },
    beneficiary: {
      firstName: account.beneficiary.firstName,
      lastName: account.beneficiary.lastName,
    },
  };
  let response = await api.post("/accounts/single/basic", data);

  if (
    response.data.success === false ||
    response.data.foundAccounts.length === 0 ||
    response.data.foundAccounts.length > 1
  ) {
    return <ResponseErrorType>{
      success: false,
      message: "Unable to find account",
      err: response.data.msg,
    };
  }

  return <ResponseSuccessType<"">>{
    success: true,
    message: "Successfully found account",
    data: response.data.foundAccounts[0].accountNumber,
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  getAccountIdServer(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json({ succes: false, err });
    });
}
