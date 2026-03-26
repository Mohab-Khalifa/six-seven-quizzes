const jwt = require("jsonwebtoken");
const authenticator = require("../../../middleware/authenticator");

jest.mock("jsonwebtoken");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn(() => ({
    send: mockSend,
    json: mockJson,
    end: mockEnd,
}));

const mockNext = jest.fn();
const mockResponse = { status: mockStatus };

describe("authenticator middleware", () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    it("should call next() and set req.user if token is valid", () =>{
        const mockReq = {
            headers: { authorization: "validToken" },
        };

        const mockDecoded = { id: 1, username: "Test User" };

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, mockDecoded);
        });

        authenticator(mockReq, mockResponse, mockNext);

        expect(jwt.verify).toHaveBeenCalledWith(
            "validToken", 
            process.env.SECRET_TOKEN,
            expect.any(Function)
        );
        expect(mockReq.user).toEqual(mockDecoded);
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockStatus).not.toHaveBeenCalled();
    });

    it("should return 403 if token is invalid", () => {
        const mockReq = {
            headers: { authorization: "invalidToken" },
        };

        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(new Error("Invalid token"), null);
        });

        authenticator(mockReq, mockResponse, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockStatus).toHaveBeenCalledWith(403);
        expect(mockJson).toHaveBeenCalledWith({ err: "Invalid token" });
    })

    it("should return 403 if token is missing", () => {
        const mockReq = { headers: {} };

        authenticator(mockReq, mockResponse, mockNext);

        expect(jwt.verify).not.toHaveBeenCalled();
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockStatus).toHaveBeenCalledWith(403);
        expect(mockJson).toHaveBeenCalledWith({ err: "Missing token" });
    });
});