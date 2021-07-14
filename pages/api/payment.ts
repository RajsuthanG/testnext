import axios from "axios";
import uuid from "uuid";

import { NextApiRequest, NextApiResponse } from "next";
import { createAuthviaCustomer } from "../../services/PaymentService";

export default function handler(
  req: NextApiRequest | any,
  res: NextApiResponse
) {
  createAuthviaCustomer(uuid.v4(), "Raj", "raj.gopinath@sootchy.com").then(
    async (token) => {
      if (req.query.email && req.query.childName && req.query.amount) {
        req.email = req.query.email;
      } else {
        return res.send(
          "Something went wrong. Please contact customer support."
        );
      }

      const sharedSecret =
        "19378578c886fdb825ea876c7ae981d33387f48cf15d05da5f63905df5076ec3" ||
        process.env.AUTHVIA_SECRET;

      let giftCode = String(req.query.childFirstName).trim().toUpperCase();
      giftCode += Math.floor(Math.random() * 90000) + 10000;

      let giftExp: any = new Date();
      giftExp.setDate(giftExp.getDate() + 30);
      giftExp = String(giftExp);

      const giftID = uuid.v4();

      const cryptoJs = require("crypto-js");

      const timestamp = Math.min(Date.now() / 1000);
      const signature_value = uuid.v4();
      const token_secret = { sharedSecret };
      const hmac = cryptoJs.HmacSHA256(
        `${signature_value}.${signature_value.length}.${timestamp}`,
        sharedSecret
      );
      const encodedSource = cryptoJs.enc.Base64.stringify(hmac);

      try {
        const tokenResultGUI = await axios.post(
          "https://api.authvia.com/v3/tokens",
          {
            client_id: "b87e915c-5765-44dc-b2c9-38f21fdf8c89",
            signature_value: signature_value, //secretValue, //signature,
            timestamp: timestamp,
            signature: encodedSource, //signatureString, //'HMAC SHA256',
            audience: "api.authvia.com/v3",
            sub: token,

            scope:
              "customers.payment_methods:create customers.transactions:create customers.transactions:read",

            config: `amount=${req.query.amount}&description=Sootchy Gift to ${req.query.childName}`,

            expiration: "30min",
            // role: 'customer',
            // merchantId: '',
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(tokenResult.data);

        // console.log(newCustomerResult.data);

        res.send(`<!-- Browser Polyfills -->
    <html>
    <head><meta content="width=device-width, initial-scale=1" name="viewport"/><title>Sootchy</title></head>
    <body> 
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.3/webcomponents-loader.js"></script>
      <script src="https://cdn.authvia.com/loader/1.0.0/web-component.js"></script>
      <av-loader
        module="payment-method"
        token="${tokenResultGUI.data.token}"
    ></av-loader>
    <script> 
    document
      .querySelector('av-loader')
      .addEventListener('authvia', (event) => {
        console.log('authvia event', event.detail)
  
        if(event.detail.type === 'payment.success') {
          var payload = event.detail.payload.transaction;
          // send POST request to Accounts API
          var xhr = new XMLHttpRequest();
          xhr.open("POST", 'https://prod.api.sootchy529.com/accounts/authvia/create-gift', true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({
            accountNumber:"${req.query.accountNumber}",
            txnID: payload.references.gateway,
            amount: payload.amount,
            giftAmount: "${req.query.giftAmount}",
            description: payload.description,
            status: payload.status,
            payrixUserID: payload.userId,
            references: payload.references,
            fee: "${req.query.fee}",
            paymentMethod: payload.paymentMethod,
            giftCode: "${giftCode}",
            giftExp: "${giftExp}",
            giftID: "${giftID}",
            to: {
              childFirstName: "${req.query.childFirstName}",
              childLastName: "${req.query.childLastName}",
              parentFirstName: "${req.query.parentFirstName}",
              parentLastName: "${req.query.parentLastName}",
              email: "${req.query.toEmail}",
              phone: "${req.query.toPhone}",
              accountNumber: "${req.query.accountNumber}"
            },
            from: {
              firstName: "${req.query.fromFirstName}", 
              lastName: "${req.query.fromLastName}", 
              email: "${req.query.giftFromEmail}",
              relationship: "${req.query.toRelationship}",
              message: "${req.query.message}", 
            }
          })); 
  
          // send another post
          var xhr = new XMLHttpRequest();
          xhr.open("POST", '/api/start-journey', true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({
            accountNumber:"${req.query.accountNumber}",
            txnID: payload.references.gateway,
            amount: "${req.query.giftAmount}",
            description: payload.description,
            status: payload.status,
            payrixUserID: payload.userId,
            references: payload.references,
            fee: "${req.query.fee}",
            paymentMethod: payload.paymentMethod,
            giftCode: "${giftCode}",
            giftExp: "${giftExp}",
            giftID: "${giftID}",
            giftAmount: "${req.query.giftAmount}",
            to: {
              childFirstName: "${req.query.childFirstName}",
              childLastName: "${req.query.childLastName}",
              parentFirstName: "${req.query.parentFirstName}",
              parentLastName: "${req.query.parentLastName}",
              email: "${req.query.toEmail}",
              phone: "${req.query.toPhone}"
            },
            from: {
              firstName: "${req.query.fromFirstName}", 
              lastName: "${req.query.fromLastName}", 
              email: "${req.query.giftFromEmail}",
              relationship: "${req.query.toRelationship}",
              message: "${req.query.message}", 
            }
          })); 
        }
      });
    </script></body>
     </html>`);
      } catch (err) {
        return err;
      }
    }
  );
}
