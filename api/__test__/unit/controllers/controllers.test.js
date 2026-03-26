const userControllers = require("../../../controllers/userController");
const User = require("../../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");
jest.mock("bcrypt");

//.send(), .json(), .end()
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));

const mockResponse = { status: mockStatus };

describe("User controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());
  describe("register", () => {
    it("should return a new user with a 201 status code", async () => {
      //Arrange
      let testUser = {
        id: 1,
        username: "Test User",
        password: "normalPassword",
      };
      const mockReq = { body: { ...testUser } };

      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashedPassword");

      jest.spyOn(User, "createUser").mockResolvedValue(
        new User({
          id: 1,
          username: "Test User",
          password: "hashedPassword",
        }),
      );
      //Act
      await userControllers.register(mockReq, mockResponse);
      //Assert
      expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith("normalPassword", "salt");
      expect(User.createUser).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        id: 1,
        username: "Test User",
      });
    });

    it("should return 400 if user creation fails", async () => {
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hashedPassword");

      jest.spyOn(User, "createUser").mockRejectedValue(
        new Error("Username already exists")
      );

      const mockReq = {
        body: { username: "Test User", password: "normalPassword" },
      };

      await userControllers.register(mockReq, mockResponse);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Username already exists",
      });
    });
  });

  describe("login", () => {
    it("should return a token with status 200 for valid credentials", async () => {
      //Arrange
      const mockReq = {
        body: {
          username: "Test User",
          password: "normalPassword",
        },
      };

      const mockUser = new User({
        id:1,
        username: "Test User",
        password: "hashedPassword",
      });

      jest.spyOn(User, "findByUsername").mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      jwt.sign.mockImplementation((payload, secret, options, callback) => {
        callback(null, "fakeToken");
      });

      // Act 
      await userControllers.login(mockReq, mockResponse);

      // Assert
      expect(User.findByUsername).toHaveBeenCalledWith("Test User");
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "normalPassword",
        "hashedPassword"
      );
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        success: true,
        token: "fakeToken",
      });
    });

    it("should return 401 if user is not found", async () => {
      jest.spyOn(User, "findByUsername").mockResolvedValue(null);
      bcrypt.compare.mockResolvedValue(false);

      const mockReq = { body: { username: "ghost", password: "pass" } };
      await userControllers.login(mockReq, mockResponse);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: "No user with this username" });
    });

    it("should return 401 if password does not match", async () => {
      jest.spyOn(User, "findByUsername").mockResolvedValue(
        new User({ id: 1, username: "Test User", password: "hashedPassword" })
      );
      bcrypt.compare.mockResolvedValue(false);

      const mockReq = { body: { username: "Test User", password: "wrongPassword" } };
      await userControllers.login(mockReq, mockResponse);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: "User could not be authenticated" });
    });

    it("should return 401 if token generation fails", async () => {
      const mockReq = { body: { username: "Test User", password: "normalPassword" } };

      jest.spyOn(User, "findByUsername").mockResolvedValue(
        new User({ id: 1, username: "Test User", password: "hashedPassword" })
      );
      bcrypt.compare.mockResolvedValue(true);

      jwt.sign.mockImplementation((payload, secret, options, callback) => {
        callback(new Error("JWT failure"), null);
      });

      await userControllers.login(mockReq, mockResponse);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({ error: "Error in token generation" });
    })
  });

  describe("updateScore", () => {
    it("should return 200 and the response on success", async () => {
      const mockReq = { body: { score: 42 }, user: { id: 1 } };
      const mockDbResponse = { result_id: 1, user_id: 1, score: 42 };

      jest.spyOn(User, "insertScore").mockResolvedValue(mockDbResponse);

      await userControllers.updateScore(mockReq, mockResponse);

      expect(User.insertScore).toHaveBeenCalledWith({ user_id: 1, score: 42 });
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ response: mockDbResponse });
    });

    it("should return 400 if score is missing from the request body", async () => {
      const mockReq = { body: {}, user: { id: 1 } };

      await userControllers.updateScore(mockReq, mockResponse);

      expect(User.insertScore).not.toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ err: "Score is required" });
    });

    it("should return 404 if the DB insert fails", async () => {
      const mockReq = { body: { score: 10}, user: { id: 1 } };

      jest.spyOn(User, "insertScore").mockRejectedValue(new Error("DB error"));

      await userControllers.updateScore(mockReq, mockResponse);

      expect(User.insertScore).toHaveBeenCalledWith({ user_id: 1, score: 10 });
      expect(mockStatus).toHaveBeenCalledWith(404);
    })
  })
});
