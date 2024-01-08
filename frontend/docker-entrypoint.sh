#!/bin/bash
sleep 3s
# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
  echo "Node modules not found. Running npm install..."
  npm install
fi

# Start your application

npm run dev
