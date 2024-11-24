# stage1 - build react app first
FROM node:12.16.1-alpine3.9 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm ci
COPY . /app
RUN npm build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/live/nginx.conf /etc/nginx/conf.d
COPY docker/live/entrypoint.sh /docker-entrypoint.d/40-replace-env.sh
RUN chmod +x /docker-entrypoint.d/40-replace-env.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
