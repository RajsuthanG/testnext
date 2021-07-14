import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeAccountState } from "../../../redux/reducer/account";
import { increamentStep } from "../../../redux/reducer/stepper";
import { RootReduxState } from "../../../types/General";

import { getAccountId } from "../../../services/AccountService";

import InputLoading from "../../loading/InputLoading";
import FormAlert from "../../alerts/FormAlert";

import { ChildFormSchema } from "../schema";

import {
  formTitle,
  inputStyle,
  inputDisabledStyle,
  labelStyle,
  primaryBtnStyle,
} from "./styles";

const ChildForm = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootReduxState) => state.account);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async () => {
    ChildFormSchema.validate(account, { abortEarly: false })
      .then(async () => {
        setErrors([]);
        setLoading(true);
        if (!account.accountNumber) {
          const response = await getAccountId(account);
          if (response.data.success == true) {
            dispatch(
              changeAccountState({
                key: "accountNumber",
                value: response.data.data,
                type: "accountOwner",
              })
            );
            setLoading(false);
            dispatch(increamentStep());
            window.scroll(0, 0);
          } else {
            dispatch(
              changeAccountState({
                key: "accountNumber",
                value: "",
                type: "accountOwner",
              })
            );
          }
        }
        setLoading(false);
        dispatch(increamentStep());
        window.scroll(0, 0);
      })
      .catch((err) => {
        setErrors(err.inner);
      });
  };

  const handleChange = (
    key: string,
    value: string,
    type?: "beneficiary" | "accountOwner"
  ) => {
    dispatch(changeAccountState({ key, value, type }));
  };

  return (
    <div className="flex flex-col justify-center py-10 p-12 mx-auto h-full tab:w-full">
      <p className={formTitle.title} style={{ color: "#111827" }}>
        Information
      </p>
      <p className={formTitle.description}>
        Enter child's & parent information, this will help us search for the
        correct person you are contributing.
      </p>
      {errors.length > 0 ? <FormAlert errors={errors} /> : ""}
      <div className="mt-6">
        <div className="grid grid-flow-row grid-cols-2 gap-4 mt-4 minMobile:grid-cols-1">
          <div className="">
            <label className={labelStyle}>Child First Name</label>
            <input
              type="search"
              placeholder="eg: David"
              className={account.disableEdit ? inputDisabledStyle : inputStyle}
              value={account.beneficiary.firstName}
              onChange={(e) =>
                handleChange(e.target.name, e.target.value, "beneficiary")
              }
              disabled={account.disableEdit}
              name="firstName"
            />
          </div>
          <div className="">
            <label className={labelStyle}>Child Last Name</label>
            <input
              type="search"
              placeholder="eg: Adefeso"
              className={account.disableEdit ? inputDisabledStyle : inputStyle}
              value={account.beneficiary.lastName}
              onChange={(e) =>
                handleChange(e.target.name, e.target.value, "beneficiary")
              }
              disabled={account.disableEdit}
              name="lastName"
            />
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-4 mt-4 minMobile:grid-cols-1">
          <div className="">
            <label className={labelStyle}>Parent First Name</label>
            <input
              type="search"
              placeholder="eg: Argi"
              className={account.disableEdit ? inputDisabledStyle : inputStyle}
              value={account.accountOwner.firstName}
              onChange={(e) =>
                handleChange(e.target.name, e.target.value, "accountOwner")
              }
              disabled={account.disableEdit}
              name="firstName"
            />
          </div>
          <div className="">
            <label className={labelStyle}>Parent Last Name</label>
            <input
              type="search"
              placeholder="eg: Avetisyan"
              className={account.disableEdit ? inputDisabledStyle : inputStyle}
              value={account.accountOwner.lastName}
              onChange={(e) =>
                handleChange(e.target.name, e.target.value, "accountOwner")
              }
              disabled={account.disableEdit}
              name="lastName"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={labelStyle}>Email Address</label>
          <input
            type="search"
            placeholder="example@example.com"
            className={account.disableEdit ? inputDisabledStyle : inputStyle}
            name="email"
            value={account.email}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            disabled={account.disableEdit}
          />
        </div>
        <div className="mt-4">
          <label className={labelStyle}>Phone</label>
          <input
            type="search"
            placeholder="1-123-123-123"
            className={account.disableEdit ? inputDisabledStyle : inputStyle}
            value={account.accountOwner.phone}
            onChange={(e) =>
              handleChange(e.target.name, e.target.value, "accountOwner")
            }
            disabled={account.disableEdit}
            name="phone"
          />
        </div>

        <div className="mt-2 flex w-full justify-end">
          <button onClick={handleSubmit} className={primaryBtnStyle}>
            {loading ? <InputLoading /> : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildForm;
