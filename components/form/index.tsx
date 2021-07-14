import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootReduxState } from "../../types/General";
import Progress from "../stepper/Progress";
import AmountForm from "./components/AmountForm";
import ChildForm from "./components/ChildForm";
import PaymentForm from "./components/PaymentForm";
import PersonaliseForm from "./components/PersonaliseForm";

const Form = () => {
  const currentStep: number | any = useSelector<number | any>(
    (state: RootReduxState) => state.stepper.step
  );

  useEffect(() => {
    displayForm();
  }, [currentStep]);

  const displayForm = () => {
    switch (currentStep) {
      case 1:
        return <ChildForm />;
      case 2:
        return <AmountForm />;
      case 3:
        return <PersonaliseForm />;
      case 4:
        return <PaymentForm />;
    }
  };

  return (
    <div className="w-8/12 ml-auto flex justify-center items-center min-h-screen tab:w-full">
      <div>
        <img
          src="/logo.sootchy.svg"
          alt="logo"
          className="hidden items-center justify-center mx-auto mt-8 tab:block"
        />
        <div className="hidden tab:block">
          <Progress />
        </div>
        {displayForm()}
        <div className="hidden m-auto py-5 tab:block">
          <p className="mt-2 text-xs text-center text-gray-600 font-poppins">
            Sootchy makes sending gifts to your family <br /> and friends easier
            then ever.
          </p>
          <p className="text-center mt-2 text-xs text-gray-400 font-poppins">
            Copyright &copy; 2021. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
