import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  whatsappNumber: varchar('whatsapp_number', { length: 20 }).unique(),
  updatedAt: timestamp('created_at'),
  createdAt: timestamp('updated_at').defaultNow().notNull(),
});

export const lostCatPostsTable = pgTable('lost_cat_posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  race: varchar({ length: 255 }),
  lastLocation: varchar('last_seen', { length: 255 }),
  ownerNote: text('owner_note'),
  updatedAt: timestamp('created_at'),
  createdAt: timestamp('updated_at').defaultNow().notNull(),
  userId: integer('user_id').notNull(),
});

export const foundCatPostsTable = pgTable('found_cat_posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  race: varchar({ length: 255 }),
  location: varchar({ length: 255 }),
  finderNote: text('finder_note'),
  userId: integer('user_id').notNull(),
});

export const catImagesTable = pgTable('cat_images', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: varchar({ length: 255 }).notNull(),
  updatedAt: timestamp('created_at'),
  createdAt: timestamp('updated_at').defaultNow().notNull(),
  lostCatPostId: integer('lost_cat_post_id'),
  foundCatPostId: integer('found_cat_post_id'),
});

export const usersLostCatPostsRelations = relations(usersTable, ({ many }) => ({
  lostCatPosts: many(lostCatPostsTable),
}));

export const usersFoundCatPostsRelations = relations(
  usersTable,
  ({ many }) => ({
    foundCatPosts: many(foundCatPostsTable),
  })
);

export const lostCatPostsUsersRelations = relations(
  lostCatPostsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [lostCatPostsTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const foundCatPostsUsersRelations = relations(
  foundCatPostsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [foundCatPostsTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const lostCatPostsCatImagesRelations = relations(
  lostCatPostsTable,
  ({ many }) => ({
    catImages: many(catImagesTable),
  })
);

export const foundCatPostsCatImagesRelations = relations(
  foundCatPostsTable,
  ({ many }) => ({
    catImages: many(catImagesTable),
  })
);

export const catImagesLostCatPostsRelations = relations(
  catImagesTable,
  ({ one }) => ({
    post: one(lostCatPostsTable, {
      fields: [catImagesTable.lostCatPostId],
      references: [lostCatPostsTable.id],
    }),
  })
);

export const catImagesFoundCatPostsRelations = relations(
  catImagesTable,
  ({ one }) => ({
    post: one(foundCatPostsTable, {
      fields: [catImagesTable.foundCatPostId],
      references: [foundCatPostsTable.id],
    }),
  })
);
