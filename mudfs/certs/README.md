This directory should contain
`server.crt` is the server certificate in the crt format. (**mandatory**)

`server.csr` represent the certificate request. (**mandatory**)

`server.key` is the private key of the server. (**mandatory**)

`server.key.secure` is the private key of the server protected by a passphrase. (**optional**)

``server.pem`` is the server certificate in pem format.

**N.B.** The names of the certifcates must follow the above nomenclature, otherwise you will have some errors runtime. Futhermore, certificates and key must be collocated in the *certs* directory.

If you want to create your own Certification Authority, as I did, I suggest to use this [guide](https://ubuntu.com/server/docs/security-certificates).

Alternatively, you can use a self-signed certificate, which, however, require the configuration on the MUD manager. **The MUD server should be a Trusted Entity.**

```bash
# Self certificate procedure
cd mudfs/certs
openssl genrsa -out server.key
openssl req -new -key server.key -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey server.key -out server.pem
rm csr.pem
cp server.key server.key.pem 
```