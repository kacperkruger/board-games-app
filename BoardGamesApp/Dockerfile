FROM node:alpine AS builder
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx
COPY --from=builder /opt/app/build /usr/share/nginx/html