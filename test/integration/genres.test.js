const chai = require("chai");
const { Genre } = require("../../models/genre");
var chaiSubset = require("chai-subset");

const request = require("supertest");

let server;

chai.use(chaiSubset);
const expect = chai.expect;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../app");
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
    it("Should return a genre with given id", async () => {
      const genre = new Genre({
        _id: 0,
        name: "genre1",
      });
      await genre.save();

      const res = await request(server).get(`/api/genres/${genre._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", genre.name);
    });
  });
});
