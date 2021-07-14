import * as yup from "yup";

export const ChildFormSchema = yup.object().shape({
  // TODO : Phone Number Validation using GooglePhoneLib
  beneficiary: yup.object({
    firstName: yup.string().required().label("Child First Name"),
    lastName: yup.string().required().label("Child Last Name"),
  }),
  accountOwner: yup.object({
    firstName: yup.string().required().label("Parent First Name"),
    lastName: yup.string().required().label("Parent Last Name"),
    phone: yup
      .string()
      .required()
      .label("Phone")
      .typeError("Phone number Invalid"),
  }),
  email: yup.string().required().email().label("Email"),
});

export const PersonaliseFormSchema = yup.object().shape({
  firstName: yup.string().required().label("Your First Name"),
  lastName: yup.string().required().label("Your Last Name"),
  email: yup.string().required().email().label("Email"),
});
