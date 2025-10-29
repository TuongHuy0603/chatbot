# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

COPY package*.json .
# Install dependencies
RUN npm i

# Copy source code
COPY . .

# Build the application
RUN npm run build

# # Stage 2: Production
# FROM nginx:alpine

# # Copy built files from builder stage
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Copy nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["npm", "start"]

