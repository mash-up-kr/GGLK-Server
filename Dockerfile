FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:22-alpine AS runner

WORKDIR /app
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.env ./.env

ENV NODE_ENV=production
USER node

EXPOSE 8000
CMD ["sh", "-c", "node ./node_modules/.bin/typeorm-ts-node-commonjs migration:run -d dist/src/common/database/config.js && node dist/src/main.js"]