import { useState } from "react";
import { useSelector } from "react-redux";
import { AccountType } from "../../types/Account";
import { RootReduxState } from "../../types/General";
import { calculateAge } from "../../utilities/generalUtilities";
import Modal from "./ShareModal";

type HeaderProps = {
  error: boolean;
  general?: boolean;
  handleRedirect: () => void;
};

const Header = ({ error, handleRedirect, general }: HeaderProps) => {
  const [account] = useState<AccountType | null>(
    useSelector((state: RootReduxState) => state.account)
  );

  const GeneralTsx = () => {
    return (
      <div className="header__info__bottom">
        <h1>
          Share the Gift of <br /> Higher Education
        </h1>
        <p>
          Give the gift of higher education and show your loved one that you
          care by contributing today.
        </p>

        <button
          className="sootchy-btn-active"
          color="primary"
          onClick={handleRedirect}
        >
          Get Started
        </button>
      </div>
    );
  };

  const SuccessTsx = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
      setModalOpen(true);
    };

    const handleModalClose = () => {
      setModalOpen(false);
    };

    const logo: string | null =
      account &&
      account.beneficiary.firstName[0] + account.beneficiary.lastName[0];
    const age: number | null =
      account && calculateAge(account.beneficiary.dateOfBirth);
    const fullName: string | null =
      account &&
      `${account.accountOwner.firstName} ${account.accountOwner.lastName} `;
    const isChild: boolean | null =
      account &&
      account.accountOwner.firstName + account.accountOwner.lastName ===
        account.beneficiary.firstName + account.beneficiary.lastName
        ? false
        : true;
    const link: string | any = window.location;

    return (
      <div>
        <Modal isOpen={modalOpen} handleClose={handleModalClose} link={link} />
        <div className="header__info__top">
          <div className="header__info__top__logo">{logo}</div>
          <div className="header__info__top__text">
            <h4>{fullName}</h4>
            <p>
              {age === 0
                ? `less than 1 ${fullName}`
                : `${age} years old ${fullName}`}
              {isChild && "'s Child"}
            </p>
          </div>
        </div>
        <div className="header__info__bottom">
          <h1>
            Make a Difference
            <br /> in {fullName}
            Future!
          </h1>
          <p>
            Give the gift of higher education and show {fullName}
            that you care by contributing today.
          </p>
          <div className="header__info__bottom__buttons">
            <button
              className="sootchy-btn-active"
              color="primary"
              onClick={handleRedirect}
            >
              Send a Gift
            </button>
            <button
              className="sootchy-btn-active-outlined"
              color="primary"
              onClick={handleModalOpen}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ErrorTsx = () => {
    const handleContactSupport = () => {
      if (typeof window !== "undefined") {
        window.Intercom("show");
      }
    };
    return (
      <div className="header__info__bottom">
        <h1>
          Sorry! Unable to find <br /> Sootchy Account
        </h1>
        <p>
          Please try again using the correct link from your soothcy mobile app.
          If Problem still exists please contact support.
        </p>

        <button
          className="sootchy-btn-active"
          color="primary"
          onClick={handleContactSupport}
        >
          Contact support
        </button>
      </div>
    );
  };

  return (
    <div className="header__fund">
      <img
        src="https://sootchy-assets.s3.us-east-2.amazonaws.com/gifting-website/sootchy_logo.png"
        className="block-center dolphin-img-1"
      />
      <div className="header__main container">
        {general ? (
          <div className="header__info">{GeneralTsx()}</div>
        ) : (
          <div className="header__info">
            {error ? ErrorTsx() : SuccessTsx()}
          </div>
        )}
        <div className="header__image">
          <img src="https://sootchy-assets.s3.us-east-2.amazonaws.com/gifting-website/Diversity-Gifts-1.png" />
        </div>
      </div>
    </div>
  );
};

export default Header;
