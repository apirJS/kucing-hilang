import { sql } from 'drizzle-orm';
import db from './db';
import {
  lostCatPostsTable,
  usersTable,
  foundCatPostsTable,
  catImagesTable,
} from './schema';

async function seed() {
  for (let i = 0; i < 10; i++) {
    const user: typeof usersTable.$inferInsert = {
      name: 'test' + Math.random().toString(36).substring(2, 10),
      email: Math.random().toString(36).substring(2, 10) + '@gmail.com',
      password: 'test1',
    };

    await db.insert(usersTable).values(user);

    const userId = (
      await db
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(sql`${usersTable.email} = ${user.email}`)
    ).at(0)?.id!;

    const lostCatPost: typeof lostCatPostsTable.$inferInsert = {
      name: 'kucing' + Math.floor(Math.random() * 100),
      userId: userId,
      lastSeen: 'location' + Math.floor(Math.random() * 100),
      race: 'race' + Math.floor(Math.random() * 100),
      ownerNote:
        'dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };

    await db.insert(lostCatPostsTable).values(lostCatPost);

    const foundCatPost: typeof foundCatPostsTable.$inferInsert = {
      userId: userId,
      location: 'location' + Math.floor(Math.random() * 100),
      race: 'race' + Math.floor(Math.random() * 100),
      finderNote:
        'dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };

    await db.insert(foundCatPostsTable).values(foundCatPost);

    const catImage: typeof catImagesTable.$inferInsert = {
      lostCatPostId: i + 1, // Assuming sequential IDs
      url: 'https://www.example.com/image' + Math.floor(Math.random() * 100),
    };

    await db.insert(catImagesTable).values(catImage);

    console.log(
      'seeded',
      user.name,
      lostCatPost.userId,
      foundCatPost.userId,
      catImage.url
    );
  }
}

seed().catch(console.error);
