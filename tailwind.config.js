module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#239695", // 2193A9
        primaryDark: "#1D8A89", // 239695 //
      },
      width: {
        "3px": "3px",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      boxShadow: {
        card: "0px 7px 30px -1px rgba(0,77,120,0.1)",
      },
    },
    screens: {
      tab: { max: "1100px" },
      minTab: { max: "800px" },
      mobile: { max: "600px" },
      minMobile: { max: "450px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
