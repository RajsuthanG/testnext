import { useDispatch, useSelector } from "react-redux";
import { decreamentStep, increamentStep } from "../../../redux/reducer/stepper";
import {
  formTitle,
  inputStyle,
  labelStyle,
  primaryBtnStyle,
  secondaryBtnStyle,
  textAreaStyle,
} from "./styles";
import Dropdown from "../../dropdown/Dropdown";
import { changeContributionState } from "../../../redux/reducer/contribution";
import { RootReduxState } from "../../../types/General";
import { PersonaliseFormSchema } from "../schema";
import { useState } from "react";
import FormAlert from "../../alerts/FormAlert";

const PersonaliseForm = () => {
  const dispatch = useDispatch();
  const contributor = useSelector(
    (state: RootReduxState) => state.contribution.contributor
  );
  const [errors, setErrors] = useState([]);

  const handleSubmit = () => {
    PersonaliseFormSchema.validate(contributor, { abortEarly: false })
      .then(() => {
        dispatch(increamentStep());
        window.scroll(0, 0);
      })
      .catch((err) => {
        setErrors(err.inner);
        window.scroll(0, 0);
      });
  };

  const navigateBack = () => {
    dispatch(decreamentStep());
    window.scroll(0, 0);
  };

  const handleChange = (key: string, value: string) => {
    dispatch(changeContributionState({ key, value }));
  };

  return (
    <div className="flex flex-col justify-center py-10 p-12 mx-auto h-full tab:w-full">
      <p className={formTitle.title} style={{ color: "#111827" }}>
        Personalise Gift
      </p>
      <p className={formTitle.description}>
        Personalise your gift by adding your information, relationship and
        custom message.
      </p>
      {errors.length > 0 ? <FormAlert errors={errors} /> : ""}
      <div className="mt-6">
        <div className="grid grid-flow-row grid-cols-2 gap-4 mt-4 minMobile:grid-cols-1">
          <div>
            <label className={labelStyle}>Your First Name</label>
            <input
              type="search"
              placeholder="eg: Emma"
              className={inputStyle}
              name="firstName"
              value={contributor.firstName}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <label className={labelStyle}>Your Last Name</label>
            <input
              type="search"
              placeholder="eg: Wills"
              className={inputStyle}
              name="lastName"
              value={contributor.lastName}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelStyle}>Choose Relationship</label>
          <Dropdown />
        </div>
        <div className="mt-4">
          <label className={labelStyle}>Your Email</label>
          <input
            type="search"
            placeholder="eg: Wills"
            className={inputStyle}
            name="email"
            value={contributor.email}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className={labelStyle}>Message</label>
          <textarea
            placeholder="Have a great birthday..."
            className={textAreaStyle}
            style={{ minHeight: "120px", maxHeight: "120px" }}
            name="message"
            value={contributor.message}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="mt-2 flex w-full justify-end minMobile:block">
          <button onClick={navigateBack} className={secondaryBtnStyle}>
            Previous
          </button>
          <button onClick={handleSubmit} className={primaryBtnStyle}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonaliseForm;
