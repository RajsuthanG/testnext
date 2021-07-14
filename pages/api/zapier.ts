import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  axios({
    method: "post",
    url: "https://hooks.zapier.com/hooks/catch/7789730/oenes7p/",
    data: req.body,
  })
    .then((response) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Zapier Post failed",
      });
    });
}
