export const formTitle: { title: string; description: string } = {
  title:
    "text-2xl font-semibold text-gray-900 font-poppins minMobile:text-center",
  description:
    "w-8/12 mt-1 text-gray-500 font-poppins minMobile:text-center minMobile:w-full",
};

export const commonInputStyle: string =
  "mt-2 px-4 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded-md text-sm border outline-none w-full focus:border-primary font-poppins";

export const inputStyle: string = commonInputStyle;

export const inputDisabledStyle: string = `${commonInputStyle} bg-gray-100 text-gray-400`;

export const textAreaStyle: string =
  "mt-2 px-4 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded-md text-sm border outline-none w-full focus:border-primary font-poppins";

export const iconInput: { icon: string; input: string } = {
  icon: "flex items-center leading-normal bg-grey-lighter rounded-l-md border border-r-0 border-grey-light px-4 whitespace-no-wrap text-grey-dark text-sm",
  input:
    "flex-shrink flex-grow w-px flex-1 border h-10 px-4 py-6 relative outline-none rounded-r-md text-sm focus:border-primary",
};

export const badge: { active: string; inactive: string } = {
  active:
    "bg-primary rounded-full p-4 font-semibold text-white text-sm mr-3 cursor-pointer transition minMobile:mt-4",
  inactive:
    "bg-gray-100 rounded-full p-4 font-semibold text-gray-500 text-sm mr-3 cursor-pointer transition minMobile:mt-4",
};

export const labelStyle: string = "text-sm text-gray-600 font-poppins";

export const primaryBtnStyle: string =
  "rounded-md justify-end bg-primary text-right text-white px-10 py-3 transition duration-200 mt-4 hover:bg-primaryDark font-poppins minMobile:w-full minMobile:text-center";

export const secondaryBtnStyle: string =
  "rounded-md justify-end bg-white text-right text-primary border border-primary px-10 py-3 transition duration-200 mt-4 mx-3 hover:bg-gray-100 font-poppins minMobile:w-full minMobile:text-center minMobile:mx-0";

export const card: {
  title: string;
  label: string;
  value: string;
  mainValue: string;
  flexStyle: string;
} = {
  title: "font-poppins text-lg font-semibold",
  label: "font-poppins font-medium text-gray-500",
  value: "ml-2 text-gray-800 font-poppins minMobile:ml-0",
  mainValue: "ml-2 text-gray-800 font-poppins text-3xl font-semibold",
  flexStyle: "flex mt-2 justify-between minMobile:block minMobile:mt-5",
};
