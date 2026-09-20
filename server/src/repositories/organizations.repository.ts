import { database } from "../configs/drizzle";
import { organizations } from "../database/schema";
import type { Organization } from "../database/schema";
import { eq } from "drizzle-orm";


export const organizationsRepository = {
  async create(name: string): Promise<Organization> {
    const [org] = await database
      .insert(organizations)
      .values({ name })
      .returning();
    return org;
  },

  async findById(id: string): Promise<Organization | undefined> {
    const [org] = await database
      .select()
      .from(organizations)
      .where(eq(organizations.id, id));
    return org;
  },
};
