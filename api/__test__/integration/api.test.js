const request = require("supertest");
const { resetTestDB } = require("./config");
const app = require("../../app");

describe("API TESTING", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(() => {
    api = app.listen(5444, () => {
      console.log(`Test server running on port 5444`);
    });
  });

  afterAll((done) => {
    console.log("Stopping test server");
    api.close(done);
  });
});
