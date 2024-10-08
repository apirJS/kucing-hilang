FROM oven/bun:1.1.8-alpine as development

WORKDIR /usr/src/app

COPY package.json .

COPY bun.lockb .

RUN bun install

COPY . .

RUN bun build ./src/index.ts --outdir ./build --minify --target bun

FROM oven/bun:1.1.8-alpine as production

ARG BUN_ENV=production
ENV BUN_ENV=${BUN_ENV}

WORKDIR /usr/src/app

COPY package.json .

COPY bun.lockb .

RUN bun install --production

COPY --from=development /usr/src/app/build ./build

CMD [ "bun" , "run", "build/index.js" ]