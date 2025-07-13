FROM node:20.11.0

USER node

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm rebuild typescript


ENV NODE_ENV=production

EXPOSE 3000

CMD ["sh", "-c", "npm run build && npm run seed && node dist/main.js"]