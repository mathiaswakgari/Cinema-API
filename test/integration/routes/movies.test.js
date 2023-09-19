const chai = require("chai");
const { Movie } = require("../../../models/movie");
var chaiSubset = require("chai-subset");

const request = require("supertest");
const { User } = require("../../../models/user");
const movies = require("../../../test_files/movies");

let server;

chai.use(chaiSubset);
const expect = chai.expect;

describe("/api/movies", () => {
  beforeEach(() => {
    server = require("../../../app");
  });
  afterEach(async () => {
    server.close();
    await Movie.deleteMany({ id: { $gte: 0 } });
  });

  describe("GET /", () => {
    it("Should return all movies", async () => {
      await Movie.collection.insertMany(movies);
      const res = await request(server).get("/api/movies");
      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.equal(2);
      expect(res.body.some((movie) => movie.id === movies[0]["id"]));
      expect(res.body.some((movie) => movie.id === movies[1]["id"]));
    });
  });
  describe("GET /:id", () => {
    it("Should return a movie if id is valid", async () => {
      await Movie.collection.insertOne(movies[0]);
      const res = await request(server).get(`/api/movies/${movies[0]["id"]}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("id", movies[0]["id"]);
    });
  });
});
