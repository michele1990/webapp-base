# Stage 1: Build React
FROM node:14 as build
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve React with Nginx
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html && mkdir /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]