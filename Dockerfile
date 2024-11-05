FROM node:18 AS base

WORKDIR /usr/src/app
COPY package*.json ./


WORKDIR /usr/src/app/backend
COPY backend/package*.json ./
RUN npm install


FROM node:18 AS frontend-build
WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build


FROM node:18
WORKDIR /usr/src/app
COPY --from=frontend-build /usr/src/app/frontend/build ./frontend/build
COPY --from=base /usr/src/app/backend ./

EXPOSE 3001
CMD ["node", "backend/app.js"]
