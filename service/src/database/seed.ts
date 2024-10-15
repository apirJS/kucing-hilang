import { sql } from 'drizzle-orm';
import db from './db';
import {
  lostCatPostsTable,
  usersTable,
  foundCatPostsTable,
  catImagesTable,
} from './schema';

async function seed(
  nUsers = 50,
  nLostCatPosts = 20,
  nFoundCatPosts = 20,
  nCatImages = 10
) {
  for (let i = 0; i < nUsers; i++) {
    const user: typeof usersTable.$inferInsert = {
      name: `user${i}`,
      email: `email${i}`,
      whatsappNumber: `whatsappNumber${i}`,
    };

    const newUser = await db.insert(usersTable).values(user).returning();

    for (let j = 0; j < nLostCatPosts; j++) {
      const lostCatPost: typeof lostCatPostsTable.$inferInsert = {
        userId: newUser[i].id,
        name: `name${j}`,
        ownerNote: `owenr note${j}`,
        lastLocation: `last seen${j}`,
        race: `race${j}`,
      };

      const newPosts = await db
        .insert(lostCatPostsTable)
        .values(lostCatPost)
        .returning();

      for (let k = 0; k < nCatImages; k++) {
        const catImage: typeof catImagesTable.$inferInsert = {
          lostCatPostId: newPosts[j].id,
          url: `url${k}`,
        };

        await db.insert(catImagesTable).values(catImage).returning();
      }
    }

    for (let j = 0; j < nFoundCatPosts; j++) {
      const foundCatPost: typeof foundCatPostsTable.$inferInsert = {
        userId: newUser[i].id,
        finderNote: `finder note${j}`,
        location: `location${j}`,
        race: `race${j}`,
      };

      const newPosts = await db
        .insert(foundCatPostsTable)
        .values(foundCatPost)
        .returning();

      for (let k = 0; k < nCatImages; k++) {
        const catImage: typeof catImagesTable.$inferInsert = {
          foundCatPostId: newPosts[j].id,
          url: `url${k}`,
        };

        await db.insert(catImagesTable).values(catImage).returning();
      }
    }
  }
}

seed().catch(console.error);
