# Multi-stage build: compile the Vite site, then serve the static output with
# nginx. Nothing from the build stage (node_modules, npm, source files) ends
# up in the final image - only the built dist/ folder does.

# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
