export const getUrl = () => {
  const url =
    process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://gift.sootchy529.com";
  return url;
};
