export type CreateAuthviaCustomerProps = {
  id: string;
  name: string;
  email: string;
};

export type AuthviaTokenBodyType = {
  client_id: string;
  signature_value: string;
  timestamp: number;
  signature: string;
  audience: string;
  scope: string;
  expiration: string;
  role: string;
  merchantId: string;
};
