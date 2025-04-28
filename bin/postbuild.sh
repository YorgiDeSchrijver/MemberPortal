#!/bin/bash
 
rm -rf ./.amplify-hosting
 
mkdir -p ./.amplify-hosting/compute/default
mkdir -p ./.amplify-hosting/static
 
# Copy the build files and server
cp -r ./build/* ./.amplify-hosting/compute/default/
cp ./index.js ./.amplify-hosting/compute/default/index.js

# Create a minimal package.json with only what index.js needs
cat > ./.amplify-hosting/compute/default/package.json << EOL
{
  "name": "memberboard-server",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "@react-router/express": "^7.5.2",
    "compression": "^1.8.0",
    "express": "^4.19.2",
    "isbot": "^5.1.27",
    "morgan": "^1.10.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router": "^7.5.2"
  }
}
EOL

# Install only whats needed for the server
cd ./.amplify-hosting/compute/default
npm install --omit=optional --omit=dev
cd ../../../

# Copy static assets
cp -r ./public/* ./.amplify-hosting/static/

# Copy the deploy manifest
cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json