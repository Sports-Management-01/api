const request = require("supertest");
const app = require("../../../app");

describe("Categories Tests", () => {
  test("Does not accept empty parameters", (done) => {
    request(app)
      .post("/categories")
      .then(response => {
        expect(response.statusCode).toBe(422)
        expect(response.body).toHaveProperty('success')
        expect(response.body.success).toBe(false);
        done();
      });
  });
});