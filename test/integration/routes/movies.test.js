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
    await Movie.deleteMany({ _id: { $gte: 0 } });
  });

  describe("GET /", () => {
    it("Should return all movies", async () => {
      await Movie.collection.insertMany(movies);
      const res = await request(server).get("/api/movies");
      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.equal(2);
      expect(res.body.some((movie) => movie._id === movies[0]._id));
      expect(res.body.some((movie) => movie._id === movies[1]._id));
    });
  });
  describe("GET /:id", () => {
    it("Should return a movie if id is valid", async () => {
      await Movie.collection.insertOne(movies[0]);
      const res = await request(server).get(`/api/movies/${movies[0]["_id"]}`);

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property("_id", movies[0]["_id"]);
    });
  });
  describe("POST", () => {
    const execute = async (movie, token) => {
      return await request(server)
        .post("/api/movies")
        .set("x-login-token", token)
        .send(movie);
    };
    it("Should return a 401 code if not user isn't authenticated", async () => {
      const res = await execute("movie1", "");
      expect(res.status).to.equal(401);
    });
    it("Should return a 403 code if not user isn't an admin", async () => {
      const token = new User({ isAdmin: false }).generateJwtToken();
      const res = await execute("movie1", token);

      expect(res.status).to.equal(403);
    });
    it("Should return a 400 code if input is invalid", async () => {
      const token = new User({ isAdmin: true }).generateJwtToken();
      const movie = { title: "movieOne" };

      const res = await execute(movie, token);

      expect(res.status).to.equal(400);
    });
    it("Should save movie if valid", async () => {
      const token = new User({ isAdmin: true }).generateJwtToken();
      const movie = movies[0];
      await execute(movie, token);

      const result = await Movie.findOne({ _id: movie._id });

      expect(result).to.not.be.null;
    });
    it("Should return saved movie if valid", async () => {
      const token = new User({ isAdmin: true }).generateJwtToken();
      const movie = movies[0];
      const res = await execute(movie, token);

      expect(res.body).to.have.property("_id", movie._id);
      expect(res.body).to.have.property("title", movie.title);
    });
  });
  describe("PUT /:id", () => {
    const token = new User({ isAdmin: true }).generateJwtToken();
    let movie;
    const execute = () => {
      return request(server)
        .put(`/api/movies/${movie._id}`)
        .set("x-login-token", token)
        .send(movie);
    };

    beforeEach(() => {
      movie = movies[0];
    });

    it("Should return 404 if movie ID is invalid", async () => {
      movie._id = 1;
      const res = await execute();
      expect(res.statusCode).to.equal(404);
    });
    it("Should return 400 if input is invalid", async () => {
      movie = { title: "onlyTitle" };
      const res = await execute();
      expect(res.statusCode).to.equal(400);
    });
    it("Should update if ID and input is valid", async () => {
      await Movie.collection.insertOne(movie);
      movie.title = "update title";
      const res = await execute();
      expect(res.statusCode).to.equal(200);
    });
    it("Should return the updated movie", async () => {
      await Movie.collection.insertOne(movie);
      movie.title = "update title";
      const res = await execute();
      expect(res.body).to.not.be.null;
      expect(res.body).to.have.property("title", movie.title);
      expect(res.body).to.have.property("_id", movie._id);
    });
  });

  describe("DEL /:id", () => {
    const token = new User({ isAdmin: true }).generateJwtToken();
    let movie;
    const execute = () => {
      return request(server)
        .delete(`/api/movies/${movie._id}`)
        .set("x-login-token", token);
    };
    beforeEach(() => {
      movie = movies[0];
    });
    it("Should return 404 if movie id is invalid", async () => {
      movie._id = 1;
      const res = await execute();
      expect(res.statusCode).to.equal(404);
    });
    it("Should delete if ID is valid", async () => {
      await Movie.collection.insertOne(movie);
      const res = await execute();
      expect(res.statusCode).to.equal(200);
    });
  });
});
