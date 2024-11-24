# stage1 - build react app first
FROM node:23.3.0-alpine3.20 AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm ci
COPY . /app
RUN npm run build
RUN ls

# stage 2 - build the final image and copy the react build files
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/live/nginx.conf /etc/nginx/conf.d
COPY docker/live/entrypoint.sh /docker-entrypoint.d/40-replace-env.sh
RUN chmod +x /docker-entrypoint.d/40-replace-env.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
