# MUD FILE SERVER

This is an example of MUD file server. It could be used for local project.

**N.B.** IT WAS TESTED WITH [OSMUD](https://github.com/osmud/osmud#known-limitations)

## SETUP

### Requirements

```
mongodb openssl
```

### Architecture used
<img src="img/MFSArch.png">

In this architecture architecture, we need to insert the mudfiles in a db. To do that, you can use the node script present in the examples directory.

`
node populationdb.js mongodb://127.0.0.1/mudFile
`

This will insert in a db called **mudFile** all the mudfiles present in the directory *examples* (such as the one already present *Luminaire_150.json*).

After that you can install all the requirements of the server by using npm:

`
npm install
`

It's important that you have created a CA architecture before of starting the server. This means that you must have

* server key (used to generate the certificate request)
* server certificate (signed by a certification authority)

At the end you have to have a list of certificates like this:

<img src="img/listcertificates.png">

`server.crt` is the server certificate in the crt format. (**mandatory**)

`server.csr` represent the certificate request. (**mandatory**)

`server.key` is the private key of the server. (**mandatory**)

`server.key.secure` is the private key of the server protected by a passphrase. (**optional**)

``server.pem`` is the server certificate in pem format.

**N.B.** The names of the certifcates must follow the above nomenclature, otherwise you will have some errors runtime. Futhermore, certificates and key must be collocated in the *certs* directory.

If you wanto to create your own Certification Authority, as I did, I suggest to use this [guide](https://help.ubuntu.com/lts/serverguide/certificates-and-security.html).

Now you can run the server:

`sudo npm run`

(sudo is required because the servers uses a port lower then 1024 (HTTPS port))

## HOW TO use

`https://yourbeautifullink.com/info` --> *Simple initial page*

`https://yourbeautifullink.com/` --> *Shows all the mud files stored in the db*

`https://yourbeautifullink.com/mudfilename.json` --> *Shows the specified mudFile*

`https://yourbeautifullink.com/mudfilename.p7s` --> *Shows the mud file signature*