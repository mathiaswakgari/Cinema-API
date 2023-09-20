const chai = require("chai");
var chaiSubset = require("chai-subset");

const request = require("supertest");
const { User } = require("../../../models/user");
const { default: mongoose } = require("mongoose");

let server;

chai.use(chaiSubset);
const expect = chai.expect;

describe("/api/users", () => {
  beforeEach(() => {
    server = require("../../../app");
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });
  describe("GET /", () => {
    it("Should return Users, if authorized", async () => {
      const token = new User({ isAdmin: true }).generateJwtToken();
      await User.collection.insertMany([
        { username: "userOne", email: "email@one.com" },
        { username: "userTwo", email: "email@two.com" },
      ]);

      const res = await request(server)
        .get("/api/users")
        .set("x-login-token", token);

      expect(res.statusCode).to.equal(200);
      expect(res.body.some((user) => user.username === "userOne")).to.be.true;
      expect(res.body.some((user) => user.username === "userTwo")).to.be.true;
    });
  });
  describe("GET /:id", () => {
    let user;

    const execute = () => {
      const token = new User({ isAdmin: true }).generateJwtToken();
      return request(server)
        .get(`/api/users/${user._id}`)
        .set("x-login-token", token);
    };

    beforeEach(() => {
      user = new User({
        username: "username",
        email: "email@email.com",
      });
    });

    it("Shoud return a user with valid ID", async () => {
      await User.collection.insertOne(user);
      const res = await execute();
      expect(res.statusCode).to.equal(200);
      expect(res.body.username).to.equal(user.username);
    });
    it("Should return a 404 if user is not found", async () => {
      const ID = new mongoose.Types.ObjectId();
      user._id = ID;

      const res = await execute();

      expect(res.statusCode).to.equal(404);
    });
  });
});
