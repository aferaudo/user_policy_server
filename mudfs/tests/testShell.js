const shell = require('shelljs')

let temp = "test.txt"

shell.exec('openssl cms -sign -signer ../certs/server.pem -inkey ../certs/server.key -in ' + temp +' -outform DER -out text.p7s') 
