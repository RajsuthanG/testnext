import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAccountState } from "../../../redux/reducer/account";
import { resetContributionState } from "../../../redux/reducer/contribution";
import { decreamentStep, resetStep } from "../../../redux/reducer/stepper";
import { RootReduxState } from "../../../types/General";
import { calculateProcessingFee } from "../../../utilities/paymentUtilities";
import { card, formTitle, primaryBtnStyle, secondaryBtnStyle } from "./styles";
import Loading from "../../loading/Loading";
import { generatePaymentData } from "../../../utilities/paymentUtilities";
import axios from "axios";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const rootState = useSelector((state: RootReduxState) => state);
  const [loading, setLoading] = useState<boolean>(true);
  const [cardData, setCardData] = useState({
    to: "",
    from: "",
    email: "",
    amount: 0,
    fee: 0,
    total: 0,
  });

  useEffect(() => {
    setCardData({
      to: `${rootState.account.beneficiary.firstName} ${rootState.account.beneficiary.lastName}`,
      from: `${rootState.contribution.contributor.firstName} ${rootState.contribution.contributor.lastName}`,
      email: rootState.contribution.contributor.email,
      amount:
        rootState.contribution.amount -
        calculateProcessingFee(rootState.contribution.amount),
      fee: calculateProcessingFee(rootState.contribution.amount),
      total: rootState.contribution.amount,
    });
    setLoading(false);
  }, [rootState]);

  const handleSubmit = () => {
    const { url, zapierData } = generatePaymentData(rootState);
    axios.post("/api/zapier", zapierData);
    router.push(url);
    dispatch(resetStep());
    dispatch(resetAccountState());
    dispatch(resetContributionState());
  };

  const navigateBack = () => {
    dispatch(decreamentStep());
    window.scroll(0, 0);
  };

  return (
    <div className="flex flex-col justify-center py-10 p-12 mx-auto h-full tab:w-full">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <p className={formTitle.title} style={{ color: "#111827" }}>
            Payment
          </p>
          <p className={formTitle.description}>
            Please confirm the information below and, once ready, press continue
            to add your payment method.
          </p>
          <div className="mt-8 p-7 rounded-xl border border-gray-200">
            <div className="">
              <p className={card.title}>Details</p>
              <div className={card.flexStyle}>
                <p className={card.label}>To:</p>
                <p className={card.value}>{cardData.to}</p>
              </div>
              <div className={card.flexStyle}>
                <p className={card.label}>From:</p>
                <p className={card.value}>{cardData.from}</p>
              </div>
              <div className={card.flexStyle}>
                <p className={card.label}>Your email:</p>
                <p className={card.value}>{cardData.email}</p>
              </div>
            </div>
            <div className="mt-8">
              <p className={card.title}>Summary</p>
              <div className={card.flexStyle}>
                <p className={card.label}>Amount:</p>
                <p className={card.value}>${cardData.amount}</p>
              </div>
              <div className={card.flexStyle}>
                <p className={card.label}>Processing Fees:</p>
                <p className={card.value}>${cardData.fee}</p>
              </div>
              <hr className="mt-4" />
              <div className="flex mt-4 justify-between items-center">
                <p className={card.label}>Total:</p>
                <p className={card.mainValue}>${cardData.total}</p>
              </div>
            </div>
          </div>
          <div className="mt-2 flex w-full justify-end minMobile:block">
            <button onClick={navigateBack} className={secondaryBtnStyle}>
              Previous
            </button>
            <button onClick={handleSubmit} className={primaryBtnStyle}>
              Confirm Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
