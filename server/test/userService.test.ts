import { UserService } from "../src/services/userService";
import { prisma } from "../src/utils/prisma";
import * as bcrypt from "bcrypt";
import {Role} from "@prisma/client";

// mocks

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock("../src/utils/prisma", () => ({
    prisma: {
        user: {
            create: jest.fn(),
            update: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
        },
        userProfile: {
            create: jest.fn(),
        },
    },
}));

jest.mock("bcrypt", () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));

(prisma.user.findMany as unknown as jest.Mock).mockResolvedValue([
    { id: 1, userName:  "testmock1", emailAddress: "email@example.com"},
    { id: 2, userName:  "testmock2", emailAddress: "email2@example.com"}
]);

(prisma.user.findUnique as unknown as jest.Mock).mockResolvedValue(
    { id: 1, userName: "testmock1", emailAddress: "email@example.com", "role": "USER" }
);

// getAllUsers returns correct object array

describe("UserService.getAllUsers", () => {
    it("returns mapped users", async () => {
        const result = await UserService.getAllUsers();
// getAllUsers converts the number to a string for the frontend
        expect(result).toEqual([
            { userId: 1, userName:  "testmock1", emailAddress: "email@example.com"},
            { userId: 2, userName:  "testmock2", emailAddress: "email2@example.com"}
        ]);
    });
});

// getUserById returns a single user with matching id

describe("UserService.getUserById", () => {
    it("returns a single user matching the id", async () => {
        const result = await UserService.getUserById(1);
// getAllUsers converts the number to a string for the frontend
        expect(result).toEqual(
            { userId: 1, userName:  "testmock1", emailAddress: "email@example.com"}
        );
    });
});

// getUserByName returns a possible array of users if the userName contains the requested value

describe("UserService.getUserByName", () => {
    it("returns a possible map of users matching the name", async () => {
        const result = await UserService.getUserByName("test");
        // searching for "test"
        expect(result).toEqual([
            { userId: 1, userName:  "testmock1", emailAddress: "email@example.com" },
            { userId: 2, userName:  "testmock2", emailAddress: "email2@example.com"}
        ]);
    });
});

// createUser successfully returns the name + emailAddress of the request or throws an error if it fails

describe("UserService.createUser", () => {
    it("should create a user and return a success message", async () => {
        const mockInput = {
            userName: "mockuser",
            emailAddress: "mock@example.com",
            userPassword: "plain-password",
        };

        // mock bcrypt
        (bcrypt.genSalt as jest.Mock).mockResolvedValue("fake-salt");
        (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password");

        // mock profile creation
        (prisma.userProfile.create as jest.Mock).mockResolvedValue({ id: 46 });

        // mock user creation
        (prisma.user.create as jest.Mock).mockResolvedValue({
            userName: "mockuser",
            emailAddress: "mock@example.com",
        });

        const result = await UserService.createUser(mockInput);

        // check that a UserProfile was created
        expect(prisma.userProfile.create).toHaveBeenCalled();
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                userName: "mockuser",
                emailAddress: "mock@example.com",
                userPassword: "hashed-password",
                profileId: 46
            },
        });

        expect(result).toBe("User successfully registered: mockuser");
    });

    it("should throw if something fails", async () => {
        (prisma.userProfile.create as jest.Mock).mockRejectedValue(new Error("DB error"));

        await expect(UserService.createUser({
            userName: "fail",
            emailAddress: "fail@example.com",
            userPassword: "failpass",
        })).rejects.toThrow("Error creating user.");
    });
});

// deleteUserById returns a confirmation message is successful or throw an error if fail

describe("UserService.deleteUserById", () => {
    it("should delete a user and return a success message", async () => {
        const mockUser = {
            id: 1,
            userName: "deletedUser",
            emailAddress: "delete@example.com",
        };

        (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

        const result = await UserService.deleteUserById(1);

        expect(prisma.user.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        });

        expect(result).toBe("User successfully deleted: deletedUser");
    });

    it("should throw an error if deletion fails", async () => {
        (prisma.user.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

        await expect(UserService.deleteUserById(999)).rejects.toThrow("Error deleting user account.");
    });
});

// update user successfully

describe("UserService.updateUserDetails", () => {
    it("should hash password and update user", async () => {
        const input = {
            userId: 1,
            userName: "updatedUser",
            emailAddress: "updated@example.com",
            userPassword: "newpass123",
        };

        (bcrypt.genSalt as jest.Mock).mockResolvedValue("fake-salt");
        (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-pass");
        (prisma.user.update as jest.Mock).mockResolvedValue({
            id: 1,
            userName: "updatedUser",
            emailAddress: "updated@example.com",
        });

        const result = await UserService.updateUserDetails(input);

        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                userName: "updatedUser",
                emailAddress: "updated@example.com",
                userPassword: "hashed-pass",
            },
        });

        expect(result).toEqual("User has been successfully updated: updatedUser")
    });

    it("should skip password hashing if no password provided", async () => {
        const input = {
            userId: 2,
            userName: "partialUser",
            emailAddress: "partial@example.com",
            userPassword: undefined,
        };

        (prisma.user.update as jest.Mock).mockResolvedValue({
            id: 2,
            userName: "partialUser",
            emailAddress: "partial@example.com",
        });

        const result = await UserService.updateUserDetails(input);

        expect(bcrypt.hash).not.toHaveBeenCalled(); // ✅ skipping hash
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: 2 },
            data: {
                userName: "partialUser",
                emailAddress: "partial@example.com",
            },
        });
        expect(result).toBe("User has been successfully updated: " + input.userName);
    });
});

describe("UserService.updateUserAsAdmin", () => {
    it("should allow updates to availableTokens and role", async () => {
        const input = {
            userId: 1,
            userName: "updateUser",
            availableTokens: 50,
            role: Role.ADMIN
        };

        (prisma.user.update as jest.Mock).mockResolvedValue({
            id: 1,
            userName: "updateUser",
            availableTokens: 50,
            role: Role.ADMIN
        });

        const result = await UserService.updateUserAsAdmin(input);

        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                userName: "updateUser",
                availableTokens: 50,
                role: Role.ADMIN
            },
        });

        expect(result).toBe("User has been successfully updated: " + input.userName);
    });
});