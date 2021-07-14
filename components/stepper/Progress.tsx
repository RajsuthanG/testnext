import { useSelector } from "react-redux";
import { RootReduxState } from "../../types/General";
import { FiCheck } from "react-icons/fi";
import { useEffect, useState } from "react";

type StepType = {
  id: number;
  title: string;
  description: string;
  status: "DONE" | "ACTIVE" | "INCOMPLETE";
  styles: StepStyleType | any; // Temporilly typed
};

type StepStyleType = {
  icon: string;
  title: string;
  description: string;
};

type StepStylesType = {
  done: StepStyleType;
  active: StepStyleType;
  incomplete: StepStyleType;
};

const commonStyles = "w-10 h-10 rounded-full flex justify-center items-center";
const mainColor = {
  bg: "bg-primary",
  border: {
    active: "border-primary",
    inactive: "border-gray-300",
  },
  text: "text-primary font-poppins",
};

const stepStyles: StepStylesType = {
  done: {
    icon: `${commonStyles} ${mainColor.bg} delay-40 duration-300 ease-in-out`,
    title: `${mainColor.text}`,
    description: "font-poppins",
  },
  active: {
    icon: `${commonStyles} border-4 ${mainColor.border.active} delay-40 duration-300 ease-in-out animate-pulse`,
    title: `${mainColor.text} delay-40 duration-300 ease-in-out `,
    description: "font-poppins",
  },
  incomplete: {
    icon: `${commonStyles} border-4 ${mainColor.border.inactive}`,
    title: "text-gray-500 font-poppins",
    description: "text-gray-500 font-poppins",
  },
};

const Progress = () => {
  const currentStep: number | any = useSelector<number | any>(
    (state: RootReduxState) => state.stepper.step
  );
  const [loading, setLoading] = useState(true);

  const [stepData, setStepData] = useState<StepType[]>([
    {
      id: 1,
      title: "Information",
      description: "Enter Child Information to contribute a gift",
      status: "INCOMPLETE",
      styles: {},
    },
    {
      id: 2,
      title: "Amount",
      description: "Enter Contribution Amount",
      status: "INCOMPLETE",
      styles: {},
    },
    {
      id: 3,
      title: "Personalise your Gift",
      description: "Add your details and personalize your gift",
      status: "INCOMPLETE",
      styles: {},
    },
    {
      id: 4,
      title: "Payment",
      description: "Add your details and personalize your gift",
      status: "INCOMPLETE",
      styles: {},
    },
  ]);

  const formatStepData = () => {
    let updatedStepData: StepType[] = stepData.map((thisStep) => {
      if (thisStep.id === currentStep) {
        return { ...thisStep, status: "ACTIVE", styles: stepStyles.active };
      } else if (currentStep > thisStep.id) {
        return { ...thisStep, status: "DONE", styles: stepStyles.done };
      } else {
        return {
          ...thisStep,
          status: "INCOMPLETE",
          styles: stepStyles.incomplete,
        };
      }
    });
    setStepData(updatedStepData);
  };

  useEffect(() => {
    formatStepData();
    setLoading(false);
  }, [currentStep]);

  return (
    <div className="tab:flex w-full left-0 items-center justify-center tab:top-10 tab:p-5">
      {stepData &&
        stepData.map((step, index) => (
          <div key={step.id} className="flex relative tab:flex-col">
            <div className="tab:flex">
              <div className={`${step.styles.icon}`}>
                {step.status === "DONE" && <FiCheck color="#fff" size={30} />}
                {step.status === "ACTIVE" && (
                  <div className={`${mainColor.bg} w-3 h-3 rounded-full`}></div>
                )}
              </div>
              {index !== 3 && (
                <div
                  className={` h-10 w-3px m-auto ${
                    currentStep - 1 > index ? `${mainColor.bg}` : "bg-gray-300"
                  } delay-40 duration-300 ease-in-out tab:h-1 tab:w-20 minMobile:w-9`}
                ></div>
              )}
            </div>
            <div className="progress__text">
              <h4
                className={`${step.styles.title} ml-2 uppercase text-sm font-semibold tab:ml-0 tab:hidden`}
              >
                {step.title}
              </h4>
              <p
                className={`${step.styles.description} ml-2 text-sm text-gray-700 mt-1 tab:hidden`}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Progress;
