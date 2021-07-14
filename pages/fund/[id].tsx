import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAccount } from "../../services/AccountService";
import {
  populateAccountData,
  resetAccountState,
  changeEditState,
} from "../../redux/reducer/account";
import { increamentStep, resetStep } from "../../redux/reducer/stepper";
import { resetContributionState } from "../../redux/reducer/contribution";

// Components
import Head from "../../components/seo/Head";
import Header from "../../components/fund/Header";
import Details from "../../components/fund/Details";
import Section from "../../components/fund/Section";
import Blogs from "../../components/fund/Blogs";
import Footer from "../../components/fund/Footer";
import Loading from "../../components/loading/Loading";

type Props = {
  id?: {} | string;
};

const SingleFundPage: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    dispatch(resetStep());
    dispatch(resetAccountState());
    dispatch(resetContributionState());
    getAccountAPI();
  }, []);

  const getAccountAPI = async () => {
    const response = await getAccount(id);
    if (response.success === true) {
      dispatch(populateAccountData(response.data));
      dispatch(changeEditState(true));
    } else {
      dispatch(resetAccountState());
      setError(true);
    }
    setLoading(false);
  };

  const handleRedirect = () => {
    dispatch(increamentStep());
    router.push("/");
  };

  return (
    <div>
      <Head title="Sootchy Gifting - Easily Send gifts to your loved ones" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header error={error} handleRedirect={handleRedirect} />
          <Details />
          <Section error={error} handleRedirect={handleRedirect} />
          <Blogs />
          <Footer />
        </>
      )}
    </div>
  );
};

SingleFundPage.getInitialProps = async ({ query }) => {
  let { id } = query;
  return { id };
};

export default SingleFundPage;
