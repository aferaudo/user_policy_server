FROM node:18.17-alpine

RUN mkdir -p /usr/mudfs

COPY . /usr/mudfs

# Installing required package
RUN apk add --update openssl

# Generating openssl keys
WORKDIR /usr/mudfs/certs

RUN openssl req -new -key server.key -out csr.pem -subj "//C=GB/ST=London/L=London/O=Global Security/OU=IT Department/CN=example.com"
RUN openssl x509 -req -days 9999 -in csr.pem -signkey server.key -out server.pem
RUN cp server.key server.key.pem 

WORKDIR /usr/mudfs

RUN npm install

# # Adding wait tool
# ENV WAIT_VERSION 2.12.0
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
# RUN chmod +x /wait
# CMD ["/wait"]

# #  Inserting inital json files in the db
# CMD ["echo", "$MONGODB_LOCATION"]
# CMD ["node", "examples/populationdb.js", "mongodb://$MONGODB_USER:$MONGODB_PASSWORD@$MONGODB_LOCATION/mudFile", "json_files/"]

# CMD ["npm", "start"]

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 443