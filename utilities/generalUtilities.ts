import { format } from "date-fns";

export const calculateAge = (date: string) => {
  const currentYear = +format(new Date(), "yyyy");
  const birthYear = +format(new Date(date), "yyyy");
  const currentMonth = +format(new Date(), "MM");
  const birthMonth = +format(new Date(date), "MM");
  if (birthMonth > currentMonth) {
    return currentYear - birthYear - 1;
  }
  return currentYear - birthYear;
};
