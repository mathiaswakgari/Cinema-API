const { default: mongoose } = require("mongoose");
const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
describe("user.generateJwtToken", () => {
  it("should return a valid jsonwebtoken", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      fullname: "mathias",
    };
    const user = new User(payload);
    const token = user.generateJwtToken();
    const result = jwt.verify(token, process.env.JWTkey);
    expect(result).toMatchObject(payload);
  });
});
