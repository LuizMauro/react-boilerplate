# Etapa de build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de produção com NGINX
FROM nginx:alpine

# Remove a config default do NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Copia a build do Vite para o diretório público
COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma config custom de NGINX se quiser usar SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
