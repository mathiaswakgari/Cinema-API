const request = require("supertest");
const chai = require("chai");
var chaiSubset = require("chai-subset");

const { User } = require("../../../models/user");
let server;

chai.use(chaiSubset);
const expect = chai.expect;

describe("admin middleware", () => {
  let token;
  const execute = () => {
    return request(server).get("/api/users").set("x-login-token", token);
  };
  beforeEach(() => {
    server = require("../../../app");
    token = new User({ isAdmin: true }).generateJwtToken();
  });
  afterEach(async () => {
    server.close();
  });

  it("Should return 403 if not admin", async () => {
    token = new User({ isAdmin: false }).generateJwtToken();
    const res = await execute();
    expect(res.statusCode).to.equal(403);
  });
  it("Should return 200 if admin", async () => {
    const res = await execute();
    expect(res.statusCode).to.equal(200);
  });
});
