FROM node:16.2.0-stretch AS backend

COPY backend .
run npm install
CMD ["node", "index.js"]
