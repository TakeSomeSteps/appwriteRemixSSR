FROM node:18-slim as build
WORKDIR build
COPY . .
RUN npm ci
RUN npm run build

FROM node:18-slim
WORKDIR /usr/src/app
COPY --from=build build/node_modules node_modules
COPY --from=build build/public public
COPY --from=build build/build build
COPY --from=build build/package.json package.json
CMD npm start
