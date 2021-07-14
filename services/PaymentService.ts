import uuid from "uuid";
import cryptoJs from "crypto-js";
import axios from "axios";

import { AuthviaTokenBodyType } from "../types/Payment";
import { ResponseErrorType } from "../types/General";

type createAuthviaCustomerFnType = (
  id: string,
  name: string,
  email: string
) => Promise<any>;

export const createAuthviaCustomer: createAuthviaCustomerFnType = async (
  id,
  name,
  email
) => {
  try {
    const sharedSecret =
      "cec9e016debdb3b8b56d0291f7552642cc0af15e811c1843bb35b621daa91e60" ||
      process.env.AUTHVIA_SECRET_MERCHANT;
    const timestamp = Math.min(Date.now() / 1000);
    const signature_value = uuid.v4();
    const hmac = cryptoJs.HmacSHA256(
      `${signature_value}.${signature_value.length}.${timestamp}`,
      sharedSecret
    );
    const encodedSource = cryptoJs.enc.Base64.stringify(hmac);

    const tokenResult = await axios({
      method: "post",
      url: "https://api.authvia.com/v3/tokens",
      data: <AuthviaTokenBodyType>{
        client_id: "91518442-5f74-4963-92af-1dc696e05ae0",
        signature_value: signature_value,
        timestamp: timestamp,
        signature: encodedSource,
        audience: "api.authvia.com/v3",
        scope: "customers:read customers:create customers:update",
        expiration: "30min",
        role: "merchant",
        merchantId: "92d6f70c-0a37-4e1b-9481-ce74cab61aa4",
      },
    });

    const newCustomerResult = await axios({
      method: "post",
      url: "https://api.authvia.com/v3/customers",
      data: {
        ref: id,
        name: name,
        addresses: [
          {
            type: "email",
            value: email,
          },
        ],
      },
      headers: {
        Authorization: "Bearer " + tokenResult.data.token,
      },
    });

    return newCustomerResult.data.ref;
  } catch (err) {
    return <ResponseErrorType>{
      success: false,
      message: "Unable to create Authvia Customer",
      err,
    };
  }
};
