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

# MacOS (to install cms on MACOS you need to create your own version of openssl (https://security.stackexchange.com/questions/86180/how-do-i-enable-support-for-cryptographic-message-syntax-cms-in-openssl-on-os) )
# /usr/local/ssl/bin/openssl cms -sign -signer certs/server.pem -inkey certs/server.key -in $MUD_FILE -binary -outform DER -binary -out $MUD_FILE_P7S
/usr/local/ssl/bin/openssl cms -sign -signer certs/server.pem -inkey certs/server.key -in $MUD_FILE -outform DER -out $MUD_FILE_P7S
#Linux
#/usr/bin/openssl cms -sign -signer certs/server.pem -inkey certs/server.key -in $MUD_FILE -binary -outform DER -binary -out $MUD_FILE_P7S

# N.B. If you use an intermediate certificate, you can specify it by using the option -certfile. So, the command become the following:
# openssl cms -sign -signer ../certs/server.pem -inkey ../certs/server.key -in $MUD_FILE -outform DER -certfile intermediatecert -out $MUD_FILE_P7S

# It's possible that you will have some problems related to the format. In this case try to remove the the option -binary