import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeContributionState } from "../../../redux/reducer/contribution";
import { decreamentStep, increamentStep } from "../../../redux/reducer/stepper";
import { RootReduxState } from "../../../types/General";
import FormAlert from "../../alerts/FormAlert";
import {
  badge,
  formTitle,
  iconInput,
  primaryBtnStyle,
  secondaryBtnStyle,
} from "./styles";

type BadgeAmountType = {
  id: number;
  value: number;
  style: string;
};

const AmountForm = () => {
  const dispatch = useDispatch();
  const contributionState = useSelector(
    (state: RootReduxState) => state.contribution
  );
  const [error, setError] = useState(false);

  const [badgeAmount, setBadgeAmount] = useState<BadgeAmountType[]>([
    {
      id: 1,
      value: 10,
      style: badge.inactive,
    },
    {
      id: 2,
      value: 25,
      style: badge.inactive,
    },
    {
      id: 3,
      value: 50,
      style: badge.inactive,
    },
    {
      id: 4,
      value: 100,
      style: badge.inactive,
    },
  ]);

  const handleSubmit = () => {
    if (contributionState.amount === 0) {
      setError(true);
      return false;
    }
    dispatch(increamentStep());
    window.scroll(0, 0);
  };

  const navigateBack = () => {
    dispatch(decreamentStep());
    window.scroll(0, 0);
  };

  useEffect(() => {
    // TODO: Make this function reusable
    const filteredBadge = badgeAmount.map((amount) => {
      if (amount.value === contributionState.amount) {
        return {
          ...amount,
          style: badge.active,
        };
      } else {
        return { ...amount, style: badge.inactive };
      }
    });
    setBadgeAmount(filteredBadge);
  }, [contributionState]);

  const handleBadgeClick = (id?: number) => {
    const filteredBadge = badgeAmount.map((amount) => {
      if (amount.id === id) {
        setError(false);
        dispatch(
          changeContributionState({ key: "amount", value: amount.value })
        );
        return {
          ...amount,
          style: badge.active,
        };
      } else {
        return { ...amount, style: badge.inactive };
      }
    });
    setBadgeAmount(filteredBadge);
  };

  const handleChange = (key: string, value: string | number | any) => {
    setError(false);
    let regex = /^[0-9]*$/;
    if (value.match(regex)) {
      dispatch(changeContributionState({ key, value }));
    }
  };

  return (
    <div className="flex flex-col justify-center py-10 mx-auto p-12 h-full tab:w-full">
      <p className={formTitle.title} style={{ color: "#111827" }}>
        Amount
      </p>
      <p className={formTitle.description}>
        Enter an amount you wish to contribute & the proceeds of your gift will
        go towards 's college fund.
      </p>
      {error && (
        <FormAlert
          errors={[{ message: "Contribution Amount cannot be empty" }]}
        />
      )}
      <div className="mt-6">
        <div className="flex flex-wrap items-stretch w-full mb-4 relative">
          <div className="flex -mr-px">
            <span className={iconInput.icon}>$</span>
          </div>
          <input
            autoComplete="off"
            placeholder="$10"
            className={iconInput.input}
            name="amount"
            value={
              contributionState.amount === 0 ? "" : contributionState.amount
            }
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="w-8/12 mt-6 text-gray-500 font-poppins">
          You can also pick an amount
        </div>
      </div>
      <div className="mt-2">
        {badgeAmount.map((amount) => (
          <button
            key={amount.id}
            className={amount.style}
            onClick={() => handleBadgeClick(amount.id)}
          >
            ${amount.value}
          </button>
        ))}
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
  );
};

export default AmountForm;
