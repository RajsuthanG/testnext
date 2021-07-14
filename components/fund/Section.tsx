import { useState } from "react";
import { useSelector } from "react-redux";
import { AccountType } from "../../types/Account";
import { RootReduxState } from "../../types/General";
import Modal from "./ShareModal";

type SectionProps = {
  error: boolean;
  handleRedirect: () => void;
};

const Section = ({ error, handleRedirect }: SectionProps) => {
  const [account] = useState<AccountType | null>(
    useSelector((state: RootReduxState) => state.account)
  );

  const handleContactSupport = () => {
    if (typeof window !== "undefined") {
      window.Intercom("show");
    }
  };

  const SuccessTsx = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
      setModalOpen(true);
    };

    const handleModalClose = () => {
      setModalOpen(false);
    };

    const link: string | any = window.location;

    return (
      <>
        <Modal isOpen={modalOpen} handleClose={handleModalClose} link={link} />
        <h1>
          Help{" "}
          {account &&
            `${account.beneficiary.firstName} ${account.beneficiary.lastName} `}
          Save for College
        </h1>
        <p>
          Give to {account && `${account.beneficiary.firstName}'s `} 529 College
          Savings Account and help build a <br /> brighter future with less
          reliance on student loans.
        </p>
        <div className="section__1__buttons">
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
      </>
    );
  };

  const ErrorTsx = () => (
    <>
      <h1>Help to Save for College</h1>
      <p>
        Give to a 529 College Savings Account and help build a <br /> brighter
        future with less reliance on student loans.
      </p>
      <button
        className="sootchy-btn-active"
        color="primary"
        onClick={handleContactSupport}
      >
        Contact support
      </button>
    </>
  );

  return <div className="section__1">{error ? ErrorTsx() : SuccessTsx()}</div>;
};

export default Section;
