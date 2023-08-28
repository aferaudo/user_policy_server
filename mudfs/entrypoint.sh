#!/bin/sh

# Perform any setup or configuration tasks here
echo "Setting up environment..."

# Injecting initial mudfiles
echo "Mongodb location mongodb://$MONGODB_USER:$MONGODB_PASSWORD@$MONGODB_LOCATION"
node examples/populationdb.js mongodb://$MONGODB_USER:$MONGODB_PASSWORD@$MONGODB_LOCATION/mudFile examples/json_files/

echo "Starting the node server"
npm start