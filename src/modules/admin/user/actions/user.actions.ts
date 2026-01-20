"use server";

import { cacheTag, updateTag } from "next/cache";
import { UserEntity } from "@/modules/admin/user/interfaces";
import {
  getUsers,
  getUserById,
  createUserService,
  updateUserService,
  deactivateUserService,
  reactivateUserService,
} from "@/modules/admin/user/services";
import { CreateUserDto, UpdateUserDto } from "@/modules/admin/user/dto/user.dto";

export async function createUserAction(
  formData: CreateUserDto
): Promise<{ success: boolean; data?: UserEntity; error?: string }> {
  try {
    const newUser = await createUserService(formData);
    updateTag("users");
    return { success: true, data: newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getUsersAction(): Promise<{
  success: boolean;
  data: UserEntity[];
  error?: string;
}> {
  "use cache";
  cacheTag("users");
  try {
    const users = await getUsers();
    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users:", error);
    if (error instanceof Error) return { success: false, error: error.message, data: [] };
    return { success: false, error: "An unexpected error occurred", data: [] };
  }
}

export async function getUserByIdAction(id: string): Promise<{
  success: boolean;
  data?: UserEntity | null;
  error?: string;
}> {
  try {
    const user = await getUserById(id);
    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function updateUserAction(
  id: string,
  formData: UpdateUserDto
): Promise<{ success: boolean; data?: UserEntity; error?: string }> {
  try {
    const updated = await updateUserService({ ...formData, id });
    updateTag("users");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error updating user:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deactivateUserAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await deactivateUserService(id);
    updateTag("users");
    return { success: true };
  } catch (error) {
    console.error("Error deactivating user:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function reactivateUserAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await reactivateUserService(id);
    updateTag("users");
    return { success: true };
  } catch (error) {
    console.error("Error reactivating user:", error);
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "An unexpected error occurred" };
  }
}
