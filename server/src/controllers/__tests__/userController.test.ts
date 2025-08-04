import { Request, Response } from "express";
import { UserController } from "../userController";
import { UserService } from "../../services/userService";

jest.mock("../../services/userService");

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
};

describe("UserController", () => {
    const mockReq = {} as Request;
    let res: Response;

    beforeEach(() => {
        res = mockResponse();
        jest.clearAllMocks();
    });

    describe("getAllUsers", () => {
        it("returns users with 200", async () => {
            (UserService.getAllUsers as jest.Mock).mockResolvedValue([{ id: 1, userName: "user" }]);
            await UserController.getAllUsers(mockReq, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, userName: "user" }]);
        });

        it("returns 500 on error", async () => {
            (UserService.getAllUsers as jest.Mock).mockRejectedValue(new Error("Fail"));
            await UserController.getAllUsers(mockReq, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Could not retrieve user list." });
        });
    });

    describe("getUserById", () => {
        it("returns user with 200", async () => {
            const req = { params: { id: "1" } } as unknown as Request;
            (UserService.getUserById as jest.Mock).mockResolvedValue({ id: 1, userName: "user" });
            await UserController.getUserById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: 1, userName: "user" });
        });
    });

    describe("getUserByName", () => {
        it("returns users by name", async () => {
            const req = { body: { userName: "test" } } as unknown as Request;
            (UserService.getUserByName as jest.Mock).mockResolvedValue([{ userName: "test" }]);
            await UserController.getUserByName(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ userName: "test" }]);
        });
    });

    describe("getOrcsByUserId", () => {
        it("returns orcs for user", async () => {
            const req = { params: { id: "2" } } as unknown as Request;
            (UserService.getOrcsByUserId as jest.Mock).mockResolvedValue([{ id: 1, name: "Orc" }]);
            await UserController.getOrcsByUserId(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Orc" }]);
        });
    });

    describe("createUser", () => {
        it("returns created user", async () => {
            const req = { body: { userName: "newUser", emailAddress: "test@mail.com", userPassword: "Password123!" } } as Request;
            (UserService.createUser as jest.Mock).mockResolvedValue({ id: 1, userName: "newUser", emailAddress: "test@mail.com" });
            await UserController.createUser(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 1, userName: "newUser", emailAddress: "test@mail.com" });
        });
    });

    describe("updateUserDetails", () => {
        it("returns 200 on update", async () => {
            const req = { body: { id: 1, userName: "updateUser" } } as Request;
            (UserService.updateUserDetails as jest.Mock).mockResolvedValue({});
            await UserController.updateUserDetails(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe("updateUserAsAdmin", () => {
        it("returns 200 on admin update", async () => {
            const req = { body: { id: 1, role: "adminUpdate" } } as Request;
            (UserService.updateUserAsAdmin as jest.Mock).mockResolvedValue({});
            await UserController.updateUserAsAdmin(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });

    describe("deleteUserById", () => {
        it("returns 200 on delete", async () => {
            const req = { params: { id: "1" } } as unknown as Request;
            (UserService.deleteUserById as jest.Mock).mockResolvedValue("User deleted");
            await UserController.deleteUserById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith("User deleted");
        });
    });
});