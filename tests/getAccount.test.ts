import { getAccount, getAccountId } from "../services/AccountService";

// *** Please start the Server and run the Tests (npm run test) ***

describe("Test Accounts API", () => {
  test("Get single account by ID", async () => {
    const id = "60639100aa70d800120359a8";
    const response = await getAccount(id);

    expect(response.success === true).toBeTruthy();
    expect(response.data).toHaveProperty("accountNumber");
    expect(response.data.accountNumber).toEqual("202115289");
  }, 10000);

  test("Get single account ID", async () => {
    const account = {
      disableEdit: false,
      accountNumber: "",
      email: "sargonsaadi+1@gmail.com",
      beneficiary: {
        firstName: "Sargon",
        lastName: "Saadi",
        dateOfBirth: "",
      },
      accountOwner: {
        firstName: "Sargon",
        lastName: "Saadi",
        phone: "",
      },
    };

    const response = await getAccountId(account);
    expect(response.data.success === true).toBeTruthy();
    expect(response.data.data).toEqual("202115289");
  }, 10000);
});
