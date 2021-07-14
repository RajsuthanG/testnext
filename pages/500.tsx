import { NextPage } from "next";
import SiteError from "../components/SiteError";

const Custom500: NextPage = () => (
  <SiteError
    primaryText="500"
    secondaryText="Server Error"
    buttonText="Go to Home"
    link="/fund"
  />
);

export default Custom500;
