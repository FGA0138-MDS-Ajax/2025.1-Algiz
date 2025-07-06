FROM node:20-slim

# Configuração definitiva do timezone
RUN apt-get update && \
    apt-get install -y tzdata && \
    ln -fs /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV ADMINJS_COOKIE_SECRET=your-secret-key
ENV ADMINJS_ROOT_PATH=/admin
ENV TZ=America/Sao_Paulo

EXPOSE 3001
CMD ["node", "server.js"]