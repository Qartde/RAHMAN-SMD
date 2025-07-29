FROM node:lts-buster

# Install necessary packages
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*

# Create working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Expose port if needed (optional for Heroku)
EXPOSE 5000

# Start the bot
CMD ["node", "rahmani.js"]
