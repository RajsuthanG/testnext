export type ContributionType = {
  amount: number;
  contributor: {
    firstName: string;
    lastName: string;
    relationship: string;
    email: string;
    message?: string;
  };
};

export type ChangeContributionStateType = {
  key: string;
  value: string | number;
};

export type ContributionAction = {
  payload: {
    key: string;
    value: string | number;
  };
};
