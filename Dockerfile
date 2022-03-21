FROM node:lts-alpine3.14 AS development

WORKDIR /usr/src/app

COPY ./package*.json ./

COPY . .

# RUN npm run build

# FROM node:lts-alpine3.15 AS production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY ./nest-project/package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]