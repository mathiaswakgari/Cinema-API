const request = require("supertest");
const chai = require("chai");
var chaiSubset = require("chai-subset");

const { User } = require("../../../models/user");
let server;

chai.use(chaiSubset);
const expect = chai.expect;

describe("validateObjectId middleware", () => {
  let token;
  const execute = () => {
    return request(server).get("/api/users/1234").set("x-login-token", token);
  };
  beforeEach(() => {
    server = require("../../../app");
    token = new User({
      isAdmin: true,
    }).generateJwtToken();
  });
  afterEach(async () => {
    server.close();
  });

  it("Should return 404 if ID is invalid ", async () => {
    const res = await execute();
    expect(res.statusCode).to.equal(404);
  });
});
