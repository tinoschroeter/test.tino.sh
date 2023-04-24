FROM node:18.16.0-buster-slim AS backend

COPY backend .
run npm install
CMD ["node", "index.js"]
