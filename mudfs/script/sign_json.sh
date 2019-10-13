#!/bin/sh

# This script requires only one parameter, which is mandatory, that represent the name of the json file (json file requested)

if [ $# -ne 1 ]; then
    echo "Syntax error: ./sign_json.sh mud_file.json"
    exit -1
fi

MUD_FILE=$1
MUD_FILE_P7S=$(echo $MUD_FILE | awk -F "." '{print $1".p7s"}')
# The openssl command to call could be differnt on the basis of the os used.
# For example I have two different path with linux and with MacOs

# MacOS
/usr/local/ssl/bin/openssl cms -sign -signer certs/server.pem -inkey certs/server.key -in $MUD_FILE -outform DER -out $MUD_FILE_P7S

#Linux
#/usr/bin/openssl cms -sign -signer certs/server.pem -inkey certs/server.key -in $MUD_FILE -outform DER -out $MUD_FILE_P7S

# N.B. If you use an intermediate certificate, you can specify it by using the option -certfile. So, the command become the following:
# openssl cms -sign -signer ../certs/server.pem -inkey ../certs/server.key -in $MUD_FILE -outform DER -certfile intermediatecert -out $MUD_FILE_P7S