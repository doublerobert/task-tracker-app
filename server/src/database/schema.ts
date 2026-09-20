import { defineRelations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

// enums & enum types
export const roleEnum = pgEnum("user_role", ["admin", "member"]);
export type UserRole = (typeof roleEnum.enumValues)[number];

export const taskStatusEnum = pgEnum("task_status", ["todo", "in-progress", "done"]);
export type TaskStatus = (typeof taskStatusEnum.enumValues)[number];

export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high"]);
export type TaskPriority = (typeof taskPriorityEnum.enumValues)[number];

// tables
export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  role: roleEnum("role").notNull().default("member"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: taskStatusEnum("status").notNull().default("todo"),
  priority: taskPriorityEnum("priority").notNull(),
  dueDate: date("due_date"),
  assignedTo: uuid("assigned_to")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdBy: uuid("created_by")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  jti: uuid("jti").notNull().unique(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  revoked: boolean("revoked").notNull().default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// relations
export const relations = defineRelations(
  { organizations, users, tasks, refreshTokens },
  (r) => ({
    organizations: {
      users: r.many.users(),
      tasks: r.many.tasks(),
    },
    users: {
      organization: r.one.organizations({
        from: r.users.organizationId,
        to: r.organizations.id,
      }),
      assignedTasks: r.many.tasks({ alias: "assignedTasks" }),
      createdTasks: r.many.tasks({ alias: "createdTasks" }),
      refreshTokens: r.many.refreshTokens(),
    },
    tasks: {
      organization: r.one.organizations({
        from: r.tasks.organizationId,
        to: r.organizations.id,
      }),
      assignee: r.one.users({
        from: r.tasks.assignedTo,
        to: r.users.id,
        alias: "assignedTasks",
      }),
      creator: r.one.users({
        from: r.tasks.createdBy,
        to: r.users.id,
        alias: "createdTasks",
      }),
    },
    refreshTokens: {
      user: r.one.users({
        from: r.refreshTokens.userId,
        to: r.users.id,
      }),
    },
  })
);

// types
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

export type RefreshToken = typeof refreshTokens.$inferSelect;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
