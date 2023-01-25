const request = require("supertest");
const app = require("../../../app");

describe("Categories Tests", () => {
  test("Does not accept empty name", done => {
    request(app)
      .post("/categories")
      .then(response => {
        expect(response.statusCode).toBe(422);
        done();
      });
  });
});