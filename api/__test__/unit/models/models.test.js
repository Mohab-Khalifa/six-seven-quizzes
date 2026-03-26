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

    it("should throw an error when password is missing", async () => {
      //Arrange
      const incompleteUserData = { username: "userBuser" };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      //Act & Assert
      await expect(User.createUser(incompleteUserData)).rejects.toThrow(
        "Unable to create user.",
      );
    });
  });

  describe("findByUsername", () => {
    it("resolves with user on a successful query", async () => {
      // Arrange
      const testUser = { id: 1, username: "goat", password: "hashedPassword" };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

      // Act
      const result = await User.findByUsername("goat");

      // Assert
      expect(result).toBeInstanceOf(User);
      expect(result.username).toBe("goat");
      expect(result.id).toBe(1);
      expect(db.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE username = $1;",
        [result.username],
      );
    });

    it("returns null if no users were found by specific username", async () => {
      //Arrange
      const nonExistantUser = {
        id: 220,
        username: "userBuser",
        password: "hashedPass",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      //Act & Assert
      const result = await User.findByUsername(nonExistantUser);
      expect(result).toBe(null);
    });
  });

  describe("insertScore", () => {
    it("resolves with successful result after inserting it into the table", async () => {
      // Arrange
      const resultData = { user_id: "token", score: 5 };
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [{ ...resultData, id: 1 }],
      });

      // Act
      const result = await User.insertScore(resultData);

      // Assert
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty("id", 1);
      expect(result).toHaveProperty("user_id", "token");
      expect(result).toHaveProperty("score", 5);
      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO result (user_id, score) VALUES ($1, $2) RETURNING *;",
        [resultData.user_id, resultData.score],
      );
    });

    it("throws an error if more or less than one result returned", async () => {
      //Arrange
      const incompleteResultData = { username: "userBuser" };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
      //Act & Assert
      await expect(User.insertScore(incompleteResultData)).rejects.toThrow(
        "Unable to post score",
      );
    });
  });
});
