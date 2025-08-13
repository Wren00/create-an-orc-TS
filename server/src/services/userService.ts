import bcrypt from "bcrypt";
import {prisma} from "../utils/prisma";
import {removeUndefined} from "../../../common/utils/dataUtil";
import {
    UserListItem,
    CreateUser,
    UpdateUser,
    UpdateUserAdmin,
    PublicUser,
    UserListItemSchema,
    CreateUserSchema,
    PublicUserSchema,
    UpdateUserSchema,
    UpdateUserAdminSchema
} from "../schemas/userSchema";
import {z} from "zod";
import {SavedOrc, OrcGallerySchema} from "../schemas/orcSchema";
import {Prisma} from "@prisma/client";

//GET functions

export async function getAllUsers(): Promise<UserListItem[]> {
    const rows = await prisma.user.findMany({
        select: { userName: true, emailAddress: true },
    });
    const data = rows.map((r) => ({ userName: r.userName, emailAddress: r.emailAddress }));

    const parsed = UserListItemSchema.array().parse(data);
    // casting to prevent consistent errors with Prisma/Zod validation checking
    return parsed as UserListItem[];
}

export async function getUserById(userId: number): Promise<PublicUser> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { userName: true, emailAddress: true, role: true }
        });

        const parsedUser = PublicUserSchema.safeParse(user);
        if (!parsedUser.success) {
            console.error("Invalid user Data:", parsedUser.error.issues);
            throw new Error("Unable to parse user");
        }
        return parsedUser.data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
}

export async function getUserByName(name: string): Promise<PublicUser[]> {

    console.log(name);

    try {
        const nameSearch = await prisma.user.findMany({
            where: {
                userName: { contains: name.toString(), mode: "insensitive" },
            },
            select: {
                userName: true,
                emailAddress: true,
                role: true,
            },
        });

        const userSearch = z.array(PublicUserSchema).safeParse(nameSearch);
        if (!userSearch.success) {
            console.error(
                "PublicUser validation failed:",
                userSearch.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join("; ")
            );
            throw new Error("Invalid data returned from database");
        }
        return userSearch.data;
    } catch (error) {
        console.error("Error fetching user by name: ", error);
        throw error;
    }
}

async function getOrcsByUserId(id: number): Promise<SavedOrc[]> {
    try {
        const orcsByUser = await prisma.orc.findMany({
            where: { userId: id },
                select: {
                    name: true,
                    description: true,
                    str: true,
                    dex: true,
                    con: true,
                    int: true,
                    wis: true,
                    cha: true,
                    orcImagesId: true,
                    userId: true
        },
    });

    const orcGallery = z.array(OrcGallerySchema).safeParse(orcsByUser);
    if (!orcGallery.success) {
        console.error(
            "Orc validation error:",
            orcGallery.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join("; ")
        );
        throw new Error("Invalid data returned from database");
    }
    return orcGallery.data;
} catch (error) {
    console.error("Error fetching orcs: ", error);
    throw error;
}
}


//UPDATE function

export async function updateUserDetails(input: UpdateUser) {
    const parsed = UpdateUserSchema.safeParse(input);
    if (!parsed.success) {
        const msg = parsed.error.issues.map(i => `${i.path.join(".") || "root"}: ${i.message}`).join("; ");
        throw new Error(`Invalid update payload: ${msg}`);
    }
    const { id, userName, emailAddress, userPassword } = parsed.data as UpdateUser;

    const dataToUpdate: Record<string, unknown> = { userName, emailAddress };
    if (userPassword !== undefined) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        dataToUpdate.userPassword = hashedPassword;
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: removeUndefined(dataToUpdate),
            select: { userName: true },
        });
        return `User has been successfully updated: ${updatedUser.userName}`;

        // validate for Prisma unique constraint.
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("That userName or emailAddress is already in use.");
            }
            if (error.code === "P2025") {
                throw new Error("User not found.");
            }
        }
        console.error("Prisma error on updating user:", error);
        throw new Error("Failed to update user");
    }
}

export async function updateUserAsAdmin(input: UpdateUserAdmin) {

    const parsed = UpdateUserAdminSchema.safeParse(input);
    if (!parsed.success) {
        const msg = parsed.error.issues.map(i => `${i.path.join(".") || "root"}: ${i.message}`).join("; ");
        throw new Error(`Invalid update payload: ${msg}`);
    }
    const { id, userName, emailAddress, userPassword, availableTokens, role } = parsed.data as UpdateUserAdmin;

    const dataToUpdate: Record<string, unknown> = { userName, emailAddress, availableTokens, role };
    if (userPassword !== undefined) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        dataToUpdate.userPassword = hashedPassword;
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: removeUndefined(dataToUpdate),
            select: { userName: true },
        });
        return `User has been successfully updated: ${updatedUser.userName}`;

        // validate for Prisma unique constraint.
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("That userName or emailAddress is already in use.");
            }
            if (error.code === "P2025") {
                throw new Error("User not found.");
            }
        }
        console.error("Prisma error on updating user:", error);
        throw new Error("Failed to update user");
    }
}

//CREATE function

export async function createUser(input: CreateUser): Promise<string> {
    const parsed = CreateUserSchema.safeParse(input);
    if (!parsed.success) {
        const msg = parsed.error.issues
            .map(i => `${i.path.join(".") || "root"}: ${i.message}`)
            .join("; ");
        throw new Error(`Invalid create payload: ${msg}`);
    }

    const { userName, emailAddress, userPassword } = parsed.data;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    try {
        const created = await prisma.user.create({
            data: {
                userName,
                emailAddress,
                userPassword: hashedPassword,
                profile: { create: {} },
            },
            select: { userName: true },
        });

        return `User successfully registered: ${created.userName}`;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("That username or email is already in use.");
            }
        }
        console.error("Prisma error on creating user:", error);
        throw new Error("Failed to create user.");
    }
}

//DELETE function

async function deleteUserById(userId: number) {

    let deletedUser;

    try {
        deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        return `User successfully deleted: ${deletedUser.userName}`
    } catch (error) {
        console.error("Prisma error on deleting user:", error);
        throw new Error("Failed to delete user.");
    }

}


const UserService = {
    getAllUsers,
    getUserById,
    getUserByName,
    getOrcsByUserId,
    createUser,
    updateUserDetails,
    updateUserAsAdmin,
    deleteUserById
};

export { UserService };
