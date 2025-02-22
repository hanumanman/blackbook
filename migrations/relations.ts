import { relations } from "drizzle-orm/relations";
import { users, sessions, chapters, progress, novels } from "./schema";

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	sessions: many(sessions),
	progresses: many(progress),
}));

export const progressRelations = relations(progress, ({one}) => ({
	chapter: one(chapters, {
		fields: [progress.lastChapterId],
		references: [chapters.id]
	}),
	novel: one(novels, {
		fields: [progress.novelId],
		references: [novels.id]
	}),
	user: one(users, {
		fields: [progress.userId],
		references: [users.id]
	}),
}));

export const chaptersRelations = relations(chapters, ({many}) => ({
	progresses: many(progress),
}));

export const novelsRelations = relations(novels, ({many}) => ({
	progresses: many(progress),
}));