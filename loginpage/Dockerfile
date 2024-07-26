FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --unhandled-rejections=strict

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5173

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


