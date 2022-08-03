FROM node:lts-alpine3.14 AS base

WORKDIR /usr/src/app

COPY ./package*.json ./
# ============================================================
FROM base AS dev

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm i -D

COPY . .
# ============================================================
FROM node:lts-alpine3.14 AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]