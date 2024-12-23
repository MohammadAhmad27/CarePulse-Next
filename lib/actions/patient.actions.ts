"use server";
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  // Implement the logic to create a user in your database
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    //check existing user
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
    console.error("An error occurred while creating a new user!", error);
  }
};

export const getUser = async (userId: string) => {
  // Implement the logic to get a user from your database
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log("An error occurred while fetching user!", error);
  }
};
