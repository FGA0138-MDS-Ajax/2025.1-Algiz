FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV ADMINJS_COOKIE_SECRET=your-secret-key
ENV ADMINJS_ROOT_PATH=/admin

EXPOSE 3001
CMD ["node", "server.js"]
