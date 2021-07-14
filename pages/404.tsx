import { NextPage } from "next";
import SiteError from "../components/SiteError";

const Custom404: NextPage = () => (
  <SiteError
    primaryText="404"
    secondaryText="The Page your looking for does not exist."
    buttonText="Go to Home"
    link="/fund"
  />
);

export default Custom404;
