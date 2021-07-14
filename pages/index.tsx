import { NextPage } from "next";
import Head from "../components/seo/Head";
import Form from "../components/form";
import "tailwindcss/tailwind.css";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Head title="Sootchy Gifting" />
      <div className="flex">
        <Sidebar />
        <Form />
      </div>
    </>
  );
};

export default Home;
