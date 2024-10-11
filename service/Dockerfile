FROM imbios/bun-node:18-slim as development

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY drizzle.config.ts .

RUN bun install

COPY . .

RUN bun build ./src/index.ts --outdir ./build --minify --target bun

FROM imbios/bun-node:18-slim as production

ENV BUN_ENV=production

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY wait-for-it.sh .
COPY drizzle.config.ts .

RUN bun install --production

COPY --from=development /app/build . 
COPY --from=development /app/src/database ./src/database 
COPY --from=development /app/src/lib ./src/lib 

RUN chmod +x wait-for-it.sh

CMD [ "./wait-for-it.sh", "postgres:5432", "--", "sh", "-c", "bun run db:apply && bun run db:seed && bun start" ]
