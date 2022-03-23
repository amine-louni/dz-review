import { filterobj } from "../../src/controllers/authController";

describe("auth controller utlities", () => {
  it("should delete object props (1st arg) given in the array as 2nd arg", () => {
    const expected = { firstName: "john", lastName: "joe" };
    const obj = {
      firstName: "john",
      lastName: "joe",
      password: 5454,
      activated: true,
    };
    filterobj(obj, ["password", "activated"]);

    expect(obj).toEqual(expected);
  });
});
