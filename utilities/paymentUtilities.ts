import { RootReduxState } from "../types/General";

export const calculateProcessingFee = (amount: number) => {
  switch (true) {
    case amount === 0:
      return 0;
    case amount > 0 && amount <= 25:
      return 1.95;
    case amount >= 26 && amount <= 50:
      return 2.95;
    case amount >= 51 && amount <= 100:
      return 3.95;
    case amount >= 101 && amount <= 200:
      return 5.95;
    case amount >= 201 && amount <= 250:
      return 8.95;
    default:
      return Math.ceil(amount * 0.035) - 1;
  }
};

export const generatePaymentData = (rootState: RootReduxState) => {
  return {
    url: `/api/payment?email=clientaccounts@sootchy.com&giftAmount=${
      rootState.contribution.amount
    }&fee=${calculateProcessingFee(rootState.contribution.amount)}&amount=${
      Number(rootState.contribution.amount) +
      calculateProcessingFee(rootState.contribution.amount)
    }&childName=${rootState.account.beneficiary.firstName}&childFirstName=${
      rootState.account.beneficiary.firstName
    }&childLastName=${rootState.account.beneficiary.lastName}&parentFirstName=${
      rootState.account.accountOwner.firstName
    }&parentLastName=${rootState.account.accountOwner.lastName}&toEmail=${
      rootState.account.email
    }&toPhone=${rootState.account.accountOwner.phone}&fromFirstName=${
      rootState.contribution.contributor.firstName
    }&fromLastName=${
      rootState.contribution.contributor.lastName
    }&giftFromEmail=${
      rootState.contribution.contributor.email
    }&toRelationship=${
      rootState.contribution.contributor.relationship
    }&message=${rootState.contribution.contributor.message}&accountNumber=${
      rootState.account.accountNumber
    }`,
    zapierData: {
      childFirstName: rootState.account.beneficiary.firstName,
      parentFirstName: rootState.account.beneficiary.lastName,
      parentPhone: rootState.account.accountOwner.phone,
      giftAmount: rootState.contribution.amount,
      sender: `${rootState.contribution.contributor.firstName} ${rootState.contribution.contributor.lastName}`,
      message: rootState.contribution.contributor.message,
      relationship: rootState.contribution.contributor.relationship,
      timestamp: new Date(),
      email: rootState.contribution.contributor.email,
      fee: calculateProcessingFee(rootState.contribution.amount),
      total:
        rootState.contribution.amount +
        calculateProcessingFee(rootState.contribution.amount),
    },
  };
};
