const chai = require("chai");
const { Genre } = require("../../../models/genre");
var chaiSubset = require("chai-subset");

const request = require("supertest");
const { User } = require("../../../models/user");
const { beforeEach } = require("mocha");

let server;

chai.use(chaiSubset);
const expect = chai.expect;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../../app");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({ _id: { $gte: 0 } });
  });
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { _id: 0, name: "genre1" },
        { _id: 1, name: "genre2" },
      ]);

      const res = await request(server).get("/api/genres");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
      expect(res.body.some((g) => g.name === "genre1")).to.equal(true);
      expect(res.body.some((g) => g.name === "genre2")).to.equal(true);
    });
  });
  describe("GET /:id", () => {
    it("Should return a genre with given id if id is Valid", async () => {
      const genre = new Genre({
        _id: 0,
        name: "genre1",
      });
      await genre.save();

      const res = await request(server).get(`/api/genres/${genre._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", genre.name);
    });
    it("Should return a 404 if id is Invalid", async () => {
      const res = await request(server).get(`/api/genres/1`);

      expect(res.status).to.equal(404);
    });
  });
  describe("POST /", () => {
    const execute = async (name, token) => {
      return await request(server)
        .post("/api/genres")
        .set("x-login-token", token)
        .send({ id: 0, name: name });
    };

    it("Should return a 401 code if not user isn't authenticated", async () => {
      const res = await execute("genre1", "");

      expect(res.status).to.equal(401);
    });
    it("Should return a 403 code if not user isn't an admin", async () => {
      const token = new User({ isAdmin: false }).generateJwtToken();
      const res = await execute("genre1", token);

      expect(res.status).to.equal(403);
    });
    it("Should return a 400 code if input is invalid", async () => {
      const token = new User({ isAdmin: true }).generateJwtToken();
      const genreName = "ge";

      const res = await execute(genreName, token);

      expect(res.status).to.equal(400);
    });
    it("Should save genre if valid", async () => {
      const token = new User({ isAdmin: true }).generateJwtToken();
      const genreName = "genre1";
      await execute(genreName, token);

      const result = await Genre.findOne({ name: genreName });

      expect(result).to.not.be.null;
    });
    it("Should return genre if valid", async () => {
      const token = new User({ isAdmin: true }).generateJwtToken();
      const genreName = "genre1";
      const res = await execute(genreName, token);

      expect(res.body).to.have.property("_id", 0);
      expect(res.body).to.have.property("name", genreName);
    });
  });
  describe("PUT /:id", () => {
    const token = new User({ isAdmin: true }).generateJwtToken();
    let genreName;
    let id;
    const execute = () => {
      return request(server)
        .put("/api/genres/1")
        .set("x-login-token", token)
        .send({ id: id, name: genreName });
    };

    beforeEach(() => {
      (genreName = "genre1"), (id = 1);
    });

    it("Should return 404 if genre id is invalid", async () => {
      const res = await execute();
      expect(res.statusCode).to.equal(404);
    });

    it("Should return 400 if input is invalid", async () => {
      genreName = "ge";
      const res = await execute();
      expect(res.statusCode).to.equal(400);
    });

    it("Should update if ID and input is valid", async () => {
      const genre = new Genre({
        _id: id,
        name: genreName,
      });
      await genre.save();
      const res = await execute();
      expect(res.statusCode).to.equal(200);
    });
    it("Should return the updated genre", async () => {
      const genre = new Genre({
        _id: id,
        name: genreName,
      });
      await genre.save();
      const res = await execute();
      expect(res.body).to.not.be.null;
      expect(res.body).to.have.property("name", genreName);
      expect(res.body).to.have.property("_id", 1);
    });
  });
});
