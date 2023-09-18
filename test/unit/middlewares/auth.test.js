const chai = require("chai");
var chaiSubset = require("chai-subset");

const { User } = require("../../../models/user");
const auth = require("../../../middlewares/auth");
const { default: mongoose } = require("mongoose");

chai.use(chaiSubset);
const expect = chai.expect;

describe("auth middleware", () => {
  it("Should return req.user with payload of valid JWT", () => {
    const user = { _id: new mongoose.Types.ObjectId().toHexString() };
    const token = new User(user).generateJwtToken();

    const res = {};
    const next = () => {};
    const req = {
      header: () => {
        return token;
      },
    };

    auth(req, res, next);

    expect(req.user).to.have.property("isAdmin", false);
    expect(req.user).to.have.property("_id", user._id);
  });
});
