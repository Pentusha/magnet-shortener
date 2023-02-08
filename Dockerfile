FROM node:lts AS builder
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node . .
RUN yarn install && yarn build

FROM caddy as app
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /home/node/app/dist /srv