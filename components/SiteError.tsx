import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import "tailwindcss/tailwind.css";
import { secondaryBtnStyle } from "../components/form/components/styles";
import Head from "../components/seo/Head";

// Test Change

type SiteErrorProps = {
  primaryText: string;
  secondaryText: string;
  buttonText: string;
  link: string;
};

type StylesProps = {
  main: string;
  wrapper: string;
  primaryText: string;
  secondaryText: string;
};

const styles: StylesProps = {
  main: "flex justify-center items-center h-screen p-16",
  wrapper: "text-center",
  primaryText: "font-poppins text-8xl font-bold text-primary",
  secondaryText: "font-poppins text-gray-500 mt-1",
};

const SiteError: NextPage<SiteErrorProps> = ({
  primaryText,
  secondaryText,
  buttonText,
  link,
}) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(link);
  };

  return (
    <>
      <Head title={`Sootchy Gifting - ${primaryText}`} />
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <h1 className={styles.primaryText}>{primaryText}</h1>
          <h4 className={styles.secondaryText}>{secondaryText}</h4>
          <button className={secondaryBtnStyle} onClick={handleRedirect}>
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};

export default SiteError;
