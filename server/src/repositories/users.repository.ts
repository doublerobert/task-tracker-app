import { database } from "../configs/drizzle";
import { users } from "../database/schema";
import type { NewUser, User } from "../database/schema";
import { eq, and } from "drizzle-orm";

export const usersRepository = {
  async create(data: User) {
    const [user] = await database.insert(users).values(data).returning();
    return user;
  },

  async findByEmail(email: string) {
    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user;
  },

  async findById(id: string) {
    const [user] = await database.select().from(users).where(eq(users.id, id));
    return user;
  },

  async listByOrganization(organizationId: string) {
    return database
      .select()
      .from(users)
      .where(eq(users.organizationId, organizationId));
  },

  async update(
    id: string,
    data: NewUser,
  ) {
    const [user] = await database
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  },

  async delete(id: string, organizationId: string) {
    return database
      .delete(users)
      .where(and(eq(users.id, id), eq(users.organizationId, organizationId)));
  },
};
