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

  describe("POST /register", () => {
    it("should create a new user and return id and username of them", async () => {
      const newUser = { username: "Billy", password: "normalPass" };
      const response = await request(api).post("/register").send(newUser);

      await expect(response.status).toBe(201);
      await expect(response._body.username).toBe("Billy");
      await expect(response._body.id).toBe(4);
    });
  });

  describe("POST /login", () => {
    it("should return a JWT token and", async () => {
      const existingUser = { username: "user1", password: "hashedPass" };
      const response = await request(api).post("/login").send(existingUser);

      await expect(response.status).toBe(200);
      await expect(response._body).toHaveProperty("success", true);
      await expect(response._body).toHaveProperty("token");
    });
  });

  describe("POST /score", () => {
    it("should return user_id, result_id and score after creating score for user", async () => {
      const finalScore = { score: 4 };
      const existingUser = { username: "user1", password: "hashedPass" };
      const loginResponse = await request(api)
        .post("/login")
        .send(existingUser);
      const token = loginResponse._body.token;
      const response = await request(api)
        .post("/score")
        .set("Authorization", [token])
        .send(finalScore);

      await expect(response.status).toBe(200);
      await expect;
    });
  });
});
