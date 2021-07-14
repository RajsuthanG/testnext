import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { resetAccountState } from "../../redux/reducer/account";

// Components
import Head from "../../components/seo/Head";
import Header from "../../components/fund/Header";
import Details from "../../components/fund/Details";
import Blogs from "../../components/fund/Blogs";
import Footer from "../../components/fund/Footer";
import Loading from "../../components/loading/Loading";
import { resetStep } from "../../redux/reducer/stepper";
import { resetContributionState } from "../../redux/reducer/contribution";

const GeneralFundPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(resetStep());
    dispatch(resetAccountState());
    dispatch(resetContributionState());
    setLoading(false);
  }, []);

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div>
      <Head title="Sootchy Gifting - Easily Send gifts to your loved ones" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header
            error={false}
            handleRedirect={handleRedirect}
            general={true}
          />
          <Details />
          <Blogs />
          <Footer />
        </>
      )}
    </div>
  );
};

export default GeneralFundPage;
