# Stage 1 : Build the React App

FROM node:20-alpine AS builder

WORKDIR /app 
COPY package*.json
RUN npm install
COPY . .
RUN npm run builder


# Stage 2 : Server with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx" , "-g" , "daemon off;"]

