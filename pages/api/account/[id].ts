import { NextApiRequest, NextApiResponse } from "next";
import api from "../../../api";

import { AccountType } from "../../../types/Account";
import { ResponseErrorType, ResponseSuccessType } from "../../../types/General";

export const getAccountServer = async (id: string) => {
  let response = await api.get(`/accounts/single/basic/${id}`);
  return response.data;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id: any = req.query.id;
  if (!id) {
    return res.status(400).json(<ResponseErrorType>{
      success: false,
      message: "ID not available",
    });
  }
  getAccountServer(id)
    .then((response) => {
      if (response.success === false) {
        return res.status(400).json(<ResponseErrorType>{
          success: false,
          message: "ID not available or Bad Request",
        });
      }

      return res.status(200).json(<ResponseSuccessType<AccountType>>{
        success: true,
        data: {
          accountNumber: response.data.accountNumber,
          email: response.data.accountOwner.email,
          beneficiary: {
            firstName: response.data.beneficiary.firstName,
            lastName: response.data.beneficiary.lastName,
            dateOfBirth: response.data.beneficiary.dateOfBirth,
          },
          accountOwner: {
            firstName: response.data.accountOwner.firstName,
            lastName: response.data.accountOwner.lastName,
            phone: response.data.accountOwner.phone,
          },
        },
      });
    })
    .catch((err) => res.status(400).json({ err }));
}
