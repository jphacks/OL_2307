FROM node:18.18.0

WORKDIR /src/client

COPY package.json ./
RUN npm install
COPY . .

ENTRYPOINT ["pnpm", "install", "&&", "pnpm", "run", "dev"]