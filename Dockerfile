FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --no-cache
COPY . .
RUN npm run build
RUN rm -rf /app/_site/.assets-cache/


FROM nginx:stable-alpine as final

COPY --from=builder --chown=nginx:nginx /app/_site/ /usr/share/nginx/html/guide

RUN mkdir -p /var/cache/nginx

RUN chown -R nginx:nginx /var/cache/nginx
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

WORKDIR /usr/share/nginx/html