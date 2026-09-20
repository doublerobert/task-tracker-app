import { database } from "../configs/drizzle";
import { tasks } from "../database/schema";
import { eq, or, and } from "drizzle-orm";

export const tasksRepository = {
  async create(data: {
    organizationId: string;
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
    dueDate?: string;
    assignedTo: string;
    createdBy: string;
  }) {
    const [task] = await database.insert(tasks).values(data).returning();
    return task;
  },

  async findById(id: string) {
    const [task] = await database.select().from(tasks).where(eq(tasks.id, id));
    return task;
  },

  async listForUser(userId: string, organizationId: string, isAdmin: boolean) {
    if (isAdmin) {
      return database.select().from(tasks).where(eq(tasks.organizationId, organizationId));
    }
    return database.select().from(tasks).where(
      and(
        eq(tasks.organizationId, organizationId),
        or(eq(tasks.assignedTo, userId), eq(tasks.createdBy, userId))
      )
    );
  },

  async updateStatus(id: string, status: "todo" | "in-progress" | "done") {
    const [task] = await database.update(tasks).set({ status }).where(eq(tasks.id, id)).returning();
    return task;
  },

  async update(id: string, data: Partial<{
    title: string; description: string; priority: string; dueDate: string; assignedTo: string;
  }>) {
    const [task] = await database.update(tasks).set(data).where(eq(tasks.id, id)).returning();
    return task;
  },

  async delete(id: string) {
    return database.delete(tasks).where(eq(tasks.id, id));
  },
};
