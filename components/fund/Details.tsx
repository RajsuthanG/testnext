import { useState } from "react";
import { useSelector } from "react-redux";
import { AccountType } from "../../types/Account";
import { RootReduxState } from "../../types/General";

const Details = () => {
  const [account] = useState<AccountType>(
    useSelector((state: RootReduxState) => state.account)
  );
  return (
    <div className="details container">
      <div className="details__one">
        <h1>What is Sootchy?</h1>
        <p>
          Sootchy is a platform on a mission to eradicate student loan debt.{" "}
          <br />
          We do this by making it easy to start a 529 College Savings Account
          with our app.
        </p>
      </div>
      <div className="details__two">
        <h1>Why Give to a 529 Account?</h1>
        <div className="details__two__grid">
          <div>
            <img
              className="m-auto text-center"
              src="https://sootchy-assets.s3.us-east-2.amazonaws.com/gifting-website/icon_growth.png"
            />
            <h4>Tax-free growth</h4>
            <p>
              {account.beneficiary.firstName &&
                `${account.beneficiary.firstName}'s `}
              529 College Savings Account grows tax free, and many contributions
              are tax deductible.{" "}
            </p>
          </div>
          <div>
            <img
              className="m-auto text-center"
              src="https://sootchy-assets.s3.us-east-2.amazonaws.com/gifting-website/icon_checklist.svg"
            />
            <h4>Extended Coverage</h4>
            <p>
              From books and a laptop to food and housing, your gift can pay
              beyond just tuition!{" "}
            </p>
          </div>
          <div>
            <img
              className="m-auto text-center"
              src="https://sootchy-assets.s3.us-east-2.amazonaws.com/gifting-website/icon_grad.svg"
            />
            <h4>Education Options</h4>
            <p>
              College, trade school, art institutes, and other higher education
              are covered.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="details__three">
        <h1>Occasions for Gifting</h1>
        <div className="details__three__grid">
          <div>
            <div className="emoji">🎉</div>
            <p>Birthdays</p>
          </div>
          <div>
            <div className="emoji">🎓</div>
            <p>Graduation</p>
          </div>
          <div>
            <div className="emoji">🎄</div>
            <p>Holidays</p>
          </div>
          <div>
            <div className="emoji">🏆</div>
            <p>Milestones</p>
          </div>
          <div>
            <div className="emoji">🤗</div>
            <p>Just because</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
