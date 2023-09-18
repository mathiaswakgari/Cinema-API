const request = require("supertest");
const chai = require("chai");
var chaiSubset = require("chai-subset");

const { User } = require("../../../models/user");
const { Genre } = require("../../../models/genre");
let server;

chai.use(chaiSubset);
const expect = chai.expect;

describe("auth middleware", () => {
  let token;
  const execute = () => {
    return request(server).get("/api/users/me").set("x-login-token", token);
  };

  beforeEach(() => {
    server = require("../../../app");
    token = new User({
      fullname: "Mathias Wakgari",
      email: "mathiaswakgari@gmail.com",
      password: "Hannah&65619270",
      username: "mathiaswakgari",
    }).generateJwtToken();
  });
  afterEach(async () => {
    server.close();
  });

  it("Should return 401 if no token is provided", async () => {
    token = "";
    const res = await execute();
    expect(res.statusCode).to.equal(401);
  });

  it("Should return 400 if token is invalid", async () => {
    token = "invalid token";
    const res = await execute();
    expect(res.statusCode).to.equal(400);
  });

  it("Should return 200 if token is valid", async () => {
    const res = await execute();
    expect(res.statusCode).to.equal(200);
  });
});
