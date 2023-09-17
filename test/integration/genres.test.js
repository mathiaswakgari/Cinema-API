const chai = require("chai");
var chaiSubset = require("chai-subset");

const request = require("supertest");
let server;

chai.use(chaiSubset);
const expect = chai.expect;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../app");
  });
  afterEach(() => {
    server.close();
  });
  describe("GET /", () => {
    it("should return all genres", async () => {
      const res = await request(server).get("/api/genres");
      expect(res.status).to.equal(200);
    });
  });
});
