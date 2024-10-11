import db from './db';
import { lostCatPostsTable, usersTable, foundCatPostsTable, catImagesTable } from './schema';

async function seed() {
  const user: typeof usersTable.$inferInsert = {
    name: 'test1',
    email: 'test1',
    password: 'test1',
  };

  await db.insert(usersTable).values(user);

  const lostCatPost: typeof lostCatPostsTable.$inferInsert = {
    name: 'kucing1',
    userId: 1,
    lastSeen: 'jakarta',
    race: 'sigma',
    ownerNote:
      'dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  };

  await db.insert(lostCatPostsTable).values(lostCatPost);

  const foundCatPost: typeof foundCatPostsTable.$inferInsert = {
    userId: 1,
    location: 'jakarta',
    race: 'sigma',
    finderNote:
      'dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }

  await db.insert(foundCatPostsTable).values(foundCatPost);

  const catImage: typeof catImagesTable.$inferInsert = {
    lostCatPostId: 1,
    url: 'https://www.google.com',
  }

  await db.insert(catImagesTable).values(catImage);

  console.log('seeded', user.name, lostCatPost.userId, foundCatPost.userId, catImage.url);
}

seed().catch(console.error);  
