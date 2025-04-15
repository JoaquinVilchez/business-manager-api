# Imagen base de Node.js
FROM node:20-alpine

# Definir directorio de trabajo
WORKDIR /business-manager-api

# Copiar archivos de configuración y código fuente antes de instalar dependencias
COPY package*.json ./
COPY . .

# Ajustar permisos para evitar problemas de acceso
RUN chmod -R 777 /business-manager-api

# Instalar dependencias evitando errores de compatibilidad
RUN npm install --legacy-peer-deps

# Exponer el puerto de la aplicación
EXPOSE 3000

# Usar un usuario no root por seguridad
USER node

# Comando para ejecutar el proyecto en modo desarrollo
CMD ["npm", "run", "start:dev"]