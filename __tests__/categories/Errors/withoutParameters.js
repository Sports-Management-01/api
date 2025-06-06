const request = require("supertest");
const app = require("../../../app");
const testVariables = require("../../testVariables");

describe("Categories Tests", () => {
  test("Does not accept empty parameters", (done) => {
    request(app)
      .post("/categories")
      .set('Authorization', 'Bearer ' + testVariables.userToken)
      .then(response => {
        expect(response.body).toHaveProperty('success')
        expect(response.body.success).toBe(false);
        const responseHasMessages = response.body?.messages?.length > 0
        expect(responseHasMessages).toBe(true);
        done();
      });
  });
});