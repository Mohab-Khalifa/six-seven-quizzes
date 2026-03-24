const db = require("../../../database/connect");
const User = require("../../../models/User");

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());
  describe("createUser", () => {
    it("resolves with a user after successful db query", async () => {
      //Arrange
      const userData = { username: "rach", password: "hashedPassword" };
      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...userData, id: 1 }] });

      //Act
      const result = await User.createUser(userData);
      //Assert

      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;",
        [userData.username, userData.password],
      );
      expect(result).toBeInstanceOf(User);
      expect(result).toHaveProperty("id", 1);
      expect(result).toHaveProperty("username", "rach");
    });

    it("should throw an error when age is missing", async () => {
      //Arrange
      const incompleteUserData = { username: "userBuser" };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      //Act & Assert
      await expect(User.createUser(incompleteUserData)).rejects.toThrow(
        "Unable to create user.",
      );
    });
  });
});
