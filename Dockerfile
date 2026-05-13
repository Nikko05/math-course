FROM node:20-bullseye-slim

WORKDIR /app

# Install build dependencies for bcrypt and Next.js build
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
ENV MONGODB_URI="mongodb://address-only-for-build"

RUN npm run build
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "run", "start"]
