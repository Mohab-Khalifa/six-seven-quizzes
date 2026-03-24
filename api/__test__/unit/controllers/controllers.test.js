const userControllers = require("../../../controllers/userController");
const User = require("../../../models/User");
const bcrypt = require("bcrypt");

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
  });
});
