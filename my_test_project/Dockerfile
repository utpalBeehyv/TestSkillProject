# syntax=docker/dockerfile:1

# ---- install ----
FROM node:22-alpine AS install
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build ----
FROM install AS build
COPY . .
RUN npm run build

# ---- serve ----
FROM nginx:1.27-alpine AS serve
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
